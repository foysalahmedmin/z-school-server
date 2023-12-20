import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.route';
import { AcademicSemesterRoutes } from '../modules/academic-semester/academic-semester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
