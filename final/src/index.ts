import { DiscountService } from "./application/DiscountService.js";
import { OrderService } from "./application/OrderService.js";
import { OrderCalculator } from "./application/OrderCalculator.js";
import { EmailNotificationService } from "./infrastructure/EmailNotificationService.js";
import { InMemoryOrderRepository } from "./infrastructure/InMemoryOrderRepository.js";
import { PayPalPayment } from "./infrastructure/PayPalPayment.js";

const service = new OrderService(
  new OrderCalculator(),
  new DiscountService(),
  new PayPalPayment(),
  new InMemoryOrderRepository(),
  new EmailNotificationService()
);

const result = service.create({
  id: "order-1",
  customerEmail: "customer@example.com",
  items: [
    {
      id: "p1",
      name: "Keyboard",
      price: 100,
      quantity: 2
    },
    {
      id: "p2",
      name: "Mouse",
      price: 50,
      quantity: 1
    }
  ],
  discountType: "percentage",
  discountValue: 10
});

console.log(result);
