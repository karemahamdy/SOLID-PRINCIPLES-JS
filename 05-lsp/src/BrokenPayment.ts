import { PaymentMethod } from "./PaymentMethod.js";

export class BrokenPayment implements PaymentMethod {
  pay(_amount: number): string {
    throw new Error("This payment method cannot pay");
  }
}
