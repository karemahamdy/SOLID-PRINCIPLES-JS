# Stage 03 — OCP

The old design used:

```ts
if (paymentType === "paypal") {}
if (paymentType === "credit-card") {}
```

Now payment behavior is extensible.

## Exercise

Create:

```ts
class StripePayment implements PaymentMethod
```

without changing `OrderService.ts`.

That is the point of OCP.
