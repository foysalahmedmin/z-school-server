import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../builder/AppError';
import AppQuery from '../../builder/AppQuery';
import config from '../../config';
import { User } from '../user/user.model';
import { TUser, TUserDocument } from '../user/user.type';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import { TStudent } from './student.type';
import {
  formatStudentUpdatePayload,
  generateStudentCode,
} from './student.utils';

export const createStudentIntoDB = async (
  email: string,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  userData.email = email;
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [createdUser] = (await User.create([userData], {
      session,
    })) as TUserDocument[];

    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    payload.code = await generateStudentCode();
    payload.user = createdUser._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new Error('Failed to create student');
    }

    await session.commitTransaction();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();

    throw new Error(err);
  } finally {
    await session.endSession();
  }
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new AppQuery(
    Student.find()
      .populate('user')
      .populate('semester')
      .populate({
        path: 'department',
        populate: {
          path: 'faculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.query;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('user')
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const modifiedUpdatedData = await formatStudentUpdatePayload(payload);
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

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Failed to delete student');
  } finally {
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteOneStudentFromDB,
};
