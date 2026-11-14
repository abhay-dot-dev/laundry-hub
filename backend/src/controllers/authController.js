import validator from 'validator';
import User from "../models/User.js";
import { generateToken, hashPassword, verifyHashPassword } from "../utils/authUtils.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedName = name?.trim();

    if (!normalizedName) {
        return res.status(400).json({ message: "Please enter your name!" });
    }
    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
        return res.status(400).json({ message: "Please enter a valid email!" });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Please enter a valid password!" });
    }

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "User already exist with the email. Please login!" })
        }

        const hashedPassword = await hashPassword(password);

        await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email is already registered!" });
        }
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
        return res.status(400).json({ message: "Please enter a valid email!" });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Please enter a valid password!" });
    }

    try {
        const currentUser = await User.findOne({ email: normalizedEmail });
        if (!currentUser) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        if (!await verifyHashPassword(password, currentUser.password)) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const token = generateToken(currentUser._id);
        res.status(200).json({ message: "User logged in successfully!", token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const protecteduser = (req, res) => {
    return res.status(200).json({ message: "accessed." });
}

export const getCurrentUser = async (req, res) => {
    const id = req.user.userId;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "User fetched successfully!",
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Get Current User Error:", error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}