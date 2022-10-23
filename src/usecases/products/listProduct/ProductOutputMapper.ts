import { Product } from "@domain/product/entity/product";
import { OutputListProductDto } from "./ListProductDto";

export class ProductOutputMapper {
  public static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.getId(),
        name: product.name,
        price: product.price,
      })),
    };
  }
}
