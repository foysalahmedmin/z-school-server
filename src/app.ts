import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoues } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/students', StudentRoues);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to z-university server!');
});

export default app;
