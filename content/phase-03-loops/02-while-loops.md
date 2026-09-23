---
title: The while loop
summary: Repeat a block of code for as long as a condition is true. Trace it by hand, break it on purpose, and use it to keep asking until the answer makes sense.
minutes: 50
stage: Phase 3
---

## What you will learn

- How to write a `while` loop, and exactly what JavaScript does, step by step, when it runs one
- How to check a loop by hand with a **trace table**, before you run it
- What an infinite loop looks like, how to stop one with **Ctrl+C**, and why it happened
- The most common real-world use of `while`: **keep asking until the input is valid**

**Before this:** [Why loops exist](#/phase-03-loops/01-why-loops). You should know the three ingredients of a loop (start, condition, step towards stopping) and what a trace table is.

## The problem: from plan to program

In the last lesson you planned loops in plain words, like this:

```text
set count to 1
while count is 5 or less:
    print count
    add 1 to count
print "done"
```

The computer cannot run that. It needs the same idea written in JavaScript. The good news is that the JavaScript is very close to the plan. JavaScript even uses the same word: `while`.

::: analogy "While the kettle is not full, keep the tap open"
Standing at the sink filling a kettle, you do not decide in advance how many seconds to hold it there. You look at the water line, and *while* it is below the mark, you keep filling. The moment it reaches the mark, you stop. You check, fill a bit, check again, fill a bit more, check again.

A `while` loop is exactly that: **check, do, check, do, check, stop.** The check always comes first.
:::

## Your first while loop

Here is the "print 1 to 5" plan as real code:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count = count + 1;
}

console.log("Finished. count is now", count);
```

Output:

```text
1
2
3
4
5
Finished. count is now 6
```

Compare it with the pseudocode. It is the same plan, line for line. Here are the pieces:

| Piece | What it means |
|---|---|
| `let count = 1;` | The **start**. It happens once, *before* the loop. |
| `while` | "Repeat the block below, for as long as…" |
| `(count <= 5)` | The **loop condition**, in round brackets. Any expression that gives `true` or `false`, the same kind you put in an `if`. |
| `{ ... }` | The **loop body**, in curly braces. These lines repeat. |
| `count = count + 1;` | The **step towards stopping**, inside the body. |
| The last `console.log` | After the closing `}`. It runs once, when the loop is finished. |

It looks a lot like an `if`, and that is not a coincidence. Watch what happens if you change the word `while` to `if` and change nothing else:

```js
let count = 1;

if (count <= 5) {
  console.log(count);
  count = count + 1;
}

console.log("Finished. count is now", count);
```

Output:

```text
1
Finished. count is now 2
```

`if` asks the question **once**. If the answer is `true`, it runs the block once and moves on. `while` asks the question, runs the block, and then **goes back up and asks again**. That going-back-up is the whole difference.

::: quiz
What does this print?

```js
let cups = 3;

while (cups < 6) {
  cups = cups + 2;
}

console.log(cups);
```

- [ ] `5`
- [ ] `6`
- [x] `7`
- [ ] `9`

3 is less than 6, so `cups` becomes 5. 5 is still less than 6, so it becomes 7. Now `7 < 6` is `false` and the loop ends. It never lands on 6, because it goes up in twos from an odd number. `5` is what you would get if the body ran only once, the way an `if` would.
:::

## What JavaScript does, step by step

When JavaScript reaches a `while`, it follows these rules, every single time:

1. Work out the condition.
2. If it is `false`, skip the whole body and carry on with the code after the closing `}`. The loop is over.
3. If it is `true`, run every line of the body, top to bottom.
4. When you reach the closing `}`, **jump back to step 1**.

As a picture:

```text
            ┌──────────────────────────┐
            ▼                          │
   ┌──────────────────┐   true    ┌─────────┐
   │ check condition  │ ────────► │  body   │
   └──────────────────┘           └─────────┘
            │ false
            ▼
   code after the loop
```

Two important consequences:

- The condition is only checked **at the top**. If `count` goes past 5 halfway through the body, the rest of the body still runs. The loop only notices at the next check.
- If the condition is `false` the very first time, the body runs **zero times**. That is allowed:

```js
let count = 10;

