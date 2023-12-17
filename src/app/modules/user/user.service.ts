import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (
  username: string,
  password: string,
  studentData: TStudent,
) => {
  // Build in static method;
  //   if (await Student.isUserExist(studentData.id)) {
  //     throw new Error('User already exist!');
  //   }

  const userData: Partial<TUser> = {};

  userData.username = username || 'user' + userData.id;
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.id = '000001';

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.username = newUser.username;
    studentData.user = newUser._id;
    const newStudent = Student.create(studentData);
    return newStudent;
  }

  return;
};

export const UserServices = {
  createStudentIntoDB,
};
