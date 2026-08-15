# Learning Path

## Stage 01 — Bad Version

Everything is inside `OrderService`.

Your job is to identify the responsibilities and coupling problems.

Do not refactor yet.

Questions:

- What responsibilities exist?
- What can change independently?
- What happens when we add another payment method?
- What happens when we change the database?
- What happens when we change the email provider?

---

## Stage 02 — SRP

Extract:

- Order calculation
- Discount calculation
- Order persistence
- Email notification

### Exercise

Refactor `OrderService` so it coordinates these services instead of implementing them.

### Success criteria

`OrderService` should mainly orchestrate the use case.

---

## Stage 03 — OCP

Payment logic currently grows with `if`/`switch` statements.

### Exercise

Create a `PaymentMethod` contract and separate implementations.

Add:

- PayPal
- Credit Card
- Apple Pay

Then add a new payment method without changing the checkout/order service.

### Success criteria

Adding a payment method should require adding a new implementation, not editing existing payment orchestration.

---

## Stage 04 — DIP

### Problem

The high-level order service should not instantiate concrete payment, repository, or notification implementations.

### Exercise

Inject dependencies through the constructor.

### Success criteria

The order service can work with different implementations without changing its source code.

---

## Stage 05 — LSP

### Exercise

Create multiple implementations of the same payment contract.

Verify that each implementation can be substituted without breaking the order service.

Then intentionally create a broken implementation and understand why it violates LSP.

### Rule

A subtype/implementation must honor the behavior expected by its abstraction.

---

## Stage 06 — ISP

### Problem

Imagine a huge payment provider interface:

```ts
interface PaymentProvider {
  pay(amount: number): void;
  refund(id: string): void;
  saveCard(card: string): void;
  generateInvoice(orderId: string): void;
}
```

Not every provider needs every capability.

### Exercise

Split the contract into small capabilities.

Examples:

```ts
interface PaymentProcessor {
  pay(amount: number): void;
}

interface Refundable {
  refund(transactionId: string): void;
}

interface CardStorage {
  saveCard(card: string): void;
}
```

---

## Final Stage

Combine all principles.

Then answer:

1. Where is SRP used?
2. Where is OCP used?
3. Where is LSP used?
4. Where is ISP used?
5. Where is DIP used?
6. Which design pattern did you use?
7. Why is composition preferable here to deep inheritance?
