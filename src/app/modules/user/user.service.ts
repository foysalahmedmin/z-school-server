import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academic-semester/academic-semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (
  username: string,
  password: string,
  payload: TStudent,
) => {
  // Build in static method;
  //   if (await Student.isUserExist(payload.id)) {
  //     throw new Error('User already exist!');
  //   }

  const userData: Partial<TUser> = {};

  userData.username = username || 'user' + userData.id;
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admission_semester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error('Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.username = newUser[0].username;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new Error('Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();

    throw new Error(err);
  } finally {
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
