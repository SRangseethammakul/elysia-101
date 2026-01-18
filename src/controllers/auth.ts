import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

import { authModel } from "../models/auth-dto";
import {
  getProfileService,
  signInService,
  signUpService,
} from "../services/auth-service";
const authController = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      exp: "1d",
    }),
  )
  .use(authModel)
  .post(
    "/sign-up",
    async ({ body, set }) => {
      const results = await signUpService(body);
      if (results.success) {
        return { message: results.message };
      } else {
        return new Response(results.message, { status: 400 });
      }
    },
    {
      body: "auth.signUp",
    },
  )
  .post(
    "/sign-in",
    async ({ jwt, body }) => {
      const results = await signInService(body.email, body.password);
      if (results.success) {
        const value = await jwt.sign({
          iss: `created at by ${process.env.NODE_ENV} environment`,
          id: results.id,
        });
        return { message: "Logged in successfully", token: value };
      } else {
        return new Response(results.message, { status: 401 });
      }
    },
    {
      body: "auth.signIn",
    },
  )
  .get("/profile", async ({ jwt, status, headers: { authorization } }) => {
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : undefined;
    const payload = await jwt.verify(token);

    if (!payload) return status(401, "Unauthorized");
    const profile = await getProfileService(Number(payload.id));
    return `Hello ${payload.id} and your email is ${profile.profile.email}`;
  });

export default authController;
