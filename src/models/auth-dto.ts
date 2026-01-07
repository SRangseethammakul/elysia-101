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
      minLength: 10,
      format: "email",
      // error(validation) {
      //   return validation.errors.map((err) => {
      //     return { message: err.message, field: err.path };
      //   });
      // },
      error(validation) {
        return validation.errors.map((err) => {
          switch (err.type) {
            case 52:
              return { message: "email must required", field: err.path };
            case 50:
              return { message: "email format is invalid", field: err.path };
            default:
              return { message: err.message, field: err.path };
          }
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
