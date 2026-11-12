import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
    }
}, {timestamps: true})

const User = mongoose.model('User', schema);

export default User;