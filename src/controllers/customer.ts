import { Elysia } from "elysia";

const customerController = new Elysia().get("/customers", () => {
  return {
    data: ["customers data"],
  };
});

export default customerController;
