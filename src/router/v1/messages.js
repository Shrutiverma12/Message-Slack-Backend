import express from 'express';

import { getMessages } from '../../controller/messageController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:channelId', isAuthenticated, getMessages);

export default router;
