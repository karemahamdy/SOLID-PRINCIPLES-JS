import { Order } from "./types.js";

export class OrderCalculator {
  calculateSubtotal(order: Order): number {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
