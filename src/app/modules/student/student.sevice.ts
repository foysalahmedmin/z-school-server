import { Student } from './student.interface';
import { StudentModel } from './student.model';

const insertStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  insertStudentIntoDB,
};
