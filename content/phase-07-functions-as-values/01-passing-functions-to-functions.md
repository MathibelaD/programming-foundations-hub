---
title: Passing functions to functions (callbacks)
summary: A function is a value, so you can hand it to another function. This one idea unlocks the whole of Phase 7.
minutes: 45
stage: Phase 7
---

## What you will learn

- Why you can pass a function into another function, the same way you pass a number or a string
- What a **callback** is, and the difference between `cheer` and `cheer()`
- How to write `repeat(times, action)` and `processEach(array, action)`, your very own "do this to every item" tool
- How to pass a named function, or write a small arrow function right where you need it

**Before this:** [Project: Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6). You should be comfortable with arrow functions ([Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions)) and looping over arrays ([Looping through arrays](#/phase-05-arrays/03-looping-through-arrays)).

## The problem: loops that are almost the same

Here are two small programs. The first cheers three times. The second rolls a dice three times.

```js
for (let i = 1; i <= 3; i++) {
  console.log("Hip hip hooray!");
}

for (let i = 1; i <= 3; i++) {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log("You rolled", roll);
}
```

Output (your dice numbers will be different, because they are random):

```text
Hip hip hooray!
Hip hip hooray!
Hip hip hooray!
You rolled 6
You rolled 1
You rolled 2
```

Look closely at the two loops. The **loop part** is identical: start at 1, keep going while `i <= 3`, add 1 each time. Only the **body**, the thing that happens each time, is different.

In Phase 4 you learned that copied code is a warning sign. When the same lines appear twice, you put them in a function and give the differences as parameters. But until now, the differences have always been *values*: a name, a price, a number of times. Here the difference is not a value. It is an **action**: "cheer" in one loop, "roll a dice" in the other.

So the question for this lesson is: **can a parameter hold an action?**

Yes. And once you see how, the rest of Phase 7 will feel like a series of small "oh, that's all it is" moments.

## A quick reminder: functions are values

In [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions) you stored a function in a variable:

```js
const cheer = () => {
  console.log("Hip hip hooray!");
};

console.log(typeof cheer);
console.log(cheer);

const shout = cheer;
shout();
```

Output:

```text
function
[Function: cheer]
Hip hip hooray!
```

Three things to notice:

1. `typeof cheer` says `function`. A function is a kind of value, like `number` or `string`.
2. `console.log(cheer)` does not run the function. It prints a description of it: `[Function: cheer]`. That is Node's way of saying "this box holds a function called cheer".
3. `const shout = cheer;` copies the function into a second box. Now `shout()` does the same thing as `cheer()`.

If a function can go into a variable, it can go anywhere a value can go. That includes **into another function as an argument**.

## The most important pair of brackets in this phase

Before we pass functions around, you need to be completely clear on one small thing. These two are very different:

| You write | What it means | What you get |
|---|---|---|
| `cheer` | "the function called cheer" (the recipe card) | the function itself |
| `cheer()` | "run cheer, now" (cook the recipe) | whatever `cheer` **returns** |

```js
function cheer() {
  console.log("Hip hip hooray!");
}

console.log(cheer);
console.log(cheer());
```

Output:

```text
[Function: cheer]
Hip hip hooray!
undefined
```

The first line prints the function itself. The second line *runs* `cheer` (which prints "Hip hip hooray!"), and then prints what `cheer` returned. `cheer` has no `return`, so it returned `undefined`, as you learned in [Return values](#/phase-04-functions/03-return-values).

Keep this table in your head for the whole phase. Without brackets: *here is the recipe*. With brackets: *cook it now*.

::: quiz
What does this program print, in total?

```js
function greet() {
  console.log("Dumela!");
  return "done";
}

const a = greet;
const b = greet();
console.log(typeof a, typeof b);
```

- [ ] `Dumela!` twice, then `string string`
- [x] `Dumela!` once, then `function string`
- [ ] `Dumela!` once, then `function undefined`
- [ ] Only `function string`

`const a = greet;` has no brackets, so nothing runs: `a` is the function itself. `const b = greet();` runs it once, which prints `Dumela!`, and `b` gets the return value, the string `"done"`. If you picked "twice", you thought `a = greet` also ran the function. If you picked `undefined`, look again: this `greet` does have a `return`.
:::

## Your first function that takes a function

```js
function doTwice(action) {
  action();
  action();
}

function cheer() {
  console.log("Hip hip hooray!");
}

function clap() {
  console.log("*clap* *clap*");
}

doTwice(cheer);
doTwice(clap);
```

Output:

```text
Hip hip hooray!
Hip hip hooray!
*clap* *clap*
*clap* *clap*
```

Walk through `doTwice(cheer)` slowly:

1. We call `doTwice` and hand it `cheer`, **without brackets**. We are giving it the recipe card, not cooking the recipe.
2. Inside `doTwice`, the parameter `action` now holds the `cheer` function. `action` is another name for the same function, the same way `shout` was a new name for `cheer` above.
3. `action();` runs it. `action();` runs it again.

`doTwice` has no idea what it is doing twice. It does not know about cheering or clapping. Its only job is "do the thing you gave me, twice". That is exactly what we wanted: the *repeating* part is written once, and the *action* is handed in.

::: quiz
What happens when you run this?

```js
function doTwice(action) {
  action();
  action();
}

function beep() {
  console.log("beep");
}

doTwice(beep());
```

- [ ] It prints `beep` twice.
- [ ] It prints `beep` three times.
- [ ] It crashes before printing anything.
- [x] It prints `beep` once, then crashes with `TypeError: action is not a function`.

The brackets in `beep()` run `beep` **straight away**, before `doTwice` starts. That prints `beep` once, and `beep` returns `undefined`. So `doTwice` receives `undefined` as `action`, and `action()` fails: you cannot call `undefined`. To hand over the function itself, write `doTwice(beep)` with no brackets.
:::

## Callbacks: "we'll call you"

A function that you hand to another function, so that the other function can run it, has a special name: a **callback**. In `doTwice(cheer)`, `cheer` is the callback.

::: analogy The restaurant buzzer
You arrive at a busy restaurant. There is no table free. The host does not make you stand at the door staring at the tables. Instead, they hand you a little buzzer (or take your phone number) and say, "We'll call you when your table is ready."

- You gave the restaurant **a way to reach you**, not yourself. You did not climb into their booking book.
- **They** decide *when* to use it. You do not buzz yourself.
- They might use it once, or (if they are very keen) several times.

A callback is the same. When you write `doTwice(cheer)`, you are not running `cheer`. You are handing `doTwice` a way to run it, and saying "call this when you need to". `doTwice` decides when, and how many times.

If you wrote `doTwice(cheer())`, that would be like shouting "Is my table ready?" at the door before you have even sat down. You get an answer (probably `undefined`) instead of a buzzer, and the restaurant has nothing to call later.
:::

The word "callback" is used everywhere in programming. When you hear it, think: *a function I gave to someone else, so they can call it back later.*

::: try Hand a function to a function
1. In your `coding-practice` folder, create a new folder called `phase-7`. In it, create `callbacks.js`.
2. Type this in yourself:
   ```js
   function doTwice(action) {
     action();
     action();
   }

   function cheer() {
     console.log("Hip hip hooray!");
   }

   function clap() {
     console.log("*clap* *clap*");
   }

   doTwice(cheer);
   doTwice(clap);
   ```
3. Save, and from inside `coding-practice` run:
   ```bash
   node phase-7/callbacks.js
   ```
4. You should see:
   ```text
   Hip hip hooray!
   Hip hip hooray!
   *clap* *clap*
   *clap* *clap*
   ```
5. **Now experiment.** Write a third function, `stomp`, that prints `*STOMP*`. Before you add `doTwice(stomp);`, predict how many new lines will appear. Run it and check.
6. Then add `console.log(doTwice);` at the bottom. Predict what it prints. (Hint: no brackets after `doTwice`.)
:::

## Build `repeat(times, action)`

`doTwice` always does things twice. Let us add a second parameter so the caller chooses how many times. This is the loop from the start of the lesson, with the action handed in.

```js
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action();
  }
}

function cheer() {
  console.log("Hip hip hooray!");
}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log("You rolled", roll);
}

repeat(3, cheer);
repeat(2, rollDie);
```

Output (your rolls will differ):

```text
Hip hip hooray!
Hip hip hooray!
Hip hip hooray!
You rolled 2
You rolled 2
```

Compare this with the two loops at the top of the lesson. The `for` loop is now written **once**, inside `repeat`. Each time we use it, we pass in two things: *how many times* (a number) and *what to do* (a function).

### Passing information to the callback

Sometimes the callback needs to know something, like which round it is on. The function doing the calling can pass arguments to the callback, the same way you pass arguments to any function:

```js
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

repeat(3, (round) => {
  console.log(`Round ${round}: fight!`);
});

repeat(4, (lap) => console.log(`Lap ${lap} of 4`));
```

Output:

```text
Round 1: fight!
Round 2: fight!
Round 3: fight!
Lap 1 of 4
Lap 2 of 4
Lap 3 of 4
Lap 4 of 4
```

Two new things here.

**First, `action(i)`.** `repeat` now hands the loop counter to the callback each time it calls it. The callback receives it as its parameter. We called that parameter `round` in the first call and `lap` in the second. The name is up to the person writing the callback. `repeat` does not care what you call it; it only cares that it passes a number in.

**Second, the arrow functions are written right inside the brackets.** We did not create a named function first. We wrote a small arrow function exactly where it was needed. This is called an **inline** function (or an *anonymous* function, because it has no name). It is the most common way you will see callbacks written, and it is the main reason arrow functions exist.

Read the second call out loud like this: "repeat 4 times: given a lap number, print 'Lap *number* of 4'".

::: note Named or inline?
Both work, and both are common.

- **Pass a named function** (`repeat(3, cheer)`) when the action has a clear name, is long, or is used in several places. The code reads like English: "repeat 3 times: cheer".
- **Write an inline arrow** (`repeat(3, (round) => ...)`) when the action is short and used only once. You can see the whole thing in one place.

If an inline arrow grows past three or four lines, that is a hint to pull it out and give it a name.
:::

::: quiz
What does this print?

```js
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

let total = 0;
repeat(4, (n) => {
  total = total + n * n;
});
console.log(total);
```

- [ ] `14`
- [x] `30`
- [ ] `16`
- [ ] `10`

`repeat` calls the callback with 1, 2, 3 and 4 (the loop uses `<=`). Each call adds `n * n`, so the total is 1 + 4 + 9 + 16 = 30. The callback can change `total` because it can see the variables around it. If you picked `14`, you stopped at 3. If you picked `16`, you kept only the last square instead of adding them all up.
:::

## The key moment: `processEach`

Now let us do the same thing with **arrays**. Here are two loops from Phase 5 style code. One prints prices, one greets people:

```js
const prices = [18.5, 32, 7.99];
const names = ["Thabo", "Aisha", "Lerato"];

for (const price of prices) {
  console.log(`R${price.toFixed(2)}`);
}

for (const name of names) {
  console.log(`Hello, ${name}!`);
}
```

Output:

```text
R18.50
R32.00
R7.99
Hello, Thabo!
Hello, Aisha!
Hello, Lerato!
```

Same shape again. "For each item in the list, do something with it." Only two things change between the loops:

- **which array** we walk through, and
- **what we do** with each item.

Both of those can be parameters. So let us write a function that walks through *any* array and does *any* action to each item:

```js
function processEach(array, action) {
  for (const item of array) {
    action(item);
  }
}

const prices = [18.5, 32, 7.99];
const names = ["Thabo", "Aisha", "Lerato"];

function printPrice(price) {
  console.log(`R${price.toFixed(2)}`);
}

processEach(prices, printPrice);
processEach(names, (name) => console.log(`Hello, ${name}!`));
```

Output:

```text
R18.50
R32.00
R7.99
Hello, Thabo!
Hello, Aisha!
Hello, Lerato!
```

Exactly the same output. Look at what `processEach` is: **the `for...of` loop you have been writing since Phase 5**, with one change. Instead of a fixed body, it calls `action(item)`.

> **The loop stays the same. Only the action changes. So pass the action in.**

That sentence is the whole of Phase 7. Every method you meet in the next six lessons (`forEach`, `map`, `filter`, `find`, `some`, `every`, `reduce`, `sort`) is a loop you already know how to write, with some part of it handed in as a callback.

Notice the two styles side by side, too: `printPrice` is a **named** function passed without brackets, and the greeting is an **inline** arrow.

::: try Your own processEach
1. Create `phase-7/process-each.js`.
2. Type this in:
   ```js
   function processEach(array, action) {
     for (const item of array) {
       action(item);
     }
   }

   const shoppingList = ["maize meal", "milk", "tomatoes", "eggs"];

   function addTick(item) {
     console.log(`[ ] ${item}`);
   }

   processEach(shoppingList, addTick);
   processEach(shoppingList, (item) => console.log(item.toUpperCase()));
   ```
3. Run it:
   ```bash
   node phase-7/process-each.js
   ```
4. You should see:
   ```text
   [ ] maize meal
   [ ] milk
   [ ] tomatoes
   [ ] eggs
   MAIZE MEAL
   MILK
   TOMATOES
   EGGS
   ```
5. **Now experiment.** Add a third call that prints each item with its length, like `maize meal (10 letters)`. Write it as an inline arrow. Predict the number for `eggs` before you run it.
:::

### Giving the callback the index too

When you print a numbered list you need the position as well as the item. In Phase 5 you used a counting `for` loop for that. `processEach` can do the same, and hand the callback **two** things:

```js
function processEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i], i);
  }
}

const queue = ["Sipho", "Mei", "Kwame", "Priya"];

processEach(queue, (person, index) => {
  console.log(`${index + 1}. ${person}`);
});

processEach(queue, (person) => console.log(`${person} has been served.`));
```

Output:

```text
1. Sipho
2. Mei
3. Kwame
4. Priya
Sipho has been served.
Mei has been served.
Kwame has been served.
Priya has been served.
```

`processEach` always passes two arguments: the item and its index. The first callback asks for both, `(person, index)`. The second callback only asks for one, `(person)`, and the extra argument is quietly ignored. That is normal JavaScript: a function may take fewer parameters than it is given. You saw the opposite in [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments): a missing argument becomes `undefined`.

It works on arrays of objects too, which is the shape of most real data:

```js
function processEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i], i);
  }
}

const expenses = [
  { description: "Taxi to work", amount: 24 },
  { description: "Bread", amount: 18.5 },
  { description: "Airtime", amount: 50 },
];

processEach(expenses, (expense) => {
  console.log(`${expense.description}: R${expense.amount.toFixed(2)}`);
});
```

Output:

```text
Taxi to work: R24.00
Bread: R18.50
Airtime: R50.00
```

::: predict What does this print?
```js
function callWith(value, fn) {
  fn(value * 2);
}

callWith(5, (n) => console.log(n + 1));
callWith(10, console.log);
```
Two lines of output. Work out each one before you open the answer. The second call is a little sneaky.
:::

::: solution
```text
11
20
```
First call: `value` is 5, so `callWith` runs `fn(10)`. The callback adds 1 and prints `11`.

Second call: `value` is 10, so `callWith` runs `fn(20)`. And what is `fn`? It is `console.log` itself, passed **without brackets**. So `fn(20)` is the same as `console.log(20)`. `console.log` is a function like any other, so you can hand it over as a callback.
:::

::: exercise Level 1 — Guided · Countdown with repeat
Create `phase-7/countdown.js`.

1. Copy the second version of `repeat` (the one that calls `action(i)`).
2. Call `repeat(5, ...)` with an inline arrow that takes one parameter called `step`.
3. Inside the arrow, print `6 - step`. That way step 1 prints 5, step 2 prints 4, and so on.
4. After the `repeat` call, print `Lift off!`.
5. Run it. You should see 5, 4, 3, 2, 1 and then `Lift off!`.
:::

::: solution
```js
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

repeat(5, (step) => console.log(6 - step));
console.log("Lift off!");
```
Output:
```text
5
4
3
2
1
Lift off!
```
:::

::: exercise Level 2 — On your own · Backwards through a playlist
Write a function `processEachBackwards(array, action)` that works like `processEach`, but visits the items from the **last to the first**. It should pass the callback both the item and its index.

Test it with `const songs = ["Jerusalema", "Pata Pata", "Paradise Road"];` and a callback that prints each song with its number (index + 1). The last song should print first, as `3. Paradise Road`.
:::

::: hint
You need a counting loop that starts at the last index, `array.length - 1`, keeps going while `i >= 0`, and steps with `i--`. You wrote loops like this in [The for loop](#/phase-03-loops/03-for-loops).
:::

::: solution
```js
function processEachBackwards(array, action) {
  for (let i = array.length - 1; i >= 0; i--) {
    action(array[i], i);
  }
}

const songs = ["Jerusalema", "Pata Pata", "Paradise Road"];

processEachBackwards(songs, (song, index) => {
  console.log(`${index + 1}. ${song}`);
});
```
Output:
```text
3. Paradise Road
2. Pata Pata
1. Jerusalema
```
Notice that the callback did not change at all. You could hand the same callback to `processEach` and get the forwards order. The *order* lives in one function, the *action* lives in another.
:::

::: debug Nobody gets welcomed properly
Each of these programs is meant to print `Welcome, Siya!`, `Welcome, Cheslin!` and `Welcome, Eben!`. Neither works. Run each one, read what happens, and fix it.

```js
// Program A
function processEach(array, action) {
  for (const item of array) {
    action();
  }
}

const players = ["Siya", "Cheslin", "Eben"];

processEach(players, (player) => console.log(`Welcome, ${player}!`));
```

```js
// Program B
function processEach(array, action) {
  for (const item of array) {
    action(item);
  }
}

function welcome(player) {
  console.log(`Welcome, ${player}!`);
}

const players = ["Siya", "Cheslin", "Eben"];

processEach(players, welcome());
```
:::

::: solution
**Program A** prints:
```text
Welcome, undefined!
Welcome, undefined!
Welcome, undefined!
```
The callback is called three times, but it is never *given* anything. `action()` has empty brackets, so `player` is `undefined` every time. Fix: `action(item);`. The function doing the calling must pass the item in.

**Program B** prints one `Welcome, undefined!` and then crashes:
```text
TypeError: action is not a function
```
Node points at the `action(item);` line inside `processEach`. The real mistake is on the last line: `welcome()` has brackets, so it runs `welcome` **immediately**, with no argument (hence the one `Welcome, undefined!`). `welcome` returns `undefined`, and *that* is what gets passed as `action`. Then `processEach` tries to call `undefined` like a function. Fix: pass the function without brackets, `processEach(players, welcome);`.
:::

::: mistake
**Adding brackets when passing a function.** `doTwice(cheer())` runs `cheer` straight away and passes its return value (usually `undefined`). The error you will see is `TypeError: action is not a function`. Pass the function itself: `doTwice(cheer)`.

**Forgetting to pass the item to the callback.** Inside your own helper, `action()` gives the callback nothing. Write `action(item)`.

**Thinking the parameter name must match.** `processEach` calls `action(item)`, but your callback can call its parameter `price`, `name`, `player`, anything. Pick the name that describes one item of *this* list.

**Worrying about "where does `person` come from?".** Nobody declared it with `let`. It is a parameter of the arrow function, and it gets its value when `processEach` calls the arrow with `action(array[i], i)`. If this feels like magic, follow the call with your finger: `processEach` → loop → `action(...)` → your arrow runs with the item.
:::

::: quiz
What does this print?

```js
function processEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i], i);
  }
}

const codes = ["JHB", "CPT", "DUR"];
let out = "";
processEach(codes, (index, code) => {
  out = out + index;
});
console.log(out);
```

- [ ] `012`
- [ ] `JHB0CPT1DUR2`
- [ ] `undefinedundefinedundefined`
- [x] `JHBCPTDUR`

`processEach` always calls `action(item, index)`, in that order. The callback's parameters are filled by **position**, not by name. So the first parameter, which the callback happens to call `index`, receives the item (`"JHB"`, then `"CPT"`, then `"DUR"`). If you picked `012`, you trusted the name. Names are only labels you choose; the order decides what goes in.
:::

## Real-world uses

Callbacks are one of the most used ideas in all of programming, including in languages other than JavaScript:

- **Buttons on a website.** A web page says "when this button is clicked, call this function". The page decides *when*; you decide *what*.
- **Waiting for slow things.** "When the file has finished downloading, call this function." The program carries on with other work and calls you back later, exactly like the restaurant buzzer.
- **Sorting.** An app sorting products by price, by rating or by name uses the same sorting code each time and passes in a small "which comes first?" function. You will write these in [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining).
- **Every array method in this phase.** `forEach`, `map`, `filter` and friends all take a callback.

You will not write button or download code in this course, but when you meet it later, it will be this same idea.

::: connect
**This builds on:** [arrow functions](#/phase-04-functions/05-arrow-functions) (functions are values), [looping through arrays](#/phase-05-arrays/03-looping-through-arrays), and the loops you wrote by hand in [classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand).

**This unlocks:** the rest of this phase. Your `processEach` is, almost line for line, a method JavaScript already gives every array. Next lesson, [forEach](#/phase-07-functions-as-values/02-foreach), you meet it by its real name.
:::

::: challenge Count the ones that pass
So far our callbacks have only *done* something (printed). A callback can also *answer a question* and hand the answer back with `return`.

Write `countWhere(array, test)`. It should loop over the array, call `test(item)` for each item, and count how many times `test` returns `true`. Return the count.

Use it with `const marks = [72, 45, 88, 50, 39, 65];` to count:
1. how many marks are 50 or more (a pass),
2. how many are 80 or more (a distinction).

Then use the *same* `countWhere` to count non-empty names in `["", "Zola", " ", "Ana"]` (treat a name made only of spaces as empty).
:::

::: solution
```js
function countWhere(array, test) {
  let count = 0;
  for (const item of array) {
    if (test(item)) {
      count++;
    }
  }
  return count;
}

const marks = [72, 45, 88, 50, 39, 65];

console.log(countWhere(marks, (mark) => mark >= 50));
console.log(countWhere(marks, (mark) => mark >= 80));
console.log(countWhere(["", "Zola", " ", "Ana"], (name) => name.trim() !== ""));
```
Output:
```text
4
1
2
```
This is the **counter pattern** from [loop patterns](#/phase-03-loops/04-loop-patterns), with the `if` test handed in. The callback `(mark) => mark >= 50` returns `true` or `false`, and `countWhere` uses that answer. Hold on to this idea of a callback that answers yes or no. It is exactly how [filter](#/phase-07-functions-as-values/04-filter) works.
:::

::: recap
- Functions are values. You can store them in variables and pass them into other functions as arguments.
- `cheer` is the function itself (the recipe). `cheer()` runs it now and gives you its return value.
- A **callback** is a function you hand to another function so that *it* can call it, when and as often as it decides.
- `repeat(times, action)` and `processEach(array, action)` keep the loop in one place and take the action as a parameter.
- The function doing the calling decides what arguments the callback gets, for example `action(item, index)`. The callback chooses its own parameter names and may ignore extra arguments.
- Pass a **named** function when the action has a good name or is reused. Write an **inline arrow** when it is short and used once.
- The big idea of this phase: *the loop stays the same, only the action changes, so pass the action in.*
:::

::: interview What is a callback, in one or two sentences?
A callback is a function that you pass into another function as an argument, so that the other function can call it later. You provide *what* to do; the other function decides *when* (and how often) to do it.
:::

::: interview What is the difference between `doTwice(cheer)` and `doTwice(cheer())`?
`doTwice(cheer)` passes the function itself, so `doTwice` can run it twice. `doTwice(cheer())` runs `cheer` immediately and passes whatever it returns (often `undefined`), so `doTwice` receives a value that is not a function and crashes with `TypeError: action is not a function`.
:::

::: interview Why would you write `processEach` instead of a plain `for...of` loop each time?
The loop part is the same every time; only the action changes. Writing the loop once and passing the action in removes repeated code, and the call reads like a sentence: "process each price: print it". It is also exactly how JavaScript's built-in array methods work.
:::

::: checkpoint
- [ ] I created `phase-7/callbacks.js` and passed `cheer` and `clap` into `doTwice`
- [ ] I printed a function with `console.log(doTwice)` and saw `[Function: doTwice]`
- [ ] I wrote `processEach` myself and used it with both a named function and an inline arrow
- [ ] I finished the countdown and the backwards playlist exercises
- [ ] I fixed both programs in "Debug this" and can explain why `welcome()` broke things
- [ ] I can say out loud: "the loop stays the same, only the action changes"
:::

::: resources
- **javascript.info, "Function expressions" (see the "Callback functions" section):** https://javascript.info/function-expressions. A short, clear explanation with an example of passing functions around.
- **Eloquent JavaScript, chapter 5 "Higher-Order Functions":** https://eloquentjavascript.net/05_higher_order.html. The idea of functions that take functions, explained with a lot of care.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the `processEach` example and step through it. Watch the arrow function get called once for each item.
:::
