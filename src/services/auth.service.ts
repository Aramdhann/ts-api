import { dot } from 'node:test/reporters';
import prisma from '../prisma/client';
import {
  IEmailPassword,
  IUsernamePassword,
  UserTokenType,
} from '../types/user.type';
import { comparePassword } from '../utils/hash.util';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

// Overloading
export function loginUser(payload: IEmailPassword): Promise<UserTokenType>;
export function loginUser(payload: IUsernamePassword): Promise<UserTokenType>;

export async function loginUser(
  payload: IEmailPassword | IUsernamePassword,
): Promise<UserTokenType> {
  let user;

  if ('email' in payload) {
    user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
  } else if ('username' in payload) {
    user = await prisma.user.findFirst({
      where: {
        name: payload.username,
      },
    });
  }

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email/password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET ?? 'default-secret',
    {
      expiresIn: '1h',
    },
  );

  return {
    ...user,
    token,
  };
};
