export interface Name {
  first_name: string;
  middle_name?: string;
  last_name?: string;
}

export interface Address {
  present: string;
  permanent: string;
}

export interface Guardian {
  name: string;
  relation: string;
  occupation: string;
  contact_number: string;
  address?: Address;
}

export interface Student {
  id: string;
  name: Name;
  profile_image?: string;
  avatar?: string;
  gender?: 'male' | 'female';
  date_of_birth?: string;
  email: string;
  contact_number: string;
  emergency_contact_number: string;
  blood_group?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: Address;
  guardian: Guardian[];
  local_guardian?: Guardian;
  is_active: boolean;
}
