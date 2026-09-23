---
title: "Project: Budget Buddy, finished"
summary: Put Budget Buddy under Git, split it into four tidy modules one careful step at a time, add a start script and a README, and call it done.
minutes: 90
stage: Phase 8
---

## What you will build

Your Budget Buddy already works. It has a menu, it stores expenses as objects, it saves to `budget.json`, and it has reports built with array methods. It is also one `index.js` file of more than 200 lines.

In this final project lesson you will not add a single new feature. Instead you will do what professional programmers spend a lot of their time doing: make working code **easier to live with**. By the end, Budget Buddy will:

- Be tracked in **Git**, with a commit after every step, so you can always get back to a working version
- Be **split into four files**, each with one clear job:

| File | Job |
|---|---|
| `index.js` | Talks to the user: menu, questions, printing |
| `money.js` | Formatting money, checking amounts, budget status |
| `storage.js` | Saving to and loading from `budget.json` |
| `reports.js` | Calculations on the list of expenses |

- Start with **`pnpm start`**
- Have a **README** that tells anyone what it is and how to run it

And it will behave **exactly** the same as it does now. Changing the structure of code without changing what it does is called **refactoring**, and you first met it in [Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4).

**Before this:** [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files), [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git), and your finished [Budget Buddy v7](#/phase-07-functions-as-values/08-project-budget-buddy-v7).

## Where you are starting from

Open your `budget-buddy` folder in VS Code. You should have:

- `index.js`: your Budget Buddy v7
- `package.json` and `pnpm-lock.yaml`
- `node_modules/` (with `prompt-sync` inside)
- `budget.json`, if you have run the program and added some expenses

Your `index.js` should be close to the stage 7 reference solution from [Budget Buddy v7](#/phase-07-functions-as-values/08-project-budget-buddy-v7). If yours is quite different, or unfinished, copy that reference solution into `index.js` now so that we start from the same place. The steps below name the functions from that version.

Run it once to make sure it works. From inside the `budget-buddy` folder:

```bash
node index.js
```

Add an expense or two if you have none, look at the summary (option 4), then quit with 9. If you have saved data, you will be welcomed back:

```text
=== Budget Buddy ===
Welcome back, Kagiso! You have 2 saved expense(s).
```

## Plan it first

Remember [the problem-solving method](#/phase-08-becoming-a-programmer/01-solving-problems): understand, plan, then build in small steps.

**Understand.** The goal is the same program, arranged in four files. Success means every menu option does exactly what it did before.

**Plan.** Sort every function in `index.js` into a drawer. The rule for deciding: **anything that talks to the user (prompt or console.log) stays in `index.js`**. Everything else moves to the module that matches its job.

| Function (or value) | Talks to the user? | Goes to |
|---|---|---|
| `formatMoney`, `isValidAmount`, `statusFor` | no | `money.js` |
| `DATA_FILE`, `loadBudget`, `saveBudget` (and `require("fs")`) | no | `storage.js` |
| `createExpense`, `totalSpent`, `topExpenses`, `largestExpense`, `categoryTotals`, `inCategory`, `searchExpenses` | no | `reports.js` |
| `askForAmount`, `askForText` | yes (prompt) | stays in `index.js` |
| `showMenu`, `describe`, `listExpenses`, `addExpense`, `removeExpense`, all the `print…` functions, `main` | yes | stays in `index.js` |

(`describe` does not print by itself, but it builds text purely for the screen, so it lives with the screens.)

**Build in small steps.** Move **one module at a time**, then run the program and try the menu options that use what you moved, then commit. If something breaks, you only have one small step to look at, and Git can take you back.

::: warn Why one module at a time?
It is tempting to create all three files in one go. Please do not. If you move twenty functions and the program crashes, the mistake could be in any of them. If you move three and it crashes, it is one of three. This is the "run often" habit from Phase 8, applied to a real project.
:::

## Step 1: put Budget Buddy under Git

Before changing anything, make a save point of the working version.

1. In the terminal, make sure you are inside `budget-buddy`.
2. Create a file called `.gitignore` in the `budget-buddy` folder with these two lines:
   ```text
   node_modules/
   budget.json
   ```
   `node_modules/` stays out for the usual reason: `pnpm install` can recreate it. `budget.json` stays out because it is **your personal data**, not part of the program. Someone else who downloads Budget Buddy should start with their own empty budget, not see your grocery bill.
3. Start the repository and check what Git sees:
   ```bash
   git init
   git status
   ```
   You should see something like:
   ```text
   On branch main

   No commits yet

   Untracked files:
     (use "git add <file>..." to include in what will be committed)
   	.gitignore
   	index.js
   	package.json
   	pnpm-lock.yaml

   nothing added to commit but untracked files present (use "git add" to track)
   ```
   No `node_modules/` and no `budget.json`. The `.gitignore` is working.
4. Make the first commit:
   ```bash
   git add .
   git commit -m "Budget Buddy v7: reports with array methods"
   ```

Now, whatever happens next, `git restore index.js` gets you back to a working program.

::: quiz
Before running `git init`, you made a spare copy of your data called `budget-backup.json`. The folder now contains `.gitignore`, `index.js`, `package.json`, `pnpm-lock.yaml`, `budget.json`, `budget-backup.json` and `node_modules/`. The `.gitignore` is the one above. Which of these files does `git status` list as untracked?

- [ ] Only `.gitignore`, `index.js`, `package.json` and `pnpm-lock.yaml`
- [x] `.gitignore`, `budget-backup.json`, `index.js`, `package.json` and `pnpm-lock.yaml`
- [ ] All of them except `node_modules/`
- [ ] `.gitignore`, `budget-backup.json`, `index.js`, `node_modules/`, `package.json` and `pnpm-lock.yaml`

The line `budget.json` in `.gitignore` matches that exact file name and nothing else, so `budget-backup.json` is still listed, and your personal data would go into the next commit. `node_modules/` stays hidden as usual. If you picked the first option, you assumed Git ignores anything that looks similar. It does not: to keep the backup out too, add its name as another line in `.gitignore` (or delete the backup).
:::

## Step 2: move the money helpers into `money.js`

These three functions are about amounts of money, and none of them prints or asks anything. They are the easiest to move, so they go first.

1. Create a new file in the `budget-buddy` folder called `money.js`.
2. In `index.js`, find `formatMoney`, `isValidAmount` and `statusFor`. **Cut** each one (Ctrl+X on Windows and Linux, Cmd+X on macOS) and paste it into `money.js`. Cut, not copy: each function should live in exactly one place.
3. Add a comment at the top and the export line at the bottom, so `money.js` looks like this:

```js
// money.js — everything about amounts of money

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

function statusFor(income, left) {
  if (left < 0) {
    return "OVERSPENT";
  }
  if (left > income * 0.2) {
    return "HEALTHY";
  }
  return "TIGHT";
}

module.exports = { formatMoney, isValidAmount, statusFor };
```

4. At the top of `index.js`, under the other `require` lines, bring them back in:

```js
const prompt = require("prompt-sync")();
const fs = require("fs");
const { formatMoney, isValidAmount, statusFor } = require("./money");
```

::: try Check step 2
Run `node index.js` and test **every option that uses what you moved**:

- Option **4** (summary) uses `formatMoney` and `statusFor`. The summary should look exactly as before.
- Option **1** (add) uses `isValidAmount` inside `askForAmount`. Try typing `abc` as the amount: you should still get `  Please enter a number of 0 or more.` Then type a real amount.

Why test the options and not only start the program? Because JavaScript only discovers a missing function **when it tries to call it**. If you cut `formatMoney` but forgot the `require` line, the program starts and shows the menu perfectly, then crashes the moment you choose 4:

```text
ReferenceError: formatMoney is not defined
    at printSummary (/Users/you/budget-buddy/index.js:128:15)
```

Read the stack trace as in [Debugging](#/phase-08-becoming-a-programmer/02-debugging): it broke inside `printSummary`, because the name `formatMoney` does not exist in `index.js` any more. The fix is the `require` line.

**When everything works**, commit:

```bash
git add .
git commit -m "Move money helpers into money.js"
```
:::

## Step 3: move saving and loading into `storage.js`

`loadBudget` and `saveBudget` are the only functions that touch the file system. They need `fs` and `DATA_FILE`, so those move too.

1. Create `storage.js`.
2. Cut `const fs = require("fs");`, `const DATA_FILE = "budget.json";`, `loadBudget` and `saveBudget` out of `index.js` and into `storage.js`.
3. Add the export line. `index.js` still needs `DATA_FILE`, for the goodbye message at the end of `main`, so export it along with the two functions:

```js
// storage.js — saving and loading the budget file

const fs = require("fs");

const DATA_FILE = "budget.json";

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

module.exports = { DATA_FILE, loadBudget, saveBudget };
```

4. Delete the now-empty `// ---------- saving and loading ----------` heading from `index.js`, and change the top of `index.js` to:

```js
const prompt = require("prompt-sync")();
const { formatMoney, isValidAmount, statusFor } = require("./money");
const { DATA_FILE, loadBudget, saveBudget } = require("./storage");
```

Notice `index.js` no longer requires `fs` at all. It does not need to know *how* the budget is saved, only that `saveBudget` does it. That is a sign of a good split.

::: note A module can require modules too
`storage.js` requires the built-in `fs` module. Any module can require others. The only thing to avoid is two of your files requiring *each other*.
:::

::: try Check step 3
1. Run `node index.js`. You should be **welcomed back** with your saved expenses. That proves `loadBudget` works from its new home.
2. Add an expense (option 1), then quit (option 9). The goodbye line should still say `Your data is saved in budget.json.`, which proves `DATA_FILE` came across.
3. Run it again. The expense you added a moment ago should be counted in the welcome message. That proves `saveBudget` works.
4. **Predict:** suppose you had left `DATA_FILE` out of the `module.exports` line in `storage.js`, but kept it in the `require` line in `index.js`. Would the program crash? When would you notice? (It would not crash at all. Everything works until you quit, and then the goodbye line says `Your data is saved in undefined.` Destructuring a name that is not in the object quietly gives `undefined`. That is a *quiet* bug, the kind from [Debugging](#/phase-08-becoming-a-programmer/02-debugging), and only testing every option finds it.)
5. Commit:
   ```bash
   git add .
   git commit -m "Move saving and loading into storage.js"
   ```
:::

## Step 4: move the calculations into `reports.js`

This is the biggest move: `createExpense` and all six calculation functions. They take data in and return answers. None of them prints or asks.

1. Create `reports.js`.
2. Cut `createExpense` (from the helpers section) and everything in the `// ---------- calculations (now with array methods) ----------` section out of `index.js`, and paste them into `reports.js`. Delete the now-empty calculations heading from `index.js`.
3. `largestExpense` uses `topExpenses`, so they must be in the same file. They are.
4. Tidy the order so each function comes after the ones it uses, add a comment explaining the file's rule, and export all seven:

```js
// reports.js — calculations on the list of expenses.
// Nothing in here prints or asks questions: data in, answer out.

function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);

// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);

function largestExpense(expenses) {
  if (expenses.length === 0) {
    return null;
  }
  return topExpenses(expenses, 1)[0];
}

function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});
}

const inCategory = (expenses, category) =>
  expenses.filter((expense) => expense.category === category);

const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));

module.exports = {
  createExpense,
  totalSpent,
  topExpenses,
  largestExpense,
  categoryTotals,
  inCategory,
  searchExpenses,
};
```

The export object is spread over several lines because it is long. JavaScript does not mind, and it is much easier to read. The comma after the last item is allowed and is common, because it means adding an eighth function later only changes one line.

5. Import them at the top of `index.js`. With seven names, the same one-per-line layout helps:

```js
const prompt = require("prompt-sync")();
const { formatMoney, isValidAmount, statusFor } = require("./money");
const { DATA_FILE, loadBudget, saveBudget } = require("./storage");
const {
  createExpense,
  totalSpent,
  topExpenses,
  largestExpense,
  categoryTotals,
  inCategory,
  searchExpenses,
} = require("./reports");
```

::: try Check step 4
This step touched the most code, so test the most options. With a few saved expenses in at least two categories, run `node index.js` and try:

- **1** Add an expense (uses `createExpense`)
- **4** Summary (uses `totalSpent` and `largestExpense`)
- **5** Totals by category (uses `categoryTotals`)
- **6** One category (uses `inCategory` and `totalSpent`)
- **7** Top 3 (uses `topExpenses`)
- **8** Search (uses `searchExpenses`)

With the two expenses from the sample data, options 5 and 7 look like this:

```text
Choose 1-9: 5
  transport: R560.00
  food: R1850.50
```

```text
Choose 1-9: 7
  #1 Groceries (food): R1850.50
  #2 Taxi to work (transport): R560.00
```

Your numbers will be your own. What matters is that every option gives the same answers as before the move. If one crashes with `… is not defined` or `… is not a function`, check that name in three places: the function in `reports.js`, the `module.exports` list, and the `require` list in `index.js`.

When all six options work, commit:

```bash
git add .
git commit -m "Move calculations into reports.js"
```
:::

::: quiz
Suppose that in step 4 you made one slip: the `require` line in `index.js` lists every name from `reports.js` **except** `topExpenses`. `reports.js` itself is exactly as shown above. You run `node index.js`. What happens?

- [ ] It crashes straight away, before showing the menu
- [ ] Option 4 (summary) and option 7 (top 3) both crash
- [ ] Everything works, because `topExpenses` is in `module.exports`
- [x] Option 4 works, but option 7 crashes with `ReferenceError: topExpenses is not defined`

Option 4 calls `largestExpense`, which `index.js` did import. `largestExpense` lives in `reports.js` and calls `topExpenses` there, where that name exists. So option 4 works. Option 7 calls `topExpenses` from inside `index.js`, where the name was never created, so it crashes the moment you choose it. Exporting a function only makes it *available*; each file must still take it out with `require`. And the program starting fine proves nothing, which is why you test every option.
:::

## Step 5: tidy `index.js`

Scroll through `index.js` now. It is still under 190 lines, but every one of them is about talking to the user. Two small tidy-ups:

1. The comment on the first line still says stage 7. Replace it with a description of what the file is now:
   ```js
   // Budget Buddy — finished. index.js is the part that talks to the user;
   // the maths, the reports and the file handling live in their own modules.
   ```
2. The `// ---------- small helpers ----------` heading now only sits above `askForAmount` and `askForText`. Rename it to say what they are:
   ```js
   // ---------- asking questions ----------
   ```

Run the program one more time, then commit:

```bash
git add .
git commit -m "Tidy comments in index.js"
```

## Step 6: a `start` script in `package.json`

Open `package.json`. You added a `start` script back in [Budget Buddy v1](#/phase-01-storing-information/09-project-budget-buddy-v1), so it should already contain `"start": "node index.js"`. While you are here, give the project a proper description. The finished file looks like this:

```json
{
  "name": "budget-buddy",
  "version": "1.0.0",
  "description": "A small command-line money tracker, built while learning to program.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "license": "ISC",
  "dependencies": {
    "prompt-sync": "^4.2.0"
  }
}
```

Yours may have a couple of extra lines that `pnpm init` added, such as `"keywords": []`, `"author": ""` or a `"test"` script. You can keep them or remove them; either is fine. Your `prompt-sync` version number may be slightly different too. Be careful with commas: every line inside `{ }` needs a comma after it, **except the last one**.

Now start the program the way other people will:

```bash
pnpm start
```

You should see pnpm show the command it is running, after a `$`, then Budget Buddy:

```text
$ node index.js
=== Budget Buddy ===
```

Why bother, when `node index.js` works? Because `start` is a **convention**: almost every Node project has one, and `pnpm start` (or `npm start`, for people who use npm) runs it. Someone who has never seen your project knows they can type it. They do not need to know which file is the main one.

Commit:

```bash
git add package.json
git commit -m "Add description and start script to package.json"
```

::: quiz
Later, you add a second script to Budget Buddy's `package.json`:

```json
  "scripts": {
    "start": "node index.js",
    "update": "node update-categories.js"
  },
```

Which command runs `update-categories.js`?

- [ ] `pnpm update`
- [ ] `pnpm start update`
- [ ] `node update`
- [x] `pnpm run update`

`update` is also one of pnpm's own commands (it updates your installed packages), so `pnpm update` would do pnpm's job and never run your script. `pnpm run update` always means "run my script called `update`". `pnpm start update` runs the `start` script, and `node update` looks for a file called `update`, not a script. When in doubt, use `pnpm run`.
:::

## Step 7: write a README

A **README** is a file that explains a project to someone seeing it for the first time: what it does, how to run it, and how it is organised. Almost every project in the world has one, usually called `README.md`. The `.md` means it is written in **Markdown**, a simple way of formatting plain text: `#` for headings, `-` for bullet points, and backticks for code. (The lessons in this course are written in Markdown too.)

Create `README.md` in the `budget-buddy` folder:

~~~markdown
# Budget Buddy

A small money tracker that runs in the terminal. I built it while learning to program.

## What it does

- Asks for your name and monthly income the first time it runs
- Lets you add expenses with a description, amount and category
- Lists, removes and searches expenses
- Shows a summary, totals per category, and your top 3 biggest expenses
- Saves everything to `budget.json`, so your data is still there next time

## How to run it

You need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

```bash
pnpm install
pnpm start
```

## How the code is organised

| File | Job |
|---|---|
| `index.js` | Talks to the user: menu, questions, printing |
| `money.js` | Formatting money, checking amounts, budget status |
| `reports.js` | Calculations on the list of expenses |
| `storage.js` | Saving to and loading from `budget.json` |
~~~

Make it yours: change the first line, add your name, or a line about what you learned. To see it nicely formatted in VS Code, open `README.md` and press **Ctrl+Shift+V** (Windows and Linux) or **Cmd+Shift+V** (macOS) for the preview.

Notice the "How to run it" section says `pnpm install` first. Because `node_modules` is not in Git, anyone who copies your project runs `pnpm install` to download `prompt-sync`, at exactly the version recorded in `pnpm-lock.yaml`. (Strictly, `pnpm start` would notice the missing `node_modules` and install the packages itself before running, but writing both steps is the usual habit.)

Commit:

```bash
git add README.md
git commit -m "Add a README"
```

## Step 8: look at the story you wrote

```bash
git log --oneline
```

You should see something like this (your hashes will be different):

```text
e226fb4 Add a README
6cf2631 Add description and start script to package.json
a9f489b Tidy comments in index.js
1b2b5c9 Move calculations into reports.js
76a804d Move saving and loading into storage.js
fe6a2cf Move money helpers into money.js
cf27202 Budget Buddy v7: reports with array methods
```

Read it from the bottom up. It tells the story of this lesson, one working step at a time. That is what a good Git history looks like.

::: project Your finished Budget Buddy
Before you open the full solution, check your project against this list:

1. The folder contains `index.js`, `money.js`, `storage.js`, `reports.js`, `package.json`, `README.md` and `.gitignore` (plus `pnpm-lock.yaml`, `node_modules/` and your `budget.json`).
2. `money.js`, `storage.js` and `reports.js` each end with a `module.exports` line, and contain **no** `prompt` and **no** `console.log`.
3. `index.js` requires all three with `./`, and no longer requires `fs`.
4. Every menu option, 1 to 9, works exactly as it did in v7.
5. `pnpm start` runs the program.
6. `git status` says `nothing to commit, working tree clean`, and `git log --oneline` shows a commit for each step.
7. `git status` never lists `node_modules/` or `budget.json`.
:::

::: solution Full solution: Budget Buddy, finished (stage 8)
**`index.js`**

```js
// Budget Buddy — finished. index.js is the part that talks to the user;
// the maths, the reports and the file handling live in their own modules.
const prompt = require("prompt-sync")();
const { formatMoney, isValidAmount, statusFor } = require("./money");
const { DATA_FILE, loadBudget, saveBudget } = require("./storage");
const {
  createExpense,
  totalSpent,
  topExpenses,
  largestExpense,
  categoryTotals,
  inCategory,
  searchExpenses,
} = require("./reports");

// ---------- asking questions ----------

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

// ---------- screens ----------

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Totals by category");
  console.log("6) Show one category");
  console.log("7) Top 3 biggest expenses");
  console.log("8) Search by description");
  console.log("9) Quit");
}

function describe(expense) {
  return `${expense.description} (${expense.category}): ${formatMoney(expense.amount)}`;
}

function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  expenses.forEach((expense, index) => {
    console.log(`  ${index + 1}. ${describe(expense)}`);
  });
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
  categories.forEach((category) => {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  });
}

function printOneCategory(expenses) {
  const category = askForText("Which category? ", "other").toLowerCase();
  const matches = inCategory(expenses, category);
  if (matches.length === 0) {
    console.log(`  Nothing in "${category}".`);
    return;
  }
  matches.forEach((expense) => console.log(`  - ${describe(expense)}`));
  console.log(`  Total for ${category}: ${formatMoney(totalSpent(matches))}`);
}

function printTopThree(expenses) {
  const top = topExpenses(expenses, 3);
  if (top.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  top.forEach((expense, index) => console.log(`  #${index + 1} ${describe(expense)}`));
}

function printSearch(expenses) {
  const word = askForText("Search for: ", "");
  const matches = searchExpenses(expenses, word);
  if (matches.length === 0) {
    console.log(`  No expenses mention "${word}".`);
    return;
  }
  matches.map(describe).forEach((line) => console.log(`  - ${line}`));
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
    const choice = prompt("Choose 1-9: ").trim();

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
      printOneCategory(budget.expenses);
    } else if (choice === "7") {
      printTopThree(budget.expenses);
    } else if (choice === "8") {
      printSearch(budget.expenses);
    } else if (choice === "9") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 9.");
    }
  }

  console.log(`Goodbye, ${budget.name}! Your data is saved in ${DATA_FILE}.`);
}

main();
```

**`money.js`**

```js
// money.js — everything about amounts of money

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

function statusFor(income, left) {
  if (left < 0) {
    return "OVERSPENT";
  }
  if (left > income * 0.2) {
    return "HEALTHY";
  }
  return "TIGHT";
}

module.exports = { formatMoney, isValidAmount, statusFor };
```

**`storage.js`**

```js
// storage.js — saving and loading the budget file

const fs = require("fs");

const DATA_FILE = "budget.json";

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

module.exports = { DATA_FILE, loadBudget, saveBudget };
```

**`reports.js`**

```js
// reports.js — calculations on the list of expenses.
// Nothing in here prints or asks questions: data in, answer out.

function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);

// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);

function largestExpense(expenses) {
  if (expenses.length === 0) {
    return null;
  }
  return topExpenses(expenses, 1)[0];
}

function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});
}