while (count > 20) {
  console.log("You will never see this");
  count = count + 1;
}

console.log("Done");
```

Output:

```text
Done
```

::: quiz
What does this print?

```js
let battery = 10;

while (battery > 0) {
  battery = battery - 4;
  console.log(battery);
}

console.log("Off");
```

- [ ] `6`, `2`, `Off`
- [x] `6`, `2`, `-2`, `Off`
- [ ] `10`, `6`, `2`, `Off`
- [ ] `6`, `2`, `-2`, `-6`, `Off`

On the third check `battery` is 2, which is more than 0, so the body runs again: `battery` becomes -2 and **then** it is printed. The condition is only checked at the top, so the loop cannot notice that the battery went below 0 halfway through the body. `6, 2, Off` is the tempting answer if you expect the loop to stop the moment the value goes negative.
:::

## Tracing a countdown

Here is a countdown for a rocket launch (or the New Year):

```js
let count = 5;

while (count > 0) {
  console.log(count);
  count = count - 1;
}

console.log("Liftoff!");
```

Output:

```text
5
4
3
2
1
Liftoff!
```

Here is the trace table. Read it row by row, and follow along with your finger on the code.

| Check | `count` | `count > 0`? | What the body prints | `count` after the step |
|---|---|---|---|---|
| 1 | 5 | `true` | 5 | 4 |
| 2 | 4 | `true` | 4 | 3 |
| 3 | 3 | `true` | 3 | 2 |
| 4 | 2 | `true` | 2 | 1 |
| 5 | 1 | `true` | 1 | 0 |
| 6 | 0 | `false`, so the loop ends | | |

Then `Liftoff!` is printed, once, because it is after the loop.

This is the moment to build a habit: **when a loop does something you did not expect, trace it.** Draw the table, one row per check, one column per variable. Nearly every loop bug shows up within the first two or the last two rows.

::: try Your first while loops
1. In your `coding-practice` folder, create `phase-3/countdown.js`.
2. Type in the countdown program above. Type it, do not paste. The indentation inside the `{ }` is two spaces. VS Code will usually do it for you.
3. From inside `coding-practice`, run:
   ```bash
   node phase-3/countdown.js
   ```
4. You should see `5 4 3 2 1` (one per line) and then `Liftoff!`.
5. **Change the start to `10`.** Predict how many numbers print, then run it.
6. **Change `count > 0` to `count >= 0`.** Predict what is different, then run it. (You should see a `0` before `Liftoff!`. The condition decides whether the last row of the trace is "yes" or "no".)
7. **Change the step to `count = count - 2;`** and the start back to `10`. Predict, then run.
:::

## Doubling money until a target

Counting down is tidy, but most real `while` loops are not about counting. They are about waiting for something to become true. The counter, if there is one, tells you afterwards how long it took.

Lerato is in a savings challenge. She puts in R100, and every week the amount in the challenge doubles. She wants to know how many weeks until it is at least R5000.

Before you look at the code or the output, **fill in this trace table on paper**. Start with `amount` 100 and `weeks` 0. Each iteration doubles `amount` and adds 1 to `weeks`. Stop when `amount < 5000` is `false`.

| Check | `amount` | `weeks` | `amount < 5000`? |
|---|---|---|---|
| 1 | 100 | 0 | `true` |
| 2 | ? | ? | ? |
| … | | | |

Done? Now here is the code:

```js
let amount = 100;
let weeks = 0;

while (amount < 5000) {
  amount = amount * 2;
  weeks = weeks + 1;
  console.log(`After week ${weeks}: R${amount}`);
}

