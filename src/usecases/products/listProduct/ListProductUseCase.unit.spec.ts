import { ProductFactory } from "@domain/product/factory/product.factory";

import { ListProductUseCase } from "./ListProductUseCase";

const product1 = ProductFactory.create("Product 1", 10.0);
const product2 = ProductFactory.create("Product 2", 20.0);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list a product", async () => {
    const producRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(producRepository);

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.getId());
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.getId());
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
