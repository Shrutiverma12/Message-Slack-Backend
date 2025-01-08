import express from 'express';

import {
  getMessages,
  getUrlFromCloudinary
} from '../../controller/messageController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pre-signed-url', isAuthenticated, getUrlFromCloudinary);

router.get('/:channelId', isAuthenticated, getMessages);

export default router;
