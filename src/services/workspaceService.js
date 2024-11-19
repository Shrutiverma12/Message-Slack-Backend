import { v4 as uuidv4 } from 'uuid';

import workspaceReository from '../repositories/workspaceRepository.js';
import ValidationError from '../utils/errors/validationError.js';

export const createWorkspaceService = async (workspaceData) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();
    const response = await workspaceReository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    });
    await workspaceReository.addMemberToWorkspace(
      response._id,
      workspaceData.owner,
      'admin'
    );

    const updatedWorkspace = await workspaceReository.addChannelToWorkspace(
      response._id,
      'general'
    );
    return updatedWorkspace;
  } catch (error) {
    console.log('Create workspace service error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A workspace with details already exists']
        },
        'A workspace with details already exists'
      );
    }
    throw error;
  }
};

// export const joinMemberService = async (data) => {
//   try {
//   } catch (error) {}
// };
