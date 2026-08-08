# SOLID Principles in JavaScript

A practical guide to understanding and applying the five SOLID principles in JavaScript.

## What is SOLID?

SOLID is a group of five object-oriented design principles that help us write code that is:

- Easier to understand
- Easier to test
- Easier to change
- Easier to extend
- Less coupled
- More maintainable

The five principles are:

1. **S — Single Responsibility Principle (SRP)**
2. **O — Open/Closed Principle (OCP)**
3. **L — Liskov Substitution Principle (LSP)**
4. **I — Interface Segregation Principle (ISP)**
5. **D — Dependency Inversion Principle (DIP)**

> Note: SOLID is not about blindly creating classes or interfaces everywhere. In JavaScript, the same ideas can be applied with functions, modules, objects, classes, and dependency injection.

---

# 1. S — Single Responsibility Principle

## Definition

> A class/module/function should have one reason to change.

This does **not** mean that a class can contain only one method.

It means that one unit of code should have one clear responsibility.

### Before: Multiple Responsibilities

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  saveToDatabase() {
    console.log(`Saving ${this.name} to database...`);
  }

  sendWelcomeEmail() {
    console.log(`Sending email to ${this.email}...`);
  }

  generateReport() {
    return `User Report: ${this.name} - ${this.email}`;
  }
}
```

### What's wrong?

`User` is responsible for:

1. Holding user data
2. Saving data
3. Sending emails
4. Generating reports

There are multiple reasons for `User` to change.

For example:

- Database implementation changes → `User` changes.
- Email provider changes → `User` changes.
- Report format changes → `User` changes.

### After: Separate Responsibilities

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    console.log(`Saving ${user.name} to database...`);
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    console.log(`Sending email to ${user.email}...`);
  }
}

class UserReport {
  generate(user) {
    return `User Report: ${user.name} - ${user.email}`;
  }
}
```

Now each class has one responsibility.

```js
const user = new User("Karema", "karema@example.com");

const repository = new UserRepository();
const emailService = new EmailService();
const report = new UserReport();

repository.save(user);
emailService.sendWelcomeEmail(user);

console.log(report.generate(user));
```

### SRP Mental Model

Ask:

> "How many different reasons can this code change?"

If the answer is several unrelated reasons, SRP may be violated.

---

# 2. O — Open/Closed Principle

## Definition

> Software entities should be open for extension but closed for modification.

In simple words:

**You should be able to add new behavior without constantly modifying existing, stable code.**

---

## Example: Payment Processing

Imagine we support:

- Credit Card
- PayPal
- Bank Transfer

### Before: Violating OCP

```js
class PaymentProcessor {
  process(paymentType, amount) {
    if (paymentType === "credit-card") {
      console.log(`Processing credit card: $${amount}`);
    }

    if (paymentType === "paypal") {
      console.log(`Processing PayPal: $${amount}`);
    }

    if (paymentType === "bank-transfer") {
      console.log(`Processing bank transfer: $${amount}`);
    }
  }
}
```

Usage:

```js
const processor = new PaymentProcessor();

processor.process("credit-card", 100);
processor.process("paypal", 200);
```

### What's the problem?

Every time we add another payment method, we modify `PaymentProcessor`.

For example:

```js
if (paymentType === "apple-pay") {
  // new code
}
```

The class keeps growing.

### After: OCP

Create separate payment strategies.

```js
class CreditCardPayment {
  pay(amount) {
    console.log(`Processing credit card: $${amount}`);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Processing PayPal: $${amount}`);
  }
}

class BankTransferPayment {
  pay(amount) {
    console.log(`Processing bank transfer: $${amount}`);
  }
}
```

Then the processor depends on a payment object:

```js
class PaymentProcessor {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  process(amount) {
    this.paymentMethod.pay(amount);
  }
}
```

Usage:

```js
const creditCard = new PaymentProcessor(
  new CreditCardPayment()
);

