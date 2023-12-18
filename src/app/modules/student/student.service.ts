import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const findAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const findOneStudentFromDB = async (id: string) => {
  const result = await Student.find({ id: id });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, local_guardian, address, ...remainingStudentData } =
    payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    const { permanent, present } = address;
    if (permanent && Object.keys(permanent).length) {
      for (const [key, value] of Object.entries(permanent)) {
        modifiedUpdatedData[`address.permanent.${key}`] = value;
      }
    }
    if (present && Object.keys(present).length) {
      for (const [key, value] of Object.entries(present)) {
        modifiedUpdatedData[`address.present.${key}`] = value;
      }
    }
  }

  if (guardian && Object.keys(guardian[0]).length) {
    for (const [key, value] of Object.entries(guardian[0])) {
      modifiedUpdatedData[`guardian[0].${key}`] = value;
    }
  }

  if (local_guardian && Object.keys(local_guardian).length) {
    for (const [key, value] of Object.entries(local_guardian)) {
      modifiedUpdatedData[`local_guardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOneStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { is_deleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  findAllStudentsFromDB,
  findOneStudentFromDB,
  updateStudentIntoDB,
  deleteOneStudentFromDB,
};
