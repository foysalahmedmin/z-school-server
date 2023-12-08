import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/insert', StudentController.insertStudent);
router.get('/', StudentController.findAllStudents);
router.get('/:username', StudentController.findOneStudent);

export const StudentRoues = router;
