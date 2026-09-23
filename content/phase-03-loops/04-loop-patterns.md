---
title: The classic loop patterns
summary: Five recipes that loops are used for again and again — running totals, counting, finding the biggest, building text, and "did we find it?".
minutes: 55
stage: Phase 3
---

## What you will learn

- The five classic jobs that loops do, each with a name: the **accumulator**, the **counter**, the **maximum/minimum**, **building a string** and the **flag**
- A plain-words recipe for each one, so you can write it from memory
- How to trace each pattern by hand, and where each one shows up in real apps
- Why these five recipes are worth learning by heart: they come back in Phase 5 and Phase 7

**Before this:** [The for loop](#/phase-03-loops/03-for-loops). You should be comfortable writing `while` and `for` loops and tracing them.

## The problem: "I know how loops work, but what do I *use* them for?"

You can now make the computer repeat things. But when you face a real problem, like "what is the total of these receipts?" or "did anyone fail the test?", it is not obvious how a loop helps. This is the point where many beginners get stuck. They understand the syntax but cannot see how to get from a problem to a loop.

Here is the secret that experienced programmers know: **most loops are one of a handful of patterns.** The details change (receipts, marks, temperatures, letters), but the shape of the code is the same every time. Once you can recognise the pattern in a problem, the code nearly writes itself.

This lesson gives you five of them. Every one has the same structure:

1. **Before the loop:** set up a variable to hold the answer.
2. **Inside the loop:** look at one value, and update the answer if needed.
3. **After the loop:** the answer is ready. Use it.

::: analogy A tally sheet at the school gate
Picture Mr Naidoo standing at the school gate as learners arrive, with a clipboard. He has one job, and the clipboard is set up before the first learner arrives. Depending on the job, the clipboard could be:

- a running total of the money each learner hands in for a school trip (**accumulator**)
- tally marks for every learner who is late (**counter**)
- the height of the tallest learner so far, crossed out and rewritten whenever someone taller arrives (**maximum**)
- a line of initials, one added per learner (**building a string**)
- a single box, "Did anyone forget their permission slip?", ticked the first time it happens and never unticked (**flag**)

He looks at each learner **once**, updates the clipboard, and moves on. When the last learner has arrived, the answer is sitting on the clipboard. That is every pattern in this lesson.
:::

## Pattern 1: the accumulator (running total)

**The job:** add up many values into one total.

**The recipe:**

1. Before the loop, create a variable for the total and set it to `0`.
2. Inside the loop, add the current value to the total.
3. After the loop, the total is ready.

An **accumulator** is a variable that collects (accumulates) values as the loop goes round. The name sounds technical, but it is only a running total, like the display on a till while items are being scanned.

The smallest possible example adds up 1 to 5:

```js
let total = 0;

for (let n = 1; n <= 5; n++) {
  total = total + n;
}

console.log("Total:", total);
```

Output:

```text
Total: 15
```

Trace it. Each row shows the values *during* that iteration:

| Iteration | `n` | `total` before | `total` after `total = total + n` |
|---|---|---|---|
| 1 | 1 | 0 | 1 |
| 2 | 2 | 1 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 4 | 6 | 10 |
| 5 | 5 | 10 | 15 |

The "after" of one row is the "before" of the next. That is what makes it a *running* total.

**Why start at 0?** Because 0 is the number that does not change a sum. If you forget to give it a starting value (`let total;`), `total` starts as `undefined`, and `undefined + 1` is `NaN`. Your total will be `NaN` no matter what you add.

### A real accumulator: the receipts

Ayesha wants to add up her shopping receipts. She knows how many she has, so it is a `for`:

```js
const prompt = require("prompt-sync")();

const howMany = Number(prompt("How many receipts? "));
let total = 0;

for (let i = 1; i <= howMany; i++) {
  const amount = Number(prompt(`Receipt ${i}: R`));
  total += amount;
}

console.log(`Total spent: R${total.toFixed(2)}`);
```

A session:

```text
How many receipts? 3
Receipt 1: R45.50
Receipt 2: R120
Receipt 3: R19.99
Total spent: R185.49
```

`total += amount` is the short form of `total = total + amount`, from [Numbers](#/phase-01-storing-information/04-numbers). Notice where things live:

- `total` is created **before** the loop, so it survives from one iteration to the next.
- `amount` is created **inside** the loop. A fresh `amount` is made on each iteration and thrown away at the end of it. That is why it can be a `const`: each one is only ever given one value.

And if she does not know how many receipts she has? Then it is a `while`, stopping when she types 0. The accumulator part does not change at all:

```js
const prompt = require("prompt-sync")();

let total = 0;
let amount = Number(prompt("Amount (0 to finish): R"));

while (amount !== 0) {
  total += amount;
  amount = Number(prompt("Amount (0 to finish): R"));
}

console.log(`Total: R${total.toFixed(2)}`);
```

A session:

```text
Amount (0 to finish): R35
Amount (0 to finish): R12.50
Amount (0 to finish): R80
Amount (0 to finish): R0
Total: R127.50
```

A special value that means "I am finished", like the 0 here, is called a **sentinel**. It is like a guard standing at the end of the input.

::: try Accumulators
1. In `coding-practice`, create `phase-3/receipts.js` and type in the `for` version of the receipts program.
2. Run it with `node phase-3/receipts.js`. Enter 3 receipts and check the total with a calculator.
3. **Predict, then run:** what happens if you answer `0` to "How many receipts?"? (Trace it: what is the first check of `i <= howMany`?)
4. Now change `let total = 0;` to `let total;` and run it again. What do you see, and why? Change it back.
5. Create `phase-3/until-zero.js` with the `while` version. Run it and stop with `0`.
:::

For step 3, the loop body runs zero times and it prints `Total spent: R0.00`. That is correct: no receipts, nothing spent. For step 4, the total is `NaN`, because `undefined` plus a number is `NaN`, and so is everything after it.

**Real-world accumulators:** a till slip total, a bank balance built from transactions, the total distance on a running app, the number of calories eaten today, the total points in a season.

## Pattern 2: the counter (how many match?)

**The job:** count how many values pass a test.

**The recipe:**

1. Before the loop, create a counter and set it to `0`.
2. Inside the loop, **if** the current value passes the test, add 1 to the counter.
3. After the loop, the counter holds how many passed.

You have been using counters since the start of this phase, to count iterations. This pattern is different in one important way: there is an **`if`** in front of the `++`, so the counter only goes up for the values you care about.

A teacher enters five marks and wants to know how many learners passed (50 or more):

```js
const prompt = require("prompt-sync")();

let passed = 0;

for (let i = 1; i <= 5; i++) {
  const mark = Number(prompt(`Mark for learner ${i}: `));
  if (mark >= 50) {
    passed++;
  }
}

console.log(`${passed} out of 5 learners passed.`);
```

A session:

```text
Mark for learner 1: 72
Mark for learner 2: 45
Mark for learner 3: 50
Mark for learner 4: 38
Mark for learner 5: 91
3 out of 5 learners passed.
```

The trace:

| `i` | `mark` | `mark >= 50`? | `passed` after |
|---|---|---|---|
| 1 | 72 | `true` | 1 |
| 2 | 45 | `false` | 1 |
| 3 | 50 | `true` | 2 |
| 4 | 38 | `false` | 2 |
| 5 | 91 | `true` | 3 |

The counter also works on the letters of a string. Here we count the vowels in a name:

```js
const name = "Nomvula Adebayo";
let vowels = 0;

for (let i = 0; i < name.length; i++) {
  const letter = name[i].toLowerCase();
  if ("aeiou".includes(letter)) {
    vowels++;
  }
}

console.log(`"${name}" has ${vowels} vowels.`);
```

Output:

```text
"Nomvula Adebayo" has 7 vowels.
```

`"aeiou".includes(letter)` asks "is this letter one of a, e, i, o, u?". The `.toLowerCase()` makes sure the capital `A` in Adebayo counts too. Take it out and see what happens.

::: predict How many?
```js
let count = 0;

for (let n = 1; n <= 20; n++) {
  if (n % 3 === 0) {
    count++;
  }
}

console.log(count);
```
:::

::: solution
```text
6
```
It counts the multiples of 3 from 1 to 20: 3, 6, 9, 12, 15 and 18. The loop runs 20 times, but the counter only goes up 6 times. The number of iterations and the value of the counter are two different things.
:::

**Real-world counters:** how many unread messages, how many items in stock are below the reorder level, how many learners were absent, how many times a word appears in a document.

## Pattern 3: maximum and minimum (keep the best so far)

**The job:** find the biggest (or smallest) value.

**The recipe:**

1. Before the loop, create a variable for "the biggest so far".
2. Inside the loop, **if** the current value is bigger than the biggest so far, replace it.
3. After the loop, "the biggest so far" is the biggest of all.

This is the "king of the hill" game. The first value is king. Each new value challenges the king, and if it is bigger, it becomes the new king. Whoever is king at the end won.

Here are five days of summer temperatures in Musina:

```js
const prompt = require("prompt-sync")();

let highest = 0;

for (let day = 1; day <= 5; day++) {
  const temp = Number(prompt(`Day ${day} temperature: `));
  if (temp > highest) {
    highest = temp;
  }
}

console.log(`Highest: ${highest}°C`);
```

A session:

```text
Day 1 temperature: 24
Day 2 temperature: 31
Day 3 temperature: 27
Day 4 temperature: 33
Day 5 temperature: 29
Highest: 33°C
```

Before you read the trace, fill it in yourself on paper: columns for `day`, `temp`, `temp > highest?` and `highest` after.

| `day` | `temp` | `temp > highest`? | `highest` after |
|---|---|---|---|
| (start) | | | 0 |
| 1 | 24 | `true` (24 > 0) | 24 |
| 2 | 31 | `true` (31 > 24) | 31 |
| 3 | 27 | `false` | 31 |
| 4 | 33 | `true` (33 > 31) | 33 |
| 5 | 29 | `false` | 33 |

### The starting-value trap

Now run the same program with five *winter nights* in Sutherland, one of the coldest towns in South Africa:

```text
Day 1 temperature: -4
Day 2 temperature: -7
Day 3 temperature: -2
Day 4 temperature: -5
Day 5 temperature: -3
Highest: 0°C
```

It says the highest was 0°C, but no night was 0°C. Every temperature was below zero, so none of them was ever bigger than the starting value, and the 0 we made up was never replaced. **The starting value won a contest it was never part of.**

The fix is to let the **first real value** be the starting king. With a counter like `day`, you know when you are on the first value, so you can say "if this is the first one, *or* it is bigger, take it". Here is a version that finds both the highest and the lowest:

```js
const prompt = require("prompt-sync")();

let highest;
let lowest;

for (let day = 1; day <= 5; day++) {
  const temp = Number(prompt(`Day ${day} temperature: `));
  if (day === 1 || temp > highest) {
    highest = temp;
  }
  if (day === 1 || temp < lowest) {
    lowest = temp;
  }
}

console.log(`Highest: ${highest}°C  Lowest: ${lowest}°C`);
```

A session:

```text
Day 1 temperature: -4
Day 2 temperature: -7
Day 3 temperature: -2
Day 4 temperature: -5
Day 5 temperature: -3
Highest: -2°C  Lowest: -7°C
```

The minimum is the same pattern with `<` instead of `>`. When is it safe to start at 0? When the values **cannot** be below 0, like prices, marks or distances. Budget Buddy's "biggest expense" starts at 0 for exactly that reason. When in doubt, start with the first value.

**Real-world max/min:** the highest bid in an auction, the fastest lap time (a minimum), the cheapest flight, the top scorer, the coldest day of the month.

::: try Highest and lowest
1. Create `phase-3/temperatures.js` and type in the first version (starting at 0).
2. Run it with summer temperatures. Then run it with all-negative temperatures and see the wrong answer for yourself.
3. Change it to the second version, with `highest`, `lowest` and `day === 1`. Run it with the negative temperatures again.
4. **Predict, then run:** what does the second version print if all five days are the same temperature, say `20`?
:::

For step 4, it prints `Highest: 20°C  Lowest: 20°C`. On day 1 both are set to 20, and no later day beats them, which is correct.

## Pattern 4: building a string

**The job:** make a new piece of text, one bit at a time.

**The recipe:**

1. Before the loop, create a variable holding an empty string, `""`.
2. Inside the loop, add a piece to the end of it (often only **if** some test passes).
3. After the loop, the finished string is ready.

You met this in the last lesson with the `#` bar. It is the accumulator's twin: `""` is to strings what `0` is to numbers, the value that adds nothing.

Here is one you have seen on every card machine slip: hide all but the last four digits of a card number.

```js
const card = "4000123456789010";
let masked = "";

for (let i = 0; i < card.length; i++) {
  if (i < card.length - 4) {
    masked = masked + "*";
  } else {
    masked = masked + card[i];
  }
}

console.log(masked);
```

Output:

```text
************9010
```

The card number has 16 characters, so `card.length - 4` is 12. For positions 0 to 11 we add a `*`, and for positions 12 to 15 we add the real digit.

A second example: tidying up a phone number that someone typed with spaces. We keep every character **except** spaces:

```js
const phone = "082 555 1234";
let digitsOnly = "";

for (let i = 0; i < phone.length; i++) {
  if (phone[i] !== " ") {
    digitsOnly = digitsOnly + phone[i];
  }
}

console.log(digitsOnly);
```

Output:

```text
0825551234
```

Trace the first five iterations of that one yourself: `i`, `phone[i]`, whether it is a space, and `digitsOnly` afterwards. By `i = 4`, `digitsOnly` should be `"0825"`.

Look closely at these two examples, because they are two different jobs:

- The card mask **changes every character** into something (a `*` or itself). The result is the same length as the original.
- The phone tidy-up **keeps only some characters** and drops the rest. The result can be shorter.

Remember that difference. In Phase 7 it becomes the difference between two famous tools called `map` and `filter`.

**Real-world string building:** masking passwords and card numbers, creating usernames from names, removing spaces or dashes from ID numbers, drawing text bars and progress bars, formatting a receipt line by line.

## Pattern 5: the flag (did we find it?)

**The job:** answer a yes/no question about all the values, like "is there a digit anywhere in this password?".

**The recipe:**

1. Before the loop, create a boolean variable (the **flag**) and set it to `false`. "Not found yet."
2. Inside the loop, **if** the current value is the thing you are looking for, set the flag to `true`.
3. **Never set it back to `false` inside the loop.**
4. After the loop, the flag tells you whether it was found anywhere.

It is called a flag because it works like the little flag on an old-fashioned postbox: someone raises it when there is post, and it stays up until someone deals with it.

```js
const prompt = require("prompt-sync")();

const password = prompt("Choose a password: ");
let hasDigit = false;

for (let i = 0; i < password.length; i++) {
  if ("0123456789".includes(password[i])) {
    hasDigit = true;
  }
}

if (hasDigit) {
  console.log("Good, it contains a digit.");
} else {
  console.log("Please include at least one digit.");
}
```

Two sessions:

```text
Choose a password: sunshine
Please include at least one digit.
```

```text
Choose a password: sun5hine
Good, it contains a digit.
```

Trace `sun5hine`:

| `i` | `password[i]` | a digit? | `hasDigit` after |
|---|---|---|---|
| (start) | | | `false` |
| 0 | `s` | no | `false` |
| 1 | `u` | no | `false` |
| 2 | `n` | no | `false` |
| 3 | `5` | **yes** | `true` |
| 4 | `h` | no | `true` |
| 5 | `i` | no | `true` |
| 6 | `n` | no | `true` |
| 7 | `e` | no | `true` |

Once the flag goes up at position 3, the later letters cannot bring it down, because the code only ever *raises* it.

You might notice that the loop keeps going after it has found the `5`, which is wasted work. In [the next lesson](#/phase-03-loops/05-break-continue-nested) you will learn `break`, which stops a loop early the moment you have your answer.

A flag can also start as `true` and be knocked down. "Did **every** learner pass?" starts as `true` ("everyone passed, so far") and becomes `false` the first time a failing mark appears. "Any?" questions start `false`, and "all?" questions start `true`.

**Real-world flags:** "does this order contain any alcohol?" (check ID at delivery), "is any seat still free?", "has every form field been filled in?", "did any payment fail?".

## Patterns work together

Real programs often use several patterns in the same loop. Here is a teacher's mark summary using four of them at once:

```js
const prompt = require("prompt-sync")();

let total = 0;          // accumulator
let passed = 0;         // counter
let highest = 0;        // maximum (marks cannot be negative)
let distinction = false; // flag

for (let i = 1; i <= 5; i++) {
  const mark = Number(prompt(`Mark ${i}: `));
  total += mark;
  if (mark >= 50) {
    passed++;
  }
  if (mark > highest) {
    highest = mark;
  }
  if (mark >= 75) {
    distinction = true;
  }
}

console.log(`Average: ${total / 5}`);
console.log(`Passed: ${passed} of 5`);
console.log(`Highest: ${highest}`);
console.log(distinction ? "At least one distinction!" : "No distinctions this time.");
```

A session:

```text
Mark 1: 72
Mark 2: 45
Mark 3: 50
Mark 4: 38
Mark 5: 91
Average: 59.2
Passed: 3 of 5
Highest: 91
At least one distinction!
```

Notice the **average**: it is the accumulator divided by how many values there were. An average is always "total ÷ count", which is two patterns combined. The comments naming each pattern are a good habit, too. They tell the next reader (maybe you) what job each variable does.

## These patterns will come back

**Remember these five patterns.** They are not only for this phase.

- In **Phase 5** you will learn to store many values in a list, called an array. You will use *exactly* these patterns on lists: the total of all expenses, how many are over R100, the biggest one, and so on. The only change will be where the values come from.
- In **Phase 7** you will meet shortcuts that JavaScript provides for these same jobs. `reduce` is a ready-made accumulator. `filter` is "keep only some" (like the phone number tidy-up). `map` is "change every one" (like the card mask). `some` and `every` are flags. People who learn the shortcuts first often find them mysterious. You will not, because you will already know exactly what the loop underneath is doing.

| Pattern | Starts as | Inside the loop | Comes back in Phase 7 as |
|---|---|---|---|
| Accumulator | `0` | `total += value` | `reduce` |
| Counter | `0` | `if (test) count++` | `filter(...).length` |
| Maximum/minimum | the first value (or 0 if values cannot be negative) | `if (value > best) best = value` | `reduce`, or `Math.max` |
| Building a string | `""` | `text = text + piece` | `map` and `filter`, then `join` |
| Flag | `false` ("any?") or `true` ("all?") | `if (test) found = true` | `some` and `every` |

You do not need to understand the right-hand column yet. It is here so that when you get there, you can look back and see where it came from.

::: exercise Level 1 — Guided · Airtime spending
Create `phase-3/airtime.js`. Kagiso bought airtime 4 times this month.

1. Load `prompt-sync`.
2. Before the loop, create `total` (0), `count` (0, for purchases over R50) and `biggest` (0).
3. Write a `for` loop with `i` from 1 to 4.
4. Inside, ask `Purchase ${i}: R` and store it as a number in `const amount`.
5. Add it to `total`. If it is more than 50, add 1 to `count`. If it is bigger than `biggest`, replace `biggest`.
6. After the loop, print the total, how many were over R50, and the biggest.
7. Run it with `29`, `99`, `12`, `55`. You should get a total of R195, 2 over R50, and a biggest of R99.
:::

::: solution
```js
const prompt = require("prompt-sync")();

let total = 0;    // accumulator
let count = 0;    // counter
let biggest = 0;  // maximum (amounts cannot be negative)

for (let i = 1; i <= 4; i++) {
  const amount = Number(prompt(`Purchase ${i}: R`));
  total += amount;
  if (amount > 50) {
    count++;
  }
  if (amount > biggest) {
    biggest = amount;
  }
}

console.log(`Total: R${total}`);
console.log(`Over R50: ${count}`);
console.log(`Biggest: R${biggest}`);
```
A session:
```text
Purchase 1: R29
Purchase 2: R99
Purchase 3: R12
Purchase 4: R55
Total: R195
Over R50: 2
Biggest: R99
```
:::

::: exercise Level 2 — On your own · Is it a palindrome?
A **palindrome** is a word that reads the same backwards, like `racecar`, `level` or `madam`. Create `phase-3/palindrome.js`. Ask for a word and say whether it is a palindrome. Capitals should not matter, so `Racecar` counts.

Use the **flag** pattern. Decide first: is this an "any?" question or an "all?" question, and so should the flag start `true` or `false`?
:::

::: hint
It is an "all?" question: *all* the letters must match their partner at the other end. So start with `let isPalindrome = true;` and knock it down to `false` the first time a pair does not match. The partner of position `i` is position `word.length - 1 - i`. Check it: in a 7-letter word, position 0 pairs with 6, and position 1 with 5.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const word = prompt("Type a word: ").toLowerCase();
let isPalindrome = true;

for (let i = 0; i < word.length; i++) {
  if (word[i] !== word[word.length - 1 - i]) {
    isPalindrome = false;
  }
}

if (isPalindrome) {
  console.log(`"${word}" reads the same backwards.`);
} else {
  console.log(`"${word}" does not read the same backwards.`);
}
```
Two sessions:
```text
Type a word: Racecar
"racecar" reads the same backwards.
```
```text
Type a word: braai
"braai" does not read the same backwards.
```
This checks every pair twice (0 with 6, and later 6 with 0). It still gives the right answer. If you want to, `i < word.length / 2` checks each pair once.
:::

::: debug Two pattern bugs
Each program runs without crashing but gives the wrong answer. Trace each one and fix it.

```js
// Program A: should print Total: 15
let total;

for (let n = 1; n <= 5; n++) {
  total = total + n;
}

console.log("Total:", total);
```

```js
// Program B: should print Has a digit: true
const password = "sun5hine";
let hasDigit = false;

for (let i = 0; i < password.length; i++) {
  if ("0123456789".includes(password[i])) {
    hasDigit = true;
  } else {
    hasDigit = false;
  }
}

console.log("Has a digit:", hasDigit);
```
:::

::: solution
**A** prints `Total: NaN`. `total` has no starting value, so it is `undefined`, and `undefined + 1` is `NaN`. After that, `NaN` plus anything is still `NaN`. Fix: `let total = 0;`.

**B** prints `Has a digit: false`. The `else` sets the flag back to `false` for every letter that is not a digit, so the flag only remembers the **last** character (`e`). Trace it: `true` at position 3, then `false` again at position 4. Fix: delete the whole `else` part. A flag is raised and never lowered inside the loop.
:::

::: mistake
**Setting up the answer inside the loop.** `let total = 0;` inside the body resets it every iteration. The answer variable always goes **before** the loop.

**Forgetting the starting value.** `let total;` gives `NaN`. Totals and counters start at `0`, and strings start at `""`.

**Starting a maximum at 0 when values can be negative.** Use the first value as the starting king instead.

**Lowering the flag.** An `else` that sets the flag back to `false` means it only reflects the last value.

**Printing the answer inside the loop.** If "Total: …" appears five times, the `console.log` is inside the body. Move it after the `}`.

**Dividing by the wrong count for an average.** The average is the total divided by how many values were added, not by the highest value or the loop's last counter value plus one.
:::

## Real-world uses

Once you know these patterns, you will see them everywhere:

- **Your banking app:** the balance (accumulator), the number of transactions this month (counter), your biggest purchase (maximum), and a warning if any payment bounced (flag).
- **A fitness app:** total steps today (accumulator), days you hit your goal (counter), your longest run (maximum).
- **A school report:** average mark (accumulator ÷ counter), number of subjects passed (counter), best subject (maximum), "passed every subject?" (flag starting `true`).
- **Anywhere text is cleaned or hidden:** card numbers, phone numbers and ID numbers (building a string).

::: connect
**This builds on:** [while loops](#/phase-03-loops/02-while-loops), [for loops](#/phase-03-loops/03-for-loops), and the `if` statement, which sits inside most of these patterns.

**This unlocks:** Budget Buddy v3 uses three of these patterns (accumulator, counter and maximum) to track your expenses. In Phase 5, [Classic list algorithms, written by hand](#/phase-05-arrays/04-array-algorithms-by-hand) applies all five to lists. In Phase 7, [reduce](#/phase-07-functions-as-values/06-reduce), [filter](#/phase-07-functions-as-values/04-filter) and [find, some and every](#/phase-07-functions-as-values/05-find-some-every) are shortcuts for exactly these loops.
:::

::: challenge Where is the first space?
Write a program that asks for a full name, like `Lindiwe Mokoena`, and prints the **position of the first space** and the **first name** on its own. If there is no space at all, say so.

Use a variable that starts at `-1` (meaning "not found yet") and is set to `i` the first time you find a space. Then build the first name from the letters before that position.
:::

::: hint
This is a flag that remembers *where*, not only *whether*. Inside the loop: `if (name[i] === " " && firstSpace === -1)`. The second part makes sure a later space does not overwrite the first one. Then a second loop, from 0 up to (but not including) `firstSpace`, builds the first name.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const name = prompt("Full name: ");
let firstSpace = -1;

for (let i = 0; i < name.length; i++) {
  if (name[i] === " " && firstSpace === -1) {
    firstSpace = i;
  }
}

if (firstSpace === -1) {
  console.log("There is no space in that name.");
} else {
  let firstName = "";
  for (let i = 0; i < firstSpace; i++) {
    firstName = firstName + name[i];
  }
  console.log(`The first space is at position ${firstSpace}.`);
  console.log(`First name: ${firstName}`);
}
```
Two sessions:
```text
Full name: Lindiwe Mokoena
The first space is at position 7.
First name: Lindiwe
```
```text
Full name: Madonna
There is no space in that name.
```
Using `-1` for "not found" is a convention you will meet again: in Phase 5, `indexOf` gives `-1` when something is not in a list, and in Phase 7 so does `findIndex`. (You could also get the first name with `name.slice(0, firstSpace)`, from the Strings lesson. Building it by hand shows what `slice` does for you.)
:::

::: recap
- Most loops follow a few patterns: set up an answer **before** the loop, update it **inside**, use it **after**.
- **Accumulator:** start at `0`, add each value. For running totals.
- **Counter:** start at `0`, `if` the value passes a test, `++`. For "how many?".
- **Maximum/minimum:** keep the best so far, and replace it when something beats it. Start with the first value unless values cannot be negative.
- **Building a string:** start at `""`, add a piece each time. Changing every character and keeping only some are two different jobs.
- **Flag:** a boolean that starts `false` for "any?" (or `true` for "all?") and is changed once, never changed back.
- Average = accumulator ÷ counter.
- These return in Phase 5 (on lists) and Phase 7 (as `reduce`, `filter`, `map`, `some`, `every`).
:::

::: interview Why does a running total start at 0, and what happens if you forget?
0 is the value that does not change a sum, so the first addition gives the first value. If you forget, the variable is `undefined`, and `undefined + number` is `NaN`, so the total ends up `NaN`.
:::

::: interview Why can starting a "highest so far" variable at 0 give the wrong answer?
If every value is negative, none of them is bigger than 0, so the variable is never replaced and the answer is 0, a value that was not even in the data. Starting with the first real value avoids this.
:::

::: interview How do you check whether *any* character in a string is a digit?
Use a flag: set `let found = false;` before the loop, go through each character, and if it is a digit set `found = true`. Never set it back to `false` inside the loop. After the loop, `found` tells you the answer.
:::

::: checkpoint
- [ ] I ran the receipts program in both its `for` and `while` versions
- [ ] I saw a total turn into `NaN` when I removed the starting value
- [ ] I saw the "highest: 0°C" bug with negative temperatures, and fixed it
- [ ] I traced the flag pattern on `sun5hine` by hand
- [ ] I finished the airtime exercise and the palindrome checker
- [ ] I can name the five patterns and write the recipe for each from memory
:::

::: resources
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. The tasks at the bottom of the chapter are good extra practice for these patterns.
- **Eloquent JavaScript, chapter 2:** https://eloquentjavascript.net/02_program_structure.html. The exercises at the end ("Looping a triangle", "FizzBuzz", "Chessboard") use building a string.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the palindrome checker (with the word set in a variable instead of `prompt`) and watch the flag.
:::
