---
title: switch and the ternary operator
summary: Two more ways to choose. switch picks one of many exact options, and the ternary picks between two values in a single line.
minutes: 45
stage: Phase 2
---

## What you will learn

- How `switch` picks one path out of many, based on an **exact** value (menu options, days of the week)
- What `break` does, what **fall-through** is, and why forgetting `break` is a bug
- How the **ternary operator** `condition ? a : b` chooses between two values in one line
- When each one makes code clearer, and when an ordinary `if` is better

**Before this:** [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy). You should be comfortable with `if / else if / else` chains and `===`.

## The problem: long chains of "is it exactly this?"

Programs often show a menu and act on what the user picks. With what you know, it looks like this:

```js
const choice = "3";

if (choice === "1") {
  console.log("Checking your balance...");
} else if (choice === "2") {
  console.log("Buying airtime...");
} else if (choice === "3") {
  console.log("Buying data...");
} else if (choice === "4") {
  console.log("Sending money...");
} else {
  console.log("That is not on the menu.");
}
```

Output:

```text
Buying data...
```

It works. But look at how much of it is repetition: `choice ===` four times, and `} else if (` four times. The important information (which number leads to which action) is buried in the punctuation. And every one of these questions has the same shape: "is `choice` **exactly** this value?".

That shape is so common that JavaScript has a special statement for it.

::: analogy A vending machine
At a vending machine, you type a code like `B4`. The machine does not ask "is it A1? no. Is it A2? no. Is it A3?..." out loud. It looks at the code and goes **straight to** slot B4, then drops that one item.

- The code you type is the value being checked.
- Each slot has a label: those are the **cases**.
- If you type a code that does not exist, the machine shows "Invalid selection": that is the **default**.
- Once your item drops, the machine stops. It does not keep dropping everything in the slots after it. That stopping is **`break`**.

Keep that last point in mind. It is the one place this analogy and JavaScript can go wrong together.
:::

## `switch`: picking one of many exact values

Here is the same menu as a `switch`:

```js
const choice = "3";

switch (choice) {
  case "1":
    console.log("Checking your balance...");
    break;
  case "2":
    console.log("Buying airtime...");
    break;
  case "3":
    console.log("Buying data...");
    break;
  case "4":
    console.log("Sending money...");
    break;
  default:
    console.log("That is not on the menu.");
}
```

Output:

```text
Buying data...
```

Piece by piece:

| Piece | What it means |
|---|---|
| `switch (choice)` | "Look at the value of `choice`." |
| `case "1":` | "If it is exactly `"1"`, start running here." Note the **colon**, not a brace. |
| the lines after a `case` | What to do for that option. They are indented under the `case`. |
| `break;` | "Stop. Jump out of the whole `switch`." |
| `default:` | "If no case matched, start running here." Like the final `else`. It is optional. |
| `{ }` | One pair of braces around all the cases. |

As a flowchart, a `switch` goes straight to the matching label:

```text
                  what is choice?
     +--------+--------+--------+--------+
     |        |        |        |        |
    "1"      "2"      "3"      "4"    anything else
     |        |        |        |        |
  balance  airtime   data     send    "not on the menu"
     |        |        |        |        |
     +--------+--------+--------+--------+
                        |
                   after the switch
```

Each `case` checks with the same strictness as `===`. That matters a lot with `prompt`, as you are about to see.

::: try A phone-style menu
1. Create `phase-2/menu.js` in your `coding-practice` folder:
   ```js
   const prompt = require("prompt-sync")();

   console.log("1) Balance");
   console.log("2) Buy airtime");
   console.log("3) Buy data");
   const choice = prompt("Choose 1, 2 or 3: ").trim();

   switch (choice) {
     case "1":
       console.log("Your balance is R42.50.");
       break;
     case "2":
       console.log("Airtime bought.");
       break;
     case "3":
       console.log("Data bundle bought.");
       break;
     default:
       console.log("Sorry, that is not an option.");
   }
   ```
2. Run it:
   ```bash
   node phase-2/menu.js
   ```
3. Type `2`. You should see:
   ```text
   1) Balance
   2) Buy airtime
   3) Buy data
   Choose 1, 2 or 3: 2
   Airtime bought.
   ```
4. Try `3`, then `9`, then `hello`. Predict each one first.
5. **Now break it on purpose.** Change `case "1":` to `case 1:` (a number, no quotes). Run it and type `1`. What happens, and why? Put the quotes back afterwards.
:::

