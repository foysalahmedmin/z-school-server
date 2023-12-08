import { Request, Response } from 'express';
import { StudentServices } from './student.sevice';
import studentValidationSchema from './student.validation';

const insertStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const parsedData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.insertStudentIntoDB(parsedData);

    res.status(200).json({
      success: true,
      message: 'Student is inserted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is went wrong',
      error: err,
    });
  }
};

const findAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.findAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is went wrong',
      error: err,
    });
  }
};
const findOneStudent = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const result = await StudentServices.findOneStudentFromDB(username);

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is went wrong',
      error: err,
    });
  }
};

export const StudentController = {
  findAllStudents,
  findOneStudent,
  insertStudent,
};
