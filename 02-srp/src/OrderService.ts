import { DiscountService } from "./DiscountService.js";
import { EmailService } from "./EmailService.js";
import { OrderCalculator } from "./OrderCalculator.js";
import { OrderRepository } from "./OrderRepository.js";
import { Order, OrderWithTotal } from "./types.js";

export class OrderService {
  constructor(
    private readonly calculator: OrderCalculator,
    private readonly discounts: DiscountService,
    private readonly repository: OrderRepository,
    private readonly email: EmailService
  ) {}

  createOrder(order: Order): OrderWithTotal {
    const subtotal = this.calculator.calculateSubtotal(order);
    const total = this.discounts.apply(order, subtotal);

    const completedOrder = { ...order, total };

    this.repository.save(completedOrder);
    this.email.sendConfirmation(completedOrder);

    return completedOrder;
  }
}
