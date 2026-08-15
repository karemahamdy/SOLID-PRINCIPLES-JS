import { PaymentMethod } from "../application/PaymentMethod.js";

export class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`PayPal charged ${amount}`);
  }
}
