import { PaymentMethod } from "./PaymentMethod.js";

export class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paying ${amount} with PayPal`);
  }
}
