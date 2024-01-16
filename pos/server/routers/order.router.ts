import express from 'express'
import {
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    updateOrderWithCustomerIdController,
    deleteOrderByIdController,
    sendOrderToKDS,
    getAllRestaurantOrdersController,
    updateOrderStatus
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', authMiddleware, getAllRestaurantOrdersController);
router.put('/status', authMiddleware, updateOrderStatus);
// router.get('/:id', getOrderByIdController);
router.post('/', authMiddleware, createOrderController);
// router.put('/:id', updateOrderByIdController);
router.put('/:orderId/add-customerid/:customerId', updateOrderWithCustomerIdController);
// router.delete('/:id', deleteOrderByIdController);
router.post('/new', authMiddleware, sendOrderToKDS)

export default router;
