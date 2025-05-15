import { uuid } from 'uuidv4';
import prisma from '../prisma/client';
import { ICreateUser, UserIdentifierType } from '../types/user.type';
import { hashPassword } from '../utils/hash.util';

export const createUser = async (data: ICreateUser) => {
  const hashedPassword = await hashPassword(data.password);

  const id = uuid();

  return await prisma.user.create({
    // untuk menambahkan data dari interface ICreateUser
    data: {
      id,
      ...data,
      password: hashedPassword,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    // untuk mengambil data yang diinginkan
    select: {
      email: true,
      name: true,
      createdAt: true,
    },
  });
};

export const findUser = async (identifier: UserIdentifierType) => {
  if ('id' in identifier) {
    const id = identifier.id;
    if (id === undefined) {
      throw new Error('Id is required to find a user');
    }
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  if ('email' in identifier) {
    const email = identifier.email;
    if (email === undefined) {
      throw new Error('Email is required to find a user');
    }
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
};
