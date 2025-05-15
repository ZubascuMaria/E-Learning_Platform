import express from 'express';
import { chatWithGemini } from '../controllers/aiController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
router.post('/chat', verifyToken, chatWithGemini);
export default router;
