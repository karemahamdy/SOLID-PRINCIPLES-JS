# Stage 05 — LSP

`PayPalPayment` and `CreditCardPayment` can safely substitute `PaymentMethod`.

`BrokenPayment` demonstrates a violation: it accepts the abstraction but cannot honor its basic promise.

## Exercise

Create a third valid implementation.

Then explain:

> Why is `BrokenPayment` not a valid substitute?
