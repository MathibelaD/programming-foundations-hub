---
title: Arrays — storing a list of values
summary: One name for a whole list of values, and why the first item is number 0.
minutes: 40
stage: Phase 5
---

## What you will learn

- Why separate variables like `expense1`, `expense2`, `expense3` stop working, and what to use instead
- What an **array** is, how to create one, and how to read any item from it
- Why computers start counting at `0`, and how to find the last item with `.length`
- What happens when you ask for an item that is not there

**Before this:** [Project: Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4). You should be comfortable with variables, `if`, loops and functions.

## The problem: one variable per thing does not scale

Imagine you want to remember what you spent on taxis this week. With what you know so far, you would write something like this:

```js
const fare1 = 14;
const fare2 = 14;
const fare3 = 22;
const fare4 = 18.5;
const fare5 = 14;

const total = fare1 + fare2 + fare3 + fare4 + fare5;
console.log(total);
```

Output:

```text
82.5
```

It works. Now think about what happens next:

- Next week you take seven trips. You have to add `fare6` and `fare7`, and remember to add them to the total line too.
- For a whole month you need about twenty variables.
- In Budget Buddy, the user decides how many expenses to type in. You cannot know in advance whether to write 3 variables or 300.
- A loop cannot help you, because there is no way to say "the next variable" when each one has its own name.

What you really want is **one name for the whole list**, plus a way to say "item number 3 on that list". That is exactly what an array gives you.

::: analogy A row of numbered lockers
Picture a row of lockers at a gym or a school. The whole row has one name, say `taxiFares`. Each locker has a number painted on the door, and each locker holds one thing.

- To get something out, you say the row's name **and** the locker number: "taxiFares, locker 2".
- The lockers are in a fixed order. Locker 2 is always next to locker 1 and locker 3.
- The strange part: **the first locker is numbered 0**, not 1. It was painted that way at the factory, and every programming language you will meet does the same. We will see why in a moment.

Keep this picture in mind. Almost everything in this phase is "walk along the row of lockers and do something with each one".
:::

## Creating an array

An **array** is an ordered list of values, stored under one name. You write it with square brackets `[ ]`, and put commas between the values:

```js
const taxiFares = [14, 14, 22, 18.5, 14];
console.log(taxiFares);
```

Output:

```text
[ 14, 14, 22, 18.5, 14 ]
```

Piece by piece:

| Piece | What it means |
|---|---|
| `const taxiFares` | A new variable called `taxiFares`, the name of the whole row of lockers |
| `[` and `]` | "Here comes a list." The start and end of the array |
| `14, 14, 22, 18.5, 14` | The values in the list, separated by commas, in order |

Each value in an array is called an **element** (or an **item**; both words mean the same thing). Writing an array out in full like this, with the values between brackets, is called an **array literal**, the same way `"hello"` is a string literal.

An array can hold text too:

```js
const friends = ["Thandi", "Sipho", "Aisha", "Pieter"];
console.log(friends);
```

Output:

```text
[ 'Thandi', 'Sipho', 'Aisha', 'Pieter' ]
```

Node shows strings inside an array with single quotes. That is only how it displays them. You can write them with double quotes, as usual.

You can also make an **empty array**, with nothing in it yet. This is very common: you start with an empty list and fill it up as the program runs. You will learn how to add to it in the next lesson.

```js
const empty = [];
console.log(empty);
```

Output:

```text
[]
```

## Reading one item: the index

To get one item out of an array, write the array's name, then the locker number in square brackets:

```js
const taxiFares = [14, 14, 22, 18.5, 14];

console.log(taxiFares[0]);
console.log(taxiFares[2]);
```

Output:

```text
14
22
```

The number in the brackets is called the **index** (plural: **indexes** or **indices**). It is the item's position in the list, **counting from 0**:

| Index | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Value | 14 | 14 | 22 | 18.5 | 14 |
| "Human" position | 1st | 2nd | 3rd | 4th | 5th |

So `taxiFares[2]` is the **third** fare, `22`. This trips up everyone at first. Say it to yourself a few times: "index 0 is the first one".

