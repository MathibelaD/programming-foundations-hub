---
title: Classic list algorithms, written by hand
summary: Total, average, biggest, count, filter, transform, find, any and all. The seven jobs you will do with lists for the rest of your programming life, built from loops you already know.
minutes: 75
stage: Phase 5
---

## What you will learn

- How the loop patterns from Phase 3 (accumulator, counter, max/min, flag) work on arrays
- How to **build a new array** from an old one: keeping only some items (**filtering**) or changing every item (**mapping**)
- How to **find** the first item that matches, and check whether **any** or **all** items match
- The name of each pattern, so you recognise it everywhere, including in the shortcuts you will meet in Phase 7

**Before this:** [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays), and the patterns in [The classic loop patterns](#/phase-03-loops/04-loop-patterns).

This is a long lesson and one of the most important in the course. Take it in two or three sittings if you like. Each section stands on its own.

## The problem: the same questions, over and over

Once you have a list of anything, you will find yourself asking the same few questions about it, again and again:

- **"How much altogether?"** What did I spend on groceries this month?
- **"What is the biggest?"** Which was the hottest day this week?
- **"How many?"** How many learners passed?
- **"Which ones?"** Show me only the expenses over R500.
- **"What if every one was changed?"** What are these prices with VAT? What does this recipe need for six people instead of four?
- **"Where is the first one?"** Find the first transaction over R500.
- **"Are any…? Are all…?"** Is any payment negative? Did everyone hand in their homework?

These questions come up in banking apps, school systems, games, shops, spreadsheets and sports statistics. The good news: there are only about seven of them, and each one has a standard recipe. Programmers call such a recipe an **algorithm**: a step-by-step method for solving a problem, precise enough for a computer to follow.

In Phase 3 you learned these patterns with numbers from a counting loop or from `prompt`, because you had no lists yet. You now have lists. Let's put the two together.

::: analogy A clerk with a clipboard
Imagine a clerk going through a pile of receipts, one at a time, with a clipboard. What they write on the clipboard depends on the question they were asked:

- **"What is the total?"** They write a running total and update it after every receipt.
- **"What is the biggest?"** They write "biggest so far", and cross it out whenever a bigger one comes along.
- **"How many are over R500?"** They make a tally mark for each one.
- **"Give me the ones over R500."** They have an empty tray, and drop in a copy of each matching receipt.
- **"Find me the first one over R500."** They stop as soon as they find it and hand it over.

Every algorithm in this lesson is the same clerk, walking through the same pile, one item at a time. The only difference is **what is on the clipboard** (the variable before the loop), and **what they do with each item** (the loop body).
:::

Every algorithm in this lesson has the same shape:

```text
set up something to remember (before the loop)
for each item in the list:
    look at the item, and maybe update what you remember
hand back what you remember (after the loop)
```

Keep that shape in mind. You will see it seven times.

::: note How the tests work in this lesson
Each algorithm goes in its own [pure function](#/phase-04-functions/06-designing-with-functions): it takes an array, and **returns** an answer, with no printing inside. We test the functions with a small `check` helper like the one you wrote in Phase 4:

```js
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}
```

One catch: `===` cannot tell you whether two *arrays* hold the same items. (It asks something different, "are these the very same array?", which [Phase 6](#/phase-06-objects/04-values-and-references) explains.) So when a function returns an array, we turn it into text first with `String()`, which you met in [Converting between types](#/phase-01-storing-information/07-converting-between-types): `String([72, 91])` gives `"72,91"`, and text *can* be compared with `===`.
:::

## 1. Total and average (the accumulator)

**The question:** How much altogether? What is the typical value?

**The recipe in plain words:**

1. Start a running total at 0.
2. For each item, add it to the total.
3. After the loop, the total is the answer.
4. For the average, divide the total by how many items there are, but only if there is at least one item.

```js
function totalOf(numbers) {
  let total = 0;
  for (const n of numbers) {
    total = total + n;
  }
  return total;
}

function averageOf(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  return totalOf(numbers) / numbers.length;
}
```

**Trace** of `totalOf([30, 12, 50])`:

| Iteration | `n` | `total` after |
|---|---|---|
| (before) | — | 0 |
| 1 | 30 | 30 |
| 2 | 12 | 42 |
| 3 | 50 | 92 |

Returns `92`. The average would be `92 / 3`.

Why does `averageOf` check for an empty list? Because `0 / 0` in JavaScript is `NaN`. "Average of nothing" has no real answer, so we decide on a sensible one (0) and return early, before dividing. This is the [early return](#/phase-04-functions/03-return-values) you learned in Phase 4, guarding against a bad case.

Notice also that `averageOf` **uses** `totalOf`. Small functions that build on each other are how real programs are made.

::: try Grocery receipts
1. Create `phase-5/receipts.js` in `coding-practice`:
   ```js
   function totalOf(numbers) {
     let total = 0;
     for (const n of numbers) {
       total = total + n;
     }
     return total;
   }

   function averageOf(numbers) {
     if (numbers.length === 0) {
       return 0;
     }
     return totalOf(numbers) / numbers.length;
   }

   const receipts = [120.5, 89.99, 240, 45.25];

   console.log(`Total: R${totalOf(receipts).toFixed(2)}`);
   console.log(`Average: R${averageOf(receipts).toFixed(2)}`);
   console.log(`Empty list average: ${averageOf([])}`);
   ```
2. Run it:
   ```bash
   node phase-5/receipts.js
   ```
3. You should see:
   ```text
   Total: R495.74
   Average: R123.94
   Empty list average: 0
   ```
4. **Now experiment.** Delete the `if` block in `averageOf`, predict what the last line prints, and run it. Then put it back.
:::

**Real-world example:** your bank's "total spent this month", a learner's average mark, the average rating of a restaurant, a cricketer's total runs for the season.

**The pattern's name:** the **accumulator** pattern (you "accumulate" a result). Boiling a whole list down to one value like this is also called **reducing** the list. Keep that word in mind for Phase 7.

::: quiz
These amounts came from `prompt`, so they are strings. What does this print?

```js
const typed = ["20", "35", "5"];
let total = 0;
for (const t of typed) {
  total = total + t;
}
console.log(total);
```

- [ ] `60`
- [x] `020355`
- [ ] `20355`
- [ ] `NaN`

The accumulator starts as the number 0, but `0 + "20"` has a string in it, so `+` glues: `"020"`. From then on `total` is a string, and each piece is glued on: `"02035"`, then `"020355"`. If you picked `20355`, you forgot the starting 0 is glued on too. The fix is `total = total + Number(t);`, which gives 60.
:::

## 2. Biggest and smallest (max and min)

**The question:** Which is the largest? Which is the smallest?

**The recipe in plain words:**

1. Take the **first** item as "the biggest so far".
2. For each item, if it is bigger than the biggest so far, it becomes the new biggest so far.
3. After the loop, "the biggest so far" is the biggest of all.

```js
function largestOf(numbers) {
  let largest = numbers[0];
  for (const n of numbers) {
    if (n > largest) {
      largest = n;
    }
  }
  return largest;
}

function smallestOf(numbers) {
  let smallest = numbers[0];
  for (const n of numbers) {
    if (n < smallest) {
      smallest = n;
    }
  }
  return smallest;
}
```

The smallest is the same recipe with `<` instead of `>`.

**Trace** of `largestOf([24, 31, 28, 35, 22])`, a week of temperatures:

| Iteration | `n` | `n > largest`? | `largest` after |
|---|---|---|---|
| (before) | — | — | 24 (the first item) |
| 1 | 24 | `24 > 24` no | 24 |
| 2 | 31 | `31 > 24` yes | 31 |
| 3 | 28 | `28 > 31` no | 31 |
| 4 | 35 | `35 > 31` yes | 35 |
| 5 | 22 | `22 > 35` no | 35 |

Returns `35`, the hottest day.

Why start with the first item instead of 0? Try this prediction.

::: predict What does this print?
This version starts `largest` at `0` instead of the first item:

```js
function largestOf(numbers) {
  let largest = 0;
  for (const n of numbers) {
    if (n > largest) {
      largest = n;
    }
  }
  return largest;
}

console.log(largestOf([12, 40, 7]));
console.log(largestOf([-3, -7, -1]));
```
:::

::: solution
```text
40
0
```
The first answer is right. The second is wrong: `0` is not even in the list! These are, say, winter night temperatures in Sutherland, all below zero. No item is bigger than `0`, so `largest` never changes.

Starting with the **first item** means "the biggest so far" is always a real value from the list. That is why the recipe says to start there.

When *is* starting at 0 fine? When you know every value is 0 or more (like money you spent), and you want an empty list to give 0. You will see exactly that choice in Budget Buddy. It is a decision, not an accident. (Starting from `numbers[0]` on an empty list gives `undefined`, since there is no first item.)
:::

**Real-world example:** the highest score in a game, the cheapest flight, the hottest day, the fastest lap time (the smallest).

**The pattern's name:** **maximum / minimum**, or "keep the best so far".

::: quiz
What does this program print?

```js
function whereIsLargest(numbers) {
  let at = 0;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] >= numbers[at]) {
      at = i;
    }
  }
  return at;
}

console.log(whereIsLargest([7, 12, 5, 12, 3]));
```

- [ ] `12`
- [ ] `1`
- [x] `3`
- [ ] `4`

This keeps the **position** of the biggest so far, not the value. `at` becomes 1 when it meets the first 12. At index 3 there is another 12, and `12 >= 12` is true, so `at` moves to 3. The 3 at index 4 is not bigger. If you picked 1, you read `>=` as `>`: with `>`, the first 12 would win. If you picked 12, you returned the value instead of the index.
:::

## 3. Count the matches (the counter)

**The question:** How many items match a rule?

**The recipe in plain words:**

1. Start a count at 0.
2. For each item, if it matches the rule, add 1 to the count.
3. After the loop, the count is the answer.

```js
function countAtLeast(numbers, limit) {
  let count = 0;
  for (const n of numbers) {
    if (n >= limit) {
      count++;
    }
  }
  return count;
}

const marks = [72, 45, 91, 38, 64, 50];
console.log("Passed:", countAtLeast(marks, 50));
```

Output:

```text
Passed: 4
```

**Trace** with a pass mark of 50:

| Iteration | `n` | `n >= 50`? | `count` after |
|---|---|---|---|
| (before) | — | — | 0 |
| 1 | 72 | yes | 1 |
| 2 | 45 | no | 1 |
| 3 | 91 | yes | 2 |
| 4 | 38 | no | 2 |
| 5 | 64 | yes | 3 |
| 6 | 50 | yes | 4 |

Compare it with the total: the shape is identical. The accumulator adds **the item**, the counter adds **1**, and only when the rule matches.

**Real-world example:** how many learners passed, how many days it rained, how many unread messages, how many items in your cart are on sale.

**The pattern's name:** the **counter** pattern ("count if").

::: exercise Level 1 — Guided · Hot days
Create `phase-5/hot-days.js`.

1. Write a function `countAbove(numbers, limit)` that returns how many numbers are **greater than** `limit`. Follow the counter recipe: start `count` at 0, loop with `for...of`, add 1 when `n > limit`, return `count` after the loop.
2. Make `const temps = [24, 31, 28, 35, 22, 29, 33];`.
3. Print `` `Days above 30: ${countAbove(temps, 30)}` ``.
4. Do the same for 20 and 40.
5. Run it. You should get 3, 7 and 0.
:::

::: solution
```js
function countAbove(numbers, limit) {
  let count = 0;
  for (const n of numbers) {
    if (n > limit) {
      count++;
    }
  }
  return count;
}

const temps = [24, 31, 28, 35, 22, 29, 33];
console.log(`Days above 30: ${countAbove(temps, 30)}`);
console.log(`Days above 20: ${countAbove(temps, 20)}`);
console.log(`Days above 40: ${countAbove(temps, 40)}`);
```
Output:
```text
Days above 30: 3
Days above 20: 7
Days above 40: 0
```
:::

## 4. Keep only the matches (filtering by hand)

Now something new. So far every answer was **one value**: a total, a biggest, a count. Sometimes the answer you want is **a list**: "show me *which* ones".

**The question:** Which items match a rule?

**The recipe in plain words:**

1. Start with a new, **empty** array for the results.
2. For each item, if it matches the rule, `push` it onto the results.
3. After the loop, return the results.

```js
function atLeast(numbers, limit) {
  const result = [];
  for (const n of numbers) {
    if (n >= limit) {
      result.push(n);
    }
  }
  return result;
}

const marks = [72, 45, 91, 38, 64, 50];
const passes = atLeast(marks, 50);
console.log(passes);
console.log(marks);
```

Output:

```text
[ 72, 91, 64, 50 ]
[ 72, 45, 91, 38, 64, 50 ]
```

**Trace** with a limit of 50:

| Iteration | `n` | `n >= 50`? | `result` after |
|---|---|---|---|
| (before) | — | — | `[]` |
| 1 | 72 | yes | `[72]` |
| 2 | 45 | no | `[72]` |
| 3 | 91 | yes | `[72, 91]` |
| 4 | 38 | no | `[72, 91]` |
| 5 | 64 | yes | `[72, 91, 64]` |
| 6 | 50 | yes | `[72, 91, 64, 50]` |

Look at the last line of the output: **the original `marks` array is untouched**. We did not remove anything from it. We built a brand new array with copies of the matching items. That is much safer than removing items from a list while you are looping over it (the mistake warned about in the last lesson). And you still have the full list if you need it later.

If nothing matches, you get an empty array `[]`, not an error. That is useful: the caller can check `result.length === 0` and say "nothing found".

Notice too that this is the counter pattern again, except instead of `count++` we `push` the item. Filtering and counting are close cousins: the number of matches is `atLeast(marks, 50).length`.

Testing it with `check` and `String()`:

```js
check(String(atLeast(marks, 50)), "72,91,64,50");
```

Output:

```text
PASS: 72,91,64,50
```

**Real-world example:** an online shop's "show only items under R200" button, your bank app's "show only card payments", an email inbox's "unread only", a music app's "songs shorter than 3 minutes".

**The pattern's name:** **filtering**. You keep the items that pass a test, and filter out the rest, like a coffee filter keeps the grounds and lets the coffee through.

## 5. Change every item into a new list (mapping by hand)

**The question:** What would every item look like after some change?

**The recipe in plain words:**

1. Start with a new, **empty** array for the results.
2. For each item, work out the changed version, and `push` it onto the results. (Every item, no `if`.)
3. After the loop, return the results.

Scaling a recipe from four people to six (multiply everything by 1.5):

```js
function scaled(quantities, factor) {
  const result = [];
  for (const q of quantities) {
    result.push(q * factor);
  }
  return result;
}

const forFour = [500, 250, 2, 15];   // grams of flour, ml of milk, eggs, grams of sugar
const forSix = scaled(forFour, 1.5);
console.log(forSix);
console.log(forFour);
```

Output:

```text
[ 750, 375, 3, 22.5 ]
[ 500, 250, 2, 15 ]
```

**Trace** with a factor of 1.5:

| Iteration | `q` | `q * 1.5` | `result` after |
|---|---|---|---|
| (before) | — | — | `[]` |
| 1 | 500 | 750 | `[750]` |
| 2 | 250 | 375 | `[750, 375]` |
| 3 | 2 | 3 | `[750, 375, 3]` |
| 4 | 15 | 22.5 | `[750, 375, 3, 22.5]` |

The new list always has **the same length** as the old one, and each new item is in the same position as the item it came from. Again, the original is left alone.

Compare this with the last lesson, where you changed prices **in place** with `prices[i] = prices[i] * 0.9`. Both are useful:

| | Change in place | Build a new array |
|---|---|---|
| Original afterwards | gone, overwritten | still there |
| Loop | index loop, `arr[i] = ...` | `for...of` and `push` |
| Use when | you truly want to replace the old values | you want both, or you are not sure (most of the time) |

**Real-world example:** adding VAT to a list of prices, converting temperatures from Celsius to Fahrenheit, turning a list of names to capitals, working out the length of every word, converting marks out of 40 into percentages.

**The pattern's name:** **mapping** (or **transforming**). Each old item "maps" to exactly one new item, like each place on the ground maps to one spot on a paper map.

::: quiz
This function should add a R50 delivery fee to every price. What does the program print?

```js
function withDelivery(prices) {
  const result = [];
  for (const p of prices) {
    result.push(p + 50);
  }
  return prices;
}

const menu = [80, 120];
console.log(withDelivery(menu));
```

- [x] `[ 80, 120 ]`
- [ ] `[ 130, 170 ]`
- [ ] `[ 80, 120, 130, 170 ]`
- [ ] `[]`

The loop builds the right new list in `result`, but the function returns `prices`, the original array, which was never changed. The new list is thrown away when the function ends. If you picked `[ 130, 170 ]`, you trusted the loop and missed the last line. When you map by hand, return the **new** array.
:::

## 6. Find the first match (finding by hand)

**The question:** What is the first item that matches a rule?

**The recipe in plain words:**

1. For each item, if it matches the rule, **return it straight away**. The search is over.
2. If the loop finishes without finding anything, return `undefined` (meaning "not found").

```js
function firstOver(numbers, limit) {
  for (const n of numbers) {
    if (n > limit) {
      return n;
    }
  }
  return undefined;
}

const spending = [45, 120, 80, 650, 30, 900];
console.log(firstOver(spending, 500));
console.log(firstOver(spending, 1000));
```

Output:

```text
650
undefined
```

**Trace** of `firstOver(spending, 500)`:

| Iteration | `n` | `n > 500`? | What happens |
|---|---|---|---|
| 1 | 45 | no | keep looking |
| 2 | 120 | no | keep looking |
| 3 | 80 | no | keep looking |
| 4 | 650 | **yes** | return 650, and stop |

The loop never even looks at `30` or `900`. `return` ends the whole function immediately, loop and all, as you learned in [Return values](#/phase-04-functions/03-return-values). That is the difference from filtering: filtering collects **every** match; finding stops at the **first**.

The `return undefined;` at the end is only reached if nothing matched. (A function that reaches its end without a `return` gives `undefined` anyway, but writing it out makes your intention clear to the reader.)

Sometimes you want the **position** of the first match, not the item. Use the index loop and return `i`, and return `-1` for "not found", the same convention as `indexOf`:

```js
function indexOfFirstOver(numbers, limit) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > limit) {
      return i;
    }
  }
  return -1;
}

console.log(indexOfFirstOver(spending, 500));
console.log(indexOfFirstOver(spending, 1000));
```

Output:

```text
3
-1
```

In fact, this is how `indexOf` from lesson 2 works on the inside. Now you know.

**Real-world example:** the first available seat on a flight, the first appointment slot after 2 pm, the first transaction that looks suspicious, the first player with no lives left.

**The pattern's name:** **finding**, or **searching**. This one-by-one kind is called a **linear search**, because it walks along the line of items.

::: quiz
What does this program print?

```js
function firstLong(words) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 6) {
      return i;
    }
  }
  return -1;
}

console.log(firstLong(["Durban", "Kimberley", "Polokwane"]), firstLong(["Paarl"]));
```

- [ ] `0 -1`
- [ ] `Kimberley -1`
- [ ] `2 -1`
- [x] `1 -1`
- [ ] `1 undefined`

`"Durban"` has 6 letters, and `6 > 6` is false, so the search moves on. `"Kimberley"` has 9, so the function returns its **index**, 1, and stops without looking at `"Polokwane"`. `"Paarl"` never matches, so the loop finishes and the function returns -1. If you picked `0 -1`, you read `>` as `>=`.
:::

## 7. Does any match? Do all match? (the flag, with a shortcut)

**The questions:** Is there **at least one** item that matches? Does **every** item match?

**The recipe for "any":**

1. For each item, if it matches, return `true` straight away. One is enough.
2. If the loop finishes, nothing matched: return `false`.

**The recipe for "all":**

1. For each item, if it does **not** match, return `false` straight away. One failure is enough.
2. If the loop finishes, nothing failed: return `true`.

```js
function anyNegative(numbers) {
  for (const n of numbers) {
    if (n < 0) {
      return true;
    }
  }
  return false;
}

function allAtLeast(numbers, limit) {
  for (const n of numbers) {
    if (n < limit) {
      return false;
    }
  }
  return true;
}

check(anyNegative([100, -20, 50]), true);
check(anyNegative([100, 20, 50]), false);
check(allAtLeast([72, 91, 64], 50), true);
check(allAtLeast([72, 45, 91], 50), false);
```

Output:

```text
PASS: true
PASS: false
PASS: true
PASS: false
```

**Trace** of `allAtLeast([72, 45, 91], 50)`:

| Iteration | `n` | `n < 50`? | What happens |
|---|---|---|---|
| 1 | 72 | no | keep checking |
| 2 | 45 | **yes** | return `false`, and stop |

In Phase 3 you wrote this with a **flag**: a `let found = false` variable, set to `true` inside the loop, checked after. Inside a function, `return` lets you skip the flag and stop the moment you know the answer. Both are correct; the `return` version is shorter.

The two recipes are mirror images, and people mix them up. A way to remember:

- To prove "**any**", you need **one yes**. So return `true` inside, `false` after.
- To disprove "**all**", you need **one no**. So return `false` inside, `true` after.

A small puzzle: what should `allAtLeast([], 50)` return? The code says `true`, because nothing failed. It sounds odd, but it is the agreed answer: "Did every learner in an empty class pass?" There was nobody to fail. (Programmers and mathematicians both agree on this, even if it feels like a trick question.)

**Real-world example:** "Is any item out of stock?" (to disable the checkout button), "Are all the form fields filled in?", "Did any player score over 100?", "Has everyone paid their share for the braai?"

**The pattern's name:** **any** (also called **some**) and **all** (also called **every**).

::: debug It only checks the first item
This function should say whether **any** expense is over budget. Two of the three tests give the wrong answer. Run it:

```js
function anyOverBudget(amounts, budget) {
  for (const amount of amounts) {
    if (amount > budget) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(anyOverBudget([900, 200, 50], 500));
console.log(anyOverBudget([100, 200, 650], 500));
console.log(anyOverBudget([], 500));
```

Output:

```text
true
false
undefined
```

The second should be `true` (650 is over budget), and the third should be `false`. Fix it by comparing with the "any" recipe. Trace the second call to see what goes wrong.
:::

::: solution
The `else { return false; }` runs on the **very first** item that is not over budget. `100 > 500` is false, so the function returns `false` immediately, without ever looking at `650`. A `return` in both branches of an `if` inside a loop means the loop can only ever run once.

And with an empty list, the loop body never runs, the function reaches its end with no `return`, and gives `undefined`.

"Not this one" does not mean "not any". You only know the answer is `false` after checking **every** item, which means **after the loop**:

```js
function anyOverBudget(amounts, budget) {
  for (const amount of amounts) {
    if (amount > budget) {
      return true;
    }
  }
  return false;
}
```
Output:
```text
true
true
false
```
This is one of the most common bugs in code written by beginners and professionals alike. Watch for a `return` in an `else` inside a loop.
:::

::: exercise Level 2 — On your own · Word games
Create `phase-5/words.js` with this array:

```js
const words = ["braai", "robot", "lekker", "sharp", "eish", "howzit"];
```

Write and test three functions:

1. `shortWords(words, maxLength)` returns a **new array** of the words with a length of `maxLength` or less. (Which pattern?)
2. `lengths(words)` returns a **new array** holding the length of each word. (Which pattern?)
3. `allFilledIn(answers)` returns `true` only if **every** string in the array has something in it other than spaces. (Which pattern? Remember `.trim()`.)

Print `shortWords(words, 5)` and `lengths(words)`, and use `check` for these:

```js
check(String(shortWords(words, 4)), "eish");
check(String(lengths(["a", "bb", ""])), "1,2,0");
check(allFilledIn(["Thabo", "25", "Soweto"]), true);
check(allFilledIn(["Thabo", "  ", "Soweto"]), false);
```
:::

::: hint
1 is filtering: empty result, `push` inside an `if`. 2 is mapping: empty result, `push` every time, no `if`. 3 is "all": return `false` inside the loop as soon as `answer.trim() === ""`, and `true` after the loop.
:::

::: solution
```js
function check(actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${actual}`);
  } else {
    console.log(`FAIL: expected ${expected} but got ${actual}`);
  }
}

function shortWords(words, maxLength) {
  const result = [];
  for (const word of words) {
    if (word.length <= maxLength) {
      result.push(word);
    }
  }
  return result;
}

function lengths(words) {
  const result = [];
  for (const word of words) {
    result.push(word.length);
  }
  return result;
}

function allFilledIn(answers) {
  for (const answer of answers) {
    if (answer.trim() === "") {
      return false;
    }
  }
  return true;
}

const words = ["braai", "robot", "lekker", "sharp", "eish", "howzit"];
console.log(shortWords(words, 5));
console.log(lengths(words));

check(String(shortWords(words, 4)), "eish");
check(String(lengths(["a", "bb", ""])), "1,2,0");
check(allFilledIn(["Thabo", "25", "Soweto"]), true);
check(allFilledIn(["Thabo", "  ", "Soweto"]), false);
```
Output:
```text
[ 'braai', 'robot', 'sharp', 'eish' ]
[ 5, 5, 6, 5, 4, 6 ]
PASS: eish
PASS: 1,2,0
PASS: true
PASS: false
```
:::

::: mistake
**Starting max/min at 0.** It gives wrong answers when every value is negative (for max) or every value is positive (for min, which stays stuck at 0). Start with the first item, unless you have a good reason not to.

**Forgetting the empty-list case.** Dividing by `numbers.length` when it is 0 gives `NaN`. Decide what an empty list should give, and handle it first.

**`return` in the `else` inside a loop.** The loop only ever looks at the first item. "Not found yet" is not "not found". Return the "nothing found" answer **after** the loop.

**Returning inside the loop when you meant to collect.** A `return` inside a filter loop stops at the first match, turning your filter into a find by accident.

**Declaring the result inside the loop.** `const result = [];` must come **before** the loop. Inside, you would get a fresh empty array on every iteration.

**Removing items from the list you are looping over.** Build a new array of what you want to keep instead.
:::

::: quiz
This function is called `allPaid`. What does the program print?

```js
function allPaid(amounts) {
  for (const a of amounts) {
    if (a > 0) {
      return true;
    }
  }
  return false;
}

console.log(allPaid([150, 0, 150]), allPaid([]));
```

- [ ] `false true`
- [ ] `false false`
- [x] `true false`
- [ ] `true true`

Ignore the name and read the code: it returns `true` as soon as it finds **one** amount above 0. That is the "any" recipe, not "all". The first item, 150, is enough, so it returns `true`. The empty list never enters the loop, so it returns `false`. If you picked `false true`, you trusted the name: that is what a real "all" would give. A real "all" returns `false` inside the loop when one fails, and `true` after it.
:::

## Real-world uses

Put the seven patterns together, and you can build a surprising amount of a real app. A banking app's "insights" screen, for example:

- "You spent R4 250 this month" → **total**
- "Your average grocery shop was R612" → **average**
- "Your biggest purchase was R1 899" → **max**
- "You bought takeaways 9 times" → **count**
- "Show only transport" → **filter**
- "Show amounts in US dollars" → **map**
- "When did you first go over budget?" → **find**
- "Any declined payments?" / "All debit orders paid?" → **any / all**

Every spreadsheet function you may have used (`SUM`, `AVERAGE`, `MAX`, `COUNTIF`, the filter button) is one of these algorithms, written by someone else.

::: connect
**This builds on:** [loop patterns](#/phase-03-loops/04-loop-patterns) (accumulator, counter, max/min, flag), [looping through arrays](#/phase-05-arrays/03-looping-through-arrays), and [pure functions with return values](#/phase-04-functions/06-designing-with-functions).

**This unlocks:** Budget Buddy v5 uses `totalOf`, `largestOf` and `averageOf` (under slightly different names) to analyse your expenses. In Phase 6, you will run exactly these patterns on lists of objects. And in Phase 7…

**The shortcuts you will meet in Phase 7.** JavaScript has a built-in method for most of these patterns. You pass it a small function that describes the rule, and it writes the loop for you:

| The pattern you wrote by hand | The shortcut you will meet in Phase 7 |
|---|---|
| Filtering: keep only the matches | `.filter` |
| Mapping: transform every item | `.map` |
| Finding the first match | `.find` (and `.findIndex` for its position) |
| Any / all | `.some` / `.every` |
| Total, and boiling a list down to one value | `.reduce` |

Because you wrote every one of them yourself, you will know **exactly** what each shortcut does on the inside, and what to do when it does not quite fit. Start that journey at [Passing functions to functions](#/phase-07-functions-as-values/01-passing-functions-to-functions), when you get there. For now, keep writing them by hand; that is the practice that makes the shortcuts feel natural later.
:::

::: challenge Above average
A cricket coach wants to know which innings were better than the batter's average. Write `aboveAverage(numbers)` that returns a **new array** of the numbers that are strictly greater than the average of the list.

Do not write a new loop for the average. **Reuse** `averageOf` (and `totalOf`), and a filter function like `above(numbers, limit)`. Your `aboveAverage` should be a single line inside.

```js
const runs = [12, 45, 3, 67, 28, 91, 0];
console.log(`Average: ${averageOf(runs)}`);
console.log(aboveAverage(runs));
console.log(aboveAverage([]));
console.log(aboveAverage([5, 5, 5]));
```

Expected:

```text
Average: 35.142857142857146
[ 45, 67, 91 ]
[]
[]
```
:::

::: solution
```js
function totalOf(numbers) {
  let total = 0;
  for (const n of numbers) {
    total = total + n;
  }
  return total;
}

function averageOf(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  return totalOf(numbers) / numbers.length;
}

function above(numbers, limit) {
  const result = [];
  for (const n of numbers) {
    if (n > limit) {
      result.push(n);
    }
  }
  return result;
}

function aboveAverage(numbers) {
  return above(numbers, averageOf(numbers));
}
```
`aboveAverage` combines two patterns: **reduce** the list to one number (the average), then **filter** the list using that number. Most real questions are answered like this, by chaining a few simple patterns together. `[5, 5, 5]` gives `[]` because no value is *strictly* greater than the average of 5.
:::

::: recap
- An **algorithm** is a step-by-step recipe. Every list algorithm has the same shape: set something up, loop over every item, return the result.
- **Total / average** (accumulator, "reducing"): add each item to a running total. Guard the empty list before dividing.
- **Max / min**: start with the first item, and replace it when you find a bigger (or smaller) one.
- **Count**: add 1 when an item matches.
- **Filter**: start with `[]`, `push` each item that matches. The original is untouched.
- **Map**: start with `[]`, `push` a changed version of every item. Same length as the original.
- **Find**: return the first match inside the loop; return "not found" (`undefined` or `-1`) after it.
- **Any / all**: return as soon as you know. The "no" or "yes" for the whole list only comes **after** the loop.
:::

::: interview What is the difference between filtering and finding?
Filtering checks **every** item and returns a new array of **all** the matches (possibly empty). Finding stops at the **first** match and returns that single item (or `undefined` if there is none).
:::

::: interview Why does a max function usually start with the first item rather than 0?
Starting at 0 assumes at least one value is bigger than 0. If every value is negative, 0 would never be replaced and the function would return 0, which is not even in the list. Starting with the first item guarantees the answer is a real value from the list.
:::

::: interview What is wrong with putting `return false` in an `else` inside an "any" loop?
The function returns on the first item either way, so it never checks the rest. The answer "no item matches" is only known after every item has been checked, so `return false` belongs after the loop.
:::

::: interview What is the difference between mapping and changing an array in place?
Mapping builds and returns a **new** array of transformed values and leaves the original alone. Changing in place overwrites each element of the original array with `arr[i] = ...`, so the old values are lost.
:::

::: checkpoint
- [ ] I ran the grocery receipts program and saw what happens without the empty-list check
- [ ] I predicted the "all negative" max bug before running it
- [ ] I wrote `countAbove` and got 3, 7 and 0
- [ ] I fixed `anyOverBudget` and can explain why the `else` was wrong
- [ ] I wrote `shortWords`, `lengths` and `allFilledIn`, and all four checks pass
- [ ] I can name the seven patterns, and say which Phase 7 shortcut matches each one
:::

::: resources
- **Eloquent JavaScript, chapter 4, "Data Structures: Objects and Arrays":** https://eloquentjavascript.net/04_data.html. Includes hand-written loops over arrays like the ones here. (Parts of it use objects, which come next phase.)
- **CS50 (Harvard, free), lecture on algorithms:** https://cs50.harvard.edu/x/. Week 3 explains linear search and why it matters, in a different language but with the same ideas.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in `atLeast` and watch the `result` array grow, one `push` at a time.
:::
