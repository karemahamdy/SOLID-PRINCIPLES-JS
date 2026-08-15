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
};

export type CompletedOrder = Order & {
  total: number;
};
