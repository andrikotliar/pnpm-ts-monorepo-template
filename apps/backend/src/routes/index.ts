import { Router } from 'express';
import { healthcheckRouter } from '~/routes/healthcheck.router';

export const registerRoutes = () => {
  const router = Router();
  router.use('/healthcheck', healthcheckRouter);

  return router;
};
