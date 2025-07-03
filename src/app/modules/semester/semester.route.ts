import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { SemesterControllers } from './semester.controller';
import * as SemesterValidations from './semester.validation';

const router = express.Router();

router.post(
  '/',
  validation(SemesterValidations.semesterValidationSchema),
  SemesterControllers.createSemester,
);

router.get('/:_id', SemesterControllers.getSingleSemester);

router.patch(
  '/:_id',
  validation(SemesterValidations.semesterValidationSchema.partial()),
  SemesterControllers.updateSemester,
);

router.get('/', SemesterControllers.getAllSemesters);

export const SemesterRoutes = router;
