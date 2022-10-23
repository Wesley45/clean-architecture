import { Sequelize } from "sequelize-typescript";

import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductModel } from "@infra/product/repository/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { ListProductUseCase } from "./ListProductUseCase";

describe("Unit test for listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.create("Product 1", 10.0);
    const product2 = ProductFactory.create("Product 2", 20.0);

    await productRepository.create(product1);
    await productRepository.create(product2);

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
