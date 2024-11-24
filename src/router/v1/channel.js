import express from 'express';
import { getChannelByIdController } from '../../controller/channelController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:channelId', isAuthenticated, getChannelByIdController);

export default router;