import { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";

import {
  InputShowCustomerDataDto,
  OutputShowCustomerDataDto,
} from "./ShowCustomerDataDto";

export class ShowCustomerDataUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputShowCustomerDataDto
  ): Promise<OutputShowCustomerDataDto> {
    const customer = await this.customerRepository.find(input.id);

    if (!customer) {
      throw new Error("Customer not found");
    }

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
