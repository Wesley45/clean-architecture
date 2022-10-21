import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("123", "Test", []);
    }).toThrowError("Item qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);
    expect(order.total()).toEqual(200);
  });

  it("should throw error if the item qtd is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
