import { Types } from 'mongoose';
export interface TLogin {
  id: string;
  password: string;
}

export interface TChangePassword {
  current_password: string;
  new_password: string;
}

export interface TForgetPassword {
  id: string;
}

export interface TResetPassword {
  id: string;
  new_password: string;
}

export interface TJwtPayload {
  _id?: Types.ObjectId;
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'student' | 'faculty';
}
