import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    services: {
        type: [
            {
                serviceName: {
                    trim: true,
                    type: String,
                    required: true
                },
                servicePrice: {
                    min: 0,
                    type: Number,
                    required: true
                }
            }
        ],
        validate: {
            validator: (services) => Array.isArray(services) && services.length >= 1,
            message: 'An order must contain at least one service!'
        }
    },
    total: {
        min: 0,
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Orders = mongoose.model("Orders", schema);

export default Orders;