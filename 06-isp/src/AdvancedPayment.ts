import {
  CardStorage,
  PaymentProcessor,
  Refundable
} from "./capabilities.js";

export class AdvancedPayment
  implements PaymentProcessor, Refundable, CardStorage
{
  pay(amount: number): void {
    console.log(`Paid ${amount}`);
  }

  refund(transactionId: string): void {
    console.log(`Refunded ${transactionId}`);
  }

  saveCard(cardToken: string): void {
    console.log(`Stored card ${cardToken}`);
  }
}
