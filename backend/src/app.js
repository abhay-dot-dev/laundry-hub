import express from 'express';
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to laundry-hub" });
})

export default app;