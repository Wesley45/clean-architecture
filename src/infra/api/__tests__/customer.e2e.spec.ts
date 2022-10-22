import request from "supertest";

import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "Rua dois",
          number: 2,
          zip: "12345-678",
          city: "São Paulo",
          country: "BR",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Rua dois");
    expect(response.body.address.number).toBe(2);
    expect(response.body.address.zip).toBe("12345-678");
    expect(response.body.address.city).toBe("São Paulo");
    expect(response.body.address.country).toBe("BR");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "Rua dois",
          number: 1,
          zip: "12345-678",
          city: "São Paulo",
          country: "BR",
        },
      });

    expect(response.status).toBe(201);

    const response2 = await request(app)
      .post("/customers")
      .send({
        name: "Jane Doe",
        address: {
          street: "Rua três",
          number: 2,
          zip: "12345-678",
          city: "São Paulo",
          country: "BR",
        },
      });

    expect(response2.status).toBe(201);

    const output = await request(app).get("/customers").send();

    const customers = output.body;

    expect(output.status).toBe(200);
    expect(customers.customers.length).toBe(2);

    expect(customers.customers[0].name).toBe("John Doe");
    expect(customers.customers[0].address.street).toBe("Rua dois");

    expect(customers.customers[1].name).toBe("Jane Doe");
    expect(customers.customers[1].address.street).toBe("Rua três");
  });
});
