# Stage 04 — DIP

Notice that `OrderService` does not create:

- PayPal
- Database
- Email provider

Those are injected.

## Exercise

Create:

- `StripePayment`
- `FakeNotificationService`
- `FakeOrderRepository`

Then pass them into `OrderService`.

Ask:

> Can I replace an implementation without modifying the high-level service?

If yes, you are practicing DIP.
