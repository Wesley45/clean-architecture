import { Sequelize } from "sequelize-typescript";

import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductModel } from "@infra/product/repository/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

describe("Integration test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("Product A", 10.0);
    await productRepository.create(product);

    product.changePrice(20.0);

    const result = await updateProductUseCase.execute({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(async () => {
      await updateProductUseCase.execute({
        id: "456ABC",
        name: "Product B",
        price: 20.0,
      });
    }).rejects.toThrow("Product not found");
  });
});
