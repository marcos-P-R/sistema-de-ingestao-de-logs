import { Kafka, type Producer } from "@confluentinc/kafka-javascript/types/kafkajs.js"
import type { LogDto } from "../../../controller/log.dto.ts";

export class KafkaClient {
  private static instance: KafkaClient
  private buffer: LogDto[] = []
  private readonly client: Kafka
  private readonly SERVER_URL: string = String(process.env.SERVER_URL ?? "");
  private readonly KAFKA_CLIENT_ID: string = String(process.env.KAFKA_CLIENT_ID ?? "");
  private readonly KAFKA_CLIENT_TOPIC: string = String(process.env.KAFKA_CLIENT_TOPIC ?? "");
  private readonly API_SECRET: string = String(process.env.API_SECRET ?? "");
  private readonly API_KEY: string = String(process.env.API_KEY ?? "");
  private readonly MAX_BATCH_SIZE = Number(process.env.MAX_BATCH_SIZE ?? 20);
  private readonly FLUSH_INTERVAL_MS = Number(process.env.FLUSH_INTERVAL_MS ?? 2000);

  constructor() {
    this.client = new Kafka({
      kafkaJS: {
        clientId: this.KAFKA_CLIENT_ID,
        brokers: [this.SERVER_URL],
        ssl: true,
        sasl: {
          mechanism: "plain",
          username: this.API_KEY,
          password:
            this.API_SECRET,
        },
      }
    })

    setInterval(() => this.flush(), this.FLUSH_INTERVAL_MS)
  }

  public static getInstance(): KafkaClient {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient()
    }
    return KafkaClient.instance
  }

  private producer(): Producer {
    return this.client.producer({
      "enable.idempotence": true,
    });
  }

  async producerMessage(body: Array<{value: string}>) {
    await this.producer().connect();

    await this.producer().send({
      topic: this.KAFKA_CLIENT_TOPIC,
      messages: body
    });

    await this.producer().disconnect();
  }

  public async addLog(body: LogDto): Promise<void> {
    this.buffer.push(body)
    if (this.buffer.length >= this.MAX_BATCH_SIZE) {
      await this.flush()
    }
  }

  private async flush(): Promise<void> {
    if (this.flush.length === 0) return

    const messages = this.buffer.map((log: LogDto): {value: string} => ({ value: JSON.stringify(log) }))

    try {
      await this.producerMessage(messages)

      console.log(`🚀 Enviados ${messages.length} logs para o Kafka`)
    } catch (error) {
      console.error('❌ Falha ao enviar logs:', error)
      throw error;
    } finally {
      this.buffer = []
    }
  }
}