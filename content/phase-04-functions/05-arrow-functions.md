---
title: Function expressions and arrow functions
summary: Functions are values you can store in a variable. Then, step by step, the short arrow way of writing them that you will see everywhere.
minutes: 50
stage: Phase 4
---

## What you will learn

- That a function is a **value**, like a number or a string, so it can be stored in a variable
- How to write a **function expression**
- How to turn a normal function into an **arrow function**, one small step at a time, and back again
- The **implicit return**, and the curly-brace trap that catches everyone
- When to use which style, and one important difference: when you are allowed to call them

**Before this:** [Scope](#/phase-04-functions/04-scope). You should be comfortable writing functions with parameters and `return`.

## Why learn another way to write the same thing?

You can already write any function you need. So why learn a second (and third) way?

1. **Short helpers get very short.** Many useful functions are one line of real work, like `return price * 0.15;`. Wrapped in `function vatOn(price) { ... }` that is three lines. As an arrow function it is one: `const vatOn = (price) => price * 0.15;`.
2. **You will see arrows everywhere.** Most JavaScript written today uses arrow functions, in tutorials, in answers online, and in other people's code. If you cannot read them, a lot of code looks like hieroglyphics.
3. **Phase 7 depends on them.** In [Phase 7](#/phase-07-functions-as-values/01-passing-functions-to-functions) you will hand small functions to other functions, and arrows make that neat enough to read in one glance.

The good news: nothing about *what functions do* changes. Parameters, return values and scope all work exactly as you learned. Only the way you write them down changes.

::: analogy Writing the same date three ways
Think about how you write a date. On a formal letter you might write **"the twenty-third of September, 2026"**. On a form you write **"23 September 2026"**. On a note on the fridge you write **"23/9"**.

All three mean the same day. The long form is clear and formal. The short form is quick, and perfect once everyone knows the shorthand. You would not write "23/9" on a legal contract, and you would not write "the twenty-third of September" on a sticky note.

Function declarations, function expressions and arrow functions are the same idea written formally, less formally, and in shorthand. Same meaning, different length.
:::

## Functions are values

Here is a fact that surprises most people: a function is a **value**, just like `42` or `"hello"`. Look:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(typeof greet);
console.log(greet);

const sayHello = greet;
console.log(sayHello("Amahle"));
```

Output:

```text
function
[Function: greet]
Hello, Amahle!
```

- `typeof greet` says `function`. Next to number, string and boolean, "function" is another type of value.
- `console.log(greet)` without brackets does not call it. It shows the function itself, the recipe card, not a cooked meal.
- `const sayHello = greet;` puts the **same function** into a second variable. Now it can be called by either name.

The key point: the name `greet` is really a variable that holds a function. That opens up a new way of writing one.

## The function expression

If a function is a value, you can create it right where a value goes, on the right-hand side of `=`:

```js
const greet = function (name) {
  return `Hello, ${name}!`;
};

console.log(greet("Amahle"));
console.log(typeof greet);
```

Output:

```text
Hello, Amahle!
function
```

This is called a **function expression**: a function written as a value and stored in a variable. Compare it with the declaration:

```text
function greet(name) {           <- declaration: starts with the word "function"
  return `Hello, ${name}!`;
}

const greet = function (name) {  <- expression: a variable, =, then a function
  return `Hello, ${name}!`;
};
```

Three small differences:

1. It starts with `const greet =`, like any other variable.
2. The function after `function` has **no name** of its own. It gets its name from the variable. (A function with no name is called an **anonymous function**.)
3. There is a **semicolon after the closing brace**, because the whole thing is one `const` statement, like `const x = 5;`.

You call it exactly as before: `greet("Amahle")`.

## From declaration to arrow, one step at a time

Now the main event. We will take one function, `add`, and shorten it step by step. Each step still works, and each step does exactly the same thing.

### Step 1: a function declaration (what you know)

```js
function add(a, b) {
  return a + b;
}
```

### Step 2: a function expression

Move the name to a `const`, and add a semicolon at the end:

```js
const add = function (a, b) {
  return a + b;
};
```

### Step 3: an arrow function with braces

Delete the word `function`, and put an **arrow** `=>` (an equals sign and a greater-than sign, with no space) **between the brackets and the opening brace**:

```js
const add = (a, b) => {
  return a + b;
};
```

This is an **arrow function**. Read `=>` as "goes to" or "gives": "`a` and `b` give `a + b`".

### Step 4: an arrow function with an implicit return

When the body is **only** `return something;`, you can go further. Remove the curly braces, the word `return`, and the inner semicolon, and keep only the value:

```js
const add = (a, b) => a + b;
```

When an arrow function has **no curly braces**, the value after the arrow is returned **automatically**. This is called an **implicit return** ("implicit" means "understood without being said"). You did not write `return`, but it returns anyway.

All four versions behave identically. Here is proof:

```js
// Step 1: a function declaration
function add1(a, b) {
  return a + b;
}

// Step 2: a function expression
const add2 = function (a, b) {
  return a + b;
};

// Step 3: an arrow function with braces
const add3 = (a, b) => {
  return a + b;
};

// Step 4: an arrow function with an implicit return
const add4 = (a, b) => a + b;

console.log(add1(2, 3), add2(2, 3), add3(2, 3), add4(2, 3));
```

Output:

```text
5 5 5 5
```

### Step 5: one parameter, and no parameters

When there is **exactly one** parameter, the round brackets around it are optional:

```js
const double1 = (n) => n * 2;
const double2 = n => n * 2;
console.log(double1(21), double2(21));
```

Output:

```text
42 42
```

Both are fine. Some teams always keep the brackets, because it looks consistent and makes adding a second parameter later easier. Budget Buddy keeps them. You will see both styles in the wild, so learn to read both.

With **no** parameters you must keep empty brackets, so JavaScript knows where the parameter list is:

```js
const rollDice = () => Math.floor(Math.random() * 6) + 1;
```

And with a **default parameter**, you must keep the brackets too:

```js
const greet = (name = "friend") => "Hello, " + name + "!";
```

Here is the whole journey on one small card. Keep it handy for the exercises:

```text
function double(n) {      1. declaration
  return n * 2;
}

const double = function (n) {      2. expression
  return n * 2;
};

const double = (n) => {      3. arrow with braces
  return n * 2;
};

const double = (n) => n * 2;      4. arrow, implicit return

const double = n => n * 2;      5. one parameter, no brackets
```

::: try Walk the five steps yourself
1. In `coding-practice`, create `phase-4/arrows.js`.
2. Type in the `add1` to `add4` program above and run it with `node phase-4/arrows.js`. You should see `5 5 5 5`.
3. Now do the same journey on your own for a function called `vatOn`, which returns `price * 0.15`. Write it five times in the same file, as `vat1` to `vat5`, one for each step on the card. (For `vat5`, drop the brackets around the single parameter.)
4. Add `console.log(vat1(200), vat2(200), vat3(200), vat4(200), vat5(200));` and run it. You should see `30 30 30 30 30`.
5. **Change it, predict, run.** In `vat4`, put curly braces around `price * 0.15` but do *not* add `return`. Predict what `vat4(200)` gives now. Run it. Then read the next section.
:::

## The curly-brace trap

This one catches **everyone**, including experienced programmers on a tired day:

```js
const add = (a, b) => { a + b };
console.log(add(2, 3));
```

Output:

```text
undefined
```

No error, only `undefined`. Why?

Because of the rule: **curly braces after the arrow mean "here is a normal function body"**. And in a normal body, nothing is returned unless you write `return`. The line `a + b` is worked out, then thrown away. The function ends without returning, so it gives back `undefined`, just like the logging functions in [Return values](#/phase-04-functions/03-return-values).

There are two correct ways to fix it. Pick one:

```text
const add = (a, b) => a + b;              no braces: implicit return
const add = (a, b) => { return a + b; };  braces: write return yourself
```

The rule, in one line: **no braces, automatic return. Braces, you write `return`.**

## Longer arrow functions

When a function needs more than one line (an `if`, a loop, some variables), use the braces version and write `return` as normal:

```js
const ticketPrice = (age) => {
  if (age < 12) {
    return 40;
  }
  if (age >= 65) {
    return 50;
  }
  return 80;
};

console.log(ticketPrice(8));
console.log(ticketPrice(35));
console.log(ticketPrice(70));
```

Output:

```text
40
80
50
```

This works perfectly. But notice that it is not much shorter than a declaration. Arrow functions really shine for **one-line** helpers. For longer functions, many people prefer declarations, which brings us to the question of which to use.

An arrow function can also do something rather than return something, such as print. It returns `undefined`, like any function that has no `return`:

```js
const cheer = () => console.log("Hooray!");
const result = cheer();
console.log(result);
```

Output:

```text
Hooray!
undefined
```

::: predict What does this print?
```js
const square = n => n * n;
const half = (n) => { n / 2 };
const describe = (name, age) => `${name} is ${age}`;
const shout = (word) => {
  return word.toUpperCase() + "!";
};

console.log(square(5));
console.log(half(10));
console.log(describe("Zinhle", 19));
console.log(shout("eish"));
```
:::

::: solution
```text
25
undefined
Zinhle is 19
EISH!
```
`half` fell into the curly-brace trap: braces, but no `return`. Fix it with `const half = (n) => n / 2;`. The other three are fine: `square` and `describe` use implicit returns, and `shout` uses braces *with* a `return`.
:::

## Which style should I use?

All three styles work, and you will meet all three. Here is a simple rule that serves beginners well, and it is the rule Budget Buddy follows:

| Use a... | For... | Example |
|---|---|---|
| **function declaration** | the main, named steps of your program, and anything longer than a few lines | `function showMenu() { ... }`, `function askForAmount(question) { ... }` |
| **arrow function** | short helpers that work out and return one value | `const isEven = (n) => n % 2 === 0;` |
| **arrow function** | functions you pass to other functions (from [Phase 7](#/phase-07-functions-as-values/01-passing-functions-to-functions)) | You will see these soon |

The plain function expression (`const f = function () {...}`) is mainly a stepping stone between the two. You will see it in older code, and it is good to recognise it, but you rarely need to write one.

::: note A difference you can ignore for now
Arrow functions behave differently from other functions with a special word called `this`. It only matters when functions live inside objects, which is much later ([Phase 6](#/phase-06-objects/03-objects-and-functions)). Until then, it makes no difference at all. If you read about it online, that is what people mean.
:::

## When you can call them: declarations first, expressions later

There is one real difference in behaviour. A function **declaration** can be called *before* the line where it is written, because JavaScript reads all declarations before it runs anything. (This is called **hoisting**, meaning "lifted to the top".) A function **expression** or **arrow function** is stored in a `const`, and like any `const`, it cannot be used before its line:

```js
console.log(square(4));

function square(n) {
  return n * n;
}
```

Output:

```text
16
```

```js
console.log(square(4));

const square = (n) => n * n;
```

Output:

```text
ReferenceError: Cannot access 'square' before initialization
```

This is the same error you saw in [Variables](#/phase-01-storing-information/02-variables) when you used a variable on the line before it was created. The simple habit from lesson one avoids it completely: **define your functions near the top, and call them below.**

::: exercise Level 1 — Guided · Five steps with triple
Create `phase-4/triple.js`.

1. Write a function declaration `triple1(n)` that returns `n * 3`.
2. Write the same as a function expression, `triple2`. Remember the semicolon after the closing brace.
3. Write it as an arrow function with braces and `return`, `triple3`.
4. Write it as an arrow function with an implicit return, `triple4`.
5. Write it as an arrow function with no brackets around the parameter, `triple5`.
6. Print all five with the argument `7` in one `console.log`. Run it. You should see `21 21 21 21 21`.
:::

::: solution
```js
function triple1(n) {
  return n * 3;
}

const triple2 = function (n) {
  return n * 3;
};

const triple3 = (n) => {
  return n * 3;
};

const triple4 = (n) => n * 3;

const triple5 = n => n * 3;

console.log(triple1(7), triple2(7), triple3(7), triple4(7), triple5(7));
```
Output:
```text
21 21 21 21 21
```
:::

::: exercise Level 2 — On your own · Convert these to arrow functions
Create `phase-4/to-arrows.js`. Rewrite each function as an arrow function stored in a `const`, in the **shortest correct form**. Keep the same names. Then call each one to check it still works.

```js
function tipFor(bill) {
  return bill * 0.1;
}

function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function formatMoney(amount) {
  return `R${amount.toFixed(2)}`;
}

function isAdult(age) {
  return age >= 18;
}

function fullName(first, last) {
  return `${first} ${last}`;
}

function sayGoodbye() {
  return "Hamba kahle!";
}

function greet(name = "friend") {
  return `Hi ${name}!`;
}

function gradeFor(mark) {
  if (mark >= 80) {
    return "A";
  }
  if (mark >= 50) {
    return "Pass";
  }
  return "Fail";
}
```

Test with: `tipFor(250)`, `celsiusToFahrenheit(30)`, `formatMoney(7.5)`, `isAdult(17)`, `fullName("Thandiwe", "Mokoena")`, `sayGoodbye()`, `greet()` and `gradeFor(64)`.
:::

::: hint
Seven of the eight have a body that is only a `return`, so they become one line with an implicit return. Watch the brackets: no parameters needs `()`, two parameters needs `(first, last)`, and a default needs `(name = "friend")`. One of the eight has more than a `return` in its body, so it must keep its braces and its `return` statements.
:::

::: solution
```js
const tipFor = (bill) => bill * 0.1;

const celsiusToFahrenheit = (celsius) => celsius * 9 / 5 + 32;

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isAdult = (age) => age >= 18;

const fullName = (first, last) => `${first} ${last}`;

const sayGoodbye = () => "Hamba kahle!";

const greet = (name = "friend") => `Hi ${name}!`;

const gradeFor = (mark) => {
  if (mark >= 80) {
    return "A";
  }
  if (mark >= 50) {
    return "Pass";
  }
  return "Fail";
};

console.log(tipFor(250));
console.log(celsiusToFahrenheit(30));
console.log(formatMoney(7.5));
console.log(isAdult(17));
console.log(fullName("Thandiwe", "Mokoena"));
console.log(sayGoodbye());
console.log(greet());
console.log(gradeFor(64));
```
Output:
```text
25
86
R7.50
false
Thandiwe Mokoena
Hamba kahle!
Hi friend!
Pass
```
The one-parameter functions could also drop their brackets (`bill => bill * 0.1`). Both are correct. `gradeFor` works as an arrow, but it is a good example of a function that reads better as a declaration.
:::

::: exercise Level 2 — On your own · And back again
Going the other way is just as useful, because you will often read arrow code and need to understand it. Create `phase-4/to-declarations.js` and rewrite each of these as a normal **function declaration** with a `return`:

```js
const square = n => n * n;

const isOdd = (n) => n % 2 !== 0;

const taxiFare = (distanceKm, ratePerKm = 10) => 25 + distanceKm * ratePerKm;

const unitsFor = (amount) => amount / 2.85;

const shout = word => word.toUpperCase() + "!";

const countdown = () => {
  for (let i = 3; i >= 1; i--) {
    console.log(i);
  }
  console.log("Go!");
};
```

Call each one to check: `square(9)`, `isOdd(7)`, `taxiFare(4)`, `unitsFor(57).toFixed(1)`, `shout("yebo")` and `countdown()`.
:::

::: hint
For each one: write `function`, the name, the parameters in brackets (add brackets if there were none), and a body in braces. If the arrow had no braces, the body is `return` followed by whatever came after the arrow. `countdown` already has braces and no return value, so its body stays the same.
:::

::: solution
```js
function square(n) {
  return n * n;
}

function isOdd(n) {
  return n % 2 !== 0;
}

function taxiFare(distanceKm, ratePerKm = 10) {
  return 25 + distanceKm * ratePerKm;
}

function unitsFor(amount) {
  return amount / 2.85;
}

function shout(word) {
  return word.toUpperCase() + "!";
}

function countdown() {
  for (let i = 3; i >= 1; i--) {
    console.log(i);
  }
  console.log("Go!");
}

console.log(square(9));
console.log(isOdd(7));
console.log(taxiFare(4));
console.log(unitsFor(57).toFixed(1));
console.log(shout("yebo"));
countdown();
```
Output:
```text
81
true
65
20.0
YEBO!
3
2
1
Go!
```
:::

::: debug Three arrows that miss
Each of these is meant to work, but does not. Run each one and fix it.

```js
// Program A: should print 30 (a 10% tip on R300)
const tipFor = (bill) => { bill * 0.1 };
console.log(tipFor(300));
```

```js
// Program B: should print 5
const add = (a, b) -> a + b;
console.log(add(2, 3));
```

```js
// Program C: should print "R99.00"
console.log(formatMoney(99));

const formatMoney = (amount) => `R${amount.toFixed(2)}`;
```
:::

::: solution
**A:** It prints `undefined`. This is the curly-brace trap: the braces make it a normal body, and there is no `return`. Either remove the braces, `const tipFor = (bill) => bill * 0.1;`, or add the `return`, `const tipFor = (bill) => { return bill * 0.1; };`.

**B:** `SyntaxError: Unexpected token '>'`, with the `^` under the `>`. The arrow is `=>` (equals, greater than), not `->`. Other languages use `->`, which makes this a common slip.

**C:** `ReferenceError: Cannot access 'formatMoney' before initialization`. An arrow function lives in a `const`, and cannot be used before its line. Move the `const formatMoney = ...` line above the `console.log`.
:::

::: mistake
**Braces with no `return`.** `(a, b) => { a + b }` returns `undefined`. No braces means automatic return. Braces mean you write `return`.

**Typing `->` instead of `=>`.** The arrow is an equals sign followed by a greater-than sign.

**Dropping the brackets when you should not.** You may leave them out only with exactly **one** plain parameter. No parameters needs `()`. Two or more need `(a, b)`. A default needs `(name = "friend")`.

**Calling an arrow function before its line.** Arrow functions and function expressions are stored in `const`, so define them first.

**Forgetting the semicolon after a function expression's closing brace.** `const f = function () { ... };` is one statement and ends with `;`. (JavaScript usually copes without it, but it is a good habit.)
:::

## Real-world uses

- **Small helpers everywhere.** Real codebases are full of one-line arrows like `const isWeekend = (day) => day === "Saturday" || day === "Sunday";` and `const formatMoney = (amount) => ...`.
- **Passing functions to other functions.** This is the arrow function's biggest job. In [Phase 7](#/phase-07-functions-as-values/01-passing-functions-to-functions) you will write things like "keep only the expenses over R100" or "sort from biggest to smallest" by handing a tiny arrow function to JavaScript. You will see arrows on nearly every line there.
- **Reading other people's code.** Tutorials, documentation, and answers online use arrows constantly. Being able to translate an arrow back into a declaration in your head is a real skill.

::: connect
**This builds on:** everything in this phase so far: parameters, default values, `return`, and scope all work the same inside arrow functions. The "cannot access before initialization" error comes straight from `const` in [let and const](#/phase-01-storing-information/03-let-and-const).

**This unlocks:** the idea that functions are values, which is the heart of [Phase 7](#/phase-07-functions-as-values/01-passing-functions-to-functions). Before that, [Designing programs with functions](#/phase-04-functions/06-designing-with-functions) shows how to break a whole program into small functions, including arrow helpers, and how to test them.
:::

::: challenge An electricity price table
Create `phase-4/electricity-table.js`. Using **arrow functions** for the helpers:

- `unitsFor(amount, pricePerUnit = 2.85)` returns the units an amount buys.
- `formatMoney(amount)` returns a string like `R50.00`.
- `formatUnits(units)` returns a string like `17.5 kWh` (one decimal place).

Then use a `for` loop that goes from R50 to R300 in steps of R50, printing one line per amount, like `R50.00 buys 17.5 kWh`.

**Extra:** add a helper `isEnoughForMonth(units)` that returns `true` when the units are at least 90 (enough for a small flat for a month), and add `(enough for the month)` to the lines where it is true.
:::

::: hint
The loop is `for (let amount = 50; amount <= 300; amount += 50)`. Inside it, call `unitsFor(amount)` once, store the result, and use the other helpers to build the line. For the extra part, a ternary is neat: `isEnoughForMonth(units) ? " (enough for the month)" : ""`.
:::

::: solution
```js
const unitsFor = (amount, pricePerUnit = 2.85) => amount / pricePerUnit;
const formatMoney = (amount) => `R${amount.toFixed(2)}`;
const formatUnits = (units) => `${units.toFixed(1)} kWh`;
const isEnoughForMonth = (units) => units >= 90;

for (let amount = 50; amount <= 300; amount += 50) {
  const units = unitsFor(amount);
  const note = isEnoughForMonth(units) ? " (enough for the month)" : "";
  console.log(`${formatMoney(amount)} buys ${formatUnits(units)}${note}`);
}
```
Output:
```text
R50.00 buys 17.5 kWh
R100.00 buys 35.1 kWh
R150.00 buys 52.6 kWh
R200.00 buys 70.2 kWh
R250.00 buys 87.7 kWh
R300.00 buys 105.3 kWh (enough for the month)
```
Look at how the loop body reads: work out the units, decide on the note, print a formatted line. The helpers hide the details.
:::

::: recap
- A function is a **value**. `typeof` a function is `"function"`, and it can be stored in a variable.
- A **function expression** stores a function in a variable: `const add = function (a, b) { return a + b; };`
- An **arrow function** drops the word `function` and adds `=>`: `const add = (a, b) => { return a + b; };`
- With no braces, an arrow has an **implicit return**: `const add = (a, b) => a + b;`
- One parameter can drop its brackets (`n => n * 2`). No parameters needs `()`.
- **The trap:** `=> { a + b }` returns `undefined`. Braces mean you must write `return`.
- A beginner's rule: declarations for the main steps and longer functions, arrows for short helpers (and, in Phase 7, for passing functions around).
- Declarations can be called before their line (**hoisting**). Expressions and arrows cannot.
:::

::: interview Rewrite `function isEven(n) { return n % 2 === 0; }` as an arrow function.
`const isEven = (n) => n % 2 === 0;` (or `const isEven = n => n % 2 === 0;`). The body was only a `return`, so the braces and the word `return` can go, and the value is returned automatically.
:::

::: interview Why does `const add = (a, b) => { a + b };` return `undefined`?
Curly braces after the arrow make a normal function body, and a normal body only returns a value if you write `return`. Without it, the function returns `undefined`. Remove the braces for an implicit return, or write `return a + b;` inside them.
:::

::: interview What is one practical difference between a function declaration and an arrow function stored in a `const`?
A declaration can be called before the line it is written on (it is hoisted), while an arrow function in a `const` cannot: calling it early gives "Cannot access before initialization". (Arrow functions also treat `this` differently, which matters later with objects.)
:::

::: checkpoint
- [ ] I ran the `add1` to `add4` program and saw `5 5 5 5`
- [ ] I walked `vatOn` and `triple` through all five steps myself
- [ ] I fell into the curly-brace trap on purpose and fixed it both ways
- [ ] I converted all eight functions to arrows, and all six arrows back to declarations
- [ ] I saw "Cannot access before initialization" and know how to avoid it
- [ ] I can say the rule "no braces, automatic return; braces, write return" without looking
:::

::: resources
- **javascript.info, "Function expressions":** https://javascript.info/function-expressions. Explains functions as values and the difference in when you can call them.
- **javascript.info, "Arrow functions, the basics":** https://javascript.info/arrow-functions-basics. Short and clear, with a few conversion tasks at the end.
- **MDN, "Arrow function expressions":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions. The full reference. Read the first examples, and skip the parts about `this` for now.
:::
