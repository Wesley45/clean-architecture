import express, { Request, Response } from "express";

import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";

import { CreateCustomerUseCase } from "@usecases/customers/createCustomer/CreateCustomerUseCase";
import { ListCustomerUseCase } from "@usecases/customers/listCustomer/ListCustomerUseCase";

export const customerRoute = express.Router();

customerRoute.post("/", async (request: Request, response: Response) => {
  const createCustomerUseCase = new CreateCustomerUseCase(
    new CustomerRepository()
  );

  try {
    const { name, address } = request.body;

    const output = await createCustomerUseCase.execute({
      name: name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
        country: address.country,
      },
    });

    response.status(201).json(output);
  } catch (error) {
    response.status(500).send(error);
  }
});

customerRoute.get("/", async (request: Request, response: Response) => {
  const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const customers = await listCustomerUseCase.execute({});
    return response.json(customers);
  } catch (error) {
    response.status(500).send(error);
  }
});