const inCategory = (expenses, category) =>
  expenses.filter((expense) => expense.category === category);

const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));

module.exports = {
  createExpense,
  totalSpent,
  topExpenses,
  largestExpense,
  categoryTotals,
  inCategory,
  searchExpenses,
};
```

**`package.json`**

```json
{
  "name": "budget-buddy",
  "version": "1.0.0",
  "description": "A small command-line money tracker, built while learning to program.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "license": "ISC",
  "dependencies": {
    "prompt-sync": "^4.2.0"
  }
}
```

**`README.md`**

~~~markdown
# Budget Buddy

A small money tracker that runs in the terminal. I built it while learning to program.

## What it does

- Asks for your name and monthly income the first time it runs
- Lets you add expenses with a description, amount and category
- Lists, removes and searches expenses
- Shows a summary, totals per category, and your top 3 biggest expenses
- Saves everything to `budget.json`, so your data is still there next time

## How to run it

You need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

```bash
pnpm install
pnpm start
```

## How the code is organised

| File | Job |
|---|---|
| `index.js` | Talks to the user: menu, questions, printing |
| `money.js` | Formatting money, checking amounts, budget status |
| `reports.js` | Calculations on the list of expenses |
| `storage.js` | Saving to and loading from `budget.json` |
~~~

**`.gitignore`**

```text
node_modules/
budget.json
```
:::

## Look back at what you built

Budget Buddy started in Phase 1 as a dozen lines that asked five questions and did some subtraction. Look at where each part of it came from:

| Idea | Where it is in Budget Buddy |
|---|---|
| [Variables](#/phase-01-storing-information/02-variables) and [input](#/phase-01-storing-information/08-getting-input-from-the-user) | `income`, `choice`, every `prompt(...)` |
| [Decisions](#/phase-02-making-decisions/02-if-and-else) | `statusFor`, the menu's `else if` chain, the remove range check |
| [Loops](#/phase-03-loops/05-break-continue-nested) | the menu loop, "keep asking until valid" in `askForAmount` |
| [Functions](#/phase-04-functions/06-designing-with-functions) | every screen and every calculation has its own name and one job |
| [Arrays](#/phase-05-arrays/02-changing-arrays) | `budget.expenses`, `push`, `splice` |
| [Objects](#/phase-06-objects/03-objects-and-functions) and [JSON](#/phase-06-objects/05-saving-data-with-json) | each expense, the whole budget, and `budget.json` |
| [Array methods](#/phase-07-functions-as-values/07-sort-and-chaining) | `reduce`, `filter`, `sort`, `map` and `forEach` in the reports |
| [Modules](#/phase-08-becoming-a-programmer/03-splitting-code-into-files) and [Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git) | four files with clear jobs, and a history of every step |

That is a real program. It takes input, validates it, stores structured data, saves it between runs, reports on it, and is organised so that someone else could find their way around it. Take a moment with that.

## Going further: feature ideas

Budget Buddy is yours now. Here are some features to add, roughly from easiest to hardest. For each one, use the problem-solving method, decide **which module** each new function belongs in, and commit after each working step.

- **Edit an expense.** A new menu option: list the expenses, ask for a number, then ask for a new amount (or description, or category). The asking belongs in `index.js`. The index checking is the same as in `removeExpense`, so consider giving that check its own function.
- **Monthly budgets per category.** Store a limit per category in the budget object, for example `limits: { food: 3000, transport: 1200 }`. Add a report that shows each category's total next to its limit, with a warning when it is over. The comparison logic is a pure function for `reports.js`; the printing stays in `index.js`.
- **Export to CSV.** A **CSV** file ("comma-separated values") is plain text with one row per line and commas between the values. Spreadsheet programs like Excel and Google Sheets open it directly. Build the text with `map` and `join` (a header line such as `description,amount,category`, then one line per expense), and write it to `expenses.csv` with `fs.writeFileSync`. The file-writing belongs in `storage.js`. (Watch out for descriptions that contain a comma. What would that do to the columns?)
- **Dates.** Ask for, or automatically record, the date of each expense, and add a report of spending per day.
- **Several months.** Save each month separately, for example `budget-2026-09.json`, and let the user choose which month to open.

::: connect
**This builds on:** every phase of the course, and in particular [modules](#/phase-08-becoming-a-programmer/03-splitting-code-into-files) and [Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git) from this one.

**This unlocks:** the rest of your programming life. [What to learn next](#/phase-08-becoming-a-programmer/06-what-to-learn-next) shows where you can go from here, and how everything you used in Budget Buddy carries over to other languages and to the web.
:::

::: challenge Edit an expense
Add menu option **9) Edit an expense** and move Quit to **10**. Editing should: list the expenses, ask which number to edit, check the number is valid, then ask for a new amount using `askForAmount`, save, and confirm with a message like `  Updated Taxi to work to R600.00.`

Do it in small steps, running after each one, and commit when it works.
:::

::: hint
The number-checking is exactly the same as in `removeExpense`: `const index = number - 1;` and `Number.isInteger(number) && index >= 0 && index < expenses.length`. Instead of `splice`, change the object in place: `expenses[index].amount = newAmount;`. Remember to update `showMenu`, the `prompt("Choose 1-9: ")` text, the menu's `else if` chain, and the "Please type a number from 1 to 9" message.
:::

::: solution
Add this function to `index.js` (it asks questions, so it belongs there):

```js
function editExpense(budget) {
  const expenses = budget.expenses;
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to edit: "));
  const index = number - 1;
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const newAmount = askForAmount("New amount: R");
    expenses[index].amount = newAmount;
    saveBudget(budget);
    console.log(`  Updated ${expenses[index].description} to ${formatMoney(newAmount)}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}
```

In `showMenu`, change the last line to `console.log("9) Edit an expense");` and add `console.log("10) Quit");`. In `main`, change the question to `prompt("Choose 1-10: ")`, add `} else if (choice === "9") { editExpense(budget);`, change the quit check to `choice === "10"`, and update the "from 1 to 9" message to "from 1 to 10".

A sample session:

```text
Choose 1-10: 9
  1. Taxi to work (transport): R560.00
  2. Groceries (food): R1850.50
Number to edit: 1
New amount: R600
  Updated Taxi to work to R600.00.
```

Then `git add .` and `git commit -m "Add edit an expense"`. Notice that `editExpense` and `removeExpense` share their first nine lines almost exactly. A lovely next refactor is a function `askForExpenseIndex(expenses)` that lists, asks, checks, and returns the index or `-1`.
:::

::: recap
- **Refactoring** changes how code is organised without changing what it does. Budget Buddy behaves exactly as before, but is far easier to work with.
- Put a project under **Git before** a big change, and **commit after each working step**.
- Split by job: `index.js` talks to the user; `money.js`, `storage.js` and `reports.js` take data in and give answers back.
- Move **one module at a time**, then run and test **every option that uses what you moved**, because a missing function only shows up when it is called.
- `.gitignore` keeps out `node_modules/` (recreated by `pnpm install`) and `budget.json` (personal data).
- `pnpm start` is the conventional way to run a Node project, and a **README** tells newcomers what the project is and how to run it.
:::

::: interview Why test menu options after moving a function, rather than only checking that the program starts?
JavaScript only notices that a function is missing when it actually tries to call it. The program can start and show the menu perfectly, then crash with `is not defined` the first time you choose the option that uses the moved function. So you have to exercise the code you moved.
:::

::: interview Why does `index.js` no longer need `require("fs")`?
All the file reading and writing moved into `storage.js`, which requires `fs` itself. `index.js` only calls `loadBudget` and `saveBudget`, and does not need to know how they work. Hiding that detail in one module means a change to how data is saved only touches `storage.js`.
:::

::: interview Why is `budget.json` in `.gitignore`?
It holds the user's personal data, not the program. It changes every time the program runs, and someone else who gets the project should start with their own empty budget rather than see yours.
:::

::: checkpoint
- [ ] I put Budget Buddy under Git with a `.gitignore` before changing anything
- [ ] I created `money.js`, tested options 1 and 4, and committed
- [ ] I created `storage.js`, checked saving and loading still worked, and committed
- [ ] I created `reports.js`, tested options 1 and 4 to 8, and committed
- [ ] `pnpm start` runs Budget Buddy
- [ ] I wrote a README and committed it
- [ ] `git log --oneline` tells the story of my refactor, one step per commit
:::

::: resources
- **pnpm Docs, "pnpm run":** https://pnpm.io/cli/run. How pnpm runs the scripts in `package.json`, including `start`.
- **pnpm Docs, "Working with Git":** https://pnpm.io/git. Why `pnpm-lock.yaml` goes into Git and `node_modules` does not.
- **GitHub Docs, "About READMEs":** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes. What makes a helpful README.
- **Markdown Guide, "Basic Syntax":** https://www.markdownguide.org/basic-syntax/. Headings, lists, links and code in Markdown, with examples.
:::
