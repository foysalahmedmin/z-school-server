import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.sevice';

const findAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.findAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const findOneStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.findOneStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteOneStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteOneStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student are deleted successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const StudentController = {
  findAllStudents,
  findOneStudent,
  deleteOneStudent,
};
