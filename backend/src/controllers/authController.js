import validator from 'validator';
import User from "../models/User.js";
import { hashPassword } from "../utils/authUtils.js";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

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