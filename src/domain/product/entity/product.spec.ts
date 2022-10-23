import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrow("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrow("product: Name is required");
  });

  it("should throw an error when name is empty, id is empty and price is empty", () => {
    expect(() => {
      const customer = new Product("", "", 0);
    }).toThrowError(
      "product: Id is required,product: Name is required,product: Price is required"
    );
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toEqual("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toEqual(150);
  });
});
