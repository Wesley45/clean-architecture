import { CreateProductUseCase } from "./CreateProductUseCase";

const input = {
  name: "Product A",
  price: 10.0,
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();

    const createCustomerUseCase = new CreateProductUseCase(productRepository);

    const result = await createCustomerUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const createCustomerUseCase = new CreateProductUseCase(productRepository);

    expect(async () => {
      await createCustomerUseCase.execute({
        name: "",
        price: input.price,
      });
    }).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = MockRepository();
    const createCustomerUseCase = new CreateProductUseCase(productRepository);

    expect(async () => {
      await createCustomerUseCase.execute({
        name: input.name,
        price: 0,
      });
    }).rejects.toThrow("Price is required");
  });
});
