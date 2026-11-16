import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { cancelOrder, createOrder, getOrderById, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// order APIs
router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, createOrder);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/cancel', authMiddleware, cancelOrder);

export default router;