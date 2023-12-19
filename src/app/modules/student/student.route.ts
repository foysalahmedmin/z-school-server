import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentController.findAllStudents);
router.get('/:id', StudentController.findOneStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteOneStudent);

export const StudentRoues = router;
