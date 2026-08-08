import { Order } from "../domain/Order.js";

export class OrderCalculator {
  subtotal(order: Order): number {
    return order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
