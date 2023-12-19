import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academic-department.controller';
import { AcademicDepartmentValidation } from './academic-department.validation';

const router = express.Router();

router.post('/', AcademicDepartmentControllers.createAcademicDepartment);

router.get('/:_id', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch(
  '/:_id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
