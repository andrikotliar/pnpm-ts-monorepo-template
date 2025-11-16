import { Router } from 'express';

const healthcheckRouter = Router();

healthcheckRouter.get('/', (_req, res) => {
  res.status(200).send({ status: 'ok' });
});

export { healthcheckRouter };