creditCard.process(100);

const paypal = new PaymentProcessor(
  new PayPalPayment()
);

paypal.process(200);
```

Now adding Apple Pay does not require changing `PaymentProcessor`.

```js
class ApplePayPayment {
  pay(amount) {
    console.log(`Processing Apple Pay: $${amount}`);
  }
}

const applePay = new PaymentProcessor(
  new ApplePayPayment()
);

applePay.process(300);
```

The processor was extended without modifying its existing logic.

---

# 3. L — Liskov Substitution Principle

## Definition

> Subtypes should be replaceable with their base types without breaking the correctness of the program.

The important idea is:

> If `B` is a subtype of `A`, code expecting `A` should be able to work with `B`.

---

## Classic Example: Bird

### Before: Violating LSP

```js
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Sparrow extends Bird {
  fly() {
    console.log("Sparrow is flying...");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly!");
  }
}
```

Now:

```js
function makeBirdFly(bird) {
  bird.fly();
}

makeBirdFly(new Sparrow()); // Works

makeBirdFly(new Penguin()); // Throws an error
```

The problem is that `Penguin` cannot safely substitute `Bird` if `Bird` promises that every bird can fly.

### After: Better Abstraction

Separate the concepts.

```js
class Bird {
  eat() {
    console.log("Eating...");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying...");
  }
}

class Sparrow extends FlyingBird {
  fly() {
    console.log("Sparrow is flying...");
  }
}

class Penguin extends Bird {
  swim() {
    console.log("Penguin is swimming...");
  }
}
```

Now:

```js
function makeBirdEat(bird) {
  bird.eat();
}

function makeFlyingBirdFly(bird) {
  bird.fly();
}

makeBirdEat(new Penguin());
makeBirdFly(new Sparrow());
```

There is no false promise that every bird can fly.

---

# 4. I — Interface Segregation Principle

## Definition

> Clients should not be forced to depend on methods they do not use.

JavaScript does not have traditional interfaces like Java or TypeScript.

But the principle still applies.

We can think of it as:

> Don't create huge APIs/objects where consumers are forced to know about irrelevant methods.

---

## Before: Fat Interface

Imagine a device API:

```js
class Printer {
  print() {
    console.log("Printing...");
  }

  scan() {
    console.log("Scanning...");
  }

  fax() {
    console.log("Faxing...");
  }
}
```

Now imagine a simple printer that only prints.

```js
class SimplePrinter extends Printer {
  scan() {
    throw new Error("Scan is not supported");
  }

  fax() {
    throw new Error("Fax is not supported");
  }
}
```

This is a design smell.

The simple printer is forced to implement functionality it doesn't need.

### After: Smaller Interfaces

Separate capabilities.

```js
class Printer {
  print() {
    console.log("Printing...");
  }
}

class Scanner {
  scan() {
    console.log("Scanning...");
  }
}

class Fax {
  fax() {
    console.log("Faxing...");
  }
}
```

A device can now use only the capabilities it supports.

```js
class SimplePrinter extends Printer {
  print() {
    console.log("Simple printer is printing...");
  }
}

class MultiFunctionPrinter {
  constructor() {
    this.printer = new Printer();
    this.scanner = new Scanner();
    this.fax = new Fax();
  }

  print() {
    this.printer.print();
  }

  scan() {
    this.scanner.scan();
  }

  faxDocument() {
    this.fax.fax();
  }
}
```

The important idea is not the exact class structure.

The important idea is:

> Keep contracts small and focused.

---

# 5. D — Dependency Inversion Principle

## Definition

> High-level modules should not depend directly on low-level modules. Both should depend on abstractions.

Also:

> Abstractions should not depend on details. Details should depend on abstractions.

In JavaScript, dependency injection is one of the easiest ways to apply DIP.

---

## Before: Tight Coupling

```js
class MySQLDatabase {
  save(user) {
    console.log("Saving user to MySQL...");
  }
}

