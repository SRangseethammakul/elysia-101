import { Elysia } from "elysia";
import customerController from "./controllers/customer";

const app = new Elysia()
  .get("/", () => "Hello Elysia and bun")
  .get("/version", () => "1.0.0")
  .use(customerController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
