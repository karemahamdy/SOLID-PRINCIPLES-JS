# Stage 06 — ISP

Do not force a simple payment implementation to support refunding or card storage.

The interfaces are split by capability.

## Exercise

Imagine a provider that supports only:

```ts
pay()
refund()
```

Implement it without adding an unnecessary `saveCard()` method.

That is ISP.
