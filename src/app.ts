import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to z-university server!');
});

// Error handle;
app.use(globalErrorHandler);

// Not found rout;
app.use(notFound);

export default app;
