import * as yup from "yup";

import { ValidatorInterface } from "@domain/@shared/validator/validator.interface";

import { Product } from "../entity/product";

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .min(1, "Price is required")
            .required("Price is required"),
        })
        .validateSync(
          {
            id: entity.getId(),
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
