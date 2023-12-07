import { Schema, model } from 'mongoose';
import {
  TAddress,
  TGuardian,
  TName,
  TStudent,
  TStudentMethods,
  TStudentModel,
} from './student.interface';

function capitalizeValidator(value: string) {
  const correctValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return value === correctValue;
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidBangladeshContactNumber(value: string) {
  const bangladeshContactNumberRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
  return bangladeshContactNumberRegex.test(value);
}

function isValidURL(url: string) {
  var urlPattern =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|(\d{1,3}\.){3}\d{1,3}(\:\d+)?)(\/[^\s]*)?$/;
  return urlPattern.test(url);
}

const nameSchema = new Schema<TName>({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 20,
    trim: true,
    validate: {
      validator: capitalizeValidator,
      message: '{VALUE} is not in capitalize format',
    },
  },
  middle_name: {
    type: String,
    maxlength: 20,
    trim: true,
    validate: {
      validator: capitalizeValidator,
      message: '{VALUE} is not in capitalize format',
    },
  },
  last_name: {
    type: String,
    maxlength: 20,
    trim: true,
    validate: {
      validator: capitalizeValidator,
      message: '{VALUE} is not in capitalize format',
    },
  },
});

const addressSchema = new Schema<TAddress>({
  present: { type: String, required: true },
  permanent: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  occupation: { type: String, required: true },
  contact_number: {
    type: String,
    required: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
  address: addressSchema,
});

const StudentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: nameSchema,
    required: true,
  },
  profile_image: {
    type: String,
    validate: {
      validator: isValidURL,
      message: '{VALUE} is not valid url',
    },
  },
  avatar: {
    type: String,
    validate: {
      validator: isValidURL,
      message: '{VALUE} is not valid url',
    },
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
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidEmail,
      message: '{VALUE} is not valid email address',
    },
  },
  contact_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
  emergency_contact_number: {
    type: String,
    required: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
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

// Custom instance methods ;
StudentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, TStudentModel>('Student', StudentSchema);
