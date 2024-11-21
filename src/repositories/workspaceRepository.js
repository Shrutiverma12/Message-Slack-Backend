import { StatusCodes } from 'http-status-codes';

import User from '../schema/user.js';
import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudReository.js';

const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceDetailsById: async function (worksapceId) {
    const workspace = await Workspace.findById(worksapceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels');
    return workspace;
  },

  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statuscode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({
      joinCode
    });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statuscode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statuscode: StatusCodes.NOT_FOUND
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statuscode: StatusCodes.NOT_FOUND
      });
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId === memberId
    );

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User alredy part of workspace',
        statuscode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({
      memberId,
      role
    });

    await workspace.save();

    return workspace;
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace =
      await Workspace.findById(workspaceId).populate('channels');
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statuscode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelAlredayPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    );

    if (isChannelAlredayPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel alredy part of workspace',
        statuscode: StatusCodes.FORBIDDEN
      });
    }

    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId
    });
    workspace.channels.push(channel);
    await workspace.save();
    return workspace;
  },

  fetchAllWorkspaceByMemberId: async function (memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');
    return workspaces;
  }
};

export default workspaceRepository;
