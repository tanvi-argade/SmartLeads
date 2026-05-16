import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/user.types';
import { sendError } from '../utils/response.utils';

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      sendError(res, 'Forbidden insufficient role', 403);
      return;
    }
    next();
  };
};
