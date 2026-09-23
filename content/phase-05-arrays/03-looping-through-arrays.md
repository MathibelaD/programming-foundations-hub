---
title: Looping through arrays
summary: Arrays and loops were made for each other. Visit every item, number a list, and change every item, whatever the length.
minutes: 45
stage: Phase 5
---

## What you will learn

- Why arrays and loops belong together
- The standard loop `for (let i = 0; i < arr.length; i++)`, and exactly why it uses `<` and not `<=`
- The `for...of` loop, for when you do not need the index
- When you *do* need the index: numbering items, and changing every item in place

**Before this:** [Changing arrays](#/phase-05-arrays/02-changing-arrays). You should also remember the `for` loop from [Phase 3](#/phase-03-loops/03-for-loops).

## The problem: one line per item, again

Here is how you would print every item of an array with what you know so far:

```js
const fruit = ["mango", "litchi", "guava"];

console.log(fruit[0]);
console.log(fruit[1]);
console.log(fruit[2]);
```

Output:

```text
mango
litchi
guava
```

It works, but look at the pattern. The lines are identical except for the number, which goes 0, 1, 2. And if `fruit` gets a fourth item, you have to add a fourth line. If the list comes from the user, you cannot even know how many lines to write.

Now remember what a `for` loop is good at: **counting**. It can make a variable go 0, 1, 2, 3… and stop wherever you tell it to. And from lesson 1: **an index can be a variable**.

Put those two facts together, and you have the most important partnership in this whole phase.

::: analogy A security guard checking lockers
A security guard has to check every locker in a row. They do not have a separate plan for each locker. They have one routine:

1. Start at locker 0.
2. While there are still lockers left, check the current one, then step to the next.
3. Stop after the last locker.

The routine does not care whether the row has 3 lockers or 300. It only needs to know **where to start**, **when to stop**, and **how to move to the next one**. That is a start, a condition and a step, the three parts of every loop from [Phase 3](#/phase-03-loops/01-why-loops).
:::

## The standard array loop

```js
const fruit = ["mango", "litchi", "guava"];

for (let i = 0; i < fruit.length; i++) {
  console.log(fruit[i]);
}
```

Output:

```text
mango
litchi
guava
```

This is the same output as before, but now the code works for **any** length of array. Add ten more fruits and it prints thirteen lines without you touching the loop.

Here are the three parts, one at a time:

| Part | Code | Meaning |
|---|---|---|
| Start | `let i = 0` | Begin at the first index, 0 |
| Condition | `i < fruit.length` | Keep going while `i` is a real index |
| Step | `i++` | Move to the next locker |
| Body | `console.log(fruit[i])` | Do something with the current item |

The letter `i` is short for **index**. Programmers use `i` for this so often that you will see it everywhere. You could call it `index` or `position` if you prefer. Any name works.

Let's trace it, writing down every value at every step, the way you did in Phase 3:

| Step | `i` | `i < fruit.length` (3)? | `fruit[i]` | Printed |
|---|---|---|---|---|
| 1 | 0 | `0 < 3` true | `"mango"` | mango |
| 2 | 1 | `1 < 3` true | `"litchi"` | litchi |
| 3 | 2 | `2 < 3` true | `"guava"` | guava |
| 4 | 3 | `3 < 3` **false** | — | loop stops |

Each time round the loop is called an **iteration** (you met the word in Phase 3). Going through a whole array, item by item, is called **iterating over** the array.

::: quiz
What does this program print?

```js
const temps = [18, 25, 31, 22];
let total = 0;
for (let i = 1; i < temps.length; i++) {
  total = total + temps[i];
}
console.log(total);
```

- [ ] `96`
- [x] `78`
- [ ] `74`
- [ ] `NaN`

The loop starts at `i = 1`, so it skips index 0 (the 18). It adds indexes 1, 2 and 3: `25 + 31 + 22`, which is 78. It stops when `i` is 4, because `4 < 4` is false, so it never reads past the end. If you picked 96, you added all four, but the start value decides where the walk begins.
:::

## Why `<` and not `<=`

Look at the last row of that trace. The loop stopped when `i` became `3`, because `3 < 3` is false. That is exactly right: there is no `fruit[3]`. The indexes of a 3-item array are 0, 1 and 2.

What if you write `<=` by mistake?

```js
const fruit = ["mango", "litchi", "guava"];

for (let i = 0; i <= fruit.length; i++) {
  console.log(fruit[i]);
}
```

Output:

```text
mango
litchi
guava
undefined
```

With `<=`, the loop also runs when `i` is `3`, because `3 <= 3` is true. It reads `fruit[3]`, which does not exist, and gets `undefined`. The loop ran **one time too many**.

This is the classic **off-by-one error** that you met in lesson 1. It is so common that it has a joke: *"There are two hard problems in programming: naming things, cache invalidation, and off-by-one errors."*

The rule that prevents it:

> Start at `0`, and go while `i < arr.length`. **Zero, less-than, length.**

Say it a few times. It is the same every time, for every array.

::: why Why does `< length` work so neatly?
Because indexes start at 0, the **length is always one more than the last index**. A 3-item array has length 3 and last index 2. So "all the indexes" means "every number from 0 up to, but not including, the length". `<` means exactly "up to, but not including". If arrays started at 1, you would need `<=`. They do not, so you do not.
:::

::: try Your first array loop
1. In `coding-practice`, create `phase-5/numbered-list.js`.
2. Type this in:
   ```js
   const shopping = ["bread", "maas", "tomatoes", "rooibos"];

   console.log("Shopping list:");
   for (let i = 0; i < shopping.length; i++) {
     console.log(`${i + 1}. ${shopping[i]}`);
   }
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-5/numbered-list.js
   ```
4. You should see:
   ```text
   Shopping list:
   1. bread
   2. maas
   3. tomatoes
   4. rooibos
   ```
5. Notice `${i + 1}`. The array counts from 0, but people count from 1, so we add 1 **only when showing the number**. The index used to read the item, `shopping[i]`, stays as it is.
6. **Now experiment.**
   - Add two more items to the array. Predict the output, then run it. You did not change the loop at all.
   - Change `<` to `<=`. Predict the last line, then run it. Change it back.
   - Change `${i + 1}` to `${i}`. What does the list look like now? Would a shopper like that?
:::

::: quiz
Someone wants to print the towns in reverse order. What does this print?

```js
const towns = ["Durban", "Joburg", "Gqeberha"];
for (let i = towns.length; i > 0; i--) {
  console.log(towns[i]);
}
```

- [ ] `Gqeberha`, `Joburg`, `Durban`
- [ ] `Gqeberha`, `Joburg`
- [x] `undefined`, `Gqeberha`, `Joburg`
- [ ] `undefined`, `Gqeberha`, `Joburg`, `Durban`

`i` starts at the length, 3, and there is no `towns[3]`, so the first line is `undefined`. Then `i` is 2 (`Gqeberha`) and 1 (`Joburg`). When `i` reaches 0, `0 > 0` is false, so `Durban` is never printed. Off by one at both ends. The fix is to start at `towns.length - 1` and keep going while `i >= 0`.
:::

## `for...of`: when you only need the items

Very often you do not care about the index at all. You only want "each item, one at a time". For that, JavaScript has a shorter loop, `for...of`:

```js
const fruit = ["mango", "litchi", "guava"];

for (const item of fruit) {
  console.log(item);
}
```

Output:

```text
mango
litchi
guava
```

Read it as: "**for** each `item` **of** the `fruit` array, do this". Every time round the loop, `item` holds the next value. There is no `i`, no `< length`, and no `i++`, so there is no way to get an off-by-one error.

| | `for (let i = 0; i < arr.length; i++)` | `for (const item of arr)` |
|---|---|---|
| You get | the index `i` (and read `arr[i]` yourself) | the item itself |
| Off-by-one risk | yes | no |
| Can number items (1, 2, 3…) | yes, with `i + 1` | not directly |
| Can change items in the array | yes, with `arr[i] = ...` | no |
| Best for | numbering, changing, or needing the position | reading every item |

The name `item` is up to you. Choose a name that describes **one** thing from the list: `for (const fruit of fruits)`, `for (const mark of marks)`, `for (const name of guests)`. Plural for the array, singular for the item. That little habit makes loops read like English.

Why `const`? Because each time round the loop, `item` is a brand new variable holding the next value. It is never changed inside one iteration, so `const` fits. (`let` also works.)

::: predict What does this print?
```js
const goals = [2, 0, 3, 1];
let message = "";

for (const g of goals) {
  message = message + g + "-";
}

console.log(message);
console.log(goals.length);
```
This uses the **build-a-string** pattern from [Loop patterns](#/phase-03-loops/04-loop-patterns). Trace it on paper.
:::

::: solution
```text
2-0-3-1-
4
```
| Iteration | `g` | `message` after |
|---|---|---|
| 1 | 2 | `"2-"` |
| 2 | 0 | `"2-0-"` |
| 3 | 3 | `"2-0-3-"` |
| 4 | 1 | `"2-0-3-1-"` |

Notice the extra `-` at the end. Getting rid of it takes a little more thought. You will see a neat way in [Strings and arrays](#/phase-05-arrays/05-strings-and-arrays).
:::

::: quiz
What does this program print?

```js
const towns = ["Tzaneen", "Upington", "Ermelo"];
for (const t of towns) {
  console.log(towns[t]);
}
```

- [x] `undefined`, three times
- [ ] `Tzaneen`, `Upington`, `Ermelo`
- [ ] `0`, `1`, `2`
- [ ] An error, because `t` is not a number

`for...of` hands you the **items**, not the indexes. So `t` is `"Tzaneen"`, then `"Upington"`, then `"Ermelo"`, and `towns["Tzaneen"]` is not a locker number. JavaScript quietly gives `undefined`, three times, with no error. If you picked the three names, you treated `t` like the `i` in an index loop. With `for...of`, print `t` itself.
:::

## When you need the index

Use the index loop, not `for...of`, in two situations.

**1. Numbering items for people.** You saw this in the "Try it". The shopping list needed `i + 1`, so it needed `i`.

**2. Changing the items in the array.** Look at this attempt to double every price:

```js
const prices = [25, 60, 18.5];

for (let price of prices) {
  price = price * 2;
}
console.log(prices);

for (let i = 0; i < prices.length; i++) {
  prices[i] = prices[i] * 2;
}
console.log(prices);
```

Output:

```text
[ 25, 60, 18.5 ]
[ 50, 120, 37 ]
```

The `for...of` version did nothing! `price` is a **copy** of the value, not the locker itself. Changing `price` changes the copy, and the copy is thrown away at the end of the iteration. (It is the same as `let b = a; b = 20;` from [Variables](#/phase-01-storing-information/02-variables): changing `b` does not touch `a`.)

The index version works because `prices[i] = ...` writes **into the locker**. Read it right to left: "work out `prices[i] * 2`, then store it back in locker `i`".

Changing every item works for strings too:

```js
const names = ["amahle", "lindiwe", "kofi"];

for (let i = 0; i < names.length; i++) {
  names[i] = names[i].toUpperCase();
}

console.log(names);
```

Output:

```text
[ 'AMAHLE', 'LINDIWE', 'KOFI' ]
```

Changing each item where it stands like this is called changing the array **in place**. The original values are gone afterwards. In the next lesson you will see another approach: building a **new** array and leaving the original alone.

::: quiz
What does this program print?

```js
const stock = [5, 0, 12];
for (let n of stock) {
  n = n + 1;
}
for (let i = 0; i < stock.length; i++) {
  stock[i] = stock[i] * 2;
}
console.log(stock);
```

- [ ] `[ 12, 2, 26 ]`
- [ ] `[ 6, 1, 13 ]`
- [ ] `[ 5, 0, 12 ]`
- [x] `[ 10, 0, 24 ]`

The first loop changes `n`, which is only a copy of each value, so the array is not touched. The second loop writes into the lockers with `stock[i] = ...`, so every item really is doubled: 10, 0, 24. If you picked `[ 12, 2, 26 ]`, you expected the `for...of` loop to add 1 to the array first.
:::

## Loops over arrays inside functions

Since you know [functions](#/phase-04-functions/02-parameters-and-arguments), you can wrap a loop in a function and pass it any array you like. The array becomes an argument, the same as a number or string:

```js
function printNumbered(title, items) {
  console.log(title);
  for (let i = 0; i < items.length; i++) {
    console.log(`  ${i + 1}. ${items[i]}`);
  }
}

printNumbered("Chores:", ["dishes", "sweep", "feed the dog"]);
printNumbered("Guests:", ["Zanele", "Tom"]);
printNumbered("Nothing here:", []);
```

Output:

```text
Chores:
  1. dishes
  2. sweep
  3. feed the dog
Guests:
  1. Zanele
  2. Tom
Nothing here:
```

One function, any list. Notice what happened with the empty array: `0 < 0` is false straight away, so the loop body never ran. No crash, no `undefined`. A loop over an empty array does nothing, which is almost always what you want. (In a real app you might print "Nothing here yet" instead. You will do that in Budget Buddy.)

::: note What about `while`?
You can loop over an array with a `while` loop too. The same three parts are spread out over several lines:

```js
const trips = [14, 14, 22];
let i = 0;
while (i < trips.length) {
  console.log(`Trip ${i + 1}: R${trips[i]}`);
  i++;
}
```

Output:

```text
Trip 1: R14
Trip 2: R14
Trip 3: R22
```

It works, but the `for` version keeps start, condition and step on one line, so it is harder to forget the `i++`. For visiting every item, use `for` or `for...of`.
:::

::: exercise Level 1 — Guided · Pass or fail
Create `phase-5/pass-fail.js`.

1. Make `const marks = [72, 45, 91, 38, 64];`.
2. Write a `for` loop with `i` from `0`, while `i < marks.length`, with `i++`.
3. Inside the loop, make `const mark = marks[i];`.
4. If `mark` is 50 or more, print `` `Test ${i + 1}: ${mark}% (pass)` ``. Otherwise print the same with `(fail)`.
5. Run it. You should see five lines, three passes and two fails.
:::

::: solution
```js
const marks = [72, 45, 91, 38, 64];

for (let i = 0; i < marks.length; i++) {
  const mark = marks[i];
  if (mark >= 50) {
    console.log(`Test ${i + 1}: ${mark}% (pass)`);
  } else {
    console.log(`Test ${i + 1}: ${mark}% (fail)`);
  }
}
```
Output:
```text
Test 1: 72% (pass)
Test 2: 45% (fail)
Test 3: 91% (pass)
Test 4: 38% (fail)
Test 5: 64% (pass)
```
Why the index loop and not `for...of`? Because the output needs the test **number**.
:::

::: exercise Level 2 — On your own · Everything 10% off
Create `phase-5/sale.js` with `const prices = [199.99, 45, 12.5, 350];`.

1. Change **every** price in the array to be 10% cheaper (multiply by `0.9`).
2. Then print a numbered list of the new prices, as rand with two decimal places.

Expected output:

```text
Sale prices:
1. R179.99
2. R40.50
3. R11.25
4. R315.00
```
:::

::: hint
You need two loops: one to change the prices, and one to print them. Both need the index. Which loop gives you that? For two decimal places, remember `toFixed(2)` from [Numbers](#/phase-01-storing-information/04-numbers).
:::

::: solution
```js
const prices = [199.99, 45, 12.5, 350];

for (let i = 0; i < prices.length; i++) {
  prices[i] = prices[i] * 0.9;
}

console.log("Sale prices:");
for (let i = 0; i < prices.length; i++) {
  console.log(`${i + 1}. R${prices[i].toFixed(2)}`);
}
```
You could do both jobs in one loop. Keeping them separate is fine too, and it makes each loop do one clear job.
:::

::: debug The airtime total is NaN
This should add up what was spent on airtime this month. Instead it prints `RNaN`.

```js
const airtime = [29, 49, 12, 99];
let total = 0;

for (let i = 0; i <= airtime.length; i++) {
  total = total + airtime[i];
}

console.log(`Spent on airtime: R${total}`);
```

Output:

```text
Spent on airtime: RNaN
```

Find the bug. Before you fix it, write a trace table for the last two iterations. What is `airtime[i]` on the very last one, and what is `total` after it?
:::

::: solution
The condition is `i <= airtime.length`. The array has 4 items (indexes 0 to 3), but the loop also runs when `i` is `4`:

| `i` | `i <= 4`? | `airtime[i]` | `total` after |
|---|---|---|---|
| 3 | true | `99` | `189` |
| 4 | true | `undefined` | `189 + undefined` = `NaN` |

`airtime[4]` is `undefined`, and a number plus `undefined` is `NaN` ("not a number"). Once `NaN` gets into a calculation, everything it touches becomes `NaN`.

Fix: **zero, less-than, length**.

```js
for (let i = 0; i < airtime.length; i++) {
  total = total + airtime[i];
}
```
Output:
```text
Spent on airtime: R189
```
Even better, since you do not need the index here, use `for (const amount of airtime) { total = total + amount; }`, and the bug cannot happen at all.
:::

::: debug Where is the captain?
This should list all four players, numbered from 1. Run it. Who is missing, and why?

```js
const players = ["Siya", "Cheslin", "Eben", "Faf"];

for (let i = 1; i < players.length; i++) {
  console.log(`Player ${i}: ${players[i]}`);
}
```

Output:

```text
Player 1: Cheslin
Player 2: Eben
Player 3: Faf
```
:::

::: solution
The loop starts at `i = 1`, so it skips index 0, `"Siya"`, the first player. This is the off-by-one error at the *start* of the loop. The author wanted the numbers to start at 1 and changed the wrong thing.

Keep the index starting at 0, and add 1 only in what you show:

```js
for (let i = 0; i < players.length; i++) {
  console.log(`Player ${i + 1}: ${players[i]}`);
}
```
Output:
```text
Player 1: Siya
Player 2: Cheslin
Player 3: Eben
Player 4: Faf
```
:::

::: mistake
**Using `<=` instead of `<`.** The loop runs once too many and reads `undefined`. Zero, less-than, length.

**Starting at `i = 1` to "count from 1".** That skips the first item. Start at 0 and show `i + 1`.

**Printing `i` when you meant `arr[i]`.** `i` is the position (0, 1, 2), `arr[i]` is the thing in that position. If your "list" prints `0 1 2`, this is why.

**Trying to change items with `for...of`.** Assigning to the loop variable changes a copy. Use the index loop and `arr[i] = ...`.

**Changing the array's length while looping over it.** Using `push` or `splice` on the same array inside the loop makes the loop skip items or never end. If you need to remove things, you will learn a safer way in the next lesson: build a new array.
:::

::: quiz
This function should count how many values are above `limit`. What does the program print?

```js
function countAbove(list, limit) {
  let count = 0;
  for (const value of list) {
    if (value > limit) {
      count++;
    }
    return count;
  }
}

console.log(countAbove([80, 90, 40], 60), countAbove([], 60));
```

- [ ] `2 0`
- [x] `1 undefined`
- [ ] `1 0`
- [ ] `2 undefined`

The `return` is **inside** the loop, so the function ends after the first item. For `[80, 90, 40]`, 80 is above 60, so `count` becomes 1 and is returned straight away. For `[]`, the loop body never runs, so the `return` is never reached, and a function that ends without `return` gives `undefined`. If you picked `1 0`, you forgot that the only `return` is inside the loop. Moving it below the loop's closing `}` fixes both.
:::

## Real-world uses

Almost every screen in almost every app has a loop over an array behind it:

- **Your bank statement:** a loop over the transactions array, printing one line each.
- **A class register:** a numbered loop, `1. Amahle`, `2. Kofi`…
- **Price changes:** a shop raising every price by 5% loops over its prices and changes each one in place.
- **Tidying data:** turning every name in a list to proper capitals, or trimming stray spaces from every entry someone typed.
- **Chat apps:** showing your messages is a loop over an array of messages.

::: connect
**This builds on:** the [`for` loop](#/phase-03-loops/03-for-loops) and the idea that [an index can be a variable](#/phase-05-arrays/01-what-is-an-array).

**This unlocks:** [Classic list algorithms, written by hand](#/phase-05-arrays/04-array-algorithms-by-hand), next. You will combine these loops with the Phase 3 patterns (accumulator, counter, max/min, flag) to total, count, search and filter lists. That lesson is the heart of this phase.
:::

::: challenge Top 5 countdown
Radio stations count down the charts from number 5 to number 1. Given:

```js
const top5 = ["Mnike", "Water", "Pata Pata", "Umlando", "Jerusalema"];
```

where index 0 is number 1, write a loop that prints:

```text
Countdown!
Number 5: Jerusalema
Number 4: Umlando
Number 3: Pata Pata
Number 2: Water
Number 1: Mnike
```

The loop must work for a list of any length. You will need to count **down**, as you did in Phase 3. Think carefully about the start value and the condition: this is where off-by-one errors love to hide.
:::

::: solution
```js
const top5 = ["Mnike", "Water", "Pata Pata", "Umlando", "Jerusalema"];

console.log("Countdown!");
for (let i = top5.length - 1; i >= 0; i--) {
  console.log(`Number ${i + 1}: ${top5[i]}`);
}
```
- **Start** at the last index, `top5.length - 1` (not `top5.length`, which is one past the end).
- **Keep going** while `i >= 0`, so index 0 is included (with `i > 0` you would lose number 1).
- **Step** down with `i--`.
:::

::: recap
- A loop's counter can be an array index, so one loop can visit every item of an array of any length.
- The standard loop is `for (let i = 0; i < arr.length; i++)`: **zero, less-than, length**.
- `<=` runs once too many and reads `undefined`. Starting at 1 skips the first item. Both are **off-by-one errors**.
- `for (const item of arr)` gives you each item directly. Use it when you do not need the position.
- Use the index loop to number items for people (`i + 1`) or to change items in place (`arr[i] = ...`).
- A function can take an array as a parameter and loop over it. A loop over an empty array runs zero times.
:::

::: interview Why does the standard array loop use `i < arr.length` rather than `i <= arr.length`?
Indexes run from 0 to `length - 1`. `i < arr.length` stops exactly after the last real index. `<=` would also run with `i` equal to the length, reading one past the end and getting `undefined`. That is an off-by-one error.
:::

::: interview When would you use `for...of` and when a `for` loop with an index?
Use `for...of` when you only need each item's value, for example to add them up or print them. Use the index loop when you need the position: to number items for display, or to change items in the array with `arr[i] = ...`.
:::

::: interview Why does changing the loop variable in `for...of` not change the array?
The loop variable holds a copy of the item's value. Assigning a new value to it only changes that copy, not the element in the array. To change the array, you have to assign to `arr[i]`.
:::

::: checkpoint
- [ ] I printed a numbered shopping list and added items without touching the loop
- [ ] I changed `<` to `<=` on purpose and saw the extra `undefined`
- [ ] I finished "Pass or fail" and "Everything 10% off"
- [ ] I fixed the `NaN` airtime total and wrote the trace table for the last two iterations
- [ ] I fixed the missing captain
- [ ] I can say the rule "zero, less-than, length" and explain why it works
:::

::: resources
- **javascript.info, "Arrays" (the Loops section):** https://javascript.info/array. Covers `for` and `for...of` over arrays.
- **MDN, "Looping code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops. A beginner guide with arrays and `for...of`.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the airtime debug example and step through it. Watch `i` reach 4.
:::