You have seen these square brackets before. In [Strings](#/phase-01-storing-information/05-strings) you used `word[0]` to get the first letter of a word. It is the same idea: a string is a row of letters, and an array is a row of any values. Both count from 0.

::: why Why do computers count from 0?
Think of the index as **"how many steps from the start"**, not "which number in the queue".

Stand in front of the first locker. How many steps do you take to reach it? **Zero**, you are already there. To reach the second locker you take one step. The third, two steps.

Inside the computer, an array really is laid out in memory like a row of lockers, one after another. To find item number `i`, the computer goes to where the array starts and moves `i` places along. The first item is 0 places along. Counting from 0 makes that sum as simple as possible for the machine, and the tradition stuck.

You do not need to like it. You only need to remember it: **an index is a distance from the start.**
:::

The index does not have to be typed as a number. It can be any expression that works out to a number, including a variable:

```js
const friends = ["Thandi", "Sipho", "Aisha", "Pieter"];
const i = 2;

console.log(friends[i]);
console.log(friends[i + 1]);
```

Output:

```text
Aisha
Pieter
```

This is the key that unlocks everything in the rest of this phase. If the index can be a variable, then a loop can change that variable: 0, 1, 2, 3… and visit every item in turn. That is lesson 3.

::: try Your first array
1. In your `coding-practice` folder, create a new folder called `phase-5`. In it, create a file called `first-array.js`.
2. Type this in yourself:
   ```js
   const taxiFares = [14, 14, 22, 18.5, 14];

   console.log(taxiFares);
   console.log("Monday:", taxiFares[0]);
   console.log("Wednesday:", taxiFares[2]);
   console.log("Number of trips:", taxiFares.length);
   ```
3. Save it, and from inside `coding-practice` run:
   ```bash
   node phase-5/first-array.js
   ```
4. You should see:
   ```text
   [ 14, 14, 22, 18.5, 14 ]
   Monday: 14
   Wednesday: 22
   Number of trips: 5
   ```
5. **Now experiment.** Add a line that prints Friday's fare. Before you run it, decide which index Friday is. (Monday is 0…) Then add a sixth fare, `30`, for a Saturday trip, to the end of the list. What will "Number of trips" print now? Predict, then run.
:::

::: quiz
What does this program print?

```js
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
let n = 1;
n = n + 2;
console.log(days[n] + days[n - 3]);
```

- [ ] `WedMon`
- [x] `ThuMon`
- [ ] `Wedundefined`
- [ ] `ThuTue`

`n` ends up as 3. `days[3]` is the **fourth** item, `"Thu"`, and `days[n - 3]` is `days[0]`, the first item, `"Mon"`. `+` glues the two strings: `ThuMon`. If you picked `Wed`, you counted from 1. An index is a distance from the start, so index 3 is three steps along.
:::

## How many items? `.length`

You probably noticed `taxiFares.length` in the last example. Every array knows how many items it holds. You ask for it with `.length`, exactly like you did for strings:

```js
const friends = ["Thandi", "Sipho", "Aisha", "Pieter"];
console.log(friends.length);

const empty = [];
console.log(empty.length);
```

Output:

```text
4
0
```

Notice there are **no brackets** after `length`. It is not something you "run". It is a value the array always keeps up to date, like a label on the locker row saying "4 lockers".

::: quiz
What does this program print?

```js
const queue = ["Zola", "Ben", "", "Kagiso"];
console.log(queue.length, queue[0].length, queue[2].length);
```

- [ ] `3 4 6`
- [ ] `4 4 undefined`
- [x] `4 4 0`
- [ ] `4 1 0`

The empty string `""` is still an item in its own locker, so the array has 4 items. `queue[0]` is `"Zola"`, a string with 4 letters. `queue[2]` is `""`, a string with 0 letters. If you picked `3 4 6`, you skipped the empty string, which moved `"Kagiso"` into index 2. Empty or not, every value between the commas counts.
:::

## The last item: `arr[arr.length - 1]`

Here is a puzzle. `friends` has 4 items. What is the index of the last one?

It is **3**, not 4. The indexes are 0, 1, 2 and 3. Because we start at 0, the last index is always **one less than the length**.

That gives you a line you will write hundreds of times:

```js
const friends = ["Thandi", "Sipho", "Aisha", "Pieter"];

console.log(`First: ${friends[0]}`);
console.log(`Last: ${friends[friends.length - 1]}`);
console.log(`How many: ${friends.length}`);
```

Output:

```text
First: Thandi
Last: Pieter
How many: 4
```

Why not write `friends[3]`? Because it only works while the list has exactly 4 items. When someone adds a fifth friend, `friends[3]` quietly gives you the wrong person. `friends[friends.length - 1]` always gives you the last one, whatever the size.

::: predict What does this print?
```js
const snacks = ["vetkoek", "samoosa", "koeksister", "biltong"];
console.log(snacks[1]);
console.log(snacks[snacks.length - 1]);
console.log(snacks.length);
console.log(snacks[4]);
```
Write down all four lines before you check. The last one is the interesting one.
:::

::: solution
```text
samoosa
biltong
4
undefined
```
- `snacks[1]` is the **second** item, because index 0 is the first.
- `snacks.length` is 4, so `snacks[snacks.length - 1]` is `snacks[3]`, the last item.
- `snacks[4]` asks for the fifth locker, and there is no fifth locker. See the next section.
:::

::: quiz
What does this program print?

```js
const stops = ["Park Station", "Braamfontein", "Rosebank", "Sandton"];
const last = stops.length;
console.log(stops[last - 2]);
console.log(stops[last]);
```

- [ ] `Braamfontein`, then `Sandton`
- [ ] `Sandton`, then `undefined`
- [ ] `Rosebank`, then `Sandton`
- [x] `Rosebank`, then `undefined`

Watch the name: `last` holds the **length**, 4, not the last index. So `stops[last - 2]` is `stops[2]`, which is `"Rosebank"`, and `stops[last]` is `stops[4]`, one locker past the end, which gives `undefined`. If you picked `Sandton` for the second line, you treated the length as the last index. The last index is always `length - 1`.
:::

## Reading past the end gives `undefined`

What happens if you ask for a locker that does not exist?

```js
const expenses = [120, 45.5, 300, 18];

console.log(expenses[4]);
console.log(expenses[-1]);
```

Output:

```text
undefined
undefined
```

No crash, no error message. JavaScript quietly hands you `undefined`, which (as you learned in [true, false and nothing](#/phase-01-storing-information/06-booleans-null-undefined)) means "there is nothing here".

That sounds friendly, but it is actually a trap. Because there is no error, the mistake can sneak further into your program. `undefined + 10` gives `NaN`, and suddenly your total is `NaN` and you have no idea why. When you see an unexpected `undefined` or `NaN`, one of the first questions to ask is: **"Did I read past the end of an array?"**

Also notice that `-1` does not mean "the last one" in JavaScript. For the last item, use `arr[arr.length - 1]`.

::: note Long arrays print over several lines
If an array is long, Node spreads it over several lines to keep it readable:

```js
const marks = [67, 82, 91, 54, 73, 88, 49, 95];
console.log(marks);
```

Output:

```text
[
  67, 82, 91, 54,
  73, 88, 49, 95
]
```

It is still one array with 8 items. Only the display has changed.
:::

::: quiz
What does this program print?

```js
const prices = [25, 40, 15];
const total = prices[1] + prices[2] + prices[3];
console.log(total);
```

- [x] `NaN`
- [ ] `80`
- [ ] `55`
- [ ] `undefined`
- [ ] An error, because `prices[3]` does not exist

The prices are at indexes 0, 1 and 2. `prices[3]` reads past the end and quietly gives `undefined`, with no error. `40 + 15 + undefined` is `NaN`. If you picked 80, you added the first, second and third prices counting from 1, but the code skips index 0 and reads one past the end.
:::

## What can go in an array?

Anything you can put in a variable can go in an array: numbers, strings, booleans, even `null`. You can even mix them:

```js
const mixed = ["Lerato", 17, true, null];
console.log(mixed);
console.log(typeof mixed);
```

Output:

```text
[ 'Lerato', 17, true, null ]
object
```

Two things to notice:

1. **Mixing types works, but you usually should not.** Here, what does `17` mean? An age? A mark? A house number? In real programs, an array is almost always a list of **the same kind of thing**: all prices, all names, all marks. That way, every item can be treated the same way, which is what loops are good at. In [Phase 6](#/phase-06-objects/01-what-is-an-object) you will meet **objects**, which are the right tool for "a name, an age and whether they have paid".
2. **`typeof` says `"object"` for an array**, not `"array"`. That is a historical quirk of JavaScript. Arrays are a special kind of object, and Phase 6 will make that clearer.

::: exercise Level 1 — Guided · School marks
Create `phase-5/marks.js`.

1. Make a `const` called `marks` holding these test marks, in this order: `72, 58, 91, 64, 85`.
2. Print `"First mark:"` followed by the first mark.
3. Print `"Last mark:"` followed by the last mark. Use `.length`, not the number 4.
4. Print `"Number of tests:"` followed by how many marks there are.
5. Make a variable `firstThreeTotal` that adds up the first three marks, using their indexes. Print it with the label `"Total of first three:"`.
6. Run it. The last line should say `221`.
:::

::: solution
```js
const marks = [72, 58, 91, 64, 85];

console.log("First mark:", marks[0]);
console.log("Last mark:", marks[marks.length - 1]);
console.log("Number of tests:", marks.length);

const firstThreeTotal = marks[0] + marks[1] + marks[2];
console.log("Total of first three:", firstThreeTotal);
```
Output:
```text
First mark: 72
Last mark: 85
Number of tests: 5
Total of first three: 221
```
Adding items one index at a time is fine for three, but not for three hundred. In lesson 3, a loop will do it for any length.
:::

::: exercise Level 2 — On your own · First, middle and last
Create `phase-5/playlist.js` with an array of five song titles (any songs you like). Print how many songs there are, and the **first**, **middle** and **last** song, each with a label.

Your code for "middle" and "last" must still work if you add or remove songs. So no typing index numbers like `2` or `4` for those two.
:::

::: hint
For the middle, divide the length by 2. With 5 songs that gives `2.5`, which is not a valid index. Which `Math` function from [Numbers](#/phase-01-storing-information/04-numbers) rounds down?
:::

::: solution
```js
const playlist = ["Jerusalema", "Pata Pata", "Mnike", "Water", "Umlando"];

const middleIndex = Math.floor(playlist.length / 2);

console.log(`Songs: ${playlist.length}`);
console.log(`First: ${playlist[0]}`);
console.log(`Middle: ${playlist[middleIndex]}`);
console.log(`Last: ${playlist[playlist.length - 1]}`);
```
Output:
```text
Songs: 5
First: Jerusalema
Middle: Mnike
Last: Umlando
```
With 5 songs, `Math.floor(5 / 2)` is `2`, which is the third song, right in the middle. Add a sixth song and the code still works (the "middle" becomes index 3, the first of the two middle songs).
:::

::: debug Why is the last city missing?
This should print the last city, but prints `undefined`. Run it, then fix it.

```js
const cities = ["Polokwane", "Kimberley", "East London"];
console.log("Last city:", cities[cities.length]);
```

Output:

```text
Last city: undefined
```

And this one crashes. Read the error message and fix it:

```js
const temps = [21, 25, 19];
console.log(Temps[0]);
```
:::

::: solution
**First program.** `cities.length` is `3`, but the indexes are 0, 1 and 2. There is no index 3, so you get `undefined`. The last index is always one less than the length:

```js
const cities = ["Polokwane", "Kimberley", "East London"];
console.log("Last city:", cities[cities.length - 1]);
```
Output:
```text
Last city: East London
```

This mistake has a name: an **off-by-one error**, being out by exactly one. It is one of the most common bugs in all of programming, and you will meet it again in lesson 3.

**Second program.** `ReferenceError: Temps is not defined`. Names are case-sensitive, so `Temps` and `temps` are different. Change it to `temps[0]`.
:::

::: mistake
**Thinking the first item is `[1]`.** The first item is always `[0]`. If your output seems to skip the first thing in the list, check for this.

**Using `arr[arr.length]` for the last item.** That is one past the end, and gives `undefined`. Use `arr[arr.length - 1]`.

**Writing `.length()` with brackets.** `.length` is a value, not an action. `friends.length()` crashes with `TypeError: friends.length is not a function`.

**Forgetting the commas.** `[14 22 18]` is a `SyntaxError`. Each item must be separated with a comma: `[14, 22, 18]`.

**Expecting an error when you read past the end.** JavaScript gives `undefined` instead, and the problem shows up later as `NaN` or a blank. When a value is mysteriously `undefined`, check your index.
:::

::: quiz
What does this program print?

```js
const answers = [true, "false", 0, null];
console.log(typeof answers, typeof answers[1], answers.length);
```

- [ ] `array string 4`
- [ ] `object boolean 4`
- [ ] `array boolean 3`
- [x] `object string 4`

`typeof` says `"object"` for an array: that is the historical quirk. `answers[1]` is `"false"` in quotes, which is a string, not a boolean. And `null` is a real value in its own locker, so there are 4 items. If you picked `array`, it is a very reasonable guess, but JavaScript does not have `"array"` as a `typeof` answer.
:::

## Real-world uses

Once you start looking, you see lists everywhere:

- Your banking app's list of **transactions** is an array (and the most recent one is often the last item).
- A music app's **playlist** is an array of songs, and "now playing" is an index into it. Pressing "next" adds 1 to the index.
- A WhatsApp **chat** is an array of messages, in order.
- A **class register** is an array of names; a list of test marks is an array of numbers.
- A game's **high-score table** is an array, where index 0 is first place.

Every time an app shows you "item 3 of 12", there is an index and a length behind it.

::: connect
**This builds on:** [variables](#/phase-01-storing-information/02-variables) (an array is still stored in a variable, one that happens to hold a list), and [string indexes](#/phase-01-storing-information/05-strings) (the same `[0]` and `.length`).

**This unlocks:** [Changing arrays](#/phase-05-arrays/02-changing-arrays) next, where you add, remove and replace items. Then [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays), where you finally stop typing index numbers and let a loop visit every item for you.
:::

::: challenge Pick a song by number
People count from 1. Arrays count from 0. Your programs will often have to translate between the two.

Create `phase-5/picker.js`. Using `prompt-sync` (from [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user)), ask the user to pick a song from 1 to however many songs are in your playlist. Print `Now playing:` and the song they picked. If the number is out of range (for example `0` or `6` for a 5-song list), print `There is no song with that number.` instead.

A sample session:

```text
Pick a song from 1 to 5: 1
Now playing: Jerusalema
```
:::

::: solution
```js
const prompt = require("prompt-sync")();

const playlist = ["Jerusalema", "Pata Pata", "Mnike", "Water", "Umlando"];

const choice = Number(prompt(`Pick a song from 1 to ${playlist.length}: `));
const index = choice - 1;   // people count from 1, arrays count from 0

if (index >= 0 && index < playlist.length) {
  console.log(`Now playing: ${playlist[index]}`);
} else {
  console.log("There is no song with that number.");
}
```
Sample sessions:
```text
Pick a song from 1 to 5: 5
Now playing: Umlando
```
```text
Pick a song from 1 to 5: 6
There is no song with that number.
```
```text
Pick a song from 1 to 5: abc
There is no song with that number.
```
The check `index >= 0 && index < playlist.length` is the standard way to ask "is this a real locker?". Notice `<` and not `<=`: `playlist.length` itself is one past the end.

There is still one hole: typing `2.5` prints `Now playing: undefined`, because there is no locker 1.5. You will close that hole in the [Budget Buddy v5 project](#/phase-05-arrays/06-project-budget-buddy-v5).
:::

::: recap
- An **array** is an ordered list of values stored under one name, written `[a, b, c]`. Each value is an **element** (item).
- `[]` is an empty array. Programs often start with one and fill it up.
- `arr[i]` reads the item at **index** `i`. Indexes start at **0**, because an index is a distance from the start.
- `arr.length` is how many items there are (no brackets after it).
- The last item is `arr[arr.length - 1]`. `arr[arr.length]` is one past the end.
- Reading an index that does not exist gives `undefined`, not an error.
- Arrays can hold any type, but a good array holds one kind of thing.
:::

::: interview Why is the last item of an array at `arr.length - 1` and not `arr.length`?
Because indexes start at 0. An array with 4 items has indexes 0, 1, 2 and 3. The length (4) is one more than the biggest index, so the last item is at `length - 1`. `arr[arr.length]` would be one past the end and gives `undefined`.
:::

::: interview Why do arrays start counting at 0?
An index means "how many places from the start". The first item is zero places from the start. The computer finds item `i` by going to the start of the array and moving `i` places along, so starting at 0 keeps that calculation simple.
:::

::: interview Why is an array better than variables like `expense1`, `expense2`, `expense3`?
One name holds the whole list, however long it gets. You do not need to know in advance how many items there will be, and (as you will see next) a loop can visit every item using a changing index. With separate variables, you would have to write a new line of code for every new item.
:::

::: checkpoint
- [ ] I created `phase-5/first-array.js`, ran it, and printed Friday's fare using the right index
- [ ] I finished the school marks exercise and got `221`
- [ ] I printed the first, middle and last song without typing index numbers for the middle and last
- [ ] I fixed the "last city" bug and can explain why `cities[cities.length]` is `undefined`
- [ ] I can explain, out loud, why the first item is at index 0
:::

::: resources
- **javascript.info, "Arrays":** https://javascript.info/array. The first part covers everything in this lesson. (It goes on to later topics, so stop when it gets to things you have not seen yet.)
- **MDN, "Arrays" (beginner guide):** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays. A friendly walkthrough with more examples.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the snacks example and watch the array appear as a row of numbered boxes.
:::
