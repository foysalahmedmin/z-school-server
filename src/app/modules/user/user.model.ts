import bcrypt from 'bcrypt';
import mongoose, { Query, Schema } from 'mongoose';
import config from '../../config';
import { TUser, TUserDocument, TUserModel } from './user.type';

const userSchema = new Schema<TUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'the password should minimum 6 character'],
      maxlength: [12, 'the password should maximum 12 character'],
      select: false,
    },
    password_changed_at: { type: Date, default: Date.now, select: false },
    role: {
      type: String,
      enum: [
        'super-admin',
        'admin',
        'editor',
        'author',
        'contributor',
        'subscriber',
        'user',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { is_deleted: false },
    name: 'unique_email_not_deleted',
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.password_changed_at;
  delete user.is_deleted;
  return user;
};

userSchema.post('save', function (document, next) {
  document.password = '';
  next();
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
    if (!this.isNew) {
      this.password_changed_at = new Date();
    }
  }

  if (this.isModified('email')) {
    this.is_verified = false;
  }

  next();
});

userSchema.pre(/^find/, function (this: Query<TUser, TUser>, next) {
  this.setQuery({
    ...this.getQuery(),
    is_deleted: { $ne: true },
  });
  next();
});

userSchema.pre(/^update/, function (this: Query<TUser, TUser>, next) {
  this.setQuery({
    ...this.getQuery(),
    is_deleted: { $ne: true },
  });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { is_deleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExist = async function (_id: string) {
  return await this.findById(_id).select('+password +password_changed_at');
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email: email }).select(
    '+password +password_changed_at',
  );
};

userSchema.methods.softDelete = async function () {
  this.is_deleted = true;
  return await this.save();
};

userSchema.methods.isPasswordChanged = function (jwtTimestamp: number) {
  const passwordChangedTimestamp = Math.floor(
    this.password_changed_at.getTime() / 1000,
  );
  return jwtTimestamp < passwordChangedTimestamp;
};

export const User = mongoose.model<TUserDocument, TUserModel>(
  'User',
  userSchema,
);
