import express from 'express';
import { academicDepartmentRoutes } from '../modules/academic-department/academic-department.route';
import { authRoutes } from '../modules/auth/auth.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { studentRoues } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoues,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
