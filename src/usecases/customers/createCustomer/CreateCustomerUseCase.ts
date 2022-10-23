import { v4 as uuid } from "uuid";

import { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";

import { Address } from "@domain/customer/value-object/address";
import { CustomerFactory } from "@domain/customer/factory/CustomerFactory";

import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./CreateCustomerDto";

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.country
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.getId(),
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
        country: customer.Address.country,
      },
    };
  }
}
