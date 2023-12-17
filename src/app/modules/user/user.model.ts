import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      minlength: [6, 'the password should minimum 6 character'],
      maxlength: [12, 'the password should maximum 12 character'],
    },
    need_password_change: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Pre save middleware/ hook
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ hook
userSchema.post('save', function (document, next) {
  document.password = '';
  next();
});

// Query middleware/ hook
userSchema.pre('find', function (next) {
  this.find({ is_deleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.findOne({ is_deleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { is_deleted: { $ne: true } } });
  next();
});

export const User = mongoose.model<TUser>('User', userSchema);
