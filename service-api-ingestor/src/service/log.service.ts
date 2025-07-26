import type { LogDto } from "../controller/log.dto.ts";
import { KafkaClient } from "../infra/gateway/messageria/kafka.client.ts";

export async function LogService(body: LogDto) {
  const messageria = KafkaClient.getInstance();

  await messageria.addLog(body);

  return 'OK';
}