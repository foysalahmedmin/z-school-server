import { Types } from 'mongoose';
export interface TLogin {
  id: string;
  password: string;
}

export interface TUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface TJwtPayload {
  _id?: Types.ObjectId;
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'student' | 'faculty';
}
