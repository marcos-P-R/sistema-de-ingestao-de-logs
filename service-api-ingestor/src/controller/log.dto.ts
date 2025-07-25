export type LogLevel = "error" | "warn" | "info" | "debug";

export interface LogDto {
  service: string;
  level: LogLevel;
  message: string;
  timestamp: Date;
  context: Record<string, any>
}