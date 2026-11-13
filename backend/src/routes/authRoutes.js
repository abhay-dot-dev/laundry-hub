import express from 'express'
import { getCurrentUser, loginUser, protecteduser, registerUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// authentication API's
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/me', authMiddleware, getCurrentUser)
router.get('/protected', authMiddleware, protecteduser)

export default router;