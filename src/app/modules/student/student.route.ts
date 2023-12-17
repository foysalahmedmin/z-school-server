import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.findAllStudents);
router.get('/:id', StudentController.findOneStudent);
router.delete('/:id', StudentController.deleteOneStudent);

export const StudentRoues = router;