With `case 1:`, typing `1` gives "Sorry, that is not an option." `prompt` returns the **string** `"1"`, and `switch` compares strictly, like `===`. The string `"1"` is not exactly the number `1`. Either keep the cases as strings (as above, which is simplest for menus), or convert the choice with `Number()` and use number cases. Make sure both sides are the same type.

::: quiz
What does this print?

```js
const choice = Number("2");

switch (choice) {
  case "1":
    console.log("Balance");
    break;
  case "2":
    console.log("Airtime");
    break;
  default:
    console.log("Not on the menu");
}
```

- [ ] `Airtime`
- [x] `Not on the menu`
- [ ] `Balance`
- [ ] `Airtime`, then `Not on the menu`

`Number("2")` is the number 2, but the cases are the strings `"1"` and `"2"`. `switch` compares like `===`, so the number 2 matches neither label and `default` runs. It is the opposite of the usual `prompt` mistake: here someone converted the input but left the labels as text. The value and the labels must be the same type: either `case 2:` with a number, or no `Number()` and `case "2":`.
:::

## Forgetting `break`: fall-through

Here is what happens if you leave out the `break` lines:

```js
const choice = "2";

switch (choice) {
  case "1":
    console.log("Checking your balance...");
  case "2":
    console.log("Buying airtime...");
  case "3":
    console.log("Buying data...");
  default:
    console.log("That is not on the menu.");
}
```

Output:

```text
Buying airtime...
Buying data...
That is not on the menu.
```

The user picked 2, and the program bought airtime, bought data, **and** complained. This is the one place the vending machine picture breaks: a `case` label only says where to **start** running. Once JavaScript starts, it keeps running every line below, straight through the other `case` labels, until it hits a `break` or the end of the `switch`. This is called **fall-through**.

Forgetting a `break` does not cause an error message. The program silently does too much. So:

**Give every `case` a `break`**, except the last one (usually `default`), where there is nothing left to fall into. Many people put a `break` there too, for tidiness. Either is fine.

### Fall-through on purpose: grouping cases

Fall-through is not always a bug. When several values should do **the same thing**, you can stack their labels with nothing between them:

```js
const day = "saturday";

switch (day) {
  case "saturday":
  case "sunday":
    console.log("Weekend: taxis run a reduced schedule.");
    break;
  case "monday":
  case "tuesday":
  case "wednesday":
  case "thursday":
  case "friday":
    console.log("Weekday: normal taxi schedule.");
    break;
  default:
    console.log("That is not a day I know.");
}
```

Output:

```text
Weekend: taxis run a reduced schedule.
```

`"saturday"` matches the first label. There is nothing under it, so JavaScript falls through to the `"sunday"` lines, prints the weekend message, and hits `break`. Stacked labels read like "saturday or sunday".

Load-shedding stages are another good fit, because each stage is an exact whole number:

```js
const stage = 3;

switch (stage) {
  case 0:
    console.log("No load-shedding. Enjoy it!");
    break;
  case 1:
  case 2:
    console.log("Light load-shedding. Check your schedule.");
    break;
  case 3:
  case 4:
    console.log("Charge your phone and power bank now.");
    break;
  default:
    console.log("Heavy load-shedding. Expect long outages.");
}
```

Output:

```text
Charge your phone and power bank now.
```

::: predict What does this print?
```js
const size = "M";

switch (size) {
  case "S":
    console.log("Small: R25");
    break;
  case "M":
    console.log("Medium: R32");
  case "L":
    console.log("Large: R38");
    break;
  default:
    console.log("Unknown size");
}
```
:::

::: solution
```text
Medium: R32
Large: R38
```
It starts at `case "M"`, prints the medium price, and there is no `break`, so it falls into `case "L"` and prints the large price too. Then it hits `break` and stops. A coffee shop that charges you for two coffees because of a missing `break` is a real kind of bug.
:::

::: quiz
What does this print?

```js
const stage = 2;
let hours = 0;

switch (stage) {
  case 1:
    hours = hours + 2;
  case 2:
    hours = hours + 2;
  case 3:
    hours = hours + 2;
    break;
  case 4:
    hours = hours + 4;
  default:
    hours = hours + 1;
}

console.log(hours);
```

- [ ] `2`
- [ ] `5`
- [ ] `9`
- [x] `4`

