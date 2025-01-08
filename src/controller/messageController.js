import { StatusCodes } from 'http-status-codes';

import { cloudinaryConfig } from '../config/cloudinaryConfig.js';
import { getMessagesService } from '../services/messagesService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const getMessages = async (req, res) => {
  try {
    const response = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );
    console.log('Con', req);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Messages fetched successfully'));
  } catch (error) {
    console.log('User Controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getUrlFromCloudinary = async (req, res) => {
  try {
    const url = await cloudinaryConfig.url(Date.now(), {
      secure: true,
      sign_url: true,
      //transformation: transformations,
      expires_at: 60
    });
    return res
      .status(StatusCodes.OK)
      .json(successResponse(url, 'Presigned url fetched successfully'));
  } catch (error) {
    console.log('Error in imageUrl', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
