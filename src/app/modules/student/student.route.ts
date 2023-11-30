import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.findAllStudents);
router.get('/:id', StudentController.findOneStudent);
router.post('/insert', StudentController.insertStudent);

export const StudentRoues = router;
