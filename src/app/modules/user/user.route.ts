import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(studentValidations.createStudentValidation),
  userController.createStudent,
);

export const UserRoutes = router;
