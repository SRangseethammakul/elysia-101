import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import customerController from "./controllers/customer";
import authController from "./controllers/auth";

const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .get("/", () => "Hello Elysia and bun")
  .get("/version", () => ({
    version: "1.0.0",
    stage: process.env.NODE_ENV || "development-process",
    bunStage: Bun.env.NODE_ENV || "development-bun",
  }))
  .use(customerController)
  .use(authController)
  .listen(parseInt(process.env.PORT || "3000"));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${
    app.server?.port
  }, stage: ${process.env.NODE_ENV || "development"}`
);
