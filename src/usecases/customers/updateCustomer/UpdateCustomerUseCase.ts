import { Address } from "@domain/customer/value-object/address";

import { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";

import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./UpdateCustomerDto";

export class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    if (!customer) {
      throw new Error("Customer not found");
    }

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.country
      )
    );

    await this.customerRepository.update(customer);

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
