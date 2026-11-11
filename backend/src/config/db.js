import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB...")
    } catch (error) {
        console.error("MongoDB connection failed: ", error.message);
        throw error;
    }
}

export default connectDB;