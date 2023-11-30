import { Schema, model } from 'mongoose';
import { Address, Guardian, Name, Student } from './student.interface';

const nameSchema = new Schema<Name>({
  first_name: { type: String, required: [true, 'First name is required'] },
  middle_name: { type: String },
  last_name: { type: String },
});

const addressSchema = new Schema<Address>({
  present: { type: String, required: true },
  permanent: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  occupation: { type: String, required: true },
  contact_number: { type: String, required: true },
  address: addressSchema,
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: nameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message:
        "The gender field can only one of the following: 'male', 'female' or 'others'",
    },
  },
  date_of_birth: { type: String },
  email: { type: String, required: true, unique: true },
  contact_number: { type: String, required: true, unique: true },
  emergency_contact_number: { type: String, required: true },
  blood_group: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid',
    },
  },
  address: {
    type: addressSchema,
    required: true,
  },
  guardian: { type: [guardianSchema], required: true },
  local_guardian: { type: guardianSchema, required: true },
  is_active: { type: Boolean, default: true, required: true },
});

export const StudentModel = model<Student>('Student', StudentSchema);
