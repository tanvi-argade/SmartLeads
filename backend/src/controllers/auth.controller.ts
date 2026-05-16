import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { signToken } from '../utils/jwt.utils';
import { sendSuccess, sendError } from '../utils/response.utils';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      sendError(res, 'Email already registered', 409);
      return;
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role: role || 'sales' });
    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
    sendSuccess(res, 'Registration successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }
    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
    sendSuccess(res, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    sendSuccess(res, 'User fetched', user);
  } catch (err) {
    next(err);
  }
};
