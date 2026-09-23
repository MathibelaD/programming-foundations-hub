---
title: Project — Budget Buddy v5
summary: Budget Buddy finally remembers every expense. Store them in an array, list them, remove one by its number, and work out the total, average and largest with your own loops.
minutes: 75
stage: Phase 5
---

## What you will build

- Budget Buddy stores **every** expense in an array, instead of only a running total
- A new menu option **lists** your expenses, numbered from 1
- Another new option **removes** an expense by its number, and refuses numbers that do not exist
- The summary shows the total, **average** and **largest** expense, each worked out by a loop you wrote

**Before this:** [Strings and arrays](#/phase-05-arrays/05-strings-and-arrays), and your finished [Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4). You will start from your v4 code.

## Why this change?

Open your v4 program and look at what it remembers about your spending: `total`, `count` and `biggest`. Three numbers. The actual expenses are **forgotten** the moment they are added.

That causes real problems:

- You typed `850` when you meant `85`. There is no way to fix it. It is baked into the total forever.
- You cannot see a list of what you spent. You only see a sum.
- Every new statistic (the average, the smallest, how many were over R500) needs yet another variable, updated in exactly the right place.

The fix is the big idea of this phase: **keep the whole list**. If you have every amount in an array, you can list them, remove one, and calculate anything you like, whenever you like, with the algorithms from [lesson 4](#/phase-05-arrays/04-array-algorithms-by-hand).

::: analogy From a tally to a till slip
v4 is like a shop assistant who keeps a running total on a calculator. If one item was rung up wrong, the only choice is to start again.

v5 is like a real till slip: every item is printed on its own line. You can read the list back, void one item ("remove number 2"), and the total is worked out from whatever is left on the slip.
:::

## The plan

We will change the program in four small steps, and run it after each one. That way, if something breaks, you know it was the last small change.

| Step | What changes | Menu after the step |
|---|---|---|
| 1 | Add three list functions: `sumOf`, `largestOf`, `averageOf`. Test them on their own. | unchanged |
| 2 | Store expenses in an array. The summary uses the new functions. | 1 Add, 2 Summary, 3 Quit |
| 3 | A five-option menu, and a "list expenses" screen. | 1 Add, 2 List, 3 Remove (not yet), 4 Summary, 5 Quit |
| 4 | Remove an expense by number, with validation. | the full v5 menu |

::: note Keep a copy of v4
Before you start, make a backup of your working v4, so you can always compare. In the terminal, inside your `budget-buddy` folder:

macOS / Linux:
```bash
cp index.js index-v4.js
```

Windows (PowerShell):
```bash
copy index.js index-v4.js
```

You will keep editing `index.js`. (In Phase 8 you will learn Git, which is a much better way to keep old versions.)
:::

Your starting point is your v4 `index.js`. If yours differs a little from the reference v4 solution, that is fine. The steps below say what to change, so you can apply them to your own version. Where names matter (like `formatMoney` and `askForAmount`), use the names from your own code.

## Step 1: three list functions, written by hand

First, the calculations. These are **pure functions**: they take an array of amounts and return a number, with no printing and no prompting. That makes them simple to test on their own, before they go anywhere near the menu.

Find the line `function showMenu() {` in your `index.js`. **Above** it, add this new section:

```js
// ---------- list calculations, written by hand ----------

function sumOf(amounts) {
  let total = 0;
  for (const amount of amounts) {
    total += amount;
  }
  return total;
}

function largestOf(amounts) {
  let largest = 0;
  for (const amount of amounts) {
    if (amount > largest) {
      largest = amount;
    }
  }
  return largest;
}

function averageOf(amounts) {
  if (amounts.length === 0) {
    return 0;
  }
  return sumOf(amounts) / amounts.length;
}

// ---------- screens ----------

```

You know all three recipes from lesson 4: the **accumulator** (`sumOf`), **max** (`largestOf`), and **average** with an empty-list guard (`averageOf`, which reuses `sumOf`).

::: why Why does `largestOf` start at 0 this time?
In lesson 4 we said: start "the biggest so far" at the **first item**, not 0, because 0 gives the wrong answer when every value is negative. So why 0 here?

- Budget Buddy never lets a negative amount in. `askForAmount` only accepts numbers of 0 or more. So starting at 0 can never hide a real value.
- With no expenses at all, `amounts[0]` would be `undefined`, and `formatMoney(undefined)` would crash. Starting at 0 means an empty list shows `R0.00`, which is exactly what we want on screen.

This is a **decision** made because we know our data, not a mistake. It is also exactly the kind of decision worth writing down, as we just did.
:::

The new `// ---------- screens ----------` heading is only a comment that keeps the file organised: helpers at the top, then list calculations, then screens (functions that print), then the program.

**Test the functions before using them.** Right at the bottom of the file, put `//` in front of `main();` so the program does not start, and add some temporary test lines:

```js
// main();

// temporary tests
const test = [120, 45.5, 300];
console.log(sumOf(test));
console.log(largestOf(test));
console.log(averageOf(test));
console.log(sumOf([]), largestOf([]), averageOf([]));
```

::: try Test step 1
1. Save, and from inside `budget-buddy` run:
   ```bash
   node index.js
   ```
2. You should see (no questions are asked, because `main()` is switched off):
   ```text
   465.5
   300
   155.16666666666666
   0 0 0
   ```
3. Check the numbers yourself: `120 + 45.5 + 300` is `465.5`, the largest is `300`, and `465.5 / 3` is `155.1666…`. The last line shows all three functions cope with an empty list.
4. Now **delete** the temporary test lines and remove the `//` from `main();`, so the bottom of the file is `main();` again. Run `node index.js` once more, and check that v4 still works exactly as before. Nothing uses the new functions yet.
:::

## Step 2: keep every expense in an array

Now we swap the three running variables for one list.

**2a. In `main()`,** find these lines:

```js
  let total = 0;
  let count = 0;
  let biggest = 0;
  let running = true;
```

and replace them with:

```js
  const expenses = [];
  let running = true;
```

(`const`, because it will always be the same list, even though its contents change. See [Changing arrays](#/phase-05-arrays/02-changing-arrays).)

**2b. In the "add" branch** (`choice === "1"`), replace the three lines that updated `total`, `count` and `biggest` with a single `push`:

```js
    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      expenses.push(amount);
      console.log(`  Added ${formatMoney(amount)}.`);
```

**2c. Update `printSummary`** so it receives the whole list and works everything out from it:

```js
function printSummary(income, expenses) {
  const total = sumOf(expenses);
  const left = income - total;
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${expenses.length} expense(s)`);
  console.log(`  Largest:   ${formatMoney(largestOf(expenses))}`);
  console.log(`  Average:   ${formatMoney(averageOf(expenses))}`);
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}
```

Notice: the count is now `expenses.length`. No variable to keep up to date. The list **is** the count.

**2d. Where `printSummary` is called** in the menu, pass the array: `printSummary(income, expenses);`.

**2e. At the end of `main()`,** v4 printed the count, biggest and average when you quit. That used `total`, `count` and `biggest`, which no longer exist, and the summary screen now shows all of it anyway. Replace those goodbye lines with one:

```js
  console.log(`Goodbye, ${name}!`);
```

::: try Test step 2
1. Run `node index.js` and try this session. Ask for the summary **before** adding anything, to test the empty list:
   ```text
   === Budget Buddy ===
   What is your name? Ayanda
   Monthly income: R8500

   1) Add an expense
   2) Show summary
   3) Quit
   Choose 1, 2 or 3: 2
     Income:    R8500.00
     Spent:     R0.00 across 0 expense(s)
     Largest:   R0.00
     Average:   R0.00
     Left over: R8500.00
     Status:    HEALTHY
   ```
2. Then add `4500` and `850.50`, and show the summary again:
   ```text
   Choose 1, 2 or 3: 2
     Income:    R8500.00
     Spent:     R5350.50 across 2 expense(s)
     Largest:   R4500.00
     Average:   R2675.25
     Left over: R3149.50
     Status:    HEALTHY
   ```
3. Quit with `3`. You should see `Goodbye, Ayanda!`.
4. If you get `ReferenceError: total is not defined` (or `count`, or `biggest`), there is still a line somewhere using an old variable. Node's error tells you the line number. Go there and swap it for the array version.
:::

## Step 3: a bigger menu, and a list screen

Now that the program remembers every expense, let's show them.

**3a. A function to list expenses.** Add it under `showMenu`:

```js
function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (let i = 0; i < expenses.length; i++) {
    console.log(`  ${i + 1}. ${formatMoney(expenses[i])}`);
  }
}
```

Three things you have practised in this phase:

- The **empty case first**, with an early `return`. A `return` with no value means "stop this function here". Without it, the loop would print nothing at all, and the user might think the program was broken.
- The **index loop**, because we need the number: zero, less-than, length.
- **`i + 1`** for people, `expenses[i]` for the computer.

**3b. The new menu.** Replace the body of `showMenu`:

```js
function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Quit");
}
```

**3c. Rewire the choices in `main()`.** The options have new numbers, so the `if` chain needs updating. Option 3 will be ready in step 4, so for now it prints a placeholder:

```js
    const choice = prompt("Choose 1-5: ").trim();

    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      expenses.push(amount);
      console.log(`  Added ${formatMoney(amount)}.`);
    } else if (choice === "2") {
      listExpenses(expenses);
    } else if (choice === "3") {
      console.log("  Coming soon.");
    } else if (choice === "4") {
      printSummary(income, expenses);
    } else if (choice === "5") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 5.");
    }
