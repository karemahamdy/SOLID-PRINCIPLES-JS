import { PaymentMethod } from "./PaymentMethod.js";

export class PayPalPayment implements PaymentMethod {
  pay(amount: number): string {
    return `PayPal charged ${amount}`;
  }
}
