import type { FastifyReply } from "fastify/types/reply.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { LogDto } from "./log.dto.ts";
import { LogService } from "../service/log.service.ts";

export async function AddLogs(request: FastifyRequest<{ Body: LogDto }>, reply: FastifyReply) {
  const body: LogDto = request.body;

  try {
    const service = await LogService(body);

    reply.code(201).send(service)
  } catch (error: any) {
    reply.code(500).send({
      error: error.message,
      stack: error
    })
  }
}