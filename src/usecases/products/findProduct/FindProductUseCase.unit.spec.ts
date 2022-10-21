import { FindProductUseCase } from "./FindProductUseCase";

const input = {
  id: "1",
  name: "Product A",
  price: 10.0,
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(input)),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const result = await findProductUseCase.execute({ id: input.id });

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const input = {
      id: "456ABC",
    };

    expect(async () => {
      return await findProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
