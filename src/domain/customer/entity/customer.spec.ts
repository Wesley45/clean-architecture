import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit test", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "Teste");
    }).toThrowError("Id is required");
  });

  test("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("", "Teste");
    }).toThrowError("Id is required");
  });

  test("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toEqual("Jane");
  });

  test("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo", "BR");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive).toBe(true);
  });

  test("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deactivate();
    expect(customer.isActive).toBe(false);
  });

  test("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
