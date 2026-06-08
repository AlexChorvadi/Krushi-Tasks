const auth = require('../models/authModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {

        const { name, email, password, gender, hobby } = req.body;

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await auth.create({
            name,
            email,
            password: hashedPassword,
            gender,
            hobby
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
        const accessToken = jwt.sign(
            {
                name: user.name,
                email: user.email,
                gender: user.gender,
                hobby: user.hobby,
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            accessToken,
            user: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                hobby: user.hobby,
            },
        });
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    register,
    login,
    verifyToken,
    getProfile
}