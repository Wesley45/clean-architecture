import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ProductModelAttributes {
  id: string;
  name: string;
  price: number;
}

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model<ProductModelAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  price!: number;
}
