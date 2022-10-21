import { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./ListProductDto";
import { ProductOutputMapper } from "./ProductOutputMapper";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    input: InputListProductDto
  ): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return ProductOutputMapper.toOutput(products);
  }
}
