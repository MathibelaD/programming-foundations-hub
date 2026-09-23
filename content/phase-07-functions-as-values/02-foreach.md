---
title: forEach — a loop with the action passed in
summary: Meet the built-in version of the processEach function you wrote yourself, and learn when a plain for...of loop is still the better choice.
minutes: 35
stage: Phase 7
---

## What you will learn

- That `forEach` is the `processEach` you wrote last lesson, built into every array
- What the callback receives: the **item**, the **index**, and the whole **array**
- Why you cannot `break` out of `forEach`, and what `return` does inside it
- How to choose between `forEach` and a `for...of` loop

**Before this:** [Passing functions to functions](#/phase-07-functions-as-values/01-passing-functions-to-functions). You wrote `processEach(array, action)` there. Keep that file open, because we are about to compare it with the real thing.

## The problem: you keep writing the same loop

Count how many times you have typed this shape since Phase 5:

```js
for (const item of someArray) {
  // do something with item
}
```

Printing a shopping list. Printing a numbered list of expenses. Printing every student's mark. It is the most common loop in programming. Last lesson you noticed that only the middle part changes, so you wrote `processEach` and passed the action in.

The people who designed JavaScript noticed the same thing, a long time ago. So every array already comes with its own `processEach`. It is called `forEach`.

## Three versions of the same loop

Here is one job, calling each person on a contact list, written three ways:

```js
const contacts = ["Nomvula", "Ravi", "Fatima", "Johan"];

// Phase 5: a for...of loop
for (const contact of contacts) {
  console.log(`Calling ${contact}...`);
}

// Lesson 01: your own processEach
function processEach(array, action) {
  for (const item of array) {
    action(item);
  }
}
processEach(contacts, (contact) => console.log(`Calling ${contact}...`));

// Built in: forEach
contacts.forEach((contact) => console.log(`Calling ${contact}...`));
```

Output:

```text
Calling Nomvula...
Calling Ravi...
Calling Fatima...
Calling Johan...
Calling Nomvula...
Calling Ravi...
Calling Fatima...
Calling Johan...
Calling Nomvula...
Calling Ravi...
Calling Fatima...
Calling Johan...
```

All three print the same four lines. Now line up the last two:

```text
processEach(contacts, (contact) => console.log(...));
contacts.forEach(     (contact) => console.log(...));
```

The only difference is **where the array goes**. With your function, the array is the first argument. With `forEach`, the array comes *before the dot*, and the callback is the only argument.

That dot should look familiar. In [Objects and functions](#/phase-06-objects/03-objects-and-functions) you learned that a **method** is a function attached to an object, and you call it with a dot. Arrays are objects too, and `forEach` is a method that every array has. You already know other array methods: `push`, `pop`, `includes`. The new thing is that `forEach` takes a **function** as its argument.

::: analogy The teacher with the register
A teacher walks into class with the register. For each name on the list, in order, she does *the same thing*: reads it out and waits for "present". She does not skip anyone, and she does not stop halfway through.

Now imagine the head of the school says, "Today, instead of taking the register, go down the list and hand each learner their report." The walking-down-the-list part is exactly the same. Only the action at each name changed.

`forEach` is the walking-down-the-list part. You hand it the action. It goes through every item, in order, from first to last, and does your action once for each.
:::

## What the callback receives

When `forEach` calls your callback, it passes **three** arguments each time:

1. the **item** itself,
2. its **index** (position, starting at 0),
3. the whole **array**.

You can see all three by asking for all three and printing them:

```js
const contacts = ["Nomvula", "Ravi", "Fatima"];

contacts.forEach((item, index, array) => {
  console.log(item, index, array);
});
```

Output:

```text
Nomvula 0 [ 'Nomvula', 'Ravi', 'Fatima' ]
Ravi 1 [ 'Nomvula', 'Ravi', 'Fatima' ]
Fatima 2 [ 'Nomvula', 'Ravi', 'Fatima' ]
```

In practice you almost never need the third one. You will very often want the first, and sometimes the first two. As you learned last lesson, a callback may ask for fewer arguments than it is given. The extras are ignored.

The index is what you need for a **numbered list**. Remember to add 1, because people count from 1 and arrays count from 0:

```js
const contacts = ["Nomvula", "Ravi", "Fatima"];

contacts.forEach((contact, index) => {
  console.log(`${index + 1}. ${contact}`);
});
```

Output:

```text
1. Nomvula
2. Ravi
3. Fatima
```

The names `contact` and `index` are your choice. JavaScript fills them in by **position**: the first parameter gets the item, the second gets the index. If you wrote `(index, contact)` by mistake, `index` would hold the name and `contact` would hold the number.

::: quiz
What does this print?

```js
const words = ["kop", "hand", "voet"];
let out = "";
words.forEach((word, i, all) => {
  out = out + word[i] + all.length;
});
console.log(out);
```

- [ ] `khv3`
- [ ] `k0a1e2`
- [x] `k3a3e3`
- [ ] `kop3hand3voet3`

`forEach` passes the item, its index and the whole array. So `word[i]` is letter 0 of `"kop"` (`k`), letter 1 of `"hand"` (`a`) and letter 2 of `"voet"` (`e`). `all` is the whole array every time, so `all.length` is always `3`. If you picked `k0a1e2`, you added the index instead of the array's length.
:::

## Write your own forEach

To prove there is nothing hidden in `forEach`, let us upgrade `processEach` so it passes all three arguments, exactly like the real one:

```js
function myForEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i], i, array);
  }
}

const temps = [21, 25, 19];

myForEach(temps, (temp, day) => console.log(`Day ${day + 1}: ${temp}°C`));
temps.forEach((temp, day) => console.log(`Day ${day + 1}: ${temp}°C`));
```

Output:

```text
Day 1: 21°C
Day 2: 25°C
Day 3: 19°C
Day 1: 21°C
Day 2: 25°C
Day 3: 19°C
```

Same callback, same output. The real `forEach` has a few extra safety details inside, but the idea is exactly this loop. **Whenever you use `forEach`, you can picture this loop running.**

::: try forEach on your computer
1. In `coding-practice`, create `phase-7/foreach.js`.
2. Type this in:
   ```js
   const contacts = ["Nomvula", "Ravi", "Fatima"];

   contacts.forEach((contact, index) => {
     console.log(`${index + 1}. ${contact}`);
   });
   ```
3. Run it:
   ```bash
   node phase-7/foreach.js
   ```
4. You should see:
   ```text
   1. Nomvula
   2. Ravi
   3. Fatima
   ```
5. **Now experiment.** Add a fourth contact to the array. Predict the new last line, then run it.
6. Change the callback's parameters to `(contact, index, array)` and add `${array.length}` so each line reads like `1 of 4. Nomvula`. Predict the output first.
:::

## Passing a named function

An inline arrow is the usual choice, but you can hand `forEach` any function, including one with a name. Pass it **without brackets**, as you learned last lesson:

```js
const prices = [18.5, 32, 7.99];

function printPrice(price) {
  console.log(`R${price.toFixed(2)}`);
}

prices.forEach(printPrice);
```

Output:

```text
R18.50
R32.00
R7.99
```

`prices.forEach(printPrice)` reads almost like English: "prices, for each: print price."

## forEach with real data

Most real data is an array of objects, and `forEach` is a comfortable way to print a report of it:

```js
const products = [
  { name: "Bread", price: 18.5, inStock: true },
  { name: "Milk (2L)", price: 32.99, inStock: false },
  { name: "Eggs (6)", price: 21, inStock: true },
];

products.forEach((product) => {
  const stock = product.inStock ? "in stock" : "SOLD OUT";
  console.log(`${product.name}: R${product.price.toFixed(2)} (${stock})`);
});
```

Output:

```text
Bread: R18.50 (in stock)
Milk (2L): R32.99 (SOLD OUT)
Eggs (6): R21.00 (in stock)
```

Notice the callback has **braces** and several lines. That is fine. When the action is more than one line, use `{ }` like any other function body. (The `? :` is the ternary from [switch and ternary](#/phase-02-making-decisions/05-switch-and-ternary).)

You can also use `forEach` for a running total, with the accumulator variable **outside** the callback:

```js
const receipts = [45.5, 120, 18.99, 60];

let total = 0;
receipts.forEach((amount) => {
  total += amount;
});

console.log(`Total: R${total.toFixed(2)}`);
```

Output:

```text
Total: R244.49
```

The callback can see `total` because of [scope](#/phase-04-functions/04-scope): a function can see the variables around it. This works. In [reduce](#/phase-07-functions-as-values/06-reduce) you will meet a method designed especially for totals.

::: quiz
What does this print?

```js
const orders = [
  { item: "Kota", price: 35, paid: true },
  { item: "Vetkoek", price: 12, paid: false },
  { item: "Bunny chow", price: 60, paid: true },
];

let owed = 0;
let count = 0;
orders.forEach((order) => {
  if (!order.paid) {
    owed += order.price;
  }
  count++;
});
console.log(count, owed);
```

- [x] `3 12`
- [ ] `1 12`
- [ ] `3 95`
- [ ] `2 95`

`count++` is outside the `if`, so it runs for every order: 3. `owed` only grows when `!order.paid` is `true`, which is only the vetkoek, so it is 12. If you picked `3 95`, you missed the `!`: it means "not paid", so the paid kota and bunny chow are skipped.
:::

## forEach gives you nothing back

`forEach` does its work and returns `undefined`. It is for **doing** something with each item (printing, adding to a total, saving), not for **making** something.

```js
const names = ["Ama", "Ben"];
const result = names.forEach((name) => console.log(name));
console.log(result);
```

Output:

```text
Ama
Ben
undefined
```

If you ever find yourself writing `const something = array.forEach(...)`, stop. You probably want [map](#/phase-07-functions-as-values/03-map) (to make a new list) or [filter](#/phase-07-functions-as-values/04-filter) (to pick some items). Those are the next two lessons.

::: predict What does this print?
```js
const nums = [3, 6, 9];
const answer = nums.forEach((n) => n * 10);
console.log(answer);
console.log(nums);
```
:::

::: solution
```text
undefined
[ 3, 6, 9 ]
```
The callback works out `30`, `60` and `90`, but `forEach` throws those answers away. It always returns `undefined`, so `answer` is `undefined`. And nothing changed the array, so `nums` is still `[ 3, 6, 9 ]`. If you expected `[ 30, 60, 90 ]`, you have correctly guessed what `map` does. Next lesson.
:::

## You cannot break out of forEach

In [break and continue](#/phase-03-loops/05-break-continue-nested) you learned to stop a loop early with `break`. Suppose we are checking people in a queue and want to stop when we reach Ferdi:

```js
const queue = ["Lindiwe", "Omar", "Ferdi", "Keiko"];

queue.forEach((person) => {
  if (person === "Ferdi") {
    break;
  }
  console.log(person);
});
```

Output:

```text
SyntaxError: Illegal break statement
```

Node points at the `break`. The program does not run at all.

Why? `break` only works directly inside a loop (`for`, `while`, `for...of`). Here, the `break` is inside **your callback**, which is a separate function. The loop lives inside `forEach`, where you cannot reach it. Remember the teacher with the register: `forEach` always goes to the end of the list.

What about `return`? It is allowed, but it does something different from what people expect:

```js
const queue = ["Lindiwe", "Omar", "Ferdi", "Keiko"];

queue.forEach((person) => {
  if (person === "Ferdi") {
    return;
  }
  console.log(person);
});
```

Output:

```text
Lindiwe
Omar
Keiko
```

`return` ends **this one call** of the callback. `forEach` then carries on with the next item. So `return` inside `forEach` works like `continue` (skip this one), not like `break` (stop everything). Ferdi was skipped, but Keiko was still printed.

If you need to stop early, use a `for...of` loop:

```js
const queue = ["Lindiwe", "Omar", "Ferdi", "Keiko"];

for (const person of queue) {
  if (person === "Ferdi") {
    console.log("Found Ferdi, stopping.");
    break;
  }
  console.log(`Checked ${person}`);
}
```

Output:

```text
Checked Lindiwe
Checked Omar
Found Ferdi, stopping.
```

(In lesson 05 you will meet [find and some](#/phase-07-functions-as-values/05-find-some-every), which *do* stop early. They are built for "look for something" jobs.)

::: quiz
What does this print?

```js
const readings = [4, 7, -1, 9, -3, 2];
let sum = 0;
readings.forEach((reading) => {
  if (reading < 0) {
    return;
  }
  sum += reading;
});
console.log(sum);
```

- [ ] `11`
- [ ] `18`
- [ ] `SyntaxError: Illegal return statement`
- [x] `22`

`return` inside a `forEach` callback only ends **that one call**. `forEach` then moves on to the next reading, so it works like `continue`: the two negative readings are skipped and 4 + 7 + 9 + 2 = 22. If you picked `11`, you treated `return` like `break`. `return` is allowed in the callback because the callback is a function; it is `break` that gives an error.
:::

## Changing items inside forEach

This one catches people. Doubling every score like this does **not** work:

```js
const scores = [10, 20, 30];

scores.forEach((score) => {
  score = score * 2;
});
console.log(scores);

const players = [
  { name: "Zanele", score: 10 },
  { name: "Kai", score: 20 },
];

players.forEach((player) => {
  player.score = player.score * 2;
});
console.log(players);
```

Output:

```text
[ 10, 20, 30 ]
[ { name: 'Zanele', score: 20 }, { name: 'Kai', score: 40 } ]
```

The numbers did not change, but the objects did. This is [copies and references](#/phase-06-objects/04-values-and-references) again:

- A **number** is copied into the `score` parameter. Changing the copy does not touch the array.
- An **object** is not copied. The `player` parameter holds the address of the same object that is in the array. Changing `player.score` changes the real object.

If you really do want to change numbers in place, use the index to write into the array, as you did in Phase 5:

```js
const scores = [10, 20, 30];

scores.forEach((score, index, array) => {
  array[index] = score * 2;
});
console.log(scores);
```

Output:

```text
[ 20, 40, 60 ]
```

This works, but next lesson shows a cleaner way that does not change the original at all.

::: quiz
What does this print?

```js
const cart = [
  { name: "Rice", qty: 1 },
  { name: "Oil", qty: 2 },
];
const counts = [1, 2];

cart.forEach((line) => {
  line.qty = line.qty + 1;
  line = { name: "Gone", qty: 0 };
});
counts.forEach((n) => {
  n = n + 1;
});

console.log(cart[1].name, cart[1].qty, counts[1]);
```

- [ ] `Gone 0 3`
- [ ] `Oil 3 3`
- [x] `Oil 3 2`
- [ ] `Oil 2 2`

`line` holds the address of a real object in `cart`, so `line.qty = ...` changes that object: Oil becomes 3. The next line, `line = { ... }`, only puts a new address on the callback's own `line`; the array still points at the Oil object. The numbers in `counts` are copied into `n`, so changing `n` changes nothing. If you picked `Gone 0 3`, you thought assigning to the parameter replaces the item in the array.
:::

## forEach or for...of?

Both are good, and professionals use both. Here is an honest guide:

| Situation | Better choice | Why |
|---|---|---|
| Do something with every item (print, save) | either; `forEach` is neat | Short, and the action reads clearly |
| You already have a named function for the action | `forEach` | `prices.forEach(printPrice)` reads like a sentence |
| You need to stop early | `for...of` | You cannot `break` out of `forEach` |
| You are asking the user a question inside the loop, or the steps are long and complicated | `for...of` | Easier to read and to follow top to bottom |
| You want a new array or a single answer | neither | Use `map`, `filter` or `reduce` (coming up) |

If you are not sure, a `for...of` loop is never *wrong*. Use whichever you can read more easily.

::: exercise Level 1 — Guided · Taking the register
Create `phase-7/register.js`.

1. Make an array `learners` with the names `"Anele"`, `"Chen"`, `"Mpho"` and `"Isabel"`.
2. Call `learners.forEach(...)`.
3. Pass an arrow function with one parameter, `learner`.
4. Inside it, print `Present: ` followed by the name, using a template literal.
5. Run it. You should see four lines, starting with `Present: Anele`.
:::

::: solution
```js
const learners = ["Anele", "Chen", "Mpho", "Isabel"];

learners.forEach((learner) => {
  console.log(`Present: ${learner}`);
});
```
Output:
```text
Present: Anele
Present: Chen
Present: Mpho
Present: Isabel
```
:::

::: exercise Level 2 — On your own · Numbered expenses with a total
Create `phase-7/expense-list.js` with this data:

```js
const expenses = [
  { description: "Taxi to work", amount: 24 },
  { description: "Lunch", amount: 65.5 },
  { description: "Airtime", amount: 50 },
];
```

Using **one** `forEach`, print each expense as a numbered line (like `1. Taxi to work: R24.00`) **and** add up the total as you go. After the `forEach`, print `Total: R139.50`.
:::

::: hint
You need the item and the index, so the callback takes two parameters. Create `let total = 0;` *before* the `forEach`, and add to it inside the callback. Use `toFixed(2)` for the money.
:::

::: solution
```js
const expenses = [
  { description: "Taxi to work", amount: 24 },
  { description: "Lunch", amount: 65.5 },
  { description: "Airtime", amount: 50 },
];

let total = 0;
expenses.forEach((expense, index) => {
  console.log(`${index + 1}. ${expense.description}: R${expense.amount.toFixed(2)}`);
  total += expense.amount;
});
console.log(`Total: R${total.toFixed(2)}`);
```
Output:
```text
1. Taxi to work: R24.00
2. Lunch: R65.50
3. Airtime: R50.00
Total: R139.50
```
:::

::: debug Two broken forEach programs
Run each one, read the error, and fix it.

```js
// Program A: print the menu
const menu = ["Kota", "Bunny chow", "Vetkoek"];

menu.foreach((dish) => console.log(dish));
```

```js
// Program B: report the first sold-out product, then stop
const products = [
  { name: "Bread", inStock: true },
  { name: "Milk", inStock: false },
  { name: "Eggs", inStock: true },
];

products.forEach((product) => {
  if (!product.inStock) {
    console.log(`First sold-out item: ${product.name}`);
    break;
  }
});
```
:::

::: solution
**Program A:** `TypeError: menu.foreach is not a function`. JavaScript is case-sensitive. The method is `forEach`, with a capital **E**. `foreach` does not exist, so it is `undefined`, and you cannot call `undefined`. Fix: `menu.forEach((dish) => console.log(dish));`.

**Program B:** `SyntaxError: Illegal break statement`. You cannot `break` out of a `forEach`. This job needs to stop early, so a `for...of` loop is the right tool:

```js
const products = [
  { name: "Bread", inStock: true },
  { name: "Milk", inStock: false },
  { name: "Eggs", inStock: true },
];

for (const product of products) {
  if (!product.inStock) {
    console.log(`First sold-out item: ${product.name}`);
    break;
  }
}
```
Output:
```text
First sold-out item: Milk
```
:::

::: mistake
**Spelling it `foreach`.** It is `forEach`, with a capital E. The error is `TypeError: ... .foreach is not a function`.

**Trying to `break` out.** You cannot. Use `for...of` when you need to stop early.

**Expecting `return` to stop the loop.** Inside `forEach`, `return` only ends the current call and moves on to the next item, like `continue`.

**Storing the result.** `const x = arr.forEach(...)` always gives `undefined`. `forEach` is for doing, not making.

**Getting the parameters the wrong way round.** The order is always item, then index, then array. `(index, item)` gives you the item in a variable called `index`, which is very confusing.

**Adding brackets to a named function.** `prices.forEach(printPrice())` runs `printPrice` once, straight away, and passes `undefined` to `forEach`, which then complains that `undefined` is not a function.
:::

## Real-world uses

- Printing a list, a report or a receipt, line by line.
- Sending the same notification to every user on a list.
- Saving each item of a list to a file or a database.
- On web pages, attaching the same behaviour to every button in a group.

In every case, the pattern is "for each thing in the list, *do* something". When the job is "for each thing, *make* something new", you want the next lesson.

::: connect
**This builds on:** the `for...of` loops from [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays) and your own `processEach` from [Passing functions to functions](#/phase-07-functions-as-values/01-passing-functions-to-functions).

**This unlocks:** every other array method in this phase uses the same callback shape `(item, index, array)`. Next, [map](#/phase-07-functions-as-values/03-map) uses it to build a brand new array, one transformed item at a time.
:::

::: challenge forEach over an object
In [Objects](#/phase-06-objects/01-what-is-an-object) you met `Object.keys(obj)`, which gives you an **array** of an object's keys. Arrays have `forEach`...

Given:

```js
const totals = { food: 412.5, transport: 180, airtime: 99 };
```

use `Object.keys` and `forEach` together to print:

```text
food: R412.50
transport: R180.00
airtime: R99.00
```
:::

::: solution
```js
const totals = { food: 412.5, transport: 180, airtime: 99 };

Object.keys(totals).forEach((category) => {
  console.log(`${category}: R${totals[category].toFixed(2)}`);
});
```
`Object.keys(totals)` gives `[ 'food', 'transport', 'airtime' ]`, and `forEach` walks through that array. Inside, bracket notation `totals[category]` looks up each amount. You will use exactly this in the Budget Buddy project at the end of this phase.
:::

::: recap
- `forEach` is a method on every array. It calls your callback once for each item, in order, from first to last.
- It is the built-in version of `processEach`: `processEach(arr, fn)` becomes `arr.forEach(fn)`.
- The callback receives `(item, index, array)`. Take only the ones you need, and remember they are filled in by position.
- `forEach` always returns `undefined`. Use it for *doing* things, not for making new values.
- You cannot `break` out of `forEach`. `return` inside the callback only skips to the next item.
- Changing a number parameter does not change the array; changing a property of an object parameter does (references).
- When you need to stop early, or the steps are long, a `for...of` loop is often clearer, and that is fine.
:::

::: interview What arguments does forEach pass to its callback?
Three: the current item, its index (starting at 0), and the whole array. Most callbacks only use the first one or two.
:::

::: interview How would you stop a forEach loop partway through?
You cannot. `break` is a syntax error inside the callback, and `return` only skips the current item. If you need to stop early, use a `for...of` loop with `break`, or a method designed to stop early such as `find` or `some`.
:::

::: interview What does forEach return?
Always `undefined`. It exists for side effects such as printing or saving. To build a new array from an old one, use `map` or `filter` instead.
:::

::: checkpoint
- [ ] I ran the three versions of the contact loop and saw they print the same thing
- [ ] I printed a numbered list using the index parameter (and remembered `+ 1`)
- [ ] I wrote `myForEach` and saw it behaves like the real `forEach`
- [ ] I saw `SyntaxError: Illegal break statement` with my own eyes, and fixed it with `for...of`
- [ ] I finished the numbered expenses exercise with a total of R139.50
- [ ] I can explain when I would choose `for...of` over `forEach`
:::

::: resources
- **MDN, "Array.prototype.forEach()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach. The official reference. Skim the examples; the details are more than you need right now.
- **javascript.info, "Array methods":** https://javascript.info/array-methods. The section "Iterate: forEach" is short and clear. The rest of the page covers the next few lessons.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Step through the `myForEach` example and watch `action` get called with each item.
:::
