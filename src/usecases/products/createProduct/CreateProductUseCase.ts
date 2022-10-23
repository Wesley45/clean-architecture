import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";

import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./CreateProductDto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.getId(),
      name: product.name,
      price: product.price,
    };
  }
}
