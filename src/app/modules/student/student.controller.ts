import { Request, Response } from 'express';
import { StudentServices } from './student.sevice';

const findAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.findAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const findOneStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.findOneStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const insertStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.insertStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is inserted successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  findAllStudents,
  findOneStudent,
  insertStudent,
};
