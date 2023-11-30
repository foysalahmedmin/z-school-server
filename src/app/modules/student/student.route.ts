import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/insert', StudentController.insertStudent);

export const StudentRoues = router;
