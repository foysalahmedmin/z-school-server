import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  FacultyControllers.createFaculty,
);

router.get('/', FacultyControllers.getAllFaculties);

router.get('/:_id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:_id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

export const FacultyRoutes = router;
