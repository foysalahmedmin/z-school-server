import { Model, Types } from 'mongoose';

export type TAddress = {
  country: string;
  street: string;
  city: string;
  details?: string;
};

export type TGuardian = {
  name: string;
  relation: string;
  occupation: string;
  email: string;
  phone: string;
  address?: TAddress;
};

export type TStudent = {
  code: string;
  name: string;
  email: string;
  user: Types.ObjectId;
  phone: string;
  emergency_phone: string;
  image?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'others';
  date_of_birth?: Date;
  blood_group?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: TAddress;
  present_address: TAddress;
  guardian: TGuardian;
  local_guardian?: TGuardian;
  department?: Types.ObjectId;
  is_deleted: boolean;
};

export interface TStudentDocument extends TStudent, Document {
  _id: Types.ObjectId;
  softDelete(): Promise<TStudentDocument | null>;
}

export type TStudentModel = Model<TStudentDocument> & {
  isStudentExist(_id: string): Promise<TStudentDocument | null>;
  isStudentExistByEmail(email: string): Promise<TStudentDocument | null>;
};
