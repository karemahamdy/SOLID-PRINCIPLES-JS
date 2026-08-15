export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customerEmail: string;
  items: OrderItem[];
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  paymentMethod: "paypal" | "credit-card";
};

export class OrderService {
  createOrder(order: Order) {
    let total = 0;

    for (const item of order.items) {
      total += item.price * item.quantity;
    }

    if (order.discountType === "percentage") {
      total -= total * ((order.discountValue ?? 0) / 100);
    }

    if (order.discountType === "fixed") {
      total -= order.discountValue ?? 0;
    }

    if (order.paymentMethod === "paypal") {
      console.log(`Paying ${total} with PayPal`);
    }

    if (order.paymentMethod === "credit-card") {
      console.log(`Paying ${total} with Credit Card`);
    }

    console.log("Saving order to database...");
    console.log(`Sending confirmation email to ${order.customerEmail}`);

    return { ...order, total };
  }
}
