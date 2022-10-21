export interface InputShowCustomerDataDto {
  id: string;
}

export interface OutputShowCustomerDataDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
    country: string;
  };
}
