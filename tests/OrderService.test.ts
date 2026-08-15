import { describe, expect, it } from "vitest";
import { OrderService } from "../final/src/application/OrderService.js";
import { OrderCalculator } from "../final/src/application/OrderCalculator.js";
import { DiscountService } from "../final/src/application/DiscountService.js";
import { PaymentMethod } from "../final/src/application/PaymentMethod.js";
import { OrderRepository } from "../final/src/application/OrderRepository.js";
import { NotificationService } from "../final/src/application/NotificationService.js";

describe("OrderService", () => {
  it("uses injected dependencies", () => {
    let paidAmount = 0;
    let saved = false;
    let notified = false;

    const payment: PaymentMethod = {
      pay(amount) {
        paidAmount = amount;
      }
    };

    const repository: OrderRepository = {
      save() {
        saved = true;
      }
    };

    const notification: NotificationService = {
      sendConfirmation() {
        notified = true;
      }
    };

    const service = new OrderService(
      new OrderCalculator(),
      new DiscountService(),
      payment,
      repository,
      notification
    );

    const result = service.create({
      id: "order-1",
      customerEmail: "test@example.com",
      items: [{ id: "p1", name: "Book", price: 100, quantity: 2 }]
    });

    expect(result.total).toBe(200);
    expect(paidAmount).toBe(200);
    expect(saved).toBe(true);
    expect(notified).toBe(true);
  });
});
