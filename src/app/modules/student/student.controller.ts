import { Request, Response } from 'express';
import { StudentServices } from './student.sevice';

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
  insertStudent,
};
