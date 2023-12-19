import { Model, Types } from 'mongoose';

export interface TName {
  first_name: string;
  middle_name?: string;
  last_name?: string;
}

export interface TAddress {
  country: string;
  street: string;
  city: string;
  details?: string;
}

export interface TFullAddress {
  present?: TAddress;
  permanent: TAddress;
}

export interface TGuardian {
  name: string;
  relation: string;
  occupation: string;
  contact_number: string;
  address?: TAddress;
}

export interface TMainGuardian {
  first_guardian: TGuardian;
  second_guardian?: TGuardian;
}

export interface TStudent {
  id: string;
  user: Types.ObjectId;
  username: string;
  name: TName;
  profile_image?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'others';
  date_of_birth?: Date;
  email: string;
  contact_number: string;
  emergency_contact_number: string;
  blood_group?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: TFullAddress;
  guardian: TMainGuardian;
  local_guardian?: TGuardian;
  admission_semester: Types.ObjectId;
  academic_department?: Types.ObjectId;
  is_deleted: boolean;
}

// For static methods;
export interface TStudentModel extends Model<TStudent> {
  isUserExist(username: string): Promise<TStudent | null>;
}

// For instance methods;
// export interface TStudentMethods {
//   isUserExist(username: string): Promise<TStudent | null>;
// }

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
