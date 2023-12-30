import express from 'express'
import {
    getAllCustomersController,
    getCustomerByIdController,
    createCustomerController,
} from '../controllers/customer.controller';

const router = express.Router();

router.get('/', getAllCustomersController);
router.get('/:id', getCustomerByIdController);
router.post('/', createCustomerController);

export default router;