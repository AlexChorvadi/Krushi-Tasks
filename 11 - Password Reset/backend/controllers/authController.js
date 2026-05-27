const auth = require('../models/authModel');
const bcrypt = require("bcryptjs");
const transporter = require('../config/mail_transporter');
const { Resend } = require("resend");


const resend = new Resend(process.env.RESEND_API_KEY);


const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuth = await auth.create({
            name,
            email,
            password: hashedPassword
        });

        // resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: newAuth.email,
        //     subject: 'Registration Successful',
        //     html: `
        //         <h2>Welcome, ${newAuth.name}!</h2>
        //         <p>You have successfully registered.</p>
        //     `
        // });

        // SEND WELCOME EMAIL
        const mailOptions = {
            from: process.env.EMAIL,
            to: newAuth.email,
            subject: "Registration Successful",
            html: `
                <h2>Welcome, ${newAuth.name}!</h2>
                <p>You have successfully registered.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth.findOne({ email });
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found'
                }
            );
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(
                {
                    success: false,
                    message: 'Invalid credentials'
                }
            );
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const forgot = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await auth.findOne({ email });
        const crypto = require("crypto");
        const token = crypto.randomBytes(32).toString("hex");
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found'
                }
            );
        }

        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        // resend.emails.send({
        //     from: process.env.EMAIL,
        //     to: user.email,
        //     subject: 'Password Reset',
        //     html: `Please click on the <a href="${process.env.FRONTEND_URL}/verify-token">link</a> use this key: <b>${token}</b> to reset your password.`
        // });

        try {
            await transporter.verify();
            console.log("Server is ready to take our messages");
        } catch (err) {
            console.error("Verification failed:", err);
        }
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `You have requested a password reset.`,
            html: `Please click on the <a href="${process.env.FRONTEND_URL}/verify-token">link</a> use this key: <b>${token}</b> to reset your password.`
        };
        sendMail(mailOptions)
        // Implement forgot password logic here
        // const mailOptions = {
        //     from: process.env.EMAIL,
        //     to: user.email,
        //     subject: 'Password Reset',
        //     text: `You have requested a password reset.`,
        //     html: `Please click on the <a href="${process.env.FRONTEND_URL}/verify-token">link</a> use this key: <b>${token}</b> to reset your password.`
        // };
        // await transporter.sendMail(mailOptions);
        // console.log("AFTER forgot SEND");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const verifyResetToken = async (req, res) => {
    try {

        const { resetToken } = req.body;

        if (!resetToken) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required"
            });
        }

        const user = await auth.findOne({
            resetToken,
            resetTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset link"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Reset token verified successfully",
            email: user.email
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {

        const { resetToken, email, password } = req.body;

        if (!resetToken || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await auth.findOne({
            resetToken,
            email,
            resetTokenExpire: { $gt: Date.now() }
        });
        console.log(user, resetToken, email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset link"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // REMOVE RESET DATA
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        // resend.emails.send({
        //     from: process.env.EMAIL,
        //     to: user.email,
        //     subject: 'Password Reset',
        //     html: `
        //         <h2>Password Reset Successful</h2>
        //         <p>You have successfully reset your password.</p>
        //     `
        // });
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `You have successfully reset your password.`,
            html: `Please click on the <a href="${process.env.FRONTEND_URL}/login">Login</a>.`
        };
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let mailTry = 0;  // Counter to track the number of email sending attempts
async function sendMail(mailOptions) {
    if (mailTry <= 10) {
        try {
            await transporter.sendMail(mailOptions);
            mailTry = 0;
        }
        catch (e) {
            console.error(`${mailTry}: Error sending email:`, e);
            sendMail(mailOptions);
            mailTry++;
        }
    }
}

module.exports = {
    register,
    login,
    forgot,
    verifyResetToken,
    resetPassword
}