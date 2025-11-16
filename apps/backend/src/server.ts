import express from 'express';
import path from 'node:path';
import bodyParser from 'body-parser';
import { envConfig, globalErrorHandler, logger } from '~/shared';
import { registerRoutes } from '~/routes';

const app = express();
const appRouter = registerRoutes();

app.use(bodyParser.json());

app.use('/api', appRouter);

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use(globalErrorHandler);

app.get('/{*any}', (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));
});

app.listen(envConfig.PORT, () => {
  logger.info(`Server is running at http://localhost:${envConfig.PORT}`);
});
