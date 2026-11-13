import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', serviceRoutes);
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to laundry-hub" });
})

export default app;