import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./order-item.model";

interface OrderModelAttributes {
  id: string;
  customerId: string;
  customer: CustomerModel;
  items: OrderItemModel[];
  total: number;
}

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  customerId!: string;

  @BelongsTo(() => CustomerModel)
  customer!: CustomerModel;

  @HasMany(() => OrderItemModel)
  items!: OrderItemModel[];

  @Column({ allowNull: false })
  total!: number;
}
