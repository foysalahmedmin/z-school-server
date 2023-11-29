import { Schema, model } from 'mongoose';
import { Address, Guardian, Name, Student } from './student.interface';

const NameSchema = new Schema<Name>({
  first_name: { type: String, required: true },
  middle_name: { type: String },
  last_name: { type: String },
});

const AddressSchema = new Schema<Address>({
  present: { type: String, required: true },
  permanent: { type: String, required: true },
});

const GuardianSchema = new Schema<Guardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  occupation: { type: String, required: true },
  contact_number: { type: String, required: true },
  address: AddressSchema,
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    type: NameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  date_of_birth: { type: String },
  email: { type: String, required: true },
  contact_number: { type: String, required: true },
  emergency_contact_number: { type: String, required: true },
  blood_group: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  guardian: { type: [GuardianSchema], required: true },
  local_guardian: { type: GuardianSchema, required: true },
  is_active: { type: Boolean, required: true },
});

export const StudentModel = model<Student>('Student', StudentSchema);
