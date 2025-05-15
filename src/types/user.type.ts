import { User } from '../../prisma/generated/client';

export interface ICreateUser {
  // id: string
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserIdentifierType = { id: string } | { email: string };

export type PortType = number | string;

// menggabungkan type User dengan property token
export type UserTokenType = User & {
  token: string;
};

// jika ingin menyembunyikan password dan id
export type SafeUserType = Omit<User, 'password' | 'id'>;

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IUsernamePassword {
  username: string;
  password: string;
}
