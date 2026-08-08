import { PaymentMethod } from "./PaymentMethod.js";

export class Checkout {
  complete(payment: PaymentMethod, amount: number): string {
    return payment.pay(amount);
  }
}
