import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "@infra/product/repository/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { CreateProductUseCase } from "./CreateProductUseCase";

describe("Integration test create product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createCustomerUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product A",
      price: 10.0,
    };

    const result = await createCustomerUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(result).toEqual(output);
  });
});
