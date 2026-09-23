---
title: Project — Budget Buddy v4
summary: Tidy Budget Buddy into small, named functions without changing what it does, then make one deliberate improvement.
minutes: 75
stage: Phase 4
---

## What you will build

Budget Buddy v3 works: a menu, a running total, a count, the biggest expense and an average. But it is one long list of instructions, and the same "keep asking until valid" loop appears twice. In this project you will:

- **Refactor** Budget Buddy into small functions: `formatMoney`, `isValidAmount`, `askForAmount`, `showMenu`, `printSummary` and `main`
- Use **arrow functions** for the two short helpers
- **Prove** the program behaves exactly the same after every step, by running the same inputs before and after
- Then, as a separate step, bring back the **status** message from v2 with a tested `statusFor` function

When you finish, the main loop will read almost like plain English.

**Before this:** [Designing programs with functions](#/phase-04-functions/06-designing-with-functions). You need your finished `~/budget-buddy/index.js` from [Budget Buddy v3](#/phase-03-loops/06-project-budget-buddy-v3). If yours is missing or broken, copy the stage 3 code from the collapsed box below into `index.js` and start from there.

::: solution Starting point: Budget Buddy v3
```js
// Budget Buddy — stage 3: keep going until I quit
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");
const name = prompt("What is your name? ").trim() || "friend";

// Keep asking until the income is a valid number
let income = Number(prompt("Monthly income: R"));
while (Number.isNaN(income) || income < 0) {
  console.log("  Please enter a number of 0 or more.");
  income = Number(prompt("Monthly income: R"));
}

let total = 0;     // accumulator: running total of expenses
let count = 0;     // counter: how many expenses
let biggest = 0;   // maximum: the largest expense so far
let running = true;

while (running) {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) Show summary");
  console.log("3) Quit");
  const choice = prompt("Choose 1, 2 or 3: ").trim();

  if (choice === "1") {
    let amount = Number(prompt("Amount: R"));
    while (Number.isNaN(amount) || amount < 0) {
      console.log("  Please enter a number of 0 or more.");
      amount = Number(prompt("Amount: R"));
    }
    total += amount;
    count++;
    if (amount > biggest) {
      biggest = amount;
    }
    console.log(`  Added R${amount.toFixed(2)}.`);
  } else if (choice === "2") {
    const left = income - total;
    console.log(`  Income:    R${income.toFixed(2)}`);
    console.log(`  Spent:     R${total.toFixed(2)} across ${count} expense(s)`);
    console.log(`  Left over: R${left.toFixed(2)}`);
    if (left < 0) {
      console.log("  WARNING: you are spending more than you earn!");
    }
  } else if (choice === "3") {
    running = false;
  } else {
    console.log("  I don't know that option. Please type 1, 2 or 3.");
  }
}

const average = count > 0 ? total / count : 0;
console.log("");
console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
console.log(`Biggest: R${biggest.toFixed(2)}  Average: R${average.toFixed(2)}`);
```
:::

## What "refactoring" means

**Refactoring** means changing the *structure* of code without changing its *behaviour*. The program does exactly the same thing for the user, but the code inside is tidier, clearer and easier to change.

::: analogy Reorganising a kitchen
Imagine reorganising a messy kitchen: you put all the spices on one shelf, hang the pots on hooks, and label the containers. When you are done, the kitchen makes **exactly the same meals** as before. Nobody eating dinner can tell anything changed. But the next time you cook, everything is quicker to find, and when you want to add a new dish, there is an obvious place for its ingredients.

The golden rule of reorganising is: **do not change the recipes at the same time.** If dinner tastes different afterwards, you want to know whether it was the reorganising or the new recipe. So you reorganise first, taste to make sure nothing changed, and only then try the new recipe.
:::

That golden rule is exactly how programmers refactor:

1. **Change the structure in small steps.** One function at a time.
2. **After every step, run the program with the same inputs and compare the output.** If anything is different, the last small step caused it, so it is easy to find.
3. **Only change behaviour in a separate step,** after the refactor is finished and checked.

You will follow those three rules below.

## Before you start: record how v3 behaves

To prove that nothing changes, you need to know what "the same" looks like. You will use two **test runs**: fixed lists of answers that you type in exactly, every time.

::: project Step 0 — Back up v3 and record two test runs
1. Open a terminal and go into your project folder:
   ```bash
   cd ~/budget-buddy
   ```
2. Make a backup copy of v3, so you can always compare against it.

   On macOS or Linux:
   ```bash
   cp index.js index-v3.js
   ```
   On Windows (PowerShell):
   ```bash
   Copy-Item index.js index-v3.js
   ```
3. Run v3 with `node index.js` and type **Test run A** exactly. Each answer is followed by Enter:

   | Question | Type |
   |---|---|
   | What is your name? | `Aisha` |
   | Monthly income | `abc` (on purpose: it should be rejected) |
   | Monthly income | `12000` |
   | Choose | `1` |
   | Amount | `-50` (on purpose: rejected) |
   | Amount | `3500` |
   | Choose | `2` |
   | Choose | `7` (on purpose: unknown option) |
   | Choose | `3` |

   You should see:
   ```text
   === Budget Buddy ===
   What is your name? Aisha
   Monthly income: Rabc
     Please enter a number of 0 or more.
   Monthly income: R12000

   1) Add an expense
   2) Show summary
   3) Quit
   Choose 1, 2 or 3: 1
   Amount: R-50
     Please enter a number of 0 or more.
   Amount: R3500
     Added R3500.00.

   1) Add an expense
   2) Show summary
   3) Quit
   Choose 1, 2 or 3: 2
     Income:    R12000.00
     Spent:     R3500.00 across 1 expense(s)
     Left over: R8500.00

   1) Add an expense
   2) Show summary
   3) Quit
   Choose 1, 2 or 3: 7
     I don't know that option. Please type 1, 2 or 3.

   1) Add an expense
   2) Show summary
   3) Quit
   Choose 1, 2 or 3: 3

   Goodbye, Aisha! You added 1 expense(s).
   Biggest: R3500.00  Average: R3500.00
   ```
4. Run it again and type **Test run B**, which overspends: press **Enter** for the name (no name), then `1000`, `1`, `800`, `1`, `400`, `2`, `3`. The summary part should say:
   ```text
     Income:    R1000.00
     Spent:     R1200.00 across 2 expense(s)
     Left over: R-200.00
     WARNING: you are spending more than you earn!
   ```
   and the last lines:
   ```text
   Goodbye, friend! You added 2 expense(s).
   Biggest: R800.00  Average: R600.00
   ```
5. Write both test runs on a piece of paper or in a text file (for example `test-runs.txt` in the same folder). You will type them again after every step.
:::

::: note Why not skip the test runs?
It is tempting. Please do not. Refactoring feels safe, because "I am only moving code around". That feeling is exactly how bugs sneak in: a missing space, a `>=` that became `>`, a line left behind. The test runs take a minute and catch those instantly. (In a later course you will learn tools that type the inputs for you. The idea is the same.)
:::

## Step 1: `formatMoney`

The program writes `R${something.toFixed(2)}` six times. That is the same job, copied, so it becomes a function. It is a short helper that returns one value, so it suits an arrow function.

::: project Step 1 — Add formatMoney and use it everywhere
1. Directly below the `require` line, add:
   ```js
   // ---------- small helpers ----------

   const formatMoney = (amount) => `R${amount.toFixed(2)}`;
   ```
2. Now find every place that writes `R${...toFixed(2)}` and swap it for a call. For example:
   ```js
   console.log(`  Added R${amount.toFixed(2)}.`);
   ```
   becomes
   ```js
   console.log(`  Added ${formatMoney(amount)}.`);
   ```
   Careful: the `R` moves **into** the function, so delete it from the template literal too. Otherwise you get `RR3500.00`.
3. Do the same for `income`, `total` and `left` in the summary, and `biggest` and `average` at the end. When you are done, searching the file for `toFixed` should find it **only once**, inside `formatMoney`. (In VS Code, **Ctrl+F** on Windows and Linux, or **Cmd+F** on macOS, opens search.)
4. Save, run `node index.js`, and type **Test run A** and **Test run B**. The output must match Step 0 exactly, character for character.
:::

If you see `RR` anywhere, you left an `R` in front of a `${formatMoney(...)}`. If you see `ReferenceError: Cannot access 'formatMoney' before initialization`, your `const formatMoney` line is below the code that uses it. Arrow functions must be defined first, as you learned in [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions).

::: try Test formatMoney on its own
A pure helper can be tested without running the whole app. In your **practice** folder (not in Budget Buddy), create `~/coding-practice/phase-4/budget-tests.js`:

```js
const formatMoney = (amount) => `R${amount.toFixed(2)}`;

function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

check(formatMoney(3500), "R3500.00");
check(formatMoney(899.9), "R899.90");
check(formatMoney(-200), "R-200.00");
```

Run it from inside `coding-practice` with `node phase-4/budget-tests.js`. You should see three `PASS` lines. You will add more tests to this file as you go.
:::

## Step 2: `isValidAmount` and `askForAmount`

Look at these two pieces of v3:

```js
let income = Number(prompt("Monthly income: R"));
while (Number.isNaN(income) || income < 0) {
  console.log("  Please enter a number of 0 or more.");
  income = Number(prompt("Monthly income: R"));
}
```

```js
let amount = Number(prompt("Amount: R"));
while (Number.isNaN(amount) || amount < 0) {
  console.log("  Please enter a number of 0 or more.");
  amount = Number(prompt("Amount: R"));
}
```

They are the same loop. The only difference is the question. A difference like that becomes a **parameter**.

We will make two functions:

- `isValidAmount(amount)`: a pure yes/no helper that answers "is this a number of 0 or more?". A one-line arrow.
- `askForAmount(question)`: asks the question, keeps asking until the answer is valid, and **returns** it. It uses `prompt` and `console.log`, so it is not pure. It belongs at the edge.

::: project Step 2 — One validation loop instead of two
1. Under `formatMoney`, add:
   ```js
   const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

   // Keep asking until we get a valid amount, then hand it back
   function askForAmount(question) {
     let amount = Number(prompt(question));
     while (!isValidAmount(amount)) {
       console.log("  Please enter a number of 0 or more.");
       amount = Number(prompt(question));
     }
     return amount;
   }
   ```
   Notice the loop condition flipped. v3 said "keep going while it is **not a number or negative**". Now it says "keep going while it is **not valid**": `!isValidAmount(amount)`. Same meaning, and much easier to read.
2. Replace the whole five-line income block (and its comment) with one line:
   ```js
   const income = askForAmount("Monthly income: R");
   ```
   It can be `const` now, because `income` gets its value once and never changes.
3. Inside the `if (choice === "1")` branch, replace the five-line amount block with:
   ```js
   const amount = askForAmount("Amount: R");
   ```
4. Save, run, and type both test runs. The `abc` and `-50` answers must still be rejected with the same message.
:::

Add these to your `budget-tests.js` in the practice folder, below the other tests, and run it again:

```js
const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

check(isValidAmount(0), true);
check(isValidAmount(-50), false);
check(isValidAmount(Number("abc")), false);
```

(Put the `const isValidAmount` line at the top of the file, next to `formatMoney`, if you prefer. Either works, as long as it comes before the checks.) You should now see six `PASS` lines. Notice the test for exactly `0`: that is the boundary between valid and invalid.

## Step 3: `showMenu`

The four lines that print the menu are a job with a clear name. They take no input and return nothing: they only print.

::: project Step 3 — Give the menu a name
1. Below `askForAmount`, add:
   ```js
   function showMenu() {
     console.log("");
     console.log("1) Add an expense");
     console.log("2) Show summary");
     console.log("3) Quit");
   }
   ```
2. At the top of the `while (running)` loop, replace those same four `console.log` lines with:
   ```js
   showMenu();
   ```
3. Save, run, and type both test runs. The blank line before each menu must still be there.
:::

We used a declaration here, not an arrow. That follows the rule of thumb from lesson 05: **declarations for the main named steps, arrows for short helpers that return a value.**

## Step 4: `printSummary`

The summary branch works out `left` and prints four lines. It needs three values to do that: `income`, `total` and `count`. Those become its parameters.

::: project Step 4 — Move the summary into a function
1. Below `showMenu`, add:
   ```js
   function printSummary(income, total, count) {
     const left = income - total;
     console.log(`  Income:    ${formatMoney(income)}`);
     console.log(`  Spent:     ${formatMoney(total)} across ${count} expense(s)`);
     console.log(`  Left over: ${formatMoney(left)}`);
     if (left < 0) {
       console.log("  WARNING: you are spending more than you earn!");
     }
   }
   ```
   Yes, the warning is still there. We are refactoring, so the behaviour stays exactly the same for now. It changes in Step 7, on purpose.
2. Replace everything inside the `else if (choice === "2")` branch with one line:
   ```js
   printSummary(income, total, count);
   ```
3. Save, run, and type both test runs. **Test run B** must still show the warning.
:::

Look at the parameter names: `income`, `total`, `count`. They are the same as the variables in the main program. That is common and fine, but remember what [Scope](#/phase-04-functions/04-scope) taught you: inside `printSummary` they are **its own local copies**. The function receives the values, and cannot change the main program's `total` even if it tried.

## Step 5: a small tidy-up with `Math.max`

This part of the "add an expense" branch keeps the biggest expense so far:

```js
if (amount > biggest) {
  biggest = amount;
}
```

You met a built-in function that does exactly this in [Numbers](#/phase-01-storing-information/04-numbers): `Math.max` returns the larger of its arguments.

::: project Step 5 — Replace the if with Math.max
1. Replace those three lines with:
   ```js
   biggest = Math.max(biggest, amount);
   ```
2. Save, run, and type both test runs. In Test run B, `Biggest` must still be `R800.00`.
:::

This is refactoring in miniature: three lines become one, and the behaviour is the same. The `if` version was not wrong. The `Math.max` version says what it means ("biggest is the larger of the two") in fewer words.

## Step 6: wrap the program in `main`

Right now the program's working variables (`name`, `income`, `total`, `count`, `biggest`, `running`) are **global**. Any function in the file could change them by accident. In [Designing programs with functions](#/phase-04-functions/06-designing-with-functions) you saw the fix: put the program itself inside a `main` function, so they become **local** to `main`.

::: project Step 6 — The head chef
1. Put a marker comment and `function main() {` on the line **before** `console.log("=== Budget Buddy ===");`:
   ```js
   // ---------- the program ----------

   function main() {
   ```
2. Put a closing `}` after the very last `console.log` (the one with `Biggest:`), and then, on its own line at the very end of the file, the call:
   ```js
   }

   main();
   ```
3. Select everything between `function main() {` and its closing `}`, and press **Tab** to indent it by one level, so it is clear what is inside `main`.
4. While you are there, you can delete the three end-of-line comments (`// accumulator: ...` and so on) from `total`, `count` and `biggest`. The code now explains itself well enough. And change the first comment of the file to `// Budget Buddy — stage 4: tidy it into functions`.
5. Save, run, and type both test runs one more time. They must match Step 0 exactly.
:::

If you forget the `main();` line at the bottom, the program prints **nothing at all** and ends straight away. You declared the recipe but never cooked it, which is the very first lesson of this phase.

Now read the main loop:

```js
while (running) {
  showMenu();
  const choice = prompt("Choose 1, 2 or 3: ").trim();

  if (choice === "1") {
    const amount = askForAmount("Amount: R");
    total += amount;
    count++;
    biggest = Math.max(biggest, amount);
    console.log(`  Added ${formatMoney(amount)}.`);
  } else if (choice === "2") {
    printSummary(income, total, count);
  } else if (choice === "3") {
    running = false;
  } else {
    console.log("  I don't know that option. Please type 1, 2 or 3.");
  }
}
```

"While running: show the menu, get a choice. If 1, ask for an amount and add it. If 2, print the summary. If 3, stop." It reads almost like the plan you would write on paper. **The refactor is finished**, and because you ran both test runs after every step, you know Budget Buddy behaves exactly as v3 did.

::: stop Stop and compare
You just changed almost every line of the program, and the user would never know. That is a successful refactor. Take a moment to compare your `index.js` with `index-v3.js` side by side. Same behaviour, clearer structure.
:::

## Step 7: now change the behaviour, on purpose

Only now, with the refactor safely done, do we change what the program does.

In [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2), the summary showed a **status**: `healthy` if you keep more than 20% of your income, `tight` if you keep 20% or less, and `overspent` if you spend more than you earn. That feature was lost when v3 was rebuilt around the menu. Let us bring it back, as a function, and let it replace the warning (because `OVERSPENT` says the same thing).

The status only depends on `income` and `left`, and it gives back one word. That is a **pure** function, so we test it first, in the practice folder.

::: project Step 7a — Write and test statusFor
1. Add this to `~/coding-practice/phase-4/budget-tests.js`, above the checks:
   ```js
   function statusFor(income, left) {
     if (left < 0) {
       return "OVERSPENT";
     }
     if (left > income * 0.2) {
       return "HEALTHY";
     }
     return "TIGHT";
   }
   ```
   It uses **early returns** from [Return values](#/phase-04-functions/03-return-values): deal with overspending first, then the healthy case, and whatever is left must be tight.
2. Add tests, including the boundaries. With an income of R1000, 20% is R200, so keeping exactly R200 is *not* more than 20%:
   ```js
   check(statusFor(1000, 500), "HEALTHY");
   check(statusFor(1000, 201), "HEALTHY");
   check(statusFor(1000, 200), "TIGHT");
   check(statusFor(1000, 0), "TIGHT");
   check(statusFor(1000, -1), "OVERSPENT");
   ```
3. Run `node phase-4/budget-tests.js` from inside `coding-practice`. All the checks should print `PASS`, and the last five should be:
   ```text
   PASS: HEALTHY
   PASS: HEALTHY
   PASS: TIGHT
   PASS: TIGHT
   PASS: OVERSPENT
   ```
:::

::: project Step 7b — Use statusFor in Budget Buddy
1. In `~/budget-buddy/index.js`, add the same `statusFor` function between `askForAmount` and `showMenu`.
2. In `printSummary`, replace the three-line `if (left < 0) { ... }` warning with one line:
   ```js
   console.log(`  Status:    ${statusFor(income, left)}`);
   ```
3. Save and run both test runs again. This time the output **should** be different, in exactly one place each:
   - Test run A's summary now ends with `  Status:    HEALTHY`.
   - Test run B's summary now ends with `  Status:    OVERSPENT` instead of the warning.

   Everything else must be the same as before.
:::

That is the whole point of the golden rule. Because the refactor was already checked, you know that these two lines are the **only** differences, and that they come from the change you meant to make.

Test run A's summary now looks like this:

```text
  Income:    R12000.00
  Spent:     R3500.00 across 1 expense(s)
  Left over: R8500.00
  Status:    HEALTHY
```

::: try Try a tight month
Run Budget Buddy once more with your own made-up month: an income of `5000`, and expenses of `2500` and `1600`, then choose `2`. Before you look, predict the status. (What is 20% of 5000? How much is left?) Then try adding one more expense of `1000` and show the summary again. What does it say now?
:::

When you are happy, you can delete `index-v3.js`, or keep it as a souvenir.

## Your finished Budget Buddy v4

Your file does not have to match this one exactly. If yours works, passes both test runs, and you can explain every function, it is correct. Compare them afterwards: the differences are where the learning happens.

::: solution Full solution: Budget Buddy v4
```js
// Budget Buddy — stage 4: tidy it into functions
const prompt = require("prompt-sync")();

// ---------- small helpers ----------

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

// Keep asking until we get a valid amount, then hand it back
function askForAmount(question) {
  let amount = Number(prompt(question));
  while (!isValidAmount(amount)) {
    console.log("  Please enter a number of 0 or more.");
    amount = Number(prompt(question));
  }
  return amount;
}

function statusFor(income, left) {
  if (left < 0) {
    return "OVERSPENT";
  }
  if (left > income * 0.2) {
    return "HEALTHY";
  }
  return "TIGHT";
}

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) Show summary");
  console.log("3) Quit");
}

function printSummary(income, total, count) {
  const left = income - total;
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${count} expense(s)`);
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");
  const name = prompt("What is your name? ").trim() || "friend";
  const income = askForAmount("Monthly income: R");

  let total = 0;
  let count = 0;
  let biggest = 0;
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt("Choose 1, 2 or 3: ").trim();

    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      total += amount;
      count++;
      biggest = Math.max(biggest, amount);
      console.log(`  Added ${formatMoney(amount)}.`);
    } else if (choice === "2") {
      printSummary(income, total, count);
    } else if (choice === "3") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type 1, 2 or 3.");
    }
  }

  const average = count > 0 ? total / count : 0;
  console.log("");
  console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
  console.log(`Biggest: ${formatMoney(biggest)}  Average: ${formatMoney(average)}`);
}

