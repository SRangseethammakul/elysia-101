import { Elysia } from "elysia";
import { authModel } from "../models/auth-dto";
const authController = new Elysia({ prefix: "/auth" })
  .use(authModel)
  .post(
    "/sign-up",
    ({ body }) => {
      return "registered";
    },
    {
      body: "auth.signUp",
    }
  )
  .post(
    "/sign-in",
    ({ body }) => {
      return "logged in";
    },
    {
      body: "auth.signIn",
    }
  );

export default authController;
