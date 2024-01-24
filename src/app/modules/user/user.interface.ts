import { Model, Types } from 'mongoose';

export interface TUser {
  _id?: Types.ObjectId;
  id: string;
  username: string;
  email: string;
  password: string;
  need_password_change: boolean;
  password_changed_at?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  is_deleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExist(_id: string): Promise<TUser>;
  isUserExistById(id: string): Promise<TUser>;
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforeChangedPassword(
    passwordChangedTimestamp: Date,
    JWTIssuedTimestamp: number,
  ): Promise<boolean>;
}
