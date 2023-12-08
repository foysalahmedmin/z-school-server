import { Model } from 'mongoose';

export interface TName {
  first_name: string;
  middle_name?: string;
  last_name?: string;
}

export interface TAddress {
  present: string;
  permanent: string;
}

export interface TGuardian {
  name: string;
  relation: string;
  occupation: string;
  contact_number: string;
  address?: TAddress;
}

export interface TStudent {
  username: string;
  password: string;
  name: TName;
  profile_image?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'others';
  date_of_birth?: string;
  email: string;
  contact_number: string;
  emergency_contact_number: string;
  blood_group?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: TAddress;
  guardian: TGuardian[];
  local_guardian?: TGuardian;
  is_active: boolean;
}

// For static methods;
export interface TStudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}

// For instance methods;
// export interface TStudentMethods {
//   isUserExist(id: string): Promise<TStudent | null>;
// }

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
