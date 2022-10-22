import request from "supertest";
import { validate } from "uuid";

import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/products").send({
      name: "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial",
      price: 6969.0,
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(validate(response.body.id)).toBeTruthy();
    expect(response.body.name).toBe(
      "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial"
    );
    expect(response.body.price).toBe(6969.0);
  });

  it("should not create a new product", async () => {
    const response = await request(app).post("/products").send({
      name: "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/products").send({
      name: "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial",
      price: 6969.0,
    });
    expect(response.status).toBe(201);

    const response2 = await request(app).post("/products").send({
      name: "Notebook XPS 13 Plus",
      price: 11047.0,
    });
    expect(response2.status).toBe(201);

    const output = await request(app).get("/products").send();

    const { products } = output.body;

    expect(output.status).toBe(200);
    expect(products.length).toBe(2);

    expect(products[0].name).toBe(
      "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial"
    );
    expect(products[0].price).toBe(6969.0);

    expect(products[1].name).toBe("Notebook XPS 13 Plus");
    expect(products[1].price).toBe(11047.0);
  });

  it("should find a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial",
      price: 6969.0,
    });
    expect(response.status).toBe(201);

    const output = await request(app)
      .get(`/products/${response.body.id}`)
      .send();

    expect(output.status).toBe(200);
    expect(output.body.name).toBe(
      "Apple Macbook Air 13 Chip M1 256gb De Ssd 8gb Cinza-espacial"
    );
    expect(output.body.price).toBe(6969.0);
  });
});