class UserService {
  constructor() {
    this.database = new MySQLDatabase();
  }

  createUser(user) {
    this.database.save(user);
  }
}
```

`UserService` directly creates `MySQLDatabase`.

This means:

```text
UserService
     ↓
MySQLDatabase
```

If we want PostgreSQL, MongoDB, or an API, we have to modify `UserService`.

### After: Dependency Injection

```js
class MySQLDatabase {
  save(user) {
    console.log("Saving user to MySQL...");
  }
}

class PostgreSQLDatabase {
  save(user) {
    console.log("Saving user to PostgreSQL...");
  }
}

class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser(user) {
    this.database.save(user);
  }
}
```

Now:

```js
const mysql = new MySQLDatabase();

const userService = new UserService(mysql);

userService.createUser({
  name: "Karema"
});
```

We can switch the database without modifying `UserService`.

```js
const postgres = new PostgreSQLDatabase();

const userService = new UserService(postgres);

userService.createUser({
  name: "Karema"
});
```

The dependency is injected from outside.

---

# Combining SOLID Principles

The real value of SOLID appears when multiple principles work together.

Below is a realistic example using **SRP + OCP + DIP**.

---

# Example: Notification System

Imagine an application that sends notifications.

We support:

- Email
- SMS
- Push Notifications

---

## Before: Multiple SOLID Violations

```js
class NotificationService {
  send(type, user, message) {
    if (type === "email") {
      console.log(`Sending EMAIL to ${user.email}: ${message}`);
    }

    if (type === "sms") {
      console.log(`Sending SMS to ${user.phone}: ${message}`);
    }

    if (type === "push") {
      console.log(`Sending PUSH notification: ${message}`);
    }

    console.log("Saving notification to database...");
  }
}
```

Problems:

### SRP violation

`NotificationService`:

- Decides notification type
- Sends notifications
- Knows user contact details
- Saves notification data

Multiple responsibilities.

### OCP violation

Adding WhatsApp requires modifying the `send()` method.

### DIP violation

The service is responsible for concrete implementation details.

---

# After: SRP + OCP + DIP

First, create notification implementations.

```js
class EmailNotifier {
  send(user, message) {
    console.log(
      `Sending EMAIL to ${user.email}: ${message}`
    );
  }
}

class SMSNotifier {
  send(user, message) {
    console.log(
      `Sending SMS to ${user.phone}: ${message}`
    );
  }
}

class PushNotifier {
  send(user, message) {
    console.log(
      `Sending PUSH notification: ${message}`
    );
  }
}
```

Then create a repository.

```js
class NotificationRepository {
  save(notification) {
    console.log("Saving notification...");
  }
}
```

Then the high-level service:

```js
class NotificationService {
  constructor(notifier, repository) {
    this.notifier = notifier;
    this.repository = repository;
  }

  send(user, message) {
    this.notifier.send(user, message);

    this.repository.save({
      user,
      message
    });
  }
}
```

Usage:

```js
const user = {
  email: "karema@example.com",
  phone: "+201000000000"
};

const emailNotifier = new EmailNotifier();
const repository = new NotificationRepository();

const notificationService = new NotificationService(
  emailNotifier,
  repository
);

notificationService.send(
  user,
  "Welcome to our application!"
);
```

Switch to SMS:

```js
const smsNotifier = new SMSNotifier();

const notificationService = new NotificationService(
  smsNotifier,
  repository
);

notificationService.send(
  user,
  "Your verification code is 1234"
);
```

Add WhatsApp without changing `NotificationService`:

```js
class WhatsAppNotifier {
  send(user, message) {
    console.log(
      `Sending WhatsApp message: ${message}`
    );
  }
}
```

Then:

```js
const whatsappNotifier = new WhatsAppNotifier();

const notificationService = new NotificationService(
  whatsappNotifier,
  repository
);

