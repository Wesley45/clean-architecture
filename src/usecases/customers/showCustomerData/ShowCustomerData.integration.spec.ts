import { Sequelize } from "sequelize-typescript";

import { Customer } from "@domain/customer/entity/customer";
import { Address } from "@domain/customer/value-object/address";

import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";
import { CustomerModel } from "@infra/customer/repository/sequelize/customer.model";

import { ShowCustomerDataUseCase } from "./ShowCustomerDataUseCase";

describe("Test show customer data use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should show a customer", async () => {
    const customerRepository = new CustomerRepository();
    const showCustomerData = new ShowCustomerDataUseCase(customerRepository);

    const customer = new Customer("1", "John Smith");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "1",
    };

    const output = {
      id: customer.getId(),
      name: customer.name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
        country: address.country,
      },
    };

    const result = await showCustomerData.execute(input);

    expect(result).toEqual(output);
  });
});
