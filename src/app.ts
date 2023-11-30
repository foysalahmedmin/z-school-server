import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoues } from './app/modules/student/student.route';
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/students', StudentRoues);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
