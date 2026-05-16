import jwt from 'jsonwebtoken';
import { IUserPayload } from '../types/user.types';

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signToken = (payload: IUserPayload): string =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN } as jwt.SignOptions);

export const verifyToken = (token: string): IUserPayload | null => {
  try {
    return jwt.verify(token, SECRET) as IUserPayload;
  } catch {
    return null;
  }
};
