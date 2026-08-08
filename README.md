# SOLID E-Commerce Learning Project

A hands-on TypeScript project for learning SOLID through incremental refactoring.

## Goal

You will start with intentionally bad code and refactor it one principle at a time:

1. SRP — Single Responsibility Principle
2. OCP — Open/Closed Principle
3. DIP — Dependency Inversion Principle
4. LSP — Liskov Substitution Principle
5. ISP — Interface Segregation Principle

Then combine the principles in the final version.

## Important

Do not jump directly to `final/`.

For each stage:

1. Read the problem.
2. Try the exercise yourself.
3. Run the tests/typecheck.
4. Compare your solution with the reference solution.
5. Write down which SOLID principle fixed the problem.

## Setup

```bash
npm install
npm run typecheck
npm test
```

## Project Flow

```text
01-bad-version
      ↓
02-srp
      ↓
03-ocp
      ↓
04-dip
      ↓
05-lsp
      ↓
06-isp
      ↓
final
```

## Business Requirements

The application should:

- Create orders.
- Calculate item totals.
- Apply discounts.
- Process payments.
- Save orders.
- Send notifications.
- Support multiple payment providers.
- Support multiple notification channels.
- Be easy to test.

## Suggested Study Method

Do not memorize SOLID definitions.

Instead ask:

- SRP: "How many reasons does this code have to change?"
- OCP: "Can I add a new behavior without modifying stable code?"
- LSP: "Can I replace this implementation safely?"
- ISP: "Am I forcing consumers to depend on methods they do not need?"
- DIP: "Does my business logic create concrete infrastructure dependencies?"

See `LESSONS.md` for the learning path.
