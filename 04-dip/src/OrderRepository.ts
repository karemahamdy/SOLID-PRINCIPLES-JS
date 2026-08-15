import { Order } from "./types.js";

export interface OrderRepository {
  save(order: Order): void;
}
