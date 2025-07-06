import { Types } from 'mongoose';

export type TSemester = {
  _id?: Types.ObjectId;
  name: string; // 'Autumn' | 'Summer' | 'Fall' | 'HalfYear' | 'FullYear'
  code: string; // '01' | '02' | '03' | '04' | '05'
  year: string;
  start: Date;
  end: Date;
};
