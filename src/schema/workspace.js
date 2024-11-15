import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Workspace is required']
  },
  description: {
    type: String
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joinCode: {
    type: String,
    required: [true, 'Join code is required']
  },
  channel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
});

const WorkSpace = mongoose.model('Workspace', workspaceSchema);
export default WorkSpace;
