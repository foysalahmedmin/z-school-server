import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TGuardian,
  TStudent,
  TStudentDocument,
  TStudentModel,
} from './student.type';

const addressSchema = new Schema<TAddress>({
  country: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  details: { type: String },
});

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: true, trim: true },
  relation: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  address: addressSchema,
});

const studentSchema = new Schema<TStudentDocument, TStudentModel>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
    emergency_phone: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
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
    address: { type: addressSchema, required: true },
    present_address: { type: addressSchema, required: true },
    guardian: { type: guardianSchema, required: true },
    local_guardian: { type: guardianSchema },
    is_deleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

studentSchema.virtual('enrollment', {
  ref: 'StudentEnrollment',
  localField: '_id',
  foreignField: 'student',
  justOne: true,
  match: { status: 'active' },
});

studentSchema.virtual('enrollments', {
  ref: 'StudentEnrollment',
  localField: '_id',
  foreignField: 'student',
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
  'Student',
  studentSchema,
);
