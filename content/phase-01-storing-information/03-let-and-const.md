---
title: let, const, and choosing good names
summary: Boxes that can change, boxes that are sealed shut, and how to name them so your code explains itself.
minutes: 35
stage: Phase 1
---

## What you will learn

- How to make a variable that **cannot** be given a new value, with `const`
- When to use `const` and when to use `let` (and why `const` is the default)
- Why you will see `var` in older code, and why we do not use it
- The rules for naming variables, and the habits that make names genuinely helpful

**Before this:** [Variables](#/phase-01-storing-information/02-variables). You should be comfortable with `let`, `=`, and changing a variable's value.

## The problem: some values should never change

In the last lesson you learned that a `let` variable can be given a new value at any time. That is exactly what you want for a wallet balance, a score, or a running total.

But some values in a program are **not supposed to change**, ever:

- The VAT rate in South Africa: 15%.
- The number of days in a week: 7.
- The price per kilogram on today's menu board.
- Your date of birth.

If one of those is a `let`, nothing stops a later line from changing it by accident. Picture a long program where, 200 lines down, someone types:

```js
let vatRate = 0.15;
// ... lots of other code ...
vatRate = 0.51;   // a typo: they meant to change something else
console.log("VAT on R200:", 200 * vatRate);
```

Output:

```text
VAT on R200: 102
```

No error, no warning. Every invoice is now wildly wrong, and nobody notices until a customer complains. It would be much better if JavaScript itself **refused** to let that value change.

::: analogy A whiteboard and an engraved plaque
A `let` variable is like a label on a **whiteboard**. You can wipe the value and write a new one whenever you like. Useful for a score in a game.

A `const` variable is like a **brass plaque engraved** with the value. Once it is made, it is fixed. If anyone tries to change it, they cannot: the engraving does not come off.

Both have a name and a value. The difference is only whether the value can be *replaced*.
:::

## Meet `const`

`const` (short for **constant**, meaning "does not change") creates a variable the same way `let` does:

```js
const VAT_RATE = 0.15;
const price = 200;

console.log("Price:", price);
console.log("VAT:", price * VAT_RATE);
console.log("Price with VAT:", price + price * VAT_RATE);
```

Output:

```text
Price: 200
VAT: 30
Price with VAT: 230
```

So far it looks exactly like `let`. The difference appears the moment you try to give it a new value:

```js
const VAT_RATE = 0.15;
VAT_RATE = 0.2;
```

Output:

```text
TypeError: Assignment to constant variable.
```

Node points its caret `^` at the `=` on line 2: "you tried to assign here, and you are not allowed to". This is a **good** error. It is JavaScript protecting you from the silent mistake in the previous section.

::: note Where does the error appear?
Unlike a `SyntaxError`, which stops the program before any of it runs, this `TypeError` happens **while the program is running**, at the line that tries the change. Any `console.log` lines above it will already have printed. Try it and see.
:::

### A `const` needs its value straight away

With `let`, you can create an empty box and fill it later. With `const`, you cannot, because you would never be allowed to fill it:

```js
const birthYear;
```

Output:

```text
SyntaxError: Missing initializer in const declaration
```

An **initializer** is the `= value` part. `const` insists on having one.

::: try let versus const
1. In your `coding-practice` folder, create `phase-1/constants.js`.
2. Type this in:
   ```js
   const DAYS_IN_WEEK = 7;
   let daysLeft = 7;

   console.log("Days in a week:", DAYS_IN_WEEK);

   daysLeft = daysLeft - 2;
   console.log("Days left after Tuesday:", daysLeft);
   ```
3. Save, then run from inside `coding-practice`:
   ```bash
   node phase-1/constants.js
   ```
4. You should see:
   ```text
   Days in a week: 7
   Days left after Tuesday: 5
   ```
5. **Now break it on purpose.** Add this line at the very end:
   ```js
   DAYS_IN_WEEK = 8;
   ```
   Predict: will the first two lines still print? Will there be an error? Which line will Node point at? Run it and check.
6. Delete the broken line, so the file works again.
:::

## Which one should I use?

Here is the rule that most professional JavaScript programmers follow:

> **Use `const` by default. Switch to `let` only when you know the value needs to change.**

That may feel backwards. Why not use `let` for everything, since it does more?

Because `const` **tells the reader something**. When you see `const total = ...`, you know that `total` has that value for the rest of the program. You do not have to hunt through the file for places that might change it. With `let`, you always have to wonder.

In practice, most variables never get a new value. You work something out once, give it a name, and use it:

```js
const bread = 18;
const milk = 32;
const eggs = 45;
const total = bread + milk + eggs;

console.log("Total:", total);
```

Output:

```text
Total: 95
```

None of these change, so they are all `const`. Compare it to this:

```js
let lives = 3;
lives = lives - 1;   // hit by a monster
lives = lives - 1;   // fell in a hole
console.log("Lives left:", lives);
```

Output:

```text
Lives left: 1
```

`lives` must change, so it is `let`.

A simple way to decide:

| Ask yourself | If yes | If no |
|---|---|---|
| Will this variable ever be given a new value with `=` later on? | `let` | `const` |

If you are not sure, start with `const`. If you later need to change it, JavaScript will tell you with a `TypeError`, and you swap the word to `let`. That is a perfectly normal way to work.

::: predict Will this program work?
```js
const name = "Ayanda";
let score = 0;

score = score + 10;
score = score + 5;

console.log(name, "scored", score);
```
Decide whether it crashes or prints something. If it prints, what exactly?
:::

::: solution
It works, and prints:
```text
Ayanda scored 15
```
`name` never changes, so `const` is fine. `score` changes twice, and it is a `let`, so that is allowed too. There would only be an error if the program tried to give `name` a new value.
:::

## What about `var`?

In older JavaScript tutorials and code, you will see a third word:

```js
var city = "Polokwane";
```

`var` is how variables were made before 2015, when `let` and `const` were added to the language. It still works, so old code does not break. But `var` has some confusing behaviour: it lets you declare the same name twice without complaint, and it ignores some of the boundaries in your code that `let` and `const` respect (you will learn about those boundaries in [Phase 4](#/phase-04-functions/04-scope)). Both lead to bugs that are hard to find.

So the modern rule is: **do not use `var`**. If you see it in an example online, read it as `let`. This course never uses it.

## Naming rules: what JavaScript allows

A variable's name is also called an **identifier**. JavaScript has strict rules about what a name can contain. Break one, and you get a `SyntaxError` before anything runs.

A name:

1. **Can contain** letters, digits, underscores `_` and dollar signs `$`.
2. **Cannot start with a digit.** `player2` is fine. `2ndPlace` is not.
3. **Cannot contain spaces or hyphens.** `firstName` is fine. `first name` and `first-name` are not.
4. **Is case-sensitive.** `total`, `Total` and `TOTAL` are three different variables.
5. **Cannot be a reserved word.** A **reserved word** (or **keyword**) is a word JavaScript already uses for itself, such as `let`, `const`, `var`, `if`, `for`, `class`, `function`, `return` and `new`.

Here is what the broken ones look like:

```js
let 2ndPlace = "Zanele";
```

Output:

```text
SyntaxError: Invalid or unexpected token
```

```js
let first-name = "Ama";
```

Output:

```text
SyntaxError: Unexpected token '-'
```

JavaScript reads `first-name` as "first minus name", which makes no sense on the left of `=`.

```js
const class = "10B";
```

Output:

```text
SyntaxError: Unexpected token 'class'
```

`class` is a reserved word. Use `className` or `schoolClass` instead.

::: note Why "token"?
A **token** is one "word" of code: a name, a number, a symbol like `=` or `-`. "Unexpected token" means "I got to this piece and it does not fit here". It almost always means a typo or a naming problem on that line.
:::

## Naming habits: what makes a name good

The rules tell you what is **allowed**. Habits, called **conventions**, tell you what is **good**. JavaScript will not stop you breaking a convention, but other programmers (including you, next month) will struggle to read your code.

### 1. Use camelCase

Names made of several words are written with the words joined, the first word in lower case, and each following word starting with a capital letter:

```text
firstName
monthlyIncome
totalWithVat
numberOfPlayers
```

The capitals stick up like the humps on a camel, which is where the name **camelCase** comes from. This is the standard style in JavaScript, and it is what this course uses.

### 2. Make the name say what is inside

A name should tell you what the value **means**, not just what kind of thing it is.

| Unhelpful | Better | Why |
|---|---|---|
| `x` | `price` | `x` could be anything |
| `n` | `numberOfGuests` | Longer, but you never have to guess |
| `data` | `studentMarks` | Everything is data. What data? |
| `temp2` | `celsius` | What is it the temperature *of*, and in what unit? |
| `thing` | `busFare` | Says the purpose |
| `a1`, `a2`, `a3` | `rent`, `food`, `transport` | Numbers in names often mean you have not decided what they are |

Do not be afraid of longer names. You type them once, and then VS Code offers to complete them for you. A name that is clear is always better than one that is short.

### 3. Yes/no values start with `is`, `has` or `can`

Some variables will hold a yes-or-no answer: has this person paid? Is the shop open? You will meet these properly in [true, false, and nothing](#/phase-01-storing-information/06-booleans-null-undefined). When you do, name them so they read like a question: `isPaid`, `isOpen`, `hasTicket`, `canVote`.

### 4. Fixed settings in CAPITAL_LETTERS

Some `const` values are **settings**: facts about the world or rules of your program that you might one day want to adjust in a single place. A tax rate, a maximum number of players, a delivery fee. Many programmers write these in capitals with underscores between the words:

```js
const VAT_RATE = 0.15;
const DELIVERY_FEE = 35;
const MAX_PLAYERS = 4;
```

The capitals shout "this is a fixed setting, not something the program works out". Ordinary `const` values that are *calculated*, such as `const total = bread + milk;`, stay in camelCase.

::: try Good names versus bad names
1. Create `phase-1/names.js` and type in this program, exactly as it is:
   ```js
   const a = 3;
   const b = 12;
   const c = 2;
   const d = a * b + c * 25;
   console.log(d);
   ```
2. Run it with `node phase-1/names.js`. You should see:
   ```text
   86
   ```
3. Now, without scrolling down, try to say what the program is about. Hard, right?
4. Here is the same program with better names. Replace your code with it:
   ```js
   const numberOfPies = 3;
   const pricePerPie = 12;
   const numberOfCooldrinks = 2;
   const pricePerCooldrink = 25;
   const totalCost = numberOfPies * pricePerPie + numberOfCooldrinks * pricePerCooldrink;
   console.log("Total cost:", totalCost);
   ```
5. Run it again. You should see:
   ```text
   Total cost: 86
   ```
6. Same answer, same work for the computer. But now a human can read it. Change the number of pies to `5` and predict the new total before you run it.
:::

::: exercise Level 1 — Guided · Rename a messy program
Create `phase-1/tidy.js` and type this messy program in. It works out the cost of a taxi trip to work and back for a month.

```js
let X = 18;
let y2 = 2;
let Z = 22;
let q = X * y2 * Z;
console.log(q);
```

1. Run it first and note the answer (`792`).
2. Rename `X` to `taxiFare`. Change it everywhere it appears.
3. Rename `y2` to `tripsPerDay`.
4. Rename `Z` to `workDaysPerMonth`.
5. Rename `q` to `monthlyTaxiCost`.
6. None of these values change after they are created. Change every `let` to `const`.
7. Change the last line so it prints a label: `"Monthly taxi cost:"`, then the value.
8. Run it again. The answer must still be `792`. If it is not, one of your renames is inconsistent.
:::

::: solution
```js
const taxiFare = 18;
const tripsPerDay = 2;
const workDaysPerMonth = 22;
const monthlyTaxiCost = taxiFare * tripsPerDay * workDaysPerMonth;
console.log("Monthly taxi cost:", monthlyTaxiCost);
```
Output:
```text
Monthly taxi cost: 792
```
If you got `ReferenceError: X is not defined` (or similar), you renamed a variable where it was created but missed a place where it was used.

Tip for the future: VS Code can rename a variable everywhere at once. Click on the name, press **F2**, type the new name and press **Enter**.
:::

::: exercise Level 2 — On your own · Pizza night
Create `phase-1/pizza.js`. Mpho is ordering pizza for friends.

- A pizza costs R89 and delivery costs R35. These are fixed settings, so name them in capitals.
- Mpho starts by ordering for 3 pizzas. Then two more friends arrive, and she adds 1 more pizza.
- Print the number of pizzas, the cost of the pizzas, and the total including delivery (delivery is charged once, not per pizza).

Choose `const` or `let` for each variable carefully. Only one variable should need `let`.
:::

::: hint
Which value changes after it is first created? The price does not. The delivery fee does not. The number of pizzas does. Work out the costs *after* the number of pizzas has reached its final value, so they can be `const`.
:::

::: solution
```js
const PIZZA_PRICE = 89;
const DELIVERY_FEE = 35;

let numberOfPizzas = 3;
numberOfPizzas = numberOfPizzas + 1;   // two more friends arrived

const pizzaCost = numberOfPizzas * PIZZA_PRICE;
const totalCost = pizzaCost + DELIVERY_FEE;

console.log("Pizzas:", numberOfPizzas);
console.log("Pizza cost:", pizzaCost);
console.log("Total with delivery:", totalCost);
```
Output:
```text
Pizzas: 4
Pizza cost: 356
Total with delivery: 391
```
If you worked out `pizzaCost` *before* adding the extra pizza, you got `267` and a total of `302`. Code runs top to bottom: a calculation uses the values the variables hold **at that moment**, and does not update itself later.
:::

::: debug Four naming problems
This program should print a learner's average mark, but it will not even start. Run it, fix the first error, run it again, and repeat until it works. Keep a note of each error message.

```js
const learner name = "Kwame";
const maths-mark = 72;
const 1stTermEnglish = 64;
const new = 80;
const average = (maths-mark + 1stTermEnglish + new) / 3;
console.log(learner name, average);
```
:::

::: solution
The errors, in the order Node reports them:

1. `SyntaxError: Missing initializer in const declaration`, with the caret under `learner`. JavaScript read `const learner`, expected an `=` next, and found another word instead. The real problem: a name cannot contain a space. Use `learnerName`.
2. The same message again, this time under `maths`. JavaScript read `const maths`, then saw `-`, not `=`. A name cannot contain a hyphen. Use `mathsMark`.
3. `SyntaxError: Invalid or unexpected token`. A name cannot start with a digit. Use `englishTerm1`.
4. `SyntaxError: Unexpected token 'new'`. `new` is a reserved word. Use a name that says what the mark is for, such as `scienceMark`.

Notice that the first two messages did not say "bad name". Error messages describe what JavaScript *expected*, which is not always what you did wrong. Read the line and look near the caret.

Remember to change each name **everywhere** it is used, including on the last two lines.

```js
const learnerName = "Kwame";
const mathsMark = 72;
const englishTerm1 = 64;
const scienceMark = 80;
const average = (mathsMark + englishTerm1 + scienceMark) / 3;
console.log(learnerName, average);
```
Output:
```text
Kwame 72
```
:::

::: mistake
**Trying to change a `const`.** `TypeError: Assignment to constant variable.` means you gave a `const` a new value. Either you did not mean to change it (fix that line), or it really does change (make it a `let`).

**Creating a `const` without a value.** `const total;` is a `SyntaxError`. Give it its value on the same line.

**Using `let` for everything "just in case".** It works, but you lose the protection and the message to the reader. Default to `const`.

**Names with spaces or hyphens.** `first name` and `first-name` both fail. Use `firstName`.

**Starting a name with a digit.** `2ndPlace` fails. Use `secondPlace` or `place2`.

**Names that say nothing.** `x`, `data`, `thing`, `temp`. Your future self will not remember what they meant.

**Copying `var` from an old tutorial.** Use `const` or `let` instead.
:::

## Real-world uses

- **Settings at the top of a file.** Real programs often start with a block of constants such as `const MAX_LOGIN_ATTEMPTS = 3;` or `const FREE_DELIVERY_OVER = 500;`. When the business changes the rule, a developer changes one line.
- **Tax and fee calculations.** Payroll and shop software use constants like `VAT_RATE` so that one mistyped line cannot quietly change every invoice.
- **Team code.** In companies, many people work on the same files. Clear names and `const` let a colleague understand code they did not write, without asking you.
- **Code reviews.** When programmers check each other's work, "rename this to something clearer" is one of the most common comments. Good naming is a professional skill, not a detail.

::: connect
**This builds on:** [Variables](#/phase-01-storing-information/02-variables). `const` is a variable that cannot be given a new value.

**This unlocks:** from now on, every program in this course uses `const` by default and `let` only when a value changes. You will see `let` a lot in [Phase 3](#/phase-03-loops/01-why-loops), where counters and running totals change on every repeat. Next, [Numbers](#/phase-01-storing-information/04-numbers) looks closely at the first kind of value you have been storing.
:::

::: challenge Spot the let
Read this program **without running it**. For each variable, decide whether it could be a `const`. Then change every variable that can be `const` to `const`, and run it to prove it still works.

```js
let busFare = 15;
let tripsThisWeek = 0;
let WEEKLY_BUDGET = 200;

tripsThisWeek = tripsThisWeek + 2;   // Monday
tripsThisWeek = tripsThisWeek + 2;   // Tuesday
tripsThisWeek = tripsThisWeek + 1;   // Wednesday, got a lift home

let spent = tripsThisWeek * busFare;
let leftInBudget = WEEKLY_BUDGET - spent;

console.log("Trips:", tripsThisWeek);
console.log("Spent:", spent);
console.log("Left:", leftInBudget);
```
:::

::: solution
Only `tripsThisWeek` is given a new value after it is created, so it is the only one that must stay `let`. Everything else can be `const`:

```js
const busFare = 15;
let tripsThisWeek = 0;
const WEEKLY_BUDGET = 200;

tripsThisWeek = tripsThisWeek + 2;   // Monday
tripsThisWeek = tripsThisWeek + 2;   // Tuesday
tripsThisWeek = tripsThisWeek + 1;   // Wednesday, got a lift home

const spent = tripsThisWeek * busFare;
const leftInBudget = WEEKLY_BUDGET - spent;

console.log("Trips:", tripsThisWeek);
console.log("Spent:", spent);
console.log("Left:", leftInBudget);
```
Output:
```text
Trips: 5
Spent: 75
Left: 125
```
If you also considered renaming `busFare` to `BUS_FARE`, that is a reasonable choice too: it is a fixed setting.
:::

::: recap
- `const` creates a variable that **cannot** be given a new value. Trying gives `TypeError: Assignment to constant variable.`
- A `const` must get its value on the line where it is created.
- **Default to `const`.** Use `let` only when the value will change. This protects you and tells readers what to expect.
- `var` is the old way. Do not use it.
- Names may contain letters, digits, `_` and `$`, cannot start with a digit, cannot contain spaces or hyphens, cannot be reserved words, and are case-sensitive.
- Use **camelCase** (`monthlyIncome`), names that say what the value means, `is`/`has` for yes/no values, and `CAPITALS_WITH_UNDERSCORES` for fixed settings.
:::

::: interview When should you use `let` instead of `const`?
Only when the variable will be given a new value later in the program, for example a counter, a score or a running total. Everything else should be `const`. If you are unsure, start with `const`, and JavaScript will tell you if you need to change it.
:::

::: interview Why is `const` useful if `let` can do everything `const` can?
Because it prevents accidental changes (JavaScript throws an error instead of silently using a wrong value), and because it tells anyone reading the code that the value stays the same, so they do not have to check.
:::

::: interview Which of these names are allowed, and which are good? `total`, `2total`, `total-cost`, `totalCost`, `x`
`2total` (starts with a digit) and `total-cost` (contains a hyphen) are not allowed. `total`, `totalCost` and `x` are allowed. `totalCost` is the best of them because it is specific. `x` is allowed but tells the reader nothing.
:::

::: checkpoint
- [ ] I ran `phase-1/constants.js` and saw the `TypeError` when I changed a `const`
- [ ] I turned the unreadable `a b c d` program into a readable one
- [ ] I renamed the messy taxi program and still got `792`
- [ ] I finished pizza night using exactly one `let`
- [ ] I fixed all four naming errors in "Debug this", one at a time
- [ ] I can explain when to choose `const` and when to choose `let`
:::

::: resources
- **javascript.info, "Variables":** https://javascript.info/variables. The sections "Variable naming", "Reserved names" and "Constants" match this lesson.
- **MDN, "const":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const. The official reference. Read the first few paragraphs and the examples.
- **Eloquent JavaScript, chapter 2 "Program Structure":** https://eloquentjavascript.net/02_program_structure.html. The "Bindings" and "Binding names" sections cover the same ideas in a different voice.
:::
