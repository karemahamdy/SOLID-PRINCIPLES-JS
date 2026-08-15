import { PaymentMethod } from "../application/PaymentMethod.js";

export class StripePayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Stripe charged ${amount}`);
  }
}
