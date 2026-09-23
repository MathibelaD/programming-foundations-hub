---
title: reduce — boiling a list down to one value
summary: The accumulator pattern you have written since Phase 3, as a method. Totals, maximums and category tallies, plus an honest look at when a loop is clearer.
minutes: 50
stage: Phase 7
---

## What you will learn

- How the **accumulator** loop (running total) becomes `myReduce`, and then `.reduce`
- How to read a `reduce` call, with a **trace table** of the accumulator and the item at each step
- Why you should **always** give a starting value
- How to use `reduce` for totals, the biggest item, and counting by category into an object
- Why a `for...of` loop is often clearer than `reduce`, and why that is fine

**Before this:** [find, findIndex, some and every](#/phase-07-functions-as-values/05-find-some-every). You should remember the **accumulator** and **maximum** patterns from [loop patterns](#/phase-03-loops/04-loop-patterns), and "sum and average" and "max and min" from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand).

## The problem: many things in, one thing out

`map` and `filter` take a list and give you back a list. `find`, `some` and `every` take a list and answer a question. But some of the most common jobs in programming take a whole list and **combine all of it** into a single answer:

- all your receipts → **one** total,
- a week of temperatures → **the** hottest,
- a year of expenses → **one** object with a total for each category.

You have done this since Phase 3. It is the **accumulator** pattern: start with something, then go through the items one at a time, **combining** each item into what you have so far.

```js
const receipts = [45, 120, 30, 85];

let total = 0;
for (const amount of receipts) {
  total = total + amount;
}
console.log(total);

const temps = [21, 27, 19, 24];
let hottest = temps[0];
for (const temp of temps) {
  hottest = Math.max(hottest, temp);
}
console.log(hottest);
```

Output:

```text
280
27
```

Look at the shape of both loops:

| Step | Total | Hottest |
|---|---|---|
| Start with a value | `let total = 0;` | `let hottest = temps[0];` |
| For each item... | `for (const amount of receipts)` | `for (const temp of temps)` |
| ...combine it with what you have so far | `total = total + amount;` | `hottest = Math.max(hottest, temp);` |
| The answer is what you have at the end | `total` | `hottest` |

Two things change: **the starting value**, and **how to combine** the running result with the next item. Everything else is the same.

::: analogy The snowball
Picture a small snowball at the top of a hill. As it rolls down, it picks up snow at every step. Each bit of snow gets added to what is already there. At the bottom, you have **one** big snowball, made of everything it rolled over.

- The small snowball at the top is the **starting value**.
- Each patch of snow on the hill is an **item** in the list.
- "Pick up the snow and add it to the ball" is the **combine** step.
- The ball at the bottom is the **result**.

The snowball does not have to be a number. It could be the biggest stone found so far, or a bag with a pocket for each colour of stone. But it always rolls through every item, and there is always one thing at the end.
:::

## Step 1: write `myReduce`

Turn the two changing parts into parameters: a `combine` function and a `start` value.

```js
function myReduce(array, combine, start) {
  let result = start;
  for (const item of array) {
    result = combine(result, item);
  }
  return result;
}

const receipts = [45, 120, 30, 85];
const temps = [21, 27, 19, 24];

console.log(myReduce(receipts, (total, amount) => total + amount, 0));
console.log(myReduce(temps, (hottest, temp) => Math.max(hottest, temp), temps[0]));
```

Output:

```text
280
27
```

Read the key line, `result = combine(result, item);`, very slowly. It is `total = total + amount` with the `+` part handed in. The callback gets **two** things: the result so far, and the next item. It returns the **new** result so far. `myReduce` stores that, and hands it back to the callback with the next item.

The callback for reduce is a bit different from the ones you have met:

| Method | Callback receives | Callback returns |
|---|---|---|
| `map` | an item | the new item |
| `filter` | an item | keep it? (`true`/`false`) |
| `reduce` | the **result so far** and an item | the **new result so far** |

The "result so far" has a name: the **accumulator**, the same word you learned in Phase 3. It is the snowball.

## Step 2: meet `.reduce`

```js
const receipts = [45, 120, 30, 85];
const temps = [21, 27, 19, 24];

console.log(receipts.reduce((total, amount) => total + amount, 0));
console.log(temps.reduce((hottest, temp) => Math.max(hottest, temp), temps[0]));
```

Output:

```text
280
27
```

Same answers. `myReduce(array, combine, start)` becomes `array.reduce(combine, start)`. Notice that the **starting value goes after the callback**, as the second argument to `reduce`. It is often missed when a callback is long, because it sits right at the end, after the closing `}`.

Here is how to read `receipts.reduce((total, amount) => total + amount, 0)` in words:

> "Reduce the receipts. Start the total at 0. For each amount, the new total is the total plus the amount."

The real `reduce` also passes the index and the array as third and fourth arguments to the callback, but you will very rarely need them.

## A trace table

`reduce` is the method people find hardest to picture, so let us make it visible. Add a `console.log` inside the callback:

```js
const receipts = [45, 120, 30, 85];

const total = receipts.reduce((runningTotal, amount) => {
  console.log(`runningTotal: ${runningTotal}, amount: ${amount}, new total: ${runningTotal + amount}`);
  return runningTotal + amount;
}, 0);

console.log("Final:", total);
```

Output:

```text
runningTotal: 0, amount: 45, new total: 45
runningTotal: 45, amount: 120, new total: 165
runningTotal: 165, amount: 30, new total: 195
runningTotal: 195, amount: 85, new total: 280
Final: 280
```

As a trace table, like the ones you drew in [The while loop](#/phase-03-loops/02-while-loops):

| Step | accumulator (`runningTotal`) comes in as | item (`amount`) | callback returns |
|---|---|---|---|
| 1 | `0` (the starting value) | `45` | `45` |
| 2 | `45` | `120` | `165` |
| 3 | `165` | `30` | `195` |
| 4 | `195` | `85` | `280` |
| end | | | `reduce` gives back `280` |

The pattern to notice: **each row's "returns" becomes the next row's "comes in as"**. That hand-over is the whole of `reduce`.

::: try Watch reduce work
1. In `coding-practice`, create `phase-7/reduce.js`.
2. Type in the trace example above (the one with `console.log` inside the callback).
3. Run it:
   ```bash
   node phase-7/reduce.js
   ```
4. You should see the four `runningTotal` lines and `Final: 280`.
5. **Now experiment.** Change the starting value from `0` to `100` (as if R100 had already been spent earlier in the week). Before you run it, write down the new trace table on paper. Then run it and compare.
6. Add a fifth receipt, `20`. How many lines does the callback print now? Predict, then run.
:::

## Always give a starting value

The starting value is optional in JavaScript. If you leave it out, `reduce` uses the **first item** as the start and begins combining from the second. That sounds convenient, but it causes two nasty bugs.

**Bug 1: empty lists crash.**

```js
const nothing = [];
console.log(nothing.reduce((total, amount) => total + amount, 0));
console.log(nothing.reduce((total, amount) => total + amount));
```

Output:

```text
0
TypeError: Reduce of empty array with no initial value
```

With a starting value, an empty list gives back the starting value, `0`. That is exactly right: you spent nothing. Without one, there is no first item to start from, and the program crashes. In real apps, lists are empty all the time (a new user has no expenses yet).

**Bug 2: arrays of objects give nonsense.**

```js
const expenses = [
  { description: "Bread", amount: 18.5 },
  { description: "Milk", amount: 32 },
];

const total = expenses.reduce((sum, expense) => sum + expense.amount);
console.log(total);
```

Output:

```text
[object Object]32
```

Without a starting value, `sum` starts as the whole **first object**, not a number. Then `object + 32` makes JavaScript turn the object into the text `"[object Object]"` and glue `32` on the end. With `, 0` at the end, `sum` starts as a number and everything works.

**Rule: always give `reduce` a starting value.** Use `0` for totals and counts, `{}` for tallies, and `[]` if you are building a list.

## reduce with real data

Here is a list of expenses to work with:

```js
const expenses = [
  { description: "Groceries", amount: 640.5, category: "food" },
  { description: "Taxi fare", amount: 36, category: "transport" },
  { description: "Electricity", amount: 450, category: "bills" },
  { description: "Takeaways", amount: 185, category: "food" },
  { description: "Bus card", amount: 120, category: "transport" },
];
```

### The total

```js
const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
console.log(`Total spent: R${total.toFixed(2)}`);
```

Output:

```text
Total spent: R1431.50
```

The accumulator `sum` is a number. Each step adds one expense's `amount` to it.

### The biggest expense

```js
const biggest = expenses.reduce((best, expense) => {
  if (expense.amount > best.amount) {
    return expense;
  }
  return best;
}, expenses[0]);
console.log(`Biggest: ${biggest.description}`);
```

Output:

```text
Biggest: Groceries
```

This is the **maximum** pattern: "keep the best so far". The accumulator `best` is a whole expense object. Each step returns whichever of the two is bigger. We start with the first expense, `expenses[0]`. (If the list could be empty, `expenses[0]` is `undefined`, so check `.length` first.)

### Counting by category into an object

This is the tally from the [Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6) project. The accumulator is an **object**, with one property per category:

```js
const totals = expenses.reduce((tally, expense) => {
  tally[expense.category] = (tally[expense.category] || 0) + expense.amount;
  return tally;
}, {});

console.log(totals);
```

Output:

```text
{ food: 825.5, transport: 156, bills: 450 }
```

Walk through it:

- The starting value is `{}`, an empty object.
- For "Groceries", `tally.food` does not exist yet, so `(undefined || 0)` gives `0`, and `tally.food` becomes `640.5`.
- For "Takeaways", `tally.food` is `640.5`, so it becomes `825.5`.
- The callback **must `return tally`**, so the next step receives the same object. Forget that line, and the next step receives `undefined`.

::: predict What does this print?
```js
const numbers = [2, 3, 4];
console.log(numbers.reduce((result, n) => result * n, 1));
console.log(numbers.reduce((result, n) => result * n, 0));
```
Only the starting value is different.
:::

::: solution
```text
24
0
```
The first multiplies `1 × 2 × 3 × 4`, which is `24`. The second starts at `0`, and `0 × anything` is `0`, so it stays `0` the whole way. The starting value matters: for adding, start at `0`; for multiplying, start at `1`.
:::

## Honesty time: a loop is often clearer

Here is the category tally again, written as a plain `for...of` loop:

```js
const totals = {};
for (const expense of expenses) {
  totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
}

console.log(totals);
```

Output:

```text
{ food: 825.5, transport: 156, bills: 450 }
```

Put the two side by side. The loop version:

- has no starting value hidden at the very end after the `}`,
- has no `return` to forget,
- reads top to bottom like a recipe: "make an empty object; for each expense, add its amount to its category".

Many experienced programmers would pick the loop here, and they would be right to. `reduce` is powerful, but it is also the array method people find hardest to read, including people who have used it for years.

A fair guide:

| Job | Good choice |
|---|---|
| Add up numbers, or one property of objects | `reduce`, it is short and very common: `list.reduce((sum, x) => sum + x.amount, 0)` |
| Count, multiply, or find the max of numbers | either |
| Build an object (tally) or anything with several steps per item | a `for...of` loop is usually clearer; `reduce` is fine if you find it readable |
| You need to stop early | a loop (reduce always visits every item) |

You need to be able to **read** `reduce`, because you will see it in other people's code all the time. You do not have to *write* it everywhere. A clear loop is never a failure.

::: exercise Level 1 — Guided · Study time
Create `phase-7/study-time.js`.

1. Make an array `studySessions` with the minutes you studied this week: `30, 45, 20, 60`.
2. Create `const totalMinutes = studySessions.reduce(...)`.
3. The callback takes `(total, minutes)` and returns `total + minutes`.
4. Do not forget the starting value, `0`, after the callback.
5. Print `Total: 155 minutes` using a template literal.
6. Then print the time in hours and minutes. Use `Math.floor(totalMinutes / 60)` for the hours and `totalMinutes % 60` for the minutes left over (from [Numbers](#/phase-01-storing-information/04-numbers)).
:::

::: solution
```js
const studySessions = [30, 45, 20, 60];
const totalMinutes = studySessions.reduce((total, minutes) => total + minutes, 0);
console.log(`Total: ${totalMinutes} minutes`);
console.log(`That is ${Math.floor(totalMinutes / 60)} hours and ${totalMinutes % 60} minutes.`);
```
Output:
```text
Total: 155 minutes
That is 2 hours and 35 minutes.
```
:::

::: exercise Level 2 — On your own · The till
Create `phase-7/till.js` with:

```js
const cart = [
  { item: "Bread", price: 18.5, quantity: 2 },
  { item: "Eggs (6)", price: 21, quantity: 1 },
  { item: "Juice (1L)", price: 27.99, quantity: 3 },
];
```

Use `reduce` to work out the total to pay (each line is price times quantity), and print it as `To pay: R141.97`. Then use a second `reduce` to count how many items are in the cart altogether (`Items: 6`).
:::

::: hint
The combine step for the total is `sum + line.price * line.quantity`. Multiplication happens before addition, so you do not need extra brackets. For the count, add `line.quantity` instead. Both start at `0`.
:::

::: solution
```js
const cart = [
  { item: "Bread", price: 18.5, quantity: 2 },
  { item: "Eggs (6)", price: 21, quantity: 1 },
  { item: "Juice (1L)", price: 27.99, quantity: 3 },
];

const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
console.log(`To pay: R${total.toFixed(2)}`);

const itemCount = cart.reduce((count, line) => count + line.quantity, 0);
console.log(`Items: ${itemCount}`);
```
Output:
```text
To pay: R141.97
Items: 6
```
:::

::: debug The tally that crashes
This should print `{ food: 640.5, transport: 36 }`. Instead it crashes. Read the error carefully: *which* property is it trying to read, and on what?

```js
const expenses = [
  { amount: 640.5, category: "food" },
  { amount: 36, category: "transport" },
];

const totals = expenses.reduce((tally, expense) => {
  tally[expense.category] = (tally[expense.category] || 0) + expense.amount;
}, {});

console.log(totals);
```
:::

::: solution
The error is:
```text
TypeError: Cannot read properties of undefined (reading 'transport')
```
Node points at `tally[expense.category]`. The first step works: `tally` is `{}`, and `food` gets added. But the callback has braces and **no `return`**, so it returns `undefined`. On the second step, `tally` comes in as `undefined`, and reading `undefined["transport"]` crashes. Notice it says `transport`, not `food`: the crash happens on the *second* item.

Fix: add `return tally;` as the last line of the callback:
```js
const totals = expenses.reduce((tally, expense) => {
  tally[expense.category] = (tally[expense.category] || 0) + expense.amount;
  return tally;
}, {});
```
Output:
```text
{ food: 640.5, transport: 36 }
```
:::

::: mistake
**Leaving out the starting value.** Empty lists crash with `TypeError: Reduce of empty array with no initial value`, and arrays of objects give nonsense like `[object Object]32`. Always add one.

**Forgetting to `return` the accumulator.** With braces, the callback must return the new result so far. If it does not, the next step receives `undefined`.

**Putting the starting value in the wrong place.** It goes *after* the callback, as the second argument to `reduce`: `.reduce((a, b) => ..., 0)`. Not inside the arrow.

**Mixing up the two parameters.** The accumulator comes **first**, the item second: `(total, amount)`, not `(amount, total)`. Name the first one after what you are building (`total`, `tally`, `best`) and it becomes hard to confuse.

**Forcing everything into `reduce`.** If your `reduce` needs a comment to explain it, a `for...of` loop is probably clearer.
:::

## Real-world uses

- **Totals everywhere:** a shopping cart, a bank statement, a timesheet, a fitness app adding up steps.
- **Summaries:** the average rating of a product (total, then divide by the count), the highest score in a game.
- **Grouping:** spending per category, votes per candidate, sales per month. (Often written with a loop, and that is fine.)

::: connect
**This builds on:** the **accumulator** and **maximum** patterns from [loop patterns](#/phase-03-loops/04-loop-patterns), "sum" and "max" from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand), and the category tally from [Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6).

**This unlocks:** in [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining) you will filter, then map, then reduce in one flowing sentence, such as "the total of all food expenses". In the Budget Buddy v7 project, `totalSpent` and `categoryTotals` become `reduce` calls.
:::

::: challenge Count the votes
The class voted for their favourite football team:

```js
const votes = ["Chiefs", "Pirates", "Chiefs", "Sundowns", "Chiefs", "Pirates"];
```

1. Use `reduce` with a `{}` starting value to build `{ Chiefs: 3, Pirates: 2, Sundowns: 1 }`.
2. Write the same thing again as a `for...of` loop.
3. Look at both. Which would you rather read in six months' time? There is no wrong answer, but have a reason.
:::

::: solution
```js
const votes = ["Chiefs", "Pirates", "Chiefs", "Sundowns", "Chiefs", "Pirates"];

const tally = votes.reduce((counts, team) => {
  counts[team] = (counts[team] || 0) + 1;
  return counts;
}, {});
console.log(tally);

const tally2 = {};
for (const team of votes) {
  tally2[team] = (tally2[team] || 0) + 1;
}
console.log(tally2);
```
Output:
```text
{ Chiefs: 3, Pirates: 2, Sundowns: 1 }
{ Chiefs: 3, Pirates: 2, Sundowns: 1 }
```
This is the **counter** pattern and the tally object working together: instead of adding an amount, each vote adds `1`. Most beginners (and plenty of professionals) find the loop easier to read. Being able to write both, and choosing on purpose, is the real skill.
:::

::: recap
- **Reducing** means combining a whole list into one value: a total, a maximum, an object of tallies. It is the accumulator pattern.
- `myReduce(array, combine, start)`: start with `result = start`, and for each item do `result = combine(result, item)`.
- `array.reduce((accumulator, item) => newAccumulator, start)`. The starting value goes **after** the callback.
- Each step's return value becomes the next step's accumulator. A trace table makes this visible.
- **Always** give a starting value: `0` for totals, `{}` for tallies.
- With braces, remember to `return` the accumulator.
- `reduce` is great for sums. For anything more complicated, a `for...of` loop is often clearer, and that is a fine choice.
:::

::: interview What are the two arguments you give to reduce, and what does the callback receive?
You give it a callback and a starting value. The callback receives the accumulator (the result so far) and the current item, and returns the new accumulator. After the last item, `reduce` returns the final accumulator.
:::

::: interview Why is it risky to leave out reduce's starting value?
Without it, `reduce` uses the first item as the start. On an empty array that crashes with a `TypeError`, and on an array of objects the accumulator starts as an object instead of a number, which gives wrong results like `[object Object]32`.
:::

::: interview When would you choose a for...of loop instead of reduce?
When the combining step is complicated (for example building an object with several steps per item), when you need to stop early, or whenever the loop is clearer for you and your team to read. `reduce` shines for short things like totals.
:::

::: checkpoint
- [ ] I wrote `myReduce` and saw it match `.reduce` for a total and a maximum
- [ ] I printed a trace from inside a `reduce` callback and drew the trace table on paper
- [ ] I saw `Reduce of empty array with no initial value` and `[object Object]32`, and fixed both with a starting value
- [ ] I built a category tally with `reduce`, and again with a loop
- [ ] I finished the study time and till exercises
- [ ] I fixed the tally that crashed because of a missing `return`
:::

::: resources
- **javascript.info, "Array methods":** https://javascript.info/array-methods. The "reduce/reduceRight" section includes a step-by-step table like the one above.
- **MDN, "Array.prototype.reduce()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce. Thorough, and it also warns about the missing starting value.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `myReduce` with the receipts and watch `result` change at every step.
:::
