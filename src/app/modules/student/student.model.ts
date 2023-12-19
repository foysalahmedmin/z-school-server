import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TFullAddress,
  TGuardian,
  TMainGuardian,
  TName,
  TStudent,
  // TStudentMethods,
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

const mainGuardianSchema = new Schema<TMainGuardian>({
  first_guardian: {
    type: addressSchema,
    required: true,
  },
  second_guardian: {
    type: addressSchema,
  },
});

const StudentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    username: { type: String, required: true, unique: true },
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
      type: fullAddressSchema,
      required: true,
    },
    guardian: { type: mainGuardianSchema, required: true },
    local_guardian: { type: guardianSchema, required: true },
    admission_semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Academic-Semester',
    },
    academic_department: { type: Schema.Types.ObjectId },
    is_deleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
StudentSchema.virtual('full_name').get(function () {
  return (
    this.name.first_name +
    ' ' +
    this.name.middle_name +
    ' ' +
    this.name.last_name
  );
});

// Query middleware/ hook
StudentSchema.pre(/^find/, function (this: Query<TStudent, Document>, next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { is_deleted: { $ne: true } } });
  next();
});

// Custom static methods ;
StudentSchema.statics.isUserExist = async function (username: string) {
  const existingUser = await Student.findOne({ username: username });
  return existingUser;
};

// Custom instance methods ;
StudentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

export const Student = model<TStudent, TStudentModel>('Student', StudentSchema);
