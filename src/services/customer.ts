import { sql } from "../db";
import { CustomerBody } from "../models/customer-dto";

export async function createCustomerService(customer: CustomerBody) {
  return await sql`INSERT INTO customers (fullname) VALUES (${customer.fullName}) RETURNING *`;
}
export async function getCustomersService() {
  return await sql`SELECT * FROM customers order by id desc`;
}
export async function getCustomerByIdService(id: number) {
  const [customer] = await sql`SELECT * FROM customers WHERE id = ${id}`;
  return customer;
}
export async function updateCustomerService(
  id: number,
  customer: CustomerBody
) {
  const [updatedCustomer] =
    await sql`UPDATE customers SET fullName = ${customer.fullName} WHERE id = ${id} RETURNING *`;
  return updatedCustomer;
}
export async function deleteCustomerService(id: number) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
}
