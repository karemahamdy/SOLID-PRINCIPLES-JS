import { PaymentMethod } from "./PaymentMethod.js";

export class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paying ${amount} with Credit Card`);
  }
}
