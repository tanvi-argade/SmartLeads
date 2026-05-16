import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { MongoError } from 'mongodb';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('[ERROR]', err);

  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.errors.forEach(e => {
      const key = e.path.join('.');
      if (!errors[key]) errors[key] = [];
      errors[key].push(e.message);
    });
    res.status(422).json({ success: false, message: 'Validation failed', errors });
    return;
  }

  if ((err as MongoError).code === 11000) {
    res.status(409).json({ success: false, message: 'Duplicate entry — record already exists' });
    return;
  }

  const status = (err as any).status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
