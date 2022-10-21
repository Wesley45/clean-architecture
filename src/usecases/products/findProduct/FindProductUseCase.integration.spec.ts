import { Sequelize } from "sequelize-typescript";

import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductModel } from "@infra/product/repository/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { FindProductUseCase } from "./FindProductUseCase";

describe("Integration test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create("Product A", 10.0);

    await productRepository.create(product);

    const result = await findProductUseCase.execute({ id: product.id });

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    await expect(async () => {
      await findProductUseCase.execute({ id: "456ABC" });
    }).rejects.toThrow("Product not found");
  });
});
