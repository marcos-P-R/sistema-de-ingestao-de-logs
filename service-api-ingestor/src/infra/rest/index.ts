import { app } from "./routes/route.ts";

export function initializeServer() {
  app.listen({ port: 3000 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}