It starts at `case 2:` and adds 2. There is no `break`, so it falls through into `case 3:`, adds 2 more, then hits `break` and leaves: 4. The `case 1:` lines are never run, because a `switch` jumps straight to its label and only falls **downwards**. `2` is what you would get if every case had a `break`. `5` is what you would get if it fell all the way into `default`, but the `break` under `case 3:` stops it first.
:::

## `switch` or `if`?

`switch` only ever asks one kind of question: "is this value **exactly** equal to that one?". It cannot ask "is it greater than 80?". So:

| Use `switch` when... | Use `if / else if` when... |
|---|---|
| you compare **one** value against a list of **exact** options | you check **ranges** (`mark >= 80`) |
| the options are things like menu numbers, day names, sizes, stages | you check **different** variables, or combine conditions with `&&` / `\|\|` |
| there are three or more options | there are only one or two options |

Marks to symbols (80 and above is an A) is a range question, so it stays an `if` chain. A menu choice is an exact-value question, so it suits `switch`.

### Turning a `switch` back into `if`

Any `switch` can be rewritten as an `if` chain, and seeing both side by side helps them click. The load-shedding `switch` above becomes:

```js
const stage = 3;

if (stage === 0) {
  console.log("No load-shedding. Enjoy it!");
} else if (stage === 1 || stage === 2) {
  console.log("Light load-shedding. Check your schedule.");
} else if (stage === 3 || stage === 4) {
  console.log("Charge your phone and power bank now.");
} else {
  console.log("Heavy load-shedding. Expect long outages.");
}
```

Output:

```text
Charge your phone and power bank now.
```

Each `case` became `stage === ...`. Stacked labels became `||`. `default` became `else`. And no `break` is needed, because an `if` chain only ever runs one block. Here you could even argue the `if` version is better: `stage >= 5` would be a clearer last check than `default`. Choose whichever reads more clearly for the problem.

::: quiz
Which `if` condition prints `R30` for exactly the same sizes as this `switch`?

```js
switch (size) {
  case "S":
  case "M":
    console.log("R30");
    break;
  default:
    console.log("R40");
}
```

- [x] `if (size === "S" || size === "M")`
- [ ] `if (size === "S" && size === "M")`
- [ ] `if (size <= "M")`
- [ ] `if (size === "S" || "M")`

Stacked labels mean "this one or that one", so they become `||`, with a full `size === ...` on each side. `size === "S" || "M"` is the trap from [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy): the right side is the string `"M"`, which is truthy, so every size would print R30. `size <= "M"` compares text alphabetically, so `"L"` would sneak in. `&&` can never be `true`, because one size cannot be both.
:::

## The ternary operator: choosing between two values

Often an `if / else` exists only to pick one of two **values** for a variable:

```js
const age = 10;
let ticket;

if (age < 12) {
  ticket = "child";
} else {
  ticket = "adult";
}

console.log(ticket);
```

Output:

```text
child
```

Five lines, and the variable has to be `let` and created empty first. The **ternary operator** does the same job in one line:

```js
const age = 10;
const ticket = age < 12 ? "child" : "adult";

console.log(ticket);
```

Output:

```text
child
```

Read `age < 12 ? "child" : "adult"` as: "**is** age under 12? **If so**, `"child"`. **Otherwise**, `"adult"`."

| Piece | What it means |
|---|---|
| `age < 12` | The condition, the same as in an `if`. |
| `?` | "If so..." |
| `"child"` | The value you get when the condition is truthy. |
| `:` | "Otherwise..." |
| `"adult"` | The value you get when the condition is falsy. |

It is called **ternary** because it has three parts (condition, yes-value, no-value). It is an **expression**: it works out to a value, like `2 + 3` does. That is why you can put it straight on the right of `=`, and why the variable can now be a `const`.

::: analogy A two-way tap
A mixer tap in a kitchen gives you hot or cold water depending on which way the handle points. You do not get two different sinks, one for each: you get **one** stream of water, and the handle decides which. The ternary is that handle. It does not choose between two actions. It chooses which **value** comes out.
:::

You can use a ternary anywhere a value is allowed, including inside a template literal:

```js
const items = 1;
console.log(`You have ${items} ${items === 1 ? "item" : "items"} in your cart.`);

const total = 3;
console.log(`You have ${total} ${total === 1 ? "item" : "items"} in your cart.`);
```

