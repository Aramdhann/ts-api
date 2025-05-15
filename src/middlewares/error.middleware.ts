import { NextFunction, Request, Response } from 'express';
import { Prisma } from '../../prisma/generated/client';
import AppError from '../errors/AppError';

export const ErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.log(`${error.name}: ${error.message}`);

  // error from prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).send({
      message: error.message,
      code: error.code,
    });
  }

  // error app
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
      code: error.statusCode,
    });
  }

  // error unknown
  return res.status(500).send({
    message: 'Internal server error',
    error
  });
};
