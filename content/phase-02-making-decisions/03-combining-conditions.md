---
title: and, or, not — combining conditions
summary: Real decisions often depend on more than one thing. Here is how to ask two questions at once.
minutes: 45
stage: Phase 2
---

## What you will learn

- How to require **both** of two things with `&&` (and)
- How to accept **either** of two things with `||` (or)
- How to flip a yes into a no with `!` (not)
- How to check whether a number is inside a range, the mistake almost everyone makes when they first try, and how brackets make mixed conditions clear

**Before this:** [if and else](#/phase-02-making-decisions/02-if-and-else). You should be comfortable writing `if`, `else if` and `else` with a comparison as the condition.

## The problem: one question is often not enough

Think about renting a car. The rental company's rule is not "you must be 21". It is "you must be 21 **and** have a driver's licence". Two things, both needed.

Or think about when a shop is closed: "on Sunday **or** on a public holiday". Two things, either one is enough.

With only `if`, you can do this, but it gets awkward fast. Here is the car rental rule using an `if` inside another `if`:

```js
const age = 25;
const hasLicence = true;

if (age >= 21) {
  if (hasLicence) {
    console.log("You can rent a car.");
  } else {
    console.log("Sorry, you cannot rent a car.");
  }
} else {
  console.log("Sorry, you cannot rent a car.");
}
```

Output:

```text
You can rent a car.
```

It works, but the "Sorry" message is written twice, and the real rule ("21 and licensed") is hard to see. Add a third requirement and you are three blocks deep. There is a better way: combine the questions into **one** condition.

::: analogy Keys, doors and switches
- **and (`&&`)** is a door with **two locks**. You need both keys to open it. One key is not enough.
- **or (`||`)** is a building with **two entrances**. You can get in through either one. If both are open, that is fine too.
- **not (`!`)** is a **light switch**. Flick it, and on becomes off, off becomes on.

These three are called **logical operators**. They take booleans in and give a boolean out.
:::

## `&&`: and

`&&` (two ampersands, usually Shift+7) gives `true` only if **both** sides are `true`:

```js
const age = 25;
const hasLicence = true;

if (age >= 21 && hasLicence) {
  console.log("You can rent a car.");
} else {
  console.log("Sorry, you cannot rent a car.");
}
```

Output:

```text
You can rent a car.
```

The nested version above has shrunk to one clear line: `age >= 21 && hasLicence`. Read it aloud as "age is at least 21 **and** has a licence".

Here is every possible combination. A table like this is called a **truth table**:

| Left side | Right side | `left && right` | In words |
|---|---|---|---|
| `true` | `true` | `true` | Both keys: the door opens. |
| `true` | `false` | `false` | Only one key: stays locked. |
| `false` | `true` | `false` | Only one key: stays locked. |
| `false` | `false` | `false` | No keys: stays locked. |

One sentence to remember: **`&&` is `true` only when everything is `true`.**

```js
console.log(true && true);
console.log(true && false);
console.log(25 >= 21 && false);
```

Output:

```text
true
false
false
```

## `||`: or

`||` (two vertical bars; on most keyboards Shift and the backslash key) gives `true` if **at least one** side is `true`:

```js
const day = "Sunday";

if (day === "Saturday" || day === "Sunday") {
  console.log("Weekend! No alarm today.");
} else {
  console.log("Weekday. Alarm set for 6:00.");
}
```

Output:

```text
Weekend! No alarm today.
```

| Left side | Right side | `left \|\| right` | In words |
|---|---|---|---|
| `true` | `true` | `true` | Both entrances open: you get in. |
| `true` | `false` | `true` | One entrance open: you get in. |
| `false` | `true` | `true` | One entrance open: you get in. |
| `false` | `false` | `false` | Both closed: you stay out. |

The one sentence: **`||` is `false` only when everything is `false`.**

Notice that everyday English "or" sometimes means "one or the other, but not both" ("tea or coffee?"). JavaScript's `||` always includes "both". If both sides are `true`, the answer is `true`.

::: try Rent a car, have a weekend
1. Create `phase-2/combine.js`:
   ```js
   const prompt = require("prompt-sync")();

   const age = Number(prompt("Your age: "));
   const licenceAnswer = prompt("Do you have a licence? (yes/no) ").trim().toLowerCase();
   const hasLicence = licenceAnswer === "yes";

   if (age >= 21 && hasLicence) {
     console.log("You can rent a car.");
   } else {
     console.log("Sorry, you cannot rent a car.");
   }

   const day = prompt("What day is it? ").trim().toLowerCase();

   if (day === "saturday" || day === "sunday") {
     console.log("Enjoy the weekend!");
   } else {
     console.log("Have a good working day.");
   }
   ```
2. Run it with `node phase-2/combine.js`. Answer `30`, `yes`, `Sunday`. You should see:
   ```text
   Your age: 30
   Do you have a licence? (yes/no) yes
   You can rent a car.
   What day is it? Sunday
   Enjoy the weekend!
   ```
3. Run it three more times, covering the other rows of the `&&` truth table: `30` and `no`, `19` and `yes`, `19` and `no`. Predict each answer first.
4. **Now experiment.** Change `&&` to `||` in the car check. Run it with `19` and `yes`. Who can rent a car now? Why is that a terrible rule for a rental company? Change it back.
:::

Look at the line `const hasLicence = licenceAnswer === "yes";`. It turns the user's typed answer into a boolean, which makes the `if` read like the real rule. That is a trick from [Comparing values](#/phase-02-making-decisions/01-comparing-values), and it is worth using often.

::: quiz
A taxi association gives a free ride to learners under 18 and to pensioners aged 60 or more. Which condition is `true` for exactly those people?

- [ ] `age < 18 && age >= 60`
- [ ] `age <= 18 || age > 60`
- [x] `age < 18 || age >= 60`
- [ ] `age > 18 || age <= 60`

A person only needs to be in one of the two groups, so the two sides are joined with `||`. The English sentence says "and", which is the trap: `age < 18 && age >= 60` asks for someone who is under 18 and 60 or older at the same time. Nobody is, so it is always `false`. `age <= 18 || age > 60` is close, but it wrongly lets in an 18-year-old and leaves out someone who is exactly 60.
:::

## `!`: not

`!` goes in **front** of a single value and flips it: `true` becomes `false`, and `false` becomes `true`.

```js
const isRaining = false;

console.log(!isRaining);
console.log(!true);

if (!isRaining) {
  console.log("Leave the umbrella at home.");
}
```

Output:

```text
true
false
Leave the umbrella at home.
```

Read `!isRaining` as "not raining". It is especially handy with things that already give a boolean, like `Number.isNaN`:

```js
const amount = Number("150");

if (!Number.isNaN(amount)) {
  console.log("Got a real number:", amount);
}
```

Output:

```text
Got a real number: 150
```

`!Number.isNaN(amount)` reads as "amount is **not** not-a-number", which is a slightly twisty way of saying "amount **is** a number". Double negatives are hard on the brain, so use `!` where it makes the sentence clearer, and rewrite the condition when it does not.

::: note Where have we seen `!` before?
In `!==` ("not exactly the same"). The `!` means "not" in both places.
:::

::: quiz
What does this print?

```js
const hasTicket = false;
const isVip = true;

console.log(!hasTicket && isVip);
console.log(!isVip || hasTicket);
console.log(!!hasTicket);
```

- [ ] `false`, `true`, `false`
- [ ] `true`, `false`, `true`
- [ ] `false`, `false`, `false`
- [x] `true`, `false`, `false`

`!` flips only the value straight after it. Line 1: `!hasTicket` is `true`, and `isVip` is `true`, so `&&` gives `true`. Line 2: `!isVip` is `false`, and `hasTicket` is `false`, so `||` gives `false`. Line 3: two `!`s flip twice, which lands back where you started: `false`. If you picked `true` for the last line, you flipped once and stopped.
:::

## Range checks: is a number between two others?

A very common question is "is this value inside a range?". Is the age a teenager's age (13 to 19)? Is the mark a valid mark (0 to 100)? Is the load-shedding stage between 1 and 8?

In maths you might write 13 ≤ age ≤ 19. In JavaScript you have to ask the two halves separately and join them with `&&`:

```js
const age = 16;

if (age >= 13 && age <= 19) {
  console.log("Teen ticket: R70");
}
```

Output:

```text
Teen ticket: R70
```

"Age is at least 13 **and** age is at most 19." Both must be true, so the age must be inside the range. You have to repeat `age` on both sides. Each side of `&&` is a complete comparison on its own.

### The mistake everyone makes

It is tempting to copy the maths:

```js
const age = 25;
console.log(13 <= age <= 19);
```

Output:

```text
true
```

It says a 25-year-old is a teenager, and there is no error to warn you. Here is what JavaScript actually does. It does not read the whole thing as one question. It works from left to right, one comparison at a time:

1. `13 <= age` is `13 <= 25`, which is `true`.
2. Then it compares **that answer** with 19: `true <= 19`.
3. To compare a boolean with a number, JavaScript quietly turns `true` into `1`. And `1 <= 19` is `true`.

So `13 <= age <= 19` is `true` for almost any number. Always write range checks as two full comparisons joined with `&&`.

### Outside a range

To check the opposite, "is this value **outside** the range?", use `||`:

```js
const mark = 105;

if (mark < 0 || mark > 100) {
  console.log("That mark is impossible. Check the typing.");
}
```

Output:

```text
That mark is impossible. Check the typing.
```

"Below 0 **or** above 100." A mark can't be both, but either one on its own means something is wrong. Pay attention to the switch: **inside** a range uses `&&` with `>=` and `<=`. **Outside** a range uses `||` with `<` and `>`.

::: predict What does this print?
```js
const stage = 0;
const hasInverter = true;
const temperature = 8;

console.log(stage > 0 && hasInverter);
console.log(stage === 0 || hasInverter);
console.log(!hasInverter);
console.log(temperature >= 10 && temperature <= 25);
console.log(temperature < 10 || temperature > 25);
```
:::

::: solution
```text
false
true
false
false
true
```
1. `stage > 0` is `false`, so the `&&` is `false` straight away.
2. `stage === 0` is `true`, and one `true` is enough for `||`.
3. `hasInverter` is `true`, so `!hasInverter` is `false`.
4. 8 is not `>= 10`, so it is not inside the 10–25 range.
5. 8 is `< 10`, so it is outside the range.
:::

::: quiz
What does this print?

```js
const age = 4;

console.log(6 <= age <= 12);
console.log(age >= 6 || age <= 12);
console.log(age >= 6 && age <= 12);
```

- [x] `true`, `true`, `false`
- [ ] `false`, `false`, `false`
- [ ] `false`, `true`, `false`
- [ ] `true`, `false`, `false`

Line 1 is the maths-style trap: `6 <= 4` is `false`, then JavaScript compares `false <= 12`, turns `false` into 0, and `0 <= 12` is `true`. Line 2 uses `||`, so one true side is enough, and 4 is at most 12: `true`. That is the other trap, because with `||` every number counts as "in range". Only line 3, two full comparisons joined with `&&`, correctly says that a 4-year-old is not between 6 and 12. If you picked `false` for line 1, you read it the way a person would, not the way JavaScript does.
:::

## Checking input properly, in one line

In the last lesson, validating an amount took an `else if` chain. Now you can say "it is bad if it is not a number **or** it is negative" in one condition:

```js
const prompt = require("prompt-sync")();

const rent = Number(prompt("Rent: R"));

if (Number.isNaN(rent) || rent < 0) {
  console.log("That is not a valid amount.");
} else {
  console.log(`Rent recorded: R${rent.toFixed(2)}`);
}
```

Sample sessions:

```text
Rent: Rabc
That is not a valid amount.
```

```text
Rent: R-500
That is not a valid amount.
```

```text
Rent: R4500
Rent recorded: R4500.00
```

You will use exactly this condition in [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2).

::: note JavaScript stops as soon as it knows
With `||`, if the left side is `true`, the answer must be `true`, so JavaScript does not even look at the right side. With `&&`, if the left side is `false`, the answer must be `false`, so again it stops early. This is called **short-circuiting**. For now it mostly means one thing: put the check that must happen first (such as "is it a number at all?") on the **left**.
:::

::: quiz
Which answer, typed at the question, makes this print `Booked`?

```js
const prompt = require("prompt-sync")();
const seats = Number(prompt("How many seats (1 to 10)? "));

if (Number.isNaN(seats) || seats < 1 || seats > 10) {
  console.log("Rejected");
} else {
  console.log("Booked");
}
```

- [ ] `ten`
- [x] `10`
- [ ] `0`
- [ ] `10.5`

`10` is a number, it is not below 1, and it is not above 10, so all three "bad" questions are `false`. Three `false`s joined with `||` give `false`, so the `else` runs. `ten` becomes `NaN`, `0` is below 1 and `10.5` is above 10, so each of those makes one side `true`, and one `true` is enough for `||`. If you rejected 10, check the boundary: the rule says `> 10`, not `>= 10`.
:::

## Brackets make your meaning clear

You can combine more than two conditions. Here is a shop's free-delivery rule: "Free delivery if you spend R500 or more **or** you are a loyalty member, **but** never to remote areas."

```js
const total = 200;
const isMember = false;
const isRemote = true;

const freeWithBrackets = (total >= 500 || isMember) && !isRemote;
const freeWithout = total >= 500 || isMember && !isRemote;

console.log(freeWithBrackets);
console.log(freeWithout);
```

Output:

```text
false
false
```

Both say `false` here. Now change the numbers so the customer spent R600, but lives in a remote area:

```js
const total = 600;
const isMember = false;
const isRemote = true;

const freeWithBrackets = (total >= 500 || isMember) && !isRemote;
const freeWithout = total >= 500 || isMember && !isRemote;

console.log(freeWithBrackets);
console.log(freeWithout);
```

Output:

```text
false
true
```

The version without brackets gives free delivery to a remote area, which breaks the rule. Why? In the same way that `*` happens before `+` in maths (from [Numbers](#/phase-01-storing-information/04-numbers)), **`&&` happens before `||`**. So JavaScript reads the second line as:

```text
total >= 500 || (isMember && !isRemote)
```

That means "spent R500, **or** (a member and not remote)". Spending R600 on its own is enough, remote or not.

**The rule: whenever you mix `&&` and `||`, add brackets**, even if you know the order. Brackets cost nothing and they tell the next reader (often you) exactly what you meant.

If a condition gets long, give the pieces names first:

```js
const total = 600;
const isMember = false;
const isRemote = true;

const spentEnough = total >= 500;
const qualifies = spentEnough || isMember;
const canDeliverFree = qualifies && !isRemote;

if (canDeliverFree) {
  console.log("Free delivery!");
} else {
  console.log("Delivery: R80");
}
```

Output:

```text
Delivery: R80
```

Each line is short, has a name that explains it, and can be checked on its own.

::: exercise Level 1 — Guided · Can they vote?
In South Africa you can vote if you are 18 or older **and** you are registered. Create `phase-2/vote.js`.

1. Ask for the age and convert it with `Number()`.
2. Ask "Are you registered? (yes/no) ", tidy the answer with `.trim().toLowerCase()`, and store `const isRegistered = answer === "yes";`.
3. Write an `if` with `age >= 18 && isRegistered` that prints `You can vote. Remember your ID!`.
4. Add an `else if` using `age >= 18 && !isRegistered` that prints `You are old enough, but you need to register first.`
5. Add an `else` that prints `You can vote when you turn 18.`
6. Test with `20`/`yes`, `20`/`no` and `16`/`no`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const age = Number(prompt("Your age: "));
const answer = prompt("Are you registered? (yes/no) ").trim().toLowerCase();
const isRegistered = answer === "yes";

if (age >= 18 && isRegistered) {
  console.log("You can vote. Remember your ID!");
} else if (age >= 18 && !isRegistered) {
  console.log("You are old enough, but you need to register first.");
} else {
  console.log("You can vote when you turn 18.");
}
```
A sample session:
```text
Your age: 20
Are you registered? (yes/no) no
You are old enough, but you need to register first.
```
Could the second check be only `age >= 18`? Yes. Because the chain stops at the first `true`, anyone reaching that line who is 18 or older must be unregistered. Writing `!isRegistered` anyway makes the rule clear to a reader, which is a fair choice.
:::

::: exercise Level 2 — On your own · Museum entry
A museum is free for children under 6 and adults 65 or older. It is also free for everyone on the first day of the month. Otherwise, it costs R120, with R40 off for students (only if they are aged 18 to 25).

Create `phase-2/museum.js`. Ask for the age, the day of the month (a number) and whether they are a student (yes/no). Print the price.
:::

::: hint
Start with the free cases in one condition: `age < 6 || age >= 65 || dayOfMonth === 1`. Then `else if` for the student discount: `isStudent && age >= 18 && age <= 25`. Then `else` for the full price. Store the price in `let price;` before the chain.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const age = Number(prompt("Age: "));
const dayOfMonth = Number(prompt("Day of the month: "));
const isStudent = prompt("Student? (yes/no) ").trim().toLowerCase() === "yes";

let price;

if (age < 6 || age >= 65 || dayOfMonth === 1) {
  price = 0;
} else if (isStudent && age >= 18 && age <= 25) {
  price = 120 - 40;
} else {
  price = 120;
}

console.log(`Entry: R${price}`);
```
Sample sessions:
```text
Age: 22
Day of the month: 14
Student? (yes/no) yes
Entry: R80
```
```text
Age: 40
Day of the month: 1
Student? (yes/no) no
Entry: R0
```
A string of `||`s or a string of `&&`s needs no brackets: `a || b || c` is "any of these", and `a && b && c` is "all of these". Brackets matter when you **mix** the two.
:::

::: debug Everyone is a teenager, every day is a weekend
Both programs run without errors, but give wrong answers. Run them, then fix them.

```js
// Program A: should print false for 30
const age = 30;
console.log("Teenager?", 13 <= age <= 19);
```

```js
// Program B: should say "Weekday" for Tuesday
const day = "Tuesday";

if (day === "Saturday" || "Sunday") {
  console.log("Weekend");
} else {
  console.log("Weekday");
}
```
:::

::: solution
**A** prints `Teenager? true`. `13 <= age` is `true`, and `true <= 19` counts `true` as `1`, so the answer is `true`. Write both halves in full: `age >= 13 && age <= 19`. That prints `Teenager? false`.

**B** prints `Weekend`. The right side of `||` is only the text `"Sunday"`, not a question. JavaScript treats a non-empty piece of text as a "yes" (you will learn exactly why in the next lesson, [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy)), so the whole condition is always a yes. Each side of `||` must be a complete comparison:

```js
const day = "Tuesday";

if (day === "Saturday" || day === "Sunday") {
  console.log("Weekend");
} else {
  console.log("Weekday");
}
```
Output:
```text
Weekday
```
:::

::: mistake
**Writing `13 <= age <= 19`.** It runs, but is almost always `true`. Write `age >= 13 && age <= 19`.

**Writing `day === "Saturday" || "Sunday"`.** Each side of `||` and `&&` must be a full question: `day === "Saturday" || day === "Sunday"`.

**Mixing up `&&` and `||`.** Say the rule in plain English first. "Both needed" is `&&`. "Either is fine" is `||`. For ranges: inside is `&&`, outside is `||`.

**Mixing `&&` and `||` without brackets.** `&&` goes first, which may not be what you meant. Add brackets every time you mix them.

**Typing one `&` or one `|`.** Single `&` and `|` are different operators for working with the bits inside numbers. They will not give an error, but they will give strange results. Always type two.

**Stacking up `!`s.** `!(!isOpen)` is a headache. If a condition needs a lot of "not", rewrite it the positive way, or give the pieces clear names.
:::

::: quiz
What does this print?

```js
const isMember = true;
const total = 100;
const isRemote = true;

console.log(isMember || total >= 500 && !isRemote);
console.log((isMember || total >= 500) && !isRemote);
```

- [ ] `false`, then `false`
- [x] `true`, then `false`
- [ ] `true`, then `true`
- [ ] `false`, then `true`

`&&` happens before `||`, so line 1 is read as `isMember || (total >= 500 && !isRemote)`. `isMember` is `true`, and one `true` side is enough for `||`, so it prints `true`. In line 2 the brackets force the `||` first, which gives `true`. Then `true && !isRemote` is `true && false`, which is `false`. If you picked `false` for both, you read line 1 as if it had the brackets of line 2.
:::

## Real-world uses

- **Sign-up forms:** the "Create account" button works only if the email contains `@` **and** the password is at least 8 characters **and** the terms box is ticked.
- **Online shops:** free delivery if the total is at least R500 **or** you are a member.
- **Banking apps:** a payment is blocked if the amount is more than the balance **or** the card is frozen.
- **Games:** the level is complete when the score is at least 1,000 **and** the timer has not run out.
- **Access control:** a page is shown if the user is logged in **and not** banned.
- **Input checks:** an amount is rejected if it is not a number **or** it is negative, as in Budget Buddy.

::: connect
**This builds on:** [comparing values](#/phase-02-making-decisions/01-comparing-values) (each side of `&&` and `||` is usually a comparison) and [if and else](#/phase-02-making-decisions/02-if-and-else) (combined conditions go inside `if`).

**This unlocks:** in [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy) you will find out why `"Sunday"` on its own counted as a "yes", and learn a handy use of `||` for default values. In Phase 3, combined conditions decide when loops stop, for example "keep asking **while** the input is not a number **or** is negative".
:::

::: challenge Leap years in one line
In the last lesson's challenge you worked out leap years with an `else if` chain. The rule was: divisible by 4, except years divisible by 100, except years divisible by 400.

Rewrite it as **one** condition stored in `const isLeap`, using `&&`, `||`, `!==` or `!` and brackets. Test it with 2024 (leap), 2023 (not), 1900 (not) and 2000 (leap).
:::

::: hint
Say it as: "(divisible by 4 **and not** divisible by 100) **or** divisible by 400". "Not divisible by 100" is `year % 100 !== 0`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const year = Number(prompt("Which year? "));
const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

if (isLeap) {
  console.log(`${year} is a leap year.`);
} else {
  console.log(`${year} is not a leap year.`);
}
```
Sample sessions:
```text
Which year? 1900
1900 is not a leap year.
```
```text
Which year? 2000
2000 is a leap year.
```
Is this better than the chain? It is shorter, and it matches the way the rule is usually written. The chain is easier for some people to follow step by step. Both are correct. Choosing the one that is clearest for your reader is part of programming.
:::

::: recap
- `&&` (and) is `true` only when **both** sides are `true`. Use it for "all of these are needed".
- `||` (or) is `true` when **at least one** side is `true`. Use it for "any of these is enough".
- `!` (not) flips `true` to `false` and back: `!isRaining`.
- Inside a range: `x >= low && x <= high`. Outside a range: `x < low || x > high`.
- Never write `low <= x <= high`. It runs, but gives wrong answers.
- Each side of `&&` and `||` must be a complete question: `day === "Saturday" || day === "Sunday"`.
- `&&` happens before `||`. Add brackets whenever you mix them.
- Long conditions are easier to read when the pieces have names: `const spentEnough = total >= 500;`.
:::

::: interview Explain `&&` and `||` without using code.
`&&` means "and": the whole thing is true only if every part is true, like a door with two locks. `||` means "or": the whole thing is true if at least one part is true, like a building with two entrances.
:::

::: interview Why does `13 <= age <= 19` not check whether `age` is between 13 and 19?
JavaScript does one comparison at a time, from left to right. `13 <= age` becomes `true` or `false`, and then that boolean is compared with 19. `true` counts as 1 and `false` as 0, and both are less than 19, so the result is always `true`. Write `age >= 13 && age <= 19` instead.
:::

::: interview What does `(a || b) && c` mean, and how is it different from `a || b && c`?
`(a || b) && c` means "a or b, and also c": `c` is always required. Without brackets, `&&` goes first, so `a || b && c` means "a, or (b and c)": if `a` is true, `c` does not matter at all. Brackets make the intended rule explicit.
:::

::: checkpoint
- [ ] I ran `combine.js` and tested all four rows of the `&&` truth table
- [ ] I changed `&&` to `||` on purpose and saw why the rule broke
- [ ] I saw `13 <= age <= 19` give the wrong answer, and fixed it
- [ ] I finished the voting exercise and the museum entry program
- [ ] I fixed both programs in "Debug this"
- [ ] I can say when to use `&&` and when to use `||` for a range check
:::

::: resources
- **javascript.info, "Logical operators":** https://javascript.info/logical-operators. Covers `||`, `&&` and `!`, including some behaviour you will meet in the next lesson.
- **MDN, "Making decisions in your code — conditionals":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals. See the section on logical operators.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the free-delivery example and try different values.
:::
