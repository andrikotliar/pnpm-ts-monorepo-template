import type { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (_req: Request, _res: Response, next: NextFunction) => {
  return next();
};
