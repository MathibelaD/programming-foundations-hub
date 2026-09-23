---
title: The for loop
summary: A tidy loop for when you know how many times to repeat. Its three parts, counting in every direction, and walking through the letters of a word.
minutes: 50
stage: Phase 3
---

## What you will learn

- The three parts of a `for` loop (start; condition; step), and the exact order JavaScript runs them in
- How to count up, count down, count in steps of 2 (or any number), and why so many loops start at 0
- How to choose between `for` and `while`, and how to turn one into the other
- How to walk through the letters of a word one at a time, which is the stepping stone to lists in Phase 5

**Before this:** [The while loop](#/phase-03-loops/02-while-loops). You should be able to write a `while` loop and trace it with a table.

## The problem: the loop ingredients are scattered

Here is the countdown from the last lesson, written with `while`:

```js
let count = 5;               // start

while (count > 0) {          // condition
  console.log(count);
  count = count - 1;         // step
}

console.log("Liftoff!");
```

It works. But look where the three ingredients are: the start is **above** the loop, the condition is **at the top**, and the step is **at the bottom** of the body. In a short loop that is fine. In a loop with 30 lines in the body, the step can be a long way from the condition, and it is tempting to forget it (hello, infinite loop) or to put something after it by accident.

For **counting loops**, where a counter goes from one number to another, JavaScript has a loop that gathers all three ingredients onto a single line. It is called the `for` loop, and it is the loop you will see most often in real code.

::: analogy A gym instructor's set of reps
A gym instructor says: "Starting at rep 1, as long as you have done 10 or fewer, do a squat, then count the next rep." Everything you need to know about the set is in that one sentence: where to start, when to stop, and how to move on. You can then focus completely on the squat itself.

A `for` loop is that sentence. The first line says start, stop and step, and the body is the squat.
:::

## The three parts

Here is "print 1 to 5" as a `for` loop:

```js
for (let count = 1; count <= 5; count++) {
  console.log(count);
}

console.log("Finished");
```

Output:

```text
1
2
3
4
5
Finished
```

Inside the round brackets there are **three parts, separated by semicolons**:

| Part | Here | What it does | When it runs |
|---|---|---|---|
| Start | `let count = 1` | Creates the counter and gives it its first value | **Once**, before anything else |
| Condition | `count <= 5` | Asked before each iteration. `true` means go again, `false` means stop | Before **every** iteration |
| Step | `count++` | Moves the counter along | **After** every iteration, before the next check |

`count++` is the short way to write `count = count + 1`, which you met in [Numbers](#/phase-01-storing-information/04-numbers). `count--` makes it one smaller, and `count += 2` adds 2. Any of them can be the step.

These are the same three ingredients as always. Nothing new has been invented. They have been moved into one place.

## The order things happen in

This is the part that confuses nearly everyone at first, because the step is written *before* the body but runs *after* it. Here is exactly what JavaScript does:

1. Run the **start**, once.
2. Check the **condition**. If it is `false`, the loop is over. Jump to the code after the `}`.
3. Run the **body**.
4. Run the **step**.
5. Go back to 2.

Trace it, following those numbers:

| What happens | `count` | Condition `count <= 5` | Printed |
|---|---|---|---|
| start | 1 | | |
| check | 1 | `true` | |
| body | 1 | | 1 |
| step | 2 | | |
| check | 2 | `true` | |
| body | 2 | | 2 |
| step | 3 | | |
| … | … | … | … |
| body | 5 | | 5 |
| step | 6 | | |
| check | 6 | `false`, so the loop ends | |

That is a very long table, so from now on we will use the shorter kind from the last lesson, with **one row per check**:

| Check | `count` | `count <= 5`? | Printed | `count` after the step |
|---|---|---|---|---|
| 1 | 1 | `true` | 1 | 2 |
| 2 | 2 | `true` | 2 | 3 |
| 3 | 3 | `true` | 3 | 4 |
| 4 | 4 | `true` | 4 | 5 |
| 5 | 5 | `true` | 5 | 6 |
| 6 | 6 | `false`, stop | | |

It is identical to the `while` trace from the last lesson. That is the point: **a `for` loop does the same thing as a `while` loop.** Only the layout is different.

::: quiz
What does this print?

```js
for (let n = 2; n < 20; n = n * 3) {
  console.log(n);
}
```

- [ ] `6`, `18`
- [x] `2`, `6`, `18`
- [ ] `2`, `6`, `18`, `54`
- [ ] `2`, `6`

The start sets `n` to 2, and the body prints it before the step ever runs. The step then makes 6, which passes the check and prints, then 18, which also passes. The next step makes 54, and `54 < 20` is `false`, so 54 is never printed. `6, 18` is the answer you get if you run the step before the body because it is written first. It runs after.
:::

## The same countdown, as a for

```js
for (let count = 5; count > 0; count--) {
  console.log(count);
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

Put the `while` version and the `for` version next to each other and match up the parts:

| Ingredient | In the `while` version | In the `for` version |
|---|---|---|
| Start | `let count = 5;` on its own line, above the loop | first slot: `let count = 5` |
| Condition | `while (count > 0)` | second slot: `count > 0` |
| Step | `count = count - 1;` at the bottom of the body | third slot: `count--` |
| Body | `console.log(count);` | `console.log(count);` |

The start moves into the first slot, the condition stays where it was, and the step moves out of the bottom of the body into the third slot. The body is left with only the real work: `console.log(count)`.

::: try Your first for loops
1. In `coding-practice`, create `phase-3/for-basics.js`.
2. Type in the countdown `for` loop above, and run it:
   ```bash
   node phase-3/for-basics.js
   ```
3. You should see `5 4 3 2 1` (one per line) and `Liftoff!`.
4. **Predict, then run:** change the start to `let count = 10`. How many numbers print?
5. **Predict, then run:** change the step to `count -= 3`. Which numbers print now? Write them down first. (Trace it: 10, then 7, then…?)
6. **Predict, then run:** change the condition to `count > 100`. How many times does the body run?
:::

For step 5 you should see `10`, `7`, `4`, `1`. For step 6, zero times: the first check is already `false`, exactly like a `while`.

## Counting in every direction

The three parts can be anything you like, so a `for` loop can count however you need.

**Steps of 2.** The even numbers from 2 to 20:

```js
for (let n = 2; n <= 20; n += 2) {
  console.log(n);
}
```

Output:

```text
2
4
6
8
10
12
14
16
18
20
```

**Counting down by 20**, for a bar that drains from 100% to empty: `for (let n = 100; n >= 0; n -= 20)` gives `100 80 60 40 20 0`.

**Starting at 0.** Many loops in real code look like this:

```js
for (let i = 0; i < 5; i++) {
  console.log("Push-up number", i);
}
```

Output:

```text
Push-up number 0
Push-up number 1
Push-up number 2
Push-up number 3
Push-up number 4
```

Two things are going on here:

- **`i` is the traditional name** for a loop counter. It is short for "index" (a position number, explained below). You can use any name, but you will see `i` everywhere, so get used to reading it.
- **"Start at 0, stop before 5" runs 5 times**, the same as "start at 1, stop after 5". Both of these loops run exactly 5 times:
  - `for (let i = 1; i <= 5; i++)` gives 1, 2, 3, 4, 5
  - `for (let i = 0; i < 5; i++)` gives 0, 1, 2, 3, 4

Why would anyone start at 0? For counting push-ups, you would not. You would start at 1, because humans count from 1. But positions in a piece of text (and later, in a list) start at 0. So when a loop is going through **positions**, `i = 0` and `i < length` is the natural shape. You are about to see why.

::: note Pick the one that reads best
If you want to print "Push-up 1" to "Push-up 5", start at 1 and use `<=`. If you are going through positions in text, start at 0 and use `<`. Both are correct. Choose the one that makes the code say what you mean.
:::

::: quiz
Each of these loops has the body `console.log(p);`. Which one prints 0, 25, 50, 75, 100 and then stops?

- [ ] `for (let p = 0; p < 100; p += 25)`
- [ ] `for (let p = 25; p <= 100; p += 25)`
- [ ] `for (let p = 0; p <= 100; p + 25)`
- [x] `for (let p = 0; p <= 100; p += 25)`

It must start at 0, include 100 (so `<=`), and really change `p` (so `+=`). The first one stops before 100, because `100 < 100` is `false`. The second starts at 25. The third is the sneaky one: `p + 25` works out a number but never stores it, so `p` stays 0 and the loop prints 0 for ever. Only `+=` (or `p = p + 25`) changes the counter.
:::

## Walking through the letters of a word

You learned in [Strings](#/phase-01-storing-information/05-strings) that `word[0]` is the first character of `word`, `word[1]` is the second, and `word.length` is how many characters there are. The number in the square brackets is the character's **index**, its position counting from 0.

With a `for` loop, the counter can **be** the index:

```js
const word = "Soweto";

for (let i = 0; i < word.length; i++) {
  console.log(i, word[i]);
}
```

Output:

```text
0 S
1 o
2 w
3 e
4 t
5 o
```

Before reading on, trace it. `word.length` is 6.

| Check | `i` | `i < 6`? | `word[i]` |
|---|---|---|---|
| 1 | 0 | `true` | `S` |
| 2 | 1 | `true` | `o` |
| 3 | 2 | `true` | `w` |
| 4 | 3 | `true` | `e` |
| 5 | 4 | `true` | `t` |
| 6 | 5 | `true` | `o` |
| 7 | 6 | `false`, stop | |

Look at the last row. The positions go from 0 to 5, so the last valid index is `length - 1`. That is why the condition is `i < word.length`, not `i <= word.length`. Here is what happens with `<=`:

```js
const word = "Soweto";

for (let i = 0; i <= word.length; i++) {
  console.log(i, word[i]);
}
```

Output:

```text
0 S
1 o
2 w
3 e
4 t
5 o
6 undefined
```

There is no character at position 6, so `word[6]` is `undefined`. This off-by-one mistake is so common that you should check for it every time you write `<=` next to `.length`.

Here is something worth noticing. This loop works for **any** word, of any length. The loop does not know or care how long the word is. It asks `word.length`. Change `"Soweto"` to `"Polokwane"` and it prints 9 lines without you changing anything else.

::: note Keep this shape in your head
`for (let i = 0; i < something.length; i++)` is one of the most common lines in all of programming. Right now `something` is a string. In [Phase 5](#/phase-05-arrays/03-looping-through-arrays) it will be a list of expenses, of names or of marks, and the loop will look *exactly* the same. You are learning it early.
:::

::: quiz
What does this print?

```js
const word = "Karoo";

for (let i = 1; i < word.length; i += 2) {
  console.log(word[i]);
}
```

- [x] `a`, `o`
- [ ] `K`, `r`, `o`
- [ ] `a`, `o`, `undefined`
- [ ] `K`, `a`, `r`, `o`, `o`

`word.length` is 5, so the positions are 0 to 4. `i` starts at 1 (`a`), jumps to 3 (`o`), then to 5, and `5 < 5` is `false`. The `K` is at position 0, which this loop skips because it starts at 1. `K, r, o` is what you get if you count the letters from 1, like a person would. Indexes count from 0.
:::

## Building a string in a loop

A loop can build up a piece of text one bit at a time. Start with an empty string `""`, and add to it on each iteration:

```js
let bar = "";

for (let i = 1; i <= 5; i++) {
  bar = bar + "#";
  console.log(bar);
}
```

Output:

```text
#
##
###
####
#####
```

Trace `bar`: `""` → `"#"` → `"##"` → `"###"` and so on. `bar = bar + "#"` is the string version of `count = count + 1`: "make it one `#` longer than it was".

This is how you draw a simple **text bar chart**. Here is one day's rainfall as a bar:

```js
const day = "Wednesday";
const rain = 7;

let bar = "";
for (let i = 0; i < rain; i++) {
  bar = bar + "#";
}

console.log(`${day}: ${bar} ${rain}mm`);
```

Output:

```text
Wednesday: ####### 7mm
```

Notice that this time the `console.log` is **after** the loop. The loop builds the bar quietly, and we print the finished bar once. Compare that with the previous example, where printing inside the loop showed every stage. Where you put a line (inside or outside the body) completely changes what the program does.

You can also walk through a word **backwards**, starting from the last index and counting down:

```js
const word = "braai";
let backwards = "";

for (let i = word.length - 1; i >= 0; i--) {
  backwards = backwards + word[i];
}

console.log(backwards);
```

Output:

```text
iaarb
```

The start is `word.length - 1` (the last position, 4), the condition is `i >= 0` (keep going down to and including position 0), and the step is `i--`.

::: try Letters and bars
1. Create `phase-3/letters.js`.
2. Type in the "Soweto" loop and run it with `node phase-3/letters.js`.
3. Change the word to your own name or your home town. Predict the last line printed (its index and its letter), then run it.
4. Change `<` to `<=` and run it again. Find the `undefined`. Change it back.
5. Below it, type in the rainfall bar program (use a different variable name, like `rainBar`, if `bar` is already taken in the file). Change `rain` to `12`, predict, run.
:::

::: quiz
What does this print?

```js
const town = "Durban";
let result = "";

for (let i = 0; i < town.length; i++) {
  result = town[i] + result;
}

console.log(result);
```

- [ ] `Durban`
- [ ] `n`
- [x] `nabruD`
- [ ] `D`

Each letter is put in **front** of what is already there, because `town[i]` comes first in `town[i] + result`. So `result` grows as `D`, `uD`, `ruD`, and so on, and ends as `nabruD`. The loop walks forwards, but the string comes out backwards. `Durban` is what `result = result + town[i]` would give. The order of the two sides of `+` decides where the new piece goes.
:::

## Where does the counter go afterwards?

One real difference between `while` and `for`: the `let` in a `for` loop's start creates a counter that **belongs to the loop**. When the loop ends, it is gone:

```js
for (let count = 1; count <= 5; count++) {
  console.log(count);
}

console.log("count is now", count);
```

Output:

```text
1
2
3
4
5
```

then:

```text
ReferenceError: count is not defined
```

Node points its `^` at `count` on the last line. In the `while` version, `count` was made *before* the loop, so it was still there afterwards, and we could print `count is now 6`. In a `for` loop, it only exists inside the loop. That is usually what you want: the counter was only needed for the loop, and now it is tidied away. (This idea is called **scope**, and it has [its own lesson](#/phase-04-functions/04-scope) in Phase 4.)

If you need to know something after a loop has finished, like how many weeks it took, keep it in a variable created *before* the loop.

::: quiz
What does this print?

```js
let total = 0;

for (let i = 1; i <= 3; i++) {
  total = total + i;
}

console.log(total, i);
```

- [ ] `6 4`
- [x] `ReferenceError: i is not defined`
- [ ] `6 3`
- [ ] `6 undefined`

`i` was created with `let` in the start slot of the `for`, so it only exists inside the loop. After the `}` there is no `i` at all. Using a name that does not exist is a `ReferenceError`, and it stops the program before anything is printed, so you do not even see the 6. `6 4` is what you would get from a `while` loop with a counter made before it. `undefined` is for a box that exists but is empty. Here there is no box.
:::

## for or while? How to choose

Ask the question from the first lesson of this phase: **do I know (or can I work out) how many times it will repeat before it starts?**

| Use `for` when… | Use `while` when… |
|---|---|
| You know the count, or can calculate it before the loop | You do not know how many times it will run |
| A counter goes from one number to another | You are waiting for something to happen |
| "Do this 12 times", "for every month of the year" | "Until the answer is valid", "until the money reaches R5000" |
| "For each letter in this word" (`.length` tells you how many) | "Until the user chooses Quit" |
| Times tables, countdowns, going through positions | Input checking, games, menus, simulations |

A good rule of thumb: **if you find yourself writing a counter, a condition on that counter, and a `++` at the bottom of a `while`, it probably wants to be a `for`.** And if the three slots of a `for` feel forced (for example, the "step" is asking the user a question), it probably wants to be a `while`.

Remember, either loop *can* do any job. This is about writing code that a person can read and understand quickly, including you, three weeks from now.

## Real problems

**A times table.** You know it is 12 lines, so it is a `for`:

```js
const number = 7;

for (let i = 1; i <= 12; i++) {
  console.log(`${number} x ${i} = ${number * i}`);
}
```

Output:

```text
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
7 x 11 = 77
7 x 12 = 84
```

**Compound interest over a year.** Aisha puts R1000 into a savings account that pays 1% interest every month. Each month's interest is added to the balance, so next month she earns interest on the interest too. That is called **compound interest**. There are 12 months in a year, so it is a `for`:

```js
let balance = 1000;

for (let month = 1; month <= 12; month++) {
  balance = balance * 1.01;
  console.log(`Month ${month}: R${balance.toFixed(2)}`);
}
```

Output:

```text
Month 1: R1010.00
Month 2: R1020.10
Month 3: R1030.30
Month 4: R1040.60
Month 5: R1051.01
Month 6: R1061.52
Month 7: R1072.14
Month 8: R1082.86
Month 9: R1093.69
Month 10: R1104.62
Month 11: R1115.67
Month 12: R1126.83
```

`balance * 1.01` means "the balance plus 1% of it". Notice that `balance` was created **before** the loop, so it keeps its value from one month to the next, and it is still there after the loop ends. `month` is only the counter. If `balance` were created inside the body, it would be reset to 1000 every month.

::: predict What does this print?
```js
for (let i = 10; i > 0; i -= 3) {
  console.log(i);
}
```
Trace it before you run it. How many lines? What is the last number?
:::

::: solution
```text
10
7
4
1
```
| Check | `i` | `i > 0`? |
|---|---|---|
| 1 | 10 | `true` |
| 2 | 7 | `true` |
| 3 | 4 | `true` |
| 4 | 1 | `true` |
| 5 | -2 | `false`, stop |

Four lines. The counter never lands on 0. It jumps from 1 to -2. Because the condition uses `>` rather than `!==`, the loop stops safely anyway.
:::

::: exercise Level 1 — Guided · Any times table
Create `phase-3/times-table.js`.

1. Load `prompt-sync` at the top: `const prompt = require("prompt-sync")();`.
2. Ask `"Which times table? "` and turn the answer into a number with `Number(...)`. Store it in `number`.
3. Write a `for` loop with a counter `i` that goes from 1 to 12.
4. Inside the loop, print a line like `9 x 3 = 27` using a template literal.
5. Run it and type `9`. Check the last line is `9 x 12 = 108`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const number = Number(prompt("Which times table? "));

for (let i = 1; i <= 12; i++) {
  console.log(`${number} x ${i} = ${number * i}`);
}
```
A session:
```text
Which times table? 9
9 x 1 = 9
9 x 2 = 18
9 x 3 = 27
9 x 4 = 36
9 x 5 = 45
9 x 6 = 54
9 x 7 = 63
9 x 8 = 72
9 x 9 = 81
9 x 10 = 90
9 x 11 = 99
9 x 12 = 108
```
For a stronger program, check the input with a "keep asking until valid" `while` loop *before* the `for` loop. The two loops sit one after the other, each doing the job it is best at.
:::

::: exercise Level 2 — On your own · Spell it out
Create `phase-3/spell.js`. Ask for the user's name and print it in capitals with a dash between each letter. `Thandi` should become `T-H-A-N-D-I`, with **no dash at the end**.

Build the result in a string variable with a loop, and print it once at the end.
:::

::: hint
Start with `let spelled = "";` and loop with `i` from 0 to `name.length - 1` (so `i < name.length`). The first version most people write adds `name[i] + "-"` each time, but then there is a dash at the end. Look at *when* a dash is needed: before every letter **except the first**. Which value of `i` is the first letter? An `if` inside the loop can check for it.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ").toUpperCase();
let spelled = "";

for (let i = 0; i < name.length; i++) {
  if (i > 0) {
    spelled = spelled + "-";
  }
  spelled = spelled + name[i];
}

console.log(spelled);
```
A session:
```text
What is your name? Thandi
T-H-A-N-D-I
```
If you added `name[i] + "-"` every time, you got `T-H-A-N-D-I-`. Putting the dash *before* each letter except the first (`i > 0`) fixes it. "Something between the items, but not at the ends" is a problem you will meet again whenever you print lists.
:::

::: exercise Level 2 — On your own · while to for
Here is the lift from the last lesson. Rewrite it as a `for` loop that prints exactly the same thing. Then write one sentence: why is `for` a better fit for this job than `while`?

```js
let floor = 10;

while (floor > 0) {
  console.log("Floor", floor);
  floor = floor - 1;
}

console.log("Ground floor. Doors opening.");
```
:::

::: solution
```js
for (let floor = 10; floor > 0; floor--) {
  console.log("Floor", floor);
}

console.log("Ground floor. Doors opening.");
```
The output is the same as before, ending with:
```text
Floor 2
Floor 1
Ground floor. Doors opening.
```
`for` fits better because we know exactly how many floors there are: the counter goes from one known number to another, and all three ingredients now sit on one line.
:::

::: debug Two broken loops
Each has one problem. Run each one, read what happens, and fix it.

```js
// Program A: should print each letter of "Durban"
const city = "Durban";
for (let i = 0; i <= city.length; i++) {
  console.log(city[i]);
}
```

```js
// Program B: should print 0 to 4
for (let i = 0, i < 5, i++) {
  console.log(i);
}
```
:::

::: solution
**A** prints the six letters and then `undefined`. There are 6 letters at positions 0 to 5, so position 6 does not exist. Change `<=` to `<`: `i < city.length`.

**B** crashes before running anything:
```text
SyntaxError: Identifier 'i' has already been declared
```
Node points its `^` at the second `i`. The error message is confusing here, because the real mistake is the **commas**. The three parts of a `for` must be separated by **semicolons**: `for (let i = 0; i < 5; i++)`. With commas, JavaScript thinks you are trying to create several variables in one `let`, and gets confused by the second `i`. This is a useful lesson in itself: an error message tells you where JavaScript got confused, which is not always where the mistake is. Look at the line it points to, and the characters right before it.
:::

::: mistake
**Commas instead of semicolons.** It is `for (start; condition; step)`, with two semicolons.

**`<=` with `.length`.** Positions go from 0 to `length - 1`, so use `i < word.length`.

**A semicolon after the closing bracket.** `for (let i = 0; i < 5; i++);` has an empty body, the same as with `while`. The block below is not part of the loop. It runs once, afterwards, and crashes with `ReferenceError: i is not defined`, because the counter no longer exists.

**Creating the result inside the loop.** `let bar = "";` or `let balance = 1000;` inside the body resets it on every iteration. Anything that must survive from one iteration to the next goes **before** the loop.

**Using the counter after the loop.** A counter made with `let` in the `for` brackets is gone after the loop ends. Keep anything you need later in a variable created before the loop.

**Changing the counter inside the body as well.** If the body also does `i++`, the counter moves twice per iteration and skips values. Let the step slot do its job.
:::

## Real-world uses

- **Anything with a fixed number of steps:** 12 months of interest, 7 days of a weekly report, 24 hours of a timetable, 90 minutes of a football match.
- **Going through the characters of text:** checking that a password has a digit in it, counting the vowels in a name, hiding all but the last 4 digits of a card number (`************1234`).
- **Drawing with text:** progress bars, bar charts, and grids in games like noughts and crosses.
- **Going through every item in a list.** This is by far the biggest use of all, and it starts in Phase 5. The line `for (let i = 0; i < list.length; i++)` will become second nature.

::: connect
**This builds on:** [the while loop](#/phase-03-loops/02-while-loops), since a `for` is a `while` with its three ingredients gathered into one line, and on `word[i]` and `.length` from [Strings](#/phase-01-storing-information/05-strings).

**This unlocks:** [loop patterns](#/phase-03-loops/04-loop-patterns), where you use loops to add things up, count things and find the biggest. You have already used one pattern today: **building a string**. The "for every position" shape is exactly how you will walk through lists in [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays).
:::

::: challenge FizzBuzz
A famous little test that is still used in job interviews. Print the numbers from 1 to 15, but:

- for multiples of 3, print `Fizz` instead of the number
- for multiples of 5, print `Buzz` instead
- for multiples of **both** 3 and 5, print `FizzBuzz`

Expected output:

```text
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```
:::

::: hint
`n % 3 === 0` is `true` when `n` is a multiple of 3 (there is nothing left over). Use an `if` / `else if` chain inside a `for` loop. Think carefully about which check must come **first**.
:::

::: solution
```js
for (let n = 1; n <= 15; n++) {
  if (n % 3 === 0 && n % 5 === 0) {
    console.log("FizzBuzz");
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(n);
  }
}
```
The "both" check must come first. If `n % 3 === 0` came first, 15 would print `Fizz` and the `else if` chain would never reach the FizzBuzz check. This is the "order matters in `else if`" rule from [if and else](#/phase-02-making-decisions/02-if-and-else), now running inside a loop.
:::

::: recap
- `for (start; condition; step) { body }` gathers the three loop ingredients onto one line.
- Order: the start runs once. Then: check the condition, run the body, run the step, and check again. The step runs **after** the body.
- `i++`, `i--` and `i += 2` are common steps. `i` is the traditional counter name.
- `for (let i = 0; i < 5; i++)` and `for (let i = 1; i <= 5; i++)` both run 5 times. Start at 0 for positions, and at 1 for human counting.
- `for (let i = 0; i < word.length; i++)` visits every character, using `word[i]`. Use `<`, not `<=`.
- A counter made in the `for` brackets disappears after the loop. Results you need afterwards must be created before it.
- Use `for` when you know (or can work out) how many times. Use `while` when you do not.
:::

::: interview In what order does JavaScript run the three parts of a `for` loop and its body?
The start runs once. Then it checks the condition. If it is true, it runs the body, then the step, then checks the condition again. When the condition is false, the loop ends.
:::

::: interview Why is it `i < word.length` and not `i <= word.length`?
Positions start at 0, so the last character is at `word.length - 1`. With `<=`, the loop also visits position `word.length`, where there is no character, and you get `undefined`.
:::

::: interview When would you choose `while` over `for`?
When you do not know how many times the loop will run before it starts, for example "keep asking until the answer is valid" or "keep going until the user quits". `for` is for when you know or can calculate the number of repeats, like 12 months or every letter of a word.
:::

::: checkpoint
- [ ] I ran a `for` countdown and changed the start, step and condition, predicting each time
- [ ] I traced a `for` loop by hand, one row per check
- [ ] I looped over the letters of my own name with `word[i]`, and saw the `undefined` that `<=` causes
- [ ] I built a bar of `#` characters with a loop
- [ ] I wrote the times table program and the "spell it out" program
- [ ] I rewrote the lift `while` loop as a `for` loop, and can explain why `for` suits it better
:::

::: resources
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. The `for` section, with a very clear diagram of the running order.
- **MDN, "Looping code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops. More examples, including the comparison between loop types.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the "braai" backwards loop and step through it. Watch `i` go down while `backwards` grows.
:::
