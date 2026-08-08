import { PaymentMethod } from "./PaymentMethod.js";

export class OrderService {
  constructor(private readonly payment: PaymentMethod) {}

  checkout(total: number): void {
    this.payment.pay(total);
  }
}
