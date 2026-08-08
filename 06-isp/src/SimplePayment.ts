import { PaymentProcessor } from "./capabilities.js";

export class SimplePayment implements PaymentProcessor {
  pay(amount: number): void {
    console.log(`Paid ${amount}`);
  }
}
