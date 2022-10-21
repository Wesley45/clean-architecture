import { Product } from "../../product/entity/product";
import { RepositoryInterface } from "../../@shared/repository/repository-interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