Output:

```text
You have 1 item in your cart.
You have 3 items in your cart.
```

Getting "1 item" versus "3 items" right is a small touch, but it makes a program feel careful. Without the ternary you would need a whole `if / else` around each message.

::: try Label things with a ternary
1. Create `phase-2/ternary.js`:
   ```js
   const prompt = require("prompt-sync")();

   const balance = Number(prompt("Your balance: R"));

   const status = balance >= 0 ? "in credit" : "overdrawn";
   const icon = balance >= 0 ? ":)" : ":(";

   console.log(`Your account is ${status} ${icon}`);
   ```
2. Run it with `node phase-2/ternary.js` and type `250`. You should see:
   ```text
   Your balance: R250
   Your account is in credit :)
   ```
3. Run it again with `-80`. Predict the output first.
4. **Now experiment.** What does it say for `0`? Is that what a bank would want? Change `>=` to `>` and try `0` again.
:::

### When the ternary hurts

The ternary is great for "pick one of two short values". It gets hard to read fast when you ask more of it.

**Chained ternaries** are legal but unkind to readers:

```js
const mark = 74;
const symbol = mark >= 80 ? "A" : mark >= 70 ? "B" : mark >= 60 ? "C" : "F";
console.log(symbol);
```

Output:

```text
B
```

It works, but you have to read it three times to be sure. An `if / else if` chain says the same thing plainly. **Rule of thumb: one `?` per line.** If you need a second, use `if`.

**Using a ternary for actions** instead of values is also confusing:

```js
const isRaining = true;
isRaining ? console.log("Take an umbrella.") : console.log("Enjoy the sun.");
```

Output:

```text
Take an umbrella.
```

This also runs, but it is not what the ternary is for. When you want to **do** one of two things, use `if / else`. When you want to **pick** one of two values, use the ternary.

::: exercise Level 1 — Guided · Taxi rank helper
Create `phase-2/taxi-rank.js`. A taxi rank has four routes.

1. Add the `prompt` line, then print the options: `A) Soweto`, `B) Sandton`, `C) Alexandra`, `D) Randburg`.
2. Ask `Which route? ` and store the answer with `.trim().toUpperCase()`, so that `a` and `A` both work.
3. Write a `switch` on the answer with `case "A":` (print `Soweto: R18, rank 4`), `case "B":` (print `Sandton: R22, rank 7`), `case "C":` (print `Alexandra: R15, rank 2`) and `case "D":` (print `Randburg: R20, rank 9`), each with a `break`.
4. Add `default:` that prints `No such route. Please choose A, B, C or D.`
5. Run it with `b`, `D` and `x`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

console.log("A) Soweto");
console.log("B) Sandton");
console.log("C) Alexandra");
console.log("D) Randburg");
const route = prompt("Which route? ").trim().toUpperCase();

switch (route) {
  case "A":
    console.log("Soweto: R18, rank 4");
    break;
  case "B":
    console.log("Sandton: R22, rank 7");
    break;
  case "C":
    console.log("Alexandra: R15, rank 2");
    break;
  case "D":
    console.log("Randburg: R20, rank 9");
    break;
  default:
    console.log("No such route. Please choose A, B, C or D.");
}
```
A sample session:
```text
A) Soweto
B) Sandton
C) Alexandra
D) Randburg
Which route? b
Sandton: R22, rank 7
```
:::

::: exercise Level 2 — On your own · Rubbish collection day
Create `phase-2/rubbish.js`. Ask for a day of the week. Using a `switch` with grouped cases:

- Monday and Thursday: `General waste is collected today.`
- Wednesday: `Recycling is collected today.`
- Saturday and Sunday: `No collection on weekends.`
- Tuesday and Friday: `No collection today.`
- Anything else: `I don't know that day.`

Accept any capitalisation. Then, after the `switch`, use a ternary to set a `reminder` to `"Put the bins out tonight!"` if the day is Sunday or Wednesday (the day before a collection), or `"Nothing to do tonight."` otherwise, and print it.
:::

::: hint
Tidy the day with `.trim().toLowerCase()` and use lower-case labels: `case "monday":`. For the reminder, the condition inside the ternary can use `||`: `day === "sunday" || day === "wednesday" ? "..." : "..."`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const day = prompt("What day is it? ").trim().toLowerCase();

