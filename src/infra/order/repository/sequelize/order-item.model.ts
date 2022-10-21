import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { OrderModel } from "./order.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";

interface OrderItemModelAttributes {
  id: string;
  productId: string;
  product: ProductModel;
  orderId: string;
  order: OrderModel;
  quantity: number;
  name: string;
  price: number;
}

@Table({
  tableName: "order_items",
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  productId!: string;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  orderId!: string;

  @BelongsTo(() => OrderModel)
  order!: OrderModel;

  @Column({ allowNull: false })
  quantity!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  price!: number;
}
