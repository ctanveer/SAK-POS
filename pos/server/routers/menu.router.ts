import express from 'express'
import {
    getMenuItems,
    getCategories
} from "../controllers/menu.controller";
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/menuitems', authMiddleware, getMenuItems);
router.get('/categories', authMiddleware, getCategories);

export default router;