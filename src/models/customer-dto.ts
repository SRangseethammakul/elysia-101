import { t } from "elysia";

export const customerDTO = t.Object({
  fullName: t.String({
    minLength: 5,
    error: "fullName must required",
    examples: "your first name and last name",
  }),
});
export type CustomerBody = typeof customerDTO.static;
