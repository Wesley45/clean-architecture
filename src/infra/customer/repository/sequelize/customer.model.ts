import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

interface CustomerModelAttributes {
  id: string;
  name: string;
  street: string;
  number: number;
  zipcode: string;
  city: string;
  active: boolean;
  rewardPoints: number;
}

@Table({
  tableName: "customers",
  timestamps: false,
})
export class CustomerModel extends Model<CustomerModelAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  street!: string;

  @Column({ allowNull: false })
  number!: number;

  @Column({ allowNull: false })
  zipcode!: string;

  @Column({ allowNull: false })
  city!: string;

  @Column({ allowNull: false })
  active!: boolean;

  @Column({ allowNull: false })
  rewardPoints!: number;
}
