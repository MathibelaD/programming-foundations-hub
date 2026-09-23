---
title: Truthy and falsy — JavaScript's shortcuts
summary: Any value can go inside an if. Here is how JavaScript decides whether it counts as yes or no, and how to use that without getting bitten.
minutes: 40
stage: Phase 2
---

## What you will learn

- What happens when you put something that is **not** a boolean inside `if ( )`
- The six **falsy** values. Everything else is **truthy**
- The everyday shortcut `if (name)` for "did the user type anything?", and the trap where `0` is a perfectly good answer
- How to give a value a fallback with `||` (and a first look at `??`), and when to write the check out in full instead

**Before this:** [and, or, not](#/phase-02-making-decisions/03-combining-conditions). In its "Debug this", `day === "Saturday" || "Sunday"` was always a "yes". This lesson explains why.

## The problem: "did they type anything?"

Ask someone their name with `prompt`, and some people press Enter without typing. `prompt` then gives back an empty string, `""`. Your program says `Hello, !`, which looks broken.

You already know how to check for that:

```js
const name = "";

if (name !== "") {
  console.log(`Hello, ${name}!`);
} else {
  console.log("Hello, whoever you are!");
}
```

Output:

```text
Hello, whoever you are!
```

That works, and there is nothing wrong with it. But you will see a shorter version in almost every JavaScript program ever written:

```js
const name = "";

if (name) {
  console.log(`Hello, ${name}!`);
} else {
  console.log("Hello, whoever you are!");
}
```

Output:

```text
Hello, whoever you are!
```

`if (name)`: no comparison at all, only a string inside the brackets. So far, conditions have always been booleans, such as `age >= 18` or `isRegistered`. What does JavaScript do with a string, a number or `null`?

It turns it into a boolean for you. The rules for that are what this lesson is about.

::: analogy "Is there anything in the envelope?"
Imagine someone hands you a sealed envelope and asks one question: "Is there anything in it?" You have to answer yes or no, whatever is inside.

- An empty envelope: **no**.
- An envelope with a slip that says "0": you would probably say **yes**, there is a slip of paper in there.

JavaScript does the same thing when a value lands where a yes/no is needed. It asks, "does this value count as *something*, or as *nothing*?" A short, fixed list of values counts as nothing. Everything else, even things that look like nothing to a human, counts as something.
:::

## The falsy list

When JavaScript needs a yes/no and gets some other value, it converts it. A value that becomes `false` is called **falsy**. A value that becomes `true` is called **truthy**.

There are only **six** falsy values you need to know. Learn this list, because it is short and it never changes:

| Falsy value | What it is | Where you meet it |
|---|---|---|
| `false` | the boolean "no" | comparisons that are not true |
| `0` | the number zero | a count or amount of nothing |
| `""` | an empty string (no characters at all) | the user pressed Enter without typing |
| `null` | "deliberately empty" | `prompt` when the user presses Ctrl+C |
| `undefined` | "no value given yet" | a variable made with `let x;` |
| `NaN` | "not a number" | `Number("hello")` |

**Everything else is truthy.** Every other number, every string with at least one character in it, `true`, and everything you will meet later in the course.

You can see what a value turns into with `Boolean()`. It is the boolean cousin of the `Number()` and `String()` you used in [Converting between types](#/phase-01-storing-information/07-converting-between-types): it converts any value to `true` or `false`, using exactly the rules `if` uses.

```js
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(false));
```

Output:

```text
false
false
false
false
false
false
```

All six are falsy. Now some values that *look* empty or negative to a human, but are truthy:

```js
console.log(Boolean("0"));
console.log(Boolean("false"));
console.log(Boolean(" "));
console.log(Boolean(-1));
console.log(Boolean(0.5));
```

Output:

```text
true
true
true
true
true
```

These are the ones that catch people out:

- `"0"` is a string with one character in it (the digit zero). It is not the number `0`. A slip of paper that says "0" is still a slip of paper.
- `"false"` is a string with five letters. It is not the boolean `false`.
- `" "` (one space) is a string with one character: a space. It is not empty.
- `-1` and `0.5` are numbers other than zero. Only `0` itself is falsy.

::: try Test the list yourself
1. Create `phase-2/truthy.js`:
   ```js
   const value = "";

   if (value) {
     console.log("truthy");
   } else {
     console.log("falsy");
   }
   ```
2. Run it from inside `coding-practice`:
   ```bash
   node phase-2/truthy.js
   ```
   You should see:
   ```text
   falsy
   ```
3. **Now experiment.** Change `""` to each of these in turn, **predicting before each run**: `"hello"`, `0`, `"0"`, `42`, `null`, `" "`, `Number("abc")`, `undefined`, `-5`.
4. Check your predictions against the list. Any surprises? Those are the ones to remember.
:::

## Why `"Sunday"` counted as "yes"

Remember this bug from the last lesson?

```js
const day = "Tuesday";

if (day === "Saturday" || "Sunday") {
  console.log("Weekend");
} else {
  console.log("Weekday");
}
```

Output:

```text
Weekend
```

Now you can explain it completely. The condition is `(day === "Saturday") || "Sunday"`. The left side is `false`. So JavaScript looks at the right side, which is the string `"Sunday"`. That is not empty, so it is truthy, and the whole condition counts as "yes". Every day of the week is a weekend.

## The practical use: checking for empty input

The most common, and most useful, truthy check is on text the user typed.

```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ").trim();

if (name) {
  console.log(`Nice to meet you, ${name}!`);
} else {
  console.log("You didn't type a name, but that's fine.");
}
```

Two sample sessions:

```text
What is your name? Ayesha
Nice to meet you, Ayesha!
```

```text
What is your name?    
You didn't type a name, but that's fine.
```

Notice the `.trim()`. Without it, someone who types three spaces gives you `"   "`, which is truthy (it has characters in it), and you would print `Nice to meet you,    !`. Trimming first turns all-space input into `""`, which is falsy. **Trim, then check.**

`!` works too. `!name` is `true` when `name` is falsy, so you can put the "problem" case first:

```js
const name = "";

if (!name) {
  console.log("Please type a name.");
}
```

Output:

```text
Please type a name.
```

## The trap: zero is a real answer

Truthy checks feel so handy that people use them for numbers too. That is where it goes wrong.

Imagine a taxi booking app that asks how many children are travelling. `0` is a perfectly normal answer.

```js
const children = 0;

if (children) {
  console.log(`Booking ${children} child seat(s).`);
} else {
  console.log("Please tell us how many children are travelling.");
}
```

Output:

```text
Please tell us how many children are travelling.
```

The customer answered correctly, and the app told them off. `0` is falsy, so `if (children)` treats a real answer of zero exactly like "no answer".

For numbers, say what you actually mean:

```js
const children = 0;

if (Number.isNaN(children) || children < 0) {
  console.log("Please type a number of 0 or more.");
} else if (children === 0) {
  console.log("No child seats needed.");
} else {
  console.log(`Booking ${children} child seat(s).`);
}
```

Output:

```text
No child seats needed.
```

This is the same pattern you will use for every amount in [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2): not a number, or negative, means invalid. Zero is fine.

::: warn The empty-input twist with numbers
What does `Number()` do with an empty string? It gives `0`, not `NaN`:

```js
console.log(Number(""));
console.log(Number("   "));
```

Output:

```text
0
0
```

So if someone presses Enter at `Number(prompt("Rent: R"))`, you get `0`. For a budget, "nothing typed" counting as R0 is reasonable. But if an empty answer should be an error (say, the price of a product), check the **text** before converting it: `if (!typedPrice.trim())`.
:::

::: predict Which lines print?
```js
const a = "0";
const b = 0;
const c = "   ".trim();
const d = Number("twelve");
const e = -3;

if (a) { console.log("a"); }
if (b) { console.log("b"); }
if (c) { console.log("c"); }
if (d) { console.log("d"); }
if (e) { console.log("e"); }
```
(Several short `if`s on one line each is fine for a quick test like this. In real programs, spread them out.)
:::

::: solution
```text
a
e
```
- `a` is the string `"0"`: one character, so truthy.
- `b` is the number `0`: falsy.
- `c` is `"   "` trimmed, which is `""`: falsy.
- `d` is `NaN`: falsy.
- `e` is `-3`: any number other than 0 (and `NaN`) is truthy, including negative ones.
:::

## Default values with `||`

Here is something new about `||`. In the last lesson you used it with booleans on both sides. When the sides are *not* booleans, `||` does not give back `true` or `false`. It gives back **one of the two values**:

- If the left side is truthy, you get the **left** value.
- Otherwise, you get the **right** value.

```js
console.log("Thandi" || "friend");
console.log("" || "friend");
```

Output:

```text
Thandi
friend
```

That makes `||` a neat way to say "use this, or if it is empty, use a **fallback**". A fallback value like this is called a **default value**:

```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ").trim() || "friend";
console.log(`Welcome to the braai, ${name}!`);
```

Two sample sessions:

```text
What is your name? Pieter
Welcome to the braai, Pieter!
```

```text
What is your name? 
Welcome to the braai, friend!
```

One line, no `if`, and the rest of the program can use `name` knowing it is never empty. Budget Buddy v2 uses exactly this line.

::: analogy A stand-in player
A team sheet says "Captain: Sipho, **or if he's not here**, Lindiwe." If Sipho turns up, he captains. If not, Lindiwe steps in. `sipho || lindiwe` is the team sheet. The fallback only plays when the first choice is missing.
:::

### The same zero trap, again

Because `||` falls back on **any** falsy value, it also falls back on `0`:

```js
const typedVolume = 0;
const volume = typedVolume || 10;

console.log(volume);
```

Output:

```text
10
```

Someone deliberately chose volume 0 (mute), and got 10. For text, `||` defaults are great. For numbers where `0` is a valid choice, `||` is the wrong tool.

### A first look at `??`

Modern JavaScript has a stricter fallback operator, `??`, pronounced "nullish coalescing" (a mouthful; most people say "the double question mark"). It only falls back when the left side is `null` or `undefined`, the two values that mean "there is no value at all". Zero and empty text are kept:

```js
console.log(0 || 10);
console.log(0 ?? 10);
console.log("" ?? "friend");
console.log(null ?? "friend");
```

Output:

```text
10
0

friend
```

(The third line printed an empty string, which shows up as a blank line.)

You will not need `??` much in this course. It is worth recognising, and it has one handy use now: when the user presses Ctrl+C, `prompt` gives back `null`, as you saw in [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user). `prompt("Name? ") ?? ""` turns that `null` into an empty string, so that `.trim()` afterwards does not crash.

## When to be explicit instead

Truthy and falsy are a shortcut. Like all shortcuts, they save time when you know the road, and get you lost when you do not. A good rule of thumb:

| You want to check | Shortcut that is fine | Write it out in full when |
|---|---|---|
| Did the user type any text? | `if (name)` after `.trim()` | never needed, the shortcut is clear |
| Fallback for empty text | `name \|\| "friend"` | never needed |
| Is a number valid? | none | always: `Number.isNaN(x) \|\| x < 0` |
| Is a number zero? | none | always: `x === 0` |
| Is a boolean true? | `if (isPaid)` | never needed, it is already a boolean |

In words: **use truthy checks for text and for booleans. For numbers, always say exactly what you mean.** When you are unsure, the longer version (`name !== ""`, `count === 0`) is never wrong, and it is easier for a beginner (or a tired expert) to read.

::: exercise Level 1 — Guided · Greeting with a fallback
Create `phase-2/greeting.js`.

1. Add the `prompt` line at the top.
2. Ask "What is your name? ", trim the answer, and use `|| "stranger"` so it is never empty. Store it in `const name`.
3. Ask "Where are you from? " and trim it. Store it in `const town` (no default).
4. Print `` `Hello, ${name}!` ``.
5. Write `if (town)` that prints `` `${town} sounds lovely.` ``, with an `else` that prints `"Keeping it a mystery? Fair enough."`.
6. Run it twice: once answering both questions, once pressing Enter for both.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ").trim() || "stranger";
const town = prompt("Where are you from? ").trim();

console.log(`Hello, ${name}!`);

if (town) {
  console.log(`${town} sounds lovely.`);
} else {
  console.log("Keeping it a mystery? Fair enough.");
}
```
Two sample sessions:
```text
What is your name? Nomvula
Where are you from? Polokwane
Hello, Nomvula!
Polokwane sounds lovely.
```
```text
What is your name? 
Where are you from? 
Hello, stranger!
Keeping it a mystery? Fair enough.
```
:::

::: exercise Level 2 — On your own · Spaza shop order
Create `phase-2/spaza.js`. Ask for the customer's name (default `"customer"` if empty) and how many loaves of bread they want. Bread is R18.50 a loaf.

- If the quantity is not a number or is negative, print an error.
- If it is exactly 0, print `No bread today, <name>? See you next time.`
- Otherwise, print the cost with two decimal places.

Do **not** use a truthy check on the quantity.
:::

::: hint
The name uses the `.trim() || "customer"` pattern. The quantity uses an `if / else if / else` chain: `Number.isNaN(qty) || qty < 0` first, then `qty === 0`, then the normal case. `(qty * 18.5).toFixed(2)` gives the cost.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const name = prompt("Name: ").trim() || "customer";
const qty = Number(prompt("How many loaves? "));

if (Number.isNaN(qty) || qty < 0) {
  console.log("Sorry, I need a number of 0 or more.");
} else if (qty === 0) {
  console.log(`No bread today, ${name}? See you next time.`);
} else {
  console.log(`${qty} loaves for ${name}: R${(qty * 18.5).toFixed(2)}`);
}
```
Sample sessions:
```text
Name: Bongani
How many loaves? 3
3 loaves for Bongani: R55.50
```
```text
Name: 
How many loaves? 0
No bread today, customer? See you next time.
```
If you had started with a truthy check such as `if (!qty)` for the error, a real 0 would have been reported as a mistake. Being explicit made every case correct.
:::

::: debug The disappearing discount
A shop lets staff type a discount percentage. `0` means no discount. This program should print `Discount: 0%` and `To pay: R200.00` for a discount of 0, but it applies 10% instead. Why? Fix it.

```js
const typedDiscount = "0";   // imagine this came from prompt
const discount = Number(typedDiscount) || 10;
const price = 200;

console.log(`Discount: ${discount}%`);
console.log(`To pay: R${(price - price * discount / 100).toFixed(2)}`);
```
:::

::: solution
Running it prints:
```text
Discount: 10%
To pay: R180.00
```
`Number("0")` is `0`, which is falsy, so `|| 10` replaces it with 10. The fallback was only meant for an **empty** answer, but it also swallowed a real 0.

One fix: check the *text* for emptiness before converting, and only then decide:

```js
const typedDiscount = "0";   // imagine this came from prompt
let discount = 10;

if (typedDiscount.trim()) {
  discount = Number(typedDiscount);
}

const price = 200;

console.log(`Discount: ${discount}%`);
console.log(`To pay: R${(price - price * discount / 100).toFixed(2)}`);
```
Output:
```text
Discount: 0%
To pay: R200.00
```
Now 10 is used only when nothing was typed. A truthy check on **text** is safe here, because `"0"` (a string with a character in it) is truthy. The problem was only ever the truthy check on the **number**.
:::

::: mistake
**Forgetting the falsy list is only six values.** `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else, including `"0"`, `"false"`, `" "` and `-1`, is truthy.

**Using `if (amount)` on a number.** It rejects a real `0`. For numbers, check `Number.isNaN`, the range and `=== 0` explicitly.

**Using `|| default` on a number that can be 0.** `0 || 10` is `10`. Use it for text, or check explicitly.

**Checking text without trimming.** `"   "` is truthy. Trim first, then check.

**Thinking `Number("")` is `NaN`.** It is `0`. Pressing Enter at a number question gives 0, not an error.

**Writing `if (x === true)` for a boolean.** Not wrong, but unnecessary. `if (x)` says the same thing.
:::

## Real-world uses

- **Sign-up forms** say "Name is required" when a field is empty: a truthy check on trimmed text.
- **Apps with profiles** show "Hi there" when your display name is blank: a `||` default.
- **Settings screens** let you pick volume 0 or a 0% tip, and good code uses explicit checks (or `??`) so those zeros are kept.
- **Code you read online** is full of `if (user)` and `value || defaultValue`. Knowing the falsy list means you can read it confidently.

::: connect
**This builds on:** [booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined) (all of which appear on the falsy list), `NaN` from [Converting between types](#/phase-01-storing-information/07-converting-between-types), and `||` and `!` from [and, or, not](#/phase-02-making-decisions/03-combining-conditions).

**This unlocks:** the `name || "friend"` line in [Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2). In [Phase 3](#/phase-03-loops/01-why-loops), a loop will keep asking *while* the answer is empty, using exactly the checks from this lesson. Next up, [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary) gives you two more ways to choose.
:::

::: challenge Airtime top-up with smart defaults
Create `phase-2/topup.js`. Ask for:

1. A phone number. If it is empty, print `A phone number is required.` and nothing else.
2. An amount. If nothing is typed, use **R29** as the default. If something is typed but it is not a number, or is less than 5, print `Amount must be a number of R5 or more.` and nothing else. (Note: 0 typed on purpose is too small, so it must give that error, not become R29.)
3. Otherwise print `Sending R<amount> airtime to <number>.`

Use a truthy check only where it is safe.
:::

::: hint
Keep the typed amount as **text** first: `const typedAmount = prompt("Amount (Enter for R29): R").trim();`. Then `let amount = 29;` and only if `typedAmount` is truthy, replace it with `Number(typedAmount)`. The phone number check and the amount check can live in an outer `if / else`, with the amount chain inside the `else`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const phone = prompt("Phone number: ").trim();

if (!phone) {
  console.log("A phone number is required.");
} else {
  const typedAmount = prompt("Amount (Enter for R29): R").trim();
  let amount = 29;

  if (typedAmount) {
    amount = Number(typedAmount);
  }

  if (Number.isNaN(amount) || amount < 5) {
    console.log("Amount must be a number of R5 or more.");
  } else {
    console.log(`Sending R${amount} airtime to ${phone}.`);
  }
}
```
Sample sessions:
```text
Phone number: 0821234567
Amount (Enter for R29): R
Sending R29 airtime to 0821234567.
```
```text
Phone number: 0821234567
Amount (Enter for R29): R0
Amount must be a number of R5 or more.
```
```text
Phone number: 
A phone number is required.
```
The truthy checks are only ever on **text** (`phone` and `typedAmount`). The number is always checked explicitly. That is the whole lesson in one program.
:::

::: recap
- When a value that is not a boolean is used as a condition, JavaScript converts it to `true` or `false`.
- **Falsy** values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is **truthy**, including `"0"`, `"false"`, `" "` and negative numbers.
- `if (text)` after `.trim()` is a clear way to ask "did they type anything?".
- `0` is falsy, so never use a truthy check on a number where zero is a valid answer.
- `a || b` gives back `a` if it is truthy, otherwise `b`. That makes it a **default value**: `name || "friend"`.
- `??` only falls back on `null` or `undefined`, so it keeps `0` and `""`.
- Use shortcuts for text and booleans. For numbers, write exactly what you mean.
:::

::: interview What are the falsy values in JavaScript?
`false`, `0`, the empty string `""`, `null`, `undefined` and `NaN`. Every other value is truthy.
:::

::: interview Why can `if (amount)` be a bug when checking a number the user typed?
Because `0` is falsy. If zero is a valid answer (no children travelling, R0 for a free item), `if (amount)` treats it exactly like no answer. Check numbers explicitly with `Number.isNaN`, range checks, and `=== 0`.
:::

::: interview What does `const city = typed || "Johannesburg";` do, and when might it go wrong?
If `typed` is truthy, `city` gets `typed`. If it is falsy (such as an empty string), `city` gets `"Johannesburg"`. That is a good default for text. It goes wrong if the value can legitimately be falsy, such as the number `0`, because the fallback would replace it. `??` only replaces `null` and `undefined`.
:::

::: checkpoint
- [ ] I ran `truthy.js` with every value on the list, and predicted each one first
- [ ] I can write out the six falsy values from memory
- [ ] I saw `if (children)` reject a real 0, and fixed it with explicit checks
- [ ] I finished the greeting program, with a fallback name
- [ ] I finished the spaza shop order without a truthy check on the number
- [ ] I fixed the disappearing discount
:::

::: resources
- **MDN Glossary, "Truthy":** https://developer.mozilla.org/en-US/docs/Glossary/Truthy. A short definition with examples.
- **MDN Glossary, "Falsy":** https://developer.mozilla.org/en-US/docs/Glossary/Falsy. The full list, including a couple of rare values you do not need yet.
- **javascript.info, "Logical operators":** https://javascript.info/logical-operators. Explains how `||` returns one of its values.
- **javascript.info, "Nullish coalescing operator '??'":** https://javascript.info/nullish-coalescing-operator. For when you want to know more about `??`.
:::
