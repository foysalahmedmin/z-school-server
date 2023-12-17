import express from 'express';
import { StudentRoues } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoues,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
