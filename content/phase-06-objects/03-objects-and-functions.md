---
title: Objects and functions together
summary: Pass objects into functions, build objects with factory functions, give your own objects methods with this, and decide when to use an object or an array.
minutes: 50
stage: Phase 6
---

## What you will learn

- How to pass an object into a function, and return an object from one
- How a **factory function** like `createExpense(description, amount, category)` makes every object the same shape
- How to give your own objects **methods**, and what `this` means inside them
- Why an arrow function makes a poor method, and how to choose between an object and an array

**Before this:** [Lists of objects: the shape of real data](#/phase-06-objects/02-arrays-of-objects). You should also be comfortable with [return values](#/phase-04-functions/03-return-values) and [arrow functions](#/phase-04-functions/05-arrow-functions).

## The problem: too many loose arguments

Here is a function that prints one line of a till slip:

```js
function printReceiptLine(name, quantity, price) {
  const lineTotal = quantity * price;
  console.log(`${quantity} x ${name} @ R${price.toFixed(2)} = R${lineTotal.toFixed(2)}`);
}

printReceiptLine("Samp", 2, 29.99);
printReceiptLine(2, "Samp", 29.99);
```

Output:

```text
2 x Samp @ R29.99 = R59.98
Samp x 2 @ R29.99 = RNaN
```

The second call has the first two arguments swapped. It is a natural slip, because nothing on the calling line says which value is which. And the more details a thing has, the worse it gets: a function that needs seven loose arguments is a function everyone calls wrongly sooner or later.

You already have the fix. In the last two lessons you kept a thing's details together in one object. So hand the function **the object**.

::: analogy Handing over the whole form
At the clinic, the receptionist does not ask you to shout out your name, then your ID number, then your date of birth, in exactly the right order. You hand over **one filled-in form**, and whoever reads it looks up the field they need by its label.

Passing an object to a function is the same. You pass one thing, and the function reads `item.price` or `item.name` by label. Order no longer matters, and nothing gets mixed up.
:::

## Passing an object into a function

```js
function printReceiptLine(item) {
  const lineTotal = item.quantity * item.price;
  console.log(`${item.quantity} x ${item.name} @ R${item.price.toFixed(2)} = R${lineTotal.toFixed(2)}`);
}

const samp = { name: "Samp", quantity: 2, price: 29.99 };
printReceiptLine(samp);
printReceiptLine({ name: "Cooking oil", quantity: 1, price: 54.5 });
```

Output:

```text
2 x Samp @ R29.99 = R59.98
1 x Cooking oil @ R54.50 = R54.50
```

The function has **one** parameter, `item`, and reads the properties it needs. You can pass a variable holding an object, or write the object right there in the brackets, as in the second call.

Functions that take an object and **return** something about it are very common. For example, turning an expense into a line of text:

```js
function describe(expense) {
  return `${expense.description} (${expense.category}): R${expense.amount.toFixed(2)}`;
}

const lunch = { description: "Lunch", amount: 65, category: "food" };
const line = describe(lunch);
console.log(line);
console.log(line.length);
```

Output:

```text
Lunch (food): R65.00
20
```

`describe` is a **pure function** (from [Designing programs with functions](#/phase-04-functions/06-designing-with-functions)): it reads the object, builds a string and hands it back. It does not print, and it does not change the expense. You will use a function very like this in Budget Buddy.

::: warn A function can change the object you give it
A function that receives an object can also **change** it:

```js
function applyDiscount(product, percent) {
  product.price = product.price - product.price * percent / 100;
}

const kettle = { name: "Kettle", price: 400 };
applyDiscount(kettle, 25);
console.log(kettle);
```

Output:

```text
{ name: 'Kettle', price: 300 }
```

The kettle **outside** the function changed. With numbers and strings that never happens. Why objects behave differently is the big idea of [Copies and references](#/phase-06-objects/04-values-and-references), two lessons from now. For now, notice it, and prefer functions that *return* new values over functions that quietly change what they were given.
:::

## Returning an object: factory functions

Look at this list of expenses and spot the problems before you run it:

```js
const expenses = [
  { description: "Taxi to work", amount: 18, category: "transport" },
  { descripton: "Lunch", amount: 65, category: "food" },
  { description: "Airtime", Amount: 50, category: "phone" },
];

for (const expense of expenses) {
  console.log(`${expense.description}: R${expense.amount}`);
}
```

Output:

```text
Taxi to work: R18
undefined: R65
Airtime: Rundefined
```

`descripton` is missing an `i`, and `Amount` has a capital. Typing the same keys again and again, by hand, invites typos, and each one fails quietly with `undefined`.

The fix: write the keys **once**, inside a function that builds the object for you.

```js
function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

const taxi = createExpense("Taxi to work", 18, "transport");
const lunch = createExpense("Lunch", 65, "food");

console.log(taxi);
console.log(lunch);
```

Output:

```text
{ description: 'Taxi to work', amount: 18, category: 'transport' }
{ description: 'Lunch', amount: 65, category: 'food' }
```

A function whose job is to build and return a new object is called a **factory function**, because it stamps out objects that all have the same shape, like a factory making identical boxes. Its name usually starts with `create` or `make`.

Why bother?

- **The same shape every time.** The keys are typed once, so they cannot be misspelt in one object and not the others.
- **One place to change.** If every expense later needs a `date`, you add it to the factory, not to fifty object literals.
- **A readable call.** `createExpense("Lunch", 65, "food")` says what it is making.

(The order of arguments matters again here, but only in this one function, and its name and parameters tell you the order.)

::: try Make a pet factory
1. Create `phase-6/pets.js`:
   ```js
   function createPet(name, type, age) {
     return { name: name, type: type, age: age };
   }

   function describePet(pet) {
     return `${pet.name} the ${pet.type} is ${pet.age} years old.`;
   }

   const pets = [
     createPet("Bella", "dog", 4),
     createPet("Simba", "cat", 2),
     createPet("Kiwi", "parrot", 11),
   ];

   for (const pet of pets) {
     console.log(describePet(pet));
   }

   pets.push(createPet("Nemo", "fish", 1));
   console.log(`There are ${pets.length} pets.`);
   ```
2. Run it with `node phase-6/pets.js`. You should see:
   ```text
   Bella the dog is 4 years old.
   Simba the cat is 2 years old.
   Kiwi the parrot is 11 years old.
   There are 4 pets.
   ```
   (Nemo is not in the printed list because he was added after the loop ran.)
3. **Change it:** add an `owner` parameter to `createPet`, store it in the object, and include it in `describePet`, for example `Bella the dog is 4 years old and belongs to Ayanda.` You will need to update every `createPet(...)` call too. Predict which lines of output change, then run it.
:::

## Returning several answers at once

A function can only `return` one value. But that one value can be an object with several properties, which is a neat way to hand back several answers together:

```js
function markStats(marks) {
  let total = 0;
  let highest = marks[0];
  let lowest = marks[0];
  for (const mark of marks) {
    total += mark;
    if (mark > highest) {
      highest = mark;
    }
    if (mark < lowest) {
      lowest = mark;
    }
  }
  return {
    average: total / marks.length,
    highest: highest,
    lowest: lowest,
  };
}

const stats = markStats([67, 82, 45, 90, 71]);
console.log(stats);
console.log(`Highest: ${stats.highest}, lowest: ${stats.lowest}`);
```

Output:

```text
{ average: 71, highest: 90, lowest: 45 }
Highest: 90, lowest: 45
```

One loop works out three things, and the caller picks out whichever ones it needs by name.

## Methods on your own objects

In the first lesson of this phase you found out that `console.log` is a function stored on the `console` object, called a **method**. You can put methods on your own objects too. A property's value can be a function:

```js
const account = {
  owner: "Sipho",
  balance: 500,
  deposit: function (amount) {
    this.balance = this.balance + amount;
  },
  describe: function () {
    return `${this.owner} has R${this.balance.toFixed(2)}`;
  },
};

console.log(account.describe());
account.deposit(250);
console.log(account.describe());
console.log(account.balance);
```

Output:

```text
Sipho has R500.00
Sipho has R750.00
750
```

`deposit` and `describe` are properties like `owner` and `balance`. Their values are functions (written as **function expressions**, which you met in [lesson 04-05](#/phase-04-functions/05-arrow-functions)). You call them with the dot and brackets, exactly as you call `console.log`: `account.deposit(250)`.

### What is `this`?

Inside a method, the word **`this`** means **"the object this method was called on"**. The easiest way to find it: look at the call, and `this` is **whatever is to the left of the dot**.

- In `account.deposit(250)`, the thing before the dot is `account`, so inside `deposit`, `this.balance` means `account.balance`.

Why not write `account.balance` inside the method directly? Because `this` lets one method work for **whichever** object calls it:

```js
const sipho = {
  owner: "Sipho",
  balance: 500,
  describe: function () {
    return `${this.owner} has R${this.balance}`;
  },
};

const naledi = {
  owner: "Naledi",
  balance: 1200,
  describe: sipho.describe,
};

console.log(sipho.describe());
console.log(naledi.describe());
```

Output:

```text
Sipho has R500
Naledi has R1200
```

It is the **same** function in both objects. When called as `naledi.describe()`, the thing before the dot is `naledi`, so `this.owner` is `"Naledi"`.

::: analogy "My"
`this` works like the word "my". When Sipho says "my balance", he means Sipho's balance. When Naledi says exactly the same words, "my balance", she means Naledi's. The words are the same; who says them decides what they mean. A method uses `this` the way a person uses "my".
:::

::: note A shorter way to write methods
You will often see methods written without `: function`:

```js
const account = {
  owner: "Sipho",
  balance: 500,
  deposit(amount) {
    this.balance += amount;
  },
  describe() {
    return `${this.owner} has R${this.balance}`;
  },
};

account.deposit(100);
console.log(account.describe());
```

Output:

```text
Sipho has R600
```

`deposit(amount) { ... }` is short for `deposit: function (amount) { ... }`. Both mean the same thing. Use whichever you find clearer.
:::

### Factories with methods

Combine the two ideas and each object you build comes with its own abilities:

```js
function createAccount(owner, balance) {
  return {
    owner: owner,
    balance: balance,
    deposit: function (amount) {
      this.balance += amount;
    },
    withdraw: function (amount) {
      if (amount > this.balance) {
        console.log(`Sorry ${this.owner}, not enough money.`);
        return;
      }
      this.balance -= amount;
    },
  };
}

const lindiwe = createAccount("Lindiwe", 300);
const kofi = createAccount("Kofi", 50);

lindiwe.deposit(200);
kofi.withdraw(80);

console.log(lindiwe.owner, lindiwe.balance);
console.log(kofi.owner, kofi.balance);
```

Output:

```text
Sorry Kofi, not enough money.
Lindiwe 500
Kofi 50
```

`lindiwe.deposit(200)` changes only Lindiwe's balance, because `this` is `lindiwe` for that call. Kofi's withdrawal is refused by the check inside `withdraw`, and his balance stays at `50`.

This idea, keeping data and the functions that work on it together, is the seed of a much bigger topic called *object-oriented programming*. You do not need more of it for this course. What you have here is enough to read and write most everyday code.

::: predict What does this print?
```js
const counter = {
  count: 0,
  add: function () {
    this.count = this.count + 1;
  },
};
counter.add();
counter.add();
counter.add();
console.log(counter.count);
console.log(counter.add);
```
:::

::: solution
```text
3
[Function: add]
```
Each `counter.add()` call adds one to `counter.count` (because `this` is `counter`). The last line has no brackets after `add`, so it does not call the method. It prints the function itself, the same way `console.log(Math.round)` did in the first lesson.
:::

## Arrow functions and `this`: a gentle warning

In [lesson 04-05](#/phase-04-functions/05-arrow-functions) we said arrow functions behave differently with `this`. Here is where it shows:

```js
const account = {
  owner: "Sipho",
  balance: 500,
  describe: () => {
    return `${this.owner} has R${this.balance}`;
  },
};

console.log(account.describe());
```

Output:

```text
undefined has Rundefined
```

No error, only `undefined`s. An arrow function does **not** get its own `this` from the thing before the dot. It keeps whatever `this` meant in the code *around* the object, and that is not `account`.

You do not need to understand the deeper rules. Follow one simple rule:

> **For a method that uses `this`, use `function` (or the short `describe() { }` form), never an arrow.**

Arrow functions are still perfect for everything else: small helpers like `formatMoney`, and (in Phase 7) passing functions to other functions.

::: try A bank account with methods
1. Create `phase-6/account.js` and type in the `createAccount` example above.
2. Run it with `node phase-6/account.js` and check you get the same three lines.
3. **Add a method** called `describe` to the factory that returns a string like `Lindiwe has R500.00`. Use it to print both accounts.
4. **Break it on purpose:** change `withdraw` to an arrow function (`withdraw: (amount) => { ... }`) and run it. The `Sorry Kofi, not enough money.` line disappears. Inside the arrow, `this.balance` is `undefined`, so the check `amount > this.balance` is never true and the safety check silently stops working. No error, no warning, only a missing line. Change it back and run it again.
:::

## Object or array? Choosing the right shape

You now have two ways to group values. Choosing between them is one of the most common small decisions in programming. Ask yourself one question: **am I describing one thing, or listing many things?**

| Situation | Use | Why | Example |
|---|---|---|---|
| One thing with several different details | **Object** | Each detail needs a label | `{ name: "Thandi", age: 16 }` |
| Many things of the same kind | **Array** | Order and counting matter, labels do not | `["bread", "milk", "eggs"]` |
| Many things, each with details | **Array of objects** | A list of rows | `[{ name, price }, { name, price }]` |
| Looking something up by a name | **Object** (as a dictionary) | Jump straight to the value | `capitals["kenya"]` |
| Adding things up per name | **Object** (as a tally) | One key per group | `{ food: 55.5, transport: 36 }` |
| A thing that has a list inside it | **Object with an array property** | Both at once | `{ name: "Chakalaka", ingredients: [...] }` |

Two quick tests:

- If you find yourself remembering "index 2 means the age", you want an **object**.
- If you find yourself numbering keys (`item1`, `item2`, `item3`), you want an **array**.

::: exercise Level 1 — Guided · A friend factory
Create `phase-6/friends.js`.

1. Write a factory function `createFriend(name, birthday, favouriteFood)` that returns an object with those three properties.
2. Write a function `describeFriend(friend)` that **returns** (not prints) a string such as `Chipo: birthday 14 March, loves jollof rice`.
3. Make an empty array `friends`. Use `push` and `createFriend` to add three friends.
4. Loop over `friends` with `for...of` and print `describeFriend(friend)` for each.
5. Run it. Then add a fourth friend and run it again, without changing the loop.
:::

::: solution
```js
function createFriend(name, birthday, favouriteFood) {
  return { name: name, birthday: birthday, favouriteFood: favouriteFood };
}

function describeFriend(friend) {
  return `${friend.name}: birthday ${friend.birthday}, loves ${friend.favouriteFood}`;
}

const friends = [];
friends.push(createFriend("Chipo", "14 March", "jollof rice"));
friends.push(createFriend("Johan", "2 July", "boerewors"));
friends.push(createFriend("Mei", "30 October", "dumplings"));

for (const friend of friends) {
  console.log(describeFriend(friend));
}
```
Output:
```text
Chipo: birthday 14 March, loves jollof rice
Johan: birthday 2 July, loves boerewors
Mei: birthday 30 October, loves dumplings
```
:::

::: exercise Level 2 — On your own · A game character
Create `phase-6/game.js`. Write a factory `createPlayer(name)` that returns a player object with a `name`, a `health` of `100`, and three methods:

- `takeHit(damage)` lowers health, but never below `0`.
- `heal(amount)` raises health, but never above `100`.
- `status()` **returns** `"Zola: 70/100"`, or `"Zola is knocked out!"` when health is `0`.

Make two players. Hit the first for 30 and print its status, then heal it by 50 and print again. Hit the second for 70 and then 45, and print its status. You should see:

```text
Zola: 70/100
Zola: 100/100
Kenji is knocked out!
```
:::

::: hint
Inside every method, use `this.health` and `this.name`, and write the methods with `function`, not arrows. For "never below 0": change the health first, then `if (this.health < 0) { this.health = 0; }`. Do the same for the upper limit in `heal`.
:::

::: solution
```js
function createPlayer(name) {
  return {
    name: name,
    health: 100,
    takeHit: function (damage) {
      this.health = this.health - damage;
      if (this.health < 0) {
        this.health = 0;
      }
    },
    heal: function (amount) {
      this.health = this.health + amount;
      if (this.health > 100) {
        this.health = 100;
      }
    },
    status: function () {
      if (this.health === 0) {
        return `${this.name} is knocked out!`;
      }
      return `${this.name}: ${this.health}/100`;
    },
  };
}

const hero = createPlayer("Zola");
const rival = createPlayer("Kenji");

hero.takeHit(30);
console.log(hero.status());
hero.heal(50);
console.log(hero.status());

rival.takeHit(70);
rival.takeHit(45);
console.log(rival.status());
```
Output:
```text
Zola: 70/100
Zola: 100/100
Kenji is knocked out!
```
You could also use `Math.max(0, ...)` and `Math.min(100, ...)` from [Numbers](#/phase-01-storing-information/04-numbers) instead of the `if` checks.
:::

::: debug Three broken objects
```js
// Program A
const wallet = {
  balance: 200,
  spend: function (amount) {
    balance = balance - amount;
  },
};
wallet.spend(50);
console.log(wallet.balance);
```

```js
// Program B
function createFriend(name, birthday) {
  const friend = { name: name, birthday: birthday };
}

const friend = createFriend("Chipo", "14 March");
console.log(`${friend.name}'s birthday is on ${friend.birthday}.`);
```

```js
// Program C
const shop = {
  name: "Mama Joy's Spaza",
  greet: () => {
    return `Welcome to ${this.name}!`;
  },
};
console.log(shop.greet());
```
:::

::: solution
**A** crashes with `ReferenceError: balance is not defined`, pointing at `balance` inside `spend`. Inside a method, the object's properties are **not** loose variables. You must reach them through the object: `this.balance = this.balance - amount;`. Then it prints `150`.

**B** crashes with `TypeError: Cannot read properties of undefined (reading 'name')`. The factory builds the object but never **returns** it, so `createFriend(...)` gives `undefined`. Add `return friend;` at the end of the function (or write `return { name: name, birthday: birthday };` directly).

**C** prints `Welcome to undefined!`. `greet` is an arrow function, so `this` is not `shop`. Change it to `greet: function () { ... }` (or `greet() { ... }`), and it prints `Welcome to Mama Joy's Spaza!`.
:::

::: mistake
**Forgetting `return` in a factory.** The function builds a lovely object and then throws it away. The caller gets `undefined`.

**Leaving out `this.` inside a method.** `balance` on its own is a variable that does not exist. The object's data is `this.balance`.

**Using an arrow function as a method.** `this` will not be the object. Use `function` or the short method form.

**Forgetting the brackets when calling a method.** `account.describe` is the function itself. `account.describe()` runs it.

**Writing a method that prints when it should return.** `status()` is more useful if it *returns* the text, so the caller decides whether to print it, save it, or combine it with something else. This is the `console.log` vs `return` lesson from [Return values](#/phase-04-functions/03-return-values) again.
:::

## Real-world uses

- **Factory functions** are how programs make new records consistently: `createUser(email, password)`, `createOrder(customer, items)`, `createMessage(from, text)`.
- **Functions that take an object** are everywhere, because they are easier to call correctly: `sendEmail({ to, subject, body })` beats seven loose arguments.
- **Returning an object** is how a function hands back a bundle of results, like `markStats` returning average, highest and lowest together.
- **Methods** are how built-in tools work (`"hi".toUpperCase()`, `list.push(x)`), and how libraries let you control things: `player.play()`, `timer.stop()`.

::: connect
**This builds on:** [functions](#/phase-04-functions/01-why-functions), [return values](#/phase-04-functions/03-return-values), [arrow functions](#/phase-04-functions/05-arrow-functions), [pure functions](#/phase-04-functions/06-designing-with-functions), and [objects](#/phase-06-objects/01-what-is-an-object).

**This unlocks:** Budget Buddy v6 uses a `createExpense` factory and a `describe(expense)` function. Next, [Copies and references](#/phase-06-objects/04-values-and-references) explains why `applyDiscount` could change the kettle outside the function, which is the most important "aha" in this phase.
:::

::: challenge A shopping cart with methods
Build a `cart` object (no factory needed) with:

- an `items` property that starts as an empty array,
- `add(name, price)`, which pushes an item object onto `this.items`,
- `total()`, which returns the sum of all item prices (use a loop over `this.items`),
- `printReceipt()`, which prints each item and then the total, using `this.total()`.

Add three items and print the receipt. Then print how many items are in the cart.
:::

::: hint
Methods can call other methods on the same object: `this.total()` inside `printReceipt`. And `this.items` is an ordinary array, so `for (const item of this.items)` works.
:::

::: solution
```js
const cart = {
  items: [],
  add: function (name, price) {
    this.items.push({ name: name, price: price });
  },
  total: function () {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price;
    }
    return sum;
  },
  printReceipt: function () {
    for (const item of this.items) {
      console.log(`${item.name}: R${item.price.toFixed(2)}`);
    }
    console.log(`TOTAL: R${this.total().toFixed(2)}`);
  },
};

cart.add("Maize meal", 64.99);
cart.add("Sugar", 38.5);
cart.add("Tea bags", 42);
cart.printReceipt();
console.log(`${cart.items.length} items`);
```
Output:
```text
Maize meal: R64.99
Sugar: R38.50
Tea bags: R42.00
TOTAL: R145.49
3 items
```
An object that holds a list **and** the methods that work on it is a very common design. Budget Buddy's `budget` object (with its `expenses` array) follows the same idea, using separate functions instead of methods.
:::

::: recap
- Pass an **object** to a function instead of many loose arguments: one parameter, read by label, order no longer matters.
- A function that receives an object *can* change it. Prefer returning new values; the next-but-one lesson explains why this happens.
- A **factory function** (`createExpense(...)`) builds and returns a new object, so every object has the same shape and the keys are typed once.
- Returning an object lets a function hand back several answers at once.
- A **method** is a function stored on an object. Call it with `obj.method()`.
- Inside a method, **`this`** is the object before the dot. Use `function` or the short `name() { }` form for methods, never an arrow.
- One thing with details: an object. Many things: an array. Many things with details: an array of objects.
:::

::: interview What is a factory function, and why use one?
A function that builds and returns a new object, such as `createExpense(description, amount, category)`. It guarantees every object has the same keys, spelled the same way, and gives you one place to change if the shape needs to grow.
:::

::: interview What does `this` mean inside a method?
The object the method was called on: whatever is to the left of the dot. In `account.deposit(100)`, `this` is `account`. That lets the same method work for any object that calls it.
:::

::: interview Why should you not use an arrow function as a method that uses `this`?
Arrow functions do not get their own `this` from the object before the dot. They keep the `this` from the code around them, so `this.balance` is `undefined`. Use a regular `function` (or the short method form) for methods.
:::

::: interview When would you use an object, and when an array?
An object for one thing with labelled details (a learner's name, age and grade), or for looking values up by name. An array for a list of many things of the same kind, where order and counting matter. A list of things that each have details is an array of objects.
:::

::: checkpoint
- [ ] I passed an object into a function and read its properties inside
- [ ] I wrote the pet factory and added an `owner` to every pet
- [ ] I built a bank account with methods, and saw what happens when a method is an arrow function
- [ ] I finished the friend factory
- [ ] I finished the game character with `takeHit`, `heal` and `status`
- [ ] I fixed all three broken objects
:::

::: resources
- **javascript.info, "Object methods, this":** https://javascript.info/object-methods. Methods and `this`, with a section on arrow functions.
- **MDN, "JavaScript object basics":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics. Includes a friendly explanation of `this`.
- **Eloquent JavaScript, chapter 4:** https://eloquentjavascript.net/04_data.html. More practice mixing objects, arrays and functions.
:::
