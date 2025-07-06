import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { FacultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.post(
  '/',
  validation(facultyValidations.createFacultyValidationSchema),
  FacultyControllers.createFaculty,
);

router.get('/', FacultyControllers.getAllFaculties);

router.get('/:_id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:_id',
  validation(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

const facultyRoutes = router;

export default facultyRoutes;
