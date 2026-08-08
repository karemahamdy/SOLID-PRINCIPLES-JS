import { Order } from "../domain/Order.js";

export class DiscountService {
  apply(order: Order, subtotal: number): number {
    if (order.discountType === "percentage") {
      return Math.max(
        0,
        subtotal - subtotal * ((order.discountValue ?? 0) / 100)
      );
    }

    if (order.discountType === "fixed") {
      return Math.max(0, subtotal - (order.discountValue ?? 0));
    }

    return subtotal;
  }
}
