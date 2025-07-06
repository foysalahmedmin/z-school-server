import express from 'express';
import authRoutes from '../modules/auth/auth.route';
import departmentRoutes from '../modules/department/department.route';
import facultyRoutes from '../modules/faculty/faculty.route';
import studentRoues from '../modules/student/student.route';
import userRoutes from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/student',
    route: studentRoues,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
  {
    path: '/department',
    route: departmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
