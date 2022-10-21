import { Customer } from "@domain/customer/entity/customer";
import { Address } from "@domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

const customer = new Customer("1", "John Smith");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
customer.changeAddress(address);

const input = {
  id: "1",
  name: "John",
  address: {
    street: "Rua dois",
    number: 2,
    zip: "12345-678",
    city: "São Paulo",
    country: "BRA",
  },
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn().mockReturnValue(Promise.resolve(input)),
  };
};

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
