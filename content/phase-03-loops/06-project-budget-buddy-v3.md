---
title: "Project: Budget Buddy v3"
summary: Turn Budget Buddy into a real app with a menu that keeps running, input that is checked until it is right, and a running total, count, biggest and average.
minutes: 60
stage: Phase 3
---

## What you will build

- A **menu loop**: 1) Add an expense, 2) Show summary, 3) Quit. It keeps going until you choose Quit.
- **"Keep asking until valid"** for the income and every expense, instead of quietly using R0.
- As many expenses as you like, not a fixed three, with a **running total**, a **count**, the **biggest expense**, and the **average** when you quit.

**Before this:** [break, continue, nested loops and menus](#/phase-03-loops/05-break-continue-nested). You will use the menu loop pattern from that lesson, "keep asking until valid" from [the while loop](#/phase-03-loops/02-while-loops), and three patterns from [the classic loop patterns](#/phase-03-loops/04-loop-patterns).

## Where we are, and what is wrong with it

Open your `budget-buddy` folder in VS Code and look at `index.js`. It is the program you finished in [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2). It asks for your name and income, then exactly three expenses (rent, food and transport), checks each one, and prints a summary with a status.

It works, but it has three real problems:

1. **Exactly three expenses.** Nobody's month has exactly rent, food and transport. Some people have airtime, school fees, a stokvel, electricity, a gym. The code for "ask for an amount and check it" is copied three times, and adding a fourth expense means copying it a fourth time.
2. **Bad input becomes R0.** If you type `abc` for your rent, the program says "I will use R0" and carries on with a wrong answer. A real app would ask again.
3. **It runs once and stops.** You cannot look at your summary, add something you forgot, and look again.

All three are loop problems, and you now have every tool you need to fix them.

::: analogy From a form to a till
Version 2 is like a paper form with three boxes: Rent, Food, Transport. You fill in the boxes, and that is that. If you have a fourth expense, there is nowhere to write it.

Version 3 is like a till at a shop. It sits there waiting. Each time you scan something, the total goes up and the item count goes up by one. You can ask for a subtotal whenever you like. When you press "Finish", it gives you the final slip. The till does not know in advance how many items are coming, and it does not need to.
:::

## The plan

Before touching any code, plan it in pseudocode, as you learned in [Why loops exist](#/phase-03-loops/01-why-loops):

```text
ask for name
ask for income, and keep asking until it is valid

total, count and biggest start at 0
running is true
while running:
    show the menu
    ask for a choice
    if 1:  ask for an amount (keep asking until valid)
           add it to total, add 1 to count, update biggest
    if 2:  show income, total spent, count, and what is left
    if 3:  running becomes false
    otherwise: "I don't know that option"

work out the average
say goodbye with the count, biggest and average
```

Find the patterns in it: two "keep asking until valid" loops, a menu loop with a `running` flag, an **accumulator** (`total`), a **counter** (`count`) and a **maximum** (`biggest`). Nothing here is new. The skill is putting them together.

::: note Make a copy first
Before you change anything, make a copy of your v2 code, so you can always look back at it. In the terminal, from inside `budget-buddy`:

macOS and Linux:
```bash
cp index.js index-v2.js
```
Windows (PowerShell):
```bash
Copy-Item index.js index-v2.js
```
Keep working in `index.js`. Budget Buddy is built in small steps: **change a little, run it, check it, then move on.** Do not type the whole thing and run it at the end.
:::

## Step 1: keep asking for the income

Find the income code from v2:

```js
let income = Number(prompt("Monthly income: R"));
if (Number.isNaN(income) || income < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  income = 0;
}
```

This is the "check once" version. Turn it into "keep asking until valid". The condition stays exactly the same. What changes:

- `if` becomes `while`.
- Instead of setting `income = 0`, ask the question again.
- The message changes to tell the user what to type.

```js
// Keep asking until the income is a valid number
let income = Number(prompt("Monthly income: R"));
while (Number.isNaN(income) || income < 0) {
  console.log("  Please enter a number of 0 or more.");
  income = Number(prompt("Monthly income: R"));
}
```

Also update the comment at the very top of the file to say which stage this is:

```js
// Budget Buddy — stage 3: keep going until I quit
```

::: project Run it: Step 1
Save, and from inside `budget-buddy` run:

```bash
node index.js
```

Type your name, then try `abc` and `-100` for the income before typing a real amount. The rest of the program is still the old v2 code, so it will then ask for rent, food and transport as before. You should see something like:

```text
=== Budget Buddy ===
What is your name? Zanele
Monthly income: Rabc
  Please enter a number of 0 or more.
Monthly income: R-100
  Please enter a number of 0 or more.
Monthly income: R12000
Rent: R4500
Food: R2000
Transport: R800

Hi Zanele, here is your month:
Income:          R12000.00
Total expenses:  R7300.00
Left over:       R4700.00
Status: HEALTHY. You keep more than 20% of your income.
```
:::

## Step 2: the menu loop skeleton

Now the big change. **Delete everything below the income loop**: the rent, food and transport questions, the totals, the status, the ternary label, the summary and the `switch`. It is fine to feel nervous deleting working code. You have `index-v2.js` as a safety net, and the ideas in it will return: the status message comes back as a function in v4.

In its place, write the menu loop, with **placeholders** for options 1 and 2. A placeholder is a temporary line that says "something goes here later". It lets you check the loop itself works before you fill it in.

```js
let running = true;

while (running) {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) Show summary");
  console.log("3) Quit");
  const choice = prompt("Choose 1, 2 or 3: ").trim();

  if (choice === "1") {
    console.log("  (adding expenses is coming soon)");
  } else if (choice === "2") {
    console.log("  (the summary is coming soon)");
  } else if (choice === "3") {
    running = false;
  } else {
    console.log("  I don't know that option. Please type 1, 2 or 3.");
  }
}

console.log("");
console.log(`Goodbye, ${name}!`);
```

A few decisions to notice:

- **`if` / `else if` instead of `switch`.** In the last lesson you built a menu with `switch`, and that is a perfectly good choice here too. We use an `if` chain because option 1 will soon have quite a few lines in it, including its own loop. The `if` chain also avoids the "which thing does this `break` belong to?" confusion. If you prefer `switch`, use it. Both are correct.
- **`.trim()`** removes stray spaces, so ` 1 ` still counts as `1`.
- **The `else` at the end** catches everything that is not 1, 2 or 3, so no typing mistake can crash the menu or be silently ignored.
- **The empty `console.log("")`** prints a blank line before each menu, so the screen is easier to read.

While you are there, you can tidy the name line from v2 into one line. It does exactly the same thing:

```js
const name = prompt("What is your name? ").trim() || "friend";
```

::: project Run it: Step 2
Run `node index.js`. Choose `1`, then type `9`, then choose `3`. You should see:

```text
=== Budget Buddy ===
What is your name? Zanele
Monthly income: R12000

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
  (adding expenses is coming soon)

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 9
  I don't know that option. Please type 1, 2 or 3.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 3

Goodbye, Zanele!
```

The skeleton is working. The menu repeats, rejects nonsense, and quits cleanly. Everything from here on is filling in the gaps.
:::

::: warn Quit with 3, not Ctrl+C
If you press Ctrl+C at the menu, the program stops with `TypeError: Cannot read properties of null (reading 'trim')`. That is because `prompt-sync` hands back `null` (not text) when you press Ctrl+C at a question, and `null` has no `.trim()`. It does no harm, but it is a crash, not a goodbye. Use option 3.
:::

## Step 3: adding an expense

Adding an expense needs three variables that remember things **across** trips round the menu. That means they must be created **before** the loop. If they were inside it, they would reset to 0 every time the menu appeared. Add them directly above `let running = true;`:

```js
let total = 0;     // accumulator: running total of expenses
let count = 0;     // counter: how many expenses
let biggest = 0;   // maximum: the largest expense so far
let running = true;
```

The comments say which pattern each variable is. `biggest` can safely start at 0, because the amounts are checked and can never be negative. (Remember the starting-value trap from [the loop patterns lesson](#/phase-03-loops/04-loop-patterns): 0 is only safe when the values cannot go below it.)

Now replace the option 1 placeholder. The pieces are: ask for an amount and keep asking until it is valid, then update the three variables, then confirm.

```js
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
```

This is a loop inside a loop: the "keep asking" `while` is inside the menu `while`. That is fine, and it works exactly as you traced in [nested loops](#/phase-03-loops/05-break-continue-nested). The inner loop runs to completion (until the amount is valid), and then the outer loop carries on.

Notice that `amount` is made with `let` *inside* option 1. It is only needed while one expense is being added. The next time the user adds an expense, a fresh `amount` is created.

To check it is working, make the goodbye message show the new variables for now. Replace the goodbye line with:

```js
console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
console.log(`Total: R${total.toFixed(2)}  Biggest: R${biggest.toFixed(2)}`);
```

::: project Run it: Step 3
Run `node index.js`. Add two expenses (try `-50` once, to see it rejected), then quit:

```text
=== Budget Buddy ===
What is your name? Zanele
Monthly income: R12000

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R4500
  Added R4500.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R-50
  Please enter a number of 0 or more.
Amount: R720
  Added R720.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 3

Goodbye, Zanele! You added 2 expense(s).
Total: R5220.00  Biggest: R4500.00
```

Check by hand: 4500 + 720 = 5220, and 4500 is the bigger of the two. **Trace it** if your numbers are different. The most likely bug is that `total`, `count` or `biggest` were created inside the loop.
:::

## Step 4: the summary

Replace the option 2 placeholder. The summary works out what is left and shows it, with the warning from v2 if you have overspent:

```js
  } else if (choice === "2") {
    const left = income - total;
    console.log(`  Income:    R${income.toFixed(2)}`);
    console.log(`  Spent:     R${total.toFixed(2)} across ${count} expense(s)`);
    console.log(`  Left over: R${left.toFixed(2)}`);
    if (left < 0) {
      console.log("  WARNING: you are spending more than you earn!");
    }
  } else if (choice === "3") {
```

Because `total` and `count` live outside the loop, the summary always shows the numbers **so far**. You can add three expenses, check the summary, add two more, and check again. The numbers keep up. That is the "till subtotal" from the analogy.

::: project Run it: Step 4
Run it with a small income so you can see the warning. Here Sam earns R3000:

```text
=== Budget Buddy ===
What is your name? Sam
Monthly income: R3000

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R2500
  Added R2500.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 2
  Income:    R3000.00
  Spent:     R2500.00 across 1 expense(s)
  Left over: R500.00

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R900
  Added R900.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 2
  Income:    R3000.00
  Spent:     R3400.00 across 2 expense(s)
  Left over: R-400.00
  WARNING: you are spending more than you earn!

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 3

Goodbye, Sam! You added 2 expense(s).
Total: R3400.00  Biggest: R2500.00
```
:::

## Step 5: the average, and a proper goodbye

The last piece is the **average** expense. An average is the accumulator divided by the counter: `total / count`.

But there is a trap. What if the user quits without adding anything? Then `count` is 0, and `total / count` is `0 / 0`. Try `console.log(0 / 0)` in a scratch file: it prints `NaN`. Nobody wants "Average: RNaN". So use a ternary (from [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary)) to only divide when there is something to divide by:

```js
const average = count > 0 ? total / count : 0;
```

Read it as: "if there is at least one expense, the average is total divided by count, otherwise it is 0". Now replace the two goodbye lines at the bottom with the final version:

```js
const average = count > 0 ? total / count : 0;
console.log("");
console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
console.log(`Biggest: R${biggest.toFixed(2)}  Average: R${average.toFixed(2)}`);
```

(Keep the single `console.log("");` above the goodbye. If you already have one there from step 2, do not add a second.)

::: project Run it: the full session
Run `node index.js` and try everything: bad income, a bad amount, a summary, a wrong menu choice, and quitting.

```text
=== Budget Buddy ===
What is your name? Zanele
Monthly income: Rabc
  Please enter a number of 0 or more.
Monthly income: R-100
  Please enter a number of 0 or more.
Monthly income: R12000

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R4500
  Added R4500.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: Rlots
  Please enter a number of 0 or more.
Amount: R1850.50
  Added R1850.50.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 2
  Income:    R12000.00
  Spent:     R6350.50 across 2 expense(s)
  Left over: R5649.50

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 5
  I don't know that option. Please type 1, 2 or 3.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 1
Amount: R720
  Added R720.00.

1) Add an expense
2) Show summary
3) Quit
Choose 1, 2 or 3: 3

Goodbye, Zanele! You added 3 expense(s).
Biggest: R4500.00  Average: R2356.83
```

Check the average by hand: 4500 + 1850.50 + 720 = 7070.50, and 7070.50 ÷ 3 = 2356.83 (rounded).

Then run it once more and choose `3` straight away. You should see `You added 0 expense(s).` and `Biggest: R0.00  Average: R0.00`, with no `NaN` anywhere.
:::

## Test it like a tester

A program is not finished when it works for the inputs you had in mind. It is finished when it copes with the inputs you did **not** think of. Work through this list and tick each one off:

- An empty name (press Enter). Does the goodbye say "friend"?
- Income of `0`. Is it accepted? (It should be: 0 is a valid income.)
- An amount of `0`. Accepted? Does it count as an expense?
- A menu choice of ` 2 ` with spaces around it. Does `.trim()` handle it?
- A menu choice of `one`, or nothing at all. Does the `else` catch it?
- Lots of expenses: add ten. Does the summary keep up?
- Quit with no expenses. No `NaN`?

If something surprises you, trace it. That is exactly what trace tables are for.

::: stop Compare with the reference solution
Try to finish all five steps yourself before you open this. When you do, compare it line by line with yours. Your code does not need to match exactly. If yours works, passes the tests above, and you can explain every line, it is correct.
:::

::: solution Full code for Budget Buddy v3 (`index.js`)
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

## What you have built

Look at what the program does now compared with v2, and which idea from this phase made each part possible:

| Feature | The idea that made it possible |
|---|---|
| Income and amounts are checked until they are valid | "Keep asking until valid" with `while` ([lesson 2](#/phase-03-loops/02-while-loops)) |
| As many expenses as you like | The menu loop pattern with a `running` flag ([lesson 5](#/phase-03-loops/05-break-continue-nested)) |
| Running total | The accumulator ([lesson 4](#/phase-03-loops/04-loop-patterns)) |
| Number of expenses | The counter |
| Biggest expense | The maximum |
| Average | Accumulator ÷ counter, with a guard against dividing by 0 |

That is five patterns and two kinds of loop, working together in about 60 lines. This is what real programs look like: small, well-understood pieces, combined.

::: connect
**This builds on:** every lesson in this phase, plus the input checking and `.toFixed(2)` from Phases 1 and 2.

**This unlocks:** the code is getting long, and some parts are repeated. Look at the two "keep asking until valid" loops: they are nearly identical, one for income and one for amounts. In Phase 4, [Why functions exist](#/phase-04-functions/01-why-functions) shows how to write that loop **once**, give it a name like `askForAmount`, and use it in both places. In [Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4) the main loop will read almost like plain English.

There is also one thing v3 cannot do: it adds up your expenses, but it forgets each one as soon as it is added. It cannot list them or remove one. For that, the program needs to remember a whole list of values, which is what [arrays](#/phase-05-arrays/01-what-is-an-array) are for.
:::

::: challenge Make it yours
Pick one or more. Each uses only what you have learned so far.

1. **Smallest expense.** Track the smallest expense as well as the biggest, and show it when you quit. Watch out: starting it at 0 will not work. Why not, and what can you do instead?
2. **Short by.** In the summary, when you have overspent, show `Short by: R400.00` instead of `Left over: R-400.00`, like v2 did.
3. **A spending limit.** After each expense, if the total has gone over 80% of the income, print a gentle warning, but only the **first** time it happens. (Hint: a flag.)
4. **Confirm quitting.** When the user chooses 3, ask `Are you sure? (y/n)`, and only quit on `y`.
:::

::: solution
Here are the key parts. Each one fits into the reference code above.

**1. Smallest expense.** `smallest` cannot start at 0, because no expense amount would ever be smaller than 0, so it would stay 0 forever. Use the "first value wins" trick with the counter. Before the loop add `let smallest = 0;`, and in option 1, **after** `count++`:

```js
    if (count === 1 || amount < smallest) {
      smallest = amount;
    }
```

`count === 1` is true only for the very first expense, which always becomes the starting "smallest". Starting `smallest` at 0 is now harmless, because it is replaced by the first expense, and if there are no expenses, R0.00 is a sensible thing to show.

**2. Short by.** In option 2, replace the `Left over` line with:

```js
    if (left < 0) {
      console.log(`  Short by:  R${(0 - left).toFixed(2)}`);
      console.log("  WARNING: you are spending more than you earn!");
    } else {
      console.log(`  Left over: R${left.toFixed(2)}`);
    }
```

**3. A spending limit.** Before the loop add `let warned = false;`. In option 1, after updating `total`:

```js
    if (!warned && total > income * 0.8) {
      console.log("  Heads up: you have spent more than 80% of your income.");
      warned = true;
    }
```

**4. Confirm quitting.** Replace the body of option 3 with:

```js
    const sure = prompt("Are you sure? (y/n) ").trim().toLowerCase();
    if (sure === "y") {
      running = false;
    }
```
:::

::: recap
- Budget Buddy v3 replaces a fixed list of three expenses with a **menu loop** that runs until the user chooses Quit.
- Every amount is checked with **"keep asking until valid"**, so the rest of the program can trust it.
- Variables that must remember things between trips round the menu (`total`, `count`, `biggest`) are created **before** the loop.
- The accumulator, counter and maximum patterns keep the statistics up to date as each expense is added.
- An average is total ÷ count, and you must guard against dividing by 0.
- Build in small steps: a skeleton with placeholders first, then fill in one option at a time, running it after each step.
:::

::: interview Why are `total`, `count` and `biggest` declared before the menu loop and not inside it?
Because they must keep their values from one trip round the menu to the next. Inside the loop they would be recreated as 0 every time the menu appeared, so the totals would never build up.
:::

::: interview What would happen if the user quit straight away and the average was worked out as `total / count`?
`count` would be 0, so it would be `0 / 0`, which is `NaN`, and the program would print `Average: RNaN`. The ternary `count > 0 ? total / count : 0` avoids dividing by zero.
:::

::: interview Which loop patterns does Budget Buddy v3 use?
A menu loop with a `running` flag, two "keep asking until valid" loops, an accumulator for the total, a counter for the number of expenses, and a maximum for the biggest expense.
:::

::: checkpoint
- [ ] I made a copy of my v2 code before changing anything
- [ ] The income question keeps asking until the answer is valid
- [ ] My menu loop repeats, rejects unknown choices, and quits on 3
- [ ] I can add as many expenses as I like, and bad amounts are asked again
- [ ] The summary shows the income, total spent, number of expenses and what is left, with a warning when overspent
- [ ] Quitting shows the count, biggest and average, with no `NaN` when there are no expenses
- [ ] I worked through the "test it like a tester" list
:::

::: resources
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. A good read-through now that you have used every kind of loop in a real program.
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. Their JavaScript basics section has more loop practice problems if you want extra repetitions.
- **freeCodeCamp:** https://www.freecodecamp.org/learn. The JavaScript course has many small loop exercises that check your answers for you.
:::
