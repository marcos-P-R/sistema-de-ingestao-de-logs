import { app } from "./routes/route.ts";

export function initializeServer() {
  app.listen({ host: process.env.HOST, port: Number(process.env.PORT ?? 3000) }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}