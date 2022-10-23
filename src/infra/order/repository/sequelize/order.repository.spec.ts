import { Sequelize } from "sequelize-typescript";

import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Product } from "../../../../domain/product/entity/product";

import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";

import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.getId(),
      2
    );

    const order = new Order("123", customer.getId(), [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.getId(),
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.getId(),
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.getId(),
      2
    );

    const order = new Order("123", customer.getId(), [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          orderId: order.id,
          quantity: orderItem.quantity,
          name: orderItem.name,
          price: orderItem.price,
        },
      ],
    });
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Order not found");
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.getId(),
      2
    );

    let order = new Order("1", customer.getId(), [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.getId(),
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.getId(),
        },
      ],
    });

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product.getId(),
      1
    );

    order = new Order("1", customer.getId(), [orderItem, orderItem2]);
    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(orderModel2?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.getId(),
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.getId(),
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order.id,
          productId: product.getId(),
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BRA");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.getId(),
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product.getId(),
      2
    );

    const order = new Order("123", customer.getId(), [orderItem]);
    await orderRepository.create(order);

    const order2 = new Order("456", customer.getId(), [orderItem2]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    const orders = [order, order2];

    expect(foundOrders.length).toBe(2);
    expect(orders).toEqual(foundOrders);
  });
});
