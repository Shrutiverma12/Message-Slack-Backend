import { StatusCodes } from 'http-status-codes';

import {
  forgetPasswordService,
  resetPasswordService
} from '../services/forgetPasswordService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const forgetPassword = async (req, res) => {
  try {
    const user = await forgetPasswordService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'Forget password process successfully'));
  } catch (error) {
    console.log('Forget password Controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
export const resetPassword = async (req, res) => {
  try {
    const user = await resetPasswordService(req.params.token, req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'New password created successfully'));
  } catch (error) {
    console.log('Forget password error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
