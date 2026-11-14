import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, { timestamps: true })

const User = mongoose.model('User', schema);

export default User;