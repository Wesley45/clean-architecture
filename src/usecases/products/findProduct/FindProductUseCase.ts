import { Product } from "@domain/product/entity/product";
import { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";

import { InputFindProductDto, OutputFindProductDto } from "./FindProductDto";

export class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    input: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);
    if (!product) {
      throw new Error("Product not found");
    }

    const foundProduct = new Product(input.id, product.name, product.price);

    return {
      id: foundProduct.getId(),
      name: foundProduct.name,
      price: foundProduct.price,
    };
  }
}
