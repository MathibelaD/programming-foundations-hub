---
title: "Project: Budget Buddy v6"
summary: Turn each expense into a real record with a description, amount and category, add a totals-by-category report, and save everything to budget.json so it survives between runs.
minutes: 90
stage: Phase 6
---

## What you will build

At the end of Phase 5, Budget Buddy could list, remove and summarise your expenses. But each expense was only a number (`450`: 450 for what?), and the moment you chose **Quit**, everything was forgotten.

By the end of this lesson, Budget Buddy v6 will:

- store each expense as an **object**: `{ description, amount, category }`,
- show a new **Totals by category** report,
- **save** everything to a file called `budget.json` after every change,
- **load** that file when it starts, and greet you with "Welcome back".

Here is a taste of the finished program, on its **second** run:

```text
=== Budget Buddy ===
Welcome back, Naledi! You have 2 saved expense(s).

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Quit
Choose 1-6: 5
  transport: R18.00
  food: R850.40
```

You will use almost every idea from this phase: objects, a list of objects, a factory function, an object used as a tally, references, and JSON files.

**Before this:** [Saving data to a file with JSON](#/phase-06-objects/05-saving-data-with-json), and your Budget Buddy from [Project: Budget Buddy v5](#/phase-05-arrays/06-project-budget-buddy-v5).

::: stop Save a copy of v5 first
Before changing anything, make a copy of your working v5 code, so you can always go back. In VS Code, right-click `index.js` in `budget-buddy`, choose **Copy**, then **Paste**, and rename the copy to `index-v5.js`. From now on, edit only `index.js`.

This lesson starts from the reference v5 code in [the Phase 5 project](#/phase-05-arrays/06-project-budget-buddy-v5). If your v5 is a little different, that is fine. Follow the ideas, and compare with the full solution at the end.
:::

## The plan

Big changes go wrong when you make them all at once. We will go in small steps and **run the program after every step**. Here is the plan, in plain words:

1. Add three small helpers: `askForText`, `createExpense` and `describe`.
2. Make each new expense an object, and show objects in the list.
3. Fix the calculations so they read `expense.amount`.
4. Group name, income and expenses into one `budget` object.
5. Add the "Totals by category" report.
6. Save to `budget.json` after every change.
7. Load `budget.json` when the program starts.

Open `~/budget-buddy/index.js` in VS Code and a terminal inside the `budget-buddy` folder. Run the program once now to check v5 still works:

```bash
node index.js
```

(or `npm start`, if you set up the start script in Phase 1).

## Step 1: three small helpers

We will soon ask three questions per expense: what it was for, how much, and which category. Two of those are text answers, and a text answer might be empty. So first, a helper that asks for text and falls back to a default if the user presses Enter:

```js
function askForText(question, fallback) {
  const answer = prompt(question).trim();
  return answer || fallback;
}
```

`answer || fallback` is the default-value trick from [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy): an empty string is falsy, so an empty answer gives the `fallback`. Put this function **after `askForAmount`**, in the "small helpers" section.

Next, a **factory function** (from [Objects and functions together](#/phase-06-objects/03-objects-and-functions)) so that every expense has exactly the same shape. Put it after `statusFor`:

```js
function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}
```

And a function that turns one expense into a line of text for the screen. Put it in the "screens" section, **directly above `listExpenses`**:

```js
function describe(expense) {
  return `${expense.description} (${expense.category}): ${formatMoney(expense.amount)}`;
}
```

Finally, while you are here, use the new helper for the name question. In `main`, change:

```js
const name = prompt("What is your name? ").trim() || "friend";
```

to:

```js
const name = askForText("What is your name? ", "friend");
```

It does exactly the same thing, but now it reads like the rest of the program.

**Run it.** Nothing looks different yet, and that is the point: you have added tools without breaking anything. If you get an error, check you pasted each function whole, with its closing `}`.

## Step 2: each expense becomes an object

In `main`, find the part that handles choice `"1"`. In v5 it asks for an amount and pushes a number:

```js
    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      expenses.push(amount);
      console.log(`  Added ${formatMoney(amount)}.`);
```

Change it to ask three questions and push an **object**:

```js
    if (choice === "1") {
      const description = askForText("What was it for? ", "Something");
      const amount = askForAmount("Amount: R");
      const category = askForText("Category (e.g. food, transport): ", "other").toLowerCase();
      expenses.push(createExpense(description, amount, category));
      console.log(`  Added ${description} for ${formatMoney(amount)}.`);
```

Why `.toLowerCase()` on the category? So that "Food", "food" and "FOOD" all end up as the same category. You will see why that matters in step 5.

Now the list. In `listExpenses`, each item used to be a number that went straight into `formatMoney`. Now each item is an object, so use `describe`:

```js
    console.log(`  ${i + 1}. ${describe(expenses[i])}`);
```

And in `removeExpense`, the "Removed" message also printed a number. Change it to show the description:

```js
    console.log(`  Removed ${removed[0].description}.`);
```

(`splice` returns an **array** of the removed items, so `removed[0]` is the expense object that was removed.)

**Run it.** Add two expenses, then list them, then choose **Show summary**:

```text
Choose 1-5: 1
What was it for? Taxi to work
Amount: R18
Category (e.g. food, transport): Transport
  Added Taxi to work for R18.00.
...
Choose 1-5: 2
  1. Taxi to work (transport): R18.00
  2. Groceries (food): R850.40
...
Choose 1-5: 4
  Income:    R12000.00
TypeError: amount.toFixed is not a function
```

Adding and listing work. The summary crashes. **This crash is expected**, and it teaches something important, so do not skip past it.

Node points at `formatMoney`. Something passed it a value that is not a number. Follow the trail back: `printSummary` calls `sumOf(expenses)`, and `sumOf` does `total += amount` on each item. But each item is now an **object**, so `0 + { ... }` glues text together (the `[object Object]` problem from [Lists of objects](#/phase-06-objects/02-arrays-of-objects)), and `formatMoney` receives a string.

::: why Change the shape, follow the ripples
When you change the **shape** of your data (numbers became objects), every piece of code that **reads** that data has to change too. A good habit: after changing a data shape, search your file for every place that uses it (in VS Code, **Ctrl+F** or **Cmd+F** and search for `expenses`) and check each one. Here that is `listExpenses` and `removeExpense` (done), and the calculations (next).
:::

## Step 3: calculations that read `expense.amount`

Replace the whole "list calculations" section (`sumOf`, `largestOf` and `averageOf`) with this:

```js
// ---------- calculations ----------

function totalSpent(expenses) {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

function largestExpense(expenses) {
  let largest = null;
  for (const expense of expenses) {
    if (largest === null || expense.amount > largest.amount) {
      largest = expense;
    }
  }
  return largest;
}
```

- `totalSpent` is the same accumulator as before, but adds `expense.amount`.
- `largestExpense` keeps the **whole object**, not only the number (the "keep the best object" pattern from [Lists of objects](#/phase-06-objects/02-arrays-of-objects)), so the summary can say *what* the biggest expense was. It starts at `null`, meaning "none found yet", so that an empty list returns `null` instead of a made-up expense.

We are dropping the average. With descriptions and categories, "your biggest expense was Groceries" and the category report (coming soon) say far more than an average does. If you liked the average, keep it: it only needs `totalSpent(expenses) / expenses.length`.

Now update `printSummary` to use the new functions:

```js
function printSummary(income, expenses) {
  const total = totalSpent(expenses);
  const left = income - total;
  const largest = largestExpense(expenses);
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${expenses.length} expense(s)`);
  if (largest !== null) {
    console.log(`  Largest:   ${describe(largest)}`);
  }
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}
```

The `if (largest !== null)` skips the "Largest" line when there are no expenses yet, because `describe(null)` would crash.

**Run it** again with the same two expenses and choose **Show summary**:

```text
Choose 1-5: 4
  Income:    R12000.00
  Spent:     R868.40 across 2 expense(s)
  Largest:   Groceries (food): R850.40
  Left over: R11131.60
  Status:    HEALTHY
```

Also try the summary with **no** expenses, to check the `null` case works.

## Step 4: one `budget` object

Right now `main` has three separate variables, `name`, `income` and `expenses`, that together describe one thing: your budget. In a moment we want to save all of it to one file. So group them into **one object**:

```js
{ name: "Naledi", income: 12000, expenses: [ ... ] }
```

This is an object with an array inside it, holding objects: the "thing that has a list inside it" row of the decision table in [Objects and functions together](#/phase-06-objects/03-objects-and-functions).

First, move the "add an expense" code out of `main` into its own function, and make it take the budget. Put it in the "screens" section, **directly above `removeExpense`**:

```js
function addExpense(budget) {
  const description = askForText("What was it for? ", "Something");
  const amount = askForAmount("Amount: R");
  const category = askForText("Category (e.g. food, transport): ", "other").toLowerCase();
  budget.expenses.push(createExpense(description, amount, category));
  console.log(`  Added ${description} for ${formatMoney(amount)}.`);
}
```

Change `removeExpense` so it also takes the budget. Only the first two lines are new: it takes `budget` and pulls out `budget.expenses` into a local name, so the rest of the function can stay as it was:

```js
function removeExpense(budget) {
  const expenses = budget.expenses;
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    console.log(`  Removed ${removed[0].description}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}
```

Stop and think about `const expenses = budget.expenses;` for a moment. Then `expenses.splice(...)` removes an item. Does that change `budget.expenses`, or only a copy?

It changes `budget.expenses`. After [Copies and references](#/phase-06-objects/04-values-and-references) you know why: `expenses` is a second slip of paper with the **same address**. There is only one array, and both names reach it. Here, sharing is exactly what we want. The same goes for `addExpense`: it pushes onto `budget.expenses`, and `main` sees the new expense because it holds a reference to the same `budget` object.

`printSummary` now takes the budget too:

```js
function printSummary(budget) {
  const total = totalSpent(budget.expenses);
  const left = budget.income - total;
  const largest = largestExpense(budget.expenses);
  console.log(`  Income:    ${formatMoney(budget.income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${budget.expenses.length} expense(s)`);
  if (largest !== null) {
    console.log(`  Largest:   ${describe(largest)}`);
  }
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(budget.income, left)}`);
}
```

And `main` builds the budget object and hands it around:

```js
function main() {
  console.log("=== Budget Buddy ===");
  const name = askForText("What is your name? ", "friend");
  const income = askForAmount("Monthly income: R");
  const budget = { name: name, income: income, expenses: [] };

  let running = true;
  while (running) {
    showMenu();
    const choice = prompt("Choose 1-5: ").trim();

    if (choice === "1") {
      addExpense(budget);
    } else if (choice === "2") {
      listExpenses(budget.expenses);
    } else if (choice === "3") {
      removeExpense(budget);
    } else if (choice === "4") {
      printSummary(budget);
    } else if (choice === "5") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 5.");
    }
  }

  console.log(`Goodbye, ${budget.name}!`);
}
```

Look at the menu `if` chain now: every branch is one short line. It reads almost like the plan.

**Run it.** It should behave exactly as it did after step 3. Add, list, remove and summarise to check. Changing the structure of code without changing what it does is called **refactoring**, which you did in Phase 4.

## Step 5: totals by category

Now the new feature. We want to add up spending per category, like this:

```text
  transport: R36.00
  food: R850.40
  other: R21.99
```

We do not know the categories in advance: the user makes them up. So we cannot have a variable called `foodTotal`. Instead we use an **object as a tally**, with one key per category, created the first time that category is seen. You built this in the "Spending per category" challenge in [Lists of objects](#/phase-06-objects/02-arrays-of-objects).

Add this to the "calculations" section, after `largestExpense`:

```js
function categoryTotals(expenses) {
  const totals = {};
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }
  return totals;
}
```

The key line does a lot, so here it is in slow motion. Read the right-hand side first, as always:

1. `totals[expense.category]`: look up the running total for this expense's category. **Bracket notation**, because the key is in a variable.
2. `|| 0`: if there is no total yet (the lookup gave `undefined`, which is falsy), use `0` instead.
3. `+ expense.amount`: add this expense.
4. `totals[expense.category] = ...`: store the result under that category, creating the key if it is new.

Here is a trace with three expenses:

| Expense | `totals[category]` before | Starting value (or 0) | After adding | `totals` afterwards |
|---|---|---|---|---|
| Taxi, 18, transport | `undefined` | `0` | `18` | `{ transport: 18 }` |
| Groceries, 850.4, food | `undefined` | `0` | `850.4` | `{ transport: 18, food: 850.4 }` |
| Taxi home, 18, transport | `18` | `18` | `36` | `{ transport: 36, food: 850.4 }` |

This is why step 2 lower-cased the category: without it, `"Transport"` and `"transport"` would be two different keys, and your taxi money would be split across two lines.

Now a screen to show it. Add this in the "screens" section, after `printSummary`:

```js
function printCategoryTotals(expenses) {
  const totals = categoryTotals(expenses);
  const categories = Object.keys(totals);
  if (categories.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (const category of categories) {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  }
}
```

`Object.keys(totals)` gives the category names as an array. That lets us check `.length` for the empty case, then loop over the names and read each total with `totals[category]`.

Add the new option to the menu. In `showMenu`, replace the "Quit" line with two lines:

```js
  console.log("5) Totals by category");
  console.log("6) Quit");
```

And in `main`, change `"Choose 1-5: "` to `"Choose 1-6: "`, change "a number from 1 to 5" to "a number from 1 to 6", and add the new branch, moving Quit to 6:

```js
    } else if (choice === "5") {
      printCategoryTotals(budget.expenses);
    } else if (choice === "6") {
      running = false;
```

**Run it.** Choose 5 straight away, and you should see `No expenses yet.` Then add a few expenses, including two in the same category and one where you press Enter for the category, and choose 5 again:

```text
Choose 1-6: 5
  transport: R36.00
  food: R850.40
  other: R21.99
```

## Step 6: save after every change

Everything works, until you quit. Time to give Budget Buddy a memory, using what you learned in [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json).

At the very top of the file, under the `prompt` line, load the `fs` module and choose a file name:

```js
const prompt = require("prompt-sync")();
const fs = require("fs");

const DATA_FILE = "budget.json";
```

Add a new section, **above** the "calculations" section, with a function that saves the whole budget:

```js
// ---------- saving and loading ----------

function saveBudget(budget) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(budget, null, 2));
}
```

This is why step 4 put everything into one `budget` object: saving it is now a single line. The name, income and every expense object go into the file together.

**When** should we save? You could save only when the user chooses Quit, but then closing the terminal window, or pressing **Ctrl+C**, would lose everything since the last quit. It is safer to **save after every change**. There are three places where the data changes:

1. When the budget is first created in `main`. Add a line after it:
   ```js
     const budget = { name: name, income: income, expenses: [] };
     saveBudget(budget);
   ```
2. In `addExpense`, right after the `push`:
   ```js
     budget.expenses.push(createExpense(description, amount, category));
     saveBudget(budget);
   ```
3. In `removeExpense`, right after the `splice`:
   ```js
       const removed = expenses.splice(index, 1);
       saveBudget(budget);
   ```

`removeExpense` splices through its local `expenses` name, but saves `budget`. That works because, once again, they share the same array.

Finally, tell the user where their data went. Change the goodbye line at the end of `main`:

```js
  console.log(`Goodbye, ${budget.name}! Your data is saved in ${DATA_FILE}.`);
```

**Run it.** Make sure your terminal is **inside the `budget-buddy` folder**, because the file is saved in the folder you run from. Add two expenses and quit:

```text
Choose 1-6: 6
Goodbye, Naledi! Your data is saved in budget.json.
```

Now look in the VS Code explorer: there is a new `budget.json` next to `index.js`. Open it:

```json
{
  "name": "Naledi",
  "income": 12000,
  "expenses": [
    {
      "description": "Taxi to work",
      "amount": 18,
      "category": "transport"
    },
    {
      "description": "Groceries",
      "amount": 850.4,
      "category": "food"
    }
  ]
}
```

That is your budget, as text. (You typed `850.40`, and it was saved as `850.4`. It is the same number: JSON does not keep trailing zeros. `formatMoney` puts them back when displaying.)

::: try Watch the file change
Keep `budget.json` open in one VS Code tab and arrange your windows so that you can see the file and the terminal at the same time. Run Budget Buddy again. Add an expense, and watch a new object appear in the file the moment you press Enter. Remove one, and watch it disappear. (If the editor does not refresh by itself, click on the file's tab.)

This is the best way to *see* what your program is doing with its data.
:::

But run it a second time, and it asks for your name again and starts with an empty list. It **writes** the file, but it never **reads** it. One step to go.

## Step 7: load on start

Add a loading function to the "saving and loading" section, **above** `saveBudget`:

```js
function loadBudget() {
  if (!fs.existsSync(DATA_FILE)) {
    return null;
  }
  const text = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(text);
}
```

It returns the saved budget object, or `null` if there is no file yet (the very first run). Returning `null` for "nothing there" lets `main` decide what to do about it.

Now the start of `main`. Replace these four lines:

```js
  const name = askForText("What is your name? ", "friend");
  const income = askForAmount("Monthly income: R");
  const budget = { name: name, income: income, expenses: [] };
  saveBudget(budget);
```

with this:

```js
  let budget = loadBudget();
  if (budget === null) {
    const name = askForText("What is your name? ", "friend");
    const income = askForAmount("Monthly income: R");
    budget = { name: name, income: income, expenses: [] };
    saveBudget(budget);
  } else {
    console.log(`Welcome back, ${budget.name}! You have ${budget.expenses.length} saved expense(s).`);
  }
```

Two details to notice:

- `budget` is now `let`, not `const`, because on the first run we assign it a second time (`budget = { ... }`) after `loadBudget` returned `null`.
- The first-run questions only happen when there is no saved file. On every later run, the budget comes from the file.

Last of all, change the comment on the first line of the file to say which stage this is:

```js
// Budget Buddy — stage 6: real records, saved to disk
```

## Try the finished program

Run it, add a couple of expenses, and quit:

```text
=== Budget Buddy ===
What is your name? Naledi
Monthly income: R12000

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Quit
Choose 1-6: 1
What was it for? Taxi to work
Amount: R18
Category (e.g. food, transport): Transport
  Added Taxi to work for R18.00.

...
Choose 1-6: 6
Goodbye, Naledi! Your data is saved in budget.json.
```

Now run it **again**. This is the moment the whole phase has been building towards:

```text
=== Budget Buddy ===
Welcome back, Naledi! You have 2 saved expense(s).

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Quit
Choose 1-6: 1
What was it for? Airtime
Amount: R50
Category (e.g. food, transport): phone
  Added Airtime for R50.00.

...
Choose 1-6: 5
  transport: R18.00
  food: R850.40
  phone: R50.00

...
Choose 1-6: 3
  1. Taxi to work (transport): R18.00
  2. Groceries (food): R850.40
  3. Airtime (phone): R50.00
Number to remove: 1
  Removed Taxi to work.
```

It remembered. Your program now has a memory that outlives it.

::: try Start fresh
To start over with a new name and income, delete `budget.json`. Make sure you are in the `budget-buddy` folder, then:

- macOS and Linux: `rm budget.json`
- Windows (Command Prompt): `del budget.json` (in PowerShell, `rm` or `del` both work)
- Or right-click `budget.json` in VS Code's explorer and choose **Delete**.

Run Budget Buddy again. With no file, `loadBudget` returns `null`, and it asks for your name and income as on the very first run.

You can also edit `budget.json` by hand, for example to change your income. Save the file, then run the program. Be careful to keep it valid JSON (double quotes, no trailing commas). If you break it, the program will crash on start with a `SyntaxError` from `JSON.parse`. Fix the file, or delete it to start fresh.
:::

## Check your work

Go through this list. Each item should work:

- The first run asks for your name and income, and creates `budget.json`.
- Adding asks for a description, an amount and a category. An empty description becomes "Something" and an empty category becomes "other".
- "Food" and "food" are counted as the same category.
- The list shows `1. Groceries (food): R850.40`.
- Removing by number works and shows `Removed Groceries.`
- The summary shows the largest expense with its description, and has no "Largest" line when there are no expenses.
- Totals by category shows one line per category, or `No expenses yet.`
- After quitting and running again, you are welcomed back and all your expenses are still there.
- Deleting `budget.json` starts fresh.

If something does not work, compare your code with the full solution below, one function at a time.

::: solution Full solution: Budget Buddy v6 (index.js)
```js
// Budget Buddy — stage 6: real records, saved to disk
const prompt = require("prompt-sync")();
const fs = require("fs");

const DATA_FILE = "budget.json";

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

function askForText(question, fallback) {
  const answer = prompt(question).trim();
  return answer || fallback;
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

function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

// ---------- saving and loading ----------

function loadBudget() {
  if (!fs.existsSync(DATA_FILE)) {
    return null;
  }
  const text = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(text);
}

function saveBudget(budget) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(budget, null, 2));
}

// ---------- calculations ----------

function totalSpent(expenses) {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

function largestExpense(expenses) {
  let largest = null;
  for (const expense of expenses) {
    if (largest === null || expense.amount > largest.amount) {
      largest = expense;
    }
  }
  return largest;
}

function categoryTotals(expenses) {
  const totals = {};
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }
  return totals;
}

// ---------- screens ----------

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Totals by category");
  console.log("6) Quit");
}

function describe(expense) {
  return `${expense.description} (${expense.category}): ${formatMoney(expense.amount)}`;
}

function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (let i = 0; i < expenses.length; i++) {
    console.log(`  ${i + 1}. ${describe(expenses[i])}`);
  }
}

function addExpense(budget) {
  const description = askForText("What was it for? ", "Something");
  const amount = askForAmount("Amount: R");
  const category = askForText("Category (e.g. food, transport): ", "other").toLowerCase();
  budget.expenses.push(createExpense(description, amount, category));
  saveBudget(budget);
  console.log(`  Added ${description} for ${formatMoney(amount)}.`);
}

function removeExpense(budget) {
  const expenses = budget.expenses;
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    saveBudget(budget);
    console.log(`  Removed ${removed[0].description}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}

function printSummary(budget) {
  const total = totalSpent(budget.expenses);
  const left = budget.income - total;
  const largest = largestExpense(budget.expenses);
  console.log(`  Income:    ${formatMoney(budget.income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${budget.expenses.length} expense(s)`);
  if (largest !== null) {
    console.log(`  Largest:   ${describe(largest)}`);
  }
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(budget.income, left)}`);
}

function printCategoryTotals(expenses) {
  const totals = categoryTotals(expenses);
  const categories = Object.keys(totals);
  if (categories.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (const category of categories) {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  }
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");

  let budget = loadBudget();
  if (budget === null) {
    const name = askForText("What is your name? ", "friend");
    const income = askForAmount("Monthly income: R");
    budget = { name: name, income: income, expenses: [] };
    saveBudget(budget);
  } else {
    console.log(`Welcome back, ${budget.name}! You have ${budget.expenses.length} saved expense(s).`);
  }

  let running = true;
  while (running) {
    showMenu();
    const choice = prompt("Choose 1-6: ").trim();

    if (choice === "1") {
      addExpense(budget);
    } else if (choice === "2") {
      listExpenses(budget.expenses);
    } else if (choice === "3") {
      removeExpense(budget);
    } else if (choice === "4") {
      printSummary(budget);
    } else if (choice === "5") {
      printCategoryTotals(budget.expenses);
    } else if (choice === "6") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 6.");
    }
  }

  console.log(`Goodbye, ${budget.name}! Your data is saved in ${DATA_FILE}.`);
}

main();
```
:::

::: challenge Stretch goals
Pick one or more. Each uses only what you have learned so far.

1. **A safety net.** Right now a damaged `budget.json` crashes the program on start. Wrap the `JSON.parse` in `loadBudget` in the `try`/`catch` pattern from [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json), so a broken file prints a warning and starts a new budget instead.
2. **Change income.** Add a menu option that asks for a new monthly income, stores it in `budget.income`, and saves.
3. **Percentages.** In the category report, also show what percentage of total spending each category is, for example `food: R850.40 (98%)`.
4. **Bring back the average.** Add an "Average" line to the summary, using `totalSpent`.
:::

::: solution Stretch goal 1: a safety net in loadBudget
```js
function loadBudget() {
  if (!fs.existsSync(DATA_FILE)) {
    return null;
  }
  const text = fs.readFileSync(DATA_FILE, "utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log(`  Warning: ${DATA_FILE} is damaged (${error.message}).`);
    console.log("  Starting a new budget. Your old file will be replaced when you save.");
    return null;
  }
}
```
With a half-written file, the program now starts like this instead of crashing:
```text
=== Budget Buddy ===
  Warning: budget.json is damaged (Unexpected end of JSON input).
  Starting a new budget. Your old file will be replaced when you save.
What is your name? 
```
Returning `null` reuses the existing "first run" path in `main`, so no other code has to change.

For goal 3, inside the loop in `printCategoryTotals`, work out `const percent = Math.round(totals[category] / totalSpent(expenses) * 100);` and add `(${percent}%)` to the line.
:::

::: connect
**This used:** objects and dot notation ([Objects](#/phase-06-objects/01-what-is-an-object)), a list of objects and the "keep the best object" pattern ([Lists of objects](#/phase-06-objects/02-arrays-of-objects)), a factory function ([Objects and functions together](#/phase-06-objects/03-objects-and-functions)), shared references between `main` and the functions ([Copies and references](#/phase-06-objects/04-values-and-references)), and JSON with `fs` ([Saving data with JSON](#/phase-06-objects/05-saving-data-with-json)).

**Next:** Phase 7 gives you powerful shortcuts for working with lists. In [Budget Buddy v7](#/phase-07-functions-as-values/08-project-budget-buddy-v7) you will add reports (filter by category, the top 3 expenses, a search) in a few clear lines each, and rewrite some of today's loops with `reduce` and friends. It starts with [Passing functions to functions](#/phase-07-functions-as-values/01-passing-functions-to-functions).
:::

::: recap
- Each expense is now an object, `{ description, amount, category }`, made by the `createExpense` factory so every expense has the same shape.
- Changing the shape of data means updating every piece of code that reads it. The `toFixed` crash in step 2 showed where.
- `largestExpense` keeps the whole object, so the summary can say *what* the biggest expense was.
- `categoryTotals` uses an **object as a tally**: `totals[c] = (totals[c] || 0) + amount`, one key per category, created the first time it is seen.
- All the data lives in one `budget` object. Functions receive a reference to it, so their changes are seen by `main`.
- `saveBudget` writes the budget as JSON after every change, and `loadBudget` reads it back on start, or returns `null` on the first run.
:::

::: checkpoint
- [ ] I saved a copy of my v5 code before starting
- [ ] I saw the `amount.toFixed is not a function` crash in step 2, understood it, and fixed it in step 3
- [ ] Totals by category shows the right totals, and "Food" and "food" count together
- [ ] I watched `budget.json` change in VS Code as I added and removed expenses
- [ ] I quit, ran Budget Buddy again, and it welcomed me back with my expenses
- [ ] I deleted `budget.json` and saw the program start fresh
- [ ] I tried at least one stretch goal
:::

::: resources
- **javascript.info, "JSON methods, toJSON":** https://javascript.info/json. More on how objects become JSON and back.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `categoryTotals` with a small array of expenses, and watch the tally object grow key by key.
- **Node.js documentation, "File system":** https://nodejs.org/api/fs.html. The official reference for `fs`. It is dense, so only look up `readFileSync`, `writeFileSync` and `existsSync` for now.
:::
