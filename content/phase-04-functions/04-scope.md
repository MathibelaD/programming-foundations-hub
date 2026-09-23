---
title: Scope — where variables live
summary: Why a variable made inside a function cannot be seen outside it, why that is a good thing, and how to stop functions trampling on each other's data.
minutes: 40
stage: Phase 4
---

## What you will learn

- What **scope** means: the part of a program where a variable can be seen and used
- Why variables made inside a function (or inside any `{ }` block) only exist there
- The difference between **global** and **local** variables, and why too many globals cause bugs
- What happens when the same name is used inside and outside (**shadowing**)

**Before this:** [Return values](#/phase-04-functions/03-return-values). You should be comfortable writing functions that take parameters and return a value.

## The problem: "but I made that variable!"

Here is a small program. It looks reasonable:

```js
function makeSmoothie() {
  const fruit = "mango";
  console.log(`Blending a ${fruit} smoothie`);
}

makeSmoothie();
console.log(fruit);
```

Output:

```text
Blending a mango smoothie
ReferenceError: fruit is not defined
```

Node points its `^` at `fruit` on the last line. But `fruit` *was* defined. You can see it right there, three lines up.

The answer is that `fruit` was made **inside** the function, and it only exists inside the function. Out on the last line, there is no such thing as `fruit`. That idea, *where* a variable exists, is called **scope**.

It feels like a nuisance at first. By the end of this lesson you will see it is one of the things that makes functions safe to use.

::: analogy The kitchen and the house
Picture a house with a kitchen.

- In the kitchen there are things that belong to the kitchen: a chopping board, a half-cut onion, a pot on the stove. **What happens in the kitchen stays in the kitchen.** If you are in the lounge, you cannot reach the onion. As far as the lounge is concerned, it does not exist.
- But **the kitchen can see the house.** From the kitchen, you can see the clock on the wall of the passage and hear the TV. Things that belong to the whole house can be used from any room.
- When the cooking is done and the kitchen is cleaned, the chopping board and the onion are put away. Next time you cook, you start with a clean kitchen.

A function is a kitchen. Variables made inside it are **local**: they stay in that kitchen. Variables made at the top level of the file are **global**: they belong to the whole house, and every function can see them.
:::

## Local variables: they stay inside

A variable declared inside a function is a **local variable**. It is created when the function is called, and it disappears when the function finishes.

**Parameters are local too.** They are variables that live inside the function:

```js
function vatOn(price) {
  return price * 0.15;
}

console.log(vatOn(100));
console.log(price);
```

Output:

```text
15
ReferenceError: price is not defined
```

`price` only exists while `vatOn` is running. Outside, it is gone.

If you need a value from inside a function, you already know the proper way to get it out: **return it**. That is the front door of the kitchen. The function hands the finished dish out through `return`, and keeps its mess inside.

### A fresh kitchen every time

Every call to a function gets a **brand-new set** of local variables. Nothing is left over from last time:

```js
function countToThree() {
  let count = 0;
  count++;
  count++;
  count++;
  console.log(count);
}

countToThree();
countToThree();
```

Output:

```text
3
3
```

The second call does not print 6. When the second call starts, `let count = 0;` makes a new `count` from scratch. The old one was cleared away when the first call finished.

### Why this is a good thing

Look at this shop program. Both functions use a variable called `total`, and so does the main code:

```js
function totalForBread(loaves) {
  const total = loaves * 18;
  return total;
}

function totalForMilk(bottles) {
  const total = bottles * 22;
  return total;
}

const total = totalForBread(2) + totalForMilk(3);
console.log(total);
```

Output:

```text
102
```

There are **three separate** variables called `total` here, one in each kitchen and one in the house, and they never get mixed up. That means:

- When you write a function, you can pick any sensible names for its variables without checking the whole program for clashes.
- When you use a function someone else wrote, its insides cannot accidentally change your variables.

Imagine a program with 200 functions, where every variable was shared. Every time you named something `total` or `count` or `i`, you would have to worry about which other function might be using that name. Scope removes that worry.

::: try Scope explorer
1. In `coding-practice`, create `phase-4/scope.js` and type in the `makeSmoothie` program from the start of the lesson.
2. Run it with `node phase-4/scope.js`. Read the error, and find the line and the `^` that Node points at.
3. Now fix it the proper way. Change the function to `return fruit;` at the end, and change the last line to:
   ```js
   const blended = makeSmoothie();
   console.log(`We made: ${blended}`);
   ```
4. Run it again. You should see:
   ```text
   Blending a mango smoothie
   We made: mango
   ```
5. **Change it, predict, run.** Add a parameter, so the function becomes `makeSmoothie(fruit)`, and delete the `const fruit = "mango";` line. Call it with `makeSmoothie("banana")`. Predict both output lines, then run it.
:::

::: quiz
What does this program print?

```js
function addPoints(points) {
  let score = 10;
  score = score + points;
  return score;
}

const first = addPoints(5);
const second = addPoints(first);
console.log(first, second);
```

- [ ] `15 30`
- [x] `15 25`
- [ ] `15 20`
- [ ] `15 15`

Every call gets a fresh kitchen, so `score` starts at 10 each time. The first call returns `10 + 5`, which is 15. The second call gets 15 as `points` and returns `10 + 15`, which is 25. If you picked `15 30`, you expected `score` to still be 15 from the first call. Local variables are thrown away when the function finishes.
:::

## Global variables: the house

A variable declared at the top level of a file, outside every function and block, is a **global variable**. Every function in the file can see it, because the kitchen can see the house:

```js
const shopName = "Bheki's Bikes";

function printHeader() {
  console.log(`Welcome to ${shopName}`);
}

function printFooter() {
  console.log(`Thanks for visiting ${shopName}!`);
}

printHeader();
printFooter();
```

Output:

```text
Welcome to Bheki's Bikes
Thanks for visiting Bheki's Bikes!
```

A function can also **change** a global made with `let`:

```js
let visitors = 0;

function welcomeVisitor() {
  visitors++;
  console.log(`Welcome! You are visitor number ${visitors}.`);
}

welcomeVisitor();
welcomeVisitor();
console.log("Visitors today:", visitors);
```

Output:

```text
Welcome! You are visitor number 1.
Welcome! You are visitor number 2.
Visitors today: 2
```

So JavaScript looks for a variable like this: **first in the current kitchen; if it is not there, in the house.** It never looks the other way, from the house into a kitchen.

```text
+--------------------------------------------------+
|  THE HOUSE (global)                              |
|    shopName, visitors                            |
|                                                  |
|   +--------------------+  +--------------------+ |
|   | KITCHEN: welcome.. |  | KITCHEN: another.. | |
|   |  (its own locals)  |  |  (its own locals)  | |
|   |  can see the house |  |  can see the house | |
|   +--------------------+  +--------------------+ |
|                                                  |
|   Kitchens cannot see into each other.           |
|   The house cannot see into a kitchen.           |
+--------------------------------------------------+
```

### Why too many globals cause bugs

If every function can change a global, then *any* function might be the one that broke it. Here is a real kind of bug:

```js
let total = 0;

function addToCart(price) {
  total = total + price;
}

function priceWithVat(price) {
  total = price * 1.15;
  return total;
}

addToCart(100);
addToCart(50);
console.log("Airtime with VAT:", priceWithVat(20));
console.log("Cart total:", total);
```

Output:

```text
Airtime with VAT: 23
Cart total: 23
```

The cart should be R150. What happened? Inside `priceWithVat`, the programmer wanted a quick scratch variable and wrote `total = ...` **without `const` or `let`**. So instead of making a new local variable, it reached out into the house and **overwrote the global `total`**. The cart total was destroyed by a function that had nothing to do with the cart.

Now picture that in a 2,000-line program. The wrong value shows up at the end, and you have no idea which of 40 functions changed it.

The fix is two good habits:

1. **Always declare a function's working variables inside it** with `const` or `let`.
2. **Prefer parameters and return values over globals.** Pass in what the function needs, and return what it works out.

```js
function addToCart(cartTotal, price) {
  return cartTotal + price;
}

function priceWithVat(price) {
  const total = price * 1.15;
  return total;
}

let cartTotal = 0;
cartTotal = addToCart(cartTotal, 100);
cartTotal = addToCart(cartTotal, 50);
console.log("Airtime with VAT:", priceWithVat(20));
console.log("Cart total:", cartTotal);
```

Output:

```text
Airtime with VAT: 23
Cart total: 150
```

Now each function only touches what it is given, and you can see exactly where `cartTotal` changes: on the two lines that say `cartTotal = ...`.

::: note Are globals always bad?
No. A global `const` that never changes, like `const VAT_RATE = 0.15;` or `const shopName = "Bheki's Bikes";`, is perfectly fine and very common: it is a setting that the whole program shares, and nobody can change it by accident. The trouble comes from global **`let`** variables that many functions change. Keep those few, and keep them close to the code that uses them.
:::

::: quiz
What does this program print?

```js
let count = 0;

function addTwo() {
  count = count + 2;
}

function reset() {
  count = 0;
}

addTwo();
addTwo();
const saved = count;
reset();
addTwo();
console.log(saved, count);
```

- [ ] `2 2`
- [ ] `4 6`
- [ ] `0 2`
- [x] `4 2`

Neither function declares its own `count`, so both change the global one. After two `addTwo()` calls it is 4, and `saved` stores that number, 4. `reset()` sets the global back to 0, and one more `addTwo()` makes it 2. `saved` does not follow `count` around: it kept the value it was given. If you picked `4 6`, you missed that `reset` changes the global too.
:::

## Block scope: every `{ }` is a small room

You got a preview of this in [if and else](#/phase-02-making-decisions/02-if-and-else): variables made with `let` or `const` inside **any** pair of curly braces (an `if`, an `else`, a loop body) only exist inside those braces. This is called **block scope**. A block is like a pantry inside the kitchen: it can see the kitchen and the house, but they cannot see into it.

```js
const age = 20;

if (age >= 18) {
  const message = "You may enter.";
  console.log(message);
}

console.log(message);
```

Output:

```text
You may enter.
ReferenceError: message is not defined
```

The same goes for the counter in a `for` loop:

```js
for (let i = 1; i <= 3; i++) {
  console.log("Lap", i);
}
console.log("Finished after lap", i);
```

Output:

```text
Lap 1
Lap 2
Lap 3
ReferenceError: i is not defined
```

`i` belongs to the loop. When the loop ends, `i` is gone.

When you need a value **after** a block, declare the variable **before** the block, and only *assign* it inside:

```js
const age = 15;
let message;

if (age >= 18) {
  message = "You may enter.";
} else {
  message = "Sorry, adults only.";
}

console.log(message);
```

Output:

```text
Sorry, adults only.
```

`message` now lives in the outer scope, and the `if` and `else` blocks can both reach out and fill it, because a room can see the space around it.

This is also why, in the Phase 3 loop patterns, the accumulator (`let total = 0;`) always went **before** the loop. If you declare it inside the loop, you get a new, empty `total` every time round, and it disappears when the loop ends.

::: quiz
What happens when you run this?

```js
function sumTo(n) {
  for (let i = 1; i <= n; i++) {
    let total = 0;
    total = total + i;
  }
  return total;
}

console.log(sumTo(3));
```

- [x] It crashes with `ReferenceError: total is not defined`
- [ ] It prints `6`
- [ ] It prints `3`
- [ ] It prints `0`

`total` is declared with `let` inside the loop's `{ }`, so it only lives inside that block. By the `return` line, the loop has ended and `total` no longer exists. If you picked `3`, you spotted that `total` is reset to 0 each time round, which is a second bug, but the missing variable crashes the program first. Moving `let total = 0;` above the loop fixes both, and then it prints 6.
:::

## Shadowing: the same name inside and outside

What if a function makes a local variable with the **same name** as a global one?

```js
const name = "Gugu";

function introduce() {
  const name = "Lindiwe";
  console.log("Inside:", name);
}

introduce();
console.log("Outside:", name);
```

Output:

```text
Inside: Lindiwe
Outside: Gugu
```

Inside the function, JavaScript looks in the kitchen first, finds a `name` there, and uses it. It never gets as far as the house. The local `name` hides the global one, like a shadow. This is called **shadowing**. The global is not changed at all, only hidden while the function runs.

Parameters can shadow too:

```js
const price = 500;

function halfPrice(price) {
  return price / 2;
}

console.log(halfPrice(80));
console.log(price);
```

Output:

```text
40
500
```

Inside `halfPrice`, `price` is the parameter (80). Outside, it is the global (500).

Shadowing is legal and sometimes handy, but it can confuse the person reading your code (including you, next week). When you notice it, consider a clearer name. You do not need to go out of your way to avoid it, though: it is normal for a helper function's parameter to be called `amount` or `price` even if something outside has that name too.

::: predict What does this print?
```js
let level = 1;

function levelUp() {
  level++;
}

function showLevel() {
  let level = 99;
  console.log("show:", level);
}

levelUp();
levelUp();
showLevel();
console.log("real:", level);
```
:::

::: solution
```text
show: 99
real: 3
```
`levelUp` has no local `level`, so it changes the **global** one: 1 becomes 2, then 3. `showLevel` declares its **own** `level` with `let`, which shadows the global, so it prints 99 without touching the real one. At the end, the global `level` is 3.
:::

::: predict And this?
```js
let status = "unknown";
const temperature = 31;

if (temperature > 30) {
  let status = "hot";
  console.log("inside:", status);
}

console.log("outside:", status);
```
:::

::: solution
```text
inside: hot
outside: unknown
```
The `let` inside the `if` block made a **new** `status` that only lives in that block. It shadowed the outer one. The outer `status` was never changed. If you meant to change it, remove the `let` inside the block: `status = "hot";`.
:::

::: exercise Level 1 — Guided · Local, global or gone?
Create `phase-4/where.js` and type this in:

```js
const city = "Gqeberha";

function weatherReport(temperature) {
  const feeling = temperature > 25 ? "warm" : "cool";
  console.log(`${city} is ${feeling} today.`);
}

weatherReport(28);
```

1. Run it. You should see `Gqeberha is warm today.`
2. Below the call, add `console.log(city);`. Before you run it: will it work? (Is `city` global or local?) Run it.
3. Now add `console.log(feeling);` at the bottom too. Predict, then run. Read the error.
4. Delete that line, and add `console.log(temperature);` instead. Predict, then run.
5. Delete that line too. Write down, in a comment at the top of the file, which of the three variables is global and which are local.
:::

::: solution
- `console.log(city);` works and prints `Gqeberha`, because `city` is **global**.
- `console.log(feeling);` fails with `ReferenceError: feeling is not defined`, because `feeling` is **local** to `weatherReport`.
- `console.log(temperature);` fails with `ReferenceError: temperature is not defined`, because parameters are **local** too.

```js
// Global: city. Local to weatherReport: temperature (a parameter) and feeling.
```
:::

::: exercise Level 2 — On your own · Get rid of the globals
A spaza shop gives 1 loyalty point for every full R10 spent. Here is the first version. It works, but it depends on two global `let` variables that the function changes:

```js
let points = 0;
let purchase = 0;

function earnPoints() {
  points = points + Math.floor(purchase / 10);
}

purchase = 250;
earnPoints();
purchase = 99;
earnPoints();
console.log("Points:", points);
```

It prints `Points: 34`. Create `phase-4/loyalty.js` and rewrite it so that:

- There is a function `pointsFor(amount)` that **returns** the points for one purchase and does not touch any global.
- The `purchase` variable is gone completely.
- The program still prints `Points: 34`.
:::

::: hint
`pointsFor` only needs the amount (a parameter) and gives back `Math.floor(amount / 10)`. The main code keeps a `let points = 0;` and adds each returned value to it with `+=`.
:::

::: solution
```js
function pointsFor(amount) {
  return Math.floor(amount / 10);
}

let points = 0;
points += pointsFor(250);
points += pointsFor(99);
console.log("Points:", points);
```
Output:
```text
Points: 34
```
Now `pointsFor` is a self-contained little machine: amount in, points out. You could reuse it in any program, and you can test it on its own: `pointsFor(99)` should be `9`.
:::

::: debug Three scope errors
Each program crashes with a `ReferenceError`. Run it, read which name Node complains about, and fix it.

```js
// Program A: should print "Now only R270"
function calculateDiscount(price) {
  const discount = price * 0.1;
}

function printSale(price) {
  calculateDiscount(price);
  console.log(`Now only R${price - discount}`);
}

printSale(300);
```

```js
// Program B: should print 10
function sumUpTo(n) {
  for (let i = 1; i <= n; i++) {
    let total = 0;
    total += i;
  }
  return total;
}

console.log(sumUpTo(4));
```

```js
// Program C: should print 40
function ticketPrice(age) {
  if (age < 12) {
    const price = 40;
  } else {
    const price = 80;
  }
  return price;
}

console.log(ticketPrice(8));
```
:::

::: solution
**A:** `ReferenceError: discount is not defined`. `discount` is local to `calculateDiscount`, so `printSale` cannot see it. Return it, and store the result where it is needed:
```js
function calculateDiscount(price) {
  const discount = price * 0.1;
  return discount;
}

function printSale(price) {
  const discount = calculateDiscount(price);
  console.log(`Now only R${price - discount}`);
}
```

**B:** `ReferenceError: total is not defined`, pointing at `return total;`. `total` was declared **inside** the loop's block, so it disappears when the loop ends. (It was also being reset to 0 every time round.) Move `let total = 0;` to before the loop:
```js
function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

**C:** `ReferenceError: price is not defined`. Each `const price` lives only in its own block. Declare it once before the `if`, and assign inside:
```js
function ticketPrice(age) {
  let price;
  if (age < 12) {
    price = 40;
  } else {
    price = 80;
  }
  return price;
}
```
Or, even shorter, return straight from each branch: `if (age < 12) { return 40; }` then `return 80;`.
:::

::: mistake
**Trying to use a function's local variable outside it.** Return the value instead, and store it where you call the function.

**Declaring an accumulator inside a loop.** It resets every time round and vanishes afterwards. Declare it before the loop.

**Forgetting `let` or `const` inside a function.** `total = ...` without a keyword changes (or needs) a variable outside the function. Inside functions, declare working variables with `const` or `let`.

**Adding `let` when you meant to change an outer variable.** `let status = "hot";` inside a block makes a *new* variable that shadows the old one. To change the outer one, write `status = "hot";`.

**Lots of global `let` variables changed by many functions.** Pass values in as parameters and return results instead.
:::

::: quiz
What does this program print?

```js
let tip = 20;

function addTip(bill, tip) {
  tip = tip + 5;
  return bill + tip;
}

console.log(addTip(100, 10));
console.log(tip);
```

- [ ] `125`, then `25`
- [ ] `125`, then `20`
- [ ] `115`, then `15`
- [x] `115`, then `20`

The parameter `tip` shadows the global `tip`. Inside the function, `tip` starts as the argument 10, becomes 15, and the function returns `100 + 15`, which is 115. The global `tip` was never touched, so it is still 20. If you picked 125, you used the global 20 inside the function, but JavaScript looks in the kitchen first and finds the parameter.
:::

## Real-world uses

Scope is quietly at work in every program:

- A big app is written by many people. Scope means a developer can name a variable `count` inside her function without checking what 50 other developers called theirs.
- When you install a package like `prompt-sync`, its hundreds of internal variables are hidden inside its functions. They cannot clash with yours.
- Bugs are easier to find. If a local variable has a wrong value, the problem must be inside that one function, because nothing else could reach it.
- In Budget Buddy v4, you will move the running total, the count and the other variables out of the global space and into a `main` function, so that only the code that should change them can.

::: connect
**This builds on:** blocks and `{ }` from [if and else](#/phase-02-making-decisions/02-if-and-else), the accumulator pattern from [loop patterns](#/phase-03-loops/04-loop-patterns), and the parameters and `return` from the last two lessons. Parameters are the way into a function's kitchen, and `return` is the way out.

**This unlocks:** writing functions with confidence that they will not interfere with each other. Next, [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions) shows that a function is a value you can store in a variable, and introduces a much shorter way to write small functions.
:::

::: challenge Label every variable
Here is a small program for a shop called Priya's Pantry:

```js
const shopName = "Priya's Pantry";

function receiptLine(item, quantity, unitPrice) {
  const lineTotal = quantity * unitPrice;
  let label = item;
  if (quantity > 1) {
    const plural = "s";
    label = item + plural;
  }
  return `${quantity} ${label}: R${lineTotal}`;
}

console.log(shopName);
for (let day = 1; day <= 2; day++) {
  const line = receiptLine("samoosa", day * 3, 7);
  console.log(`Day ${day}: ${line}`);
}
```

Without running it first:

1. List **every** variable and parameter (there are nine), and say where each one lives: global, local to `receiptLine`, inside the `if` block, or inside the `for` loop.
2. Predict the output.
3. Could `receiptLine` use `day`? Could the `for` loop use `lineTotal`? Why?

Then type it in as `phase-4/pantry.js` and run it to check your prediction.
:::

::: solution
1. The nine variables:
   - **Global:** `shopName`.
   - **Local to `receiptLine`:** `item`, `quantity`, `unitPrice` (parameters), `lineTotal`, `label`.
   - **Inside the `if` block:** `plural`.
   - **Inside the `for` loop:** `day` (the loop counter) and `line`.
2. Output:
   ```text
   Priya's Pantry
   Day 1: 3 samoosas: R21
   Day 2: 6 samoosas: R42
   ```
3. No and no. `day` lives in the `for` loop, and `receiptLine` is a separate kitchen that can only see its own variables and the globals. `lineTotal` lives inside `receiptLine` and disappears when it returns, so the loop cannot see it. The loop only gets what `receiptLine` returns, which it stores in `line`.
:::

::: recap
- **Scope** is the part of the program where a variable can be seen and used.
- Variables and parameters inside a function are **local**: they exist only while the function runs, and every call gets fresh ones.
- Variables at the top level of a file are **global**: every function can see them (and change them, if they are `let`).
- JavaScript looks for a name in the current scope first, then in the scopes around it. Never inwards.
- `let` and `const` inside any `{ }` block (an `if`, a loop) have **block scope**: they vanish when the block ends. Declare before the block if you need the value afterwards.
- A local variable with the same name as an outer one **shadows** it, and the outer one is not changed.
- Prefer parameters and return values to global `let` variables. Global `const` settings are fine.
:::

::: interview What is the difference between a local and a global variable?
A local variable is declared inside a function (or block) and only exists there, while that code is running. A global variable is declared at the top level of the file and can be seen from everywhere, including inside functions.
:::

::: interview Why can too many global variables lead to bugs?
Any function can change a global `let` variable, so when it ends up with a wrong value, the cause could be anywhere in the program. Functions that only use their parameters and local variables, and hand results back with `return`, are much easier to reason about and to fix.
:::

::: interview What is shadowing?
When a variable inside a function or block has the same name as one outside it. Inside, the inner one is used and the outer one is hidden, but the outer one is not changed.
:::

::: checkpoint
- [ ] I made the `fruit is not defined` error happen, then fixed it with `return`
- [ ] I ran the countToThree program and understood why it printed 3 twice
- [ ] I saw a function destroy a global cart total, and fixed it with parameters and return
- [ ] I got `i is not defined` after a `for` loop and understood why
- [ ] I rewrote the loyalty points program without global `let` variables
- [ ] I fixed all three scope errors in "Debug this"
:::

::: resources
- **javascript.info, "Functions":** https://javascript.info/function-basics. See the "Local variables" and "Outer variables" sections.
- **MDN, "Functions — reusable blocks of code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions. The "Function scope and conflicts" section has a friendly zoo analogy.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the `levelUp` predict example and step through it. You can see each function's local variables appear in their own frame and disappear when it returns.
:::
