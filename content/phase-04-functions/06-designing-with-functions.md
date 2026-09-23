---
title: Designing programs with functions
summary: How to break a problem into small functions with one job each, why "pure" functions are easy to trust, and how to test them with a helper you write yourself.
minutes: 55
stage: Phase 4
---

## What you will learn

- How to break a problem into steps, and turn each step into a function with **one job**
- What a **pure function** is, and why programmers love them
- How to keep asking and printing at the **edges** of a program, with the thinking in the middle
- How to **test** your functions with a tiny `check` helper that you write yourself
- A worked example: a bill splitter built from small, tested functions

**Before this:** [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions). You should be able to write a function as a declaration or an arrow, with parameters and `return`.

## The problem: one long list of instructions

Here is a bill splitter for a group of friends at a restaurant. It works. It asks for the bill, the tip percentage and the number of people, and it rounds each share **up** to the next whole rand so the waiter is never short:

```js
const prompt = require("prompt-sync")();

let bill = Number(prompt("Bill amount: R"));
while (Number.isNaN(bill) || bill <= 0) {
  console.log("  Please enter a number bigger than 0.");
  bill = Number(prompt("Bill amount: R"));
}
let percent = Number(prompt("Tip percent: "));
while (Number.isNaN(percent) || percent < 0) {
  console.log("  Please enter a number of 0 or more.");
  percent = Number(prompt("Tip percent: "));
}
let people = Number(prompt("How many people? "));
while (Number.isNaN(people) || people < 1) {
  console.log("  Please enter a number of 1 or more.");
  people = Number(prompt("How many people? "));
}
const tip = bill * percent / 100;
const total = bill + tip;
const each = Math.ceil(total / people);
console.log(`Tip:        R${tip.toFixed(2)}`);
console.log(`Total:      R${total.toFixed(2)}`);
console.log(`Each pays:  R${each.toFixed(2)}`);
```

A sample session:

```text
Bill amount: R840
Tip percent: 10
How many people? 4
Tip:        R84.00
Total:      R924.00
Each pays:  R231.00
```

What is wrong with it? Nothing, today. But ask some questions about it:

- **How do you know the maths is right?** To check the share for 3 people and a R100 bill, you have to run the program and type three answers. Every time. For every case you want to check.
- **Can you reuse the tip calculation** in another program? Only by copying lines out of the middle of it.
- **Where is the "ask until valid" logic?** In three places, nearly identical. Copied code, again.
- **What does the program do?** You have to read every line to find out. There is no summary anywhere.

Now you know functions, you can do much better. This lesson is less about new syntax and more about **how to think**: how to organise a program so it is easy to read, easy to check and easy to change.

::: analogy A restaurant kitchen
A busy restaurant kitchen does not have one cook doing everything. It has stations: one person on the grill, one on salads, one on sauces, one plating up. Each station has **one job**, and does it the same way every time.

The head chef does not cook. The head chef calls out orders: "Two steaks, one salad!" and the stations do the work and hand back the food.

- If the salads are bad, you know exactly which station to look at.
- A new salad cook can learn one station without learning the whole kitchen.
- You can **taste** each station's work on its own, before it reaches a customer.

A well-designed program is the same. Small functions are the stations, each with one job. A `main` function is the head chef, calling them in order. And, like tasting the sauce before service, you can test each small function on its own.
:::

## Step 1: break the problem into steps

Before writing any code, describe the program in plain words, as a short list of steps. For the bill splitter:

1. Ask for the bill (keep asking until it is valid).
2. Ask for the tip percentage (keep asking until it is valid).
3. Ask for the number of people (keep asking until it is valid).
4. Work out the tip.
5. Work out the total.
6. Work out each person's share, rounded up.
7. Print a summary.

Now look for steps that are **the same kind of job**. Steps 1 to 3 are all "ask for a number until it is valid". That is one function, used three times. Steps 4 to 6 are all small calculations. Step 7 is printing.

Each step becomes a function with a **name that says what it does**:

