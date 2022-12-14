import { Customer } from "@domain/customer/entity/customer";

import { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";

import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./ListCustomerUseCaseDto";

export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  public async execute(
    input: InputListCustomerDto
  ): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.getId(),
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
          country: customer.Address.country,
        },
      })),
    };
  }
}
