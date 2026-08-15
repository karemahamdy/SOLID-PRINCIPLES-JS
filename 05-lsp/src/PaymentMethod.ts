export interface PaymentMethod {
  pay(amount: number): string;
}
