---
title: Splitting code into files (modules)
summary: How to spread a program over several files with module.exports and require, and what that prompt-sync line really means.
minutes: 50
stage: Phase 8
---

## What you will learn

- Why real programs are split into many small files, called **modules**
- How to share functions from one file with `module.exports`, and use them in another with `require("./file")`
- What `const { a, b } = require(...)` means, and why the `./` matters
- The full story of `const prompt = require("prompt-sync")();`, which you have been typing since Phase 1
- The three kinds of module: built into Node, installed with npm, and your own

**Before this:** [Debugging](#/phase-08-becoming-a-programmer/02-debugging). You should be comfortable with functions, arrow functions and objects.

## The problem: one very long file

Open your Budget Buddy `index.js` and scroll. By the end of Phase 7 it is over 200 lines: money formatting, questions, file saving, reports, menus, all in one place.

That causes real problems:

- **Finding things is slow.** Where is `categoryTotals`? Scroll, scroll, scroll.
- **Everything can touch everything.** A change near the top can quietly break something near the bottom.
- **Reusing is copy-paste.** If you write another program that needs `formatMoney`, you copy it. Then you fix a bug in one copy and forget the other.
- **Teams trip over each other.** In a real job, several people work on the same program. If it is one file, they are all editing the same page.

The answer, in every programming language, is to **split the program into several files**, each with one clear job.

::: analogy A tool cabinet with labelled drawers
Imagine keeping every tool you own in one big box: screwdrivers, nails, tape, paintbrushes, spanners. It works, but finding the 10 mm spanner takes five minutes of digging.

Now picture a cabinet with labelled drawers: **Screwdrivers**, **Measuring**, **Painting**. Each drawer holds tools for one kind of job. When you need to paint, you open one drawer and take out exactly what you need.

A **module** is one of those drawers: a file holding related code. `module.exports` decides **what the drawer offers** to the outside world, and `require` is you **opening the drawer and taking tools out**.
:::

## What a module is

In Node, a **module** is a JavaScript file whose code can be used by other files. Every `.js` file you have written is already a module. It has not shared anything yet, that is all.

By default, **everything inside a file is private to that file**. A function written in `money.js` cannot be seen from `shop.js`, the same way a variable inside a function cannot be seen outside it ([Scope](#/phase-04-functions/04-scope)). This is a good thing: it means files cannot accidentally mess with each other's variables.

To share something, a file must **export** it on purpose. To use it, another file must **import** it on purpose. Two new terms:

- **Export**: to make something from a file available to other files.
- **Import**: to bring something that another file exported into this file. In Node's style, you import with `require`.

## Your first module

Two files. The first holds money helpers and exports them:

```js
// money.js — small helpers for amounts of money

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

function calcTotal(amounts) {
  return amounts.reduce((total, amount) => total + amount, 0);
}

module.exports = { formatMoney, calcTotal };
```

The second file uses them:

```js
// shop.js
const { formatMoney, calcTotal } = require("./money");

const basket = [32.5, 18, 64.99];
console.log("Items:", basket.length);
console.log("Total:", formatMoney(calcTotal(basket)));
```

Run `shop.js`, and you should see:

```text
Items: 3
Total: R115.49
```

`shop.js` never defined `formatMoney` or `calcTotal`, yet it used both. Let us take the two important lines apart.

### The export line

```js
module.exports = { formatMoney, calcTotal };
```

| Piece | What it means |
|---|---|
| `module` | An object that Node creates automatically for every file. It describes "this file, as a module". |
| `.exports` | The property of `module` that holds **whatever this file hands out**. Whatever you put here is what other files get when they `require` this one. |
| `=` | Assignment, as always: store the right-hand side in `module.exports`. |
| `{ formatMoney, calcTotal }` | An object holding the two functions. |

That last piece uses a shortcut you have not seen yet. When a property's name is the same as the variable holding its value, you can write the name once. These two lines mean exactly the same thing:

```js
module.exports = { formatMoney: formatMoney, calcTotal: calcTotal };
module.exports = { formatMoney, calcTotal };
```

The short form is what almost everyone writes, so get used to reading it as "an object with a `formatMoney` property holding the `formatMoney` function, and so on".

### The require line

```js
const { formatMoney, calcTotal } = require("./money");
```

Read it right to left, like every assignment:

1. `require("./money")` tells Node: "find the file `money.js` **in the same folder as this file**, run it, and give me whatever it put in `module.exports`." Here, that is the object `{ formatMoney, calcTotal }`.
2. `const { formatMoney, calcTotal } = …` means: **pick these names out of the object**, and make a variable for each one. This is called **destructuring**.

Destructuring is only a shortcut. Without it, you would write:

```js
const money = require("./money");
const formatMoney = money.formatMoney;
const calcTotal = money.calcTotal;
```

or use the object directly every time: `money.formatMoney(12)`. All three styles work. The destructuring version is the most common, because you can see at a glance exactly which tools this file takes out of the drawer.

You can see the whole object for yourself:

```js
const money = require("./money");
console.log(money);
console.log(money.formatMoney(12));
```

Output:

```text
{
  formatMoney: [Function: formatMoney],
  calcTotal: [Function: calcTotal]
}
R12.00
```

`[Function: formatMoney]` is how Node prints a function without calling it.

::: try Your first two-file program
1. Inside `coding-practice/phase-8/`, create a new folder called `modules`.
2. In `phase-8/modules/`, create `money.js` and type in the money module above, including the `module.exports` line.
3. In the **same folder**, create `shop.js` and type in the `shop.js` code.
4. Save both. From inside `coding-practice`, run:
   ```bash
   node phase-8/modules/shop.js
   ```
5. You should see:
   ```text
   Items: 3
   Total: R115.49
   ```
6. **Predict, then run:** add a third helper to `money.js`, `const addVat = (amount) => amount * 1.15;`, but do **not** add it to `module.exports`. In `shop.js`, add `addVat` to the curly braces in the `require` line and try `console.log(addVat(1000));`. What happens? Then add it to `module.exports` and run again. You should now see `1150`.
:::

(In step 6 you should have seen `TypeError: addVat is not a function` the first time. The next section explains why.)

## Why `./`?

The `./` at the start of `"./money"` means "**start looking in the same folder as the file doing the requiring**". You met `.` meaning "this folder" in [The terminal](#/phase-00-start-here/05-the-terminal).

It is relative to the **file**, not to where your terminal is. That is why `node phase-8/modules/shop.js` works from inside `coding-practice`: Node looks for `money.js` next to `shop.js`, wherever you ran the command from.

You can leave off the `.js`. Node tries `money.js` for you. Most people leave it off.

What if you forget the `./`?

```js
const { formatMoney } = require("money");
```

Output (the first lines):

```text
node:internal/modules/cjs/loader:1249
  throw err;
  ^

Error: Cannot find module 'money'
```

Without `./`, Node thinks you mean a **package** called `money`, the kind you install with npm, and goes looking in `node_modules` instead of your folder. It does not find one, so it gives up. The rule:

- `require("./something")` means **my own file**, found relative to this file.
- `require("something")` means **a built-in module or an installed package**.

If your file is in a sub-folder, the path says so: `require("./lib/money")`. To go up a folder, use `..`: `require("../money")`.

## When the require goes wrong

Here are the two errors you will meet most. Both come from the export side.

**Forgetting to export.** Suppose `money.js` defines `formatMoney` but has no `module.exports` line at all. Then `module.exports` is still the empty object Node started with, and `require` hands you `{}`. Destructuring `formatMoney` out of `{}` gives `undefined`, and calling it fails:

```js
const { formatMoney } = require("./money");
console.log(formatMoney(5));
```

Output:

```text
TypeError: formatMoney is not a function
```

**Spelling the name differently.** `const { formatmoney } = require("./money");` (lower-case `m`) also gives `undefined`, because the object has no property with that exact name. Names are case-sensitive, here as everywhere.

When you see `… is not a function` right after adding a `require`, check two things: **is it in `module.exports`?** and **is it spelled identically in both files?** A quick `console.log(require("./money"))` shows you exactly what the file is exporting.

::: predict What does this print?
Two files in the same folder.

```js
// loud.js
console.log("loud.js is running!");
module.exports = { answer: 42 };
```

```js
// twice.js
const first = require("./loud");
const second = require("./loud");
console.log(first.answer, second.answer);
```

What do you see when you run `twice.js`? How many times is `loud.js is running!` printed?
:::

::: solution
```text
loud.js is running!
42 42
```
Only **once**. The first `require` runs `loud.js` from top to bottom and remembers what it exported. Every later `require` of the same file gets the remembered exports without running the file again. So a module's code runs once, however many files require it. (It also means a module should normally *only* define and export things. A module that prints things when it is required is usually a surprise nobody wanted.)
:::

## Exporting one thing instead of an object

`module.exports` does not have to be an object. It can be **anything**, including a single function:

```js
// greeting.js — exports ONE function, not an object

function makeGreeter(language) {
  if (language === "zulu") {
    return (name) => `Sawubona, ${name}!`;
  }
  return (name) => `Hello, ${name}!`;
}

module.exports = makeGreeter;
```

`makeGreeter` is a function that **returns another function**. That is allowed, because functions are values ([Passing functions to functions](#/phase-07-functions-as-values/01-passing-functions-to-functions)). Now, in another file:

```js
const makeGreeter = require("./greeting");
console.log(typeof makeGreeter);

const greet = makeGreeter("zulu");
console.log(greet("Lindiwe"));

const greetEnglish = require("./greeting")("english");
console.log(greetEnglish("Sam"));
```

Output:

```text
function
Sawubona, Lindiwe!
Hello, Sam!
```

No curly braces this time, because the module exports a function, not an object. Look carefully at the last `require` line. `require("./greeting")` gives back the `makeGreeter` function, and the `("english")` straight after it **calls** that function immediately. The result is the greeting function, which we store in `greetEnglish`.

That line should look very familiar.

## The prompt-sync line, finally explained

Since [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user) you have typed this line as a bit of magic:

```js
const prompt = require("prompt-sync")();
```

You now know every piece of it:

1. `require("prompt-sync")`: no `./`, so this is a **package**. Node looks in the `node_modules` folder, finds the `prompt-sync` package that `npm install` put there, runs its main file, and hands back its `module.exports`.
2. What does `prompt-sync` export? A **function**, exactly like `greeting.js`. Its job is to *create* a prompt function. (It is written this way so that you could pass it settings, inside those brackets, if you wanted to.)
3. The `()` straight after it **calls** that function, with no settings. It returns the actual `prompt` function, the one that asks a question and waits for an answer.
4. `const prompt = …` stores that function under the name `prompt`.

Written the long way, it is:

```js
const promptSync = require("prompt-sync");
console.log(typeof promptSync);

const prompt = promptSync();
console.log(typeof prompt);

const name = prompt("What is your name? ");
console.log(`Hi, ${name}!`);
```

A sample session:

```text
function
function
What is your name? Zanele
Hi, Zanele!
```

Both are functions: one that *makes* prompts, and the prompt it made. The one-line version does the same thing with less typing. No more magic.

::: note What if prompt-sync is not installed?
If you run a program that requires `prompt-sync` in a folder where you never ran `npm install prompt-sync`, you get `Error: Cannot find module 'prompt-sync'`. Node looks in `node_modules` in the program's folder, then in its parent folder, and so on up. That is why your `coding-practice` programs find it: the package lives in `coding-practice/node_modules`.
:::

## Three kinds of module

| Kind | Example | Where it comes from | How you require it |
|---|---|---|---|
| **Built-in** | `fs` (files) | Comes with Node. Nothing to install. | `require("fs")` |
| **Installed package** | `prompt-sync` | Written by someone else, downloaded with `npm install` into `node_modules`, and listed in `package.json`. | `require("prompt-sync")` |
| **Your own** | `money.js` | A file you wrote. | `require("./money")` |

You have used all three now. `require("fs")` from [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json) is the built-in kind: it gives you an object full of file functions.

```js
const fs = require("fs");
console.log(typeof fs);
console.log(typeof fs.readFileSync);
```

Output:

```text
object
function
```

Same `require`, same idea: every module hands out whatever it put in its `module.exports`. The only difference between the three kinds is **where Node looks** for them.

::: note A different style you will see online
Newer JavaScript code often uses `import { formatMoney } from "./money.js";` and `export function formatMoney…` instead of `require` and `module.exports`. These are called **ES modules**. They do the same job with different words, and need a small setting to work in Node. This course uses `require` because it works with no setup. When you meet `import` later, you will already understand the idea.
:::

## How to split a file well

Some guidelines for deciding what goes where:

- **Group by job.** Everything about money in one file. Everything about saving and loading in another. If you cannot describe a file's job in one short sentence, it may be doing too much.
- **Keep input and output at the edges.** Modules full of calculations should take data in and return answers, without `prompt` or `console.log` inside. The main file does the talking to the user. This is the "pure functions" idea from [Designing with functions](#/phase-04-functions/06-designing-with-functions).
- **Have one main file.** One file (often `index.js`) is where the program starts. It requires the others. The others do not require it back.
- **Only export what others need.** A small helper used only inside `money.js` can stay private to it.

::: exercise Level 1 — Guided · Move helpers into helpers.js
Create a folder `phase-8/results/`. In it, create `results.js` with this code:

```js
// results.js — class results, all in one file

function capitalise(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const average = (numbers) =>
  numbers.reduce((total, n) => total + n, 0) / numbers.length;

function symbolFor(mark) {
  if (mark >= 80) {
    return "A";
  } else if (mark >= 70) {
    return "B";
  } else if (mark >= 60) {
    return "C";
  } else if (mark >= 50) {
    return "D";
  }
  return "F";
}

const learners = [
  { name: "naledi", marks: [78, 91, 85] },
  { name: "JOSHUA", marks: [55, 62, 48] },
  { name: "priya", marks: [70, 74, 69] },
];

learners.forEach((learner) => {
  const avg = average(learner.marks);
  console.log(`${capitalise(learner.name)}: ${avg.toFixed(1)} (${symbolFor(avg)})`);
});
```

1. Run it with `node phase-8/results/results.js` and note the output. It should be:
   ```text
   Naledi: 84.7 (A)
   Joshua: 55.0 (D)
   Priya: 71.0 (B)
   ```
2. Create `phase-8/results/helpers.js`.
3. **Cut** (not copy) the three helper functions, `capitalise`, `average` and `symbolFor`, out of `results.js` and paste them into `helpers.js`.
4. At the bottom of `helpers.js`, export all three with `module.exports = { … };`.
5. At the top of `results.js`, require them from `./helpers` with destructuring.
6. Run `results.js` again. The output must be **exactly the same** as in step 1. If it is, you have **refactored**: changed how the code is organised without changing what it does.
:::

::: solution
`helpers.js`:
```js
// helpers.js — small, reusable helper functions

function capitalise(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const average = (numbers) =>
  numbers.reduce((total, n) => total + n, 0) / numbers.length;

function symbolFor(mark) {
  if (mark >= 80) {
    return "A";
  } else if (mark >= 70) {
    return "B";
  } else if (mark >= 60) {
    return "C";
  } else if (mark >= 50) {
    return "D";
  }
  return "F";
}

module.exports = { capitalise, average, symbolFor };
```

`results.js`:
```js
// results.js — class results, using helpers from another file
const { capitalise, average, symbolFor } = require("./helpers");

const learners = [
  { name: "naledi", marks: [78, 91, 85] },
  { name: "JOSHUA", marks: [55, 62, 48] },
  { name: "priya", marks: [70, 74, 69] },
];

learners.forEach((learner) => {
  const avg = average(learner.marks);
  console.log(`${capitalise(learner.name)}: ${avg.toFixed(1)} (${symbolFor(avg)})`);
});
```
Output:
```text
Naledi: 84.7 (A)
Joshua: 55.0 (D)
Priya: 71.0 (B)
```
`results.js` is now short enough to read in one glance: data, and what to do with it. The "how" lives in `helpers.js`.
:::

::: exercise Level 2 — On your own · Reuse your helpers
Pick two helper functions you wrote earlier in this course, for example `formatMoney`, `isValidAmount`, `countVowels` or `isPalindrome` from [the problem-solving lesson](#/phase-08-becoming-a-programmer/01-solving-problems). Put them in `phase-8/modules/text-tools.js` and export them. Then write `phase-8/modules/use-tools.js` that requires them and prints the result of calling each one twice with different arguments.

Then add a *second* file, `use-tools-again.js`, that requires only **one** of the two. That is reuse without copy-paste.
:::

::: hint
The pattern is always the same three steps: write the functions, add `module.exports = { nameOne, nameTwo };` at the bottom, then `const { nameOne, nameTwo } = require("./text-tools");` at the top of the file that uses them. To take only one, list only one name inside the curly braces.
:::

::: solution
One possible answer.

`text-tools.js`:
```js
function countVowels(text) {
  let count = 0;
  for (const ch of text.toLowerCase()) {
    if ("aeiou".includes(ch)) {
      count++;
    }
  }
  return count;
}

function isPalindrome(text) {
  const cleaned = text.toLowerCase().split(" ").join("");
  return cleaned === cleaned.split("").reverse().join("");
}

module.exports = { countVowels, isPalindrome };
```

`use-tools.js`:
```js
const { countVowels, isPalindrome } = require("./text-tools");

console.log(countVowels("Johannesburg"));
console.log(countVowels("Polokwane"));
console.log(isPalindrome("Racecar"));
console.log(isPalindrome("Soweto"));
```
Output:
```text
4
4
true
false
```

`use-tools-again.js`:
```js
const { isPalindrome } = require("./text-tools");
console.log(isPalindrome("never odd or even"));
```
Output:
```text
true
```
:::

::: debug Three broken requires
Each pair of files has one problem. The files are in the same folder. Run the second file of each pair, read the error, and fix it.

```js
// A: tax.js
const addVat = (amount) => amount * 1.15;
```
```js
// A: checkout.js
const { addVat } = require("./tax");
console.log(addVat(200));
```

```js
// B: dates.js
const daysInWeek = 7;
module.exports = { daysInWeek };
```
```js
// B: plan.js
const { daysInWeek } = require("dates");
console.log(`Gym ${daysInWeek - 2} days a week`);
```

```js
// C: sizes.js
const shirtSize = (chest) => (chest < 95 ? "M" : "L");
module.exports = { shirtSize };
```
```js
// C: order.js
const { ShirtSize } = require("./sizes");
console.log(ShirtSize(100));
```
:::

::: solution
**A:** `TypeError: addVat is not a function`. `tax.js` never exports anything, so `require` hands back an empty object. Add `module.exports = { addVat };` to `tax.js`. It then prints `229.99999999999997` (the floating-point surprise from [Numbers](#/phase-01-storing-information/04-numbers); wrap it in `Math.round` or use `toFixed(2)` if you want a tidy answer).

**B:** `Error: Cannot find module 'dates'`. Without `./`, Node looks for an installed package. Change it to `require("./dates")`. It then prints `Gym 5 days a week`.

**C:** `TypeError: ShirtSize is not a function`. The export is called `shirtSize` (lower-case `s`). The names must match exactly. Use `const { shirtSize } = require("./sizes");` and `shirtSize(100)`, which prints `L`.
:::

::: mistake
**Forgetting `./` for your own files.** `require("money")` looks for a package. `require("./money")` looks for your file.

**Forgetting to export.** Writing a function in a module does not share it. It must appear in `module.exports`.

**Name mismatches.** The name in the curly braces must match the exported name exactly, including capitals.

**Two files requiring each other.** If `money.js` requires `index.js` and `index.js` requires `money.js`, you get strange half-empty objects. Keep it one-way: the main file requires the helpers, never the other way round.

**Putting `module.exports` at the top.** `module.exports = { formatMoney };` must come *after* `formatMoney` is created. The bottom of the file is the safe, conventional place.
:::

## Real-world uses

- Every real JavaScript project is made of modules. A medium-sized app might have hundreds of files, each with a single job.
- `npm` hosts millions of packages. Each is a module (or a group of modules) that someone exported so others could `require` it. You are now able to read the documentation for any of them.
- Teams split work by module: one person owns the payments module, another the reports module.
- Splitting code also makes testing easier: you can require one module on its own in a test file and check its functions, without running the whole program.

::: connect
**This builds on:** functions as values ([Phase 7](#/phase-07-functions-as-values/01-passing-functions-to-functions)), objects ([Phase 6](#/phase-06-objects/01-what-is-an-object)), scope ([Phase 4](#/phase-04-functions/04-scope)) and packages ([Phase 1](#/phase-01-storing-information/08-getting-input-from-the-user)).

**This unlocks:** organised projects. You will split Budget Buddy into four files in [Budget Buddy, finished](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final). Before that, [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git) gives you a safety net, so you can reorganise code without fear.
:::

::: challenge A converter module that exports one function
Write `phase-8/modules/converter.js` that exports a **single function** (not an object), `makeConverter(rate)`. It returns a new function that takes an amount and returns `amount * rate`, rounded to 2 decimal places as a number.

Then in `use-converter.js`, create a converter from rand to US dollars with a rate of your choice **in one line**, in the same style as the prompt-sync line, and print a few conversions.
:::

::: solution
`converter.js`:
```js
function makeConverter(rate) {
  return (amount) => Number((amount * rate).toFixed(2));
}

module.exports = makeConverter;
```

`use-converter.js`:
```js
const randToDollars = require("./converter")(0.055);

console.log(randToDollars(100));
console.log(randToDollars(2500));
```
Output:
```text
5.5
137.5
```
`require("./converter")` gives back `makeConverter`, and `(0.055)` calls it straight away, returning the converting function. That is exactly the shape of `require("prompt-sync")()`. (The rate here is made up. Real exchange rates change every day.)
:::

::: recap
- A **module** is a file whose code can be shared. Everything in a file is private until you **export** it.
- `module.exports = { a, b };` decides what a file hands out. `{ a, b }` is short for `{ a: a, b: b }`.
- `require("./file")` runs that file (once) and gives back its `module.exports`.
- `const { a, b } = require(...)` is **destructuring**: pick these names out of the object.
- `./` means "my own file, next to this one". No `./` means a built-in module or an installed package.
- `require("prompt-sync")` returns a function that makes prompts, and `()` calls it to get your `prompt` function.
- Three kinds: **built-in** (`fs`), **installed** (`prompt-sync`), and **your own** (`./money`).
:::

::: interview Why does `require("money")` fail when `money.js` is right there in the folder?
Without `./`, Node treats `money` as the name of a built-in module or an installed package, and looks in `node_modules`, not in your folder. `require("./money")` tells it to look for your own file relative to the current file.
:::

::: interview Explain `const prompt = require("prompt-sync")();` in your own words.
`require("prompt-sync")` loads the installed `prompt-sync` package, which exports a function that creates prompt functions. The `()` calls that function straight away, and it returns the actual `prompt` function, which is stored in the constant `prompt`.
:::

::: interview What does `const { formatMoney } = require("./money");` do?
It loads `money.js`, gets the object it exported, and picks out the property called `formatMoney`, creating a constant with that name. It is short for `const formatMoney = require("./money").formatMoney;`.
:::

::: checkpoint
- [ ] I created `money.js` and `shop.js` and ran a two-file program
- [ ] I saw `is not a function` when I forgot to export, and fixed it
- [ ] I saw `Cannot find module` when I left off `./`, and fixed it
- [ ] I moved three helpers into `helpers.js` and the output stayed exactly the same
- [ ] I can explain every piece of the prompt-sync line out loud
- [ ] I can name the three kinds of module, with an example of each
:::

::: resources
- **Node.js documentation, "Modules: CommonJS modules":** https://nodejs.org/api/modules.html. The official reference for `require` and `module.exports`. Dense, but the first examples are readable now.
- **javascript.info, "Modules, introduction":** https://javascript.info/modules-intro. Explains the newer `import`/`export` style, for when you meet it.
- **javascript.info, "Destructuring assignment":** https://javascript.info/destructuring-assignment. Everything destructuring can do, well beyond what you need today.
:::
