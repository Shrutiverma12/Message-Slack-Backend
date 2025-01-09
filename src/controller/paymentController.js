import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpayConfig.js';
import { CURRENCY, RECEIPT_SECRET } from '../config/serverConfig.js';
import { internalErrorResponse } from '../utils/common/responseObjects.js';

export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: CURRENCY,
      receipt: RECEIPT_SECRET
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new Error('Failed to create order');
    }
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Order created successfully',
      date: order
    });
  } catch (error) {
    console.log('Error in createOrderController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const capturePaymentController = async (req, res) => {
  try {
    console.log('Req body', req.body);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Payment captured successfully',
      date: payment
    });
  } catch (error) {
    console.log('Error in createOrderController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
