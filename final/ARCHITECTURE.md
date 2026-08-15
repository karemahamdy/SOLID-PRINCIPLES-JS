# Final Architecture

```text
Domain
  ↓
Application / Business Logic
  ↓
Interfaces (ports)
  ↓
Infrastructure implementations
```

## SOLID Map

### SRP

- `OrderCalculator` calculates totals.
- `DiscountService` applies discounts.
- `OrderService` coordinates the use case.
- `InMemoryOrderRepository` persists orders.
- `EmailNotificationService` sends notifications.

### OCP

New payment methods can implement `PaymentMethod` without modifying `OrderService`.

### LSP

Any valid `PaymentMethod` implementation can be passed to `OrderService`.

### ISP

Small contracts such as `PaymentMethod`, `NotificationService`, and `OrderRepository` expose only what consumers need.

### DIP

`OrderService` depends on abstractions/interfaces rather than concrete infrastructure implementations.

## Pattern Connection

`PaymentMethod` + multiple implementations is a Strategy-style design.

Dependency injection supplies the chosen strategy to the use case.
