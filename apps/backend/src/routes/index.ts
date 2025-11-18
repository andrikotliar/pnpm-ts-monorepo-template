import { Router } from 'express';
import { healthcheckRouter } from '~/routes/healthcheck.router';
import { userExampleRouter } from '~/routes/user-example.router';

const routers = [healthcheckRouter, userExampleRouter];

export const registerRoutes = () => {
  const rootRouter = Router();

  for (const router of routers) {
    rootRouter.use(router.path, router.router);
  }

  return rootRouter;
};
