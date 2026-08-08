import { DiscountService } from "./DiscountService.js";
import { NotificationService } from "./NotificationService.js";
import { OrderCalculator } from "./OrderCalculator.js";
import { OrderRepository } from "./OrderRepository.js";
import { PaymentMethod } from "./PaymentMethod.js";
import { Order, CompletedOrder } from "../domain/Order.js";

export class OrderService {
  constructor(
    private readonly calculator: OrderCalculator,
    private readonly discount: DiscountService,
    private readonly payment: PaymentMethod,
    private readonly repository: OrderRepository,
    private readonly notification: NotificationService
  ) {}

  create(order: Order): CompletedOrder {
    const subtotal = this.calculator.subtotal(order);
    const total = this.discount.apply(order, subtotal);

    const completedOrder = {
      ...order,
      total
    };

    this.payment.pay(total);
    this.repository.save(completedOrder);
    this.notification.sendConfirmation(completedOrder);

    return completedOrder;
  }
}
