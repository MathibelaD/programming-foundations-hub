---
title: "Project: Budget Buddy v7"
summary: Add real reports to Budget Buddy (one category, the top 3, category totals and a search) using array methods, and swap loops for methods only where it makes the code clearer.
minutes: 90
stage: Phase 7
---

## What you will build

At the end of Phase 6, Budget Buddy became a real app: each expense is an object with a description, amount and category, and everything is saved to `budget.json`. But it can only answer a few questions about your money: the total, the largest, and totals by category.

By the end of this lesson, Budget Buddy v7 will also:

- **show one category**: every food expense, and the food total,
- show your **top 3 biggest expenses**, sorted,
- work out **category totals with `reduce`**,
- **search** your expenses for a word in the description ("taxi", "sipho"), ignoring capital letters.

And some of the loops from earlier phases will become short, clear method calls, while the loops that are clearer as loops will stay exactly as they are.

Here is a taste of the finished program:

```text
Choose 1-9: 7
  #1 Groceries (food): R850.50
  #2 Electricity (bills): R650.00
  #3 Birthday gift for Sipho (gifts): R420.00

Choose 1-9: 8
Search for: taxi
  - Taxi to work (transport): R36.00
  - Taxi home (transport): R36.00
```

**Before this:** [sort, and chaining methods together](#/phase-07-functions-as-values/07-sort-and-chaining), and your Budget Buddy from [Project: Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6).

::: stop Save a copy of v6 first
Before changing anything, make a copy of your working v6 code. In VS Code, right-click `index.js` in `budget-buddy`, choose **Copy**, then **Paste**, and rename the copy to `index-v6.js`. Or, in a terminal inside `budget-buddy`:

- macOS and Linux: `cp index.js index-v6.js`
- Windows (Command Prompt or PowerShell): `copy index.js index-v6.js`

From now on, edit only `index.js`.

This lesson starts from the reference v6 code in [the Phase 6 project](#/phase-06-objects/06-project-budget-buddy-v6). If your v6 is a little different, that is fine. Follow the ideas, and compare with the full solution at the end.
:::

## Use the same test data as this lesson

Reports are only interesting with some data in them. So that your output matches this lesson exactly, we will use the same expenses. Your own `budget.json` is precious, so **back it up first**:

- macOS and Linux: `cp budget.json budget-mine.json`
- Windows: `copy budget.json budget-mine.json`

Then open `budget.json` in VS Code, replace everything in it with the text below, and save:

```json
{
  "name": "Thandi",
  "income": 12000,
  "expenses": [
    {
      "description": "Groceries",
      "amount": 850.5,
      "category": "food"
    },
    {
      "description": "Taxi to work",
      "amount": 36,
      "category": "transport"
    },
    {
      "description": "Electricity",
      "amount": 650,
      "category": "bills"
    },
    {
      "description": "Takeaways",
      "amount": 185,
      "category": "food"
    },
    {
      "description": "Airtime",
      "amount": 99,
      "category": "phone"
    },
    {
      "description": "Taxi home",
      "amount": 36,
      "category": "transport"
    },
    {
      "description": "Birthday gift for Sipho",
      "amount": 420,
      "category": "gifts"
    }
  ]
}
```

Run the program once to check it loads:

```bash
node index.js
```

You should be welcomed back:

```text
=== Budget Buddy ===
Welcome back, Thandi! You have 7 saved expense(s).
```

Choose `6` to quit for now. (When you have finished the lesson, you can copy `budget-mine.json` back over `budget.json` to get your own data back.)

## The plan

As always: small steps, and **run the program after every step**. In plain words:

1. List expenses with `forEach`.
2. Work out the total with `reduce`.
3. Category totals with `reduce`, and print them with `forEach`.
4. Make room in the menu for three new reports.
5. Report: show one category (`filter`).
6. Report: the top 3 (copy, `sort`, `slice`).
7. Reuse the top 3 idea for the largest expense.
8. Report: search by description (`filter` + `includes` + `toLowerCase`).
9. Look at the loops we kept, and why.

Open `~/budget-buddy/index.js` in VS Code, and a terminal inside the `budget-buddy` folder.

First, a tiny change so the file tells the truth. Change the comment on the first line to:

```js
// Budget Buddy — stage 7: reports with array methods
```

and the comment above `totalSpent` to:

```js
// ---------- calculations (now with array methods) ----------
```

## Step 1: list expenses with forEach

Find `listExpenses`. Its loop uses a counting `for` loop, because it needs the number of each expense:

```js
  for (let i = 0; i < expenses.length; i++) {
    console.log(`  ${i + 1}. ${describe(expenses[i])}`);
  }
```

This is the "do something with each item, and I need the index" job from [forEach](#/phase-07-functions-as-values/02-foreach). Replace those three lines with:

```js
  expenses.forEach((expense, index) => {
    console.log(`  ${index + 1}. ${describe(expense)}`);
  });
```

The whole function now looks like this:

```js
function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  expenses.forEach((expense, index) => {
    console.log(`  ${index + 1}. ${describe(expense)}`);
  });
}
```

Why is this clearer? `expenses[i]` has gone. The callback gets the expense itself, with a good name, and the index for the number. There is no `i < expenses.length` to get wrong.

Run it and choose `2`, then `6`:

```text
=== Budget Buddy ===
Welcome back, Thandi! You have 7 saved expense(s).

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Quit
Choose 1-6: 2
  1. Groceries (food): R850.50
  2. Taxi to work (transport): R36.00
  3. Electricity (bills): R650.00
  4. Takeaways (food): R185.00
  5. Airtime (phone): R99.00
  6. Taxi home (transport): R36.00
  7. Birthday gift for Sipho (gifts): R420.00

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Quit
Choose 1-6: 6
Goodbye, Thandi! Your data is saved in budget.json.
```

Exactly the same as before. That is the goal of a **refactor**: the code changes, the behaviour does not. From here on, the menu lines are left out of the sample sessions to save space (shown as `...`), but you will still see them on your screen.

## Step 2: the total with reduce

Here is `totalSpent` from v6. It is the accumulator pattern:

```js
function totalSpent(expenses) {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}
```

Adding up one property is exactly what [reduce](#/phase-07-functions-as-values/06-reduce) is best at. Replace the whole function with one line:

```js
const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);
```

Read it as a sentence: "total spent, for some expenses, is the expenses reduced by adding each amount to the total, starting at 0."

Two details:

- The starting value `0` matters. A brand-new user has no expenses, and `[].reduce(..., 0)` gives `0`. Without it, the summary would crash on an empty list.
- `totalSpent` is now an arrow function stored in a `const`. The other functions only *call* it while the program is running, after the whole file has been read, so it does not matter that it is no longer a declaration (see hoisting in [arrow functions](#/phase-04-functions/05-arrow-functions)).

Run it and choose `4`:

```text
Choose 1-6: 4
  Income:    R12000.00
  Spent:     R2276.50 across 7 expense(s)
  Largest:   Groceries (food): R850.50
  Left over: R9723.50
  Status:    HEALTHY
```

Same numbers as before the change.

## Step 3: category totals with reduce

`categoryTotals` builds a tally object with a loop:

```js
function categoryTotals(expenses) {
  const totals = {};
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }
  return totals;
}
```

Change it to use `reduce`, with `{}` as the starting value:

```js
function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});
}
```

Be honest with yourself here. Is this clearer than the loop? In [reduce](#/phase-07-functions-as-values/06-reduce) you saw that many programmers would say no. We are making the change so you practise reading and writing a `reduce` with an object, because you will meet this exact shape in other people's code. If you prefer the loop, you are allowed to keep it. Both are correct. Two things to check if you do use `reduce`: the `return totals;` line, and the `{}` at the very end.

While you are nearby, `printCategoryTotals` has a `for...of` loop that only prints:

```js
  for (const category of categories) {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  }
```

That is a `forEach` job. Change it to:

```js
  categories.forEach((category) => {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  });
```

Run it and choose `5`:

```text
Choose 1-6: 5
  food: R1035.50
  transport: R72.00
  bills: R650.00
  phone: R99.00
  gifts: R420.00
```

If you see `TypeError: Cannot read properties of undefined`, you have lost the `return totals;` line.

::: quiz
Someone changes `categoryTotals` to use a starting object made **outside** the function:

```js
const start = {};
function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, start);
}

const list = [
  { description: "Pap", amount: 50, category: "food" },
  { description: "Taxi", amount: 20, category: "transport" },
];
categoryTotals(list);
const second = categoryTotals(list);
console.log(second.food);
```

What does this print?

- [ ] `50`
- [x] `100`
- [ ] `NaN`
- [ ] `undefined`

`reduce` does not copy the starting value. Both calls use the **same** `start` object as their tally, so the second call adds on top of what the first call left there: 50 + 50. With `{}` written inside the call, as in the lesson, every call gets a brand-new empty object. If you picked `50`, you expected each call to start fresh.
:::

## Step 4: make room in the menu

We are about to add three reports. Let us add them to the menu first, with a "Coming soon" message, so that each later step only has to fill one in.

Change `showMenu` so the last line, `console.log("6) Quit");`, becomes four lines:

```js
  console.log("6) Show one category");
  console.log("7) Top 3 biggest expenses");
  console.log("8) Search by description");
  console.log("9) Quit");
```

In `main`, change the prompt to `"Choose 1-9: "`, and change the end of the `if` chain to:

```js
    } else if (choice === "6") {
      console.log("  Coming soon.");
    } else if (choice === "7") {
      console.log("  Coming soon.");
    } else if (choice === "8") {
      console.log("  Coming soon.");
    } else if (choice === "9") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 9.");
    }
```

Quit has moved from 6 to 9, so check all three places: the menu, the prompt, and the "I don't know" message.

Run it, choose `7`, then `9`:

```text
=== Budget Buddy ===
Welcome back, Thandi! You have 7 saved expense(s).

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Show one category
7) Top 3 biggest expenses
8) Search by description
9) Quit
Choose 1-9: 7
  Coming soon.

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Show one category
7) Top 3 biggest expenses
8) Search by description
9) Quit
Choose 1-9: 9
Goodbye, Thandi! Your data is saved in budget.json.
```

## Step 5: show one category

This report has two parts, and we will keep them separate, as you learned in [Designing with functions](#/phase-04-functions/06-designing-with-functions):

- a **calculation** that picks the matching expenses (no printing, no asking), and
- a **screen** function that asks, calls the calculation, and prints.

The calculation is a `filter`. Add it in the calculations section, after `categoryTotals`:

```js
const inCategory = (expenses, category) =>
  expenses.filter((expense) => expense.category === category);
```

The arrow was long, so it is split after the `=>`.

Now the screen function. Add it after `printCategoryTotals`:

```js
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
```

Look at what it reuses:

- `askForText` and `.toLowerCase()`, so "Food" finds the food expenses. Categories are stored in lower case when you add them, so both sides match.
- `filter` gives back `[]` when nothing matches, so `matches.length === 0` is a safe check.
- `totalSpent(matches)` works on *any* list of expenses, not only all of them. Because you wrote it as a small function in step 2, the category total is free.

Finally, in `main`, replace the "Coming soon" for option 6:

```js
    } else if (choice === "6") {
      printOneCategory(budget.expenses);
```

Run it. Choose `6` and type `Food` (with a capital), then `6` again and type `fun`, then `9`:

```text
Choose 1-9: 6
Which category? Food
  - Groceries (food): R850.50
  - Takeaways (food): R185.00
  Total for food: R1035.50

...
Choose 1-9: 6
Which category? fun
  Nothing in "fun".
```

## Step 6: the top 3 biggest expenses

The recipe from [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining): **copy, sort biggest first, slice**. Add this calculation after `inCategory`:

```js
// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);
```

The comment is there for the next person who reads the code (maybe you, in a month). Without the `[...]` copy, `sort` would rearrange `budget.expenses` itself, and the numbered list in option 2 would change order. Worse, "remove expense number 3" would then remove a different expense from the one you saw in the original order. The copy protects the order you entered them in.

`howMany` is a parameter, so the same function can give the top 3, the top 5 or the top 1.

Now the screen, after `printOneCategory`:

```js
function printTopThree(expenses) {
  const top = topExpenses(expenses, 3);
  if (top.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  top.forEach((expense, index) => console.log(`  #${index + 1} ${describe(expense)}`));
}
```

And in `main`, replace the "Coming soon" for option 7:

```js
    } else if (choice === "7") {
      printTopThree(budget.expenses);
```

Run it. Choose `7`, then `2` to check the list kept its order, then `9`:

```text
Choose 1-9: 7
  #1 Groceries (food): R850.50
  #2 Electricity (bills): R650.00
  #3 Birthday gift for Sipho (gifts): R420.00

...
Choose 1-9: 2
  1. Groceries (food): R850.50
  2. Taxi to work (transport): R36.00
  3. Electricity (bills): R650.00
  4. Takeaways (food): R185.00
  5. Airtime (phone): R99.00
  6. Taxi home (transport): R36.00
  7. Birthday gift for Sipho (gifts): R420.00
```

The list is still in the order the expenses were added. The copy did its job.

::: try Break it on purpose
Remove the `[...` and `]` from `topExpenses`, so it sorts `expenses` directly. Run the program, choose `7`, then `2`. Predict first: what order will the list be in?

You should see the list come out biggest first, because `sort` changed the real array. Now put the copy back, and run it again to check the list is back to normal. (Nothing was saved to the file, because only adding and removing save. That is lucky. In a bigger program, the scrambled order could easily have been saved.)
:::

::: quiz
Someone forgets the copy in `topExpenses`:

```js
const topExpenses = (expenses, howMany) =>
  expenses.sort((a, b) => b.amount - a.amount).slice(0, howMany);

const list = [
  { description: "Bread", amount: 20 },
  { description: "Rent", amount: 3000 },
  { description: "Data", amount: 150 },
];
const top = topExpenses(list, 1);
console.log(top.length, list[1].description);
```

What does this print?

- [ ] `1 Rent`
- [ ] `3 Data`
- [x] `1 Data`
- [ ] `1 Bread`

`slice(0, 1)` makes a new one-item array, so `top.length` is 1. But `sort` ran on `list` itself and rearranged it to Rent, Data, Bread, so `list[1]` is now Data. If you picked `1 Rent`, you expected `list` to keep its order. In Budget Buddy, that is what would make "remove expense number 2" remove the wrong one.
:::

## Step 7: the largest expense, reusing topExpenses

The summary's "Largest" line uses `largestExpense`, the "keep the best so far" loop from Phase 6:

```js
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

The largest expense is the "top 1". We already have a function for that. Change `largestExpense` to:

```js
function largestExpense(expenses) {
  if (expenses.length === 0) {
    return null;
  }
  return topExpenses(expenses, 1)[0];
}
```

`topExpenses(expenses, 1)` gives an array with one expense in it, and `[0]` takes that expense out. The empty-list check keeps the promise the old function made: return `null` when there are no expenses, which is what `printSummary` checks for.

::: note Is this better?
Honestly, it is a trade-off. The old loop only walks through the list once. The new version copies and sorts the whole list to find one item, which is more work for the computer. For a personal budget with a few hundred expenses, the difference is far too small to notice, and the new version is shorter and reuses code you have already tested. For a list of millions of items, the loop would be the better choice. Knowing that there *is* a trade-off is the important part.
:::

Run it and choose `4`:

```text
Choose 1-9: 4
  Income:    R12000.00
  Spent:     R2276.50 across 7 expense(s)
  Largest:   Groceries (food): R850.50
  Left over: R9723.50
  Status:    HEALTHY
```

Exactly as before. `printSummary` did not need to change at all, because `largestExpense` still takes the same input and gives the same kind of answer.

## Step 8: search by description

A search is a `filter` whose test uses `includes`, with both sides lower-cased so capital letters do not matter. You built this in [filter](#/phase-07-functions-as-values/04-filter). Add the calculation after `topExpenses`:

```js
const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));
```

And the screen, after `printTopThree`:

```js
function printSearch(expenses) {
  const word = askForText("Search for: ", "");
  const matches = searchExpenses(expenses, word);
  if (matches.length === 0) {
    console.log(`  No expenses mention "${word}".`);
    return;
  }
  matches.map(describe).forEach((line) => console.log(`  - ${line}`));
}
```

The last line is a small **chain**: `map` turns each matching expense into a display line using `describe`, passed by name with no brackets, and then `forEach` prints each line. Read it as: "the matches, described, each printed with a dash".

Replace the last "Coming soon" in `main`:

```js
    } else if (choice === "8") {
      printSearch(budget.expenses);
```

Run it. Search for `taxi`, then `SIPHO`, then `pizza`, then quit:

```text
Choose 1-9: 8
Search for: taxi
  - Taxi to work (transport): R36.00
  - Taxi home (transport): R36.00

...
Choose 1-9: 8
Search for: SIPHO
  - Birthday gift for Sipho (gifts): R420.00

...
Choose 1-9: 8
Search for: pizza
  No expenses mention "pizza".
```

"SIPHO" found "Sipho" because both were turned to lower case before comparing.

::: note A curious case: searching for nothing
If you press Enter without typing a word, the search shows **every** expense. That is because every string "includes" the empty string `""`. It is a reasonable result (no filter means everything), so we leave it. If you wanted, you could check for an empty `word` first and print a message instead.
:::

::: quiz
Using `searchExpenses` from this step, what does this print?

```js
const list = [
  { description: "Taxi to work", amount: 36 },
  { description: "Airtime", amount: 29 },
  { description: "TAXI home", amount: 36 },
];
console.log(
  searchExpenses(list, "TAXI").length,
  searchExpenses(list, "").length,
  searchExpenses(list, "work").length
);
```

- [ ] `1 0 1`
- [ ] `2 0 1`
- [ ] `1 3 1`
- [x] `2 3 1`

Both the description and the word are lower-cased, so `"TAXI"` matches `"Taxi to work"` and `"TAXI home"`: 2. Every string includes the empty string, so `""` matches all 3. Only one description contains `"work"`. If you picked a `0` in the middle, you expected an empty search to find nothing. If you picked `1` first, you forgot that both sides are lower-cased.
:::

## Step 9: the loops we kept

Look through your finished file. Several loops are still loops, and that is on purpose:

| Loop | Why it stays a loop |
|---|---|
| The `while` in `askForAmount` | It repeats "until the answer is valid". There is no array to call a method on. |
| The `while (running)` menu loop in `main` | It repeats until the user quits, not once per item. |
| `removeExpense` (uses `splice`, not a loop) | It works with one position the user chose. `findIndex` is for when you search by a test; here the user already told us the number. |

And the new code uses methods where the job has a standard shape: `forEach` to print each item, `filter` to select, `reduce` to total, and copy-`sort`-`slice` to rank. That is the "loop or method?" guide from [lesson 07](#/phase-07-functions-as-values/07-sort-and-chaining), applied to a real program.

## Try the finished program

Run the finished program from the start. Add an expense, then look at the reports:

```text
=== Budget Buddy ===
Welcome back, Thandi! You have 7 saved expense(s).

1) Add an expense
2) List expenses
3) Remove an expense
4) Show summary
5) Totals by category
6) Show one category
7) Top 3 biggest expenses
8) Search by description
9) Quit
Choose 1-9: 1
What was it for? Chicken for braai
Amount: R210
Category (e.g. food, transport): food
  Added Chicken for braai for R210.00.

...
Choose 1-9: 7
  #1 Groceries (food): R850.50
  #2 Electricity (bills): R650.00
  #3 Birthday gift for Sipho (gifts): R420.00

...
Choose 1-9: 9
Goodbye, Thandi! Your data is saved in budget.json.
```

The braai chicken (R210) is not big enough for the top 3. Try option `6` with `food` to see it counted in the food total, and option `8` with `braai` to find it.

To check the empty case, rename `budget.json` (for example to `budget-test.json`), run the program, enter a name and income, and try options `4`, `5`, `6`, `7` and `8` with no expenses. None of them should crash. `totalSpent` gives `R0.00` thanks to the `0` starting value, and the reports say `No expenses yet.` or `Nothing in ...`.

::: project Check your work
Go through this list. Each item should work:

- Options 1 to 5 behave exactly as they did in v6.
- Option 6 asks for a category, ignores capital letters, lists the matching expenses with a total, or says `Nothing in "..."`.
- Option 7 shows up to three expenses, biggest first, numbered `#1`, `#2`, `#3`.
- After option 7, option 2 still lists expenses in the order you added them.
- Option 8 finds expenses by any part of the description, ignoring capital letters, or says `No expenses mention "..."`.
- Option 9 quits, and anything else gives the "I don't know that option" message with `1 to 9`.
- With no expenses at all, no option crashes.

If something does not work, compare your code with the full solution below, one function at a time.
:::

::: solution Full solution: Budget Buddy v7 (index.js)
```js
// Budget Buddy — stage 7: reports with array methods
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

// ---------- calculations (now with array methods) ----------

const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);

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

// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);

const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));

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
:::

::: connect
**This used:** `forEach` ([forEach](#/phase-07-functions-as-values/02-foreach)), `map` with a named function ([map](#/phase-07-functions-as-values/03-map)), `filter` with `includes` and `toLowerCase` ([filter](#/phase-07-functions-as-values/04-filter)), `reduce` with a number and with an object ([reduce](#/phase-07-functions-as-values/06-reduce)), copy-sort-slice and a small chain ([sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining)), and the loop-or-method guide.

**Next:** your `index.js` is now over 200 lines long, and it is getting hard to find things. Phase 8, starting with [Solving problems](#/phase-08-becoming-a-programmer/01-solving-problems), is about working like a professional: planning, debugging, splitting code into several files, and saving your work with Git. In the final project, Budget Buddy is split into `storage.js`, `money.js`, `reports.js` and `index.js`, and the report functions you wrote today move into `reports.js` almost unchanged. That is the reward for keeping calculations separate from screens.
:::

::: challenge Stretch goals
Pick one or more.

1. **Expenses over an amount.** Add a calculation `expensesOver(expenses, limit)` using `filter`, and a menu option that asks for an amount with `askForAmount` and prints the matching expenses and how many there are. Quit moves to 10.
2. **Top 5.** Change option 7 to ask how many to show. (`topExpenses` already takes `howMany`, so this is a small change.)
3. **Average per category.** In the category report, also show how many expenses each category has and the average. `inCategory` gives you the list for one category.
4. **Any big spending?** In the summary, use `some` to print a warning line if any single expense is more than 10% of your income.
:::

::: solution Stretch goal 1: expenses over an amount
Add the calculation next to the other calculations:

```js
const expensesOver = (expenses, limit) =>
  expenses.filter((expense) => expense.amount > limit);
```

Add the screen function next to the other screens:

```js
function printExpensesOver(expenses) {
  const limit = askForAmount("Show expenses over: R");
  const over = expensesOver(expenses, limit);
  over.forEach((expense) => console.log(`  - ${describe(expense)}`));
  console.log(`  ${over.length} expense(s) over ${formatMoney(limit)}`);
}
```

In `showMenu`, the last line becomes:

```js
  console.log("9) Expenses over an amount");
  console.log("10) Quit");
```

In `main`, change the prompt to `"Choose 1-10: "`, the error message to `from 1 to 10.`, and the end of the `if` chain to:

```js
    } else if (choice === "9") {
      printExpensesOver(budget.expenses);
    } else if (choice === "10") {
      running = false;
```

A sample run:

```text
Choose 1-10: 9
Show expenses over: R300
  - Groceries (food): R850.50
  - Electricity (bills): R650.00
  - Birthday gift for Sipho (gifts): R420.00
  3 expense(s) over R300.00
```
:::

::: recap
- A **refactor** changes the code without changing the behaviour. Run the program after every small step to prove it.
- `forEach` replaced counting loops that only print, and `reduce` replaced the running total and the category tally.
- Each new report is split into a **calculation** (`inCategory`, `topExpenses`, `searchExpenses`) and a **screen** function that asks and prints.
- The top 3 is copy, sort biggest first, slice: `[...expenses].sort((a, b) => b.amount - a.amount).slice(0, 3)`. The copy keeps the list in the order you added things.
- A search is `filter` + `includes`, with both sides lower-cased.
- Small, reusable functions pay off: `totalSpent` works on any list, and `topExpenses` gave us `largestExpense` for free.
- Loops that are not "once per item" (the menu, input validation) stay as loops, on purpose.
:::

::: interview Why does topExpenses copy the array before sorting?
Because `sort` rearranges the array it is called on. Without the copy, it would reorder `budget.expenses` itself, so the numbered list would change order and "remove expense number 3" could remove the wrong expense.
:::

::: interview Why is the starting value 0 important in totalSpent?
A new user has no expenses. With a starting value, `reduce` on an empty array returns `0`, which is correct. Without one, it would crash with `TypeError: Reduce of empty array with no initial value`.
:::

::: interview Why didn't we turn the menu loop into an array method?
Array methods work once per item of an array. The menu loop repeats until the user chooses to quit, and there is no array involved, so a `while` loop is the right tool.
:::

::: checkpoint
- [ ] I saved a copy of my v6 code, and backed up my own `budget.json`
- [ ] I replaced the list loop with `forEach` and the total with `reduce`, and checked options 2, 4 and 5 still print the same as before
- [ ] Option 6 shows one category and its total, and ignores capital letters
- [ ] Option 7 shows the top 3, and option 2 still lists expenses in their original order
- [ ] I removed the `[...]` copy on purpose, saw the list scramble, and put it back
- [ ] Option 8 finds "taxi" and "SIPHO"
- [ ] I tried every report with no expenses, and nothing crashed
- [ ] I tried at least one stretch goal
:::

::: resources
- **javascript.info, "Array methods":** https://javascript.info/array-methods. A good page to keep open as a reference for every method you used today, with exercises at the end.
- **MDN, "Array":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array. The full list of array methods. Skim the list of names; you now know the most important ones.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `topExpenses` with a small array and watch the copy being made and sorted while the original stays put.
:::
