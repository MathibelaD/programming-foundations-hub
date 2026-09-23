---
title: map — transform every item into a new list
summary: Turn a list of one thing into a list of another (prices into prices with VAT, names into shouted names) without touching the original.
minutes: 45
stage: Phase 7
---

## What you will learn

- How the "build a new array of transformed items" loop you wrote in Phase 5 becomes `myMap`, and then `.map`
- The two rules of `map`: the new array is always the **same length**, and the original is **not changed**
- How to use `map` on real data: prices, names, and arrays of objects
- The two classic `map` mistakes: forgetting `return`, and using `map` when you meant `forEach`

**Before this:** [forEach](#/phase-07-functions-as-values/02-foreach). You should also remember the "map by hand" loop from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand).

## The problem: making a new list from an old one

A spaza shop keeps its prices without VAT. At the till, every price needs 15% VAT added. The owner does not want to lose the original prices, because she needs them for her supplier. She wants a **second** list: the same prices, each one transformed.

That is a job you have done before. In Phase 5 you called it **mapping**, or "map by hand". Let us write two of those loops side by side:

```js
const prices = [100, 250, 40];
const withVat = [];
for (const price of prices) {
  withVat.push(price * 1.15);
}
console.log(withVat);

const names = ["thandi", "lucas", "amira"];
const loudNames = [];
for (const name of names) {
  loudNames.push(name.toUpperCase());
}
console.log(loudNames);
```

Output:

```text
[ 114.99999999999999, 287.5, 46 ]
[ 'THANDI', 'LUCAS', 'AMIRA' ]
```

(That `114.99999999999999` is the decimal-number weirdness from [Numbers](#/phase-01-storing-information/04-numbers), the same reason `0.1 + 0.2` is not exactly `0.3`. We will tidy it up in a moment.)

Put your finger on each line of the two loops and compare them:

| Step | VAT loop | Uppercase loop | Same? |
|---|---|---|---|
| Make an empty result array | `const withVat = [];` | `const loudNames = [];` | yes (only the name differs) |
| Go through each item | `for (const price of prices)` | `for (const name of names)` | yes |
| Work out a new value and push it | `price * 1.15` | `name.toUpperCase()` | **no** |
| Use the result | `console.log(withVat)` | `console.log(loudNames)` | yes |

Only one thing changes: **how to turn one old item into one new item**. You know what to do by now. Pass that part in.

::: analogy The photo filter
You pick ten holiday photos on your phone and tap "black and white". The app goes through each photo, makes a black-and-white copy, and puts the copies in a new album.

- You get **exactly ten** photos out. Not nine, not eleven.
- Photo 3 in the new album is the copy of photo 3 from the old album. The order is kept.
- Your **original colour photos are untouched**.
- The app does not care *which* filter you chose. "Black and white", "sepia" and "vintage" all use the same go-through-each-photo process. Only the filter changes.

`map` is that process. You hand it the filter (a function that transforms one item), and it gives you back a new album.
:::

## Step 1: write `myMap`

Take the loop, and swap the changing line for a call to a callback:

```js
function myMap(array, transform) {
  const result = [];
  for (const item of array) {
    result.push(transform(item));
  }
  return result;
}

const prices = [100, 250, 40];
const names = ["thandi", "lucas", "amira"];

console.log(myMap(prices, (price) => price * 1.15));
console.log(myMap(names, (name) => name.toUpperCase()));
```

Output:

```text
[ 114.99999999999999, 287.5, 46 ]
[ 'THANDI', 'LUCAS', 'AMIRA' ]
```

Look carefully at `result.push(transform(item));`. This is new compared with `processEach`. There, the callback's job was to **do** something (print). Here, the callback's job is to **answer a question**: "given this item, what should the new item be?" `myMap` takes the callback's **return value** and pushes it into the result.

So a callback for map must **return** something. Our arrows do, because a one-line arrow without braces returns its value automatically (the implicit return from [arrow functions](#/phase-04-functions/05-arrow-functions)).

::: quiz
Using the `myMap` function from this section, what does this print?

```js
const out = myMap([2, 5, 8], (n) => n > 4);
console.log(out);
```

- [ ] `[ 5, 8 ]`
- [x] `[ false, true, true ]`
- [ ] `[ 2, 5, 8 ]`
- [ ] `true`

`myMap` pushes whatever the callback **returns**, once per item. The callback returns `true` or `false`, so you get three booleans. It does not keep or drop items. If you picked `[ 5, 8 ]`, you were thinking of a different job, keeping only some items, which is next lesson's method.
:::

## Step 2: meet `.map`

Every array already has this built in:

```js
const prices = [100, 250, 40];
const names = ["thandi", "lucas", "amira"];

console.log(prices.map((price) => price * 1.15));
console.log(names.map((name) => name.toUpperCase()));
```

Output:

```text
[ 114.99999999999999, 287.5, 46 ]
[ 'THANDI', 'LUCAS', 'AMIRA' ]
```

Identical. `myMap(prices, fn)` becomes `prices.map(fn)`, the same move as `processEach` to `forEach`. Like `forEach`, the real `map` passes the callback `(item, index, array)`, and you usually only need the item.

The whole Phase 5 loop, five lines, is now one line that says what it means: "prices, mapped to price times 1.15".

## Passing a named function

Now let us fix the VAT rounding. We will write a small named function that adds VAT and rounds to cents, then hand it to `map`:

```js
const addVat = (price) => Math.round(price * 1.15 * 100) / 100;

const prices = [100, 250, 40, 19.99];
const withVat = prices.map(addVat);

console.log(withVat);
console.log(prices);
console.log(prices.length, withVat.length);
```

Output:

```text
[ 115, 287.5, 46, 22.99 ]
[ 100, 250, 40, 19.99 ]
4 4
```

`prices.map(addVat)` reads like a sentence: "prices, each with VAT added". This is a very good reason to give a callback a name: the name *explains* the transformation. (Multiplying by 100, rounding, then dividing by 100 rounds to two decimal places while keeping a number, not a string like `toFixed` gives.)

This output also shows the two rules of `map`.

## The two rules of map

**Rule 1: the new array is always the same length as the original.** Four prices in, four prices out. `map` calls your callback exactly once per item, and every answer goes into the new array. It never skips an item and never adds extra ones. (If you want *fewer* items, that is a different job: [filter](#/phase-07-functions-as-values/04-filter), next lesson.)

**Rule 2: the original array is not changed.** `prices` still holds the prices without VAT. `map` builds a brand new array and hands it back. You decide what to call it and whether to keep it.

Rule 2 is a big deal. In [Copies and references](#/phase-06-objects/04-values-and-references) you saw how quickly an array can be changed by accident when two variables share it. `map` never does that to its array. The spaza shop owner keeps her supplier prices safe.

::: try map on your computer
1. In `coding-practice`, create `phase-7/map.js`.
2. Type this in:
   ```js
   const addVat = (price) => Math.round(price * 1.15 * 100) / 100;

   const prices = [100, 250, 40, 19.99];
   const withVat = prices.map(addVat);

   console.log(withVat);
   console.log(prices);
   console.log(prices.length, withVat.length);
   ```
3. Run it:
   ```bash
   node phase-7/map.js
   ```
4. You should see:
   ```text
   [ 115, 287.5, 46, 22.99 ]
   [ 100, 250, 40, 19.99 ]
   4 4
   ```
5. **Now experiment.** Add a fifth price, `10`, to the array. Before you run it, predict all three lines of output.
6. Then write a second named function, `halfPrice`, and add `console.log(prices.map(halfPrice));`. Predict the output first.
:::

::: quiz
What does this print?

```js
const marks = [40, 75, 62];
const boosted = marks.map((mark) => mark + 5);
marks.push(90);
console.log(boosted.length, marks.length, boosted[2]);
```

- [ ] `4 4 67`
- [ ] `3 4 62`
- [ ] `4 4 95`
- [x] `3 4 67`

`map` built a **new** array of three numbers at the moment it ran: `[45, 80, 67]`. Pushing `90` onto `marks` afterwards only changes `marks`. The two arrays are not linked, so `boosted` stays at length 3. If you picked `4 4 ...`, you expected `boosted` to follow later changes to `marks`. If you picked `62`, you read from the old array.
:::

## map with real data

Most of the time you will `map` over arrays of objects. There are three common shapes of transformation.

### Objects → display strings

Turning each record into a line of text that a person can read:

```js
const products = [
  { name: "Bread", price: 18.5 },
  { name: "Milk (2L)", price: 32.99 },
  { name: "Eggs (6)", price: 21 },
];

const labels = products.map((product) => `${product.name}: R${product.price.toFixed(2)}`);
console.log(labels);

const justPrices = products.map((product) => product.price);
console.log(justPrices);
```

Output:

```text
[ 'Bread: R18.50', 'Milk (2L): R32.99', 'Eggs (6): R21.00' ]
[ 18.5, 32.99, 21 ]
```

### Objects → one property each

The second `map` above is very common: "give me only the prices" or "give me only the names". It **pulls out** one property from every object. Once you have a plain list of numbers, you can total them, find the biggest, and so on.

### Objects → new, bigger objects

Sometimes you want the same records with an extra detail. Use the spread `{ ...product }` from [Copies and references](#/phase-06-objects/04-values-and-references) to copy each object and add a property:

```js
const addVat = (price) => Math.round(price * 1.15 * 100) / 100;

const products = [
  { name: "Bread", price: 18.5 },
  { name: "Milk (2L)", price: 32.99 },
];

const withVat = products.map((product) => {
  return { ...product, priceWithVat: addVat(product.price) };
});

console.log(withVat);
console.log(products);
```

Output:

```text
[
  { name: 'Bread', price: 18.5, priceWithVat: 21.28 },
  { name: 'Milk (2L)', price: 32.99, priceWithVat: 37.94 }
]
[ { name: 'Bread', price: 18.5 }, { name: 'Milk (2L)', price: 32.99 } ]
```

This callback has braces, so it needs the word `return`. The original objects are untouched, because each one was copied with spread before the new property was added.

### Using the index

The callback also receives the index, so you can number things:

```js
const runners = ["Caster", "Wayde", "Akani"];
const ranked = runners.map((runner, index) => `${index + 1}. ${runner}`);
console.log(ranked);
```

Output:

```text
[ '1. Caster', '2. Wayde', '3. Akani' ]
```

::: predict What does this print?
```js
const words = ["kota", "pap", "boerewors"];
const lengths = words.map((word) => word.length);
console.log(lengths);
console.log(words);
```
:::

::: solution
```text
[ 4, 3, 9 ]
[ 'kota', 'pap', 'boerewors' ]
```
Each word is turned into its length. Three words in, three numbers out (rule 1), and `words` is unchanged (rule 2). The new array does not have to hold the same *type* of thing as the old one: strings went in, numbers came out.
:::

::: exercise Level 1 — Guided · Celsius to Fahrenheit
Create `phase-7/temperatures.js`.

1. Make an array `celsius` holding `0`, `25`, `100` and `37`.
2. Create `const fahrenheit = celsius.map(...)`.
3. Pass an arrow with one parameter `c` that returns `c * 9 / 5 + 32`. Use the short arrow form with no braces.
4. Print `fahrenheit`.
5. Run it. You should see `[ 32, 77, 212, 98.6 ]`.
6. Then print `celsius` as well, and check it is unchanged.
:::

::: solution
```js
const celsius = [0, 25, 100, 37];
const fahrenheit = celsius.map((c) => c * 9 / 5 + 32);
console.log(fahrenheit);
```
Output:
```text
[ 32, 77, 212, 98.6 ]
```
:::

::: exercise Level 2 — On your own · Report card lines
Create `phase-7/report-card.js` with:

```js
const students = [
  { name: "Naledi", mark: 72 },
  { name: "Ahmed", mark: 48 },
  { name: "Grace", mark: 50 },
];
```

Use `map` to build an array of strings, one per student, like `Naledi: 72% PASS`. A mark of 50 or more is a PASS, anything below is a FAIL. Print the new array.
:::

::: hint
Your callback needs two steps: work out the outcome, then build the string. That means braces `{ }`, so you must write `return`. The ternary `mark >= 50 ? "PASS" : "FAIL"` is handy for the outcome.
:::

::: solution
```js
const students = [
  { name: "Naledi", mark: 72 },
  { name: "Ahmed", mark: 48 },
  { name: "Grace", mark: 50 },
];

const results = students.map((student) => {
  const outcome = student.mark >= 50 ? "PASS" : "FAIL";
  return `${student.name}: ${student.mark}% ${outcome}`;
});

console.log(results);
```
Output:
```text
[ 'Naledi: 72% PASS', 'Ahmed: 48% FAIL', 'Grace: 50% PASS' ]
```
If you got `[ undefined, undefined, undefined ]`, you forgot the `return`. Read the next section.
:::

::: quiz
What does this print?

```js
const learners = [
  { name: "Zola", mark: 58 },
  { name: "Imran", mark: 71 },
];
const same = learners.map((learner) => learner);
const labels = learners.map((learner, i) => `${i}:${learner.name[0]}`);
same[0].mark = 99;
console.log(learners[0].mark, labels.join(","));
```

- [x] `99 0:Z,1:I`
- [ ] `58 0:Z,1:I`
- [ ] `99 1:Z,2:I`
- [ ] `58 1:Zola,2:Imran`

`map` makes a new **array**, but `(learner) => learner` puts the same objects into it. `same[0]` and `learners[0]` are one object with two names, so setting the mark to 99 shows up in both. The index starts at 0, and `name[0]` is the first letter. If you picked `58`, you expected `map` to copy the objects. It only copies them if your callback makes new ones, for example with `{ ...learner }`.
:::

## Pitfalls

### Forgetting `return` in a braces arrow

This is the number one `map` bug. Everyone writes it at least once:

```js
const prices = [100, 250, 40];
const withVat = prices.map((price) => {
  price * 1.15;
});
console.log(withVat);
```

Output:

```text
[ undefined, undefined, undefined ]
```

The arrow has **braces**, so it is a full function body, and a full function body only gives something back if you write `return`. This one works out `price * 1.15`, throws the answer away, and returns `undefined`. `map` faithfully collects three `undefined`s.

Two fixes, both correct:

```text
prices.map((price) => { return price * 1.15; })   // braces + return
prices.map((price) => price * 1.15)               // no braces, automatic return
```

The rule to remember: **braces mean you must write `return`**.

### Returning an object in a short arrow

You want to turn names into objects, and you try the short form:

```js
const names = ["Lwazi", "Maria"];
const people = names.map((name) => { name: name, active: true });
console.log(people);
```

Output:

```text
SyntaxError: Unexpected token ':'
```

Node points at the `:` after `active`. The problem: after `=>`, JavaScript sees `{` and thinks it is the start of a function body, not an object. Then it gets confused by the colons. Wrap the object in **round brackets** so JavaScript knows it is a value:

```js
const names = ["Lwazi", "Maria"];
const people = names.map((name) => ({ name: name, active: true }));
console.log(people);
```

Output:

```text
[ { name: 'Lwazi', active: true }, { name: 'Maria', active: true } ]
```

Or use braces and `return { ... };`, as in the VAT objects example above. Both are fine.

### Using map when you meant forEach

`map` is for **making** a new array. If you only want to **do** something with each item, such as printing, use `forEach`:

```js
const names = ["Ama", "Ben"];
const result = names.map((name) => console.log(name));
console.log(result);
```

Output:

```text
Ama
Ben
[ undefined, undefined ]
```

It printed the names, so it "works", but it also built a useless array of `undefined`s (because `console.log` returns `undefined`). Anyone reading `map` expects a new list to be made and used. Using `map` to print is like asking the photo app to make black-and-white copies and then throwing all the copies away. Use `forEach` for printing.

::: debug The empty menu
This program should print `[ 'Samoosas - R30', 'Koeksisters - R25' ]`. Run it, see what it prints instead, and fix it in two different ways.

```js
const items = [
  { name: "Samoosas", price: 30 },
  { name: "Koeksisters", price: 25 },
];

const menuLines = items.map((item) => {
  `${item.name} - R${item.price}`;
});

console.log(menuLines);
```
:::

::: solution
It prints `[ undefined, undefined ]`. The arrow has braces but no `return`, so each call returns `undefined`.

Fix 1, add `return`:
```js
const menuLines = items.map((item) => {
  return `${item.name} - R${item.price}`;
});
```

Fix 2, remove the braces (and the semicolon inside them) to get the automatic return:
```js
const menuLines = items.map((item) => `${item.name} - R${item.price}`);
```
Either way, output:
```text
[ 'Samoosas - R30', 'Koeksisters - R25' ]
```
:::

::: warn A sneaky one: passing built-in functions to map
Passing a named function is great, but be careful with functions that take **more than one** parameter. `map` always passes `(item, index, array)`, and some functions will use the extra arguments:

```js
console.log(["1", "2", "3"].map(parseInt));
console.log(["1", "2", "3"].map(Number));
console.log(["1", "2", "3"].map((text) => parseInt(text)));
```

Output:

```text
[ 1, NaN, NaN ]
[ 1, 2, 3 ]
[ 1, 2, 3 ]
```

`parseInt` has an optional second parameter (the number system to use), and `map` fills it with the index, which gives nonsense. `Number` only uses one argument, so it is fine. When in doubt, wrap it in an arrow that passes only the item, as in the third line.
:::

::: mistake
**Forgetting `return` when the arrow has braces.** You get an array full of `undefined`. Add `return`, or drop the braces.

**Returning an object from a short arrow without round brackets.** `(x) => { name: x }` is read as a function body. Write `(x) => ({ name: x })`.

**Expecting `map` to change the original.** It never does. Store the result: `const withVat = prices.map(addVat);`. Calling `prices.map(addVat);` on its own line and ignoring the result does nothing useful.

**Using `map` to print.** Use `forEach` for doing things. Use `map` for making a new list.

**Expecting `map` to skip items.** It cannot. Same length in, same length out. If your callback returns nothing for some items, you get `undefined` in those spots. To leave items out, use `filter`.
:::

::: quiz
Given `const cities = ["JHB", "CPT"];`, which line makes `result` equal to `[ { code: 'JHB' }, { code: 'CPT' } ]`?

- [ ] `const result = cities.map((c) => { code: c });`
- [ ] `const result = cities.forEach((c) => ({ code: c }));`
- [x] `const result = cities.map((c) => ({ code: c }));`
- [ ] `const result = cities.map((c) => { return code: c; });`

The round brackets tell JavaScript that `{ code: c }` is an object to return. Without them, the `{` is read as the start of a function body. With only one property this does not even crash: the body runs, returns nothing, and you get `[ undefined, undefined ]`. The `forEach` line gives `undefined`, because `forEach` never returns anything. The last line is a `SyntaxError`, because `return code: c` is not valid.
:::

## Real-world uses

- **Shops:** turning a list of prices into prices with VAT or a discount, or products into lines on a receipt.
- **Apps showing lists:** a contacts app turns each contact record into a line on the screen (name and photo). A news app turns each article record into a headline card. Almost every list you scroll on a phone was made with a `map`-like step.
- **Data cleaning:** trimming spaces from every name typed into a form, converting every text number to a real number.
- **Pulling out one field:** "all the email addresses from these users", so you can send a newsletter.

::: connect
**This builds on:** the "map by hand" loop from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand) and the callback shape `(item, index, array)` from [forEach](#/phase-07-functions-as-values/02-foreach).

**This unlocks:** [filter](#/phase-07-functions-as-values/04-filter) next, which also returns a new array, but decides *which* items to keep instead of transforming them. Later, in [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining), you will combine them: filter first, then map.
:::

::: challenge A myMap that passes the index
Your `myMap` only passes the item to the callback. The real `map` also passes the index and the array.

Upgrade `myMap` so it calls `transform(array[i], i, array)`. Then check it gives the same output as the real `map` for:

```js
const runners = ["Caster", "Wayde", "Akani"];
```

with the numbering callback from the "Using the index" section above. Finally, use all three parameters to produce `Caster (1 of 3)`, `Wayde (2 of 3)`, `Akani (3 of 3)`.
:::

::: solution
```js
function myMap(array, transform) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(transform(array[i], i, array));
  }
  return result;
}

const runners = ["Caster", "Wayde", "Akani"];
console.log(myMap(runners, (runner, index) => `${index + 1}. ${runner}`));
console.log(runners.map((runner, index) => `${index + 1}. ${runner}`));
console.log(myMap(runners, (runner, index, array) => `${runner} (${index + 1} of ${array.length})`));
```
Output:
```text
[ '1. Caster', '2. Wayde', '3. Akani' ]
[ '1. Caster', '2. Wayde', '3. Akani' ]
[ 'Caster (1 of 3)', 'Wayde (2 of 3)', 'Akani (3 of 3)' ]
```
You needed a counting loop instead of `for...of`, because you need `i`. This is now very close to what the real `map` does inside.
:::

::: recap
- **Mapping** means building a new array by transforming each item of an old one. You wrote it by hand in Phase 5.
- `myMap(array, transform)` is that loop with the transformation passed in: `result.push(transform(item))`.
- `array.map(fn)` is the built-in version. The callback receives `(item, index, array)` and must **return** the new item.
- Rule 1: the result always has the **same length** as the original.
- Rule 2: the original array is **not changed**. Store the result in a new variable.
- Common transformations: numbers to numbers (VAT), objects to strings (display lines), objects to one property (`product.price`), objects to bigger objects (`{ ...product, extra }`).
- Braces mean you must write `return`. To return an object from a short arrow, wrap it in `( )`.
- Use `forEach` for doing things, and `map` for making a new list.
:::

::: interview What does map return, and how long is it?
A new array with one item for every item in the original, so always the same length. Each new item is whatever the callback returned for the matching original item. The original array is left unchanged.
:::

::: interview Why does this give an array of undefined? `nums.map((n) => { n * 2; })`
The arrow has braces, so it is a full function body, and it has no `return`. Each call works out `n * 2` and then returns `undefined`. Fix it with `(n) => n * 2` or `(n) => { return n * 2; }`.
:::

::: interview When would you use forEach instead of map?
When you want to *do* something with each item (print it, save it) and do not need a new array. `map` is for *making* a new array; using it only for printing builds a useless array and confuses readers.
:::

::: checkpoint
- [ ] I compared the two "map by hand" loops and found the one line that changes
- [ ] I wrote `myMap` and saw it give the same result as `.map`
- [ ] I passed a named function (`addVat`) to `map` and checked the original prices were unchanged
- [ ] I finished the temperatures and report card exercises
- [ ] I saw `[ undefined, undefined, undefined ]` from a missing `return`, and fixed it two ways
- [ ] I can state the two rules of `map` without looking
:::

::: resources
- **MDN, "Array.prototype.map()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map. The official reference, including the `parseInt` surprise.
- **javascript.info, "Array methods":** https://javascript.info/array-methods. See the "Transform an array" section, which starts with `map`.
- **Eloquent JavaScript, chapter 5 "Higher-Order Functions":** https://eloquentjavascript.net/05_higher_order.html. The "Transforming with map" section builds its own `map`, as you did.
:::
