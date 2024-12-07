import express from 'express';

import {
  forgetPassword,
  resetPassword
} from '../../controller/forgetPasswordController.js';
import { signIn, signUp } from '../../controller/userController.js';
import {
  forgetPasswordSchema,
  reaetPasswordSchema,
  userSignInSchema,
  userSignUpSchema
} from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUp);

router.post('/signin', validate(userSignInSchema), signIn);

router.post('/forgetPassword', validate(forgetPasswordSchema), forgetPassword);

router.post(
  '/reset-password/:token',
  validate(reaetPasswordSchema),
  resetPassword
);

export default router;
