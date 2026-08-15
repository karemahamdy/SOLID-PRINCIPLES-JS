import { OrderWithTotal } from "./types.js";

export class OrderRepository {
  save(order: OrderWithTotal): void {
    console.log(`Saving order ${order.id}`);
  }
}