console.log(`It took ${weeks} weeks to reach at least R5000.`);
```

Output:

```text
After week 1: R200
After week 2: R400
After week 3: R800
After week 4: R1600
After week 5: R3200
After week 6: R6400
It took 6 weeks to reach at least R5000.
```

The completed trace:

| Check | `amount` | `weeks` | `amount < 5000`? |
|---|---|---|---|
| 1 | 100 | 0 | `true` |
| 2 | 200 | 1 | `true` |
| 3 | 400 | 2 | `true` |
| 4 | 800 | 3 | `true` |
| 5 | 1600 | 4 | `true` |
| 6 | 3200 | 5 | `true` |
| 7 | 6400 | 6 | `false`, so the loop ends |

Did your table match? Notice that the loop overshoots: R6400, not R5000. A `while` loop does not stop *at* the target. It stops at the first check where the condition is false.

Also notice: **you did not know it would take 6 weeks when you wrote the code.** You wrote "keep going until it is enough", and the loop worked out the rest. That is what `while` is best at.

::: predict What does this print?
Make a trace table with columns for `n` and `total` before you run it.

```js
let n = 1;
let total = 0;

while (n < 10) {
  total = total + n;
  n = n * 2;
}

console.log(n, total);
```
:::

::: solution
| Check | `n` | `total` | `n < 10`? |
|---|---|---|---|
| 1 | 1 | 0 | `true` |
| 2 | 2 | 1 | `true` |
| 3 | 4 | 3 | `true` |
| 4 | 8 | 7 | `true` |
| 5 | 16 | 15 | `false`, so stop |

Output:

```text
16 15
```

The trap is that `n` ends at 16, not 8. The loop only stops *after* `n` has gone past 10. And `16` was never added to `total`, because the check came first.
:::

::: quiz
What does this print?

```js
let followers = 50;
let months = 0;

while (followers <= 1000) {
  followers = followers * 3;
  months = months + 1;
}

console.log(months, followers);
```

- [x] `3 1350`
- [ ] `2 450`
- [ ] `3 1000`
- [ ] `4 4050`

50 becomes 150, then 450, then 1350. After 450 the condition `450 <= 1000` is still `true`, so there is a third month. The loop overshoots the target, because it only checks at the top. `2 450` is where you land if you stop at the last value below 1000. `3 1000` imagines the loop stopping exactly on the target, which only happens if the maths lands there.
:::

## Infinite loops: breaking things on purpose

In the last lesson, Thandi's coach forgot to count laps and she ran forever. Let's do that to the computer. It is perfectly safe, and knowing how to stop a runaway program is an essential skill.

Here is "print 1 to 5" with one line missing. The step, `count = count + 1;`, is gone:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
}

console.log("Finished");
```

::: try Make an infinite loop, then stop it
1. Create `phase-3/forever.js` and type in the code above.
2. Before you run it, trace it in your head. What is `count` on the first check? On the second? Will it ever be more than 5?
3. Run it:
   ```bash
   node phase-3/forever.js
   ```
4. Your terminal fills with `1`, scrolling faster than you can read. It will not stop on its own.
5. **Stop it:** click in the terminal, then press **Ctrl+C** (hold the Ctrl key and press C). This is the same on Windows, macOS and Linux. On a Mac it is the **Control** key, *not* Command.
6. The terminal shows `^C` and gives you your prompt back. `Finished` was never printed, because the program never got past the loop.
:::

What happened? Here is the trace:

| Check | `count` | `count <= 5`? |
|---|---|---|
| 1 | 1 | `true` |
| 2 | 1 | `true` |
| 3 | 1 | `true` |
| … | 1 | `true`, forever |

Nothing in the body changes `count`, so the condition gives exactly the same answer every time. The computer is not broken or confused. It is doing precisely what you told it, which is "while count is 5 or less, print count". It would do it until the end of time.

**Ctrl+C** sends an "interrupt" signal to the program running in the terminal. It is the emergency stop button, and it works for any program that is stuck, not only loops.

::: note What if the terminal stops responding?
Printing millions of lines can make the terminal slow for a few seconds after Ctrl+C. Give it a moment. If it is truly stuck, you can close the terminal. In VS Code, click the bin icon (Kill Terminal) at the top right of the terminal panel, then open a new one from the menu with **Terminal → New Terminal**.
:::

There are two other common ways to get an infinite loop. They are worth knowing by sight.

**The step goes the wrong way.** A countdown that counts *up*:

```js
let count = 5;

while (count > 0) {
  console.log(count);
  count = count + 1;
}
```

It prints `5`, `6`, `7`, `8`… forever. There *is* a step, but it moves away from stopping, not towards it.

**A stray semicolon after the condition.** This one is sneaky:

