---
title: find, findIndex, some and every
summary: Four methods for asking questions about a list. Which one is it? Where is it? Is there any? Are they all?
minutes: 45
stage: Phase 7
---

## What you will learn

- `find` (the first item that matches, or `undefined`) and `findIndex` (its position, or `-1`)
- `some` ("does *any* item match?") and `every` ("do *all* items match?")
- How each one is a loop you already wrote by hand, including the **flag** pattern from Phase 3
- Why these four stop early, and how to choose the right one with a decision table

**Before this:** [filter](#/phase-07-functions-as-values/04-filter). You should remember "find the first match" and "check if any/all match" from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand), and the **flag** pattern from [loop patterns](#/phase-03-loops/04-loop-patterns).

## The problem: questions, not lists

`filter` answers "give me **all** the items that match". Very often, that is more than you need. Real questions sound like this:

- "Which student has ID 103?" You want **one** student, not a list with one student in it.
- "Where in the cart is the sugar?" You want a **position**, so you can remove it.
- "Did **anyone** fail?" You want **yes or no**.
- "Is **everything** in this order ready?" You want **yes or no**.

You have written loops for all of these. They share something that `forEach`, `map` and `filter` do not have: **they can stop early**. As soon as you find the student, you stop looking. As soon as one person has failed, the answer to "did anyone fail?" is yes, and checking the rest is wasted work.

::: analogy Looking for your keys
You are late, and your keys are somewhere in the house. You check the kitchen counter, then the table, then your jacket pocket. There they are. **You stop.** You do not carry on searching the bathroom "to be thorough".

That is `find`: search in order, stop at the first match, and hand it over. If you search everywhere and find nothing, you come back empty-handed (`undefined`).

Now a different question: "Is *any* window open before we leave?" You walk round the house. The moment you see one open window, you know the answer is yes. You do not need to check the others to answer the question. That is `some`.

And "Are *all* the doors locked?" The moment you find one unlocked door, the answer is no. You only say yes if you checked every door and every single one was locked. That is `every`.
:::

## find: the first item that matches

### The hand-written version

Here is "find the first student with a distinction" the Phase 5 way, using a loop and `break`:

```js
const students = [
  { id: 101, name: "Kagiso", mark: 64 },
  { id: 102, name: "Olivia", mark: 81 },
  { id: 103, name: "Farouk", mark: 47 },
  { id: 104, name: "Hana", mark: 90 },
];

let found = undefined;
for (const student of students) {
  if (student.mark >= 80) {
    found = student;
    break;
  }
}
console.log(found);
```

Output:

```text
{ id: 102, name: 'Olivia', mark: 81 }
```

Hana also has a distinction, but we stopped at Olivia, the **first** one. The only part that would change for a different search ("the student with ID 103") is the test in the `if`. You know what comes next.

### myFind, then .find

Inside a function, `return` does the job of `break`: it stops the loop *and* hands back the answer.

```js
function myFind(array, test) {
  for (const item of array) {
    if (test(item)) {
      return item;
    }
  }
  return undefined;
}

const students = [
  { id: 101, name: "Kagiso", mark: 64 },
  { id: 102, name: "Olivia", mark: 81 },
  { id: 103, name: "Farouk", mark: 47 },
  { id: 104, name: "Hana", mark: 90 },
];

console.log(myFind(students, (student) => student.mark >= 80));
console.log(students.find((student) => student.mark >= 80));
console.log(students.find((student) => student.id === 103));
console.log(students.find((student) => student.mark === 100));
```

Output:

```text
{ id: 102, name: 'Olivia', mark: 81 }
{ id: 102, name: 'Olivia', mark: 81 }
{ id: 103, name: 'Farouk', mark: 47 }
undefined
```

- `myFind` and `.find` agree.
- Searching by ID is the most common use of `find` in real programs: "get me the record with this ID".
- Nobody scored 100, so the answer is `undefined`: "I looked everywhere and came back empty-handed."

Notice the difference from `filter`: `find` gives you **the item itself**, not an array. No square brackets around the result.

### Always check for undefined

Because `find` can come back empty-handed, using its answer straight away is risky:

```js
const students = [
  { id: 101, name: "Kagiso", mark: 64 },
  { id: 102, name: "Olivia", mark: 81 },
];

const wanted = students.find((student) => student.id === 999);
console.log(wanted.name);
```

Output:

```text
TypeError: Cannot read properties of undefined (reading 'name')
```

Node points at `wanted.name`. There is no student 999, so `wanted` is `undefined`, and `undefined` has no properties. This error message is one you will see many times in your programming life. When you do, ask: "what did I expect to be an object here, and why is it `undefined`?"

The fix is to check before you use it:

```js
const students = [
  { id: 101, name: "Kagiso", mark: 64 },
  { id: 102, name: "Olivia", mark: 81 },
];

const idToFind = 999;
const wanted = students.find((student) => student.id === idToFind);
if (wanted === undefined) {
  console.log(`No student with ID ${idToFind}.`);
} else {
  console.log(`Found ${wanted.name}.`);
}
```

Output:

```text
No student with ID 999.
```

## findIndex: where is it?

Sometimes you need the **position** instead of the item, usually so you can change or remove it with `splice` (from [Changing arrays](#/phase-05-arrays/02-changing-arrays)). `findIndex` works like `find`, but returns the index. If nothing matches, it returns `-1`, the same "not found" signal as `indexOf`.

```js
const cart = [
  { item: "Mealie meal", price: 89.99 },
  { item: "Sugar", price: 45 },
  { item: "Tea bags", price: 52.5 },
];

console.log(cart.findIndex((line) => line.item === "Sugar"));
console.log(cart.findIndex((line) => line.item === "Coffee"));

const index = cart.findIndex((line) => line.item === "Sugar");
if (index !== -1) {
  cart.splice(index, 1);
}
console.log(cart);
```

Output:

```text
1
-1
[
  { item: 'Mealie meal', price: 89.99 },
  { item: 'Tea bags', price: 52.5 }
]
```

Always check for `-1` before using the index. `cart.splice(-1, 1)` would quietly remove the **last** item, which is a nasty bug.

### Why not indexOf?

You already know `indexOf`. It is perfect for finding an **exact value** in a list of simple values. But it cannot search *inside* objects:

```js
const names = ["Zodwa", "Pieter", "Leila"];
console.log(names.indexOf("Pieter"));

const cart = [{ item: "Sugar" }, { item: "Tea bags" }];
console.log(cart.indexOf({ item: "Sugar" }));
console.log(cart.findIndex((line) => line.item === "Sugar"));
```

Output:

```text
1
-1
0
```

`cart.indexOf({ item: "Sugar" })` fails because that new object is a *different* object with the same contents, and `===` on objects compares addresses, not contents ([Copies and references](#/phase-06-objects/04-values-and-references)). `findIndex` lets you describe what you are looking for with a test, so it works.

**Rule of thumb:** `indexOf` for simple values, `findIndex` when you need a test.

::: try Find a student
1. In `coding-practice`, create `phase-7/find.js`.
2. Type in the `students` array from the `myFind` example above (all four students).
3. Add:
   ```js
   const idToFind = 104;
   const wanted = students.find((student) => student.id === idToFind);
   if (wanted === undefined) {
     console.log(`No student with ID ${idToFind}.`);
   } else {
     console.log(`Found ${wanted.name} with ${wanted.mark}%.`);
   }
   ```
4. Run it:
   ```bash
   node phase-7/find.js
   ```
5. You should see:
   ```text
   Found Hana with 90%.
   ```
6. **Now experiment.** Change `idToFind` to `105`. Predict the output, then run it. Then delete the whole `if` check, keep only `console.log(wanted.name);`, and run it again to see the `TypeError` for yourself. Put the check back afterwards.
:::

## some: does any item match?

### The flag pattern, by hand

In [loop patterns](#/phase-03-loops/04-loop-patterns) you met the **flag**: a boolean that starts `false` and flips to `true` when you find what you are looking for. On an array, "did anyone fail?" looks like this:

```js
const marks = [72, 45, 88, 50, 39, 65];

// The flag pattern from Phase 3
let anyFailed = false;
for (const mark of marks) {
  if (mark < 50) {
    anyFailed = true;
    break;
  }
}
console.log(anyFailed);

function mySome(array, test) {
  for (const item of array) {
    if (test(item)) {
      return true;
    }
  }
  return false;
}

console.log(mySome(marks, (mark) => mark < 50));
console.log(marks.some((mark) => mark < 50));
console.log(marks.some((mark) => mark > 95));
```

Output:

```text
true
true
true
false
```

The flag loop, `mySome` and `.some` all agree: someone failed. Nobody scored over 95, so the last line is `false`.

`mySome` is `myFind` with one change: instead of returning the item, it returns `true`. And instead of `undefined` at the end, it returns `false`. `some` does not care *which* item matched, only *whether* one did.

## every: do all items match?

The mirror image. Start by assuming yes (`true`), and flip to `false` the moment one item fails:

```js
const marks = [72, 45, 88, 50, 39, 65];

let allPassed = true;
for (const mark of marks) {
  if (mark < 50) {
    allPassed = false;
    break;
  }
}
console.log(allPassed);

function myEvery(array, test) {
  for (const item of array) {
    if (!test(item)) {
      return false;
    }
  }
  return true;
}

console.log(myEvery(marks, (mark) => mark >= 50));
console.log(marks.every((mark) => mark >= 50));
console.log(marks.every((mark) => mark >= 0));
```

Output:

```text
false
false
false
true
```

Not everyone passed (45 and 39 did not). But every mark is at least 0, so the last line is `true`.

Look at the `!` in `myEvery`: "if this item does **not** pass, the answer is no, stop now." Only if the loop finishes without finding a failure do we return `true`.

### They really do stop early

You can watch `some` stop by printing inside the callback:

```js
const marks = [72, 45, 88, 50, 39, 65];

marks.some((mark) => {
  console.log(`checking ${mark}`);
  return mark < 50;
});
```

Output:

```text
checking 72
checking 45
```

It checked 72 (not a fail), then 45 (a fail!), and stopped. The other four marks were never looked at. `find`, `findIndex` and `every` stop early in the same way. On a list of a million items, that can save a lot of time. `forEach`, `map` and `filter` always visit every item, because their jobs need every item.

### Empty lists

What do these four say about an **empty** list?

```js
const empty = [];
console.log(empty.some((x) => x > 0));
console.log(empty.every((x) => x > 0));
console.log(empty.find((x) => x > 0));
console.log(empty.findIndex((x) => x > 0));
```

Output:

```text
false
true
undefined
-1
```

`some`, `find` and `findIndex` make sense: nothing to find. But `every` says `true`, which surprises everyone. Think about the `myEvery` code: it starts believing "yes" and only changes its mind if it finds a failure. In an empty list there is nothing to fail, so it never changes its mind. In plain words: "every item in this empty box is red" is not false, because there is no item that is *not* red. If an empty list should mean "no" in your program, check `.length` as well.

::: predict What does this print?
```js
const ages = [12, 17, 21, 15, 30];
console.log(ages.find((age) => age >= 18));
console.log(ages.findIndex((age) => age >= 18));
console.log(ages.some((age) => age >= 65));
console.log(ages.every((age) => age > 10));
```
Four lines. Write down all four before you check.
:::

::: solution
```text
21
2
false
true
```
- `find`: the first age of 18 or more is `21` (30 also qualifies, but it comes later).
- `findIndex`: `21` is at index `2`.
- `some`: nobody is 65 or older, so `false`.
- `every`: all five ages are more than 10, so `true`.
:::

## Real data: a restaurant order

Here all four ideas work together on one list of objects:

```js
const order = [
  { item: "Chicken burger", ready: true, containsNuts: false },
  { item: "Chips", ready: true, containsNuts: false },
  { item: "Peanut brownie", ready: false, containsNuts: true },
];

if (order.every((line) => line.ready)) {
  console.log("Order complete! Call the customer.");
} else {
  console.log("Still waiting on the kitchen.");
}

if (order.some((line) => line.containsNuts)) {
  console.log("Warning: this order contains nuts.");
}

const waitingFor = order.find((line) => !line.ready);
console.log(`Waiting for: ${waitingFor.item}`);
```

Output:

```text
Still waiting on the kitchen.
Warning: this order contains nuts.
Waiting for: Peanut brownie
```

Notice how `some` and `every` fit **straight into an `if`**, because they return `true` or `false`. The code reads almost like the question you would ask a waiter. (The last line is safe without a check only because we already know from `every` that something is not ready. In general, check `find`'s answer.)

## Choosing the right one

| Your question | Method | Gives you | If nothing matches | Stops early? |
|---|---|---|---|---|
| Which is the first one that matches? | `find` | the item | `undefined` | yes |
| Where is the first one that matches? | `findIndex` | its index | `-1` | yes |
| Is there **at least one** that matches? | `some` | `true` / `false` | `false` | yes |
| Do **all** of them match? | `every` | `true` / `false` | (empty list: `true`) | yes |
| Which are **all** the ones that match? | `filter` | a new array | `[]` | no |
| Is this exact simple value in the list? | `includes` | `true` / `false` | `false` | yes |

A quick way to choose: say your question out loud. "*Find* the student with ID 103." "Is there *some* item with nuts?" "Is *every* item ready?" The method name is usually in the sentence.

::: exercise Level 1 — Guided · Password checker
Create `phase-7/password.js`.

1. Create `const password = "Braai2025!";`.
2. Turn it into an array of single characters with `password.split("")` (from [split and join](#/phase-05-arrays/05-strings-and-arrays)). Call it `characters`.
3. Create `hasDigit` using `characters.some(...)`. The test: `"0123456789".includes(ch)`.
4. Create `hasNoSpaces` using `characters.every(...)`. The test: `ch !== " "`.
5. Create `longEnough` as `password.length >= 8`.
6. Print all three with labels, and then print `"Strong enough:"` with all three joined by `&&`.
7. Run it. All four lines should say `true`. Then change the password to `"braai 12"` and predict each line before running it again.
:::

::: solution
```js
const password = "Braai2025!";
const characters = password.split("");

const hasDigit = characters.some((ch) => "0123456789".includes(ch));
const hasNoSpaces = characters.every((ch) => ch !== " ");
const longEnough = password.length >= 8;

console.log("Has a digit:", hasDigit);
console.log("Has no spaces:", hasNoSpaces);
console.log("Long enough:", longEnough);
console.log("Strong enough:", hasDigit && hasNoSpaces && longEnough);
```
Output:
```text
Has a digit: true
Has no spaces: true
Long enough: true
Strong enough: true
```
With `"braai 12"`: it has a digit (`true`), it has a space (`false`), and it is exactly 8 characters long (`true`), so it is not strong enough (`false`).
:::

::: exercise Level 2 — On your own · The library desk
Create `phase-7/library.js` with:

```js
const books = [
  { title: "Long Walk to Freedom", borrowed: false },
  { title: "Things Fall Apart", borrowed: true },
  { title: "Born a Crime", borrowed: false },
];
```

Write a function `borrowBook(title)` that:
- finds the book whose title matches, ignoring capital letters,
- prints `Sorry, we do not have "<title>".` if there is no such book,
- prints `"<title>" is already out.` if it is borrowed,
- otherwise sets `borrowed` to `true` and prints `Enjoy "<title>"!`.

Test it with `"born a crime"` (twice, the second time with capitals as `"Born a Crime"`), `"Things Fall Apart"` and `"Harry Potter"`. Finally, print whether **every** book is now borrowed.
:::

::: hint
Use `find` with a test that compares `b.title.toLowerCase()` with `title.toLowerCase()`. Check for `undefined` first, then for `borrowed`. Because `find` gives you the real object (a reference), setting `book.borrowed = true` changes the book inside `books`.
:::

::: solution
```js
const books = [
  { title: "Long Walk to Freedom", borrowed: false },
  { title: "Things Fall Apart", borrowed: true },
  { title: "Born a Crime", borrowed: false },
];

function borrowBook(title) {
  const book = books.find((b) => b.title.toLowerCase() === title.toLowerCase());
  if (book === undefined) {
    console.log(`Sorry, we do not have "${title}".`);
  } else if (book.borrowed) {
    console.log(`"${book.title}" is already out.`);
  } else {
    book.borrowed = true;
    console.log(`Enjoy "${book.title}"!`);
  }
}

borrowBook("born a crime");
borrowBook("Born a Crime");
borrowBook("Things Fall Apart");
borrowBook("Harry Potter");
console.log(books.every((b) => b.borrowed));
```
Output:
```text
Enjoy "Born a Crime"!
"Born a Crime" is already out.
"Things Fall Apart" is already out.
Sorry, we do not have "Harry Potter".
false
```
The last line is `false` because "Long Walk to Freedom" is still on the shelf.
:::

::: debug Hello, undefined
This program should print `Hello, Olivia!`. It does not crash, but it prints the wrong thing. Why? Fix it by changing one word.

```js
const students = [
  { id: 101, name: "Kagiso" },
  { id: 102, name: "Olivia" },
];

const student = students.filter((s) => s.id === 102);
console.log(`Hello, ${student.name}!`);
```
:::

::: solution
It prints `Hello, undefined!`. `filter` always returns an **array**, even when only one item matches. So `student` is `[ { id: 102, name: 'Olivia' } ]`, a list with Olivia inside it. An array has no `name` property, so `student.name` is `undefined`.

Change `filter` to `find`, which returns the item itself:
```js
const student = students.find((s) => s.id === 102);
console.log(`Hello, ${student.name}!`);
```
Output:
```text
Hello, Olivia!
```
(`student[0].name` would also work, but if you only ever want one item, `find` says what you mean.)
:::

::: mistake
**Using `filter` when you want one item.** You get an array back, and `.name` on an array is `undefined`. Use `find`.

**Using `find`'s answer without checking.** If nothing matches, you get `undefined`, and `.name` crashes with `TypeError: Cannot read properties of undefined`. Check `=== undefined` first.

**Forgetting to check `findIndex` for `-1`.** `splice(-1, 1)` removes the last item, which is almost never what you meant.

**Using `indexOf` to search inside objects.** It compares whole objects by address and returns `-1`. Use `findIndex` with a test.

**Mixing up `some` and `every`.** Say the question out loud: "is there *any*?" is `some`; "are they *all*?" is `every`.

**Forgetting that `every` on an empty list is `true`.** Check `.length` too if an empty list should count as "no".
:::

## Real-world uses

- **find:** "open the product with ID 5021", "log in the user with this email address".
- **findIndex:** "remove this item from the cart", "update the third song in the playlist".
- **some:** "is any field on this form empty?", "does this order contain an item with nuts?", "has anyone in the group chat replied?"
- **every:** "have all the parcels been delivered?", "is every answer in the quiz filled in?", "are all the players ready to start?"

::: connect
**This builds on:** "find the first match" and "any/all" from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand), the **flag** pattern from [loop patterns](#/phase-03-loops/04-loop-patterns), `return` stopping a function from [Return values](#/phase-04-functions/03-return-values), and the test functions from [filter](#/phase-07-functions-as-values/04-filter).

**This unlocks:** the last big pattern, the accumulator. Next, [reduce](#/phase-07-functions-as-values/06-reduce) boils a whole list down to one value, such as a total.
:::

::: challenge Write your own findIndex
Write `myFindIndex(array, test)` with a loop. It should return the index of the first item that passes the test, or `-1` if none do.

Test it on:

```js
const queue = ["Refilwe", "Dmitri", "Ayanda", "Chloe"];
```

- the first name that starts with `"A"` (use `name[0] === "A"`), which should give `2`, and
- the first name longer than 10 letters, which should give `-1`.

Check your first answer against the real `findIndex`.
:::

::: solution
```js
function myFindIndex(array, test) {
  for (let i = 0; i < array.length; i++) {
    if (test(array[i])) {
      return i;
    }
  }
  return -1;
}

const queue = ["Refilwe", "Dmitri", "Ayanda", "Chloe"];
console.log(myFindIndex(queue, (name) => name[0] === "A"));
console.log(queue.findIndex((name) => name[0] === "A"));
console.log(myFindIndex(queue, (name) => name.length > 10));
```
Output:
```text
2
2
-1
```
You need the counting `for` loop here (not `for...of`), because the answer *is* the index.
:::

::: recap
- `find(test)` returns the **first item** that passes, or `undefined`. Check for `undefined` before you use it.
- `findIndex(test)` returns the **index** of the first item that passes, or `-1`. Check for `-1` before you use it.
- `some(test)` returns `true` if **at least one** item passes. It is the flag pattern: start `false`, flip to `true`.
- `every(test)` returns `true` only if **all** items pass. Start `true`, flip to `false` on the first failure. An empty list gives `true`.
- All four **stop early** as soon as they know the answer. `forEach`, `map` and `filter` always visit every item.
- `some` and `every` fit directly into an `if`.
- `filter` gives an array (even of one). `find` gives the item.
- `indexOf`/`includes` for exact simple values; `findIndex`/`some` when you need a test.
:::

::: interview What is the difference between find and filter?
`find` returns the first matching item itself (or `undefined`) and stops as soon as it finds it. `filter` returns a new array of *all* matching items (possibly empty) and always checks every item.
:::

::: interview How would you check whether any expense in a list is over R1000?
`expenses.some((expense) => expense.amount > 1000)`. It returns `true` as soon as it finds one, or `false` if none are.
:::

::: interview Why does `[].every((x) => x > 0)` return true?
`every` starts by assuming the answer is yes, and only changes its mind when it finds an item that fails. An empty array has no items, so nothing fails, and the answer stays `true`.
:::

::: checkpoint
- [ ] I wrote `myFind`, `mySome` and `myEvery` with loops, and compared them with the real methods
- [ ] I saw `TypeError: Cannot read properties of undefined` from an unchecked `find`, and fixed it with an `if`
- [ ] I used `findIndex` with `splice` to remove an item, checking for `-1` first
- [ ] I watched `some` stop early by printing inside the callback
- [ ] I finished the password checker and the library desk
- [ ] I can pick the right method from a question said out loud
:::

::: resources
- **javascript.info, "Array methods":** https://javascript.info/array-methods. The "Searching in array" section covers `find`, `findIndex` and friends.
- **MDN, "Array.prototype.find()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find. The reference page. Links to `findIndex`, `some` and `every` are in the sidebar.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `mySome` and step through it to watch the early `return` happen.
:::
