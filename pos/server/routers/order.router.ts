import express from 'express'
import {
    getAllOrdersController,
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    updateOrderWithCustomerIdController,
    deleteOrderByIdController
} from '../controllers/order.controller';

const router = express.Router();

router.get('/', getAllOrdersController);
router.get('/:id', getOrderByIdController);
router.post('/', createOrderController);
router.put('/:id', updateOrderByIdController);
router.put('/:orderId/add-customer/:customerId', updateOrderWithCustomerIdController);
router.delete('/:id', deleteOrderByIdController);

export default router;
