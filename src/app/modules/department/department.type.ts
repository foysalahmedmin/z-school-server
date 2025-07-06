import { Types } from 'mongoose';

export type TDepartment = {
  _id?: Types.ObjectId;
  name: string;
  faculty: Types.ObjectId;
};
