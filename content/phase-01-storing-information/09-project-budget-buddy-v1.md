---
title: "Project: Budget Buddy v1"
summary: Start the course project. A program that asks about your month's money and tells you what is left.
minutes: 60
stage: Phase 1
---

## What you will learn

- How to set up a brand-new Node project from nothing: a folder, `pnpm init`, a package, and a `start` script
- How to **plan** a program in plain words before you write any code
- How to build a program in small steps, running it after every step
- How everything in Phase 1 (variables, numbers, strings, conversion and input) fits together into one useful program

**Before this:** all of Phase 1, especially [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).

## What you are building

**Budget Buddy** is the project for this whole course. It is a money tracker that runs in your terminal. At the end of each phase you come back to it and add what you have just learned. By Phase 8 it will have menus, lists of expenses, categories, reports, and it will save your data to a file. You never throw it away and start again. It grows, just like real software does.

Today is version 1. It will ask for your name, your monthly income, and three expenses, and then tell you how much is left. When it is finished, a session will look like this:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R5500
Food: R3200
Transport: R1800

Hi Thandi, here is your month:
Income:          R15000.00
Total expenses:  R10500.00
Left over:       R4500.00
That is 30.0% of your income, or about R150 a day.
```

Small, but genuinely useful. Plenty of people have no idea what their month really looks like until they write it down.

::: analogy A builder's plan
A builder does not arrive on site and start laying bricks wherever they feel like. First there is a plan: where the walls go, where the doors go, what order to build in. Then they build one wall at a time, checking that each one is straight before starting the next.

You will work the same way. First a **plan**, written as comments. Then one small piece of code at a time, **running the program after every step** to check it is still straight. If something breaks, you know it was the last small thing you added. That habit is worth more than any single piece of syntax in this course.
:::

## Step 1: Create the project

Budget Buddy gets its own folder, separate from `coding-practice`. Real projects each live in their own folder, with their own `package.json` and their own packages.

::: try Set up the budget-buddy folder
1. Open a terminal. Go to your home folder and create the project folder:
   ```bash
   cd ~
   mkdir budget-buddy
   cd budget-buddy
   ```
   These three commands work the same in the macOS and Linux terminals and in Windows PowerShell.
2. Turn the folder into a Node project:
   ```bash
   pnpm init
   ```
   pnpm prints where it wrote the new `package.json`, then the file itself. The first part should look like this (the path will show your own home folder):
   ```text
   Wrote to /Users/thandi/budget-buddy/package.json

   {
     "name": "budget-buddy",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
   ```
   pnpm used the folder name as the project name. (If you see a line saying `"type": "module"`, the one-time `pnpm config set` settings from [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer) were skipped. Delete that line from `package.json`, or `require` will not work.)
3. Add prompt-sync **to this project**:
   ```bash
   pnpm add prompt-sync
   ```
   You should see something like:
   ```text
   Packages: +3
   +++
   Progress: resolved 3, reused 3, downloaded 0, added 3, done

   dependencies:
   + prompt-sync 4.2.0

   Done in 0.8s using pnpm v12.6.0
   ```
   (Yes, you already installed it in `coding-practice`. But each project lists its own packages and gets its own `node_modules`, so this project needs it too. Notice `reused 3, downloaded 0`: pnpm already has those three packages in its shared store on your computer from lesson 8, so it links them in instead of downloading them again. Your numbers may differ, and that is fine.)
4. Open the folder in VS Code:
   ```bash
   code .
   ```
   (Or use **File → Open Folder** and pick `budget-buddy`.)
5. In VS Code, create a new file in the `budget-buddy` folder called `index.js`. Leave it empty for now.

Your folder should now contain `index.js`, `node_modules/`, `package.json` and `pnpm-lock.yaml`.
:::

### Add a `start` script

In [Your first program](#/phase-00-start-here/06-your-first-program) you added a `start` script, so that `pnpm start` runs your program. Do the same here. Open `package.json` and change the `"scripts"` section so that it looks like this:

```text
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Watch the commas: there must be a comma after the `"start"` line, because another line follows it. Your whole `package.json` should now look like this:

```text
{
  "name": "budget-buddy",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "prompt-sync": "^4.2.0"
  }
}
```

Save it. From now on, you can run Budget Buddy with either `node index.js` or `pnpm start`, from inside the `budget-buddy` folder. They do the same thing. `pnpm start` is the standard way to say "run this project", and anyone who downloads a Node project expects it to work.

::: quiz
In `budget-buddy`, your code is in `index.js` and there is no file called `budget.js`. But by mistake, the `"scripts"` section of `package.json` says `"start": "node budget.js"`. What happens when you run `pnpm start`?

- [ ] It runs `index.js`, because `"main"` in `package.json` says that is the main file
- [ ] pnpm stops with `ERR_PNPM_NO_SCRIPT` and `Missing script: start`
- [ ] pnpm creates an empty `budget.js` and runs that
- [x] pnpm runs `node budget.js`, and Node fails with `Error: Cannot find module` for `budget.js`

`pnpm start` does exactly what the `start` script says, and nothing else, so it runs `node budget.js`, which fails because that file does not exist. The `start` script *does* exist, so this is not the "missing script" error: that one means there is no `"start"` line at all. `"main"` plays no part in `pnpm start`. Fix it by changing the script to `node index.js`.
:::

## Step 2: Plan in plain words

Before any code, decide **what the program has to do**, in order. Say it out loud, or write it on paper:

1. Ask the questions: name, income, rent, food, transport.
2. Do the maths: add up the expenses, and take them away from the income.
3. Show the results, neatly.

That is the plan. Now put it into `index.js` as **comments**, so the plan lives inside the program:

```js
// Budget Buddy — stage 1: ask and calculate

// 1. Ask the questions

// 2. Do the maths

// 3. Show the results
```

Save, and run it:

```bash
pnpm start
```

You should see:

```text
$ node index.js
```

(The very first time, pnpm may print `Already up to date` and a `Done in ...` line before it. That is pnpm checking your packages, and you can ignore it.)

The line starting with `$` is pnpm telling you which command it is running for the `start` script. After that, nothing, because comments do nothing. That is fine. It proves the `start` script works and the file has no errors. Now you fill in the plan, one section at a time.

::: note Why comments first?
Writing the plan as comments splits a big, scary job ("write a budget program") into small, obvious ones ("ask for the rent"). Each comment is a to-do item. Professional programmers do this all the time, especially when a problem feels too big to start. [How to solve problems](#/phase-08-becoming-a-programmer/01-solving-problems) in Phase 8 builds a whole method around it.
:::

## Step 3: A title, and the first question

Add the magic line from [lesson 8](#/phase-01-storing-information/08-getting-input-from-the-user) at the top, a title, and the first two questions. Print what you got, to check it worked:

```js
// Budget Buddy — stage 1: ask and calculate
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");

// 1. Ask the questions
const name = prompt("What is your name? ");
const income = prompt("Monthly income: R");
console.log(name, income, typeof income);

// 2. Do the maths

// 3. Show the results
```

Run it with `pnpm start` and answer the questions. Below the `$ node index.js` line from pnpm, you should see:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Thandi 15000 string
```

Notice the question `"Monthly income: R"`. It ends with an `R`, so the user types straight after it and the answer reads naturally as `R15000`. The `R` is part of the question, **not** part of the answer, so the user types only the digits.

And notice the last word: `string`. You knew that would happen. Income is going to be used in maths, so convert it, straight away, on the same line:

```js
const income = Number(prompt("Monthly income: R"));
```

Run it again. The last line should now end in `number`:

```text
Thandi 15000 number
```

The temporary `console.log` line was a **check**: a line you add only to see what is going on inside the program. Now that you know `income` is a number, delete that line.

## Step 4: The rest of the questions

Add the three expenses. Each is a number, so each gets `Number(...)`. While you are there, add a note to the comment reminding your future self why:

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

// 3. Show the results
```

Run it. It should ask all five questions and then end, without printing anything else:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R5500
Food: R3200
Transport: R1800
```

That is correct for now. The program asks, but does nothing with the answers yet. Why `const` for all of them? Because none of these values will change after the user has typed them. (See [let and const](#/phase-01-storing-information/03-let-and-const).)

## Step 5: Do the maths

Two calculations: the total of the expenses, and what is left of the income. Add them under the "Do the maths" comment, with a temporary check line:

```js
// 2. Do the maths
const totalExpenses = rent + food + transport;
const left = income - totalExpenses;
console.log(totalExpenses, left);
```

Run it with the same answers as before. The last line should be:

```text
10500 4500
```

Check it by hand: 5500 + 3200 + 1800 is 10,500, and 15,000 − 10,500 is 4,500. It matches.

::: warn If you see 550032001800
If the total comes out as a long string of digits joined together, one or more of your expenses was not wrapped in `Number(...)`. Go back to step 4 and check every question. This is the exact trap from [Converting between types](#/phase-01-storing-information/07-converting-between-types), happening in a real program.
:::

Once the numbers are right, delete the check line.

::: quiz
Kagiso types `9000` for his income, `4000` for rent, `2500` for food and `1000` for transport. He forgot `Number(...)` on the food question only. What does his check line print?

```js
const prompt = require("prompt-sync")();

const income = Number(prompt("Monthly income: R"));
const rent = Number(prompt("Rent: R"));
const food = prompt("Food: R");
const transport = Number(prompt("Transport: R"));

const totalExpenses = rent + food + transport;
const left = income - totalExpenses;
console.log(totalExpenses, left);
```

- [x] `400025001000 -400024992000`
- [ ] `7500 1500`
- [ ] `400025001000 NaN`
- [ ] `40003500 -39994500`

`rent + food` is a number plus the text `"2500"`, so it joins: `"40002500"`. Adding `transport` joins again: `"400025001000"`. Then `-` only works on numbers, so JavaScript converts that long text to a number and subtracts, giving a huge negative number, not `NaN`. One missing `Number()` is enough to spoil the whole total, and everything calculated from it.
:::

## Step 6: Show the results

Now the part the user sees. Use template literals from [Strings](#/phase-01-storing-information/05-strings), and `toFixed(2)` from [Numbers](#/phase-01-storing-information/04-numbers), so that every amount shows rands and cents:

```js
// 3. Show the results
console.log("");
console.log(`Hi ${name}, here is your month:`);
console.log(`Income:          R${income.toFixed(2)}`);
console.log(`Total expenses:  R${totalExpenses.toFixed(2)}`);
console.log(`Left over:       R${left.toFixed(2)}`);
```

A few details:

- `console.log("")` prints an empty line, to separate the questions from the answers.
- The extra spaces after `Income:`, `Total expenses:` and `Left over:` are there on purpose. They line the amounts up in a neat column. Count them if yours do not line up: the `R` should start in the same place on all three lines.
- `toFixed(2)` is called only here, at the very end, because it turns the number into text. All the maths was done first, with real numbers.

Run it. The full session should now be:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R5500
Food: R3200
Transport: R1800

Hi Thandi, here is your month:
Income:          R15000.00
Total expenses:  R10500.00
Left over:       R4500.00
```

That is Budget Buddy v1 working. Run it again with your own numbers, or made-up ones.

## Step 7 (stretch): percentage and money per day

Two more useful facts:

1. **What percentage of your income is left?** Financial advisers often suggest trying to keep at least 20% of your income for savings.
2. **Roughly how much can you spend per day** for the rest of the month, if you use up what is left?

Add two more lines to the maths section:

```js
const percentLeft = (left / income) * 100;
const perDay = Math.floor(left / 30);
```

- `left / income` gives the fraction left over (4500 / 15000 is 0.3). Multiplying by 100 makes it a percentage (30). The brackets are not strictly needed, but they make the order clear to a reader.
- `Math.floor(left / 30)` divides the money left by 30 days and rounds **down**. Why down? Because if you budget R150.67 a day, rounding up to R151 would, over a month, spend slightly more than you have. For a budget, it is safer to round in your favour.

Then add one more line at the end of the results:

```js
console.log(`That is ${percentLeft.toFixed(1)}% of your income, or about R${perDay} a day.`);
```

`toFixed(1)` shows one decimal place, which is plenty for a percentage. `perDay` is already a whole number, so it needs no `toFixed`.

Run it one last time:

```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R5500
Food: R3200
Transport: R1800

Hi Thandi, here is your month:
Income:          R15000.00
Total expenses:  R10500.00
Left over:       R4500.00
That is 30.0% of your income, or about R150 a day.
```

::: project Your turn: make it yours
Before you look at the full solution, make sure your version works, then try these changes. Run after each one.

1. Run the program with a month where the expenses are **bigger** than the income, for example income `8000`, rent `4500`, food `2500` and transport `1500`. What does "Left over" say? What does the last line say about money per day?
2. Run it again and, when it asks for your income, type `abc`. What happens to every line that uses the income?
3. Add a fourth expense, such as `airtime` or `school fees`. You will need to change the questions **and** the total.
:::

::: solution
1. With those numbers, the summary says `Left over:       R-500.00` and `That is -6.3% of your income, or about R-17 a day.` The maths is correct, but a real app should warn you, not cheerfully tell you to spend minus R17 a day. Warning the user needs a **decision**, and that is exactly what Budget Buddy v2 adds in [Phase 2](#/phase-02-making-decisions/06-project-budget-buddy-v2).
2. `Number("abc")` is `NaN`, and it spreads: `Income: RNaN`, `Left over: RNaN`, and `NaN%`. Budget Buddy v2 will check each amount with `Number.isNaN` and reject bad input.
3. For example, add `const airtime = Number(prompt("Airtime: R"));` after the transport question, and change the total to `rent + food + transport + airtime`. Notice that you had to change two places. Once you know about arrays, in [Phase 5](#/phase-05-arrays/06-project-budget-buddy-v5), Budget Buddy will handle any number of expenses without that problem.
:::

::: quiz
Nandi earns R12000, and her expenses add up to R11000. With the stage 7 code, what is the last line of her summary?

- [ ] `That is 0.1% of your income, or about R33 a day.`
- [x] `That is 8.3% of your income, or about R33 a day.`
- [ ] `That is 8.33% of your income, or about R34 a day.`
- [ ] `That is 8.3% of your income, or about R34 a day.`

She has R1000 left. 1000 / 12000 is 0.0833…, and × 100 makes 8.333…, which `toFixed(1)` shows as `8.3`. 1000 / 30 is 33.33…, and `Math.floor` rounds **down** to 33. `R34` is rounding up, which the budget avoids on purpose; `0.1%` forgets the `* 100`.
:::

## The full solution

Here is the complete Budget Buddy v1. Compare it with yours. Yours does not have to be identical: if it works and you can explain every line, it is correct.

::: solution Budget Buddy v1: index.js
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
:::

::: debug Three things that go wrong
These are the problems learners hit most often in this project. For each one, say what causes it.

1. Running `pnpm start` prints `Error: ERR_PNPM_NO_SCRIPT` and `Missing script: start`.
2. Running `node index.js` prints `Error: Cannot find module 'prompt-sync'`.
3. The summary prints the income line, then crashes with `TypeError: totalExpenses.toFixed is not a function`.
:::

::: solution
1. The `start` script was not added to `package.json`, or the file was not saved, or you are in the wrong folder. Check that `"start": "node index.js"` is inside `"scripts"`, save, and make sure you are inside `budget-buddy`.
2. prompt-sync is not installed in this project. From inside `budget-buddy`, run `pnpm add prompt-sync`. (Having it in `coding-practice` does not help this folder.)
3. At least one expense (here, `rent`) was not converted, so `+` joined the expenses into the text `"550032001800"`. `totalExpenses` is a string, and strings do not have `toFixed`: that ability belongs to numbers (see [why types matter](#/phase-01-storing-information/06-booleans-null-undefined)). Wrap each expense question in `Number(...)`.
:::

::: mistake
**Creating `budget-buddy` inside `coding-practice`.** It should be its own folder in your home folder (`~/budget-buddy`). Nothing breaks if it is inside, but keeping projects separate is a good habit.

**Typing `R` in the answers.** The `R` is part of the question. Type only the digits, or `Number()` will give `NaN`.

**Using `toFixed` in the maths section.** Keep the maths with real numbers. `toFixed` belongs only in the results.

**Writing all the code at once, then running it.** When something is wrong, you will not know which of 20 lines caused it. Add a little, run, check, repeat.

**Forgetting to delete temporary check lines.** They are useful while building, but the user should not see `10500 4500` in the middle of their summary.
:::

## Real-world uses

What you just built is a tiny version of real software:

- **Banking and budgeting apps** do exactly these sums, just with more categories and nicer screens.
- **The "plan with comments, build in small steps" method** is how professionals start new features, whatever the language.
- **`pnpm init`, `pnpm add` and a `start` script** (or their npm equivalents, `npm init`, `npm install` and `npm start`) are the first three things done in almost every real JavaScript project. You have now done them from scratch, on your own.

::: connect
**This builds on:** everything in Phase 1: [values](#/phase-01-storing-information/01-values-and-output), [variables](#/phase-01-storing-information/02-variables) and [const](#/phase-01-storing-information/03-let-and-const), [numbers](#/phase-01-storing-information/04-numbers) and `toFixed`, [template literals](#/phase-01-storing-information/05-strings), [converting types](#/phase-01-storing-information/07-converting-between-types) and [asking questions](#/phase-01-storing-information/08-getting-input-from-the-user).

**This unlocks:** Budget Buddy v2, at the end of [Phase 2](#/phase-02-making-decisions/06-project-budget-buddy-v2). Right now the program believes whatever the user types, and cannot react to what it finds. Next you will teach it to **decide**: to reject `abc` and negative amounts, warn you when you overspend, and tell you whether your month looks healthy, tight or overspent. It starts with [Comparing values](#/phase-02-making-decisions/01-comparing-values).
:::

::: challenge A savings goal
Add one more question: `"Savings goal this month: R"`. Then add a line to the results that says how much would be left **after** putting the savings goal aside, and how much per day that leaves (rounded down). For example, with the answers from this lesson and a savings goal of R1500:

```text
After saving R1500.00, you have R3000.00 left, or about R100 a day.
```

Do not change any of the existing lines. Only add new ones.
:::

::: solution
Add the question at the end of section 1:
```js
const savingsGoal = Number(prompt("Savings goal this month: R"));
```
Add two lines at the end of section 2:
```js
const afterSavings = left - savingsGoal;
const perDayAfterSavings = Math.floor(afterSavings / 30);
```
And one line at the end of section 3:
```js
console.log(`After saving R${savingsGoal.toFixed(2)}, you have R${afterSavings.toFixed(2)} left, or about R${perDayAfterSavings} a day.`);
```
A sample session:
```text
=== Budget Buddy ===
What is your name? Thandi
Monthly income: R15000
Rent: R5500
Food: R3200
Transport: R1800
Savings goal this month: R1500

Hi Thandi, here is your month:
Income:          R15000.00
Total expenses:  R10500.00
Left over:       R4500.00
That is 30.0% of your income, or about R150 a day.
After saving R1500.00, you have R3000.00 left, or about R100 a day.
```
:::

::: recap
- A new project gets its own folder, `pnpm init`, its own `pnpm add` for any packages it needs, and a `start` script so `pnpm start` runs it.
- **Plan first**, as comments: ask, calculate, show. Each comment is a small to-do.
- **Build in small steps** and run after every one. Use temporary `console.log` checks, then delete them.
- Convert every numeric answer with `Number(prompt(...))` as it comes in.
- Do all the maths with numbers, then format with template literals and `toFixed` only when showing results.
- Budget Buddy v1 trusts its user completely. Phase 2 teaches it to check.
:::

::: interview Why write the plan as comments before writing any code?
It breaks a big problem into small, clear steps, so you always know what to do next, and the comments stay behind to explain the code to future readers. It also stops you from writing lots of code without a clear idea of what it is for.
:::

::: interview Why run the program after every small step, instead of once at the end?
If something breaks, you know the problem is in the few lines you just added, so it is quick to find. If you write everything first and it fails, the bug could be anywhere.
:::

::: interview What does `pnpm start` do, and why is it useful?
It runs the command stored under `"start"` in the `scripts` section of `package.json`, here `node index.js`. It is useful because it is the standard way to run any Node project: someone new to your project can run it without knowing which file to start.
:::

::: checkpoint
- [ ] I created `~/budget-buddy` with `pnpm init` and added prompt-sync to it
- [ ] I added a `start` script and ran the project with `pnpm start`
- [ ] I wrote the plan as comments before writing code
- [ ] I ran the program after each step, and removed my temporary check lines
- [ ] My Budget Buddy prints a summary with amounts to two decimal places
- [ ] I added the percentage and per-day stretch lines
- [ ] I tried an overspent month and typing `abc`, and saw why Phase 2 is needed
:::

::: resources
- **pnpm Docs, "pnpm init":** https://pnpm.io/cli/init. What `pnpm init` does.
- **pnpm Docs, "pnpm run":** https://pnpm.io/cli/run. How scripts like `start` work, for when you want more than one.
- **freeCodeCamp:** https://www.freecodecamp.org/learn. If you want extra practice with the basics of Phase 1, the first sections of the JavaScript course cover the same ground with lots of short exercises.
:::
