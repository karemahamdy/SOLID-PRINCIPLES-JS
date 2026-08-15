import { OrderRepository } from "../application/OrderRepository.js";
import { CompletedOrder } from "../domain/Order.js";

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: CompletedOrder[] = [];

  save(order: CompletedOrder): void {
    this.orders.push(order);
  }

  all(): CompletedOrder[] {
    return [...this.orders];
  }
}
