import { Product } from "@domain/product/entity/product";
import { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./UpdateProductDto";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const productAlreadyExists = await this.productRepository.find(input.id);
    if (!productAlreadyExists) {
      throw new Error("Product not found");
    }
    const productModel = new Product(input.id, input.name, input.price);
    await this.productRepository.update(productModel);
    return {
      id: input.id,
      name: input.name,
      price: input.price,
    };
  }
}
