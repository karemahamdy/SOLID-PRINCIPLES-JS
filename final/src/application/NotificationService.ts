import { CompletedOrder } from "../domain/Order.js";

export interface NotificationService {
  sendConfirmation(order: CompletedOrder): void;
}
