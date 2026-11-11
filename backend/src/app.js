import express from 'express';

const app = express();

// Home route
app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to laundry-hub" });
})

export default app;