import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order-repository.interface";

import { OrderModel } from "./order.model";
import { OrderItemModel } from "./order-item.model";

import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize?.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { orderId: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order | null> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    let items: OrderItem[] = [];

    if (orderModel.items.length > 0) {
      items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        );
      });
    }

    const order = new Order(orderModel.id, orderModel.customerId, items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return orders.map((orderModel) => {
      let items: OrderItem[] = [];
      if (orderModel.items.length > 0) {
        items = orderModel.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          );
        });
      }
      const order = new Order(orderModel.id, orderModel.customerId, items);
      return order;
    });
  }
}
