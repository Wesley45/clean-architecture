import { ProductFactory } from "@domain/product/factory/product.factory";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

const product = ProductFactory.create("Product A", 10.0);

const input = {
  id: product.getId(),
  name: product.name,
  price: 20.0,
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn().mockReturnValue(Promise.resolve(input)),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute({
      id: product.getId(),
      name: product.name,
      price: input.price,
    });

    expect(output).toEqual(input);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    input.id = "456ABC";

    expect(async () => {
      return await updateProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
