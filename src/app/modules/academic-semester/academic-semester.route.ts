import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { AcademicSemesterControllers } from './academic-semester.controller';
import { AcademicSemesterValidations } from './academic-semester.validation';

const router = express.Router();

router.post(
  '/',
  validation(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/:_id', AcademicSemesterControllers.getSingleAcademicSemester);

router.patch(
  '/:_id',
  validation(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const academicSemesterRoutes = router;