switch (day) {
  case "monday":
  case "thursday":
    console.log("General waste is collected today.");
    break;
  case "wednesday":
    console.log("Recycling is collected today.");
    break;
  case "saturday":
  case "sunday":
    console.log("No collection on weekends.");
    break;
  case "tuesday":
  case "friday":
    console.log("No collection today.");
    break;
  default:
    console.log("I don't know that day.");
}

const reminder = day === "sunday" || day === "wednesday" ? "Put the bins out tonight!" : "Nothing to do tonight.";
console.log(reminder);
```
A sample session:
```text
What day is it? Sunday
No collection on weekends.
Put the bins out tonight!
```
The `||` is worked out before the `?`, so the whole of `day === "sunday" || day === "wednesday"` is the condition. You may add brackets around it to make that clearer, which is a good idea.
:::

::: debug The generous pizza shop
This program should print only `Large pizza: R129` when the user types `3`. Instead it prints the wrong thing. There are two bugs. Test it with `const choice = "3";` standing in for the prompt answer.

```js
const choice = "3";   // imagine this came from prompt

switch (choice) {
  case 1:
    console.log("Small pizza: R69");
    break;
  case 2:
    console.log("Medium pizza: R99");
    break;
  case 3:
    console.log("Large pizza: R129");
  default:
    console.log("Please choose 1, 2 or 3.");
}
```
:::

::: solution
Running it prints only:
```text
Please choose 1, 2 or 3.
```
**Bug 1:** `choice` is the string `"3"`, but the cases are numbers. `switch` compares strictly, so nothing matches and it goes to `default`. Make the cases strings (`case "3":`), or convert with `Number(choice)`.

**Bug 2 (hidden by bug 1):** `case 3` has no `break`. Once bug 1 is fixed, it would print the large pizza *and* fall through into the `default` message. Add `break;`.

```js
const choice = "3";   // imagine this came from prompt