```js
let count = 1;

while (count <= 3); {
  console.log(count);
  count = count + 1;
}

console.log("Finished");
```

This prints **nothing at all** and never finishes. The terminal looks frozen. The `;` straight after `(count <= 3)` ends the `while` statement, so the loop body is *empty*: "while count is 3 or less, do nothing". `count` never changes. The block in `{ }` below is never reached. Press Ctrl+C to escape, and remove the semicolon. There is never a `;` between `while (...)` and `{`.

::: warn Stuck in a loop that keeps asking a question?
Later in this lesson your loops will ask the user questions. The `prompt-sync` package treats Ctrl+C at a question as "no answer" (it gives back `null`), rather than stopping your program. So a loop that keeps asking may ask again. If that happens, type an answer the loop accepts, or close the terminal (the bin icon in VS Code) and open a new one. Nothing is damaged either way.
:::

::: quiz
Which one of these loops never stops?

- [ ] `let n = 1; while (n < 10) { n = n * 2; }`
- [x] `let n = 0; while (n < 10) { n = n * 2; }`
- [ ] `let n = 20; while (n > 10) { n = n - 3; }`
- [ ] `let n = 1; while (n > 10) { n = n + 1; }`

When `n` starts at 0, `n * 2` is still 0, so the step changes nothing and `0 < 10` stays `true` for ever. There *is* a step, but it does not move towards stopping. The first loop goes 1, 2, 4, 8, 16 and stops. The third goes 20, 17, 14, 11, 8 and stops. The last one looks worrying, because its step moves away from its condition, but `1 > 10` is `false` on the very first check, so its body runs zero times.
:::

## Keep asking until the answer is valid

This is the use of `while` you will write most often in real programs.

In [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2) you checked each amount with an `if`. When the user typed nonsense, the best you could do was print an error and use 0. That is not great. A real app would say "that is not valid, try again", and **keep** saying it until the user gets it right. Now you can do that.

Here is the plan in pseudocode:

```text
ask the question
while the answer is not valid:
    explain what is wrong
    ask the question again
use the answer (it is definitely valid now)
```

And here it is for a ticket booking, where you may book 1 to 10 tickets at R85 each:

```js
const prompt = require("prompt-sync")();

let tickets = Number(prompt("How many tickets (1 to 10)? "));

while (Number.isNaN(tickets) || tickets < 1 || tickets > 10) {
  console.log("Please type a number from 1 to 10.");
  tickets = Number(prompt("How many tickets (1 to 10)? "));
}

console.log(`Booking ${tickets} ticket(s). That is R${tickets * 85}.`);
```

A session in the terminal, where the user makes three mistakes:

```text
How many tickets (1 to 10)? lots
Please type a number from 1 to 10.
How many tickets (1 to 10)? 0
Please type a number from 1 to 10.
How many tickets (1 to 10)? 12
Please type a number from 1 to 10.
How many tickets (1 to 10)? 3
Booking 3 ticket(s). That is R255.
```

And one where they get it right first time. The body never runs at all:

```text
How many tickets (1 to 10)? 4
Booking 4 ticket(s). That is R340.
```

Find the three ingredients:

