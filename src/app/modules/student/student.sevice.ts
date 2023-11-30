import { Student } from './student.interface';
import { StudentModel } from './student.model';

const findAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const findOneStudentFromDB = async (id: string) => {
  const result = await StudentModel.find({ id: id });
  return result;
};

const insertStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  findAllStudentsFromDB,
  findOneStudentFromDB,
  insertStudentIntoDB,
};
