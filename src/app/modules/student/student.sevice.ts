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

const insertStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // Build in static method;
  const studentInstance = new Student(studentData);
  if (await studentInstance.isUserExist(studentData.id)) {
    throw new Error('User already exist!');
  }
  const result = await studentInstance.save(); // Instance method;
  return result;
};

export const StudentServices = {
  findAllStudentsFromDB,
  findOneStudentFromDB,
  insertStudentIntoDB,
};
