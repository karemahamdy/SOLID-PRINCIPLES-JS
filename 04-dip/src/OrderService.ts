import { NotificationService } from "./NotificationService.js";
import { OrderRepository } from "./OrderRepository.js";
import { PaymentMethod } from "./PaymentMethod.js";
import { Order } from "./types.js";

export class OrderService {
  constructor(
    private readonly payment: PaymentMethod,
    private readonly repository: OrderRepository,
    private readonly notification: NotificationService
  ) {}

  createOrder(order: Order): void {
    this.payment.pay(order.total);
    this.repository.save(order);
    this.notification.sendConfirmation(order);
  }
}
