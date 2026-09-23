---
title: Variables — giving values a name
summary: How a program remembers things. The single most important idea in this whole course.
minutes: 45
stage: Phase 1
---

## What you will learn

- What a **variable** is, and why programs cannot work without them
- How to create one, put a value in it, and read the value back
- What the `=` sign really means in code (it is *not* "equals")
- How to change a variable's value, including the strange-looking `score = score + 1`

**Before this:** [Values, expressions and output](#/phase-01-storing-information/01-values-and-output). You should be comfortable running a file with `node`.

## The problem: programs need to remember things

In the last lesson you printed values directly:

```js
console.log(1500 - 450 - 300);
```

Output:

```text
750
```

That works, but look at it a week from now. What is `1500`? What is `450`? The computer knows the answer is `750`, but **you** have no idea what it means.

A second problem: what if the `1500` has to be used in five different places, and then it changes to `1650`? You would have to find and change all five, and miss one.

Programs need a way to **remember a value and give it a meaningful name**. That is what a variable is.

::: analogy A labelled box
Picture a cardboard box with a label stuck on the front. The label says `income`. Inside the box is a piece of paper that says `1500`.

- The **label** is the variable's *name*.
- The **paper inside** is the variable's *value*.
- Whenever you say "income", the computer walks over to the box with that label, looks inside, and uses whatever it finds.
- You can take the paper out and put a new one in. The label stays the same, but the value changes.

Hold on to this picture. It explains almost every "why did that happen?" moment in this lesson.
:::

## Creating your first variable

```js
let income = 1500;
```

Read it from left to right, piece by piece:

| Piece | What it means |
|---|---|
| `let` | "I am making a new box." This is called **declaring** a variable. |
| `income` | The label on the box: the variable's **name**. |
| `=` | "Put the thing on the right into the box on the left." |
| `1500` | The value that goes into the box. |
| `;` | End of this instruction, like a full stop in a sentence. |

Now you can use the name wherever you would have used the value:

```js
let income = 1500;
console.log(income);
console.log(income * 12);
```

Output:

```text
1500
18000
```

Notice there are **no quotes** around `income` in `console.log(income)`. Quotes would mean "the text *income*". No quotes means "the box called income, and whatever is inside it". Compare:

```js
let income = 1500;
console.log("income");
console.log(income);
```

Output:

```text
income
1500
```

This difference is small to look at, but important. You will make this mistake at least once, and everybody does.

::: try Your first variables
1. Open your `coding-practice` folder in VS Code.
2. Create a new folder called `phase-1` if it does not exist yet. In it, create a file called `variables.js`.
3. Type this in yourself. Do not copy and paste it:
   ```js
   let income = 1500;
   let rent = 450;
   let food = 300;

   console.log("Income:", income);
   console.log("Left after rent and food:", income - rent - food);
   ```
4. Save the file (**Ctrl+S** on Windows and Linux, **Cmd+S** on macOS).
5. In the terminal, make sure you are inside `coding-practice`, then run:
   ```bash
   node phase-1/variables.js
   ```
6. You should see:
   ```text
   Income: 1500
   Left after rent and food: 750
   ```
7. **Now experiment.** Change `rent` to `600`. Before you run it, say out loud what the second line will print. Then run it. Were you right?
:::

Compare the two versions. `income - rent - food` explains itself. `1500 - 450 - 300` does not. **Variables make code readable**, and that is half their value.

::: quiz
What does this print?

```js
let price = 35;
console.log("price", price * 2);
```

- [ ] `35 70`
- [ ] `price price * 2`
- [x] `price 70`
- [ ] `70`

`"price"` is in quotes, so it is the word *price*, not the box. `price * 2` has no quotes, so JavaScript looks in the box, finds 35, and doubles it. If you picked `35 70`, you read the quoted `"price"` as the variable. Quotes always mean "this exact text".
:::

## `=` does not mean "equals"

This is the most important sentence in this lesson:

> In code, `=` means **"store the value on the right into the name on the left."**

In maths, `x = 5` is a statement of fact: x *is* 5, forever. In programming, `x = 5` is an **action**: *put 5 into x, now*. It is called **assignment**, and `=` is the **assignment operator**.

Because it is an action, it always works **right to left**:

1. First, work out everything on the right-hand side.
2. Then, store the result in the variable on the left.

```js
let total = 200 + 150 + 80;
console.log(total);
```

Output:

```text
430
```

JavaScript first calculates `200 + 150 + 80` to get `430`. Only then does it put `430` into `total`. The box never holds "200 + 150 + 80". It holds the finished answer.

::: note How do I say "is equal to" then?
Checking whether two things are equal is a different job, with a different symbol: `===`. You will meet it in [Phase 2](#/phase-02-making-decisions/01-comparing-values). For now, whenever you see a single `=`, say "gets" in your head: `total` **gets** `200 + 150 + 80`.
:::

## Changing a variable's value

A variable made with `let` can be given a new value later. Leave off the `let` the second time, because the box already exists. You are only swapping what is inside it.

```js
let balance = 1000;
console.log("Start:", balance);

balance = 800;
console.log("After shopping:", balance);

balance = 1200;
console.log("After payday:", balance);
```

Output:

```text
Start: 1000
After shopping: 800
After payday: 1200
```

The old value is **gone** once you replace it. The box holds one thing at a time.

Code runs from **top to bottom**, so what a variable holds depends on *where you are* in the program. Line 2 prints `1000` because, at that moment, the box holds `1000`.

::: quiz
What is the last line this prints?

```js
let bags = 3;
console.log("Bags:", bags);
bags = 5;
let total = bags * 10;
bags = 8;
console.log("Total:", total);
```

- [x] `Total: 50`
- [ ] `Total: 80`
- [ ] `Total: 30`
- [ ] `Total: bags * 10`

`total` is worked out once, on line 4, when `bags` holds 5, so it stores the finished answer, 50. Changing `bags` to 8 afterwards does not reach back and redo the sum: `total` holds a number, not a formula. `80` is what you get if you imagine `total` keeps watching `bags`.
:::

## The line that confuses everyone: `score = score + 1`

In maths, `score = score + 1` is impossible. No number equals itself plus one.

In code it is one of the most common lines you will ever write. Apply the right-to-left rule:

```js
let score = 10;
score = score + 1;
console.log(score);
```

Output:

```text
11
```

Step by step, for `score = score + 1`:

1. Work out the right side first: look in the `score` box and find `10`. Then `10 + 1` is `11`.
2. Store the result on the left: put `11` into the `score` box, replacing the `10`.

It means "**make `score` one bigger than it was**". You will use this pattern for counting things, keeping running totals, tracking points in games, and much more. In [Phase 3](#/phase-03-loops/01-why-loops) it becomes the heartbeat of every loop.

```js
let savings = 0;
savings = savings + 200;   // month 1
savings = savings + 200;   // month 2
savings = savings + 350;   // month 3, got a bonus
console.log("Saved so far:", savings);
```

Output:

```text
Saved so far: 750
```

(The `//` parts are **comments**: notes for humans that JavaScript ignores. You met them in [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).)

::: predict What does this print?
```js
let a = 5;
let b = a;
a = 20;
console.log(a);
console.log(b);
```
Write your answer down *before* you open the solution. Then type the code in and run it to check.
:::

::: solution
```text
20
5
```
`let b = a;` means "look in box `a` right now, find `5`, and put a copy of `5` into box `b`". From that moment the two boxes are separate. Changing `a` later does not reach back and change `b`.

If you said `20` and `20`, you pictured `b` as a *link* to `a`. That is a reasonable guess, but for numbers and text it is wrong. (There is a twist for lists and objects in [Phase 6](#/phase-06-objects/04-values-and-references). Park that thought for now.)
:::

::: quiz
What does this print?

```js
let steps = 4;
steps = steps + steps;
steps = steps + 1;
steps = steps * 2;
console.log(steps);
```

- [ ] `10`
- [ ] `16`
- [ ] `9`
- [x] `18`

Each line works out the right side using what is in the box *now*, then replaces it: 4 + 4 is 8, then 8 + 1 is 9, then 9 × 2 is 18. If you got 10, you forgot that line 2 had already changed `steps` to 8. `16` skips the `+ 1` line, and `9` stops one line too early.
:::

## Declaring now, filling later

You can create an empty box and fill it later:

```js
let favouriteFood;
console.log(favouriteFood);

favouriteFood = "pap and wors";
console.log(favouriteFood);
```

Output:

```text
undefined
pap and wors
```

`undefined` is JavaScript's way of saying "this box exists, but nothing has been put in it yet". You will meet it properly in [true, false, and nothing](#/phase-01-storing-information/06-booleans-null-undefined).

## You cannot make the same box twice

```js
let city = "Durban";
let city = "Cape Town";
```

Output:

```text
SyntaxError: Identifier 'city' has already been declared
```

`let` means "make a **new** box". You already have a box labelled `city`, so JavaScript refuses. If you want to change it, drop the second `let`:

```js
let city = "Durban";
city = "Cape Town";
console.log(city);
```

Output:

```text
Cape Town
```

A handy rule: **`let` appears once per variable, the first time. After that, you only use the name.**

::: exercise Level 1 — Guided · A shopping trip
Create `phase-1/shopping.js`.

1. Create a variable `wallet` with the value `500`.
2. Print `"Wallet:"` followed by the wallet amount.
3. You buy bread for `18`. Change `wallet` so it holds `wallet - 18`. Use the right-to-left pattern.
4. You buy airtime for `50`. Take that off too.
5. Someone pays you back `100`. Add that on.
6. Print `"Wallet now:"` and the final amount.
7. Run it. You should end with `532`.
:::

::: solution
```js
let wallet = 500;
console.log("Wallet:", wallet);

wallet = wallet - 18;
wallet = wallet - 50;
wallet = wallet + 100;

console.log("Wallet now:", wallet);
```
Output:
```text
Wallet: 500
Wallet now: 532
```
:::

::: exercise Level 2 — On your own · Rectangle calculator
Create `phase-1/rectangle.js`. Make two variables, `width` and `height`, with any numbers you like. Then make two more variables, `area` (width × height) and `perimeter` (the distance around the edge), **calculated from the first two**. Do not type the answers in yourself. Print all four with labels.

Then change only `width` and run it again. Did `area` and `perimeter` update without you touching them? That is the point.
:::

::: hint
The perimeter of a rectangle is width + height + width + height. In JavaScript, multiplication is `*`.
:::

::: solution
```js
let width = 4;
let height = 3;

let area = width * height;
let perimeter = 2 * width + 2 * height;

console.log("Width:", width);
console.log("Height:", height);
console.log("Area:", area);
console.log("Perimeter:", perimeter);
```
Output:
```text
Width: 4
Height: 3
Area: 12
Perimeter: 14
```
:::

::: debug Why does this crash?
Each of these three tiny programs has one problem. Run each one, **read the error message**, and fix it.

```js
// Program A
let price = 99;
console.log(Price);
```

```js
// Program B
let total = 10;
let total = total + 5;
console.log(total);
```

```js
// Program C
console.log(greeting);
let greeting = "Sawubona";
```
:::

::: solution
**A:** `ReferenceError: Price is not defined`. JavaScript is **case-sensitive**: `price` and `Price` are two different names. Change it to `console.log(price);`.

**B:** `SyntaxError: Identifier 'total' has already been declared`. The second line should not have `let`: `total = total + 5;`.

**C:** `ReferenceError: Cannot access 'greeting' before initialization`. Code runs top to bottom, and on line 1 the box has not been made yet. Swap the two lines around.
:::

::: mistake
**Putting quotes around a variable name.** `console.log("total")` prints the word *total*. `console.log(total)` prints what is inside the box.

**Using `let` every time you change a variable.** `let` is only for creating it. Changing it is just `name = newValue;`.

**Reading `=` as "equals".** Read it as "gets". This one habit prevents a whole family of confusion.

**Mismatched capitals.** `userName`, `username` and `UserName` are three different variables. Pick one spelling and copy it exactly.

**Using a variable before the line that creates it.** The computer reads top to bottom. It cannot use a box it has not built yet.
:::

::: quiz
Only one of these programs runs without an error **and** prints `12`. Which one?

- [ ] `let n = 10; let n = n + 2; console.log(n);`
- [x] `let n = 10; n = n + 2; console.log(n);`
- [ ] `n = 10; let n = n + 2; console.log(n);`
- [ ] `let n = 10; n + 2; console.log(n);`

The second one makes the box once with `let`, then stores `n + 2` back into it. The first uses `let` twice for the same name, which is a `SyntaxError`. The third uses `n` before the line that creates it, which is a `ReferenceError`. The last one is the sneaky one: `n + 2` does work out 12, but nothing stores it, so `n` is still 10 and it prints `10`.
:::

## Real-world uses

Every program you have ever used is full of variables:

- A banking app holds your `balance`, and changes it every time money moves.
- A game holds `score`, `lives` and `level`, updating them with lines just like `score = score + 1`.
- A music app holds `currentSong` and `volume`.
- An online shop holds `cartTotal`, recalculated when you add or remove an item.

In each case: a name that means something, a value inside it, and the value changing over time.

::: connect
**This builds on:** [values](#/phase-01-storing-information/01-values-and-output). A variable is a named place to keep a value.

**This unlocks:** almost everything. Next, [let and const](#/phase-01-storing-information/03-let-and-const) shows how to create boxes that are *not allowed* to change. After that, [numbers](#/phase-01-storing-information/04-numbers), [text](#/phase-01-storing-information/05-strings) and [true/false](#/phase-01-storing-information/06-booleans-null-undefined) show the different kinds of values a box can hold. The "make it one bigger" pattern returns in every loop in Phase 3.
:::

::: challenge Swap two boxes
You have:

```js
let left = "coffee";
let right = "tea";
```

Write code that **swaps** them, so that `left` holds `"tea"` and `right` holds `"coffee"`. You may not type the words `"coffee"` or `"tea"` again. Print both to prove it worked.

Think about two real cups of drink. How would you swap their contents without mixing them?
:::

::: solution
You need a third, temporary cup:

```js
let left = "coffee";
let right = "tea";

let temp = left;   // pour left into the spare cup
left = right;      // pour right into left
right = temp;      // pour the spare cup into right

console.log(left);
console.log(right);
```
Output:
```text
tea
coffee
```
If you tried `left = right; right = left;`, you got `tea` twice. The first line threw away `"coffee"` before you had saved it anywhere. Swapping with a temporary variable is a classic, and you will use it again when sorting.
:::

::: recap
- A **variable** is a named box that holds a value. The name makes code readable, and the box lets a program remember.
- `let name = value;` **declares** (creates) a variable and gives it its first value.
- `=` is **assignment**: work out the right side, then store the result on the left. Say "gets", not "equals".
- Change a value with `name = newValue;` (no `let` the second time).
- `x = x + 1` means "make x one bigger". It is used for counters and running totals everywhere.
- Code runs top to bottom, so a variable's value depends on where you are in the program.
- Names are case-sensitive, and a variable must be created before it is used.
:::

::: interview What is the difference between `console.log(total)` and `console.log("total")`?
Without quotes, `total` is a **variable name**, so JavaScript looks inside the box and prints its value (for example `430`). With quotes, `"total"` is a **piece of text**, so it prints the word `total` itself.
:::

::: interview In your own words, what does `count = count + 1` do?
First it works out the right-hand side: take the current value of `count` and add 1. Then it stores that result back into `count`, replacing the old value. So `count` ends up one bigger than before.
:::

::: interview Why do we write `let` only once for each variable?
`let` means "create a new variable". Doing it twice with the same name tries to create a second box with a label that already exists, which is a `SyntaxError`. To change the value, write the name without `let`.
:::

::: checkpoint
- [ ] I created `phase-1/variables.js` and ran it with `node`
- [ ] I changed a value, predicted the new output, and ran it to check
- [ ] I finished the shopping trip exercise and got `532`
- [ ] I finished the rectangle calculator and saw area and perimeter update on their own
- [ ] I fixed all three programs in "Debug this" and read each error message
- [ ] I can explain `score = score + 1` out loud without looking
:::

::: resources
- **javascript.info, "Variables":** https://javascript.info/variables. A clear, short chapter with a few extra exercises.
- **MDN, "Storing the information you need — Variables":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables. A beginner guide from the people who document the web.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the "predict" example above and step through it one line at a time. You will literally see the boxes.
:::
