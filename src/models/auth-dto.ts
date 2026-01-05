import { Elysia, t } from "elysia";
import { error } from "node:console";

export const authModel = new Elysia().model({
  "auth.signUp": t.Object({
    fullName: t.String({
      minLength: 1,
      error() {
        return "fullName must required";
      },
    }),
    email: t.String({
      minLength: 1,
      format: "email",
      error(validation) {
        return validation.errors.map((err) => {
          return { message: err.message, field: err.path };
        });
      },
    }),
    password: t.String(),
  }),
  "auth.signIn": t.Object({
    email: t.String(),
    password: t.String(),
  }),
});
