import { createRouter, defineRoute } from '~/shared';

export const healthcheckRouter = createRouter('/healthcheck', [
  defineRoute({
    path: '/',
    method: 'get',
    handler({ response }) {
      response.status(200).send({ status: 'ok' });
    },
  }),
]);
