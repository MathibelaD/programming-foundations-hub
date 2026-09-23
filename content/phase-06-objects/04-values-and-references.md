---
title: Copies and references — the surprise that catches everyone
summary: Why changing a "copy" of an array or object changes the original too, and how to make real copies when you need them.
minutes: 50
stage: Phase 6
---

## What you will learn

- Why numbers and strings are **copied**, but arrays and objects are **shared**
- How to spot the classic bug where changing a "copy" changes the original, including inside functions
- How to make a real copy with the **spread** syntax, `[...list]` and `{...obj}`, and where that copy stops
- Why `===` says two identical-looking arrays are *not* equal

**Before this:** [Objects and functions together](#/phase-06-objects/03-objects-and-functions).

## A promise from Phase 1

Back in [Variables](#/phase-01-storing-information/02-variables) there was a "Predict the output" question:

```js
let a = 5;
let b = a;
a = 20;
console.log(a);
console.log(b);
```

Output:

```text
20
5
```

The answer said `b` got a **copy** of `5`, so changing `a` later did not affect `b`. And then it added: *"There is a twist for lists and objects in Phase 6. Park that thought for now."*

This is Phase 6. Here is the twist.

## The surprise

You have a shopping list for Monday. For Friday you want the same list plus braai wood, so you "copy" it and add to the copy:

```js
const mondayList = ["bread", "milk"];
const fridayList = mondayList;

fridayList.push("braai wood");

console.log("Friday:", fridayList);
console.log("Monday:", mondayList);
```

Output:

```text
Friday: [ 'bread', 'milk', 'braai wood' ]
Monday: [ 'bread', 'milk', 'braai wood' ]
```

Monday's list changed too, even though we only touched `fridayList`. It is the same with objects:

```js
const original = { name: "Thabo", grade: 9 };
const copy = original;

copy.name = "Keabetswe";

console.log(original.name);
console.log(copy.name);
```

Output:

```text
Keabetswe
Keabetswe
```

If this feels wrong, good: it feels wrong to everybody the first time. This is one of the most common sources of bugs in JavaScript (and in Python, Java, C# and many other languages, which all work the same way). Once you understand the picture below, it will stop being a surprise and start being a tool.

::: analogy A house and its address
A number or a short piece of text is small, so the variable's box holds the value itself. When you copy it, you get a second, separate value.

An array or an object is more like a **house**. It can be big, and it can grow (you can add rooms). So JavaScript does not squeeze the house into the variable's box. The house is built somewhere else, and the box holds a slip of paper with **the house's address** on it.

Now think about what `const fridayList = mondayList;` does. It copies **what is in the box**, which is the slip of paper. So now you have **two slips with the same address**, and only **one house**.

When you write `fridayList.push("braai wood")`, you are saying "go to the address on the `fridayList` slip, and put braai wood inside that house". Then `console.log(mondayList)` means "go to the address on the `mondayList` slip and look inside". Same address, same house, so of course you see the braai wood.

Nobody copied the house. You only photocopied the address.
:::

Here is the picture as a diagram. Numbers live in the boxes; arrays live elsewhere, and the boxes hold their address:

```text
  let a = 5;  let b = a;               const mondayList = [...];  const fridayList = mondayList;

  a: [ 5 ]                              mondayList: [ address #1 ] ----+
  b: [ 5 ]    two separate 5s                                          +---> #1: ["bread", "milk", "braai wood"]
                                        fridayList: [ address #1 ] ----+
                                                     one house, two slips
```

## The words for this

- Numbers, strings, booleans, `null` and `undefined` are called **primitive values** (or primitives). A variable holds the value itself. Copying a variable copies the value.
- Arrays and objects are stored elsewhere, and a variable holds a **reference** to them: the "address". Copying the variable copies the reference, so both names **refer to** the same array or object.

When two names refer to the same object, programmers say they **share** it. Changing a shared object through one name (pushing, setting a property, deleting) is called **mutating** it, and every name that shares it sees the change.

Side by side:

```js
let score = 10;
let savedScore = score;
score = 99;
console.log(savedScore);

const team = ["Ama", "Ben"];
const savedTeam = team;
team.push("Chen");
console.log(savedTeam);
```

Output:

```text
10
[ 'Ama', 'Ben', 'Chen' ]
```

`savedScore` really saved the score. `savedTeam` did not save anything: it is a second name for the same team.

::: try See it for yourself
1. Create `phase-6/references.js` and type in the shopping-list example (the one with `mondayList` and `fridayList`).
2. Run it from `coding-practice` with `node phase-6/references.js` and confirm both lists have braai wood.
3. **Change one thing:** add `console.log(mondayList === fridayList);` at the end. Predict `true` or `false`, then run it. (It is `true`: both names hold the same address. More on this below.)
4. **See the boxes:** open [Python Tutor in JavaScript mode](https://pythontutor.com/javascript.html), paste in the same code, and click "Visualize Execution". Step forward line by line. You will see `mondayList` and `fridayList` drawn as two arrows pointing at **one** array. That drawing is the house-and-address picture.
:::

## A realistic bug

Here is how this bites in a real program. An app has default settings, and every new user starts with them:

```js
const template = { theme: "light", fontSize: 14 };

const zanele = template;
const pieter = template;

zanele.theme = "dark";

console.log("Zanele:", zanele);
console.log("Pieter:", pieter);
```

Output:

```text
Zanele: { theme: 'dark', fontSize: 14 }
Pieter: { theme: 'dark', fontSize: 14 }
```

Zanele switched to dark mode, and Pieter's screen went dark too. So did the template, and so will every user created from now on. Each line of this program looks innocent, which is exactly why this kind of bug can take hours to find.

## Functions receive the address too

When you pass an array or object to a function, the parameter gets a copy of the **reference**, not a copy of the array. So the function can change the caller's array. You saw a hint of this with `applyDiscount` in the last lesson. Here it is again with an array:

```js
function applySale(prices) {
  for (let i = 0; i < prices.length; i++) {
    prices[i] = prices[i] / 2;
  }
  return prices;
}

const shelfPrices = [100, 250, 40];
const salePrices = applySale(shelfPrices);

console.log("Sale prices: ", salePrices);
console.log("Shelf prices:", shelfPrices);
```

Output:

```text
Sale prices:  [ 50, 125, 20 ]
Shelf prices: [ 50, 125, 20 ]
```

The shop wanted a list of sale prices for a poster, and accidentally halved its real prices too. `prices` inside the function and `shelfPrices` outside hold the same address.

Compare a number, which is copied:

```js
function doubleIt(n) {
  n = n * 2;
  return n;
}

const points = 7;
console.log(doubleIt(points));
console.log(points);
```

Output:

```text
14
7
```

The fix for `applySale` is the transform ("map by hand") pattern from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand): build a **new** array and leave the original alone.

```js
function halfPrices(prices) {
  const result = [];
  for (const price of prices) {
    result.push(price / 2);
  }
  return result;
}

const shelfPrices = [100, 250, 40];
const salePrices = halfPrices(shelfPrices);

console.log("Sale prices: ", salePrices);
console.log("Shelf prices:", shelfPrices);
```

Output:

```text
Sale prices:  [ 50, 125, 20 ]
Shelf prices: [ 100, 250, 40 ]
```

This is why [pure functions](#/phase-04-functions/06-designing-with-functions) are so valuable: a function that only *reads* its inputs and *returns* something new cannot cause this bug.

::: note Sometimes changing the original is exactly what you want
Mutating is not always wrong. In Budget Buddy v5, `removeExpense(expenses)` called `expenses.splice(...)` inside a function, and that worked **because** the function and the main program shared the same array. The removal needed to happen to the real list. The rule is not "never mutate". The rule is: **know which one you are doing**, and give the function a name that says so (`removeExpense` clearly changes things; `halfPrices` sounds like it gives you something new).
:::

## Changing the house vs changing the address

There is one more piece to the picture, and it clears up a lot. Look at this:

```js
let a = ["x", "y"];
let b = a;

b = ["something", "new"];

console.log(a);
console.log(b);
```

Output:

```text
[ 'x', 'y' ]
[ 'something', 'new' ]
```

This time `a` did **not** change. Why? Because `b = [...]` does not go to the house. It builds a **new house** and writes the new address on `b`'s slip. `a`'s slip still has the old address.

So there are two very different kinds of line:

| Line | What it does | Affects others sharing the object? |
|---|---|---|
| `b.push(...)`, `b[0] = ...`, `b.name = ...`, `delete b.name` | Goes to the house and **changes what is inside** (mutating) | **Yes** |
| `b = something` | Writes a **new address** on `b`'s own slip (reassigning) | **No** |

The same goes for functions:

```js
function replaceList(list) {
  list = ["new", "list"];
}

function addToList(list) {
  list.push("sweep");
}

const chores = ["dishes", "laundry"];
replaceList(chores);
console.log(chores);
addToList(chores);
console.log(chores);
```

Output:

```text
[ 'dishes', 'laundry' ]
[ 'dishes', 'laundry', 'sweep' ]
```

`replaceList` only changed its own local slip. `addToList` went to the house.

And now the mystery from [Changing arrays](#/phase-05-arrays/02-changing-arrays) is solved. `const` locks the **slip**: you cannot write a new address on it. It does not lock the **house**:

```js
const box = ["a"];
box.push("b");
console.log(box);
box = ["c"];
```

Output:

```text
[ 'a', 'b' ]
TypeError: Assignment to constant variable.
```

`push` changes the house, which `const` allows. `box = ["c"]` tries to write a new address on a `const` slip, which it does not. Node points at the `=` on line 4.

## Making a real copy: spread

So how do you get a real, separate copy? With the **spread** syntax: three dots, `...`, which means "spread out all the items from this one, here".

For an array, put the spread inside new square brackets:

```js
const mondayList = ["bread", "milk"];
const fridayList = [...mondayList];

fridayList.push("braai wood");

console.log("Friday:", fridayList);
console.log("Monday:", mondayList);
```

Output:

```text
Friday: [ 'bread', 'milk', 'braai wood' ]
Monday: [ 'bread', 'milk' ]
```

Read `[...mondayList]` as "a **new** array (the new square brackets), filled with all the items of `mondayList` (the spread)". A new house, with the same furniture copied in.

For an object, it is the same idea with curly brackets:

```js
const template = { theme: "light", fontSize: 14 };

const zanele = { ...template };
const pieter = { ...template };

zanele.theme = "dark";

console.log("Zanele:", zanele);
console.log("Pieter:", pieter);
```

Output:

```text
Zanele: { theme: 'dark', fontSize: 14 }
Pieter: { theme: 'light', fontSize: 14 }
```

The settings bug is fixed. Each user has their own house.

Spread can also add things while copying, which is very handy:

```js
const basics = ["rice", "oil"];
const bigShop = [...basics, "chicken", "spinach"];
console.log(bigShop);

const learner = { name: "Nandi", grade: 11 };
const promoted = { ...learner, grade: 12 };
console.log(learner);
console.log(promoted);
```

Output:

```text
[ 'rice', 'oil', 'chicken', 'spinach' ]
{ name: 'Nandi', grade: 11 }
{ name: 'Nandi', grade: 12 }
```

In `{ ...learner, grade: 12 }`, the properties are copied first, then `grade: 12` replaces the copied grade. The original `learner` is untouched. This is a common way to make "the same, but with one change".

::: try Fix the Friday list
1. Open `phase-6/references.js` again.
2. Change `const fridayList = mondayList;` to `const fridayList = [...mondayList];`.
3. Predict both lines, then run it. Monday's list should no longer have braai wood.
4. Change the last line to `console.log(mondayList === fridayList);`. Predict, then run. (Now it is `false`: two different houses.)
5. **Your own:** make an object `const order = { item: "kota", price: 35 };`, then use spread to make `bigOrder` with the same item but a price of `45`. Print both and check `order` still costs 35.
:::

## Spread copies one level only

Spread copies the **top level**: it makes a new array or object, and copies each item or property into it. But if one of those properties is itself an object or array, what gets copied is its **address**. The inner house is still shared.

```js
const person = {
  name: "Aisha",
  address: { city: "Durban" },
};

const twin = { ...person };
twin.name = "Amina";
twin.address.city = "Cape Town";

console.log(person);
console.log(twin);
```

Output:

```text
{ name: 'Aisha', address: { city: 'Cape Town' } }
{ name: 'Amina', address: { city: 'Cape Town' } }
```

The `name` change stayed in `twin`, because `name` is a string and was copied. But the `address` object was shared, so moving the twin to Cape Town moved Aisha too. A copy like this is called a **shallow copy**: new on the outside, shared on the inside.

If you need the inner object copied as well, spread that level too:

```js
const person = {
  name: "Aisha",
  address: { city: "Durban" },
};

const twin = { ...person, address: { ...person.address } };
twin.address.city = "Cape Town";

console.log(person.address.city);
console.log(twin.address.city);
```

Output:

```text
Durban
Cape Town
```

For most everyday code a shallow copy is all you need. Remember that it is shallow, so this does not surprise you later. (The next lesson shows another way to copy everything, all the way down.)

## `===` compares addresses, not contents

Now that you know variables hold addresses, this makes sense:

```js
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = a;

console.log(a === b);
console.log(a === c);
console.log({ name: "Sam" } === { name: "Sam" });
console.log("Sam" === "Sam");
```

Output:

```text
false
true
false
true
```

- `a === b` is `false`. They *look* the same, but they are two different houses that happen to have the same furniture. `===` on arrays and objects asks "**is this the same house?**", not "do they contain the same things?".
- `a === c` is `true`: same address.
- Two object literals are always two different houses, so `false`.
- Strings are primitives, so `===` compares the text itself: `true`.

If you want to know whether two arrays hold the same items, you have to check the items yourself, with a loop:

```js
function sameLists(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      return false;
    }
  }
  return true;
}

console.log(sameLists([1, 2, 3], [1, 2, 3]));
console.log(sameLists([1, 2, 3], [1, 2, 4]));
```

Output:

```text
true
false
```

::: predict What does this print?
```js
const original = [10, 20, 30];
const alias = original;
const copy = [...original];

alias.push(40);
copy.push(99);

console.log(original);
console.log(alias);
console.log(copy);
console.log(original === alias);
console.log(original === copy);
```
Draw the slips and houses on paper first. It really helps.
:::

::: solution
```text
[ 10, 20, 30, 40 ]
[ 10, 20, 30, 40 ]
[ 10, 20, 30, 99 ]
true
false
```
`alias` shares the house with `original`, so pushing `40` through `alias` shows up in both. `copy` is its own house (made with spread), so `99` only goes there. `===` asks "same house?": yes for `alias`, no for `copy`.
:::

::: exercise Level 1 — Guided · A queue that stays put
The bank wants to see what its queue will look like after the next person is served, **without** actually serving them yet. Create `phase-6/queue.js`.

1. Make `const bankQueue = ["Lwazi", "Fatima", "Oliver"];`.
2. Write a function `removeFirst(queue)`. Inside it, first make a copy: `const copy = [...queue];`.
3. Call `copy.shift();` to remove the first person **from the copy**, then `return copy;`.
4. Call it: `const later = removeFirst(bankQueue);`.
5. Print `later` and `bankQueue` with labels, and check the original still has Lwazi.
6. Now delete the spread (use `const copy = queue;`) and run it again. What happens to the original? Put the spread back.
:::

::: solution
```js
function removeFirst(queue) {
  const copy = [...queue];
  copy.shift();
  return copy;
}

const bankQueue = ["Lwazi", "Fatima", "Oliver"];
const later = removeFirst(bankQueue);
console.log("Later:", later);
console.log("Original:", bankQueue);
```
Output:
```text
Later: [ 'Fatima', 'Oliver' ]
Original: [ 'Lwazi', 'Fatima', 'Oliver' ]
```
Without the spread, `copy` and `queue` and `bankQueue` all share one array, so `shift` removes Lwazi from the real queue, and `Original:` shows only Fatima and Oliver.
:::

::: debug Three reference bugs
Each program runs without crashing but does the wrong thing. Explain the bug using the house-and-address picture, then fix it.

```js
// Program A: a "draft" of a message
const message = { to: "Gogo", text: "Happy birthday!" };
const draft = message;
draft.text = "Happy birthday!! Love you";

console.log("Sent:", message.text);
console.log("Draft:", draft.text);
```

```js
// Program B: top marks, without changing the class list
function sortedHighToLow(marks) {
  const result = marks;
  // swap the first two if they are the wrong way round
  if (result[0] < result[1]) {
    const temp = result[0];
    result[0] = result[1];
    result[1] = temp;
  }
  return result;
}

const classMarks = [55, 80];
const ranked = sortedHighToLow(classMarks);
console.log("Ranked:", ranked);
console.log("Class list:", classMarks);
```

```js
// Program C: did the settings change?
const saved = { volume: 5 };
const current = { volume: 5 };

if (saved === current) {
  console.log("Nothing changed.");
} else {
  console.log("You have unsaved changes!");
}
```
:::

::: solution
**A** prints `Happy birthday!! Love you` for both. `draft` holds the same address as `message`, so editing the draft edits the sent message. Fix: `const draft = { ...message };`. Then `Sent:` stays `Happy birthday!`.

**B** prints `[ 80, 55 ]` for both. The comment promises not to change the class list, but `const result = marks;` is only a second slip for the same array. The swap happens in the real list. Fix: `const result = [...marks];`. Then `Class list:` stays `[ 55, 80 ]`.

**C** prints `You have unsaved changes!` even though nothing changed. `===` compares addresses, and these are two separate objects. Compare the contents instead: `if (saved.volume === current.volume)`. Then it prints `Nothing changed.`.
:::

::: mistake
**Thinking `=` copies an array or object.** `const b = a;` gives you a second name for the **same** array. Use `[...a]` or `{...a}` for a separate copy.

**Changing an argument by accident.** A function that pushes to, sets or splices a parameter changes the caller's data. If you do not mean to, copy first or build a new array.

**Expecting `===` to compare contents.** `[1, 2] === [1, 2]` is `false`. Compare the items or properties yourself.

**Forgetting that spread is shallow.** Objects and arrays *inside* the copy are still shared. Spread the inner level too if you are going to change it.

**Thinking `const` means "cannot change".** `const` stops you pointing the name at a different array or object. The contents can still change.
:::

## Real-world uses

- **Undo and history.** Editors and games keep copies of earlier states. If the "saved" state were only a reference, it would change along with the current one, and undo would do nothing.
- **"Unsaved changes" warnings.** An app keeps a copy of your settings when you open a form, and compares it with what you have now. It must be a real copy, and the comparison must look at contents, not addresses.
- **Shared data on purpose.** Two parts of a program (say, a list screen and a total at the bottom) can share one array so both always see the latest data. That is references working *for* you.
- **Popular web tools** such as React expect you to make a new array or object (often with spread) instead of changing the old one, so they can notice that something changed. You now understand why.

::: connect
**This builds on:** the Phase 1 promise in [Variables](#/phase-01-storing-information/02-variables), the `const` array puzzle in [Changing arrays](#/phase-05-arrays/02-changing-arrays), [pure functions](#/phase-04-functions/06-designing-with-functions), and the `applyDiscount` warning in [Objects and functions together](#/phase-06-objects/03-objects-and-functions).

**This unlocks:** in Budget Buddy v6, a function receives the `budget` object and pushes to `budget.expenses`, and the main program sees the change. That works *because* of references. In Phase 7, [sort](#/phase-07-functions-as-values/07-sort-and-chaining) changes the original array, and you will copy with `[...arr]` first. Next, [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json) lets your data survive after the program ends.
:::

::: challenge Clone a team properly
A coach has a team and wants a second team with the same players, plus one more:

```js
const teamA = { name: "Lions", players: ["Kamo", "Dylan"] };
const teamB = { ...teamA };
teamB.name = "Tigers";
teamB.players.push("Ravi");

console.log(teamA);
console.log(teamB);
```

1. Predict the output, then run it. Explain what went wrong.
2. Write a function `cloneTeam(team)` that returns a copy where changing the name **or** the players list does not affect the original. Use it to make `teamB` and show that `teamA` is untouched.
:::

::: solution
The first version prints:
```text
{ name: 'Lions', players: [ 'Kamo', 'Dylan', 'Ravi' ] }
{ name: 'Tigers', players: [ 'Kamo', 'Dylan', 'Ravi' ] }
```
The spread made a new outer object, so the name change stayed in `teamB`. But `players` is an array, and only its address was copied. Both teams share one players list, so Ravi joined the Lions too. A shallow copy.

Copy the inner array as well:
```js
function cloneTeam(team) {
  const newTeam = { ...team, players: [...team.players] };
  return newTeam;
}

const teamA = { name: "Lions", players: ["Kamo", "Dylan"] };
const teamB = cloneTeam(teamA);
teamB.name = "Tigers";
teamB.players.push("Ravi");

console.log(teamA);
console.log(teamB);
```
Output:
```text
{ name: 'Lions', players: [ 'Kamo', 'Dylan' ] }
{ name: 'Tigers', players: [ 'Kamo', 'Dylan', 'Ravi' ] }
```
:::

::: recap
- **Primitive values** (numbers, strings, booleans, `null`, `undefined`) live in the variable itself. Copying the variable copies the value.
- **Arrays and objects** live elsewhere, and the variable holds a **reference** (the address). Copying the variable copies the address, so both names share one object.
- **Mutating** (`push`, `splice`, `obj.x = ...`) changes the shared object, and everyone sharing it sees the change. **Reassigning** (`b = ...`) only changes that one name.
- Functions receive the reference too, so a function can change the caller's array or object. Copy first, or build a new one, if that is not what you want.
- Make a real copy with **spread**: `[...arr]` and `{ ...obj }`. Add or replace while copying: `{ ...learner, grade: 12 }`.
- Spread is a **shallow copy**: nested objects and arrays are still shared.
- `===` on arrays and objects compares **addresses**, not contents.
:::

::: interview Why does changing `b` also change `a` after `const b = a;` when `a` is an array?
Because the variable `a` holds a reference (an address) to the array, not the array itself. `const b = a;` copies the reference, so both names point at the same single array. Mutating it through `b` changes the array that `a` also points to. To get a separate array, copy it with `[...a]`.
:::

::: interview What is the difference between a shallow copy and the original sharing?
With `const b = a`, nothing is copied: `a` and `b` are the same object. With a shallow copy (`{ ...a }`), `b` is a new object with its own top-level properties, so changing `b.name` does not affect `a`. But any objects or arrays inside are still shared, so `b.address.city = ...` would change `a` too.
:::

::: interview Why is `[1, 2] === [1, 2]` false?
Each `[1, 2]` creates a separate array in a different place. `===` on arrays and objects asks "is this the very same array?" (the same reference), not "do they contain the same items?". To compare contents, loop over the items and compare them one by one.
:::

::: checkpoint
- [ ] I ran the shopping-list surprise and saw Monday's list change
- [ ] I stepped through it in Python Tutor and saw two arrows pointing at one array
- [ ] I fixed it with `[...mondayList]` and checked `===` before and after
- [ ] I wrote `removeFirst` and saw what happens without the spread
- [ ] I fixed all three reference bugs
- [ ] I can explain the house-and-address picture out loud, including why `const` arrays can still change
:::

::: resources
- **javascript.info, "Object references and copying":** https://javascript.info/object-copy. The same idea, with diagrams, and a section on nested copies.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. The best way to *see* references. Paste in any example from this lesson and step through it.
- **MDN, "Spread syntax":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax. The reference page for `...`. Skim the array and object examples; skip the rest for now.
:::
