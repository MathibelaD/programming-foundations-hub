---
title: Comparing values — asking yes-or-no questions
summary: Before a program can make a decision, it has to ask a question. Comparisons are how it asks.
minutes: 40
stage: Phase 2
---

## What you will learn

- How to ask JavaScript a yes-or-no question about two values, and get back `true` or `false`
- The six **comparison operators**: `===`, `!==`, `>`, `<`, `>=` and `<=`
- The difference between `=` (store) and `===` (ask), and why we never use `==`
- Why comparing text can give surprising answers, and how to keep a comparison's answer in a variable

**Before this:** [Project: Budget Buddy v1](#/phase-01-storing-information/09-project-budget-buddy-v1). You should be able to store values in variables and ask the user for input with `prompt`.

## The problem: every program so far does the same thing every time

Think about the programs you wrote in Phase 1. Budget Buddy asks for your income and expenses, does some maths and prints a summary. It is useful, but it is also a bit dim. If your expenses are R2,000 more than your income, it cheerfully prints a negative number and says nothing. It cannot *notice* anything.

Real life is full of small decisions, and every one of them starts with a question:

- Is the taxi fare **more than** the money in my pocket?
- Is my mark **at least** 50, so that I passed?
- Is this customer **younger than** 12, so they get the child ticket price?
- Is the password the user typed **the same as** the one we saved?
- Is it load-shedding stage **0**, so the power stays on?

Each of these questions has exactly two possible answers: yes or no. In JavaScript, yes is `true` and no is `false`. You met these values in [true, false, and nothing](#/phase-01-storing-information/06-booleans-null-undefined). They are called **booleans**.

This lesson is about how to *ask* those questions. The next lesson, [if and else](#/phase-02-making-decisions/02-if-and-else), is about *acting* on the answer. You need both, but asking comes first.

::: analogy A shop assistant with a price checker
Picture a shop assistant standing at a till with two items. You ask one question: "Is this one more expensive than that one?"

The assistant looks at both prices and says **yes** or **no**. Not "sort of", not "R12". Only yes or no.

- The two items are the two **values** being compared.
- Your question ("more expensive than?") is the **comparison operator**.
- The yes-or-no reply is the **boolean** result: `true` or `false`.

A comparison never changes the items. The assistant does not relabel anything. It looks, answers, and hands both items back exactly as they were.
:::

## Your first comparison

```js
console.log(5 > 3);
console.log(2 > 10);
```

Output:

```text
true
false
```

`5 > 3` reads as "is 5 greater than 3?". The answer is yes, so JavaScript works it out to `true`. `2 > 10` asks "is 2 greater than 10?", and the answer is no: `false`.

A comparison is an **expression**: a piece of code that works out to a value, in the same way that `2 + 3` works out to `5`. The only difference is the kind of value you get back. Arithmetic gives you a number. A comparison always gives you a boolean.

Comparisons work with variables too, which is where they become useful:

```js
const fare = 25;
const moneyInPocket = 20;

console.log(moneyInPocket >= fare);
```

Output:

```text
false
```

"Is the money in my pocket at least the fare?" No. You will be walking.

## The six comparison operators

| Operator | Question it asks | Example | Answer |
|---|---|---|---|
| `===` | Are these **exactly the same**? | `7 === 7` | `true` |
| `!==` | Are these **different**? | `7 !== 8` | `true` |
| `>` | Is the left **greater than** the right? | `10 > 4` | `true` |
| `<` | Is the left **less than** the right? | `10 < 4` | `false` |
| `>=` | Is the left **greater than or equal to** the right? | `50 >= 50` | `true` |
| `<=` | Is the left **less than or equal to** the right? | `3 <= 2` | `false` |

A trick for remembering which way `>` and `<` point: the wide, open end faces the **bigger** value. In `10 > 4` the open mouth faces the 10.

Notice there is no space inside `>=`, `<=`, `===` or `!==`. They are single symbols made of two or three characters. `> =` with a space is a syntax error.

### `>` versus `>=`: the boundary matters

Say the pass mark is 50, and Sipho got exactly 50.

```js
const mark = 50;

console.log(mark > 50);
console.log(mark >= 50);
```

Output:

```text
false
true
```

`mark > 50` means "more than 50", and 50 is not more than 50. `mark >= 50` means "50 or more", which includes 50 itself. If you pick the wrong one, Sipho fails with a pass mark. Mistakes at the edges like this are called **off-by-one errors** or **boundary bugs**, and they are among the most common bugs in real software.

A good habit: whenever you write `>` or `<`, say the rule out loud in plain words ("50 or more passes"), then test it with the value exactly *on* the boundary.

::: try Ask your first questions
1. Open your `coding-practice` folder in VS Code.
2. Create a new folder called `phase-2`. (In the terminal, from inside `coding-practice`, `mkdir phase-2` works on Windows, macOS and Linux.)
3. In `phase-2`, create a file called `compare.js`. Type this in yourself:
   ```js
   const fare = 25;
   const moneyInPocket = 30;
   const mark = 50;
   const passMark = 50;

   console.log("Can I pay the fare?", moneyInPocket >= fare);
   console.log("Did I pass?", mark >= passMark);
   console.log("Distinction?", mark >= 75);
   console.log("Exactly the pass mark?", mark === passMark);
   ```
4. Save, then run it from inside `coding-practice`:
   ```bash
   node phase-2/compare.js
   ```
5. You should see:
   ```text
   Can I pay the fare? true
   Did I pass? true
   Distinction? false
   Exactly the pass mark? true
   ```
6. **Now experiment.** Change `moneyInPocket` to `25`. Will "Can I pay the fare?" still be `true`? Say your answer out loud, then run it. Then try `24`.
:::

## `=` stores, `===` asks

This is the single most important idea in this lesson, and it trips up everyone at first.

In [Variables](#/phase-01-storing-information/02-variables) you learned to read `=` as "gets". It is an **action**: put the value on the right into the box on the left.

`===` is a completely different thing. It is a **question**: "is the left exactly the same as the right?" It never changes anything. It only answers.

| You write | Say it as | What happens |
|---|---|---|
| `stage = 4` | "stage **gets** 4" | Puts 4 in the `stage` box. |
| `stage === 4` | "is stage **the same as** 4?" | Looks in the box, answers `true` or `false`. |

Here is proof that `=` changes things and `===` does not:

```js
let stage = 2;

console.log(stage === 4);
console.log(stage);

console.log(stage = 4);
console.log(stage);
```

Output:

```text
false
2
4
4
```

The first line asks "is stage 4?" and gets `false`, and `stage` is still 2 afterwards. The third line looks almost the same, but with a single `=` it is not a question at all. It *stores* 4 in `stage`, and the value of that whole assignment is 4, so `console.log` prints 4. The box has quietly changed.

You would never write `console.log(stage = 4)` on purpose. It is shown here because in the next lesson you will put comparisons inside `if`, and typing `=` when you meant `===` is a classic bug that does exactly this: it changes your variable instead of checking it.

::: why Why three equals signs?
Because `=` was already taken for storing, and `==` was taken by an older, sloppier comparison (next section). `===` is sometimes called **strict equality**. Say it as "is exactly the same as".
:::

### `!==`: "is not the same as"

`!==` is the opposite of `===`. The `!` means "not".

```js
const correctPin = "4821";
const typedPin = "4812";

console.log(typedPin === correctPin);
console.log(typedPin !== correctPin);
```

Output:

```text
false
true
```

The two PINs are different, so "same?" is `false` and "different?" is `true`. For any two values, `===` and `!==` always give opposite answers.

## Why not `==`?

You will see `==` (two equals signs) in older code and on the internet. It also asks "are these equal?", but it has a habit that causes bugs: before comparing, it quietly **converts** the values to the same type.

```js
console.log("5" == 5);
console.log("5" === 5);
console.log(0 == "");
console.log(0 === "");
```

Output:

```text
true
false
true
false
```

With `==`, the text `"5"` and the number `5` are counted as equal, because JavaScript secretly turns the text into a number first. Worse, `0 == ""` is `true`: an empty piece of text is treated as equal to zero. Nobody means that.

`===` does no converting. A string and a number are different types, so they are never exactly the same. That is honest and predictable.

**The rule for this course, and for most professional teams: always use `===` and `!==`. Never use `==` or `!=`.** If you want to compare text with a number, convert it yourself first with `Number()`, as you learned in [Converting between types](#/phase-01-storing-information/07-converting-between-types). Then you know exactly what is being compared.

::: analogy Two kinds of bouncer
The `==` bouncer is lazy. Someone arrives with a photo of a ticket instead of a ticket, and he squints and says "close enough, go in". The `===` bouncer checks that it is really a ticket *and* that it is the right one. The strict one is sometimes less convenient, but you never get surprised by who ended up inside.
:::

## Input is text, so convert before you compare

This is where Phase 1 pays off. `prompt` always gives you back a **string**, even when the user types digits. So this comparison is always `false`, no matter what the user types:

```js
const typed = "18";           // this is what prompt gives you
console.log(typed === 18);
console.log(Number(typed) === 18);
```

Output:

```text
false
true
```

`"18"` (text) is not exactly the same as `18` (a number). Convert first, then compare.

::: try Compare what the user types
1. Make sure `prompt-sync` is installed in `coding-practice` (you did this in [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user)).
2. Create `phase-2/age-check.js` and type:
   ```js
   const prompt = require("prompt-sync")();

   const age = Number(prompt("How old are you? "));

   console.log("Can you vote?", age >= 18);
   console.log("Child ticket (under 12)?", age < 12);
   console.log("Exactly 21?", age === 21);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-2/age-check.js
   ```
4. Type `16` and press Enter. You should see:
   ```text
   How old are you? 16
   Can you vote? false
   Child ticket (under 12)? false
   Exactly 21? false
   ```
5. Run it again with `21`, then with `9`. Before each run, predict all three answers.
6. **Now break it on purpose.** Remove `Number(` and its closing `)` so the line is `const age = prompt("How old are you? ");`. Run it and type `21`. What does "Exactly 21?" say now, and why? Put `Number()` back afterwards.
:::

Without `Number()`, "Exactly 21?" says `false` even when you type 21, because the text `"21"` is not the number `21`. (Curiously, `>=` and `<` still seem to work, because those two quietly convert text to numbers. Do not rely on that. Convert first, every time.)

## Comparing text

`===` works on strings too. Two strings are the same only if every character matches, **including capitals and spaces**:

```js
console.log("Durban" === "Durban");
console.log("Durban" === "durban");
console.log("Durban" === "Durban ");
```

Output:

```text
true
false
false
```

A capital `D` is a different character from a small `d`, and a space at the end is a character too. This matters a lot with user input, because people type `YES`, `yes`, `Yes` and ` yes` and mean the same thing. The fix uses tools from [Strings](#/phase-01-storing-information/05-strings): tidy the text before you compare it.

```js
const answer = "  YES ";
console.log(answer === "yes");
console.log(answer.trim().toLowerCase() === "yes");
```

Output:

```text
false
true
```

`.trim()` removes the spaces at each end, and `.toLowerCase()` turns every letter small. Now all the different ways of typing "yes" become the same `"yes"`. You will use `.trim().toLowerCase()` on almost every piece of text input you compare.

### Greater and less than with text: alphabetical order, mostly

You can use `<` and `>` on strings. JavaScript compares them character by character, like a dictionary:

```js
console.log("apple" < "banana");
console.log("cat" < "car");
```

Output:

```text
true
false
```

`"apple"` comes before `"banana"` because `a` comes before `b`. For `"cat"` and `"car"` the first two letters match, so it compares the third: `t` comes *after* `r`, so `"cat"` is not less than `"car"`.

Now for the weird part:

```js
console.log("Zebra" < "apple");
console.log("10" < "9");
```

Output:

```text
true
true
```

Two surprises:

1. **Every capital letter comes before every small letter.** Behind the scenes each character has a code number, and the capitals `A` to `Z` have smaller numbers than `a` to `z`. So `"Zebra"` sorts before `"apple"`. If you want true alphabetical order, compare `.toLowerCase()` versions.
2. **Digits in text are compared as characters, not as numbers.** `"10"` and `"9"` are compared one character at a time: is `"1"` less than `"9"`? Yes, so the answer is `true`, even though ten is more than nine. This is another reason to convert input with `Number()` before comparing sizes.

::: predict What does this print?
```js
const a = "Thabo";
const b = "thabo";

console.log(a === b);
console.log(a.toLowerCase() === b);
console.log(a !== b);
console.log("B" < "a");
```
Write down all four answers before you open the solution.
:::

::: solution
```text
false
true
true
true
```
1. `"Thabo"` and `"thabo"` differ in the first letter (capital T versus small t), so they are not exactly the same.
2. `a.toLowerCase()` is `"thabo"`, which matches `b` exactly.
3. They are different, so "not the same?" is `true`.
4. All capitals come before all small letters, so `"B"` is less than `"a"`.
:::

## Keeping the answer in a variable

A comparison produces a value, so you can store it in a variable like any other value:

```js
const age = 19;
const isAdult = age >= 18;
const isTeenager = age >= 13;

console.log(isAdult);
console.log(typeof isAdult);
```

Output:

```text
true
boolean
```

Read `const isAdult = age >= 18;` from right to left, as always: first work out `age >= 18` (that is `true`), then store `true` in `isAdult`. `typeof` confirms it is a boolean.

Why bother? Because a good name turns a comparison into a sentence. Compare these two lines a month from now:

```js
console.log(total > 500);
console.log(qualifiesForFreeDelivery);
```

The second one tells you what the question *means*. As you learned in [let and const](#/phase-01-storing-information/03-let-and-const), boolean names usually start with `is`, `has` or `can`: `isAdult`, `hasPaid`, `canVote`, `isPowerOn`. In the next lesson you will use variables like these straight inside `if`.

## Two special cases worth knowing

### `NaN` is not equal to anything, not even itself

In [Converting between types](#/phase-01-storing-information/07-converting-between-types) you met `NaN`, which you get when you try to turn text like `"hello"` into a number. It has a very strange rule:

```js
const amount = Number("hello");

console.log(amount === NaN);
console.log(Number.isNaN(amount));
```

Output:

```text
false
true
```

`NaN === NaN` is always `false`. The people who designed it reasoned that two "not a number" results are not necessarily the same thing, so they are never counted as equal. That means `amount === NaN` can **never** work. Always check with `Number.isNaN(amount)`. You will use this in the next lesson to reject nonsense input.

### Decimals are not always exact

From [Numbers](#/phase-01-storing-information/04-numbers) you know that `0.1 + 0.2` is `0.30000000000000004`. That has a knock-on effect on comparisons:

```js
console.log(0.1 + 0.2 === 0.3);
console.log(Math.round((0.1 + 0.2) * 100) === 30);
```

Output:

```text
false
true
```

When you compare money, compare whole cents (multiply by 100 and round), or compare with `>=` and `<=` rather than `===`.

::: exercise Level 1 — Guided · Airtime check
Create `phase-2/airtime.js`.

1. Make a `const` called `balance` with the value `12.5` (rand of airtime left).
2. Make a `const` called `bundlePrice` with the value `15`.
3. Make a `const` called `canBuyBundle` that stores the answer to "is the balance at least the bundle price?".
4. Make a `const` called `isEmpty` that stores whether the balance is exactly `0`.
5. Print both with labels: `"Can buy bundle:"` and `"Out of airtime:"`.
6. Run it. You should see `Can buy bundle: false` and `Out of airtime: false`.
7. Change `balance` to `15`, predict, and run again.
:::

::: solution
```js
const balance = 12.5;
const bundlePrice = 15;

const canBuyBundle = balance >= bundlePrice;
const isEmpty = balance === 0;

console.log("Can buy bundle:", canBuyBundle);
console.log("Out of airtime:", isEmpty);
```
Output:
```text
Can buy bundle: false
Out of airtime: false
```
With `balance` set to `15`, `canBuyBundle` becomes `true`, because `>=` includes the boundary.
:::

::: exercise Level 2 — On your own · Guess the secret word
Create `phase-2/secret-word.js`. Store a secret word in a `const` (for example `"mango"`). Ask the user to guess it with `prompt`. Print `Correct? true` or `Correct? false`.

It must count `Mango`, `MANGO` and `  mango ` as correct. Also print whether their guess comes before the secret word in the dictionary (`Comes before? true` or `false`), ignoring capitals.
:::

::: hint
Tidy the guess with `.trim().toLowerCase()` and keep the tidy version in its own variable. Then use that variable in both comparisons: `===` for the first, `<` for the second.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const secret = "mango";
const guess = prompt("Guess the secret fruit: ").trim().toLowerCase();

console.log("Correct?", guess === secret);
console.log("Comes before?", guess < secret);
```
A sample session:
```text
Guess the secret fruit:   MANGO 
Correct? true
Comes before? false
```
And another:
```text
Guess the secret fruit: banana
Correct? false
Comes before? true
```
You can chain `.trim().toLowerCase()` straight onto `prompt(...)`, because `prompt` gives back a string and you can ask that string to do things.
:::

::: debug Three wrong answers
Each program runs, but prints the wrong answer. Find and fix each problem.

```js
// Program A: should print true, because 18 is old enough
const typedAge = "18";            // imagine this came from prompt
console.log(typedAge === 18);
```

```js
// Program B: 60 should count as a pass (pass mark is 60 or more)
const score = 60;
console.log("Passed:", score > 60);
```

```js
// Program C: should print true when the user typed the right city
const city = "Cape Town";
const typed = "cape town";
console.log(typed === city);
```
:::

::: solution
**A:** `typedAge` is the string `"18"`, and a string is never exactly the same as a number. Convert it: `console.log(Number(typedAge) === 18);` prints `true`.

**B:** A boundary bug. "60 or more" is `>=`, not `>`. Change it to `score >= 60`, which prints `Passed: true`.

**C:** Capitals differ. Compare tidy versions of both: `typed.toLowerCase() === city.toLowerCase()`, which prints `true`.
:::

::: mistake
**Using `=` when you mean `===`.** `=` stores, `===` asks. Say "gets" for `=` and "is exactly the same as" for `===`, and you will hear the mistake.

**Using `==` because you saw it online.** It quietly converts types and gives surprises like `0 == ""` being `true`. Always use `===` and `!==`.

**Comparing `prompt` input without converting.** `prompt` gives text. `"18" === 18` is `false`. Wrap the input in `Number()` first.

**Putting a space inside the operator.** `> =`, `= =` and `! ==` are errors. The symbols are `>=`, `===` and `!==`.

**Forgetting about capitals and spaces in text.** `"Yes" === "yes"` is `false`. Tidy input with `.trim().toLowerCase()`.

**Checking for `NaN` with `===`.** `x === NaN` is always `false`. Use `Number.isNaN(x)`.

**Picking `>` when you meant `>=`.** Say the rule in words ("50 or more"), then test with the exact boundary value.
:::

## Real-world uses

Comparisons are hiding behind almost every screen you use:

- **Logging in:** is the password you typed exactly the same as the saved one? (`===`)
- **Online shopping:** is your cart total at least R500, so delivery is free? (`>=`)
- **Banking apps:** is the amount you want to send more than your balance? (`>`)
- **Games:** are your lives equal to 0, so it is game over? (`===`)
- **Load-shedding apps:** is the current stage greater than 0? (`>`)
- **Sorting a contact list:** does "Nomsa" come before "Pieter"? (`<` on strings, with the capital-letter caveat you now understand)

Each one is a yes-or-no question about two values. On its own, a comparison does nothing but answer. What the app *does* with the answer is the next lesson.

::: connect
**This builds on:** [booleans](#/phase-01-storing-information/06-booleans-null-undefined) (the `true`/`false` values comparisons produce), [converting between types](#/phase-01-storing-information/07-converting-between-types) (why you use `Number()` before comparing input) and [strings](#/phase-01-storing-information/05-strings) (`.trim()` and `.toLowerCase()` for tidy text comparisons).

**This unlocks:** decisions. In [if and else](#/phase-02-making-decisions/02-if-and-else) you will put these comparisons inside `if (...)` so your program can do different things depending on the answer. In [and, or, not](#/phase-02-making-decisions/03-combining-conditions) you will combine several comparisons into one bigger question.
:::

::: challenge Same time?
Two friends tell you when their taxis arrive. Lerato says `"9:05"` and Kagiso says `"09:05"`. As text, these are not the same. Write `phase-2/same-time.js` that stores both strings, and prints whether they are the same **time**, using only what you know so far. It should print `true`.

You may use string methods like `.slice()`, `.includes()` and `.length`, and `Number()`. Assume the minutes part is always the last two characters, and the hours part is everything before the `:`.
:::

::: hint
Get the minutes of each with `.slice(-2)`. Get the hours of each with `.slice(0, text.length - 3)`, which cuts off the `:` and the two minute digits. Convert the hours and the minutes to numbers, then add them up as total minutes since midnight: `hours * 60 + minutes`. Compare the totals.
:::

::: solution
```js
const lerato = "9:05";
const kagiso = "09:05";

const leratoHours = Number(lerato.slice(0, lerato.length - 3));
const leratoMinutes = Number(lerato.slice(-2));
const kagisoHours = Number(kagiso.slice(0, kagiso.length - 3));
const kagisoMinutes = Number(kagiso.slice(-2));

const leratoTotal = leratoHours * 60 + leratoMinutes;
const kagisoTotal = kagisoHours * 60 + kagisoMinutes;

console.log(lerato === kagiso);
console.log(leratoTotal === kagisoTotal);
```
Output:
```text
false
true
```
The lesson here is bigger than times. When two values *mean* the same thing but are *written* differently, turn them both into one standard form first (here, minutes since midnight), then compare. Programmers do this all the time with dates, phone numbers and email addresses.
:::

::: recap
- A **comparison** asks a yes-or-no question about two values, and always gives back a boolean: `true` or `false`.
- The operators are `===` (exactly the same), `!==` (different), `>`, `<`, `>=` and `<=`.
- `=` **stores** a value. `===` **asks** a question and changes nothing.
- Always use `===` and `!==`. Never `==`, because it quietly converts types (`"5" == 5` is `true`).
- `prompt` gives text, so convert with `Number()` before comparing numbers.
- Text comparisons care about capitals and spaces. Tidy with `.trim().toLowerCase()`. With `<` and `>`, capitals come before small letters, and digits in text compare as characters (`"10" < "9"` is `true`).
- You can store a comparison's answer: `const isAdult = age >= 18;`.
- `NaN` is never equal to anything, so use `Number.isNaN()`.
:::

::: interview What is the difference between `=` and `===`?
`=` is **assignment**: it stores the value on the right in the variable on the left, so it changes things. `===` is a **comparison**: it asks whether two values are exactly the same and gives back `true` or `false`, changing nothing.
:::

::: interview Why do most JavaScript programmers avoid `==`?
Because `==` converts the two values to the same type before comparing, which gives confusing results like `"5" == 5` and `0 == ""` both being `true`. `===` never converts, so a number and a string are never equal. That is predictable, and it pushes you to convert values deliberately with `Number()` or `String()`.
:::

::: interview A user types their age into `prompt` and your check `age === 18` is always `false`, even when they type 18. Why, and how do you fix it?
`prompt` always returns a string, so `age` holds `"18"`, and a string is never exactly the same as the number `18`. Convert it first: `const age = Number(prompt("Age? "));`.
:::

::: checkpoint
- [ ] I created the `phase-2` folder and ran `compare.js`
- [ ] I changed a value to sit exactly on a boundary, predicted the output, and checked it
- [ ] I ran `age-check.js`, removed `Number()` on purpose, and saw why the comparison failed
- [ ] I finished the airtime exercise and the secret-word program
- [ ] I fixed all three programs in "Debug this"
- [ ] I can explain the difference between `=` and `===` out loud
:::

::: resources
- **javascript.info, "Comparisons":** https://javascript.info/comparison. Covers everything here, plus a few more of the strange cases.
- **MDN, "Expressions and operators":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators. Scroll to the comparison operators section for the full table.
- **Eloquent JavaScript, chapter 1 "Values, Types, and Operators":** https://eloquentjavascript.net/01_values.html. The part on comparison and automatic type conversion explains why `==` behaves as it does.
:::
