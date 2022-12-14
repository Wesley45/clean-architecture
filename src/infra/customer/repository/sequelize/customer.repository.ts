import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "./../../../../domain/customer/repository/customer-repository.interface";
import { CustomerModel } from "./customer.model";
import { Address } from "../../../../domain/customer/value-object/address";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }

  async find(id: string): Promise<Customer | null> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
      "BRA"
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map((customer) => {
      const customerModel = new Customer(customer.id, customer.name);
      customerModel.addRewardPoints(customer.rewardPoints);
      const address = new Address(
        customer.street,
        customer.number,
        customer.zipcode,
        customer.city,
        "BRA"
      );
      customerModel.changeAddress(address);
      if (customer.active) {
        customerModel.activate();
      }
      return customerModel;
    });
  }
}