```

::: try Test step 3
1. Run it. Choose `2` straight away. You should see `  No expenses yet.`
2. Add `4500` and `850.50`, then choose `2` again:
   ```text
   Choose 1-5: 2
     1. R4500.00
     2. R850.50
   ```
3. Choose `3` (`  Coming soon.`), then `4` for the summary, then `5` to quit.
4. **Predict, then check:** what would the list look like if you had written `${i}` instead of `${i + 1}`? Would a user understand "0. R4500.00"?
:::

## Step 4: remove an expense by its number

This is the most careful part of the project. The user sees a list numbered from 1, types a number, and we must remove the right item, or politely refuse.

Think about what the user might type, when there are 3 expenses:

| User types | `Number(...)` gives | Should we remove? |
|---|---|---|
| `2` | `2` | yes: the second expense, **index 1** |
| `3` | `3` | yes: the last one, index 2 |
| `4` | `4` | no, there is no fourth expense |
| `0` | `0` | no, the list starts at 1 |
| `-1` | `-1` | no |
| `1.5` | `1.5` | no, there is no expense "one and a half" |
| `abc` | `NaN` | no |
| (nothing) | `0` | no |

Two jobs, then: **convert** the person's number to an index (subtract 1), and **validate** that it is a real, whole position in the list.

### A new tool: `Number.isInteger`

An **integer** is a whole number, with no fraction part: `-2`, `0`, `7`, `100`. `Number.isInteger(value)` answers `true` if the value is a whole number, and `false` otherwise, including for `NaN`:

```js
console.log(Number.isInteger(2));
console.log(Number.isInteger(1.5));
console.log(Number.isInteger(Number("abc")));
console.log(Number.isInteger(Number("3")));
```

Output:

```text
true
false
false
true
```

It lives in the same family as `Number.isNaN`, which you met in [Converting between types](#/phase-01-storing-information/07-converting-between-types). It catches both `1.5` and `abc` in one check.

### The remove function

Add this under `listExpenses`:

```js
function removeExpense(expenses) {
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;   // people count from 1, arrays count from 0
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    console.log(`  Removed ${formatMoney(removed[0])}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}
```

Line by line:

1. **Show the list first**, so the user can see the numbers. We reuse `listExpenses` rather than writing the loop again.
2. **Nothing to remove?** Then stop. `listExpenses` has already said "No expenses yet."
3. **Convert** the answer to a number, then to an index with `number - 1`.
4. **Validate** with three conditions joined by `&&`, all of which must be true:
   - `Number.isInteger(number)`: a whole number (not `1.5`, not `NaN`).
   - `index >= 0`: not before the start (catches `0` and negatives).
   - `index < expenses.length`: not past the end. `<`, not `<=`, for the same reason as in every loop in this phase.
5. **Remove** with `splice(index, 1)`, which hands back an array of what it removed. `removed[0]` is the amount itself, so we can tell the user what went.
6. **Otherwise**, say what a valid answer looks like. Using `expenses.length` means the message is always right.

This is the same "is this a real locker?" check as the song picker challenge in [lesson 1](#/phase-05-arrays/01-what-is-an-array), with the `1.5` hole now closed.

::: note The function changes the list it was given
`removeExpense` changes `expenses` with `splice`, and the change is still there back in `main()`. That is because the function receives **the same list**, not a copy. You saw a preview of this in [Changing arrays](#/phase-05-arrays/02-changing-arrays), when two names pointed at one list. Here it is exactly what we want. Phase 6 explains it fully in [Copies and references](#/phase-06-objects/04-values-and-references).
:::

Finally, in `main()`, replace the placeholder:

```js
    } else if (choice === "3") {
      removeExpense(expenses);
```

And change the comment on the first line of the file to say which stage this is:

```js
// Budget Buddy — stage 5: remember every expense
```

::: try Test step 4: try to break it
Run the program and follow this session. Add three expenses, `4500`, `850.50` and `1200`, then:

```text
Choose 1-5: 3
  1. R4500.00
  2. R850.50
  3. R1200.00
Number to remove: 2
  Removed R850.50.
```

List them again with `2`:

```text
Choose 1-5: 2
  1. R4500.00
  2. R1200.00
```

The old number 3 is now number 2. `splice` closed the gap, and the numbering is worked out fresh every time you list.

Now try to break it. Each of these should be refused politely:

```text
Choose 1-5: 3
  1. R4500.00
  2. R1200.00
Number to remove: 7
  Please choose a number from 1 to 2.
```

```text
Choose 1-5: 3
  1. R4500.00
  2. R1200.00
Number to remove: 1.5
  Please choose a number from 1 to 2.
```

Also try `0`, `-1`, `abc`, and pressing Enter with nothing typed. Then check the summary is right after a removal:

```text
Choose 1-5: 4
  Income:    R8500.00
  Spent:     R5700.00 across 2 expense(s)
  Largest:   R4500.00
  Average:   R2850.00
  Left over: R2800.00
  Status:    HEALTHY
```

Finally, remove everything, then choose `3` once more. You should see `  No expenses yet.` and be taken straight back to the menu.
:::

::: debug The wrong expense disappears
A classmate wrote their remove like this. When they have three expenses and type `1`, the **second** one disappears; when they type `3`, nothing is removed and they get the error message. What did they forget?

```js
  const number = Number(prompt("Number to remove: "));
  if (Number.isInteger(number) && number >= 0 && number < expenses.length) {
    const removed = expenses.splice(number, 1);
    console.log(`  Removed ${formatMoney(removed[0])}.`);
  }
```
:::

::: solution
They used the person's number directly as the index. People count from 1, arrays from 0, so typing `1` removes index 1, which is the **second** expense. Typing `3` fails the check `3 < 3`. It is the off-by-one error again, this time between a person and an array.

Convert first, then use the index everywhere:

```js
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;   // people count from 1, arrays count from 0
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    console.log(`  Removed ${formatMoney(removed[0])}.`);
  }
```
Naming the two different things differently (`number` for the person, `index` for the array) makes this bug much harder to write.
:::

## The full solution

Try to finish every step yourself before you look. If your version works and you can explain every line, it is correct, even if it looks different.

::: solution Full solution: Budget Buddy v5 (index.js)
```js
// Budget Buddy — stage 5: remember every expense
const prompt = require("prompt-sync")();

// ---------- small helpers ----------

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

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

// ---------- list calculations, written by hand ----------

function sumOf(amounts) {
  let total = 0;
  for (const amount of amounts) {
    total += amount;
  }
  return total;
}

function largestOf(amounts) {
  let largest = 0;
  for (const amount of amounts) {
    if (amount > largest) {
      largest = amount;
    }
  }
  return largest;
}

function averageOf(amounts) {
  if (amounts.length === 0) {
    return 0;
  }
  return sumOf(amounts) / amounts.length;
}

// ---------- screens ----------

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Quit");
}

function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (let i = 0; i < expenses.length; i++) {
    console.log(`  ${i + 1}. ${formatMoney(expenses[i])}`);
  }
}

function removeExpense(expenses) {
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;   // people count from 1, arrays count from 0
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    console.log(`  Removed ${formatMoney(removed[0])}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}

function printSummary(income, expenses) {
  const total = sumOf(expenses);
  const left = income - total;
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${expenses.length} expense(s)`);
  console.log(`  Largest:   ${formatMoney(largestOf(expenses))}`);
  console.log(`  Average:   ${formatMoney(averageOf(expenses))}`);
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");
  const name = prompt("What is your name? ").trim() || "friend";
  const income = askForAmount("Monthly income: R");
  const expenses = [];
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt("Choose 1-5: ").trim();

    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      expenses.push(amount);
      console.log(`  Added ${formatMoney(amount)}.`);
    } else if (choice === "2") {
      listExpenses(expenses);
    } else if (choice === "3") {
      removeExpense(expenses);
    } else if (choice === "4") {
      printSummary(income, expenses);
    } else if (choice === "5") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 5.");
    }
  }

  console.log(`Goodbye, ${name}!`);
}

main();
```
:::

## What you practised

Look back at what went into this version:

- An **array** created empty and filled with `push` ([lessons 1 and 2](#/phase-05-arrays/02-changing-arrays)).
- A **numbered list** with the index loop and `i + 1` ([lesson 3](#/phase-05-arrays/03-looping-through-arrays)).
- **Total, average and largest** written by hand ([lesson 4](#/phase-05-arrays/04-array-algorithms-by-hand)).
- **Removing by position** with `splice`, and converting between people's numbers and indexes, with careful validation.
- Small, named functions that each do one job, from Phase 4.

::: connect
**This builds on:** every lesson in this phase, and the function structure from [Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4).

**This unlocks:** Budget Buddy still only knows **amounts**. It cannot tell you that R4500 was rent and R850.50 was groceries. In Phase 6 you will learn [objects](#/phase-06-objects/01-what-is-an-object), and each expense will become `{ description, amount, category }`. You will also save the list to a file, so your expenses survive after you quit. And the loops you wrote here (`sumOf`, `largestOf`) will later be replaced by the Phase 7 shortcuts, which you will understand completely because you wrote them first.
:::

::: challenge Big spends
Add a sixth menu option, **"Show big spends"**, which asks for a limit (use `askForAmount`) and prints every expense over that limit on one line, like this:

```text
  Over R1000.00: R4500.00, R1200.00
```

or, if none match:

```text
  Nothing over R5000.00.
```

Write a pure function `expensesOver(amounts, limit)` that **filters by hand** (lesson 4), and a screen function that prints the result, building the line with `join` (lesson 5). Remember to update the menu text, the "Choose" prompt and the "Quit" option number.

This is an extra: your code will now differ from the reference solution, which is fine.
:::

::: solution
The two new functions:

```js
function expensesOver(amounts, limit) {
  const result = [];
  for (const amount of amounts) {
    if (amount > limit) {
      result.push(amount);
    }
  }
  return result;
}

function showBigSpends(expenses, limit) {
  const big = expensesOver(expenses, limit);
  if (big.length === 0) {
    console.log(`  Nothing over ${formatMoney(limit)}.`);
    return;
  }
  const shown = [];
  for (const amount of big) {
    shown.push(formatMoney(amount));
  }
  console.log(`  Over ${formatMoney(limit)}: ${shown.join(", ")}`);
}
```

In the menu, add `console.log("6) Show big spends");` and move Quit to 6 or 7 as you prefer. In `main()`, the new branch is:

```js
    } else if (choice === "6") {
      const limit = askForAmount("Show expenses over: R");
      showBigSpends(expenses, limit);
```

`showBigSpends` uses three patterns in a row: **filter** (`expensesOver`), **map** (each amount to its `formatMoney` text), and **join**.
:::

::: recap
- Budget Buddy now keeps **every** expense in `const expenses = []`, filled with `push`.
- The count is `expenses.length`. The total, average and largest are calculated from the list by `sumOf`, `averageOf` and `largestOf`, when needed.
- `listExpenses` handles the empty list first, then uses the index loop to number items from 1.
- `removeExpense` converts the person's number to an index (`number - 1`) and checks it with `Number.isInteger`, `>= 0` and `< expenses.length` before `splice`.
- `Number.isInteger(x)` is `true` only for whole numbers (and `false` for `NaN`).
- Change a program in small steps, and run it after each one.
:::

::: interview Why does Budget Buddy store the amounts in an array now, instead of only a running total?
With only a total, individual expenses are lost, so you cannot list them, fix a mistake, or work out new statistics later. With the whole list you can list, remove, and calculate anything (total, average, largest) from the data whenever you need it.
:::

::: interview What checks does `removeExpense` make before removing, and why each one?
`Number.isInteger(number)` rejects fractions and anything that was not a number (`NaN`). `index >= 0` rejects 0 and negative numbers. `index < expenses.length` rejects numbers past the end of the list. Only a whole number that points to a real item gets through to `splice`.
:::

::: interview Why subtract 1 from the number the user types?
The list is shown to people numbered from 1, but array indexes start at 0. Expense number 1 is at index 0, so the index is always the person's number minus one.
:::

::: checkpoint
- [ ] I tested `sumOf`, `largestOf` and `averageOf` on their own before using them
- [ ] My Budget Buddy stores expenses in an array, and the summary shows total, largest and average
- [ ] Option 2 lists my expenses numbered from 1, and says "No expenses yet." when empty
- [ ] I removed an expense by number and saw the list renumber itself
- [ ] I tried `0`, `7`, `1.5`, `abc` and an empty answer, and every one was refused politely
- [ ] I compared my code with the full solution and can explain every line of mine
:::

::: resources
- **javascript.info, "Arrays":** https://javascript.info/array. A good refresher on everything this project used.
- **MDN, "Number.isInteger()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger. The reference page for the new check, with examples.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `sumOf` and `largestOf` with a small array and watch them run.
:::
