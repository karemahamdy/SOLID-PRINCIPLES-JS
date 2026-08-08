import { CompletedOrder } from "../domain/Order.js";

export interface OrderRepository {
  save(order: CompletedOrder): void;
}
