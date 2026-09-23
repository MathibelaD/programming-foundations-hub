---
title: filter — keep only the items that pass a test
summary: Pick out the expenses over R100, the learners who passed, or the contacts that match a search, with one clear line.
minutes: 40
stage: Phase 7
---

## What you will learn

- How the "filter by hand" loop from Phase 5 becomes `myFilter`, and then `.filter`
- What a **test function** is: a callback that answers `true` or `false`
- Why the result can be any length, from empty to the full list
- How to filter real data (expenses, people, form answers, contacts), and the mistakes that trip people up

**Before this:** [map](#/phase-07-functions-as-values/03-map). You should also remember "filter by hand" from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand).

## The problem: I only want some of them

At the end of the month you look at your bank statement. There are forty small transactions, and you want to see only the ones **over R100**, because those are the ones that hurt.

A teacher has thirty marks and wants a list of only the learners who **passed**.

A contacts app has five hundred people, and you type "si" into the search box. It should show only the contacts whose name contains "si".

Same job each time: go through a list, **keep** the items that pass some test, and **leave out** the rest. In Phase 5 you called this **filtering**, and wrote it by hand. Here are two of those loops:

```js
const amounts = [45, 120, 18.5, 350, 99, 100];
const bigOnes = [];
for (const amount of amounts) {
  if (amount > 100) {
    bigOnes.push(amount);
  }
}
console.log(bigOnes);

const marks = [72, 45, 88, 50, 39, 65];
const passes = [];
for (const mark of marks) {
  if (mark >= 50) {
    passes.push(mark);
  }
}
console.log(passes);
```

Output:

```text
[ 120, 350 ]
[ 72, 88, 50, 65 ]
```

(Notice `100` is not in the first list. The test is "more than 100", and 100 is not more than 100.)

Compare the two loops line by line, as you did for `map`:

| Step | Big expenses | Passing marks | Same? |
|---|---|---|---|
| Make an empty result array | `const bigOnes = [];` | `const passes = [];` | yes |
| Go through each item | `for (const amount of amounts)` | `for (const mark of marks)` | yes |
| **The test** in the `if` | `amount > 100` | `mark >= 50` | **no** |
| Push the *original item* if it passed | `bigOnes.push(amount)` | `passes.push(mark)` | yes |

Only the **test** is different. Everything else is the same machine.

::: analogy The bouncer with a rule
A club has a bouncer at the door. Tonight's rule, written on a card, is "18 or older". Everyone in the queue walks past the bouncer one at a time. He checks each person against the card. If the answer is *yes*, they go inside. If it is *no*, they stay outside.

- The people who get in are **the same people** who were in the queue. The bouncer does not change them.
- Their **order** stays the same.
- He might let **everyone** in, **no one** in, or anything in between.
- Tomorrow the manager could hand him a different card ("members only"). The door, the queue and the checking stay the same. Only the rule changes.

`filter` is the bouncer. The callback you give it is the rule on the card.
:::

## Step 1: a test function

For `map`, the callback answered "what should the new item be?". For filtering, the callback answers a **yes-or-no question**: "should this item be kept?". It returns `true` (keep it) or `false` (leave it out).

A function that answers a yes-or-no question about one item is often called a **test function** (you may also see the fancier word **predicate** in other books). You wrote functions like this in [Return values](#/phase-04-functions/03-return-values), for example `isValidAmount`. Here are two:

```text
(amount) => amount > 100      // is this amount more than 100?
(mark) => mark >= 50          // is this a pass?
```

Each takes one item and gives back `true` or `false`.

## Step 2: write `myFilter`

Now take the loop and replace the fixed test with a call to the test function:

```js
function myFilter(array, test) {
  const result = [];
  for (const item of array) {
    if (test(item)) {
      result.push(item);
    }
  }
  return result;
}

const amounts = [45, 120, 18.5, 350, 99, 100];
const marks = [72, 45, 88, 50, 39, 65];

console.log(myFilter(amounts, (amount) => amount > 100));
console.log(myFilter(marks, (mark) => mark >= 50));
```

Output:

```text
[ 120, 350 ]
[ 72, 88, 50, 65 ]
```

Read the heart of it slowly: `if (test(item)) { result.push(item); }`. "Ask the test about this item. If it says yes, keep the item." Compare it with `myMap`:

| | `myMap` | `myFilter` |
|---|---|---|
| The callback answers | "what is the new item?" | "keep this item, yes or no?" |
| What gets pushed | the callback's **answer** | the **original item** |
| How many come out | always the same number | anywhere from none to all |

::: quiz
Using the `myFilter` function from this section, what does this print?

```js
console.log(myFilter([0, 3, 8], (n) => n * 2));
```

- [ ] `[ 0, 6, 16 ]`
- [ ] `[ 6, 16 ]`
- [x] `[ 3, 8 ]`
- [ ] `[ 0, 3, 8 ]`

`myFilter` does not push the callback's answer. It uses the answer as a yes or no inside `if`, and then pushes the **original** item. `0 * 2` is `0`, which is falsy, so `0` is left out. `6` and `16` are truthy, so `3` and `8` are kept. If you picked `[ 6, 16 ]`, you mixed up filter with map: a filter never changes the items.
:::

## Step 3: meet `.filter`

Every array has it built in:

```js
const amounts = [45, 120, 18.5, 350, 99, 100];
const marks = [72, 45, 88, 50, 39, 65];

console.log(amounts.filter((amount) => amount > 100));
console.log(marks.filter((mark) => mark >= 50));
console.log(amounts);
```

Output:

```text
[ 120, 350 ]
[ 72, 88, 50, 65 ]
[ 45, 120, 18.5, 350, 99, 100 ]
```

Same result as `myFilter`. And, like `map`, `filter` gives you a **new** array and leaves the original alone: the last line shows `amounts` is complete.

The callback receives `(item, index, array)`, like every method in this phase. You will nearly always only need the item.

### With a named test

When a test has a clear name, give it one. The code then reads like a sentence:

```js
const isPass = (mark) => mark >= 50;

const marks = [72, 45, 88, 50, 39, 65];
const passes = marks.filter(isPass);

console.log(passes);
console.log(`${passes.length} of ${marks.length} learners passed.`);
```

Output:

```text
[ 72, 88, 50, 65 ]
4 of 6 learners passed.
```

"Marks, filtered: is pass." And look at the second line. Filtering and then asking for `.length` is the **counter pattern** from [loop patterns](#/phase-03-loops/04-loop-patterns): "how many match?" You get it for free.

::: try filter on your computer
1. In `coding-practice`, create `phase-7/filter.js`.
2. Type this in:
   ```js
   const isPass = (mark) => mark >= 50;

   const marks = [72, 45, 88, 50, 39, 65];
   const passes = marks.filter(isPass);

   console.log(passes);
   console.log(`${passes.length} of ${marks.length} learners passed.`);
   ```
3. Run it:
   ```bash
   node phase-7/filter.js
   ```
4. You should see:
   ```text
   [ 72, 88, 50, 65 ]
   4 of 6 learners passed.
   ```
5. **Now experiment.** Change the pass mark in `isPass` to `60`. Predict both lines before you run it.
6. Add a second test, `isDistinction`, for marks of 80 or more. Print how many distinctions there are. Predict first.
:::

::: quiz
What does this print?

```js
const isCheap = (price) => price < 20;
const prices = [25, 15, 20, 9, 30];
const cheap = prices.filter(isCheap);
cheap.push(1);
console.log(`${cheap.length} of ${prices.length}`);
```

- [ ] `2 of 5`
- [x] `3 of 5`
- [ ] `4 of 6`
- [ ] `3 of 6`

Only `15` and `9` are less than 20 (`20 < 20` is `false`), so `cheap` starts as `[15, 9]`. Pushing `1` makes it 3 long. `filter` gave back a **new** array, so the push does not touch `prices`, which is still 5 long. If you picked `... of 6`, you thought the two arrays were shared.
:::

## The result can be any length

`map` always gives back the same number of items. `filter` does not. It depends entirely on how many pass the test:

```js
const marks = [72, 45, 88, 50, 39, 65];
console.log(marks.filter((mark) => mark >= 0));
console.log(marks.filter((mark) => mark >= 90));
console.log(marks.filter((mark) => mark > 60));
```

Output:

```text
[ 72, 45, 88, 50, 39, 65 ]
[]
[ 72, 88, 65 ]
```

- Every mark is 0 or more, so **all six** pass the test.
- No mark is 90 or more, so you get an **empty array**, `[]`. Not `undefined`, not an error, an empty list. That matters: your code can always safely check `.length` on the result.
- Three marks are over 60, so you get three.

The order is always kept. `filter` never reorders things. (That is `sort`'s job, in lesson 07.)

::: quiz
What does this print?

```js
const temps = [18, 22, 17];
const hot = temps.filter((temp) => temp > 30);
console.log(hot.length, hot[0], typeof hot);
```

- [x] `0 undefined object`
- [ ] `undefined undefined undefined`
- [ ] `0 undefined undefined`
- [ ] It crashes with a `TypeError`.

No temperature is over 30, so `hot` is an **empty array**, `[]`, not `undefined`. An empty array has length `0`, reading index 0 gives `undefined` (like reading past the end of any array), and `typeof` an array is `"object"`. If you picked `undefined undefined undefined`, you expected `filter` to return `undefined` when nothing matches. It always returns an array.
:::

## filter with real data

### Expenses over R100, and one category

```js
const expenses = [
  { description: "Groceries", amount: 640.5, category: "food" },
  { description: "Taxi fare", amount: 36, category: "transport" },
  { description: "Electricity", amount: 450, category: "bills" },
  { description: "Airtime", amount: 29, category: "phone" },
  { description: "Takeaways", amount: 185, category: "food" },
];

const over100 = expenses.filter((expense) => expense.amount > 100);
console.log(over100);

const food = expenses.filter((expense) => expense.category === "food");
console.log(food.length);
```

Output:

```text
[
  { description: 'Groceries', amount: 640.5, category: 'food' },
  { description: 'Electricity', amount: 450, category: 'bills' },
  { description: 'Takeaways', amount: 185, category: 'food' }
]
2
```

The test looks inside each object at one property. Whole objects are kept or left out: `filter` never cuts an object in half.

### Adults only

```js
const people = [
  { name: "Bongani", age: 34 },
  { name: "Yuki", age: 16 },
  { name: "Carmen", age: 18 },
  { name: "Tariq", age: 12 },
];

const adults = people.filter((person) => person.age >= 18);
console.log(adults);
```

Output:

```text
[ { name: 'Bongani', age: 34 }, { name: 'Carmen', age: 18 } ]
```

### Non-empty answers

People leave boxes blank on forms, or type only spaces. Clean those out:

```js
const answers = ["Durban", "", "  ", "Polokwane", "Kimberley", ""];
const filledIn = answers.filter((answer) => answer.trim() !== "");
console.log(filledIn);
```

Output:

```text
[ 'Durban', 'Polokwane', 'Kimberley' ]
```

`trim()` removes the spaces, so `"  "` becomes `""`, and the test says no.

### A search box

This is how a basic search works. Lower-case both the name and the search word, so that "SI", "Si" and "si" all match:

```js
const contacts = [
  { name: "Sibusiso Dlamini", phone: "082 555 0101" },
  { name: "Anna Pretorius", phone: "071 555 0199" },
  { name: "Musa Sithole", phone: "060 555 0123" },
];

const search = "si";
const matches = contacts.filter((contact) =>
  contact.name.toLowerCase().includes(search.toLowerCase())
);
console.log(matches);
```

Output:

```text
[
  { name: 'Sibusiso Dlamini', phone: '082 555 0101' },
  { name: 'Musa Sithole', phone: '060 555 0123' }
]
```

The arrow was long, so we broke it over lines after the `=>`. That is allowed and often clearer. `includes` returns `true` or `false`, which is exactly what `filter` wants. You will build this same search into Budget Buddy at the end of this phase.

::: predict What does this print?
```js
const words = ["apple", "", "kiwi", "banana"];
const longWords = words.filter((word) => word.length > 4);
console.log(longWords);
console.log(longWords.length, words.length);
```
:::

::: solution
```text
[ 'apple', 'banana' ]
2 4
```
`"apple"` has 5 letters and `"banana"` has 6, so both pass `> 4`. `""` has 0 and `"kiwi"` has 4 (not *more than* 4), so both fail. The new array has 2 items, and the original still has all 4.
:::

::: quiz
What does this print?

```js
const shops = [
  { name: "Spar Rosebank", town: "Johannesburg" },
  { name: "SPAR Sea Point", town: "Cape Town" },
  { name: "Pick n Pay Sandton", town: "Johannesburg" },
];
const search = "Spar";
const found = shops.filter((shop) => shop.name.includes(search.toLowerCase()));
console.log(found.length);
```

- [ ] `2`
- [ ] `1`
- [x] `0`
- [ ] `3`

Only the search word was lower-cased, into `"spar"`. The shop names were not, and `includes` cares about capitals, so neither `"Spar Rosebank"` nor `"SPAR Sea Point"` contains `"spar"`. For a search that ignores capitals, lower-case **both** sides: `shop.name.toLowerCase().includes(search.toLowerCase())`. If you picked `2`, you assumed one `toLowerCase` was enough.
:::

## Filtered objects are the same objects

`filter` makes a new *array*, but it does **not** copy the objects inside it. The new array holds the same objects (the same addresses) as the old one:

```js
const people = [
  { name: "Bongani", age: 34 },
  { name: "Yuki", age: 16 },
];

const adults = people.filter((person) => person.age >= 18);
adults[0].age = 35;
console.log(people[0]);
console.log(adults[0] === people[0]);
```

Output:

```text
{ name: 'Bongani', age: 35 }
true
```

Changing Bongani through `adults` changed him in `people` too, because there is only one Bongani object. This is the reference behaviour from [Copies and references](#/phase-06-objects/04-values-and-references). Most of the time this is what you want (you are looking at the same records). If you need separate copies, `map` them with `{ ...person }` afterwards.

::: exercise Level 1 — Guided · Hot days
Create `phase-7/hot-days.js`.

1. Make an array `temps` holding `28, 31, 35, 26, 30, 33, 29` (one week of temperatures).
2. Create `const hotDays = temps.filter(...)`.
3. Pass an arrow with one parameter `temp` that returns `temp > 30`.
4. Print `hotDays`.
5. Print `${hotDays.length} hot days this week` with a template literal.
6. Run it. You should see `[ 31, 35, 33 ]` and `3 hot days this week`. Why is `30` not included?
:::

::: solution
```js
const temps = [28, 31, 35, 26, 30, 33, 29];
const hotDays = temps.filter((temp) => temp > 30);
console.log(hotDays);
console.log(`${hotDays.length} hot days this week`);
```
Output:
```text
[ 31, 35, 33 ]
3 hot days this week
```
`30` is not *more than* 30. If you want to include it, use `>=`.
:::

::: exercise Level 2 — On your own · Cheap and in stock
Create `phase-7/in-stock.js` with:

```js
const products = [
  { name: "Bread", price: 18.5, inStock: true },
  { name: "Cooking oil (2L)", price: 64.99, inStock: true },
  { name: "Milk (2L)", price: 32.99, inStock: false },
  { name: "Rice (2kg)", price: 42, inStock: true },
];
```

Use **one** `filter` to keep only products that are in stock **and** cost less than R50. Print the result. You should get Bread and Rice.
:::

::: hint
A test can combine two checks with `&&` from [Combining conditions](#/phase-02-making-decisions/03-combining-conditions). Both must be true for the whole thing to be true. `product.inStock` is already `true` or `false`, so you do not need `=== true`.
:::

::: solution
```js
const products = [
  { name: "Bread", price: 18.5, inStock: true },
  { name: "Cooking oil (2L)", price: 64.99, inStock: true },
  { name: "Milk (2L)", price: 32.99, inStock: false },
  { name: "Rice (2kg)", price: 42, inStock: true },
];

const cheapInStock = products.filter((product) => product.inStock && product.price < 50);
console.log(cheapInStock);
```
Output:
```text
[
  { name: 'Bread', price: 18.5, inStock: true },
  { name: 'Rice (2kg)', price: 42, inStock: true }
]
```
Cooking oil is in stock but too expensive. Milk is cheap but sold out. Only items that pass *both* checks are kept.
:::

::: debug Everything is food now
This program should print only the groceries, and leave `expenses` unchanged. Run it and look very carefully at **both** outputs. Something is badly wrong. Find the one-character bug.

```js
const expenses = [
  { description: "Groceries", category: "food" },
  { description: "Taxi fare", category: "transport" },
];

const food = expenses.filter((expense) => expense.category = "food");
console.log(food);
console.log(expenses);
```
:::

::: solution
It prints:
```text
[
  { description: 'Groceries', category: 'food' },
  { description: 'Taxi fare', category: 'food' }
]
[
  { description: 'Groceries', category: 'food' },
  { description: 'Taxi fare', category: 'food' }
]
```
The test uses `=` (assignment) instead of `===` (comparison). So instead of *asking* "is the category food?", it *sets* every category to `"food"`. The value of an assignment is the value assigned, `"food"`, which is truthy, so every item is kept. Worse, the taxi fare has now been changed to food in the original data.

Fix: `expense.category === "food"`. This is the same `=` versus `===` trap from [Comparing values](#/phase-02-making-decisions/01-comparing-values), but it does more damage here because there is no error message.
:::

::: mistake
**Using `=` instead of `===` in the test.** It changes your data and keeps everything. Always compare with `===`.

**Forgetting `return` when the arrow has braces.** `(mark) => { mark >= 50; }` returns `undefined`, which is falsy, so *nothing* is kept and you get `[]`. Drop the braces or add `return`.

**Returning the item instead of a true/false answer.** `filter` treats whatever you return as truthy or falsy ([Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy)). So `stock.filter((count) => count)` leaves out every `0`. Sometimes that is what you want, but it is hard to read at a glance. Prefer an honest test: `(count) => count > 0`.

**Confusing `filter` and `map`.** `filter` keeps or drops the *original* items; it never changes them. If you return a new string from a filter callback, the string is only used as "truthy", and you get the originals back. To change items, use `map`.

**Expecting `undefined` or an error when nothing matches.** You get `[]`. Check with `.length === 0`.
:::

::: quiz
What does this print?

```js
const stock = [
  { item: "Sugar", qty: 0 },
  { item: "Salt", qty: 4 },
  { item: "Tea", qty: 0 },
];
const empty = stock.filter((line) => line.qty === 0);
empty.forEach((line) => {
  line.qty = 10;
});
empty.pop();
console.log(stock.length, stock[2].qty, empty.length);
```

- [ ] `3 0 1`
- [x] `3 10 1`
- [ ] `2 10 1`
- [ ] `3 10 2`

`empty` is a new array, but it holds the **same** Sugar and Tea objects as `stock`. Setting `qty` to 10 through `empty` changes those real objects, so Tea in `stock` now has 10. But `pop()` changes only the `empty` array itself: `stock` still has 3 items. If you picked `3 0 1`, you thought filter copies the objects. If you picked `2 10 1`, you thought the arrays were shared too.
:::

## Real-world uses

- **Online shops:** every filter checkbox ("in stock", "under R200", "size M") is a `filter` over the product list.
- **Banking apps:** "show only card payments", "show only transactions over R500".
- **Search boxes:** keep items whose name includes what you typed.
- **Cleaning data:** remove blank rows, invalid entries or duplicates before working with a list.
- **Messaging apps:** "unread only".

::: connect
**This builds on:** the "filter by hand" loop from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand), the counter pattern from [loop patterns](#/phase-03-loops/04-loop-patterns), and the `countWhere` challenge in [lesson 01](#/phase-07-functions-as-values/01-passing-functions-to-functions).

**This unlocks:** [find, findIndex, some and every](#/phase-07-functions-as-values/05-find-some-every) next. They use the same kind of yes-or-no test, but each answers a different question ("which is the first one?", "is there any?", "are they all?"). Later, in [chaining](#/phase-07-functions-as-values/07-sort-and-chaining), you will filter and then map in one sentence.
:::

::: challenge The opposite of filter
Some languages have a method called `reject`: it keeps the items that **fail** the test.

1. Write `reject(array, test)` yourself, with a loop, based on `myFilter`.
2. Use it to get the failing marks from `[72, 45, 88, 50, 39, 65]` with the test `(mark) => mark >= 50`.
3. Then get the same answer with the built-in `filter` and no new function, only a changed test.
:::

::: solution
```js
function reject(array, test) {
  const result = [];
  for (const item of array) {
    if (!test(item)) {
      result.push(item);
    }
  }
  return result;
}

const marks = [72, 45, 88, 50, 39, 65];
console.log(reject(marks, (mark) => mark >= 50));
console.log(marks.filter((mark) => !(mark >= 50)));
```
Output:
```text
[ 45, 39 ]
[ 45, 39 ]
```
The only change to `myFilter` is the `!` ("not"). With the built-in `filter`, you put the `!` in the test instead. (Of course `(mark) => mark < 50` also works, and is clearer to read.)
:::

::: recap
- **Filtering** means building a new array of only the items that pass a test. You wrote it by hand in Phase 5.
- A **test function** takes one item and returns `true` (keep) or `false` (leave out).
- `myFilter(array, test)` is the Phase 5 loop with the test passed in: `if (test(item)) result.push(item)`.
- `array.filter(test)` is the built-in version. It returns a new array and leaves the original array alone.
- The result can be any length from `[]` to all items. The order is kept.
- `filter` keeps the **original** items. Objects in the result are the same objects as in the original (references).
- `.filter(test).length` answers "how many match?".
- Watch for `=` instead of `===`, and for missing `return` in braces arrows.
:::

::: interview What is the difference between map and filter?
`map` transforms every item and returns a new array of the same length, containing the callback's answers. `filter` tests every item and returns a new array of only the original items that passed, so it can be shorter (or empty). `map` changes *what* the items are; `filter` changes *which* items there are.
:::

::: interview What does filter return when nothing passes the test?
An empty array, `[]`. It never returns `undefined` for "no matches", so it is always safe to check `.length` on the result.
:::

::: interview Why is `list.filter((x) => { x > 5; })` always empty?
The arrow has braces but no `return`, so it returns `undefined` for every item. `undefined` is falsy, so `filter` keeps nothing. Use `(x) => x > 5` or add `return`.
:::

::: checkpoint
- [ ] I compared two "filter by hand" loops and found the one part that changes (the test)
- [ ] I wrote `myFilter` and saw it match `.filter`
- [ ] I filtered with a named test (`isPass`) and counted the results with `.length`
- [ ] I got an empty `[]` on purpose, with a test nothing passes
- [ ] I finished the hot days and cheap-and-in-stock exercises
- [ ] I found and fixed the `=` bug that turned everything into food
:::

::: resources
- **MDN, "Array.prototype.filter()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter. The official reference, with more examples.
- **javascript.info, "Array methods":** https://javascript.info/array-methods. The "filter" section is short and has good exercises at the end of the page.
- **Eloquent JavaScript, chapter 5 "Higher-Order Functions":** https://eloquentjavascript.net/05_higher_order.html. The "Filtering arrays" section writes its own filter, as you did.
:::
