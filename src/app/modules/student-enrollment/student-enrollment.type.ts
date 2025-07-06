import { Document, Types } from 'mongoose';

export interface IStudentEnrollment extends Document {
  student: Types.ObjectId;
  session: Types.ObjectId;
  department: Types.ObjectId;
  class: Types.ObjectId;
  section: Types.ObjectId;
  roll: string;
  group?: string;
  is_promoted: boolean;
  promoted_to?: Types.ObjectId;
  status: 'active' | 'passed' | 'repeated' | 'dropped';
}
