import { OrderRepository } from "./OrderRepository.js";
import { Order } from "./types.js";

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Order[] = [];

  save(order: Order): void {
    this.orders.push(order);
  }

  all(): Order[] {
    return [...this.orders];
  }
}
