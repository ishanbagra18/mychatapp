import express from 'express';
import { chatWithBot } from '../controller/Chatbot.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.post('/chat', secureRoute, chatWithBot);

export default router;
