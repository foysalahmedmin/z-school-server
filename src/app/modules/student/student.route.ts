import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validation(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteOneStudent);

export const studentRoues = router;
