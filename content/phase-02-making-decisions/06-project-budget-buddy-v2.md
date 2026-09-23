---
title: "Project: Budget Buddy v2 — warnings and checks"
summary: Budget Buddy learns to react. It rejects nonsense input, warns you when you overspend, and tells you how healthy your month looks.
minutes: 60
stage: Phase 2
---

## What you will build

In Phase 1 you built a Budget Buddy that asks for your income and three expenses, and prints a summary. It does the maths perfectly, but it never *notices* anything. Type `abc` as your income and it prints `RNaN`. Spend more than you earn and it calmly prints a negative number.

By the end of this lesson, Budget Buddy will:

- Use `"friend"` if you do not type a name
- **Reject amounts that are not numbers or are negative**, with a message, and use R0 instead
- Show **"Left over"** or **"Short by"**, whichever fits
- **Warn you** when your expenses are more than your income
- Give your month a **status**: *healthy* (more than 20% left), *tight*, or *overspent*, each with its own message

You will use every idea from this phase: comparisons, `if / else if / else`, `||`, a truthy default, a ternary and a `switch`.

**Before this:** [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary), and your finished [Budget Buddy v1](#/phase-01-storing-information/09-project-budget-buddy-v1).

## Where you are starting from

Open your `budget-buddy` folder in VS Code and look at `index.js`. It should look much like this (small differences in wording are fine):

```js
// Budget Buddy — stage 1: ask and calculate
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");

// 1. Ask the questions (prompt always gives back text, so convert amounts to numbers)
const name = prompt("What is your name? ");
const income = Number(prompt("Monthly income: R"));
const rent = Number(prompt("Rent: R"));
const food = Number(prompt("Food: R"));
const transport = Number(prompt("Transport: R"));

// 2. Do the maths
const totalExpenses = rent + food + transport;
const left = income - totalExpenses;
const percentLeft = (left / income) * 100;
const perDay = Math.floor(left / 30);

// 3. Show the results
console.log("");
console.log(`Hi ${name}, here is your month:`);
console.log(`Income:          R${income.toFixed(2)}`);
console.log(`Total expenses:  R${totalExpenses.toFixed(2)}`);
console.log(`Left over:       R${left.toFixed(2)}`);
console.log(`That is ${percentLeft.toFixed(1)}% of your income, or about R${perDay} a day.`);
```

If your version is different, or you did not finish it, copy this in now, so we start from the same place.

Run it once to make sure it works. In the terminal, from inside the `budget-buddy` folder:

```bash
node index.js
```

(If you set up the `start` script in v1, `npm start` does the same thing.)

Now let's see how it behaves badly. Run it and type `abc` as your income:

```text
=== Budget Buddy ===
What is your name? x
Monthly income: Rabc
Rent: R6500
Food: R3000
Transport: R1800

Hi x, here is your month:
Income:          RNaN
Total expenses:  R11300.00
Left over:       RNaN
That is NaN% of your income, or about RNaN a day.
```

One bad answer, and `NaN` spreads through every calculation that touches it. That is what we are fixing.

::: note Save a copy first
Before changing a working program, it is wise to keep a copy. Make a copy of `index.js` called `index-v1.js` (in VS Code: right-click the file, **Copy**, then right-click the folder, **Paste**, and rename it). If anything goes badly wrong, you can look back at the working version. In [Phase 8](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git) you will learn Git, which does this properly.
:::

## Plan it first

Before typing any code, write the plan in plain words. Add these lines as comments at the **bottom** of `index.js` for now. They are your to-do list, and you will delete each one as you finish it:

```js
// TODO v2:
// - if the name is empty, use "friend"
// - check income: not a number or negative -> message, use 0
// - same check for rent, food and transport
// - work out a status: overspent / healthy / tight
// - say "Short by" instead of "Left over" when the money runs out
// - warn if expenses are more than income
// - print a message for the status (switch)
```

This habit, **planning in plain words before coding**, is how programmers handle anything bigger than a few lines. Each bullet is small enough to do, run and check on its own.

## Step 1: a friendly default name

Start with the smallest change. At the moment, if you press Enter at the name question, it says `Hi , here is your month:`.

From [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy) you know the fix. Find this line:

```js
const name = prompt("What is your name? ");
```

and replace it with these two lines:

```js
// If the user just presses Enter, "" is falsy, so we fall back to "friend"
const name = prompt("What is your name? ").trim() || "friend";
```

`.trim()` turns an answer of only spaces into `""`. `""` is falsy, so `||` gives back `"friend"` instead.

::: try Check step 1
Run `node index.js`, press Enter at the name question, and type `15000`, `6500`, `3000`, `1800` for the amounts. You should see:

```text
=== Budget Buddy ===
What is your name? 
Monthly income: R15000
Rent: R6500
Food: R3000
Transport: R1800

Hi friend, here is your month:
Income:          R15000.00
Total expenses:  R11300.00
Left over:       R3700.00
That is 24.7% of your income, or about R123 a day.
```

Run it again with your own name to make sure that still works.
:::

Delete the first line of your TODO list. One down.

## Step 2: check the income

Here is the rule in words: **if the income is not a number, or it is negative, tell the user and use 0 instead.**

Before you can "use 0 instead", `income` must be allowed to change. Right now it is a `const`. Change `const` to `let` on the income line, then add an `if` straight after it:

```js
let income = Number(prompt("Monthly income: R"));
if (Number.isNaN(income) || income < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  income = 0;
}
```

Take it line by line:

- `let income = ...`: `let`, because the `if` might give it a new value.
- `Number.isNaN(income) || income < 0`: the condition from [and, or, not](#/phase-02-making-decisions/03-combining-conditions). "Not a number, **or** negative." The `isNaN` check is on the left, so it happens first.
- The message starts with two spaces, so it sits indented under the question and looks like a reply to it.
- `income = 0;` replaces the bad value with 0, so the rest of the program always has a real number to work with.

Why 0, and not "ask again"? Asking again means *repeating* the question until the answer is good, and repeating is exactly what loops do. You will learn loops in the next phase. For now, "use 0 and tell the user" is honest and safe.

::: try Check step 2
Run it with a name, then `abc` for income, then `6500`, `3000`, `1800`:

```text
=== Budget Buddy ===
What is your name? Sam
Monthly income: Rabc
  That is not a valid amount, so I will use R0.
Rent: R6500
Food: R3000
Transport: R1800

Hi Sam, here is your month:
Income:          R0.00
Total expenses:  R11300.00
Left over:       R-11300.00
That is -Infinity% of your income, or about R-377 a day.
```

The `NaN`s are gone. Try `-5000` as the income too: same message. Then try a normal income, to check that good answers are left alone.

Two new problems have appeared, though. `-Infinity%` is nonsense, and `R-11300.00` reads badly. Keep them in mind. You will fix both soon.
:::

## Step 3: check the three expenses

Rent, food and transport need exactly the same check. Change each `const` to `let` and add the same `if` after each one, changing only the variable name:

```js
let rent = Number(prompt("Rent: R"));
if (Number.isNaN(rent) || rent < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  rent = 0;
}

let food = Number(prompt("Food: R"));
if (Number.isNaN(food) || food < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  food = 0;
}

let transport = Number(prompt("Transport: R"));
if (Number.isNaN(transport) || transport < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  transport = 0;
}
```

Be careful when you copy and change: every block has the variable name in **four** places. Miss one (for example, check `food` but set `rent = 0`) and you get a bug that is hard to spot.

::: try Check step 3
Run it with `Sam`, `-5`, `6500`, `abc`, `1800`:

```text
=== Budget Buddy ===
What is your name? Sam
Monthly income: R-5
  That is not a valid amount, so I will use R0.
Rent: R6500
Food: Rabc
  That is not a valid amount, so I will use R0.
Transport: R1800

Hi Sam, here is your month:
Income:          R0.00
Total expenses:  R8300.00
Left over:       R-8300.00
That is -Infinity% of your income, or about R-277 a day.
```

Food became 0, so the total expenses are only rent plus transport. Try a bad value in each of the four questions in turn, to make sure all four checks work.
:::

::: why Doesn't this feel repetitive?
It should. You have written the same five lines four times, with one word changed. That is annoying to type, error-prone, and if you ever want to change the message, you have to change it in four places.

Hold on to that feeling. It is exactly the problem the next two phases solve:

- In **Phase 3 ([loops](#/phase-03-loops/01-why-loops))** you will be able to say "keep asking **until** the answer is valid", instead of giving up and using 0.
- In **Phase 4 ([functions](#/phase-04-functions/01-why-functions))** you will write the "ask for an amount and check it" code **once**, give it a name like `askForAmount`, and use it four times in four short lines.

Programmers call this rule **DRY: Don't Repeat Yourself**. For now, repeating is the honest way with the tools you have. Noticing that it hurts is a sign you are starting to think like a programmer.
:::

## Step 4: remove the percentage and per-day lines

That `-Infinity%` comes from this line:

```js
const percentLeft = (left / income) * 100;
```

Now that a bad income becomes 0, this can divide by zero, and in [Numbers](#/phase-01-storing-information/04-numbers) you saw that dividing by zero gives `Infinity`. Rather than print nonsense, we will replace these two statistics with something more useful: a status word that says how healthy the month is.

Delete these two lines from the maths section:

```js
const percentLeft = (left / income) * 100;
const perDay = Math.floor(left / 30);
```

and delete the last line of the results section, the one that starts `` console.log(`That is ``.

(Could you keep the percentage and only print it when `income > 0`? Yes, and that is a fair choice for your own copy. The reference version keeps things short.)

Run it once to make sure nothing is broken. The output ends at the `Left over:` line now.

## Step 5: work out a status

The rule, in words:

- If there is less than nothing left, the month is **overspent**.
- If more than 20% of the income is left, it is **healthy**.
- Otherwise (from R0 up to exactly 20%), it is **tight**.

This is a range question with three outcomes, so it is an `if / else if / else` chain, not a `switch`. Add this after the maths lines (after `const left = ...`), before the results section:

```js
// Work out a status word
let status;
if (left < 0) {
  status = "overspent";
} else if (left > income * 0.2) {
  status = "healthy";
} else {
  status = "tight";
}
```

Some things to notice:

- `let status;` is created **before** the chain and filled inside it, as you learned in [if and else](#/phase-02-making-decisions/02-if-and-else). If you created it inside a block, it would disappear at the `}`.
- `income * 0.2` is 20% of the income. For an income of R15,000 that is R3,000.
- **Order matters.** `left < 0` is checked first. By the time JavaScript asks `left > income * 0.2`, it already knows `left` is not negative.
- "More than 20%" is `>`, not `>=`. Exactly 20% counts as tight. Say it out loud: "*more than* 20% is healthy".

For now, to see it working, add a temporary line at the very end of the file:

```js
console.log(`Status: ${status}`);
```

::: try Check step 5
Run it three times with these amounts (any name):

| Income | Rent | Food | Transport | Expect |
|---|---|---|---|---|
| 15000 | 6500 | 3000 | 1800 | `Status: healthy` (R3,700 left, more than R3,000) |
| 10000 | 6000 | 2500 | 500 | `Status: tight` (R1,000 left, less than R2,000) |
| 9000 | 6000 | 2500 | 1500 | `Status: overspent` (R1,000 short) |

For the last one you should see:

```text
Hi Musa, here is your month:
Income:          R9000.00
Total expenses:  R10000.00
Left over:       R-1000.00
Status: overspent
```

Then test the boundary: income `10000` and expenses adding to `8000` leaves exactly R2,000, which is exactly 20%. Predict the status before you run it.
:::

(It says `tight`, because 2000 is not *more than* 2000.)

## Step 6: "Left over" or "Short by"

`Left over: R-1000.00` is not how a person would say it. A person would say "Short by R1000". The label depends on one condition, and we are choosing between two **values**. That is a job for the ternary operator.

Add this after the status chain:

```js
// Choose a label with the ternary operator
const leftLabel = left >= 0 ? "Left over:" : "Short by: ";
```

Then change the `Left over` line in the results to use it:

```js
console.log(`${leftLabel}       R${Math.abs(left).toFixed(2)}`);
```

Two small details:

- `"Short by: "` has an extra space at the end. `"Left over:"` is 10 characters, and so is `"Short by: "`, so the amounts still line up in a neat column.
- **`Math.abs()`** is a new member of the `Math` family you met in [Numbers](#/phase-01-storing-information/04-numbers). It gives the **absolute value** of a number: its size, without a minus sign. `Math.abs(-1000)` is `1000`, and `Math.abs(1000)` stays `1000`. The label already says "Short by", so the minus sign is no longer needed.

::: try Check step 6
Run it again with `9000`, `6000`, `2500`, `1500`:

```text
Hi Musa, here is your month:
Income:          R9000.00
Total expenses:  R10000.00
Short by:        R1000.00
Status: overspent
```

And with `15000`, `6500`, `3000`, `1800` it should still say `Left over:       R3700.00`.
:::

## Step 7: the overspending warning

A warning should stand out. Add this at the end of the file, **above** the temporary status line:

```js
if (totalExpenses > income) {
  console.log("WARNING: you are spending more than you earn!");
}
```

This is a plain `if` with no `else`. When there is nothing to warn about, it should print nothing at all.

(You might notice that `totalExpenses > income` is true exactly when `left < 0`. Either condition works. Using `totalExpenses > income` makes the line read like the warning it prints.)

::: try Check step 7
With `9000`, `6000`, `2500`, `1500` you should now see:

```text
Short by:        R1000.00
WARNING: you are spending more than you earn!
Status: overspent
```

With a healthy month, there should be no warning line at all.
:::

## Step 8: a message for each status with `switch`

`Status: overspent` is a bit bare. Each status deserves its own, more helpful message. `status` holds one of exactly three known words, so this is the perfect place for a `switch`.

**Delete** the temporary `` console.log(`Status: ${status}`); `` line, and put this at the very end of the file instead:

```js
switch (status) {
  case "healthy":
    console.log("Status: HEALTHY. You keep more than 20% of your income.");
    break;
  case "tight":
    console.log("Status: TIGHT. You keep 20% or less. Watch the small stuff.");
    break;
  case "overspent":
    console.log("Status: OVERSPENT. Time to cut something.");
    break;
}
```

There is no `default` here. The chain in step 5 guarantees `status` is always one of these three words, so there is nothing else to catch. Every `case` has its `break`. Without them, a healthy month would print all three messages.

Finally, delete the TODO comments at the bottom, and tidy the section comments so they describe the new program. Your comments do not need to match the reference exactly.

::: try The finished Budget Buddy v2
Run it and test every path. Here are three sessions to compare with. A healthy month:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R6500
Food: R3000
Transport: R1800

Hi Thandi, here is your month:
Income:          R15000.00
Total expenses:  R11300.00
Left over:       R3700.00
Status: HEALTHY. You keep more than 20% of your income.
```

A month with some bad input:

```text
=== Budget Buddy ===
What is your name?   
Monthly income: R12000
Rent: R5000
Food: Rabc
  That is not a valid amount, so I will use R0.
Transport: R-300
  That is not a valid amount, so I will use R0.

Hi friend, here is your month:
Income:          R12000.00
Total expenses:  R5000.00
Left over:       R7000.00
Status: HEALTHY. You keep more than 20% of your income.
```

An overspent month:

```text
=== Budget Buddy ===
What is your name? Musa
Monthly income: R9000
Rent: R6000
Food: R2500
Transport: R1500

Hi Musa, here is your month:
Income:          R9000.00
Total expenses:  R10000.00
Short by:        R1000.00
WARNING: you are spending more than you earn!
Status: OVERSPENT. Time to cut something.
```

And make sure a tight month (`10000`, `6000`, `2500`, `500`) ends with `Status: TIGHT. You keep 20% or less. Watch the small stuff.`
:::

::: project Your finished Budget Buddy v2
Before you open the full solution, check your program against this list:

1. An empty name gives `Hi friend`.
2. All four amounts are checked: not a number or negative gives the message and becomes 0.
3. The percentage and per-day lines are gone.
4. A `status` of `"overspent"`, `"healthy"` or `"tight"` is worked out with an `if / else if / else` chain.
5. The third summary line says `Left over:` or `Short by:`, and never shows a minus sign.
6. A warning appears only when expenses are more than income.
7. A `switch` prints one message for the status.

If yours does all seven, compare it with the reference below anyway. Reading someone else's version of your own program is a good way to learn.
:::

::: solution Full solution: Budget Buddy v2 (stage 2)
```js
// Budget Buddy — stage 2: warnings and checks
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");

// If the user just presses Enter, "" is falsy, so we fall back to "friend"
const name = prompt("What is your name? ").trim() || "friend";

let income = Number(prompt("Monthly income: R"));
if (Number.isNaN(income) || income < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  income = 0;
}

let rent = Number(prompt("Rent: R"));
if (Number.isNaN(rent) || rent < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  rent = 0;
}

let food = Number(prompt("Food: R"));
if (Number.isNaN(food) || food < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  food = 0;
}

let transport = Number(prompt("Transport: R"));
if (Number.isNaN(transport) || transport < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  transport = 0;
}

const totalExpenses = rent + food + transport;
const left = income - totalExpenses;

// Work out a status word
let status;
if (left < 0) {
  status = "overspent";
} else if (left > income * 0.2) {
  status = "healthy";
} else {
  status = "tight";
}

// Choose a label with the ternary operator
const leftLabel = left >= 0 ? "Left over:" : "Short by: ";

console.log("");
console.log(`Hi ${name}, here is your month:`);
console.log(`Income:          R${income.toFixed(2)}`);
console.log(`Total expenses:  R${totalExpenses.toFixed(2)}`);
console.log(`${leftLabel}       R${Math.abs(left).toFixed(2)}`);

if (totalExpenses > income) {
  console.log("WARNING: you are spending more than you earn!");
}

switch (status) {
  case "healthy":
    console.log("Status: HEALTHY. You keep more than 20% of your income.");
    break;
  case "tight":
    console.log("Status: TIGHT. You keep 20% or less. Watch the small stuff.");
    break;
  case "overspent":
    console.log("Status: OVERSPENT. Time to cut something.");
    break;
}
```
:::

## Look back at what you built

Read through your finished `index.js` from top to bottom and find each idea from this phase:

| Idea | Where it is in Budget Buddy |
|---|---|
| [Comparisons](#/phase-02-making-decisions/01-comparing-values) | `income < 0`, `left > income * 0.2`, `totalExpenses > income` |
| [if and else](#/phase-02-making-decisions/02-if-and-else) | the four input checks, the status chain, the warning |
| [and, or, not](#/phase-02-making-decisions/03-combining-conditions) | `Number.isNaN(income) \|\| income < 0` |
| [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy) | `.trim() \|\| "friend"` |
| [The ternary](#/phase-02-making-decisions/05-switch-and-ternary) | `left >= 0 ? "Left over:" : "Short by: "` |
| [switch](#/phase-02-making-decisions/05-switch-and-ternary) | the status messages |

At the start of this phase, your programs could only do the same thing every time. Now Budget Buddy looks at its input and reacts. That is a real step.

It is also honest to look at what is still clumsy:

- **Four nearly identical validation blocks.** Twenty lines that say one thing. Change the message, and you must change it four times.
- **Bad input becomes R0.** A real app would say "that's not a number, try again", and keep asking until it gets a good answer.
- **Exactly three expenses.** Your real month has more than rent, food and transport.

All three are fixed in the next two phases. In [Phase 3](#/phase-03-loops/01-why-loops), loops let Budget Buddy keep asking until the input is valid, and let you add as many expenses as you like from a menu. In [Phase 4](#/phase-04-functions/01-why-functions), functions let you write the checking code once and reuse it everywhere.

::: connect
**This builds on:** everything in Phase 2, and your [Budget Buddy v1](#/phase-01-storing-information/09-project-budget-buddy-v1), which already used variables, conversion with `Number()`, `toFixed(2)` and template literals.

**This unlocks:** [Phase 3: Loops](#/phase-03-loops/01-why-loops). In [Budget Buddy v3](#/phase-03-loops/06-project-budget-buddy-v3), the four validation blocks become "keep asking until it is valid", and the fixed three expenses become a menu you can use as many times as you like. The `switch` you wrote here is the seed of that menu.
:::

::: challenge Choose your currency
Budget Buddy assumes rand. Add a question at the very start: `Currency (ZAR, USD, EUR, GBP): `. Use a `switch` to set a `symbol` variable to `R`, `$`, `€` or `£`. Anything else, including pressing Enter, should mean `R`. Then use `symbol` everywhere the program currently prints `R`: in the questions and in the summary. Change the error message to `...so I will use 0.` so it does not mention a currency.

Accept `usd`, `Usd` and `USD`.
:::

::: hint
Tidy the answer with `.trim().toUpperCase()`. Create `let symbol;` before the `switch`, and set it in each `case`, with `default: symbol = "R";`. For the questions, change the quotes to backticks so you can use `${symbol}`: `` prompt(`Rent: ${symbol}`) ``. In the summary lines, change `R${` to `${symbol}${`.
:::

::: solution
The new part, right after the title line:

```js
// Choose a currency symbol
const currency = prompt("Currency (ZAR, USD, EUR, GBP): ").trim().toUpperCase();
let symbol;
switch (currency) {
  case "USD":
    symbol = "$";
    break;
  case "EUR":
    symbol = "€";
    break;
  case "GBP":
    symbol = "£";
    break;
  default:
    symbol = "R";
}
```

Then every question uses the symbol, for example:

```js
let income = Number(prompt(`Monthly income: ${symbol}`));
```

and every summary line, for example:

```js
console.log(`Income:          ${symbol}${income.toFixed(2)}`);
```

A sample session:

```text
=== Budget Buddy ===
Currency (ZAR, USD, EUR, GBP): usd
What is your name? Amy
Monthly income: $3000
Rent: $1200
Food: $abc
  That is not a valid amount, so I will use 0.
Transport: $300

Hi Amy, here is your month:
Income:          $3000.00
Total expenses:  $1500.00
Left over:       $1500.00
Status: HEALTHY. You keep more than 20% of your income.
```

`default` does double duty here: it covers `"ZAR"` and also anything unexpected, so the program always has a symbol. This is not part of the reference stage 2 code, so keep it in your copy or not, as you like. Later project lessons start from the reference code.
:::

::: recap
- Budget Buddy now **validates** every amount: not a number or negative means a message and R0.
- An empty name falls back to `"friend"` with `.trim() || "friend"`.
- A **status** is worked out with an `if / else if / else` chain, checked in the right order: overspent, then healthy, then tight.
- A **ternary** picks the "Left over" or "Short by" label, and `Math.abs()` drops the minus sign.
- A plain `if` prints a warning when expenses are more than income.
- A **switch** turns the status word into a helpful message, with a `break` in every case.
- The copy-pasted validation blocks are a real problem, and loops and functions in the next two phases will fix it.
:::

::: interview Why does Budget Buddy use 0 for a bad amount, instead of asking again?
Asking again means repeating the question until the answer is valid, and repeating code as many times as needed requires a loop, which comes in Phase 3. With only `if`, the program can check once, so it reports the problem and uses a safe value instead.
:::

::: interview Why must `left < 0` be checked before `left > income * 0.2` in the status chain?
The chain stops at the first `true` condition, and each later check can assume the earlier ones were false. Checking "overspent" first means the next question only has to decide between healthy and tight. With the order changed, the conditions would need extra checks to stay correct, and mistakes would creep in.
:::

::: interview What is wrong with having four nearly identical validation blocks, if they all work?
Any change (a new message, a new rule such as "no more than R1,000,000") has to be made four times, and it is all too common to miss one or mix up a variable name while copying. The rule "Don't Repeat Yourself" says write it once. Functions (Phase 4) make that possible.
:::

::: checkpoint
- [ ] I planned the changes as a TODO list in comments before coding
- [ ] I ran the program after every step, not only at the end
- [ ] Typing `abc` or a negative number for any amount gives the message and uses R0
- [ ] Pressing Enter at the name question gives `Hi friend`
- [ ] I tested a healthy, a tight and an overspent month, and the exact-20% boundary
- [ ] An overspent month shows "Short by", the warning, and the OVERSPENT message
- [ ] I can point to where each idea from Phase 2 is used in my code
:::

::: resources
- **javascript.info, "Conditional branching: if, '?'":** https://javascript.info/ifelse. A good re-read now that you have used every part of it in a real program.
- **MDN, `Math.abs()`:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs. The reference page for the one new built-in used in this lesson.
- **The Odin Project Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. If you want more practice problems on conditionals, the JavaScript Basics section has plenty.
:::
