import { describe, expect, it } from "vitest";
import { OrderCalculator } from "../final/src/application/OrderCalculator.js";

describe("OrderCalculator", () => {
  it("calculates the subtotal", () => {
    const calculator = new OrderCalculator();

    const total = calculator.subtotal({
      id: "1",
      customerEmail: "test@example.com",
      items: [
        { id: "1", name: "Keyboard", price: 100, quantity: 2 },
        { id: "2", name: "Mouse", price: 50, quantity: 1 }
      ]
    });

    expect(total).toBe(250);
  });
});
