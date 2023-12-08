import { TStudent } from './student.interface';
import { Student } from './student.model';

const insertStudentIntoDB = async (studentData: TStudent) => {
  // Build in static method;
  if (await Student.isUserExist(studentData.username)) {
    throw new Error('User already exist!');
  }
  const result = await Student.create(studentData);

  // Instance method;
  // const studentInstance = new Student(studentData);
  // if (await studentInstance.isUserExist(studentData.id)) {
  //   throw new Error('User already exist!');
  // }
  // const result = await studentInstance.save();

  return result;
};

const findAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const findOneStudentFromDB = async (username: string) => {
  const result = await Student.find({ username: username });
  return result;
};

const deleteOneStudentFromDB = async (username: string) => {
  const result = await Student.updateOne(
    { username: username },
    { is_deleted: true },
  );
  return result;
};

export const StudentServices = {
  findAllStudentsFromDB,
  findOneStudentFromDB,
  insertStudentIntoDB,
  deleteOneStudentFromDB,
};
