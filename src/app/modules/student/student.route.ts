import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { StudentController } from './student.controller';
import * as studentValidations from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validation(studentValidations.studentValidationSchema.partial()),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteOneStudent);

const studentRoues = router;

export default studentRoues;
