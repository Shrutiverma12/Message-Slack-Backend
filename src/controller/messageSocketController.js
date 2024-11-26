import { createMessageService } from '../services/messagesService.js';
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT
} from '../utils/common/eventContants.js';

export default function messageHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    console.log(data, typeof data);
    const messageResponse = await createMessageService(data, cb);
    socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    cb({
      success: true,
      message: 'Successfully created the message',
      data: messageResponse
    });
  });
}
