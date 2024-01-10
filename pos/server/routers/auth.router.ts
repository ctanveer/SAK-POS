import express from 'express';
import { getToken, getUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/token/:code', getToken);
router.get('/user', authMiddleware, getUser);

export default router;