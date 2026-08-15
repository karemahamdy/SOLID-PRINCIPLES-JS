import { describe, expect, it } from "vitest";
import { DiscountService } from "../final/src/application/DiscountService.js";

describe("DiscountService", () => {
  it("applies percentage discounts", () => {
    const service = new DiscountService();

    const total = service.apply(
      {
        id: "1",
        customerEmail: "test@example.com",
        items: [],
        discountType: "percentage",
        discountValue: 10
      },
      200
    );

    expect(total).toBe(180);
  });

  it("does not allow a fixed discount below zero", () => {
    const service = new DiscountService();

    const total = service.apply(
      {
        id: "1",
        customerEmail: "test@example.com",
        items: [],
        discountType: "fixed",
        discountValue: 300
      },
      200
    );

    expect(total).toBe(0);
  });
});
