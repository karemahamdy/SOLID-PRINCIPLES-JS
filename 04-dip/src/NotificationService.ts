import { Order } from "./types.js";

export interface NotificationService {
  sendConfirmation(order: Order): void;
}
