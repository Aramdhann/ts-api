import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, id } = req.params;

    if (id) {
      const user = await userService.findUser({ id });
      res.status(200).json(user);
    }

    if (email) {
      const user = await userService.findUser({ email });
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};
