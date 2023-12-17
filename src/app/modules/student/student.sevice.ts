import { Student } from './student.model';

const findAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const findOneStudentFromDB = async (id: string) => {
  const result = await Student.find({ id: id });
  return result;
};

const deleteOneStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { is_deleted: true });
  return result;
};

export const StudentServices = {
  findAllStudentsFromDB,
  findOneStudentFromDB,
  deleteOneStudentFromDB,
};
