import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/auth.service';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userToken = await userService.loginUser({
      email: req.body.email,
      password: req.body.password,
    });

    const { password, ...safeUser } = userToken;

    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};