main();
```
:::

Here is the finished shape at a glance:

```text
formatMoney      pure helper (arrow)    number  -> "R12.50"
isValidAmount    pure helper (arrow)    number  -> true / false
askForAmount     input edge             question -> a valid number
statusFor        pure helper            income, left -> "HEALTHY" / "TIGHT" / "OVERSPENT"
showMenu         output edge            prints the menu
printSummary     output edge            prints the summary
main             the head chef          calls everything, owns the variables
```

::: mistake
**Changing behaviour while refactoring.** Do the tidy-up first and check it. Add features after. Mixing them makes every bug twice as hard to find.

**Skipping the test runs "because it is only a small change".** Small changes cause most refactoring bugs. It takes a minute to check.

**Leaving the `R` in the template literal.** `R${formatMoney(x)}` prints `RR12.00`. The `R` now lives inside `formatMoney`.

**Forgetting `main();` at the bottom.** The program runs and prints nothing.

**Defining an arrow helper below the code that uses it.** Arrow functions in a `const` must come first. Keep all helpers at the top.

**Forgetting to return from `askForAmount`.** Without `return amount;`, `income` becomes `undefined`, and the summary shows `NaN`.
:::

::: connect
**This builds on:** the whole of Phase 4. Named functions and calling them ([01](#/phase-04-functions/01-why-functions)), parameters like `question` ([02](#/phase-04-functions/02-parameters-and-arguments)), return values and early returns ([03](#/phase-04-functions/03-return-values)), local variables in `main` ([04](#/phase-04-functions/04-scope)), arrow helpers ([05](#/phase-04-functions/05-arrow-functions)), and pure functions tested with `check` ([06](#/phase-04-functions/06-designing-with-functions)).

**This unlocks:** a program you can grow without getting lost. Budget Buddy only remembers the total, not each expense. In [Phase 5](#/phase-05-arrays/01-what-is-an-array) you will store every amount in a list, so you can show them all, remove one, and work out totals with loops. Thanks to this refactor, those new features each get their own function and slot neatly into `main`.
:::

::: challenge Make it yours
Try one or more of these. Each one is a *behaviour change*, so make sure your v4 passes both test runs first, then change one thing at a time.

1. **A savings percentage.** Add a pure function `percentLeft(income, left)` that returns what percentage of income is left (for example `70.8`). Test it with `check` in `budget-tests.js` (what should it return if the income is 0?), then show it in `printSummary` as `Saved: 70.8% of income`.
2. **A friendlier goodbye.** Move the three goodbye lines at the end of `main` into a function `printGoodbye(name, total, count, biggest)`. That one is a refactor: the output must not change.
3. **A fourth menu option** `4) Reset`, which sets the total, count and biggest back to 0 after asking `Are you sure? (y/n)`. Which function(s) need to change? Where do the variables live, and why does that decide where the reset code must go?
:::

::: solution
Possible solutions. Yours may differ.

**1.** The pure helper, with an early return so an income of 0 does not divide by zero:
```js
function percentLeft(income, left) {
  if (income === 0) {
    return 0;
  }
  return (left / income) * 100;
}
```
Tests: `check(percentLeft(1000, 250), 25);`, `check(percentLeft(0, 0), 0);`, `check(percentLeft(1000, -200), -20);`. Then add this line in `printSummary`:
```js
console.log(`  Saved:     ${percentLeft(income, left).toFixed(1)}% of income`);
```
For Test run A it prints `  Saved:     70.8% of income`.

**2.**
```js
function printGoodbye(name, total, count, biggest) {
  const average = count > 0 ? total / count : 0;
  console.log("");
  console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
  console.log(`Biggest: ${formatMoney(biggest)}  Average: ${formatMoney(average)}`);
}
```
and at the end of `main`, replace those lines with `printGoodbye(name, total, count, biggest);`. Both test runs should be identical to before.

**3.** `showMenu` needs a new line, `console.log("4) Reset");`, and the prompt text should become `Choose 1, 2, 3 or 4: `. The reset itself must go **inside `main`**, as a new `else if (choice === "4")` branch, because `total`, `count` and `biggest` are local to `main`. A separate function could not change them (it would only get copies of their values). For example:
```js
} else if (choice === "4") {
  const sure = prompt("Are you sure? (y/n) ").trim().toLowerCase();
  if (sure === "y") {
    total = 0;
    count = 0;
    biggest = 0;
    console.log("  Everything has been reset.");
  }
}
```
Remember to update the "I don't know that option" message too. (A tidier way to let a function reset several values at once needs *objects*, which arrive in [Phase 6](#/phase-06-objects/01-what-is-an-object).)
:::

::: recap
- **Refactoring** changes the structure of code without changing its behaviour.
- Refactor in **small steps**, and after each one, run the **same test inputs** and compare the output with the original.
- Change behaviour only in a **separate step**, after the refactor is checked. Then the only differences you see are the ones you meant.
- Copied code became functions: six `toFixed` calls became `formatMoney`, and two validation loops became `askForAmount`.
- Short helpers that return a value (`formatMoney`, `isValidAmount`) are arrow functions. Main steps (`askForAmount`, `showMenu`, `printSummary`, `main`) are declarations.
- Wrapping the program in `main` made its variables local, so no helper can change them by accident.
- A new pure function, `statusFor`, was tested on its own with `check` before it went into the app.
:::

::: interview What is refactoring, and how do you know you did it correctly?
Refactoring is changing how code is organised without changing what it does. You check it by running the same inputs before and after each small change and confirming the output is identical. If anything differs, the last small change caused it.
:::

::: interview Why should you avoid adding a feature in the middle of a refactor?
Because if the output changes, you cannot tell whether it was the refactor (a mistake) or the feature (intended). Doing them separately means the refactor's test runs must match exactly, and the feature's changes are the only differences afterwards.
:::

::: interview Why did `total`, `count` and `biggest` end up inside `main` rather than at the top of the file?
So that they are local to `main`. Only `main` can change them. Helper functions receive their values as parameters and hand back results, and cannot change them by accident. This makes bugs much easier to track down.
:::

::: checkpoint
- [ ] I backed up v3 and recorded Test run A and Test run B
- [ ] I added `formatMoney` and `toFixed` now appears only once in my file
- [ ] I replaced both validation loops with `askForAmount`
- [ ] I added `showMenu` and `printSummary`, and wrapped the program in `main`
- [ ] Both test runs matched v3 exactly after every refactoring step
- [ ] I tested `statusFor` with `check`, including the boundary at exactly 20%
- [ ] Budget Buddy v4 shows a status line, and it is the only change from v3
:::

::: resources
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `statusFor` and a few calls, and step through the early returns.
- **Eloquent JavaScript, chapter 3 "Functions":** https://eloquentjavascript.net/03_functions.html. The "Growing functions" section is a good read after this project.
- **The Odin Project Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. The JavaScript Basics section includes more practice with functions and "clean code".
:::
