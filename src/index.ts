import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routers/user.router';
import { ErrorHandler } from './middlewares/error.middleware';
import { PortType } from './types/user.type';

dotenv.config();

// assign type secara literal
// const PORT: number | string = process.env.PORT || 3000;

// assign type secara union
const PORT: PortType = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());

// route
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

// error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler(error, req, res, next);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
