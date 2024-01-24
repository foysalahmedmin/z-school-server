import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TJwtPayload, TLogin, TUpdatePassword } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistById(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.is_deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted!');
  }

  if (user?.status == 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const jwtPayload: TJwtPayload = {
    _id: user._id,
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expires_in as string,
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    jwt_payload: jwtPayload,
    need_password_change: user?.need_password_change,
  };
};

const updatePassword = async (
  userData: JwtPayload,
  payload: TUpdatePassword,
) => {
  const user = await User.isUserExistById(userData.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.is_deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted!');
  }

  if (user?.status == 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked!');
  }

  if (
    !(await User.isPasswordMatched(payload?.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updatedResult = await User.findByIdAndUpdate(
    userData._id,
    {
      password: hashedNewPassword,
      password_changed_at: new Date(),
      need_password_change: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  const result = await User.findById(updatedResult?._id);

  return result;
};

const refreshToken = async (token: string) => {
  const { id, iat } = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await User.isUserExistById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.is_deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted!');
  }

  if (user?.status == 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked!');
  }

  if (
    user?.password_changed_at &&
    (await User.isJWTIssuedBeforeChangedPassword(
      user.password_changed_at,
      iat as number,
    ))
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You do not have the necessary permissions to access this resource.',
    );
  }

  const jwtPayload: TJwtPayload = {
    _id: user._id,
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );

  return {
    access_token: accessToken,
    jwt_payload: jwtPayload,
  };
};

export const AuthServices = {
  loginUser,
  updatePassword,
  refreshToken,
};
