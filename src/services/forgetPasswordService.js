import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js';
import { addEmailToMailQueue } from '../producers/mailQueueProducer.js';
import userRepository from '../repositories/userRepository.js';
import { forgetPasswordMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/clientError.js';

export const forgetPasswordService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'No registered user found with this email',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '10m'
    });

    addEmailToMailQueue({
      ...forgetPasswordMail(token),
      to: user.email
    });
    return;
  } catch (error) {
    console.log('Forget Password Service error', error);
    throw error;
  }
};

export const resetPasswordService = async (token, body) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      throw new ClientError({
        explanation: 'Invalid token',
        message: 'Invalid token',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    const user = await userRepository.getByUserId(decodedToken.userId);

    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'No registered user found with this email',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const salt = await bcrypt.genSalt(9);

    const hashedPassword = bcrypt.hashSync(body.password, salt);

    const userWithUpdatedPassword = await userRepository.updatePassword(
      user,
      hashedPassword
    );
    return userWithUpdatedPassword;
  } catch (error) {
    console.log('Forget Password Service error', error);
    throw error;
  }
};
