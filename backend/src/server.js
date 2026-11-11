import app from './app.js';

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is up and running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}