import { OrderWithTotal } from "./types.js";

export class EmailService {
  sendConfirmation(order: OrderWithTotal): void {
    console.log(`Sending confirmation to ${order.customerEmail}`);
  }
}
