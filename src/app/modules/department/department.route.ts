import express from 'express';
import validation from '../../middlewares/validation.middleware';
import { DepartmentControllers } from './department.controller';
import * as DepartmentValidations from './department.validation';

const router = express.Router();

router.post('/', DepartmentControllers.createDepartment);

router.get('/', DepartmentControllers.getAllDepartments);

router.get('/:_id', DepartmentControllers.getSingleDepartment);

router.patch(
  '/:_id',
  validation(DepartmentValidations.updateDepartmentValidationSchema),
  DepartmentControllers.updateDepartment,
);

const departmentRoutes = router;

export default departmentRoutes;