| Step | Function | Its one job |
|---|---|---|
| 1, 2, 3 | `askForNumber(question, smallest)` | Ask, and keep asking until the answer is a number of at least `smallest`. Return it. |
| 4 | `tipAmount(bill, percent)` | Return the tip. |
| 5 | `totalWithTip(bill, percent)` | Return the bill plus the tip. |
| 6 | `shareFor(total, people)` | Return one person's share, rounded up. |
| 7 | `printSummary(bill, percent, people)` | Print the results neatly. |
| (all) | `main()` | Call the others in order. The head chef. |

A good test for "one job": **can you describe the function in one sentence without the word "and"?** "`tipAmount` returns the tip" passes. "It asks for the bill and works out the tip and prints it" fails, so split it.

## Step 2: pure functions

Look at the calculation functions from the table: `tipAmount`, `totalWithTip`, `shareFor`. They have something in common. Given the same inputs, they always give the same answer, and they do nothing else: no asking, no printing. Functions like that have a special name.

A **pure function**:

1. **Always returns the same output for the same input.** `tipAmount(200, 10)` is `20` today, tomorrow and forever.
2. **Has no side effects.** A **side effect** is anything a function does apart from returning a value: printing, asking with `prompt`, or changing a variable outside itself.

```js
// Pure: same input, same output, and nothing else happens
function vatOn(price) {
  return price * 0.15;
}

// Not pure: it prints
function printVat(price) {
  console.log(price * 0.15);
}

// Not pure: a different answer every time
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Not pure: it changes a variable outside itself
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

console.log(vatOn(100), vatOn(100));
console.log(addToTotal(10), addToTotal(10));
```

Output:

```text
15 15
10 20
```

