import type { FastifyReply } from "fastify/types/reply.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { LogDto } from "./log.dto.ts";

export function AddLogs(request: FastifyRequest<{Body: LogDto}>, reply: FastifyReply) {
  const body: LogDto = request.body;

  console.log(body)

  reply.code(201).send('OK')
}