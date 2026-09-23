---
title: sort, and chaining methods together
summary: Put lists in order without surprises, join methods into readable sentences, and decide honestly between a loop and a method.
minutes: 55
stage: Phase 7
---

## What you will learn

- How `sort` works, and its two surprises: it **changes the original**, and by default it sorts numbers **as text**
- What a **compare function** is, explained in plain words, and how `(a, b) => a - b` works
- How to sort objects by a property safely, by copying first with `[...arr]`, and how to take the "top 3" with `slice`
- How to **chain** methods (`filter` then `map` then `reduce`) so the code reads like a sentence
- A clear guide for choosing between a **loop** and a **method**

**Before this:** [reduce](#/phase-07-functions-as-values/06-reduce). You will also need spread copies from [Copies and references](#/phase-06-objects/04-values-and-references).

## The problem: putting things in order

A leaderboard shows the highest score first. An online shop has a "price: low to high" button. Your contacts are in alphabetical order. Your bank app shows the biggest spending first when you want to know where your money went.

Putting a list in order is called **sorting**. Writing a sorting algorithm by hand is a classic computer science exercise (you may meet names like "bubble sort" later), and it is surprisingly fiddly. This is one of the few methods in this phase that we will *not* write ourselves first. Instead, we will focus on using it correctly, because `sort` has two surprises that catch almost everyone.

## sort with words

For a list of words, `sort` does what you would expect:

```js
const names = ["Zinhle", "Aarav", "Lebo", "Mia"];
names.sort();
console.log(names);
```

Output:

```text
[ 'Aarav', 'Lebo', 'Mia', 'Zinhle' ]
```

Alphabetical order. But look at the second line: we did not write `const sorted = names.sort()`. We called `names.sort()` and then printed `names`, and `names` itself is now in order. That is the first surprise.

## Surprise 1: sort changes the original

Every other method in this phase (`map`, `filter`, `find`, `reduce` and friends) leaves the original array alone. `sort` does not. It **rearranges the array in place**, and then also returns that same array:

```js
const original = [30, 10, 20];
const sorted = original.sort((a, b) => a - b);
console.log(sorted);
console.log(original);
console.log(sorted === original);
```

Output:

```text
[ 10, 20, 30 ]
[ 10, 20, 30 ]
true
```

(Ignore the `(a, b) => a - b` for a moment. It is explained below.)

`sorted` and `original` are **the same array**, as `===` confirms. There is no copy. This is the reference behaviour from [Copies and references](#/phase-06-objects/04-values-and-references): two names for one array.

Why does that matter? Imagine a list of expenses in the order you entered them. You sort it to show the biggest first, and now your "list expenses" screen shows them in the wrong order, and "remove expense number 2" removes the wrong one. We will fix this properly in a minute.

## Surprise 2: numbers are sorted as text

```js
console.log([10, 9, 1].sort());
console.log([5, 100, 25, 3].sort());
```

Output:

```text
[ 1, 10, 9 ]
[ 100, 25, 3, 5 ]
```

That is not a mistake in this lesson; that is really what Node prints. With no instructions, `sort` turns every item into **text** and puts them in dictionary order. In a dictionary, you compare the first letter first. `"10"` starts with `"1"`, and `"9"` starts with `"9"`, and `"1"` comes before `"9"`, so `"10"` goes before `"9"`. It is the same way "aardvark" comes before "bee" in a dictionary, even though "aardvark" is much longer.

It is the same reason files on some computers are listed as `photo1`, `photo10`, `photo2`.

There is a smaller text surprise too. Capital letters come before small letters in this ordering:

```js
console.log(["banana", "Cherry", "apple"].sort());
```

Output:

```text
[ 'Cherry', 'apple', 'banana' ]
```

For names that are all written with a capital first letter, this does not matter. If your data mixes capitals, one fix is to compare lower-cased versions (you will see how to write your own comparison below). You may later meet a method called `localeCompare`, which handles this and accented letters properly. It is a name to look up when you need it.

So, to sort numbers correctly, you need to tell `sort` how to compare them.

## The compare function, in plain words

::: analogy The judge at the talent show
A talent show has a judge. The judge never looks at the whole list of acts at once. Instead, the organiser keeps bringing **two** acts to the judge and asking one question: **"Which of these two should go first?"**

The judge answers with a number:

- a **negative** number means "the first one goes first",
- a **positive** number means "the second one goes first",
- **zero** means "they are equal, I do not mind".

The organiser does all the shuffling. After enough questions, everything is in order. The organiser's method of shuffling can be clever and complicated, but the judge only ever answers the same small question.

`sort` is the organiser. Your **compare function** is the judge.
:::

A **compare function** is a callback that takes two items, `a` and `b`, and returns a number that says which goes first. Here is a judge for "smallest first", written out in full with `if`s:

```js
function smallestFirst(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const scores = [5, 100, 25, 3];
scores.sort(smallestFirst);
console.log(scores);
```

Output:

```text
[ 3, 5, 25, 100 ]
```

- If `a` is smaller, return `-1` (negative): `a` goes first.
- If `a` is bigger, return `1` (positive): `b` goes first.
- If they are the same, return `0`.

It is a named function, passed without brackets, like every callback in this phase.

### The shortcut: `a - b`

Look what happens if you subtract:

| `a` | `b` | `a - b` | Sign | Meaning |
|---|---|---|---|---|
| 5 | 100 | -95 | negative | 5 goes first |
| 100 | 5 | 95 | positive | 5 goes first |
| 25 | 25 | 0 | zero | either |

`a - b` gives a negative number exactly when `a` is smaller. So it answers the judge's question in one line. The size of the number does not matter, only whether it is negative, positive or zero.

```js
const scores = [5, 100, 25, 3];
scores.sort((a, b) => a - b);
console.log(scores);
scores.sort((a, b) => b - a);
console.log(scores);
```

Output:

```text
[ 3, 5, 25, 100 ]
[ 100, 25, 5, 3 ]
```

Remember it like this:

- `(a, b) => a - b` : **smallest first** (ascending, "low to high")
- `(a, b) => b - a` : **biggest first** (descending, "high to low")

If you forget which is which, try it on a small list and look. Professionals do that too.

## Copy first, then sort

To protect the original order, sort a **copy**. You already know how to make a copy of an array: spread, `[...arr]`.

```js
const players = [
  { name: "Thuso", points: 42 },
  { name: "Ingrid", points: 57 },
  { name: "Kofi", points: 38 },
];

const leaderboard = [...players].sort((a, b) => b.points - a.points);
console.log(leaderboard);
console.log(players);
```

Output:

```text
[
  { name: 'Ingrid', points: 57 },
  { name: 'Thuso', points: 42 },
  { name: 'Kofi', points: 38 }
]
[
  { name: 'Thuso', points: 42 },
  { name: 'Ingrid', points: 57 },
  { name: 'Kofi', points: 38 }
]
```

Two things happened here:

1. **Sorting objects by a property.** The judge compares `b.points - a.points`, so the player with more points goes first.
2. **Copy first.** `[...players]` makes a new array (holding the same player objects), and `sort` rearranges *that* one. `players` keeps its original order.

Make "copy, then sort" a habit. Write `[...list].sort(...)` every time, unless you are completely sure you want the original rearranged.

::: note A newer shortcut: toSorted
Recent versions of JavaScript (including the Node you installed) also have `toSorted`, which sorts a copy for you: `players.toSorted((a, b) => b.points - a.points)`. You will see it in newer code. This course uses `[...list].sort(...)` because it shows clearly what is happening, and it works everywhere.
:::

### Sorting by text properties

For text, `a - b` does not work (you cannot subtract words). Use the full `if` version with `<` and `>`, which work on strings in dictionary order:

```js
const players = [
  { name: "Thuso", points: 42 },
  { name: "Ingrid", points: 57 },
  { name: "Kofi", points: 38 },
];

const byName = [...players].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
console.log(byName.map((player) => player.name));
```

Output:

```text
[ 'Ingrid', 'Kofi', 'Thuso' ]
```

(The last line uses `map` to pull out only the names, so the output is short.)

### Top 3: sort, then slice

Arrays have a `slice` method that works like the string `slice` you learned in [Strings](#/phase-01-storing-information/05-strings). `list.slice(0, 3)` gives a **new** array with the items at indexes 0, 1 and 2, and does not change `list`. Combined with a copy and a sort, it gives you "the top 3":

```js
const prices = [89.99, 12.5, 45, 210, 33];
const topThree = [...prices].sort((a, b) => b - a).slice(0, 3);
console.log(topThree);
console.log(prices);
```

Output:

```text
[ 210, 89.99, 45 ]
[ 89.99, 12.5, 45, 210, 33 ]
```

If the list has fewer than 3 items, `slice(0, 3)` returns as many as there are, with no error.

::: try Sort a leaderboard
1. In `coding-practice`, create `phase-7/sort.js`.
2. Type this in:
   ```js
   console.log([10, 9, 1].sort());

   const players = [
     { name: "Thuso", points: 42 },
     { name: "Ingrid", points: 57 },
     { name: "Kofi", points: 38 },
   ];

   const leaderboard = [...players].sort((a, b) => b.points - a.points);
   console.log(leaderboard);
   console.log(players);
   ```
3. Run it:
   ```bash
   node phase-7/sort.js
   ```
4. You should see `[ 1, 10, 9 ]` first, then Ingrid, Thuso, Kofi, and then the original order: Thuso, Ingrid, Kofi.
5. **Now experiment.** Fix the first line so it sorts the numbers properly. Then change the leaderboard so the *lowest* score is first. Predict the order before each run.
6. Remove the `[...` and `]` around `players` in the leaderboard line. Predict what the last `console.log` prints now. Run it and see the original order disappear. Then put the copy back.
:::

::: predict What does this print?
```js
const numbers = [3, 20, 100];
const sorted = numbers.sort();
console.log(sorted);
console.log(numbers);
```
Both surprises are in this one.
:::

::: solution
```text
[ 100, 20, 3 ]
[ 100, 20, 3 ]
```
Surprise 2: with no compare function, the numbers are sorted as text. `"100"` starts with `"1"`, `"20"` with `"2"`, `"3"` with `"3"`, so that is the dictionary order. Surprise 1: `sort` changed `numbers` itself, and `sorted` is the same array, so both lines are identical. The fix for both: `const sorted = [...numbers].sort((a, b) => a - b);`.
:::

## Chaining: methods that read like a sentence

`map`, `filter` and `sort` all give back an **array**. And arrays have methods. So you can call another method straight on the result, without storing it in a variable first. This is called **chaining**.

Here is "the total of all food expenses", first step by step with a variable for each stage, then chained:

```js
const expenses = [
  { description: "Groceries", amount: 640.5, category: "food" },
  { description: "Taxi fare", amount: 36, category: "transport" },
  { description: "Electricity", amount: 450, category: "bills" },
  { description: "Takeaways", amount: 185, category: "food" },
  { description: "Coffee", amount: 32, category: "food" },
  { description: "Bus card", amount: 120, category: "transport" },
];

// Step by step
const foodOnly = expenses.filter((expense) => expense.category === "food");
const foodAmounts = foodOnly.map((expense) => expense.amount);
const foodTotal = foodAmounts.reduce((sum, amount) => sum + amount, 0);
console.log(foodTotal);

// Chained
const total = expenses
  .filter((expense) => expense.category === "food")
  .map((expense) => expense.amount)
  .reduce((sum, amount) => sum + amount, 0);
console.log(total);
```

Output:

```text
857.5
857.5
```

Read the chained version out loud, one line at a time:

> "Take the expenses, **keep** the food ones, **turn** each into its amount, **add** them up."

That is the power of chaining. The code has the same shape as the sentence in your head.

::: analogy The assembly line
In a juice factory, oranges go along a conveyor belt. The first station throws out the bad ones (filter). The next station squeezes each orange into juice (map). The last station pours all the juice into one bottle (reduce). Each station takes whatever comes off the one before it, does its one job, and passes the result on.

A chain is that conveyor belt. Each method receives the array that the previous method produced.
:::

### How to write chains so people can read them

- **Put each method on its own line**, starting with the dot, indented once. JavaScript does not mind the line breaks, and each line becomes one step of the sentence.
- **Order matters.** Filter first, *then* map, so you do less work and still have the properties you need. If you mapped to amounts first, you would have lost the `category`, and could not filter by it any more.
- **Name your callbacks** when a chain gets long, so each line reads like a word.

Here is a small report: the expenses of R100 or more, biggest first, as display lines.

```js
const describe = (expense) => `${expense.description}: R${expense.amount.toFixed(2)}`;

const report = expenses
  .filter((expense) => expense.amount >= 100)
  .sort((a, b) => b.amount - a.amount)
  .map(describe);

report.forEach((line) => console.log(line));
```

Output (using the same `expenses` as above):

```text
Groceries: R640.50
Electricity: R450.00
Takeaways: R185.00
Bus card: R120.00
```

Notice there is **no `[...]` copy** before the `sort` this time. `filter` already made a brand new array, so `sort` is rearranging that new array, not `expenses`. The copy is only needed when `sort` would otherwise be called on your original list.

### Debugging a chain

When a chain gives the wrong answer, break it apart. Put each step into its own variable (like the "step by step" version above) and `console.log` each one. You will quickly see which station on the assembly line is doing the wrong thing. There is no shame in leaving it split up if that is clearer.

One very common chain bug is putting `forEach` in the middle:

```js
const total = expenses.forEach((e) => e.amount).reduce((s, a) => s + a, 0);
```

Output:

```text
TypeError: Cannot read properties of undefined (reading 'reduce')
```

`forEach` returns `undefined`, and you cannot call `.reduce` on `undefined`. `forEach` can only ever be the **last** link in a chain. Here, `map` was meant.

## Loop or method?

You now have two ways to do almost every list job: the loops you wrote in Phases 3 to 6, and the methods from this phase. Which should you use? Here is an honest guide.

**Use a method when the job is one of the standard shapes:**

| The job | Method |
|---|---|
| Do something with each item | `forEach` |
| Transform each item into a new list | `map` |
| Select some items | `filter` |
| Find one item, or its position | `find`, `findIndex` |
| Ask "any?" or "all?" | `some`, `every` |
| Summarise into one value (especially a total) | `reduce` |
| Put in order | `[...list].sort(compare)` |

For these, the method name tells the reader what is happening before they have read the callback. A `for` loop makes them read the whole body to find out.

**Use a loop when:**

- **You need to stop early for your own reason**, not a "find" reason. For example, adding up expenses *until* you would go over budget:

  ```js
  const budgetLimit = 500;
  const expenses = [120, 85, 200, 150, 60];

  let spent = 0;
  let count = 0;
  for (const amount of expenses) {
    if (spent + amount > budgetLimit) {
      console.log(`Stop! Expense ${count + 1} (R${amount}) would take you over R${budgetLimit}.`);
      break;
    }
    spent += amount;
    count++;
  }
  console.log(`You can afford the first ${count} expenses, R${spent} in total.`);
  ```

  Output:

  ```text
  Stop! Expense 4 (R150) would take you over R500.
  You can afford the first 3 expenses, R405 in total.
  ```

  You could force this into methods, but it would be harder to read.

- **You need several answers from one pass.** One loop can work out an average, a maximum and a count together:

  ```js
  const marks = [72, 45, 88, 50, 39, 65];

  let total = 0;
  let highest = marks[0];
  let passes = 0;
  for (const mark of marks) {
    total += mark;
    if (mark > highest) {
      highest = mark;
    }
    if (mark >= 50) {
      passes++;
    }
  }
  console.log(`Average: ${(total / marks.length).toFixed(1)}, highest: ${highest}, passes: ${passes}`);
  ```

  Output:

  ```text
  Average: 59.8, highest: 88, passes: 4
  ```

  Three separate methods would also work, and are fine for short lists. Choose the one you find clearer.

- **The steps are complicated**: many `if`s, asking the user questions with `prompt`, or changing several variables. A loop reads top to bottom like a recipe.
- **You need to repeat something that is not "each item in a list"**, like the menu loop in Budget Buddy (`while (running)`) or "keep asking until the answer is valid". Methods only work on arrays.

**And the tie-breaker:** if both would work, pick the one that *you and the next reader* will understand fastest. Professional teams disagree about this, and that is fine. What matters is that you choose on purpose, and you can now read both.

::: exercise Level 1 — Guided · Cheapest taxi fares
Create `phase-7/fares.js`.

1. Make an array `fares` holding `18, 35, 12.5, 24, 40`.
2. Create `cheapestFirst` by copying `fares` with `[...fares]` and sorting the copy with `(a, b) => a - b`.
3. Print `cheapestFirst`.
4. Print `fares`, and check it is still in its original order.
5. Run it. The first line should start with `12.5`.
6. Now take the copy away (sort `fares` directly), run it again, and see both lines become the same.
:::

::: solution
```js
const fares = [18, 35, 12.5, 24, 40];
const cheapestFirst = [...fares].sort((a, b) => a - b);
console.log(cheapestFirst);
console.log(fares);
```
Output:
```text
[ 12.5, 18, 24, 35, 40 ]
[ 18, 35, 12.5, 24, 40 ]
```
:::

::: exercise Level 2 — On your own · The top two
Create `phase-7/top-two.js` with:

```js
const players = [
  { name: "Thuso", points: 42 },
  { name: "Ingrid", points: 57 },
  { name: "Kofi", points: 38 },
  { name: "Ananya", points: 51 },
];
```

In **one chain**, produce an array of the **names** of the two players with the most points: `[ 'Ingrid', 'Ananya' ]`. Do not change the order of `players`.
:::

::: hint
Copy, sort biggest first by `points`, take the first two with `slice(0, 2)`, then `map` each player to their name. Put each step on its own line.
:::

::: solution
```js
const players = [
  { name: "Thuso", points: 42 },
  { name: "Ingrid", points: 57 },
  { name: "Kofi", points: 38 },
  { name: "Ananya", points: 51 },
];

const topTwo = [...players]
  .sort((a, b) => b.points - a.points)
  .slice(0, 2)
  .map((player) => player.name);

console.log(topTwo);
```
Output:
```text
[ 'Ingrid', 'Ananya' ]
```
The order matters: sort, *then* slice. If you sliced first, you would get the first two players in the original list (Thuso and Ingrid), sorted.
:::

::: debug The shop that forgot its order
This program should print the cheapest phone, and then list the phones **in the order they were added**. The cheapest part is right, but the list is not. Run it, compare the list with the array, and fix the function.

```js
const products = [
  { name: "Samsung A15", price: 3299 },
  { name: "Nokia 105", price: 399 },
  { name: "iPhone 13", price: 10999 },
];

function cheapest(list) {
  return list.sort((a, b) => a.price - b.price)[0];
}

console.log("Cheapest:", cheapest(products).name);
console.log("In the order they were added:");
products.forEach((product) => console.log(`- ${product.name}`));
```
:::

::: solution
It prints:
```text
Cheapest: Nokia 105
In the order they were added:
- Nokia 105
- Samsung A15
- iPhone 13
```
`list` inside `cheapest` is not a copy; it is the same array as `products` (a reference). So `list.sort(...)` rearranged `products` itself. A function that quietly changes the data you pass in is one of the hardest bugs to track down, because the damage shows up somewhere else entirely.

Fix: copy before sorting.
```js
function cheapest(list) {
  return [...list].sort((a, b) => a.price - b.price)[0];
}
```
Output:
```text
Cheapest: Nokia 105
In the order they were added:
- Samsung A15
- Nokia 105
- iPhone 13
```
(A `find`-the-minimum loop or `reduce` would also work, and does less work than sorting everything. For a short list, the sorted version is fine and very readable.)
:::

::: mistake
**Sorting numbers without a compare function.** `[10, 9, 1].sort()` gives `[ 1, 10, 9 ]`. Always pass `(a, b) => a - b` or `(a, b) => b - a` for numbers.

**Forgetting that `sort` changes the original.** Use `[...list].sort(...)` unless you really want the original rearranged.

**Trying `a - b` on text.** Subtracting strings gives `NaN`, so `sort` gets no useful answer and leaves the list out of order. Use `<` and `>` in a compare function for text.

**Putting `forEach` in the middle of a chain.** It returns `undefined`, so the next method crashes. `forEach` can only be last.

**Mapping before filtering, and losing the property you needed.** Filter while you still have whole objects, then map.

**Writing a chain so long that nobody can follow it.** Break it into named steps. Readable beats clever.
:::

## Real-world uses

- **Sorting:** "price: low to high" in every online shop, leaderboards in games, newest-first emails, alphabetical contact lists.
- **Top N:** "top 10 songs this week", "your 3 biggest expenses", "most popular products".
- **Chaining:** almost every report in a real app is a chain: "orders from this month (filter), with their totals (map), added up (reduce)". "Active users (filter), sorted by name (sort), as display lines (map)."

::: connect
**This builds on:** every method in this phase, spread copies and references from [Copies and references](#/phase-06-objects/04-values-and-references), and the comparison operators from [Comparing values](#/phase-02-making-decisions/01-comparing-values).

**This unlocks:** the [Budget Buddy v7 project](#/phase-07-functions-as-values/08-project-budget-buddy-v7) next, where you build reports: filter by category, the top 3 expenses (copy, sort, slice), category totals, and a search. Then in Phase 8 you will organise the project into several files.
:::

::: challenge The honour roll
Given:

```js
const students = [
  { name: "Naledi", mark: 72 },
  { name: "Ahmed", mark: 48 },
  { name: "Grace", mark: 91 },
  { name: "Pieter", mark: 55 },
  { name: "Mei", mark: 39 },
];
```

Write **one chain** that produces the lines below (only the students who passed, 50 or more, highest mark first, numbered), and print each line. Then print `students[0].name` to prove the original order is unchanged. Do you need a `[...]` copy? Why or why not?

```text
1. Grace (91%)
2. Naledi (72%)
3. Pieter (55%)
```
:::

::: solution
```js
const students = [
  { name: "Naledi", mark: 72 },
  { name: "Ahmed", mark: 48 },
  { name: "Grace", mark: 91 },
  { name: "Pieter", mark: 55 },
  { name: "Mei", mark: 39 },
];

const honourRoll = students
  .filter((student) => student.mark >= 50)
  .sort((a, b) => b.mark - a.mark)
  .map((student, index) => `${index + 1}. ${student.name} (${student.mark}%)`);

honourRoll.forEach((line) => console.log(line));
console.log(students[0].name);
```
Output:
```text
1. Grace (91%)
2. Naledi (72%)
3. Pieter (55%)
Naledi
```
No copy is needed, because `filter` comes first and already returns a new array. `sort` rearranges that new array, not `students`. The `map` uses the index (after sorting) to number the lines.
:::

::: recap
- `sort` **changes the original array** and returns that same array. Copy first: `[...list].sort(...)`.
- Without a compare function, `sort` compares items **as text**: `[10, 9, 1].sort()` gives `[ 1, 10, 9 ]`.
- A **compare function** answers "which of these two goes first?": negative means `a` first, positive means `b` first, zero means either.
- `(a, b) => a - b` is smallest first; `(a, b) => b - a` is biggest first. For objects, compare a property: `b.amount - a.amount`. For text, use `<` and `>`.
- `slice(0, n)` on an array gives the first `n` items as a new array. Copy, sort, slice gives a "top n".
- **Chaining** calls one method on the result of another. Put each step on its own line and read it as a sentence. Filter before map. `forEach` can only be last.
- Use methods for the standard shapes (transform, select, find, summarise, order). Use loops when you need to stop early for your own reasons, need several results in one pass, or the steps are complicated. When in doubt, choose what reads most clearly.
:::

::: interview Why does `[10, 9, 1].sort()` give `[1, 10, 9]`?
With no compare function, `sort` converts items to strings and sorts them in dictionary order. `"10"` starts with `"1"`, which comes before `"9"`, so `"10"` is placed before `"9"`. Pass `(a, b) => a - b` to sort numbers by value.
:::

::: interview How do you sort a list of expenses by amount without changing the original list?
Copy it first, then sort the copy with a compare function: `const sorted = [...expenses].sort((a, b) => b.amount - a.amount);` for biggest first. `sort` changes the array it is called on, so the copy protects the original order.
:::

::: interview When would you choose a loop over array methods?
When you need to stop early for a reason other than "found it" (such as "until I go over budget"), when one pass must produce several results, when the steps involve user input or many conditions, or when the loop is clearer to read. Methods are best for standard transform, select, find and summarise jobs.
:::

::: checkpoint
- [ ] I saw `[ 1, 10, 9 ]` with my own eyes, and fixed it with a compare function
- [ ] I sorted a copy with `[...list].sort(...)` and checked the original kept its order
- [ ] I sorted objects by a number property and by a text property
- [ ] I got a "top 3" with copy, sort and slice
- [ ] I wrote a chain of filter, map and reduce, and read it out loud as a sentence
- [ ] I fixed the shop that forgot its order
- [ ] I can give one example where a loop is clearer than a method
:::

::: resources
- **javascript.info, "Array methods":** https://javascript.info/array-methods. The "sort(fn)" section explains the compare function and the text-sorting surprise.
- **MDN, "Array.prototype.sort()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort. The official reference, with a table of what the compare function's return value means.
- **Eloquent JavaScript, chapter 5 "Higher-Order Functions":** https://eloquentjavascript.net/05_higher_order.html. The "Composability" section shows chaining with real data, and talks honestly about readability.
:::
