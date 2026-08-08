import { NotificationService } from "../application/NotificationService.js";
import { CompletedOrder } from "../domain/Order.js";

export class EmailNotificationService implements NotificationService {
  sendConfirmation(order: CompletedOrder): void {
    console.log(`Email sent to ${order.customerEmail}`);
  }
}
