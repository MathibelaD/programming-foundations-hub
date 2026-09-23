---
title: break, continue, nested loops and menus
summary: Stop a loop early, skip one round, put a loop inside a loop, and build the menu that keeps an app running until the user quits.
minutes: 55
stage: Phase 3
---

## What you will learn

- How `break` stops a loop early (the moment you have found what you need)
- How `continue` skips the rest of one iteration (for example, to skip a bad entry)
- What `do...while` is, and the one situation where it is handy
- How a loop inside a loop works (a **nested loop**), traced step by step
- **The menu loop pattern**: the backbone of almost every interactive program, and of Budget Buddy v3

**Before this:** [The classic loop patterns](#/phase-03-loops/04-loop-patterns). You should know the flag pattern and be comfortable with `switch` from [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary).

## The problem: loops that are too rigid

So far, every loop you have written goes all the way round, every time, until its condition is false. Real problems are messier:

- You are searching a password for a digit. You find one at position 3. Why keep looking at positions 4, 5, 6 and 7? You already have your answer.
- You are adding up receipts, and one of them is nonsense (`fifty` instead of `50`). You want to skip that one and carry on, not crash or give up.
- You want to print a whole grid, like a times-table chart, which is rows *and* columns.
- You want a program that shows a menu, does what the user chooses, and then shows the menu **again**, until they choose Quit.

This lesson gives you the tools for each of these.

::: analogy Looking for your keys
You are looking for your keys in five drawers. You open drawer 1: no keys. Drawer 2: no keys. Drawer 3: **keys!** Do you carry on and open drawers 4 and 5? Of course not. You **stop searching**. That is `break`.

Now you are checking five eggs for cracks before baking. Egg 3 is cracked. You do not stop baking. You **skip that egg** and carry on with egg 4. That is `continue`.
:::

## break: stop the loop now

`break` inside a loop means "**stop this loop immediately** and carry on with the code after it". The condition is not checked again, and the rest of the body is skipped.

Here is the password flag from the last lesson with a `break` added, and a line that shows which characters actually get checked:

```js
const password = "sun5hine";
let hasDigit = false;

for (let i = 0; i < password.length; i++) {
  console.log("Checking", password[i]);
  if ("0123456789".includes(password[i])) {
    hasDigit = true;
    break;
  }
}

console.log("Has a digit:", hasDigit);
```

Output:

```text
Checking s
Checking u
Checking n
Checking 5
Has a digit: true
```

The loop stopped at the `5`. The letters `h`, `i`, `n` and `e` were never checked. With an 8-letter password the saving is tiny, but imagine searching a million customer records for one ID number. Stopping at the first match could save almost all of the work.

The trace shows where the loop ends:

| `i` | `password[i]` | digit? | What happens |
|---|---|---|---|
| 0 | `s` | no | carry on |
| 1 | `u` | no | carry on |
| 2 | `n` | no | carry on |
| 3 | `5` | **yes** | `hasDigit = true`, then `break`: jump straight past the `}` |

### Keep asking, without asking twice

In [the while loop](#/phase-03-loops/02-while-loops) lesson, the "keep asking until valid" loop had to call `prompt` in two places: once before the loop and once inside it. `break` gives you another way:

```js
const prompt = require("prompt-sync")();

let tickets;

while (true) {
  tickets = Number(prompt("How many tickets (1 to 10)? "));
  if (!Number.isNaN(tickets) && tickets >= 1 && tickets <= 10) {
    break;
  }
  console.log("Please type a number from 1 to 10.");
}

console.log(`Booking ${tickets} ticket(s).`);
```

A session:

```text
How many tickets (1 to 10)? lots
Please type a number from 1 to 10.
How many tickets (1 to 10)? 12
Please type a number from 1 to 10.
How many tickets (1 to 10)? 4
Booking 4 ticket(s).
```

`while (true)` looks alarming, because the condition can never be false. On its own it *would* be an infinite loop. But the `break` inside is the way out: "ask; if the answer is good, leave; otherwise complain and go round again". Notice that the condition in the `if` is now the **good** case ("is a number, and at least 1, and at most 10"), where before the `while` condition described the **bad** case.

Both versions are correct and both are common. Use whichever you find easier to read. The rule for `while (true)`: **there must be a `break` that is guaranteed to be reachable**, or you have written an infinite loop on purpose.

## continue: skip to the next iteration

`continue` means "**skip the rest of this iteration** and go straight to the next one". In a `for` loop, the step still runs, then the condition is checked as usual.

The simplest example prints 1 to 10 but skips the multiples of 3:

```js
for (let n = 1; n <= 10; n++) {
  if (n % 3 === 0) {
    continue;
  }
  console.log(n);
}
```

Output:

```text
1
2
4
5
7
8
10
```

When `n` is 3, 6 or 9, `continue` jumps over the `console.log`, then `n++` runs and the loop carries on.

A more useful example: adding up four receipts, skipping any that are not valid amounts instead of letting them spoil the total.

```js
const prompt = require("prompt-sync")();

let total = 0;

for (let i = 1; i <= 4; i++) {
  const amount = Number(prompt(`Receipt ${i}: R`));
  if (Number.isNaN(amount) || amount < 0) {
    console.log("  Skipping that one, it is not a valid amount.");
    continue;
  }
  total += amount;
}

console.log(`Total of the valid receipts: R${total.toFixed(2)}`);
```

A session:

```text
Receipt 1: R45
Receipt 2: Rfifty
  Skipping that one, it is not a valid amount.
Receipt 3: R-10
  Skipping that one, it is not a valid amount.
Receipt 4: R30.50
Total of the valid receipts: R75.50
```

This style is sometimes called a **guard**: check for the bad case at the top of the body and get out of the way early, so the rest of the body only deals with good values. Without `continue`, you would wrap the `total += amount` in an `if (...) { }` instead. Both work. With one line of real work, the difference is small. With twenty lines, the guard keeps the code flatter and easier to read.

::: note break and continue in plain words
- `break`: "I'm done with this loop." Leave it completely.
- `continue`: "I'm done with *this round*." Go to the next one.

Both only affect the **innermost** loop they are in. That matters in nested loops, below.
:::

::: try break and continue
1. In `coding-practice`, create `phase-3/break-continue.js` and type in the password search with `break`.
2. Run it with `node phase-3/break-continue.js`. Count the "Checking" lines.
3. **Predict, then run:** change the password to `2fast` and then to `nodigits`. How many "Checking" lines for each?
4. Remove the `break;` line and run it with `sun5hine`. How many "Checking" lines now? Is the answer still right?
5. Create `phase-3/skip-receipts.js` with the receipts program that uses `continue`. Try entering `abc` and `-5` among real amounts.
:::

For step 3: `2fast` checks one character, and `nodigits` checks all eight (there is nothing to find, so the loop runs to the end). For step 4, all eight characters are checked, and the answer is still `true`. `break` did not change the answer, only the amount of work.

## do...while: run at least once (briefly)

A normal `while` checks its condition **before** the first iteration, so the body can run zero times. Sometimes you want the body to run **at least once**, and only *then* decide whether to repeat. JavaScript has a loop for that: `do...while`.

```js
const prompt = require("prompt-sync")();

let answer;

do {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(`You rolled a ${roll}.`);
  answer = prompt("Roll again? (y/n) ");
} while (answer === "y");

console.log("Thanks for playing.");
```

A session (your rolls will be different):

```text
You rolled a 4.
Roll again? (y/n) y
You rolled a 1.
Roll again? (y/n) y
You rolled a 6.
Roll again? (y/n) n
Thanks for playing.
```

The body is between `do {` and `}`, and the condition comes **at the end**: `} while (answer === "y");`. Note the semicolon after it. This is the one place a `;` belongs after a `while (...)`.

You will not use `do...while` often. Most programmers reach for it for "play again?" loops and menus, which always show at least once. Everything it does can also be done with a normal `while` and a starting value. Know it exists, recognise it when you see it, and do not worry about it beyond that.

## Nested loops: a loop inside a loop

The body of a loop can contain any code, including **another loop**. A loop inside another loop is called a **nested loop**. The outside one is the **outer loop**, and the one inside is the **inner loop**.

::: analogy The clock
Think of the minute hand and the hour hand. For **every one** step of the hour hand, the minute hand goes all the way round. The hour moves from 1 to 2 only after the minutes have gone from 0 all the way to 59. The minutes are the inner loop, and the hours are the outer loop.
:::

Here is that clock, with the minutes in 15-minute steps to keep the output short:

```js
for (let hour = 1; hour <= 2; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const mm = minute < 10 ? "0" + minute : minute;
    console.log(`${hour}:${mm}`);
  }
}
```

Output:

```text
1:00
1:15
1:30
1:45
2:00
2:15
2:30
2:45
```

(The `mm` line uses a ternary from [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary) to turn `0` into `"00"`, so the time reads `1:00` and not `1:0`.)

The rule that makes nested loops make sense: **the inner loop runs completely, from start to finish, on every single iteration of the outer loop.** Trace it:

| `hour` | `minute` | Printed |
|---|---|---|
| 1 | 0 | 1:00 |
| 1 | 15 | 1:15 |
| 1 | 30 | 1:30 |
| 1 | 45 | 1:45 |
| 1 | 60: `minute < 60` is `false`, so the inner loop ends | |
| 2 | 0 (the inner loop **starts again from its start**) | 2:00 |
| 2 | 15 | 2:15 |
| 2 | 30 | 2:30 |
| 2 | 45 | 2:45 |
| 2 | 60: the inner loop ends | |
| 3: `hour <= 2` is `false`, so the outer loop ends | | |

Each time the outer loop goes round, the inner loop's start (`let minute = 0`) runs again. That is why the minutes reset. The total number of lines printed is the number of outer iterations times the number of inner iterations: 2 × 4 = 8.

::: predict How many stars?
```js
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 4; col++) {
    line = line + "*";
  }
  console.log(line);
}
```
How many lines are printed, and how many stars are on each?
:::

::: solution
```text
****
****
****
```
3 lines (one per outer iteration), each with 4 stars (one per inner iteration). Notice `let line = "";` is **inside** the outer loop, so every row starts with an empty string, and `console.log(line)` is after the inner loop, so each row is printed once, when it is finished. This is the "building a string" pattern, once per row.
:::

### A times-table grid

Now the classic: a multiplication grid. Each **row** is one outer iteration, and each **number within the row** is one inner iteration.

```js
for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let col = 1; col <= 5; col++) {
    const product = row * col;
    if (product < 10) {
      line = line + "  " + product;
    } else {
      line = line + " " + product;
    }
  }
  console.log(line);
}
```

Output:

```text
  1  2  3  4  5
  2  4  6  8 10
  3  6  9 12 15
  4  8 12 16 20
  5 10 15 20 25
```

The `if` adds an extra space in front of one-digit numbers, so the columns line up. Without it, `8` and `10` would take up different amounts of room and the grid would look ragged. Try removing it to see.

Before you run this one, **fill in this trace for `row` 2** on paper. The inner loop runs five times:

| `row` | `col` | `product` | `line` after |
|---|---|---|---|
| 2 | 1 | 2 | `"  2"` |
| 2 | 2 | ? | ? |
| 2 | 3 | ? | ? |
| 2 | 4 | ? | ? |
| 2 | 5 | ? | ? |

(The last row should end with `line` as `"  2  4  6  8 10"`.)

::: try Nested loops
1. Create `phase-3/grid.js` and type in the times-table grid.
2. Run it with `node phase-3/grid.js` and check it matches.
3. **Change the grid to 1 to 9.** Predict: will the columns still line up? (Think about the biggest number in the grid.) Run it.
4. Change the inner condition from `col <= 5` to `col <= row`. Predict what shape you get, then run it.
:::

For step 3, the columns still line up, because 9 × 9 = 81, which has two digits. A 10 × 10 grid would have `100` and need another rule. For step 4 you get a triangle: row 1 has one number, row 2 has two, and so on, because the inner loop now runs a different number of times on each row.

## The menu loop pattern

This is the pattern that turns a script that runs once into an **app** that keeps running.

Every cash machine, every feature-phone menu, every USSD menu you get when you dial `*120#`, and every terminal program works like this:

1. Show the options.
2. Read the user's choice.
3. Do what they chose.
4. Go back to step 1, **unless** they chose to quit.

In code, the plan is:

```text
running is true
while running:
    show the menu
    ask for a choice
    switch on the choice:
        each option: do its job
        quit: set running to false
        anything else: say "I don't know that option"
say goodbye
```

That uses three things you already know: a `while` loop, a `switch`, and a **flag** (`running`). Here is a small airtime-and-data wallet built this way:

```js
const prompt = require("prompt-sync")();

let balance = 100;
let running = true;

while (running) {
  console.log("");
  console.log(`Balance: R${balance}`);
  console.log("1) Buy airtime (R29)");
  console.log("2) Buy data (R49)");
  console.log("q) Quit");
  const choice = prompt("Choose: ").trim().toLowerCase();

  switch (choice) {
    case "1":
      if (balance >= 29) {
        balance -= 29;
        console.log("Airtime bought.");
      } else {
        console.log("Not enough money.");
      }
      break;
    case "2":
      if (balance >= 49) {
        balance -= 49;
        console.log("Data bought.");
      } else {
        console.log("Not enough money.");
      }
      break;
    case "q":
      running = false;
      break;
    default:
      console.log("Please choose 1, 2 or q.");
  }
}

console.log(`Goodbye! You have R${balance} left.`);
```

A session:

```text

Balance: R100
1) Buy airtime (R29)
2) Buy data (R49)
q) Quit
Choose: 2
Data bought.

Balance: R51
1) Buy airtime (R29)
2) Buy data (R49)
q) Quit
Choose: 7
Please choose 1, 2 or q.

Balance: R51
1) Buy airtime (R29)
2) Buy data (R49)
q) Quit
Choose: 2
Data bought.

Balance: R2
1) Buy airtime (R29)
2) Buy data (R49)
q) Quit
Choose: 1
Not enough money.

Balance: R2
1) Buy airtime (R29)
2) Buy data (R49)
q) Quit
Choose: Q
Goodbye! You have R2 left.
```

Look at the details, because each one is there for a reason:

- **`balance` is created before the loop**, so it remembers its value from one trip round the menu to the next. That memory is what makes it feel like an app.
- **`.trim().toLowerCase()`** means `Q`, `q` and ` q ` all work. People type in all sorts of ways.
- **The `default` case** catches anything unexpected, like `7`, and the loop shows the menu again. The user cannot crash it by typing nonsense.
- **The quit option sets the flag to `false`.** The loop finishes the current iteration, checks `while (running)`, finds `false`, and ends. Then the goodbye line runs once.

::: warn break inside a switch does not leave the loop
You might wonder why we use a `running` flag instead of `break` for quitting. It is because the `break` in a `switch` belongs to the **switch**. It means "leave the switch", not "leave the loop". Each `break` in the code above only stops the switch from falling through to the next case. The loop carries on. This catches out almost everyone once. See "Debug this" below.
:::

::: try Build the wallet menu
1. Create `phase-3/wallet.js` and type in the wallet program.
2. Run it with `node phase-3/wallet.js`. Buy data twice, try to buy airtime with R2 left, type something silly, then quit with a capital `Q`.
3. **Add an option:** `3) Load R50`, which adds 50 to the balance. You need one more `console.log` line in the menu and one more `case`. Run it and use your new option.
4. **Predict, then test:** what happens if you delete the `case "q":` block completely? How would you get out? (Ctrl+C at a `prompt-sync` question does not always stop a program. Closing the terminal always works.) Put it back afterwards.
:::

## When to use each tool

| Tool | Use it when… | Example |
|---|---|---|
| `break` | You have your answer and there is no point carrying on | Found the digit. Found the customer. The input is valid. |
| `continue` | This one item should be skipped, but the loop should carry on | A bad receipt. A blank line. An item that is out of stock. |
| `do...while` | The body must run at least once before you can decide | "Play again?" A menu. |
| Nested loops | The data has rows **and** columns, or you need "for each X, go through every Y" | Grids, seating plans, timetables, clocks. |
| Menu loop | The program should keep going until the user chooses to stop | Any interactive app, including Budget Buddy. |

::: exercise Level 1 — Guided · A triangle of stars
Create `phase-3/triangle.js`.

1. Load `prompt-sync` and ask `"How tall? "`. Store the answer as a number in `size`.
2. Write an outer `for` loop with `row` going from 1 to `size`.
3. Inside it, create `let line = "";`.
4. Write an inner `for` loop with `col` going from 1 **to `row`** (not to `size`).
5. Inside the inner loop, add a `"*"` to `line`.
6. After the inner loop (but still inside the outer loop), print `line`.
7. Run it and type `5`. You should see a triangle with 1 to 5 stars.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const size = Number(prompt("How tall? "));

for (let row = 1; row <= size; row++) {
  let line = "";
  for (let col = 1; col <= row; col++) {
    line = line + "*";
  }
  console.log(line);
}
```
A session:
```text
How tall? 5
*
**
***
****
*****
```
The inner loop's condition uses the outer loop's counter. On row 1 it runs once, and on row 5 it runs five times. That is how the triangle gets its shape.
:::

::: exercise Level 2 — On your own · A tally counter
Create `phase-3/tally.js`: a tally counter like the clickers used to count people coming into a stadium. It shows the current count and accepts:

- `+` to add one
- `-` to subtract one (but never below 0)
- `r` to reset to 0
- `q` to quit, printing the final count

Anything else gets `I don't know that one.` Use a menu loop with a `switch`. Try it with `do...while` this time, since the menu must show at least once.
:::

::: hint
With `do...while`, you do not need a `running` flag. Declare `let choice;` before the loop, ask for it inside, and put `} while (choice !== "q");` at the end. The `q` case can do nothing except `break` (out of the switch), because the loop's condition handles quitting.
:::

::: solution
```js
const prompt = require("prompt-sync")();

let count = 0;
let choice;

do {
  console.log(`Count: ${count}`);
  choice = prompt("+ to add, - to subtract, r to reset, q to quit: ").trim();

  switch (choice) {
    case "+":
      count++;
      break;
    case "-":
      if (count > 0) {
        count--;
      }
      break;
    case "r":
      count = 0;
      break;
    case "q":
      break;
    default:
      console.log("I don't know that one.");
  }
} while (choice !== "q");

console.log(`Final count: ${count}`);
```
A session:
```text
Count: 0
+ to add, - to subtract, r to reset, q to quit: +
Count: 1
+ to add, - to subtract, r to reset, q to quit: +
Count: 2
+ to add, - to subtract, r to reset, q to quit: +
Count: 3
+ to add, - to subtract, r to reset, q to quit: -
Count: 2
+ to add, - to subtract, r to reset, q to quit: x
I don't know that one.
Count: 2
+ to add, - to subtract, r to reset, q to quit: q
Final count: 2
```
The empty-looking `case "q": break;` is needed. Without it, `q` would fall into `default` and print "I don't know that one." before quitting. A `while (running)` version with a flag is equally correct.
:::

::: debug Two loops that misbehave
**Program A** is meant to quit when the user types `q`. It never does: the menu keeps coming back.

```js
const prompt = require("prompt-sync")();

while (true) {
  console.log("1) Say hello");
  console.log("q) Quit");
  const choice = prompt("Choose: ");

  switch (choice) {
    case "1":
      console.log("Hello!");
      break;
    case "q":
      break;
  }
}

console.log("Bye!");
```

A session:

```text
1) Say hello
q) Quit
Choose: 1
Hello!
1) Say hello
q) Quit
Choose: q
1) Say hello
q) Quit
Choose: 
```

**Program B** is meant to print three rows of four stars. It prints one row of stars and then two empty lines.

```js
let col = 1;

for (let row = 1; row <= 3; row++) {
  let line = "";
  while (col <= 4) {
    line = line + "*";
    col++;
  }
  console.log(line);
}
```
:::

::: solution
**A:** the `break` in `case "q"` only leaves the **switch**, not the `while` loop. `while (true)` never becomes false, so the menu shows again. Nothing ever stops the loop. Fix it with a flag:

```js
let running = true;

while (running) {
  // ...menu and prompt as before...
  switch (choice) {
    case "1":
      console.log("Hello!");
      break;
    case "q":
      running = false;
      break;
  }
}
```

(To escape the broken version, close the terminal. Ctrl+C at the question will not help here: `prompt-sync` turns it into an empty answer (`null`), no case matches, and the menu comes back again.)

**B:** `col` is created **outside** both loops, so it is never reset. On row 1 the inner loop takes `col` from 1 to 5. On rows 2 and 3, `col` is still 5, so `col <= 4` is `false` straight away and the inner loop runs zero times, giving empty lines. The inner loop's start must happen **inside** the outer loop. The cleanest fix is a `for` loop, whose start runs again every time:

```js
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 4; col++) {
    line = line + "*";
  }
  console.log(line);
}
```
:::

::: mistake
**Expecting `break` in a `switch` to leave the loop.** It only leaves the switch. Use a `running` flag for the menu loop.

**`while (true)` with no reachable `break`.** That is an infinite loop. Make sure the way out can actually happen.

**Forgetting that `continue` skips everything below it.** If the `total += amount` or the `i++` of a `while` loop is below the `continue`, it will be skipped too. In a `while` loop, a `continue` that skips the step gives you an infinite loop.

**Setting up the inner loop's counter or string outside the outer loop.** Anything that must start fresh for each row goes *inside* the outer loop.

**Forgetting the semicolon at the end of `do...while`.** `} while (condition);` It is the only loop that ends with one.

**Having no `default` in a menu.** Without it, an unexpected choice does nothing, and the user is left confused.
:::

## Real-world uses

- **Searching with `break`:** finding a contact in your phone, the first free seat on a bus, the first available delivery slot. Stop as soon as you find it.
- **Skipping with `continue`:** importing a spreadsheet and skipping blank or broken rows, sending a message to everyone except those who opted out.
- **Nested loops:** seating plans (rows and seats), calendars (weeks and days), game boards (rows and columns), comparing every item with every other item.
- **Menu loops:** USSD menus, ATMs, vending machines, command-line tools, and every game's "main loop". Budget Buddy v3 is built on one.

::: connect
**This builds on:** the loops from [while](#/phase-03-loops/02-while-loops) and [for](#/phase-03-loops/03-for-loops), the flag and string-building [patterns](#/phase-03-loops/04-loop-patterns), and `switch` from [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary).

**This unlocks:** [Budget Buddy v3](#/phase-03-loops/06-project-budget-buddy-v3), where the menu loop turns your budget calculator into a real app. Nested loops come back in Phase 5 and 6, when you have lists of things inside other things. In Phase 7 you will learn that some shortcut loops (like `forEach`) cannot use `break`, which is one reason plain loops are still useful.
:::

::: challenge Prime numbers
A **prime number** is a whole number bigger than 1 that can only be divided exactly by 1 and itself. 7 is prime. 9 is not, because 9 ÷ 3 = 3.

Print every prime number from 2 to 30. Use an outer loop for the numbers, an inner loop to try dividing, a **flag**, and `break`.

Expected output (one per line): `2 3 5 7 11 13 17 19 23 29`
:::

::: hint
For each `n` from 2 to 30, start with `let isPrime = true;` ("prime until proven otherwise", an "all?" flag). The inner loop tries every divisor `d` from 2 up to (but not including) `n`. If `n % d === 0`, then `n` is not prime: lower the flag and `break`, since one divisor is enough proof. After the inner loop, print `n` if the flag is still up.
:::

::: solution
```js
for (let n = 2; n <= 30; n++) {
  let isPrime = true;
  for (let d = 2; d < n; d++) {
    if (n % d === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    console.log(n);
  }
}
```
Output (shown here on one line, but it prints one number per line):
```text
2 3 5 7 11 13 17 19 23 29
```
The `break` only leaves the **inner** loop. The outer loop carries on to the next `n`. For `n = 2`, the inner loop runs zero times (`2 < 2` is false), so the flag stays `true`, which is correct: 2 is prime.
:::

::: recap
- `break` leaves the loop immediately. Use it when you have your answer.
- `continue` skips the rest of the current iteration and moves to the next. Use it to skip bad items.
- Both only affect the innermost loop they are in. `break` inside a `switch` only leaves the switch.
- `while (true)` with a reachable `break` is a valid way to write "keep asking until valid".
- `do { ... } while (condition);` always runs its body at least once.
- In a **nested loop**, the inner loop runs completely on every iteration of the outer loop. Total iterations = outer × inner.
- **The menu loop pattern:** a `running` flag, `while (running)`, show the menu, read a choice, `switch`, and set `running = false` on quit. Always include a `default`.
:::

::: interview What is the difference between `break` and `continue`?
`break` ends the whole loop straight away and carries on after it. `continue` ends only the current iteration and goes on to the next one (the step runs and the condition is checked as usual).
:::

::: interview In a nested loop where the outer loop runs 3 times and the inner loop runs 4 times, how many times does the inner body run?
12 times. The inner loop runs all 4 of its iterations on each of the 3 outer iterations: 3 × 4.
:::

::: interview Why does a menu loop usually use a `running` flag instead of `break` to quit?
Because the choice is usually handled with a `switch`, and a `break` inside a `switch` only leaves the switch, not the loop. Setting `running = false` makes the loop's own condition end it cleanly after the current iteration.
:::

::: interview When would you use `do...while` instead of `while`?
When the body must run at least once before you can decide whether to repeat, such as showing a menu or asking "play again?" after the first game.
:::

::: checkpoint
- [ ] I added `break` to the password search and counted how many characters were checked
- [ ] I used `continue` to skip invalid receipts
- [ ] I ran the times-table grid and traced one row of it by hand
- [ ] I built the wallet menu and added my own "Load R50" option
- [ ] I finished the triangle and the tally counter
- [ ] I fixed both programs in "Debug this" and can explain why `break` in a `switch` does not quit the loop
:::

::: resources
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. The sections "Breaking the loop", "Continue to the next iteration" and the `do..while` part.
- **MDN, "Looping code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops. Covers `break` and `continue` with a searchable contact list example.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the 3 × 4 star program and watch the inner counter reset on every row.
:::
