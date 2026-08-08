import { PaymentMethod } from "./PaymentMethod.js";

export class CreditCardPayment implements PaymentMethod {
  pay(amount: number): string {
    return `Credit Card charged ${amount}`;
  }
}
