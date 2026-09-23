---
title: Numbers — whole numbers, decimals, and why 0.1 + 0.2 is weird
summary: How computers store numbers, why decimals are slightly fuzzy, and the operators and Math tools you will use every day.
minutes: 55
stage: Phase 1
---

## What you will learn

- The difference between **whole numbers** and **decimal numbers**, and how a computer stores them
- What **float**, **double** and **decimal** mean (you will see these words everywhere), and which one JavaScript uses
- Why `0.1 + 0.2` does not give exactly `0.3`, and how to handle money safely
- All the number operators, including `%` and `**`, the shortcuts `+=` and `++`, and the `Math` tools for rounding and random numbers

**Before this:** [let, const, and choosing good names](#/phase-01-storing-information/03-let-and-const).

## The problem: two kinds of numbers in everyday life

Think about the numbers you deal with in a normal day:

- **Counting:** 15 people in a minibus taxi. 3 children. 2 loaves of bread. 42 learners in a class.
- **Measuring:** 1.25 kg of tomatoes. 23.7 litres of petrol. 36.6 °C body temperature. R19.99 for a bag of oranges.

Counting numbers are always whole. You cannot have 2.5 people in a taxi. Measuring numbers often have a part after the decimal point, and in real life they are never perfectly exact. Your scale says 1.25 kg, but the tomatoes really weigh 1.2493… kg. The scale rounded.

Mathematicians call the whole numbers **integers** (…, −2, −1, 0, 1, 2, …). Numbers with a fractional part, like 1.25, are called **decimal numbers** or **real numbers**.

To a person, these are all "just numbers". To a computer, the difference matters, and it explains one of the strangest things you will ever see a computer do. First, though, you need to know how a computer stores a number at all.

## How a computer stores a number: a fixed number of boxes

A computer's memory is made of **bits**. A **bit** is the smallest possible piece of information: a tiny switch that is either off or on, written `0` or `1`.

To store a number, the computer uses a **fixed number of bits**, such as 32 or 64, and writes the number into them in **binary** (a way of writing numbers using only the digits 0 and 1). The important word is **fixed**. The number of boxes is decided in advance, and it never grows.

::: analogy The kilometre counter in a car
An old car has a mechanical kilometre counter with six little wheels, each showing a digit from 0 to 9.

- It can show any whole number from `000000` to `999999`, exactly.
- It **cannot** show 1,000,000 km. There is no seventh wheel. When the car passes 999,999 km, the counter rolls back to `000000`.
- It cannot show 1234.5 km either. There is no wheel for the half.

A computer's number is like that counter: a fixed number of places. More places means bigger numbers and more precision, but there is always a limit.
:::

For **whole numbers**, this works perfectly until you hit the limit. A 32-bit integer can hold any whole number up to 2,147,483,647 (about 2.1 billion), exactly.

**Decimal numbers** are harder. A computer stores them a bit like scientific notation on a calculator: "1.2345 × 10³". It keeps a certain number of **significant digits** (the meaningful digits, counting from the first one that is not zero) and remembers separately where the decimal point goes. That is why they are called **floating-point numbers**: the decimal point "floats" to wherever it is needed. The same number of digits can store 0.0012345 or 12,345,000.

The catch: only a certain number of significant digits fit. Anything beyond that is rounded off.

## Float, double and decimal, explained plainly

You will hear these three words constantly as a programmer, especially if you ever learn C#, Java or C. They are three different "sizes of box" for decimal numbers.

| Type | Size | Keeps about… | What it is like | Typical use |
|---|---|---|---|---|
| `int` | 32 bits | Whole numbers only, up to about 2.1 billion | A counter with no decimal point at all | Counting things |
| `float` | 32 bits | **7** significant digits | A ruler with markings, but not very many | Graphics, games, sensor readings, where tiny errors do not matter and memory does |
| `double` | 64 bits | **15 to 17** significant digits | The same ruler with far more markings | General maths and science. The everyday choice. |
| `decimal` | 128 bits (in C#) | **28 to 29** significant digits, stored in base 10 | A ruler marked in exact tenths and hundredths | **Money** |

"Double" is short for **double precision**: twice as many bits as a float, and more than twice as many digits.

What does "7 significant digits" mean in practice? Store `123456789` (nine digits) in a `float`, and what comes back is `123456792`. The first seven or so digits are right. The last digits are guesses. A `double` stores that number exactly, and many much larger ones.

In languages like **C#, Java and C**, you have to **choose** the type every time you create a variable. In C#, it looks like this. You do not need to type or run it. It is here so the words are familiar when you see them later:

```text
int passengers = 15;
float weight = 1.25f;
double distance = 42.195;
decimal price = 19.99m;
```

(The `f` and `m` at the end tell C# which kind of box you mean.)

### JavaScript makes it simple: one `number` type

JavaScript does not make you choose. It has **one** type for all numbers, called `number`. Every JavaScript number, whether it is `15` or `19.99`, is stored as a **64-bit double**.

That has two consequences:

1. **Whole numbers are exact** up to a very big limit: 9,007,199,254,740,991 (about nine thousand million million). JavaScript keeps that limit in `Number.MAX_SAFE_INTEGER`. You will almost never get near it with everyday values.
2. **Decimals are doubles**, so they carry the double's tiny rounding errors. Those errors are what the next section is about.

As a curiosity, you can see the limit of the boxes yourself. This number is just above the safe limit, and it does not fit exactly:

```js
console.log(Number.MAX_SAFE_INTEGER);
console.log(9007199254740993);
```

Output:

```text
9007199254740991
9007199254740992
```

You typed a number ending in `3`, and JavaScript printed one ending in `2`. The boxes ran out of room for that last digit. You do not need to remember this. It is proof that numbers inside a computer have limits, just like the kilometre counter.

## Why 0.1 + 0.2 is weird

Type this into a file and run it. Most programmers remember the first time they saw it:

```js
console.log(0.1 + 0.2);
```

Output:

```text
0.30000000000000004
```

That is not a JavaScript bug, and your computer is not broken. Python, Java, C# (with `double`) and almost every other language give the same answer. Here is why.

### First, a problem you already know: 1/3

Try to write one third as a decimal. You get 0.3333333… and the 3s go on forever. Now imagine you only have space for **six** digits after the decimal point:

```text
1/3  ≈  0.333333
```

Add three of those together:

```text
0.333333 + 0.333333 + 0.333333 = 0.999999
```

Three thirds should be exactly 1. You got 0.999999, because each third was rounded before you added them. Nobody made a mistake. Our decimal system **cannot write 1/3 exactly** in a limited number of digits.

### Computers have the same problem, with different numbers

Computers do not count in tens. They count in **binary** (twos). In binary, some numbers that look simple to us go on forever, the same way 1/3 does in decimal. **One tenth (0.1) is one of them.** In binary it is `0.000110011001100110011…` repeating forever.

So when you type `0.1`, the computer stores the **closest value that fits in 64 bits**. That value is very, very slightly more than 0.1:

```text
0.1000000000000000055511151231257827021181583404541015625
```

`0.2` is also stored slightly too big. Add two slightly-too-big numbers together, and the error becomes just large enough to show up in the 17th digit: `0.30000000000000004`.

::: analogy A ruler marked in halves
Imagine a ruler where the markings come only from halving: there is a mark at 1/2, then 1/4, 1/8, 1/16, 1/32, and so on. That is how binary fractions work.

- Measuring 0.5, 0.25 or 0.375 (which is 3/8)? There is a mark exactly there. Perfect.
- Measuring 0.1? No matter how many times you halve, **no mark lands exactly on 0.1**. You pick the nearest mark and write that down.

A `float` is this ruler with a few million marks. A `double` has billions upon billions of marks, so it gets far closer. But neither has a mark at exactly 0.1. A `decimal` type is a different ruler altogether, marked in exact tenths and hundredths, which is why it exists for money.
:::

You can see this with other sums too:

```js
console.log(0.1 * 3);
console.log(1.1 + 2.2);
console.log(0.5 + 0.25);
```

Output:

```text
0.30000000000000004
3.3000000000000003
0.75
```

The last one is perfect, because 0.5 and 0.25 are halves and quarters: they sit exactly on the ruler's marks.

::: try See it for yourself
1. In `coding-practice`, create `phase-1/decimals.js`.
2. Type in:
   ```js
   console.log(0.1 + 0.2);
   console.log(0.5 + 0.25);
   console.log(12.5 + 19.99);
   console.log(9007199254740993);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-1/decimals.js
   ```
4. You should see:
   ```text
   0.30000000000000004
   0.75
   32.489999999999995
   9007199254740992
   ```
5. **Now experiment.** Try `0.1 + 0.7`, `0.25 + 0.5` and `3 * 1.1`. Before each run, guess: will it come out perfectly, or with a strange tail? (Hint: are the numbers made of halves and quarters?)
:::

## Money: the practical advice

The third line in that experiment should worry you: `12.5 + 19.99` gave `32.489999999999995`, not `32.49`. Imagine that on a till slip.

In real life, errors this tiny rarely change the final rand amount, but they can make totals look wrong, and over millions of transactions they can add up. Banks and shops care about every cent. Here are the two standard solutions.

### Solution 1: store money as whole cents

Whole numbers are **exact** in JavaScript (up to that very large limit). So do not store R12.50 as `12.5`. Store it as `1250` cents. Do all the maths with whole cents, and only divide by 100 when you show the answer:

```js
const bookPriceCents = 1250;   // R12.50
const penPriceCents = 1999;    // R19.99
const totalCents = bookPriceCents + penPriceCents;

console.log("Total in cents:", totalCents);
console.log("Total in rand:", totalCents / 100);
```

Output:

```text
Total in cents: 3249
Total in rand: 32.49
```

This is what many real payment systems do.

### Solution 2: round when you display

For everyday programs, like the ones in this course, it is usually fine to calculate with decimals and **round only when showing the result**. JavaScript gives every number a built-in ability called `toFixed`. `toFixed(2)` means "give me this number written with exactly 2 digits after the decimal point":

```js
const total = 12.5 + 19.99;
console.log(total);
console.log(total.toFixed(2));
console.log("Total: R" + total.toFixed(2));
```

Output:

```text
32.489999999999995
32.49
Total: R32.49
```

The dot in `total.toFixed(2)` means "ask this number to do something": here, "write yourself with 2 decimal places". You will see the dot a lot. [Strings](#/phase-01-storing-information/05-strings) uses it too, and [Phase 6](#/phase-06-objects/01-what-is-an-object) explains it fully.

`toFixed` also adds zeros when needed, which is exactly what you want for money:

```js
const price = 7;
console.log("Price: R" + price.toFixed(2));
```

Output:

```text
Price: R7.00
```

::: warn toFixed gives you text, not a number
The result of `toFixed` is a **string**: text, ready for showing. That is why `"Total: R" + total.toFixed(2)` joins neatly. But it also means you should not do more maths with the result. Calculate first, and call `toFixed` last, at the moment you print. [Converting between types](#/phase-01-storing-information/07-converting-between-types) shows exactly what goes wrong if you do not.
:::

::: note What other languages do
In C#, you would store money in a `decimal`, which is marked in exact tenths and hundredths, so `0.1 + 0.2` gives exactly `0.3`. Java has something similar called `BigDecimal`. JavaScript has no built-in `decimal`, which is why the "whole cents" trick is so common in JavaScript programs that handle real money.
:::

## All the number operators

You already know `+ - * /` from [lesson 1](#/phase-01-storing-information/01-values-and-output). Here are two more.

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Add | `7 + 2` | `9` |
| `-` | Subtract | `7 - 2` | `5` |
| `*` | Multiply | `7 * 2` | `14` |
| `/` | Divide | `7 / 2` | `3.5` |
| `%` | Remainder | `7 % 2` | `1` |
| `**` | Power (exponent) | `7 ** 2` | `49` |

### `**`: to the power of

`2 ** 3` means 2 × 2 × 2, which is 8. In maths, you would write 2³.

```js
console.log(2 ** 3);
console.log(10 ** 6);
```

Output:

```text
8
1000000
```

### `%`: the remainder

`%` is called the **remainder** operator (some people say "modulo" or "mod"). It is **not** percent. `17 % 5` means "divide 17 by 5, and tell me what is **left over**".

17 sweets shared among 5 children: each child gets 3 (that is 15 sweets), and **2** are left over. So `17 % 5` is `2`.

```js
console.log(17 % 5);
console.log(10 % 2);
console.log(7 % 2);
```

Output:

```text
2
0
1
```

It looks like a strange tool, but it solves real problems:

**Is a number even or odd?** Any even number divided by 2 leaves nothing over. So `number % 2` is `0` for even numbers and `1` for odd numbers. (Doing something *different* for odd and even needs `if`, which arrives in [Phase 2](#/phase-02-making-decisions/02-if-and-else).)

**Minutes into hours and minutes.** A movie is 135 minutes long. How many whole hours, and how many minutes left over?

```js
const movieMinutes = 135;
const hours = Math.floor(movieMinutes / 60);
const minutes = movieMinutes % 60;
console.log("The movie is", hours, "hours and", minutes, "minutes");
```

Output:

```text
The movie is 2 hours and 15 minutes
```

`Math.floor` chops off the decimal part (135 / 60 is 2.25, and floor gives `2`). You will meet it properly in a moment. The `%` gives the 15 minutes left over after taking out the whole hours.

The same idea turns seconds into minutes, days into weeks, or cents into rand and cents.

## Which operator goes first? (Precedence)

When there are several operators in one expression, JavaScript follows the same order you learned at school as **BODMAS** (or PEMDAS): brackets first, then powers, then multiply and divide, then add and subtract. The technical name for this order is **operator precedence**.

| Order | Operators |
|---|---|
| 1 (first) | `( )` brackets |
| 2 | `**` powers |
| 3 | `*` `/` `%` |
| 4 (last) | `+` `-` |

When two operators have the same level, like `-` and `-`, JavaScript goes **left to right**.

```js
console.log(2 + 3 * 4 ** 2);
console.log(20 - 10 - 5);
console.log((20 + 10) / 5 * 2);
```

Output:

```text
50
5
12
```

Working through the first one: `4 ** 2` is `16` first, then `3 * 16` is `48`, then `2 + 48` is `50`.

Professionals do not memorise every rule either. They **add brackets** whenever the order is not obvious, even when the brackets are not strictly needed. `(price * quantity) + deliveryFee` is easier to read than `price * quantity + deliveryFee`, even though both give the same answer.

::: predict Brackets or no brackets?
```js
const mark1 = 60;
const mark2 = 80;
console.log(mark1 + mark2 / 2);
console.log((mark1 + mark2) / 2);
```
Which line gives the average of the two marks? What does each line print?
:::

::: solution
```text
100
70
```
The first line divides only `mark2` by 2 (giving `40`) and then adds `60`, so it prints `100`. That is a classic bug: "the average of 60 and 80 is 100?" The second line adds first, because of the brackets, and then divides, giving the real average, `70`.
:::

## Shortcuts for changing a variable

In the [Variables](#/phase-01-storing-information/02-variables) lesson you wrote lines like `savings = savings + 200`. That pattern is so common that JavaScript has shorter ways to write it:

| Shortcut | Means the same as | Read it as |
|---|---|---|
| `x += 5` | `x = x + 5` | "add 5 to x" |
| `x -= 5` | `x = x - 5` | "take 5 from x" |
| `x *= 2` | `x = x * 2` | "double x" |
| `x /= 2` | `x = x / 2` | "halve x" |
| `x++` | `x = x + 1` | "add one to x" |
| `x--` | `x = x - 1` | "take one from x" |

```js
let airtime = 50;
airtime -= 12;     // made a call
console.log(airtime);
airtime += 29;     // bought a bundle
console.log(airtime);

let visitors = 0;
visitors++;
visitors++;
visitors++;
console.log("Visitors:", visitors);
```

Output:

```text
38
67
Visitors: 3
```

Because these all **change** the variable, they only work on `let` variables. Using `++` on a `const` gives the `TypeError` you met in the last lesson.

The long and short forms do exactly the same thing. Use whichever you find easier to read. You will see `++` constantly in [Phase 3](#/phase-03-loops/03-for-loops), in every counting loop.

::: try Shortcuts in action
1. Create `phase-1/shortcuts.js` and type:
   ```js
   let steps = 0;
   steps += 2500;   // walk to the taxi rank
   steps += 1200;   // walk around the shops
   steps += 2500;   // walk home
   console.log("Steps today:", steps);

   let lives = 3;
   lives--;
   console.log("Lives left:", lives);
   ```
2. Run it with `node phase-1/shortcuts.js`. You should see:
   ```text
   Steps today: 6200
   Lives left: 2
   ```
3. **Now experiment.** Add a line `steps *= 2;` before the first `console.log`. Predict the new number of steps, then run it.
:::

## The Math toolbox

JavaScript comes with a built-in toolbox called `Math` (with a capital M), full of useful number tools. You use them by writing `Math.` and the tool's name, then the number in brackets. Here are the ones you will use most.

### Rounding: `Math.round`, `Math.floor`, `Math.ceil`

| Tool | What it does | `Math.____(4.5)` | `Math.____(4.2)` |
|---|---|---|---|
| `Math.round` | Rounds to the **nearest** whole number (.5 goes up) | `5` | `4` |
| `Math.floor` | Always rounds **down** (think: to the floor) | `4` | `4` |
| `Math.ceil` | Always rounds **up** (think: to the ceiling) | `5` | `5` |

Each one fits different real problems:

```js
// How many R25 airtime vouchers can I buy with R90?
console.log("Vouchers:", Math.floor(90 / 25));

// 40 people need transport. Each taxi seats 15. How many taxis?
console.log("Taxis needed:", Math.ceil(40 / 15));

// A test average of 67.5% goes on the report as a whole number
console.log("Report mark:", Math.round(67.5));
```

Output:

```text
Vouchers: 3
Taxis needed: 3
Report mark: 68
```

Think about why each one is right. You cannot buy 3.6 vouchers, and the 0.6 of a voucher you cannot afford does not count, so round **down**. You cannot leave 10 people behind because 40 / 15 is 2.67, so round **up**. For a mark, the fair thing is the **nearest** whole number.

### `Math.max` and `Math.min`

These give you the biggest or smallest of the numbers you give them, separated by commas:

```js
console.log(Math.max(12, 45, 7));
console.log(Math.min(12, 45, 7));
```

Output:

```text
45
7
```

### `Math.random`: rolling dice

`Math.random()` gives you a random decimal number from 0 up to (but never quite reaching) 1, such as `0.24919099744162065`. Every time you run the program, you get a different one. Note the empty brackets: it needs no input.

On its own, that is not very useful. But you can turn it into a dice roll in four steps:

```js
const roll = Math.floor(Math.random() * 6) + 1;
console.log("You rolled:", roll);
```

Output (yours will be different, because it is random):

```text
You rolled: 4
```

Working from the inside out:

1. `Math.random()` gives a number from 0 up to just under 1, say `0.72`.
2. `* 6` stretches it to a number from 0 up to just under 6: `4.32`.
3. `Math.floor(...)` chops off the decimal part, leaving a whole number from 0 to 5: `4`.
4. `+ 1` shifts that to 1 to 6: `5`.

Change the `6` to `20`, and you have a 20-sided dice. Games, quizzes that shuffle questions, and "pick a random winner" competitions all use this pattern.

::: try Roll the dice
1. Create `phase-1/dice.js` with the two dice lines above.
2. Run it five times with `node phase-1/dice.js`. (Press the **up arrow** in the terminal to repeat the last command.)
3. You should see a different number from 1 to 6 most times, for example:
   ```text
   You rolled: 2
   ```
4. **Now experiment.** Add a second dice, and print the total of both. What is the smallest total you could ever see? The largest?
:::

## Dividing by zero

In maths, dividing by zero has no answer. Many programming languages crash when you try. JavaScript does not crash. It gives you a special number instead:

```js
console.log(10 / 0);
console.log(-10 / 0);
console.log(0 / 0);
```

Output:

```text
Infinity
-Infinity
NaN
```

`Infinity` is JavaScript's way of saying "bigger than any number". `NaN` stands for **Not a Number**: the result of a calculation that has no sensible answer. You will meet `NaN` properly in [Converting between types](#/phase-01-storing-information/07-converting-between-types), because it turns up whenever a program tries to do maths with something that is not a number.

This matters in real programs. If you work out "average spend per day" and the number of days is `0`, you will print `Infinity` or `NaN` to the user. In [Phase 2](#/phase-02-making-decisions/02-if-and-else) you will learn to check for zero first.

::: exercise Level 1 — Guided · A VAT calculator
In South Africa, VAT (value-added tax) is 15%. Shops often show a price **without** VAT, and you need the price **with** it.

Create `phase-1/vat.js`.

1. Create a constant `VAT_RATE` with the value `0.15` (15% written as a decimal).
2. Create a constant `priceBeforeVat` with the value `1149.99` (a pair of running shoes).
3. Create a constant `vat` that is `priceBeforeVat * VAT_RATE`.
4. Create a constant `priceWithVat` that is `priceBeforeVat + vat`.
5. Print all three amounts with labels, using `"Label: R" + amount.toFixed(2)` for each.
6. Run it. The total should be `R1322.49`.
7. Remove `.toFixed(2)` from the VAT line, and run it again. What do you see? Put it back.
:::

::: solution
```js
const VAT_RATE = 0.15;
const priceBeforeVat = 1149.99;
const vat = priceBeforeVat * VAT_RATE;
const priceWithVat = priceBeforeVat + vat;

console.log("Price before VAT: R" + priceBeforeVat.toFixed(2));
console.log("VAT: R" + vat.toFixed(2));
console.log("Price with VAT: R" + priceWithVat.toFixed(2));
```
Output:
```text
Price before VAT: R1149.99
VAT: R172.50
Price with VAT: R1322.49
```
Without `toFixed(2)`, the VAT line shows `VAT: R172.4985`. That is the true result of the sum, but nobody can pay half a cent, and a till slip must show whole cents.
:::

::: exercise Level 2 — On your own · Splitting the restaurant bill
Chipo, David, Fatima and Sizwe go out for supper. The bill is R870, and they want to add a 10% tip. Write `phase-1/bill.js` that prints:

- the bill,
- the tip,
- the total with the tip,
- how much each person pays.

All amounts must be shown with exactly two decimal places. Use constants for the bill, the tip rate and the number of people, so that you could change any of them in one place.
:::

::: hint
10% is `0.1` as a decimal. Work out the tip, then the total, then divide the total by the number of people. Call `toFixed(2)` only when printing.
:::

::: solution
```js
const bill = 870;
const TIP_RATE = 0.1;
const numberOfPeople = 4;

const tip = bill * TIP_RATE;
const totalWithTip = bill + tip;
const eachPays = totalWithTip / numberOfPeople;

console.log("Bill: R" + bill.toFixed(2));
console.log("Tip: R" + tip.toFixed(2));
console.log("Total: R" + totalWithTip.toFixed(2));
console.log("Each person pays: R" + eachPays.toFixed(2));
```
Output:
```text
Bill: R870.00
Tip: R87.00
Total: R957.00
Each person pays: R239.25
```
Try printing `eachPays` without `toFixed`. You will see `239.25000000000003`: the decimal fuzziness from this lesson, turning up in a real calculation. `toFixed(2)` hides it neatly.
:::

::: debug The average that is too big
Naledi wrote this to find the average of her three test marks, and to show how many whole weeks are left in the 45 days until exams. The average should be `71` and the weeks line should say `6 weeks and 3 days`. Both lines are wrong. Find and fix the bugs.

```js
const test1 = 65;
const test2 = 72;
const test3 = 76;
const average = test1 + test2 + test3 / 3;
console.log("Average:", average);

const daysLeft = 45;
console.log(daysLeft / 7, "weeks and", daysLeft / 7, "days");
```
:::

::: solution
The program prints `Average: 162.33333333333334` and `6.428571428571429 weeks and 6.428571428571429 days`.

**Bug 1:** precedence. Only `test3` is divided by 3. Add brackets so the marks are added first: `(test1 + test2 + test3) / 3`.

**Bug 2:** the whole weeks need rounding down, and the days left over need the remainder operator.

```js
const test1 = 65;
const test2 = 72;
const test3 = 76;
const average = (test1 + test2 + test3) / 3;
console.log("Average:", average);

const daysLeft = 45;
console.log(Math.floor(daysLeft / 7), "weeks and", daysLeft % 7, "days");
```
Output:
```text
Average: 71
6 weeks and 3 days
```
:::

::: mistake
**Thinking `%` means percent.** `%` is the remainder. For 15%, multiply by `0.15`.

**Being alarmed by `0.30000000000000004`.** It is normal for decimal numbers in every language. Round when you display, or work in whole cents.

**Calling `toFixed` too early.** `toFixed` returns text. Do all the maths first, then call it once, when printing.

**Forgetting brackets.** `a + b / 2` is not an average. When in doubt, add brackets.

**Writing `math.round`.** It is `Math` with a capital M. Lower case gives `ReferenceError: math is not defined`.

**Forgetting the brackets on `Math.random`.** It is `Math.random()`, with empty brackets, because you are asking it to *do* something.

**Using `++` or `+=` on a `const`.** They change the variable, so it must be a `let`.
:::

## Real-world uses

- **Shops and tills:** VAT, discounts ("20% off"), and totals, always shown with `toFixed(2)` or calculated in cents.
- **Banking apps:** balances stored as whole cents so that no rounding error ever loses anyone a cent.
- **Clocks and timers:** `%` and `Math.floor` turn 3725 seconds into "1 hour, 2 minutes, 5 seconds".
- **Games:** `Math.random` for dice, card shuffles and enemy movements; `++` and `--` for scores and lives.
- **Logistics:** `Math.ceil` for "how many boxes / buses / trips do we need?"
- **Science and engineering:** doubles everywhere, because 15 to 17 significant digits is more than enough for nearly any measurement.

::: connect
**This builds on:** [values and output](#/phase-01-storing-information/01-values-and-output), where you first used `+ - * /`, and [variables](#/phase-01-storing-information/02-variables), where you first changed a value with `x = x + 1`.

**This unlocks:** every calculation in the rest of the course. Next, [Strings](#/phase-01-storing-information/05-strings) does for text what this lesson did for numbers, and gives you a much nicer way to build lines like `"Total: R" + total.toFixed(2)`. `%` and `Math.random` both come back once you have decisions and loops, for things like "do this every second time" and games that roll dice until someone wins.
:::

::: challenge How long was that?
A runner finished the Comrades Marathon in 38,947 seconds. Write `phase-1/race-time.js` that turns that into hours, minutes and seconds, and prints:

```text
Finished in 10 hours, 49 minutes and 7 seconds
```

Use only `Math.floor`, `/` and `%`. Test it with a second time, `3725` seconds, which should give 1 hour, 2 minutes and 5 seconds.
:::

::: hint
There are 3600 seconds in an hour. Take out the whole hours first. What is left over after the hours (a remainder) is what you split into minutes and seconds.
:::

::: solution
```js
const totalSeconds = 38947;

const hours = Math.floor(totalSeconds / 3600);
const secondsAfterHours = totalSeconds % 3600;
const minutes = Math.floor(secondsAfterHours / 60);
const seconds = secondsAfterHours % 60;

console.log("Finished in", hours, "hours,", minutes, "minutes and", seconds, "seconds");
```
Output:
```text
Finished in 10 hours, 49 minutes and 7 seconds
```
With `3725`, it prints `Finished in 1 hours, 2 minutes and 5 seconds`. Saying "1 hour" instead of "1 hours" needs a decision, which is what [Phase 2](#/phase-02-making-decisions/02-if-and-else) is for.
:::

::: recap
- **Integers** are whole numbers for counting. **Decimal numbers** have a fractional part and are used for measuring.
- Computers store numbers in a **fixed number of bits**, so there are always limits on size and precision.
- A **float** (32-bit) keeps about 7 significant digits, a **double** (64-bit) about 15 to 17, and a **decimal** stores exact base-10 digits for money. C#, Java and C make you choose. JavaScript has one `number` type, which is always a 64-bit double.
- `0.1 + 0.2` is `0.30000000000000004` because 0.1 cannot be written exactly in binary, just as 1/3 cannot be written exactly in decimal.
- For money, calculate in whole cents, or round for display with `toFixed(2)`, which returns a string.
- Operators: `+ - * / % **`. `%` is the remainder. Precedence follows BODMAS; brackets make it clear.
- Shortcuts: `+= -= *= /= ++ --` (for `let` variables only).
- `Math.round`, `Math.floor`, `Math.ceil`, `Math.max`, `Math.min`, and `Math.floor(Math.random() * 6) + 1` for a dice roll. Dividing by zero gives `Infinity`.
:::

::: interview Why does 0.1 + 0.2 not equal exactly 0.3 in JavaScript?
JavaScript stores numbers as 64-bit binary "doubles". In binary, 0.1 and 0.2 are endlessly repeating fractions (like 1/3 in decimal), so each is stored as the nearest value that fits, which is very slightly off. Adding them makes the tiny errors visible: `0.30000000000000004`. It happens in almost every language, not only JavaScript.
:::

::: interview What is the difference between a float, a double and a decimal?
They are types of decimal number in languages such as C#. A float uses 32 bits and keeps about 7 significant digits. A double uses 64 bits and keeps about 15 to 17. A decimal stores digits in base 10, so values like 0.1 are exact, which makes it the right choice for money. JavaScript only has one number type, which is a double.
:::

::: interview How would you safely handle money amounts in JavaScript?
Either store amounts as whole numbers of cents (R12.50 as `1250`), which are exact, and divide by 100 only for display, or calculate normally and round with `toFixed(2)` whenever you show an amount.
:::

::: interview What does `17 % 5` give, and name a real use for `%`.
`2`, the remainder after dividing 17 by 5. Uses include checking whether a number is even (`n % 2` is `0`), turning minutes into hours and minutes (`minutes % 60`), and doing something every *n*th time.
:::

::: checkpoint
- [ ] I ran `0.1 + 0.2` myself and can explain the result using the 1/3 example
- [ ] I can say in my own words what float, double and decimal are, and which one JavaScript uses
- [ ] I used `%` and `Math.floor` to turn minutes into hours and minutes
- [ ] I rolled a dice with `Math.random` and ran it several times
- [ ] I built the VAT calculator and got `R1322.49`
- [ ] I split the restaurant bill with every amount shown to two decimal places
- [ ] I fixed both bugs in Naledi's program
:::

::: resources
- **javascript.info, "Numbers":** https://javascript.info/number. Covers rounding, `toFixed` and "imprecise calculations" in more depth.
- **javascript.info, "Basic operators, maths":** https://javascript.info/operators. Remainder, exponent, and the shortcut operators.
- **MDN, "Basic math in JavaScript":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math. A beginner guide to numbers and operators.
- **The Floating-Point Guide:** https://floating-point-gui.de/. A short, friendly site that answers "why don't my numbers add up?" for every language.
:::
