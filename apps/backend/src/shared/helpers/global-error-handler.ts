import type { NextFunction, Request, Response } from 'express';
import { logger } from '~/shared/integrations';

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  logger.error(err);

  if (statusCode === 500) {
    return res.status(statusCode).json({
      error: 'Internal Server Error',
    });
  }

  return res.status(statusCode).json({
    error: err.message,
  });
};