`vatOn(100)` gives 15 both times. `addToTotal(10)` gives 10, then 20: **same input, different output**, because it depends on (and changes) something outside itself. That is exactly the kind of global-variable surprise you met in [Scope](#/phase-04-functions/04-scope).

Why do programmers love pure functions?

- **Easy to test.** Give it inputs, compare the answer with what you expected. No typing into prompts, no reading the screen.
- **Easy to trust.** A pure function cannot secretly break anything else in your program.
- **Easy to reuse.** `tipAmount` does not care whether the numbers came from a keyboard, a file or a website. Drop it into any program.

Using local variables inside a function is fine. A pure function can have `const` and `let` inside it, loops, and `if` statements. What matters is that nothing *outside* it is touched, and nothing goes to or comes from the user.

::: note Impure is not bad
Programs *must* ask and print, or they would be useless. `prompt` and `console.log` are not wrong. The idea is to keep them in a **few, clearly named** functions (like `askForNumber` and `printSummary`), and keep everything else pure.
:::

::: quiz
Which **one** of these four functions is pure?

```js
let ticketNumber = 0;

function countdownText(n) {
  let text = "";
  for (let i = n; i > 0; i--) {
    text = text + i + " ";
  }
  return text;
}

function priceOf(item) {
  console.log("Looking up " + item);
  return 25;
}

function nextTicket() {
  ticketNumber++;
  return ticketNumber;
}

function luckyNumber(max) {
  return Math.ceil(Math.random() * max);
}
```

- [ ] `priceOf`
- [ ] `nextTicket`
- [x] `countdownText`
- [ ] `luckyNumber`

`countdownText(3)` always returns `"3 2 1 "` and does nothing else. Its own `let`, loop and variables are fine, because nothing outside it is touched. `priceOf` always returns 25, which looks pure, but it prints: that is a side effect. `nextTicket` changes a global, so the same call gives a different answer each time. `luckyNumber` gives a random answer.
:::

## Step 3: input and output at the edges

Here is the shape to aim for:

```text
   INPUT             THINKING                 OUTPUT
 (impure)             (pure)                 (impure)

 askForNumber  --->  tipAmount       --->   printSummary
                     totalWithTip
                     shareFor
                     formatMoney
```

Values come **in** at one edge, get worked on by pure functions in the middle, and go **out** at the other edge. Programmers call this "keeping input and output at the edges". The middle is where most bugs live, and because it is pure, the middle is also the easiest part to test.

A useful question when you write a function: **"Does this function need to talk to the user?"** If not, it should not contain `prompt` or `console.log`. Have it return a value instead, and let the edge do the talking.

## Step 4: test your functions with `check`

How do you know `shareFor` rounds correctly? You could run the whole program and type in numbers. Or you could write a tiny function whose only job is to compare an answer with the answer you expected:

```js
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}
```

- `actual` is what your function really returned.
- `expected` is what you, a human, worked out it *should* return.
- If they match, it prints `PASS`. If not, it tells you exactly what went wrong.

Each call to `check` is a **test**: a small, automatic check that a piece of code does what you think. Real programmers use testing tools with many more features, but underneath, every one of them does what these seven lines do.

Here is `check` catching a real bug. This `gradeFor` looks right, but has a mistake in it:

```js
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

function gradeFor(mark) {
  if (mark >= 80) {
    return "A";
  }
  if (mark >= 70) {
    return "B";
  }
  if (mark >= 60) {
    return "C";
  }
  if (mark > 50) {
    return "D";
  }
  return "F";
}

check(gradeFor(91), "A");
check(gradeFor(80), "A");
check(gradeFor(79), "B");
check(gradeFor(65), "C");
check(gradeFor(50), "D");
check(gradeFor(12), "F");
```

Output:

```text
PASS: A
PASS: A
PASS: B
PASS: C
FAIL: expected D but got F
PASS: F
```

A mark of exactly 50 should be a D, but the function says F. Look at the line `if (mark > 50)`: it should be `>=`. Without the test, this bug could sit there for months, until some learner with exactly 50% gets told she failed.

Notice *which* marks were tested: 80 and 79, and 50. The bugs in programs cluster at the **edges** between cases (exactly on the limit, one below it). Good tests always try those **boundary values**, not only comfortable ones in the middle like 65.

::: warn Testing with decimals
Remember from [Numbers](#/phase-01-storing-information/04-numbers) that `0.1 + 0.2` is `0.30000000000000004`. So `check(0.1 + 0.2, 0.3)` prints `FAIL: expected 0.3 but got 0.30000000000000004`, even though your code is fine. When a function returns money with cents, test the **formatted** result instead: `check(formatMoney(0.1 + 0.2), "R0.30")` passes. Or pick test values that give whole numbers.
:::

::: try Catch the bug yourself
1. In `coding-practice`, create `phase-4/grade-tests.js`, and type in `check`, the buggy `gradeFor` and the six tests above.
2. Run it with `node phase-4/grade-tests.js`. You should see one `FAIL`.
3. Fix the bug (change `>` to `>=`). Run it again. All six should say `PASS`.
4. **Change it, predict, run.** Add two more boundary tests: `check(gradeFor(69), "C")` and `check(gradeFor(70), "B")`. Predict whether they pass, then run.
5. Now break the function on purpose: change `>= 70` to `>= 75`. Before you run, predict *which* tests will fail. Run it and check. Then put it back.
:::

::: quiz
A shop gives free delivery on orders of **R500 or more**. Here is the function:

```js
function deliveryFee(total) {
  if (total > 500) {
    return 0;
  }
  return 50;
}
```

Using the `check` function from this lesson, which single test would catch the bug?

- [ ] `check(deliveryFee(650), 0);`
- [ ] `check(deliveryFee(499), 50);`
- [x] `check(deliveryFee(500), 0);`
- [ ] `check(deliveryFee(100), 50);`

An order of exactly R500 should be free, but `500 > 500` is false, so the function returns 50 and the test prints `FAIL: expected 0 but got 50`. The other three tests all pass, because they are not on the boundary. That is the point: bugs hide at the edge between cases. If you picked the R499 test, check it again: 499 should pay R50, and it does.
:::

## Worked example: the bill splitter, rebuilt

Let us build the bill splitter properly, following the four steps: plan, pure functions, edges, and tests.

### Write the pure functions first, and test them

Short one-line helpers, so arrow functions suit them well:

```js
// ---------- pure helpers ----------
const tipAmount = (bill, percent) => bill * percent / 100;

const totalWithTip = (bill, percent) => bill + tipAmount(bill, percent);

// Round up to the next whole rand, so the waiter is never short
const shareFor = (total, people) => Math.ceil(total / people);

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

// ---------- tests ----------
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

check(tipAmount(200, 10), 20);
check(tipAmount(200, 0), 0);
check(totalWithTip(840, 10), 924);
check(shareFor(924, 4), 231);
check(shareFor(100, 3), 34);
check(formatMoney(34), "R34.00");
check(formatMoney(7.5), "R7.50");
```

Output:

```text
PASS: 20
PASS: 0
PASS: 924
PASS: 231
PASS: 34
PASS: R34.00
PASS: R7.50
```

Seven checks, run in a fraction of a second, without typing a single answer into a prompt. The `shareFor(100, 3)` test is the important one: R100 between 3 is R33.33 each, so rounding **up** should give 34. Now we know it does.

### Then add the edges and `main`

Now the impure parts. One `askForNumber` replaces all three copied "ask until valid" loops. `printSummary` does all the printing. And `main` is the head chef:

```js
const prompt = require("prompt-sync")();

// ---------- pure helpers: no prompt, no console.log ----------
const tipAmount = (bill, percent) => bill * percent / 100;

const totalWithTip = (bill, percent) => bill + tipAmount(bill, percent);

// Round up to the next whole rand, so the waiter is never short
const shareFor = (total, people) => Math.ceil(total / people);

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

// ---------- input and output: the edges ----------
function askForNumber(question, smallest) {
  let answer = Number(prompt(question));
  while (Number.isNaN(answer) || answer < smallest) {
    console.log(`  Please enter a number of ${smallest} or more.`);
    answer = Number(prompt(question));
  }
  return answer;
}

function printSummary(bill, percent, people) {
  const total = totalWithTip(bill, percent);
  console.log("");
  console.log(`Bill:       ${formatMoney(bill)}`);
  console.log(`Tip (${percent}%):  ${formatMoney(tipAmount(bill, percent))}`);
  console.log(`Total:      ${formatMoney(total)}`);
  console.log(`Each of ${people} pays ${formatMoney(shareFor(total, people))}`);
}

// ---------- the program ----------
function main() {
  console.log("=== Bill Splitter ===");
  const bill = askForNumber("Bill amount: R", 1);
  const percent = askForNumber("Tip percent: ", 0);
  const people = askForNumber("How many people? ", 1);
  printSummary(bill, percent, people);
}

main();
```

A sample session, including a couple of wrong answers:

```text
=== Bill Splitter ===
Bill amount: R840
Tip percent: ten
  Please enter a number of 0 or more.
Tip percent: 10
How many people? 0
  Please enter a number of 1 or more.
How many people? 4

Bill:       R840.00
Tip (10%):  R84.00
Total:      R924.00
Each of 4 pays R231.00
```

Compare this with the version at the top of the lesson:

- **Read `main` first.** Four lines tell you what the whole program does: ask for three numbers, print a summary. The details are one step away if you want them.
- **One "ask until valid" loop**, not three. The second parameter, `smallest`, handles the difference between them.
- **The maths is tested**, separately from the typing.
- **Everything has an address.** A problem with rounding? Look in `shareFor`. The layout looks wrong? `printSummary`. Nothing else could be the cause.

The whole program lives inside functions, and the file ends with a single call, `main();`. This is a very common pattern. It also means the program's working variables (`bill`, `percent`, `people`) are **local to `main`**, not global, so no helper can change them by accident. Budget Buddy is about to get exactly this shape.

::: note Where do the tests go?
While you are building, keep the `check` calls in the same file and run them. Once everything passes, you can delete them, or put `//` in front to turn them off, so they do not print every time someone uses the program. In [Phase 8](#/phase-08-becoming-a-programmer/03-splitting-code-into-files) you will learn to keep code in separate files, and tests usually get a file of their own.
:::

::: try Build the bill splitter
1. Create `phase-4/splitter-tests.js` with the four pure helpers, `check`, and the seven tests. Run it. All seven should pass.
2. Create `phase-4/splitter.js` with the full program. Run it with `node phase-4/splitter.js` and try the sample answers above, including `ten` and `0`.
3. **Change it, predict, run.** The friends decide to round each share up to the next **R5**, not the next rand, so nobody has to find coins. Which **one** function do you change? (Hint: `Math.ceil(total / people / 5) * 5`.) Predict what 840, 10% and 4 people now give each person, then run it. Your old `shareFor` tests will now fail, and that is correct, because the rule changed: update their expected values to `235` and `35`.
:::

::: exercise Level 1 — Guided · Pure or not?
For each function, decide: **pure** or **not pure**? If not, say which rule it breaks (it prints, it asks, it changes something outside, or it can give different answers for the same input). Write your answers as comments in `phase-4/pure-or-not.js`. This one is for reading and thinking, so you do not need to run the code.

```js
// 1
const double = (n) => n * 2;

// 2
function greet(name) {
  console.log(`Hi ${name}`);
}

// 3
function askAge() {
  return Number(prompt("Age? "));
}

// 4
const isWeekend = (day) => day === "Saturday" || day === "Sunday";

// 5
let ticket = 0;
function nextTicket() {
  ticket++;
  return ticket;
}

// 6
const randomPin = () => Math.floor(Math.random() * 10000);

// 7
function fullName(first, last) {
  const name = `${first} ${last}`;
  return name.trim();
}

// 8
function formatMoney(amount) {
  return `R${amount.toFixed(2)}`;
}
```
:::

::: solution
1. **Pure.** Same number in, same number out, nothing else happens.
2. **Not pure.** It prints (a side effect), and it returns nothing useful (`undefined`).
3. **Not pure.** It asks the user, so the answer depends on what they type.
4. **Pure.** A yes/no answer that depends only on its input.
5. **Not pure.** It changes `ticket`, a variable outside itself, and gives a different answer each call (1, then 2, then 3...), though it has no input at all.
6. **Not pure.** `Math.random()` gives a different answer every time.
7. **Pure.** It uses a local variable, which is fine. Nothing outside is touched.
8. **Pure.** This is why `formatMoney` is so easy to test.

A quick way to check: could you write `check(theFunction(someInput), expectedAnswer)` and be sure it passes every time? If yes, it is probably pure.
:::

::: exercise Level 2 — On your own · Braai planner
Tshepo is hosting a braai. Build a planner in `phase-4/braai.js`, designed with functions. The rules:

- Each guest eats **0.3 kg** of meat. Meat costs **R120 per kg**.
- Each guest gets **2 rolls**. Rolls come in **packs of 6** (you cannot buy half a pack), costing **R25 a pack**.

Requirements:

1. Plan the steps in comments first.
2. Write **pure** helpers: `meatKg(guests)`, `rollsNeeded(guests)`, `packsOfRolls(rolls)`, `braaiCost(guests)` and `formatMoney(amount)`.
3. Test them with `check`. For 10 guests: 3 kg of meat, 20 rolls, 4 packs, and a cost of R460. Also test `packsOfRolls(18)`, which should be exactly 3.
4. Write `askForGuests()` (keep asking until the answer is a number of 1 or more) and `printShoppingList(guests)`.
5. A `main()` function calls them, and the file ends with `main();`.

For 7 guests, the output should end with:
```text
Shopping list for 7 guests:
  Meat:  2.1 kg
  Rolls: 14 (3 packs of 6)
  Cost:  R327.00
```
:::

::: hint
Rounding **up** to whole packs is `Math.ceil(rolls / 6)`. `braaiCost` should *use* the other helpers, not repeat their maths: meat cost is `meatKg(guests) * 120`, and rolls cost is `packsOfRolls(rollsNeeded(guests)) * 25`. Consider giving the prices names, like `const MEAT_PRICE_PER_KG = 120;` at the top: a global `const` is fine.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const MEAT_PRICE_PER_KG = 120;
const ROLLS_PACK_PRICE = 25;

// ---------- pure helpers ----------
const meatKg = (guests) => guests * 0.3;
const rollsNeeded = (guests) => guests * 2;
const packsOfRolls = (rolls) => Math.ceil(rolls / 6);
const formatMoney = (amount) => `R${amount.toFixed(2)}`;

function braaiCost(guests) {
  const meatCost = meatKg(guests) * MEAT_PRICE_PER_KG;
  const rollsCost = packsOfRolls(rollsNeeded(guests)) * ROLLS_PACK_PRICE;
  return meatCost + rollsCost;
}

// ---------- tests (delete or comment out when you are happy) ----------
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

check(meatKg(10), 3);
check(packsOfRolls(20), 4);
check(braaiCost(10), 460);

// ---------- input and output ----------
function askForGuests() {
  let guests = Number(prompt("How many guests? "));
  while (Number.isNaN(guests) || guests < 1) {
    console.log("  Please enter a whole number of 1 or more.");
    guests = Number(prompt("How many guests? "));
  }
  return guests;
}

function printShoppingList(guests) {
  const rolls = rollsNeeded(guests);
  console.log("");
  console.log(`Shopping list for ${guests} guests:`);
  console.log(`  Meat:  ${meatKg(guests).toFixed(1)} kg`);
  console.log(`  Rolls: ${rolls} (${packsOfRolls(rolls)} packs of 6)`);
  console.log(`  Cost:  ${formatMoney(braaiCost(guests))}`);
}

function main() {
  console.log("=== Braai Planner ===");
  const guests = askForGuests();
  printShoppingList(guests);
}

main();
```
A sample session:
```text
PASS: 3
PASS: 4
PASS: 460
=== Braai Planner ===
How many guests? 7

Shopping list for 7 guests:
  Meat:  2.1 kg
  Rolls: 14 (3 packs of 6)
  Cost:  R327.00
```
(`check(rollsNeeded(10), 20)` and `check(packsOfRolls(18), 3)` pass too. Add them if you like.) If the price of meat changes, one line changes. If Tshepo decides each guest gets 3 rolls, one line changes, and the tests tell you straight away whether everything still adds up.
:::

::: debug The tests say FAIL
Someone wrote these three helpers and some tests. Run the program, read the `FAIL` lines, and fix **the functions** (not the tests: the expected values are correct).

```js
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

const celsiusToFahrenheit = (celsius) => (celsius + 32) * 9 / 5;
const shareFor = (total, people) => Math.floor(total / people);
const isValidPin = (pin) => pin.length <= 4;

check(celsiusToFahrenheit(0), 32);
check(celsiusToFahrenheit(100), 212);
check(shareFor(924, 4), 231);
check(shareFor(100, 3), 34);
check(isValidPin("1234"), true);
check(isValidPin("123"), false);
```
:::

::: solution
The output before fixing:
```text
FAIL: expected 32 but got 57.6
FAIL: expected 212 but got 237.6
PASS: 231
FAIL: expected 34 but got 33
PASS: true
FAIL: expected false but got true
```
- **`celsiusToFahrenheit`:** the brackets are in the wrong place, so it adds 32 *before* multiplying. It should be `celsius * 9 / 5 + 32`.
- **`shareFor`:** `Math.floor` rounds *down*, so the group would be short. It should be `Math.ceil`. Notice that the first test, `shareFor(924, 4)`, passed: 924 divides exactly, so rounding never happened. Only the test with a remainder caught the bug. That is why you test more than one case.
- **`isValidPin`:** `<= 4` lets a 3-digit PIN through. It should be `pin.length === 4`. Again, the "normal" test passed, and only the boundary test caught it.

After the fixes, all six print `PASS`.
:::

::: mistake
**Functions that do several jobs.** If you need "and" to describe it, split it. `calculateAndPrintTip` should be `tipAmount` plus a line of printing somewhere else.

**Printing inside a calculation.** A function that works something out should return it. Leave `console.log` to the edge of the program.

**Only testing values in the middle.** Test the boundaries: exactly 50, 49 and 51, zero, one person, a number that does not divide evenly.

**Changing a test to make it pass.** If a test fails, first ask whether the *function* is wrong. Only change the expected value if the rules really changed.

**Comparing decimals directly.** `check(0.1 + 0.2, 0.3)` fails. Test formatted money, or choose whole-number test values.
:::

::: quiz
Each share is rounded **up** to the next whole rand. What does this print?

```js
const shareFor = (total, people) => Math.ceil(total / people);

function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

check(shareFor(90, 4), 23);
check(shareFor(90, 3), 30);
check(shareFor(91, 3), 30);
```

- [ ] `PASS: 23`, `PASS: 30`, `PASS: 30`
- [ ] `FAIL: expected 23 but got 22.5`, `PASS: 30`, `PASS: 30`
- [ ] `FAIL: expected 23 but got 22`, `PASS: 30`, `PASS: 30`
- [x] `PASS: 23`, `PASS: 30`, `FAIL: expected 30 but got 31`

90 ÷ 4 is 22.5, rounded up to 23: pass. 90 ÷ 3 is exactly 30: pass. 91 ÷ 3 is 30.33…, and rounding **up** gives 31, so the last test fails. Here the function is right and the *test* is wrong: whoever wrote it rounded down in their head. A `FAIL` means "these two disagree", so check both sides. If you picked `22.5`, you forgot that `Math.ceil` runs before the value is returned.
:::

## Real-world uses

This way of working is how professional software is built:

- **Banks and shops** keep their money calculations in small pure functions (VAT, interest, discounts) with hundreds of tests each. A rounding bug that costs one cent per sale would cost millions.
- **Automated tests** run every time a programmer saves their work. Teams at large companies run thousands of tests, many times a day. Each one is a fancier version of your `check`.
- **`main` functions** are everywhere. In languages like C, C# and Java, every program *must* start from a function called `main`. You have just used the same idea in JavaScript.
- **Designing before coding**, by listing the steps in plain words and naming the functions, is what programmers do on whiteboards before writing a line of code.

::: connect
**This builds on:** every lesson in this phase: functions with one job ([Why functions](#/phase-04-functions/01-why-functions)), parameters and `return` to pass values between them, [scope](#/phase-04-functions/04-scope) to keep variables local to `main`, and [arrow functions](#/phase-04-functions/05-arrow-functions) for short helpers. The "ask until valid" loop comes from [Phase 3](#/phase-03-loops/02-while-loops).

**This unlocks:** the next lesson, where you give Budget Buddy exactly this shape: `formatMoney`, `askForAmount`, `showMenu`, `statusFor`, `printSummary` and a `main`. In [Phase 5](#/phase-05-arrays/04-array-algorithms-by-hand) you will use your `check` helper again to test functions that work on whole lists.
:::

::: challenge A report card
Create `phase-4/report.js`. A teacher wants to enter a learner's marks and get a report.

- Pure helpers: `gradeFor(mark)` (A 80+, B 70+, C 60+, D 50+, otherwise F), `isPass(mark)` (50 or more), `isValidMark(mark)` (a number from 0 to 100) and `average(total, count)` (which returns 0 if `count` is 0, instead of dividing by zero).
- Test every helper with `check`, including boundary values like 50, 49, 100, 101 and `Number("abc")`.
- `askForMark(subject)` keeps asking until `isValidMark` is true.
- `main` asks for the learner's name and how many subjects, then uses a `for` loop to ask for each mark, printing its grade and pass/fail, and finally prints the average (one decimal place) and its grade.
:::

::: hint
In `main`, use the accumulator pattern: `let total = 0;` before the loop, and `total += mark;` inside it. The subject label can be built from the loop counter: `` askForMark(`Subject ${i}`) ``. `isValidMark` needs three conditions joined with `&&`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

// ---------- pure helpers ----------
const average = (total, count) => (count > 0 ? total / count : 0);

function gradeFor(mark) {
  if (mark >= 80) {
    return "A";
  }
  if (mark >= 70) {
    return "B";
  }
  if (mark >= 60) {
    return "C";
  }
  if (mark >= 50) {
    return "D";
  }
  return "F";
}

const isPass = (mark) => mark >= 50;

const isValidMark = (mark) => !Number.isNaN(mark) && mark >= 0 && mark <= 100;

// ---------- tests ----------
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

check(average(210, 3), 70);
check(average(0, 0), 0);
check(gradeFor(50), "D");
check(gradeFor(49), "F");
check(isPass(50), true);
check(isValidMark(101), false);
check(isValidMark(Number("abc")), false);

// ---------- input and output ----------
function askForMark(subject) {
  let mark = Number(prompt(`${subject} mark (0-100): `));
  while (!isValidMark(mark)) {
    console.log("  Please enter a mark from 0 to 100.");
    mark = Number(prompt(`${subject} mark (0-100): `));
  }
  return mark;
}

function main() {
  console.log("");
  console.log("=== Report Card ===");
  const name = prompt("Learner's name: ").trim() || "Learner";
  const count = Number(prompt("How many subjects? "));
  let total = 0;
  for (let i = 1; i <= count; i++) {
    const mark = askForMark(`Subject ${i}`);
    const result = isPass(mark) ? "pass" : "fail";
    console.log(`  Grade ${gradeFor(mark)} (${result})`);
    total += mark;
  }
  const avg = average(total, count);
  console.log(`${name}'s average: ${avg.toFixed(1)}%, grade ${gradeFor(avg)}`);
}

main();
```
A sample session:
```text
PASS: 70
PASS: 0
PASS: D
PASS: F
PASS: true
PASS: false
PASS: false

=== Report Card ===
Learner's name: Anele
How many subjects? 3
Subject 1 mark (0-100): 72
  Grade B (pass)
Subject 2 mark (0-100): 105
  Please enter a mark from 0 to 100.
Subject 2 mark (0-100): 48
  Grade F (fail)
Subject 3 mark (0-100): 91
  Grade A (pass)
Anele's average: 70.3%, grade B
```
Notice that `gradeFor` is used for single marks *and* for the average. One well-tested function, two jobs, zero copied code.
:::

::: recap
- **Design first:** list the steps in plain words, then give each step a function with **one job** and a clear name.
- A **pure function** returns the same output for the same input and has no **side effects** (no printing, no prompting, no changing outside variables).
- Keep **input and output at the edges** (a few functions that ask and print) and the thinking in pure functions in the middle.
- A `main` function calls the steps in order, like a head chef. The file ends with `main();`, and the program's variables stay local.
- A **test** compares what a function returns with what you expected. `check(actual, expected)` prints `PASS` or `FAIL`.
- Test **boundary values** (exactly 50, 49, a remainder, zero). That is where bugs hide.
- When a test fails, suspect the function first, not the test.
:::

::: interview What is a pure function, and why is it useful?
A function that always returns the same output for the same input, and does nothing else: no printing, no asking for input, no changing variables outside itself. It is easy to test (call it and compare the answer), easy to trust (it cannot break anything else), and easy to reuse in other programs.
:::

::: interview What does "keep input and output at the edges" mean?
Only a few functions talk to the user (asking with `prompt`, printing with `console.log`), and they sit at the start and end of the program's flow. All the calculating and deciding in between happens in pure functions that take values in and return values out.
:::

::: interview Why should tests include boundary values?
Bugs cluster at the edges between cases, such as a `>` that should be `>=`. A test for a mark of 65 will not notice that 50 is treated wrongly, but a test for exactly 50 will.
:::

::: checkpoint
- [ ] I wrote the `check` helper and used it to find the bug in `gradeFor`
- [ ] I broke a function on purpose and predicted which tests would fail
- [ ] I built and tested the bill splitter, with a `main` function
- [ ] I sorted the eight functions into pure and not pure, with reasons
- [ ] I built the braai planner with pure helpers, tests, and input and output at the edges
- [ ] I fixed the three helpers in "The tests say FAIL" without changing the tests
:::

::: resources
- **Eloquent JavaScript, chapter 3 "Functions":** https://eloquentjavascript.net/03_functions.html. The sections "Growing functions" and "Functions and side effects" match this lesson closely.
- **javascript.info, "Functions":** https://javascript.info/function-basics. The "Naming a function" and "Functions == Comments" sections are all about one job per function.
- **CS50 (Harvard, free):** https://cs50.harvard.edu/x/. If you want to see the same ideas (functions, `main`, testing) in another language, the early lectures are excellent.
:::
