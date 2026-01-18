import { Elysia } from "elysia";
import { logger } from "@bogeychan/elysia-logger";
import { openapi } from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import customerController from "./controllers/customer";
import authController from "./controllers/auth";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(logger())
  .use(staticPlugin({ prefix: "/images", assets: "public" }))
  .use(
    openapi({
      documentation: {
        info: {
          title: "Elysia 101 API",
          version: "1.0.2",
          description: "This is a sample Elysia 101 API",
        },
      },
    }),
  )
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
  }, stage: ${process.env.NODE_ENV || "development"}`,
);