switch (choice) {
  case "1":
    console.log("Small pizza: R69");
    break;
  case "2":
    console.log("Medium pizza: R99");
    break;
  case "3":
    console.log("Large pizza: R129");
    break;
  default:
    console.log("Please choose 1, 2 or 3.");
}
```
Output:
```text
Large pizza: R129
```
One bug hiding another is very common. Fix one, run again, and look carefully at the new output.
:::

::: mistake
**Forgetting `break`.** The program falls through and runs the next case too, with no error message. Give every case a `break`.

**Mixing strings and numbers.** `prompt` gives strings. `case 1:` never matches `"1"`. Keep both sides the same type.

**Using `switch` for ranges.** `case mark >= 80:` does not do what you hope. Ranges belong in an `if / else if` chain.

**Using braces instead of a colon.** It is `case "A":`, with a colon, not `case "A" {`.

**Nesting ternaries.** One `?` per line. More than that, use `if`.

**Using a ternary to run actions.** A ternary picks a value. To do one of two things, use `if / else`.
:::

::: quiz
What does this print?

```js
const eggs = 0;
const label = eggs === 1 ? "egg" : "eggs";
const note = eggs ? "in stock" : "sold out";

console.log(`${eggs} ${label}, ${note}`);
```

- [ ] `0 egg, sold out`
- [ ] `0 eggs, in stock`
- [x] `0 eggs, sold out`
- [ ] `0 egg, in stock`

`eggs === 1` is `false`, so `label` gets the value after the `:`, which is `"eggs"`. The second ternary has no comparison at all: its condition is `eggs` itself, which is `0`, and `0` is falsy, so `note` gets `"sold out"`. If you picked `in stock`, you may have read the condition as "does `eggs` exist?". A ternary uses the same truthy and falsy rules as `if`.
:::

## Real-world uses

- **USSD menus** (the `*120*...#` menus on your phone) and **WhatsApp bots** are menus: exactly the kind of choice `switch` handles.
- **Games** use a `switch` on the key pressed: `"w"` moves up, `"s"` moves down, and so on.
- **Delivery apps** show a message for each order status: `"placed"`, `"cooking"`, `"on the way"`, `"delivered"`.
- **Every app with a counter** uses a ternary (or something like it) for "1 message" versus "2 messages".
- **Banking apps** use a ternary to choose red or green, or "credit" or "debit", for each amount.

::: connect
**This builds on:** `===` from [Comparing values](#/phase-02-making-decisions/01-comparing-values) (each `case` checks the same way), the `if / else` chains from [if and else](#/phase-02-making-decisions/02-if-and-else), and truthy and falsy (a ternary's condition follows the same rules as an `if`'s).

**This unlocks:** menus. Right now a menu runs once and the program ends. In [Phase 3](#/phase-03-loops/05-break-continue-nested) you will put a `switch` inside a loop, so the menu keeps coming back until the user chooses "Quit". That is how Budget Buddy becomes a real app. First, in [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2), you will use both a `switch` and a ternary.
:::

::: challenge A tiny calculator
Create `phase-2/calculator.js`. Ask for a first number, an operator (`+`, `-`, `*` or `/`) and a second number.

- If either number is not a number, print `Please type numbers only.`
- Otherwise, use a `switch` on the operator to calculate the answer.
- Dividing by zero should print `You can't divide by zero.` instead of an answer.
- An unknown operator should print `I only know + - * /`.
- Print the answer as `12 / 5 = 2.4`.
:::

::: hint
Create `let answer;` before the `switch`. In `case "/":`, use an `if / else` inside the case to handle zero. You can print inside the cases, or store the answer and print after the `switch` only when `answer` is not `undefined`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const a = Number(prompt("First number: "));
const op = prompt("Operator (+ - * /): ").trim();
const b = Number(prompt("Second number: "));

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.log("Please type numbers only.");
} else {
  switch (op) {
    case "+":
      console.log(`${a} + ${b} = ${a + b}`);
      break;
    case "-":
      console.log(`${a} - ${b} = ${a - b}`);
      break;
    case "*":
      console.log(`${a} * ${b} = ${a * b}`);
      break;
    case "/":
      if (b === 0) {
        console.log("You can't divide by zero.");
      } else {
        console.log(`${a} / ${b} = ${a / b}`);
      }
      break;
    default:
      console.log("I only know + - * /");
  }
}
```
Sample sessions:
```text
First number: 12
Operator (+ - * /): /
Second number: 5
12 / 5 = 2.4
```
```text
First number: 7
Operator (+ - * /): /
Second number: 0
You can't divide by zero.
```
Notice the `if` inside a `case`. Blocks and statements can go inside each other in whatever way the problem needs. Keeping the indentation tidy is what lets you see the shape.
:::

::: recap
- `switch (value)` jumps to the `case` whose label is **exactly** equal (like `===`), or to `default` if none match.
- Each `case` needs a `break`, or the code **falls through** into the next case with no error.
- Stacking labels (`case "saturday": case "sunday":`) is deliberate fall-through, for options that share an action.
- `switch` is for exact values. Ranges and combined conditions stay as `if / else if`.
- The **ternary** `condition ? valueIfTrue : valueIfFalse` picks one of two **values** in one line, so the result can go into a `const`.
- One `?` per line. Use `if / else` to do actions, or when there are more than two outcomes.
:::

::: interview What happens if you forget `break` in a `switch`?
JavaScript keeps running the code of the following cases (and `default`) until it reaches a `break` or the end of the `switch`. This is called fall-through. It gives no error, so the program silently does extra things.
:::

::: interview When would you choose `switch` over `if / else if`, and when not?
`switch` suits comparing one value against several exact options, such as menu choices or day names. It cannot check ranges like `mark >= 80` or combine different conditions, so for those an `if / else if` chain is the right tool.
:::

::: interview What does `const label = count === 1 ? "item" : "items";` do?
It checks whether `count` is exactly 1. If so, `label` gets `"item"`. Otherwise it gets `"items"`. It is the ternary operator: a one-line way to choose between two values.
:::

::: checkpoint
- [ ] I ran `menu.js`, then changed a case to a number and saw why it stopped matching
- [ ] I removed `break`s on purpose and saw fall-through happen
- [ ] I grouped cases with stacked labels for the weekend or load-shedding stages
- [ ] I ran `ternary.js` and tried the `0` boundary
- [ ] I finished the taxi rank helper and the rubbish collection program
- [ ] I fixed both bugs in the pizza shop
:::

::: resources
- **javascript.info, "The switch statement":** https://javascript.info/switch. Includes more examples of grouping cases.
- **javascript.info, "Conditional branching: if, '?'":** https://javascript.info/ifelse. The second half covers the ternary, and when not to use it.
- **MDN, "Making decisions in your code — conditionals":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals. Has sections on both `switch` and the ternary operator.
:::
