import { Elysia, t } from "elysia";

const customerController = new Elysia()
  .get("/customers", () => {
    return {
      data: ["customers data"],
    };
  })
  .get(
    "customers/:id",
    ({ params: { id }, status }) => {
      console.log("processing");
      if (id > 100) {
        return status(400, "Bad Request");
      }
      return { id };
    },
    {
      params: t.Object({
        id: t.Number({ error: `id must be number` }),
      }),
      beforeHandle: () => {
        console.log("before process");
      },
      afterHandle: () => {
        console.log("after process");
      },
    }
  )
  .post("customers", ({ body, set }) => {
    // set.status = "Created";
    set.status = 201;
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
