import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

const input = {
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
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const result = await createCustomerUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
        country: input.address.country,
      },
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    expect(async () => {
      await createCustomerUseCase.execute(input);
    }).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    expect(async () => {
      await createCustomerUseCase.execute(input);
    }).rejects.toThrow("Street is required");
  });
});
