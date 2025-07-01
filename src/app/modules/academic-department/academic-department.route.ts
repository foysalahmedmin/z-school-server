import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { AcademicDepartmentControllers } from './academic-department.controller';
import { AcademicDepartmentValidation } from './academic-department.validation';

const router = express.Router();

router.post('/', AcademicDepartmentControllers.createAcademicDepartment);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get('/:_id', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch(
  '/:_id',
  validation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
