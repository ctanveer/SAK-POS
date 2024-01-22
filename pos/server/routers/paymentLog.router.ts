import express from 'express'
import {
    getAllPaymentLogsController,
    getPaymentLogsByOrderIdController,
    createPaymentLogController,
    updatePaymentLogByIdController
} from '../controllers/paymentLog.controller';

const router = express.Router();

router.get('/', getAllPaymentLogsController);
router.get('/:id', getPaymentLogsByOrderIdController);
router.post('/', createPaymentLogController);
router.put('/:id', updatePaymentLogByIdController)

export default router;