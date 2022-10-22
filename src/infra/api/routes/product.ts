import { Router, Request, Response } from "express";

import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { CreateProductUseCase } from "@usecases/products/createProduct/CreateProductUseCase";
import { FindProductUseCase } from "@usecases/products/findProduct/FindProductUseCase";
import { ListProductUseCase } from "@usecases/products/listProduct/ListProductUseCase";

export const productRoute = Router();

productRoute.get("/", async (request: Request, response: Response) => {
  try {
    const listProductUseCase = new ListProductUseCase(new ProductRepository());
    const products = await listProductUseCase.execute({});
    return response.json(products);
  } catch (error) {
    response.status(500).send(error);
  }
});

productRoute.post("/", async (request: Request, response: Response) => {
  const createProductUseCase = new CreateProductUseCase(
    new ProductRepository()
  );

  try {
    const { name, price } = request.body;

    const product = await createProductUseCase.execute({
      name,
      price,
    });

    return response.status(201).json(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

productRoute.get("/:id", async (request: Request, response: Response) => {
  const findProductUseCase = new FindProductUseCase(new ProductRepository());

  try {
    const { id } = request.params;

    const product = await findProductUseCase.execute({
      id,
    });

    return response.json(product);
  } catch (error) {
    response.status(500).send(error);
  }
});
