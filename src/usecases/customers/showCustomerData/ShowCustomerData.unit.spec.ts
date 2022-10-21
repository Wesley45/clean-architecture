import { Customer } from "@domain/customer/entity/customer";
import { Address } from "@domain/customer/value-object/address";

import { ShowCustomerDataUseCase } from "./ShowCustomerDataUseCase";

const customer = new Customer("1", "John Smith");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test show customer data use case", () => {
  it("should show a customer", async () => {
    const customerRepository = MockRepository();
    const showCustomerData = new ShowCustomerDataUseCase(customerRepository);

    const input = {
      id: "1",
    };

    const output = {
      id: customer.id,
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

  it("should throw an error when customer is not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const showCustomerData = new ShowCustomerDataUseCase(customerRepository);

    const input = {
      id: "456ABC",
    };

    expect(async () => {
      return await showCustomerData.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
