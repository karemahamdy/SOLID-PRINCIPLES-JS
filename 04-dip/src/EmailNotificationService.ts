import { NotificationService } from "./NotificationService.js";
import { Order } from "./types.js";

export class EmailNotificationService implements NotificationService {
  sendConfirmation(order: Order): void {
    console.log(`Email sent to ${order.customerEmail}`);
  }
}
