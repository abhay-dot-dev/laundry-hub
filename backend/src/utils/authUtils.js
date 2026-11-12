import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const verifyHashPassword = async (plainPassowrd, currentUserPassword) => {
    const result = await bcrypt.compare(plainPassowrd, currentUserPassword);
    return result;
}

export const generateToken = (userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}