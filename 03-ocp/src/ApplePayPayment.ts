import { PaymentMethod } from "./PaymentMethod.js";

export class ApplePayPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paying ${amount} with Apple Pay`);
  }
}
