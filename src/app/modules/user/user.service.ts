import mongoose from 'mongoose';
import config from '../../config';
import { Faculty } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.type';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.type';
import { User } from './user.model';
import { TUser, TUserDocument } from './user.type';
import { generateStudentCode } from './user.utils';

const createStudentIntoDB = async (
  email: string,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  userData.email = email;
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await Semester.findById(payload.semester);
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [createdUser] = (await User.create([userData], {
      session,
    })) as TUserDocument[];

    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    payload.code = await generateStudentCode(admissionSemester);
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

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
