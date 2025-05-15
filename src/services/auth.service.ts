import { dot } from 'node:test/reporters';
import prisma from '../prisma/client';
import {
  IEmailPassword,
  IUsernamePassword,
  UserTokenType,
} from '../types/user.type';
import { comparePassword } from '../utils/hash.util';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser: {
  // implementasi overloading
  (payload: IEmailPassword): Promise<UserTokenType>;
  (payload: IUsernamePassword): Promise<UserTokenType>;
} = async (
  payload: IEmailPassword | IUsernamePassword,
): Promise<UserTokenType> => {
  let user;

  if ('email' in payload) {
    user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
  } else if ('username' in payload) {
    user = await prisma.user.findFirstOrThrow({
      where: {
        name: payload.username,
      },
    });
  }

  if (!user) {
    throw new Error('User not found');
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
