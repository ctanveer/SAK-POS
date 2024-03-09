import express from 'express'
import {getDiscountController} from '../controllers/discount.controller'
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/menu-discount',authMiddleware, getDiscountController);

export default router;