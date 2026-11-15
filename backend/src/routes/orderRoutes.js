import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// order APIs
router.post('/', authMiddleware, createOrder);

export default router;