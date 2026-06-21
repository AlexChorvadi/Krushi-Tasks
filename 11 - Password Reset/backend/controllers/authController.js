const auth = require('../models/authModel');
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail");
// const { Resend } = require("resend");


// const resend = new Resend(process.env.RESEND_API_KEY);


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

        await sendMail({
            to: newAuth.email,
            to_name: newAuth.name,
            subject: "Welcome to Authentication System",
            text: "Your account has been created successfully.",
            html: `
                Hi ${newAuth.name},

                Welcome! 🎉

                Your account has been created successfully, and you're now ready to get started.

                We're excited to have you with us. You can now log in on our platform.

                Thank you for joining us!

                Best regards,
            `,
        });

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

        // console.log("Reset Token:", user.email);

        await sendMail({
            to: user.email,
            to_name: user.name,
            subject: 'Password Reset',
            text: `You have requested a password reset.`,
            html: `
                <h2>Password Reset Request</h2>

                <p>We received a request to reset your password.</p>

                <p>
                    Click
                    <a href="${process.env.FRONTEND_URL}/verify-token">here</a>
                    to continue, then enter the following verification code:
                </p>

                <p><b>${token}</b></p>

                <p>If you didn't request a password reset, you can safely ignore this email.</p>`
        });

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

        await sendMail({
            to: user.email,
            to_name: user.name,
            subject: 'Password Reset',
            text: `Your password has been reset successfully.You can now log in with your new password.`,
            html: `
                <h2> Password Reset Successful</ >
                <p>Your password has been reset successfully.</p>
                <p>
                    You can now <a href="${process.env.FRONTEND_URL}/login">log in</a>
                    using your new password.
                </p>`
        });

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

module.exports = {
    register,
    login,
    forgot,
    verifyResetToken,
    resetPassword
}