import Fastify from 'fastify';
import { AddLogs } from '../../../controller/logIngestor.controller.ts';
import { logSchema } from './schemas/logs.schema.ts';

export const app = Fastify({
  logger: true
});

app.post('/log', { schema: logSchema }, AddLogs);

