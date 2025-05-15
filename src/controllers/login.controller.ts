import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/auth.service';
import { createResponse } from '../utils/response.util';
import AppError from '../errors/AppError';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name } = req.body;

    let userToken;

    if (email) {
      userToken = await userService.loginUser({
        email,
        password,
      });
    } else if (name) {
      userToken = await userService.loginUser({
        username: name,
        password,
      });
    } else {
      throw new AppError('Email or Username is required', 404);
    }

    const {password: _, ...safeUser} = userToken
    
    res.status(200).json(createResponse(200, 'Login Success', safeUser));
  } catch (error) {
    next(error);
  }
};
