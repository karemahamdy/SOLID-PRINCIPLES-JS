export interface PaymentProcessor {
  pay(amount: number): void;
}

export interface Refundable {
  refund(transactionId: string): void;
}

export interface CardStorage {
  saveCard(cardToken: string): void;
}
