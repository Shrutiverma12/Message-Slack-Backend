import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import channelSocketHandlers from './controller/channelSocketController.js';
import messageSocketHandlers from './controller/messageSocketController.js';
import { verifyEmailController } from './controller/workspaceController.js';
import apiRouter from './router/apiRoutes.js';

const app = express();

const server = createServer(app);
const io = new Server(
  server,
  (server,
  {
    cors: {
      origin: '*'
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'pong'
  });
});

app.get(`/verify/:token`, verifyEmailController);

io.on('connection', (socket) => {
  console.log(`a user is connected`, socket.id);

  //   // setInterval(() => {
  //   //   socket.emit('message', 'This is a message from the server');
  //   // }, 3000);

  //   socket.on('messageFromClient', (data) => {
  //     console.log('Message from client', data);

  //     io.emit('new message', data.toUpperCase()); //broadcast to all
  //   });
  messageSocketHandlers(io, socket);
  channelSocketHandlers(io, socket);
});

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
