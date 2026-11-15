import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { createOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// order APIs
router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, createOrder);

export default router;