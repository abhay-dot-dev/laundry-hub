import express from 'express';
import { getServices } from '../controllers/servicesController.js';

const router = express.Router();

// service API's
router.get('/services', getServices);

export default router;