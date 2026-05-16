import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types/common.types';

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data: T,
  status = 200,
  meta?: PaginationMeta
): void => {
  const response: ApiResponse<T> = { success: true, message, data, meta };
  res.status(status).json(response);
};

export const sendError = (res: Response, message: string, status = 400): void => {
  res.status(status).json({ success: false, message });
};
