import express from 'express'
import {sendMailController} from '../controllers/email.controller'
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/send',authMiddleware, sendMailController);

export default router;