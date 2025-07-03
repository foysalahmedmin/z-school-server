import express from 'express';
import auth from '../../middlewares/auth.middleware';
import validation from '../../middlewares/validation.middleware';
import * as AuthControllers from './auth.controller';
import * as AuthValidations from './auth.validation';

const router = express.Router();

router.post(
  '/signin',
  validation(AuthValidations.signinValidationSchema),
  AuthControllers.signin,
);

router.post(
  '/signup',
  validation(AuthValidations.signupValidationSchema),
  AuthControllers.signup,
);

router.post(
  '/refresh-token',
  validation(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.patch(
  '/change-password',
  auth('admin', 'faculty', 'student'),
  validation(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validation(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.patch(
  '/reset-password',
  validation(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

router.post(
  '/email-verification-source',
  auth('admin', 'faculty', 'student'),
  AuthControllers.emailVerificationSource,
);

router.post('/email-verification', AuthControllers.emailVerification);

export const authRoutes = router;
