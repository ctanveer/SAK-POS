import express from 'express'
import {
    createPaymentController,
} from '../controllers/payment.controller';

const router = express.Router();

router.post('/create-payment-intent', createPaymentController);

export default router;