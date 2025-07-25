export const logSchema = {
  body: {
    type: "object",
    required: ["service", "level", "message", "timestamp", "context"],
    properties: {
      service: { type: "string" },
      level: { type: "string", enum: ["error", "warn", "info", "debug"] },
      message: { type: "string" },
      timestamp: { type: "string" },
      context: {
        type: "object",
        additionalProperties: true
      }
    }
  }
};