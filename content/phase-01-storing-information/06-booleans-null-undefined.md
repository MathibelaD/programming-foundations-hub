---
title: true, false, and "nothing" — booleans, null and undefined
summary: Yes/no values, two different ways of saying "nothing here", and how to ask any value what type it is.
minutes: 35
stage: Phase 1
---

## What you will learn

- What a **boolean** is, and why yes/no values are everywhere in real programs
- The difference between `undefined` ("nothing has been put here yet") and `null` ("deliberately empty")
- How to ask any value what type it is, with `typeof`
- Why the **type** of a value decides what you can do with it

**Before this:** [Strings](#/phase-01-storing-information/05-strings). You saw `includes()` answer `true` or `false`. This lesson explains what those are.

## The problem: not every answer is a number or a word

So far you have stored numbers (`1500`, `19.99`) and text (`"Lindiwe"`). But think about the questions an app asks all the time:

- Is this person logged in?
- Has this order been paid?
- Is the shop open right now?
- Is the password long enough?
- Is the phone on silent?

Each answer is **yes or no**. You *could* store it as the text `"yes"`, but then someone writes `"Yes"`, someone else writes `"y"`, and a third person writes `"yep"`. You could store `1` and `0`, but then nobody knows whether `1` is a count or an answer.

Programs need a value that means **exactly** yes or no, with nothing in between. And they need a way to say "there is no value here", because sometimes there genuinely is not one yet: nobody has won the game, the order has not been delivered.

This lesson covers both.

::: analogy A light switch
A **boolean** is like a light switch. It has exactly two positions, on or off. It is never "a bit on", never "blue", never "Thursday". That is its whole strength: when you look at a switch, there is no doubt about what it means.
:::

## Booleans: `true` and `false`

A **boolean** is a value that is either `true` or `false`. Those are the only two booleans that exist. They are named after George Boole, a 19th-century mathematician who worked out the maths of true-and-false logic, the logic every computer is built on.

```js
const isLoggedIn = true;
const hasPaid = false;

console.log("Logged in:", isLoggedIn);
console.log("Paid:", hasPaid);
```

Output:

```text
Logged in: true
Paid: false
```

Three things to notice:

1. `true` and `false` have **no quotes**. They are not text. They are special values, like numbers are.
2. They are all **lower case**. `True` or `FALSE` will not work. (`True` gives `ReferenceError: True is not defined`, because JavaScript thinks you mean a variable called `True`.)
3. The names start with `is` and `has`, as you saw in [let and const](#/phase-01-storing-information/03-let-and-const). `if (hasPaid)` reads almost like English, and you will be writing exactly that in the next phase.

### Where booleans come from

You will rarely type `true` or `false` yourself. Mostly, booleans are **answers** to questions your program asks. You have already met some:

```js
const email = "sipho@example.co.za";
const hasAt = email.includes("@");
console.log("Has an @:", hasAt);
console.log("Starts with sipho:", email.startsWith("sipho"));
```

Output:

```text
Has an @: true
Starts with sipho: true
```

The other big source is **comparisons**. Here is a small preview:

```js
console.log(5 > 3);
console.log(10 < 2);
```

Output:

```text
true
false
```

`5 > 3` asks "is 5 greater than 3?", and the answer is the boolean `true`. There is a whole set of these comparison operators, and [Comparing values](#/phase-02-making-decisions/01-comparing-values) covers them properly at the start of Phase 2. For now, the idea to hold on to is: **a question produces a boolean**.

### Why booleans matter so much

On their own, booleans look a bit dull. They become powerful in [Phase 2](#/phase-02-making-decisions/02-if-and-else), where they control **decisions**: *if* the order is paid, ship it; *otherwise*, show a reminder. Every decision a program makes comes down to a boolean. That is why they get their own type.

::: try Yes and no
1. In `coding-practice`, create `phase-1/booleans.js`.
2. Type in:
   ```js
   const name = "Farah";
   const password = "sunflower7";

   const isLongEnough = password.length > 7;
   const hasDigit7 = password.includes("7");

   console.log(`${name}'s password is long enough: ${isLongEnough}`);
   console.log(`It contains a 7: ${hasDigit7}`);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-1/booleans.js
   ```
4. You should see:
   ```text
   Farah's password is long enough: true
   It contains a 7: true
   ```
5. **Now experiment.** Change the password to `"sun"`. Predict both lines before you run it. Then try `"sunshine"`.
:::

::: warn `true` is not `"true"`
`true` (no quotes) is a boolean. `"true"` (with quotes) is a four-letter string that happens to spell the word. They print the same, which makes this confusing, but they are different types and behave differently. You will see this bite when reading answers typed by a user, which always arrive as text.
:::

## Two kinds of "nothing": `undefined` and `null`

Sometimes a variable has no real value. JavaScript has two different ways to say so, and the difference is about **who** decided it was empty.

::: analogy Mailbox slots
Picture a wall of mailboxes in a block of flats.

- One slot has **nothing in it at all**. Nobody has put anything there yet. Maybe nobody has thought about it. That is `undefined`.
- Another slot has a note inside that says **"Nothing for you today."** Someone checked, and deliberately left that message. That is `null`.

Both slots contain no letters. But the second one tells you something: a person decided "there is nothing here, on purpose".
:::

### `undefined`: nothing has been put here yet

You met `undefined` in [Variables](#/phase-01-storing-information/02-variables). JavaScript gives it to you automatically when something has no value:

```js
let favouriteTeam;
console.log(favouriteTeam);

const name = "Lindiwe";
console.log(name[99]);
```

Output:

```text
undefined
undefined
```

The first variable was created but never given a value. The second asks for a character that does not exist. In both cases, JavaScript's answer is `undefined`: "there is nothing here".

As a rule, **you do not write `undefined` yourself**. Let JavaScript use it. When you see it in your output, it usually means "I forgot to give something a value", or "I asked for something that is not there". It is a clue for debugging.

### `null`: deliberately empty

`null` is the value **you** use to say "there is intentionally no value here":

```js
let winner = null;          // the game has not finished yet
console.log("Winner:", winner);

winner = "Tumelo";
console.log("Winner:", winner);
```

Output:

```text
Winner: null
Winner: Tumelo
```

Setting `winner` to `null` tells anyone reading your code: "I know about this variable, and I have decided it is empty for now." That is more informative than leaving it `undefined`, which could mean "empty on purpose" or "forgot".

Real examples of `null`:

- `deliveredAt = null` for an order that has not been delivered yet.
- `middleName = null` for someone who does not have one.
- `selectedSeat = null` before the user has picked a seat.

You will also see `null` come *back* to you from other people's code, as a way of saying "no answer". In [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user), for example, you will see that the input tool returns `null` if the user cancels.

| | `undefined` | `null` |
|---|---|---|
| Means | "Nothing has been put here" | "Deliberately empty" |
| Who sets it | Usually JavaScript, automatically | You, on purpose |
| When you see it | A variable with no value yet, a character or item that does not exist | A value that is known to be empty, like "no winner yet" |
| Should you write it? | Rarely | Yes, when "empty" is a real answer |

## Asking a value what it is: `typeof`

Every value has a **type**, also called a **data type**: the kind of value it is. JavaScript can tell you any value's type with `typeof`. Write `typeof` followed by a value:

```js
console.log(typeof 42);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof undefined);
```

Output:

```text
number
string
boolean
undefined
```

`typeof` gives its answer as a string, such as `"number"`. It is very handy for debugging: "why is this sum wrong?" is often answered by "because that value is a string, not a number".

```js
console.log(typeof 19.99);
console.log(typeof "19.99");
console.log(typeof "true");
console.log(typeof (5 > 3));
```

Output:

```text
number
string
string
boolean
```

The brackets in `typeof (5 > 3)` make sure JavaScript works out `5 > 3` first, and then asks for the type of the answer.

### The famous mistake: `typeof null`

```js
console.log(typeof null);
```

Output:

```text
object
```

That is **wrong**, and everyone agrees it is wrong. `null` is its own type. This is a bug from the very first version of JavaScript in 1995. By the time people noticed, millions of websites depended on it, so it could never be fixed without breaking them. Now every JavaScript programmer learns it as a piece of trivia. ("Object" is a type you will meet in [Phase 6](#/phase-06-objects/01-what-is-an-object). `null` is not one.)

## All the types so far

Here is every type you have met, in one table. This is worth keeping handy.

| Type | Example values | `typeof` says | Used for |
|---|---|---|---|
| number | `42`, `19.99`, `-7`, `Infinity` | `"number"` | Counting, measuring, money, maths |
| string | `"Lindiwe"`, `"42"`, `""` | `"string"` | Any text: names, messages, typed input |
| boolean | `true`, `false` | `"boolean"` | Yes/no answers, and (soon) decisions |
| undefined | `undefined` | `"undefined"` | "Nothing has been put here yet" |
| null | `null` | `"object"` (a historic bug) | "Deliberately empty" |

These five are called **primitive types**: the simplest building blocks. JavaScript has a couple of other rare ones you will not need. Later, you will combine primitives into bigger structures: lists (arrays) in Phase 5 and objects in Phase 6.

::: predict What type is each one?
Write down what each line prints before you check.

```js
console.log(typeof "false");
console.log(typeof 0);
console.log(typeof "");
console.log(typeof ("Hi".length));
console.log(typeof typeof 42);
```
:::

::: solution
```text
string
number
string
number
string
```
- `"false"` is in quotes, so it is a string, even though it spells a boolean.
- `0` is a number. "Zero" is still a number, not "nothing".
- `""`, the empty string, is still a string. It is text with no characters.
- `"Hi".length` is `2`, a number.
- The last one is a trick. `typeof 42` gives the **string** `"number"`, and the type of a string is `"string"`.
:::

## Why types matter: the type decides what you can do

Here is the real reason this whole phase keeps talking about types: **what you can do with a value depends on its type**.

- Numbers can be multiplied, rounded, and given to `toFixed`.
- Strings can be upper-cased, trimmed, sliced and measured with `.length`.
- Booleans can drive decisions.
- `null` and `undefined` can do almost nothing at all.

Ask a value to do something its type cannot do, and you get a `TypeError`: an error that means "this kind of value cannot do that".

```js
const age = 16;
console.log(age.toUpperCase());
```

Output:

```text
TypeError: age.toUpperCase is not a function
```

A number has no upper case. Node's caret points at the `.toUpperCase` that it could not find.

The `TypeError` you will meet most, in every language, comes from trying to use something that is empty:

```js
const middleName = null;
console.log(middleName.length);
```

Output:

```text
TypeError: Cannot read properties of null (reading 'length')
```

Read it in plain words: "You asked for the `length` of `null`, but `null` has nothing to read." The same happens with `undefined`. When you see "Cannot read properties of undefined", the question to ask is: **which value is empty, and why did I expect it to have something in it?**

::: exercise Level 1 — Guided · A type detective
Create `phase-1/types.js`.

1. Create a constant `studentName` with your name as a string.
2. Create a constant `grade` with the number `11`.
3. Create a constant `isPrefect` with the boolean `false`.
4. Create a `let` variable `favouriteSubject` with no value at all.
5. Create a `let` variable `bursary` with the value `null` (the result has not come out yet).
6. For each of the five, print its name, its value and its type, like this: `` console.log(`grade: ${grade} (${typeof grade})`); ``
7. Run it. Check that the five types printed are `string`, `number`, `boolean`, `undefined` and `object`.
:::

::: solution
```js
const studentName = "Kwame";
const grade = 11;
const isPrefect = false;
let favouriteSubject;
let bursary = null;

console.log(`studentName: ${studentName} (${typeof studentName})`);
console.log(`grade: ${grade} (${typeof grade})`);
console.log(`isPrefect: ${isPrefect} (${typeof isPrefect})`);
console.log(`favouriteSubject: ${favouriteSubject} (${typeof favouriteSubject})`);
console.log(`bursary: ${bursary} (${typeof bursary})`);
```
Output:
```text
studentName: Kwame (string)
grade: 11 (number)
isPrefect: false (boolean)
favouriteSubject: undefined (undefined)
bursary: null (object)
```
Remember: that last `object` is the historic bug. `null` is really its own type.
:::

::: exercise Level 2 — On your own · Order tracker
Create `phase-1/order.js` for an online order. Use sensible types and names for:

- the customer's name (Mandla),
- the order total (R349.90),
- whether it has been paid (it has),
- whether it has been delivered (not yet),
- the delivery driver's name (not assigned yet, and you know it: choose between `null` and `undefined`),
- whether the customer's email, `"mandla@example.com"`, contains an `@` (work this out with a string method, do not type `true`).

Print a short, labelled summary of all six, with the total shown to two decimal places.
:::

::: hint
Yes/no values should be booleans named with `is` or `has`. "Not assigned yet, and I know it" is a deliberate empty value.
:::

::: solution
```js
const customerName = "Mandla";
const orderTotal = 349.9;
const isPaid = true;
const isDelivered = false;
const driverName = null;
const email = "mandla@example.com";
const hasValidEmail = email.includes("@");

console.log(`Customer: ${customerName}`);
console.log(`Total: R${orderTotal.toFixed(2)}`);
console.log(`Paid: ${isPaid}`);
console.log(`Delivered: ${isDelivered}`);
console.log(`Driver: ${driverName}`);
console.log(`Email looks valid: ${hasValidEmail}`);
```
Output:
```text
Customer: Mandla
Total: R349.90
Paid: true
Delivered: false
Driver: null
Email looks valid: true
```
`driverName` is `null` because you know there is no driver yet. That is a deliberate empty value. In a real program it would become `let`, because it changes once a driver is assigned.
:::

::: debug Cannot read properties
This program crashes. Read the error, work out **which** value is empty, and fix the program so that it prints the length of the nickname.

```js
let nickname;
const fullName = "Nokuthula";

console.log(`Full name has ${fullName.length} letters`);
console.log(`Nickname has ${nickname.length} letters`);
```

The nickname should be `"Noks"`.
:::

::: solution
The first line prints, then Node stops with:
```text
TypeError: Cannot read properties of undefined (reading 'length')
```
The caret points at `.length` on the last line. `nickname` was declared but never given a value, so it is `undefined`, and `undefined` has no length. Fix it by giving it a value:

```js
let nickname = "Noks";
const fullName = "Nokuthula";

console.log(`Full name has ${fullName.length} letters`);
console.log(`Nickname has ${nickname.length} letters`);
```
Output:
```text
Full name has 9 letters
Nickname has 4 letters
```
(Since the nickname never changes now, `const` would be even better.)
:::

::: mistake
**Putting quotes around `true` or `false`.** `"true"` is a string. Use `true`.

**Capital letters.** `True`, `False`, `NULL` and `Undefined` do not exist. They are all lower case.

**Writing `undefined` yourself to mean "empty".** Use `null` for "deliberately empty", and let `undefined` mean "not set yet".

**Believing `typeof null`.** It says `"object"`, but that is a historic bug.

**Thinking `0` or `""` means "nothing".** `0` is a real number, and `""` is a real (empty) string. They are values, not `null` or `undefined`.

**Ignoring "Cannot read properties of undefined".** It means a value you expected to be there is missing. Find which one, and why.
:::

## Real-world uses

- **Settings screens** are mostly booleans: `isDarkMode`, `notificationsOn`, `isPrivateAccount`.
- **User accounts:** `isLoggedIn`, `isAdmin`, `hasVerifiedEmail`.
- **Shops:** `isInStock`, `isOnSale`, `isPaid`.
- **`null` in databases:** an empty "date delivered" or "middle name" column is stored as `null`, meaning "known to be empty".
- **Debugging:** `typeof` answers "why did my sum give `15003`?" (because one value was a string), and "Cannot read properties of undefined" is probably the most searched JavaScript error on the internet.

::: connect
**This builds on:** [Strings](#/phase-01-storing-information/05-strings), where `includes` and `startsWith` gave you your first booleans, and [Variables](#/phase-01-storing-information/02-variables), where you first saw `undefined`.

**This unlocks:** decisions. In [Phase 2](#/phase-02-making-decisions/01-comparing-values) every comparison produces a boolean, and every `if` runs on one. Before that, the [next lesson](#/phase-01-storing-information/07-converting-between-types) uses what you just learned about types to turn strings into numbers, and the other way round.
:::

::: challenge Predict a whole program
Without running it, write down every line this program prints. Then run it and check.

```js
let score;
console.log(score);
score = null;
console.log(score);
score = 0;
console.log(score, typeof score);
score = "0";
console.log(score, typeof score);
score = score + 5;
console.log(score, typeof score);
const isHighScore = score.length > 1;
console.log(isHighScore, typeof isHighScore);
```
:::

::: solution
```text
undefined
null
0 number
0 string
05 string
true boolean
```
- `score` starts `undefined`, then is deliberately set to `null`.
- `0` and `"0"` print the same, but `typeof` shows they are different types.
- `"0" + 5` joins text, giving the string `"05"`.
- `"05".length` is `2`, and `2 > 1` is `true`.

A variable in JavaScript can hold different types at different times. That flexibility is convenient, but it is also why `typeof` is such a useful debugging tool.
:::

::: recap
- A **boolean** is `true` or `false`, with no quotes, in lower case. Name boolean variables like questions: `isPaid`, `hasTicket`.
- Booleans usually come from questions, such as `includes()`, `startsWith()` and comparisons like `5 > 3`. Phase 2 uses them to make decisions.
- `undefined` means "nothing has been put here yet", and JavaScript sets it automatically.
- `null` means "deliberately empty", and you set it on purpose.
- `typeof value` tells you a value's type as a string. `typeof null` saying `"object"` is a historic bug.
- The five types so far: number, string, boolean, undefined, null.
- The type decides what you can do. Asking a value to do something its type cannot do gives a `TypeError`.
:::

::: interview What is the difference between `null` and `undefined`?
Both mean "no value". `undefined` is what JavaScript gives you automatically when something has not been given a value, such as a declared but unassigned variable. `null` is a value a programmer sets on purpose to say "this is deliberately empty".
:::

::: interview What does `typeof null` return, and why?
`"object"`. It is a bug from the first version of JavaScript that can never be fixed, because too much existing code depends on it. `null` is really its own type.
:::

::: interview Why is `true` different from `"true"`?
`true` is a boolean, one of the two yes/no values. `"true"` is a string of four characters. They print the same, but they are different types, so they behave differently. For example, `"true".length` is `4`, and in Phase 2 only the boolean can be used directly as a yes/no answer.
:::

::: checkpoint
- [ ] I ran `phase-1/booleans.js` and changed the password to see `true` turn into `false`
- [ ] I created an `undefined` variable and a `null` variable and printed both
- [ ] I used `typeof` on every type in the table, including `null`
- [ ] I made a `TypeError` on purpose and read the message
- [ ] I finished the order tracker and chose `null` for the driver
- [ ] I predicted the whole challenge program before running it
:::

::: resources
- **javascript.info, "Data types":** https://javascript.info/types. Covers all the types, `null`, `undefined` and `typeof`, in a few pages.
- **MDN, "Grammar and types":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types. Part of the official guide. Read the "Data structures and types" section.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste the challenge program in and step through it to watch `score` change type.
:::
