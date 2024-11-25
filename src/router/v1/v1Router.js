import express from 'express';

import channelRouter from './channel.js';
import userRouter from './users.js';
import workspaceRouter from './workspace.js';
import memberRouter from './members.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);

export default router;