notificationService.send(
  user,
  "Hello from WhatsApp!"
);
```

### Which principles are used?

| Principle | How? |
|---|---|
| SRP | Notification sending and persistence are separated |
| OCP | New notification channels can be added without modifying `NotificationService` |
| DIP | `NotificationService` receives its dependencies instead of creating them |
| LSP | Every notifier can be substituted as long as it follows the expected `send()` contract |
| ISP | Each notifier exposes only the capability it needs |

---

# Another Combined Example: E-commerce Checkout

This example combines **SRP + OCP + DIP**.

## Before

```js
class Checkout {
  checkout(order, paymentType) {
    // Calculate total
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Payment
    if (paymentType === "credit-card") {
      console.log(`Paying $${total} with credit card`);
    }

    if (paymentType === "paypal") {
      console.log(`Paying $${total} with PayPal`);
    }

    // Save order
    console.log("Saving order...");

    // Send email
    console.log("Sending confirmation email...");
  }
}
```

Problems:

- Calculates prices
- Handles payments
- Saves orders
- Sends emails
- Contains payment branching

This violates SRP and OCP, and it is tightly coupled.

---

## After

### 1. Order Calculator

```js
class OrderCalculator {
  calculate(order) {
    return order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
```

### 2. Payment Strategies

```js
class CreditCardPayment {
  pay(amount) {
    console.log(`Paying $${amount} with credit card`);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Paying $${amount} with PayPal`);
  }
}
```

### 3. Order Repository

```js
class OrderRepository {
  save(order) {
    console.log("Saving order...");
  }
}
```

### 4. Email Service

```js
class EmailService {
  sendConfirmation(order) {
    console.log("Sending confirmation email...");
  }
}
```

### 5. Checkout

```js
class Checkout {
  constructor(
    calculator,
    payment,
    repository,
    emailService
  ) {
    this.calculator = calculator;
    this.payment = payment;
    this.repository = repository;
    this.emailService = emailService;
  }

  checkout(order) {
    const total = this.calculator.calculate(order);

    this.payment.pay(total);

    this.repository.save(order);

    this.emailService.sendConfirmation(order);
  }
}
```

Usage:

```js
const calculator = new OrderCalculator();
const payment = new CreditCardPayment();
const repository = new OrderRepository();
const emailService = new EmailService();

const checkout = new Checkout(
  calculator,
  payment,
  repository,
  emailService
);

checkout.checkout({
  items: [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 }
  ]
});
```

To use PayPal:

```js
const paypal = new PayPalPayment();

const checkout = new Checkout(
  calculator,
  paypal,
  repository,
  emailService
);
```

No modification to `Checkout` is required.

---

# SOLID Quick Comparison

| Principle | Main Question |
|---|---|
| SRP | Does this code have one responsibility? |
| OCP | Can I add behavior without modifying existing code? |
| LSP | Can I safely replace one implementation with another? |
| ISP | Am I forcing consumers to depend on things they don't need? |
| DIP | Is my high-level code coupled to concrete details? |

---

# How to Recognize SOLID Violations

## SRP Warning Signs

```js
class UserService {
  validateUser() {}
  saveUser() {}
  sendEmail() {}
  generatePDF() {}
  uploadImage() {}
}
```

Ask:

> "Why does this class need to know all of these things?"

---

## OCP Warning Signs

Lots of:

```js
if (type === "...")
```

or:

```js
switch (type) {
  case "...":
  case "...":
  case "...":
}
```

Especially when every new feature requires editing the same file.

---

## LSP Warning Signs

A subclass contains:

```js
throw new Error("Not supported");
```

for a method it inherited.

That can indicate the parent abstraction is wrong.

---

## ISP Warning Signs

Large objects/interfaces with many unrelated methods:

```js
{
  create(),
  update(),
  delete(),
  print(),
  scan(),
  fax(),
  sendEmail(),
  uploadFile()
}
```

Ask:

> "Does every consumer actually need all of these?"

---

## DIP Warning Signs

A high-level class directly creates infrastructure:

```js
class Service {
  constructor() {
    this.database = new MySQLDatabase();
    this.email = new GmailService();
    this.logger = new FileLogger();
  }
}
```

Better:

```js
class Service {
  constructor(database, email, logger) {
    this.database = database;
    this.email = email;
    this.logger = logger;
  }
}
```

---

# SOLID in Modern JavaScript

You don't have to use classes to apply SOLID.

For example, DIP can be implemented using functions:

```js
function createUserService({ database, emailService }) {
  return {
    async createUser(user) {
      await database.save(user);
      await emailService.send(user);
    }
  };
}
```

Dependencies are passed in:

```js
const userService = createUserService({
  database: postgresDatabase,
  emailService: emailService
});
```

This is still Dependency Inversion.

---

# SOLID + Testing

SOLID makes testing easier.

For example:

```js
class UserService {
  constructor(database) {
    this.database = database;
  }

  createUser(user) {
    return this.database.save(user);
  }
}
```

During a test, we can inject a fake database:

```js
const fakeDatabase = {
  save(user) {
    return {
      ...user,
      id: 1
    };
  }
};

const service = new UserService(fakeDatabase);

const result = service.createUser({
  name: "Karema"
});

console.log(result);
```

We don't need a real database.

This is one of the practical benefits of DIP.

---

# Important: Don't Over-Engineer

SOLID does **not** mean:

```text
1 feature
↓
5 interfaces
↓
10 classes
↓
20 files
```

Bad abstraction is still bad design.

For a small function, this may be perfectly fine:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
```

You don't need:

```js
class TotalCalculatorFactory {}
class TotalCalculatorInterface {}
class TotalCalculatorStrategy {}
class TotalCalculatorRepository {}
```

just to say you used SOLID.

Use SOLID when it makes the system easier to change, test, understand, or extend.

---

# A Practical SOLID Checklist

Before committing code, ask:

### S — Single Responsibility

- Does this module/class have one clear job?
- Does it have unrelated reasons to change?

### O — Open/Closed

- Do I need to edit existing code every time I add a new variation?
- Can I add behavior through composition or a new implementation?

### L — Liskov Substitution

- Can implementations be swapped without breaking callers?
- Does an implementation reject operations its abstraction promises?

### I — Interface Segregation

- Are consumers depending on methods they don't use?
- Can a large contract be split into smaller capabilities?

### D — Dependency Inversion

- Does high-level business logic create concrete infrastructure?
- Can dependencies be injected from outside?

---

# Final Mental Model

Think of SOLID as five questions:

```text
S → "Does this thing have one job?"

O → "Can I add behavior without changing stable code?"

L → "Can I replace this implementation safely?"

I → "Am I forcing anyone to depend on things they don't need?"

D → "Can my business logic work without knowing concrete details?"
```

The goal is not to "use all five principles in every file."

The goal is to design code that is:

**Easy to change + Easy to test + Easy to extend + Low in coupling.**

---

# Suggested Study Order

For JavaScript/TypeScript, study SOLID in this order:

1. **SRP**
2. **OCP**
3. **DIP**
4. **LSP**
5. **ISP**
6. **Combine them in real projects**
7. **Then study Design Patterns**

Recommended patterns to connect with SOLID:

- Strategy → OCP + DIP
- Factory → OCP
- Dependency Injection → DIP
- Adapter → LSP + DIP
- Repository → SRP + DIP
- Observer → OCP
- Decorator → OCP + SRP

A good next exercise is to take an existing messy JavaScript/TypeScript service and refactor it one principle at a time.





reacource: https://github.com/devbootstrap/SOLID-Principles-Examples-using-Typescript/blob/master/isp/README.md 
https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#interface-segregation-principle
https://www.youtube.com/watch?v=MrDYsFbtFZM
