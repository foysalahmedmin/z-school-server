import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/student/insert', StudentController.insertStudent);
