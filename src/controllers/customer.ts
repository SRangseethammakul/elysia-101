import { Elysia, t } from "elysia";
import { customerDTO } from "../models/customer-dto";
import {
  createCustomerService,
  deleteCustomerService,
  getCustomerByIdService,
  getCustomersService,
  updateCustomerService,
} from "../services/customer";

const customerController = new Elysia()
  .get("/customers", async () => {
    const customers = await getCustomersService();
    return {
      data: customers,
    };
  })
  .get(
    "customers/:id",
    async ({ params: { id }, status }) => {
      if (id > 100) {
        return status(400, "Bad Request");
      }
      console.log("processing");
      const customer = await getCustomerByIdService(id);

      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
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
      error() {
        return { message: "Handled" };
      },
    }
  )
  .post(
    "customers",
    async ({ body, set }) => {
      // set.status = "Created";
      set.status = 201;
      const [customer] = await createCustomerService(body);
      return customer;
    },
    {
      body: customerDTO,
    }
  )
  .patch(
    "customers/:id/update",
    async ({ params: { id }, body, status }) => {
      const customer = await getCustomerByIdService(id);

      if (!customer) {
        return status(404, "Customer not found");
      }
      await updateCustomerService(id, body);
      return {
        id,
        body,
      };
    },
    {
      params: t.Object({
        id: t.Number({ error: `id must be number` }),
      }),
      body: customerDTO,
    }
  )
  .delete(
    "customers/:id",
    async ({ params: { id } }) => {
      await deleteCustomerService(id);
      return `deleted success ${id}`;
    },
    {
      params: t.Object({
        id: t.Number({ error: `id must be number` }),
      }),
    }
  )
  .onError(({ code }) => {
    console.log("Global error handler:", code);
  });

export default customerController;
