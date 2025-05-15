import { NextFunction, Request, Response } from 'express';

export const ErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Error: ', error);
  res
    .status(500)
    .json({ message: 'Something went wrong: ', error: error.message });
};