- **Start:** the first `prompt`, *before* the loop. We need an answer to check before we can ask "is it valid?".
- **Condition:** the answer is **not** valid. Read `Number.isNaN(tickets) || tickets < 1 || tickets > 10` out loud as "it is not a number, or it is too small, or it is too big". This is the same check you would put in an `if`, from [and, or, not](#/phase-02-making-decisions/03-combining-conditions).
- **Step towards stopping:** asking again, inside the loop. Every new answer is a new chance for the condition to become false.

The best part is the line after the loop. By the time the program reaches it, **the answer is guaranteed to be valid**, because the only way out of the loop is for the condition to be false. Everything after the loop can trust `tickets` completely.

::: why Why is the question asked in two places?
Newcomers often find this odd. The first `prompt` gets the very first answer, so the condition has something to check. The second `prompt`, inside the loop, only happens when that answer was bad. If you removed the one inside the loop, a bad answer would never change: an infinite loop printing "Please type a number from 1 to 10." If you removed the one before the loop, `tickets` would not exist when the condition is first checked. In [break, continue, nested loops and menus](#/phase-03-loops/05-break-continue-nested) you will see a loop that can avoid the repetition, but this version is the clearest to read.
:::

::: try Keep asking until valid
1. `prompt-sync` should already be installed in your `coding-practice` folder from [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user). If you get `Cannot find module 'prompt-sync'`, run `pnpm add prompt-sync` from inside `coding-practice`.
2. Create `phase-3/tickets.js` and type in the ticket program above.
3. Run it with `node phase-3/tickets.js`. Try, in order: `lots`, `0`, `12`, `3`. You should see the error message three times, then the booking line.
4. Run it again and type `4` straight away. The error message should never appear.
5. **Predict, then test:** what happens if you type nothing and press Enter? (Hint: what is `Number("")`?) What about `2.5`? Write your predictions down, then try them.
:::

For step 5: pressing Enter gives `""`, and `Number("")` is `0`, which is less than 1, so it is rejected. That is lucky. `2.5` is accepted, and you get `Booking 2.5 ticket(s). That is R212.5.` Half a ticket is nonsense. You could reject it by adding `|| tickets % 1 !== 0` to the condition (a whole number has nothing left over when divided by 1). Real input checking takes a few rounds of "what else could a person type?", and a `while` makes each new rule one more `||`.

The same shape works for text. Here is a PIN check. The loop runs until the typed text matches:

```js
const prompt = require("prompt-sync")();

let pin = prompt("Enter your PIN: ");

while (pin !== "4821") {
  console.log("Wrong PIN, try again.");
  pin = prompt("Enter your PIN: ");
}

console.log("Welcome!");
```

A session:

```text
Enter your PIN: 1234
Wrong PIN, try again.
Enter your PIN: 4812
Wrong PIN, try again.
Enter your PIN: 4821
Welcome!
```

(A real bank would lock you out after three tries. You will be able to add that yourself soon.)

::: quiz
The user types `two`, then `14`, then `3`, then `8`. What happens?

```js
const prompt = require("prompt-sync")();

let size = Number(prompt("Shoe size (3 to 13)? "));

while (Number.isNaN(size) || size < 3 || size > 13) {
  console.log("Try again.");
  size = Number(prompt("Shoe size (3 to 13)? "));
}

console.log(`Size ${size} it is.`);
```

- [ ] `Try again.` prints 3 times, then `Size 8 it is.`
- [ ] `Try again.` prints 2 times, then `Size 8 it is.`
- [ ] `Try again.` prints 1 time, then `Size 3 it is.`
- [x] `Try again.` prints 2 times, then `Size 3 it is.`

`two` is `NaN` and `14` is too big, so each of them prints `Try again.` and the question is asked again. `3` is on the boundary: it is not below 3, so the condition is `false`, the loop ends, and the program never asks a fourth time. The `8` is never read. If you expected `Size 8`, you treated 3 as invalid, but the rule is `size < 3`, not `size <= 3`.
:::

## When should you use while?

Remember the question from the last lesson: **do I know how many times it will repeat before it starts?**

`while` is the natural choice when the answer is **no**:

- Keep asking until the input is valid.
- Keep doubling until the money reaches a target.
- Keep running the game until the player has no lives left.
- Keep showing the menu until the user chooses Quit.

In each case, the condition is about **something happening**, not about reaching a certain count. `while` can also do counting loops, as you saw with the countdown. But for counting, JavaScript has a tidier loop, which is the subject of the next lesson.

::: exercise Level 1 — Guided · The lift
Create `phase-3/lift.js`. A lift travels from floor 10 down to the ground floor.

1. Create a variable `floor` with the value `10`.
2. Write a `while` loop that runs while `floor` is more than `0`.
3. Inside it, print `"Floor"` and the floor number, then make `floor` one smaller.
4. After the loop, print `"Ground floor. Doors opening."`
5. Before you run it, draw the first three rows and the last two rows of the trace table.
6. Run it. You should see `Floor 10` down to `Floor 1`, then the doors message.
:::

::: solution
```js
let floor = 10;

while (floor > 0) {
  console.log("Floor", floor);
  floor = floor - 1;
}

console.log("Ground floor. Doors opening.");
```
Output:
```text
Floor 10
Floor 9
Floor 8
Floor 7
Floor 6
Floor 5
Floor 4
Floor 3
Floor 2
Floor 1
Ground floor. Doors opening.
```
The last two rows of the trace are `floor` 1 (`true`, prints `Floor 1`, becomes 0) and `floor` 0 (`false`, the loop ends).
:::

::: exercise Level 2 — On your own · The taxi's fuel money
Create `phase-3/taxi.js`. Bongani's taxi starts the day with R500 of fuel money. Each trip uses R45. He keeps doing trips as long as he has enough fuel money for a whole trip. Work out, with a `while` loop, **how many trips** he can do and **how much fuel money is left** at the end. Print both.

Do not work the answer out on a calculator first. Let the loop do it, then check it with a calculator afterwards.
:::

::: hint
You need two variables: `fuel` (starts at 500) and `trips` (starts at 0, a counter). "As long as he has enough for a whole trip" means `fuel >= 45`. Each iteration takes 45 off `fuel` and adds 1 to `trips`.
:::

::: solution
```js
let fuel = 500;
let trips = 0;

while (fuel >= 45) {
  fuel = fuel - 45;
  trips = trips + 1;
}

console.log(`Trips: ${trips}`);
console.log(`Fuel money left: R${fuel}`);
```
Output:
```text
Trips: 11
Fuel money left: R5
```
Check: 11 × 45 = 495, and 500 − 495 = 5. If you used `fuel > 0` as the condition, you got 12 trips and `R-40`, meaning Bongani ran out of fuel in the middle of trip 12. The condition must describe exactly when it is safe to go again.
:::

::: debug Why does this hang?
Palesa wants to print a 3-second countdown. When she runs this, **nothing is printed**, and the program never ends. She has to press Ctrl+C. Find the bug.

```js
let seconds = 3;

while (seconds > 0); {
  console.log(seconds);
  seconds = seconds - 1;
}

console.log("Go!");
```
:::

::: solution
There is a semicolon after `while (seconds > 0)`. That semicolon ends the loop, so the loop body is empty: "while seconds is more than 0, do nothing". `seconds` never changes, so it loops forever without printing anything. Remove the `;`:

```js
while (seconds > 0) {
```

Output after the fix:

```text
3
2
1
Go!
```
:::

::: mistake
**Forgetting the step.** No line in the body changes the variable in the condition, so you get an infinite loop. Press Ctrl+C, then trace it.

**The step goes the wrong way.** `count = count + 1` in a countdown, so it moves away from stopping.

**A semicolon after `while (...)`.** It silently makes the body empty. There is never a `;` before the `{`.

**Asking only once in a "keep asking" loop.** If there is no `prompt` inside the loop, a bad answer can never be fixed, and the error message prints forever.

**Putting the start inside the loop.** `let count = 1;` inside the body resets the counter on every iteration, and the loop never ends. The start goes *before* the loop.

**Expecting the loop to stop the moment the condition becomes false.** It only checks at the top. The rest of the body still runs first.
:::

## Real-world uses

- **Input checking** everywhere: "passwords must be at least 8 characters", "choose 1, 2 or 3", "enter a valid ID number". Each is a "keep asking until valid" loop.
- **Waiting for something:** a download retries until it succeeds, a game waits until the player presses Start, a kettle's controller heats until the water boils.
- **Simulations:** "how many months until this loan is paid off?", "how many years until this investment doubles?". You write the rule for one month and let the loop run it until the goal is met.
- **Every app with a menu.** Show the menu, do what was chosen, show it again, until the user quits. You will build this for Budget Buddy at the end of this phase.

::: connect
**This builds on:** the three ingredients from [Why loops exist](#/phase-03-loops/01-why-loops), and conditions from [if and else](#/phase-02-making-decisions/02-if-and-else) and [and, or, not](#/phase-02-making-decisions/03-combining-conditions). A `while` condition is written exactly like an `if` condition. It is only asked again and again.

**This unlocks:** [the for loop](#/phase-03-loops/03-for-loops), a tidier way to write counting loops. After that, [loop patterns](#/phase-03-loops/04-loop-patterns) shows the classic jobs loops do (totals, counts, finding the biggest). "Keep asking until valid" goes straight into [Budget Buddy v3](#/phase-03-loops/06-project-budget-buddy-v3).
:::

::: challenge Guess the number
Create `phase-3/guess.js`. The program picks a secret whole number from 1 to 20. The user keeps guessing until they get it. After each wrong guess, say `Too low.` or `Too high.`. At the end, say how many guesses it took.

A sample session (your secret number will be different each time):

```text
I am thinking of a number from 1 to 20. Guess: 10
Too low.
Guess again: 15
Too high.
Guess again: 12
Too low.
Guess again: 13
Yes! It was 13. You needed 4 guesses.
```
:::

::: hint
You met `Math.random()` and `Math.floor()` in [Numbers](#/phase-01-storing-information/04-numbers). `Math.floor(Math.random() * 20) + 1` gives a whole number from 1 to 20. Use the "keep asking" shape: ask once before the loop, and inside the loop give the hint, ask again, and add 1 to a counter. Start the counter at 1, because the first guess happens before the loop.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const secret = Math.floor(Math.random() * 20) + 1;
let guesses = 1;
let guess = Number(prompt("I am thinking of a number from 1 to 20. Guess: "));

while (guess !== secret) {
  if (guess < secret) {
    console.log("Too low.");
  } else {
    console.log("Too high.");
  }
  guess = Number(prompt("Guess again: "));
  guesses = guesses + 1;
}

console.log(`Yes! It was ${secret}. You needed ${guesses} guesses.`);
```
Notice the `if`/`else` **inside** the loop body. A loop body can hold any code you like, including decisions. That combination (a loop with decisions inside) is how nearly every interactive program works.

If you ever get stuck in this game, remember the warning above: Ctrl+C at a question does not stop a `prompt-sync` program. Type the right number, or close the terminal.
:::

::: recap
- `while (condition) { body }` checks the condition, runs the body if it is `true`, then goes back and checks again. It stops the first time the condition is `false`.
- The start goes **before** the loop, and the step towards stopping goes **inside** the body.
- The condition is only checked at the top. The body can run zero times.
- A **trace table** (one row per check, one column per variable) is the best way to understand or debug a loop. Fill it in before you run the code.
- An **infinite loop** happens when the condition never becomes false: a missing step, a step in the wrong direction, or a stray `;` after `while (...)`. Stop it with **Ctrl+C**.
- **Keep asking until valid:** ask once, `while` the answer is bad, explain and ask again. After the loop, the answer is guaranteed to be valid.
- Use `while` when you do **not** know how many times the loop will run.
:::

::: interview What is the difference between `if` and `while`?
Both check a condition and run a block if it is true. `if` does this once and moves on. `while` goes back after the block and checks the condition again, repeating until it is false.
:::

::: interview In a "keep asking until valid" loop, why do you call `prompt` both before the loop and inside it?
The one before the loop gets the first answer, so the condition has something to check. The one inside the loop gets a new answer after a bad one. Without it, a bad answer never changes and the loop never ends.
:::

::: interview Your program is stuck printing the same line forever. What do you do?
Press Ctrl+C in the terminal to stop it. Then trace the loop: look at what the condition checks, and find the line in the body that should change it. Usually the step is missing, goes the wrong way, or there is a semicolon after `while (...)`.
:::

::: checkpoint
- [ ] I ran `phase-3/countdown.js` and changed the start, the condition and the step, predicting each time
- [ ] I filled in Lerato's doubling trace table on paper before running the code
- [ ] I created an infinite loop on purpose and stopped it with Ctrl+C
- [ ] I ran `phase-3/tickets.js` with bad answers and saw it keep asking
- [ ] I finished the lift and the taxi fuel exercises
- [ ] I found the stray semicolon in "Debug this"
:::

::: resources
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. The first part covers `while`. Skip the `for` section until the next lesson.
- **MDN, "Looping code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops. A beginner guide with more examples.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the doubling program and click "Next" to watch `amount` and `weeks` change. It draws the trace table for you.
:::
