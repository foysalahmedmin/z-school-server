import { Types } from 'mongoose';

export type TAcademicDepartment = {
  _id?: Types.ObjectId;
  name: string;
  faculty: Types.ObjectId;
};
