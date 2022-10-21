import { CustomerFactory } from "@domain/customer/factory/CustomerFactory";
import { Address } from "@domain/customer/value-object/address";

import { ListCustomerUseCase } from "./ListCustomerUseCase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Rua dois", 1, "12345-678", "São Paulo", "BRA")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA")
);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
