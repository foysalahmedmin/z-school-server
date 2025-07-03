import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TFullAddress,
  TGuardian,
  TName,
  TStudent,
  TStudentDocument,
  TStudentModel,
} from './student.type';

function isValidBangladeshContactNumber(value: string) {
  const bangladeshContactNumberRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
  return bangladeshContactNumberRegex.test(value);
}

const nameSchema = new Schema<TName>({
  first_name: { type: String, required: true },
  middle_name: { type: String },
  last_name: { type: String },
});

const addressSchema = new Schema<TAddress>({
  country: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  details: { type: String },
});

const fullAddressSchema = new Schema<TFullAddress>({
  present: {
    type: addressSchema,
  },
  permanent: {
    type: addressSchema,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  occupation: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
  address: addressSchema,
});

const studentSchema = new Schema<TStudentDocument, TStudentModel>({
  name: { type: nameSchema, required: true },
  code: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
  emergency_phone: {
    type: String,
    required: true,
    validate: {
      validator: isValidBangladeshContactNumber,
      message: '{VALUE} is not valid contact number',
    },
  },
  image: {
    type: String,
  },
  avatar: {
    type: String,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message:
        "The gender field can only one of the following: 'male', 'female' or 'others'",
    },
  },
  date_of_birth: { type: Date },
  blood_group: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid',
    },
  },
  address: {
    type: fullAddressSchema,
    required: true,
  },
  guardian: { type: guardianSchema, required: true },
  local_guardian: { type: guardianSchema },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Academic-Department',
  },
  is_deleted: { type: Boolean, default: false, select: false },
});

// Query middleware to exclude deleted users
studentSchema.pre(/^find/, function (this: Query<TStudent, TStudent>, next) {
  this.setQuery({
    ...this.getQuery(),
    is_deleted: { $ne: true },
  });
  next();
});

studentSchema.pre(/^update/, function (this: Query<TStudent, TStudent>, next) {
  this.setQuery({
    ...this.getQuery(),
    is_deleted: { $ne: true },
  });
  next();
});

// Aggregation pipeline
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { is_deleted: { $ne: true } } });
  next();
});

// Static methods
studentSchema.statics.isStudentExist = async function (_id: string) {
  return await this.findById(_id);
};

studentSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email: email }).select(
    '+password +password_changed_at',
  );
};

// Instance methods
studentSchema.methods.softDelete = async function () {
  this.is_deleted = true;
  return await this.save();
};

export const Student = model<TStudentDocument, TStudentModel>(
  'students',
  studentSchema,
);
