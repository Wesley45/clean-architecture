import { Entity } from "@domain/@shared/entity/entity.abstract";
import { NotificationError } from "@domain/@shared/notification/notification.error";

import { Address } from "../value-object/address";

export class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "customer",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer",
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
