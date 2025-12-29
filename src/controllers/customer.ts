import { Elysia } from "elysia";

const customerController = new Elysia()
  .get("/customers", () => {
    return {
      data: ["customers data"],
    };
  })
  .get("customers/:id", ({ params: { id } }) => {
    return { id };
  });

export default customerController;
