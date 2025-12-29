import { Elysia } from "elysia";

const customerController = new Elysia()
  .get("/customers", () => {
    return {
      data: ["customers data"],
    };
  })
  .get("customers/:id", ({ params: { id } }) => {
    return { id };
  })
  .post("customers", ({ body }) => {
    return body;
  })
  .patch("customers/:id/update", ({ params: { id }, body }) => {
    return {
      id,
      body,
    };
  })
  .delete("customers/:id", ({ params: { id } }) => {
    return `deleted success ${id}`;
  });

export default customerController;
