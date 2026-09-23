---
title: if and else — making your program choose
summary: Your program stops doing the same thing every time, and starts reacting to what it finds.
minutes: 50
stage: Phase 2
---

## What you will learn

- How to make a program run some code **only if** something is true, using `if`
- How to give it a plan B with `else`, and several options with `else if`
- Why the order of an `else if` chain matters, and how to get it right
- What the curly-brace **blocks** are for, why indentation matters, and what happens to a variable created inside a block

**Before this:** [Comparing values](#/phase-02-making-decisions/01-comparing-values). You should be able to write a comparison like `mark >= 50` and know that it gives back `true` or `false`.

## The problem: asking is not enough

In the last lesson your programs learned to ask questions. They could print `Can I pay the fare? false`. But then what? The program printed the answer and carried on exactly as before. A person who notices they cannot afford the taxi does something about it. They walk, or they phone a friend.

You want programs that behave like that:

- **If** the user's mark is 50 or more, say "You passed". **Otherwise**, say "Not this time".
- **If** the cart total is R500 or more, delivery is free. **Otherwise**, charge R80.
- **If** the amount typed is not a number, show an error.
- **If** it is load-shedding stage 4, tell people to charge their phones now.

Every one of those sentences has the same shape: *if something is true, do this; otherwise, do that.* JavaScript has almost exactly those words built in.

::: analogy A fork in the road
Picture walking along a path that splits in two. At the fork there is a signpost with a question on it: "Is it raining?"

- If the answer is **yes**, you take the left path, which goes past the shop where you buy an umbrella.
- If the answer is **no**, you take the right path, straight to the park.
- A little further on, both paths join up again, and you carry on walking.

You only ever walk **one** of the two paths. You never walk both, and you never walk neither. That is exactly how `if` and `else` work. The question on the signpost is the **condition**, and each path is a **block** of code.
:::

## Drawing a decision

Programmers often sketch decisions as a **flowchart**: boxes for actions, a diamond (here drawn with `< >`) for a question, and arrows showing which way the program goes.

```text
                 start
                   |
                   v
         < Is mark >= 50 ? >
           |             |
          yes            no
           |             |
           v             v
   "You passed!"     "Not this time."
           |             |
           +------+------+
                  |
                  v
            "Report done."
```

The program comes down from the top, reaches the question, takes **one** of the two paths, and then both paths meet again. Keep this picture in mind while you read the code.

## Your first `if`

Start with the simplest version: do something only when a condition is true, and otherwise do nothing extra.

```js
const moneyInPocket = 15;
const fare = 20;

if (moneyInPocket < fare) {
  console.log("Not enough for the taxi. Time to walk.");
}

console.log("Have a good day!");
```

Output:

```text
Not enough for the taxi. Time to walk.
Have a good day!
```

Take it apart piece by piece:

| Piece | What it means |
|---|---|
| `if` | "Check something before doing this." |
| `( ... )` | The **condition**: the question to ask. It goes in round brackets, and it must work out to `true` or `false`. |
| `moneyInPocket < fare` | The comparison. Here it is `15 < 20`, which is `true`. |
| `{ ... }` | The **block**: the code that runs *only if* the condition is `true`. It can hold as many lines as you like. |
| no `;` after `}` | A block does not need a semicolon after it. |

The last line, `console.log("Have a good day!")`, is **outside** the block, so it runs no matter what. That is where the two paths join up again.

Now change `moneyInPocket` to `50` and run it in your head. `50 < 20` is `false`, so JavaScript skips the whole block and jumps to the line after the `}`:

```js
const moneyInPocket = 50;
const fare = 20;

if (moneyInPocket < fare) {
  console.log("Not enough for the taxi. Time to walk.");
}

console.log("Have a good day!");
```

Output:

```text
Have a good day!
```

This is new. Until now, **every** line of your programs ran, from top to bottom. From this lesson on, some lines run and some are skipped, depending on the values. This is called **control flow**: the path the computer takes through your code.

::: try Your first decision
1. In your `coding-practice` folder, create `phase-2/taxi.js`.
2. Type this in:
   ```js
   const prompt = require("prompt-sync")();

   const fare = 20;
   const money = Number(prompt("How much money do you have? R"));

   if (money < fare) {
     console.log("Not enough for the taxi. Time to walk.");
   }

   console.log("Have a good day!");
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-2/taxi.js
   ```
4. Type `15`. You should see:
   ```text
   How much money do you have? R15
   Not enough for the taxi. Time to walk.
   Have a good day!
   ```
5. Run it again and type `50`. The walking message should disappear.
6. **Now experiment.** What happens if you type exactly `20`? Predict it first, then run it. Is that the behaviour you want?
:::

With exactly `20`, `20 < 20` is `false`, so you are not told to walk. That is right: R20 is enough for a R20 fare. Always test the boundary.

## `else`: plan B

Often you want to do one thing when the condition is true and a **different** thing when it is false. That is what `else` is for.

```js
const mark = 43;

if (mark >= 50) {
  console.log("You passed!");
} else {
  console.log("Not this time. Let's look at what to practise.");
}

console.log("Report done.");
```

Output:

```text
Not this time. Let's look at what to practise.
Report done.
```

`else` means "otherwise". It has no condition of its own, because it does not need one: it runs exactly when the `if` condition was `false`. Exactly one of the two blocks runs, every time. This is the fork-in-the-road flowchart from earlier, written in code.

`else` must come straight after the closing `}` of the `if`. You cannot have an `else` on its own.

::: predict What does this print?
```js
const cartTotal = 500;
let delivery = 80;

if (cartTotal >= 500) {
  delivery = 0;
} else {
  console.log("Spend R500 or more for free delivery.");
}

console.log("Delivery: R" + delivery);
```
:::

::: solution
```text
Delivery: R0
```
`500 >= 500` is `true`, so the first block runs and `delivery` gets `0`. The `else` block is skipped, so the "Spend R500" message never prints. The last line is outside both blocks, so it always runs.

Notice the pattern: `delivery` was created *before* the `if` with a starting value, and the `if` changed it. You will see why that is the right place to create it later in this lesson.
:::

::: quiz
What does this print?

```js
let fare = 18;
const wallet = 20;

if (wallet >= fare) {
  console.log("Pay");
  fare = fare + 5;
} else {
  console.log("Walk");
}

console.log(fare);
```

- [ ] `Pay`, then `18`
- [ ] `Pay`, then `Walk`, then `23`
- [x] `Pay`, then `23`
- [ ] `Walk`, then `18`

20 is at least 18, so the `if` block runs: it prints `Pay` and changes `fare` to 23. The condition is asked once, before the block. Changing `fare` inside the block does not make JavaScript go back and try the `else`, so `Walk` is never printed. The last line is outside both blocks, so it always runs, and it shows the new value, 23.
:::

## `else if`: more than two paths

Some decisions have more than two outcomes. Turning a percentage into a symbol on a school report is a good example:

| Mark | Symbol |
|---|---|
| 80 and up | A |
| 70 to 79 | B |
| 60 to 69 | C |
| 50 to 59 | D |
| 40 to 49 | E |
| below 40 | F |

You can chain questions together with `else if`:

```js
const mark = 74;

if (mark >= 80) {
  console.log("Symbol: A");
} else if (mark >= 70) {
  console.log("Symbol: B");
} else if (mark >= 60) {
  console.log("Symbol: C");
} else if (mark >= 50) {
  console.log("Symbol: D");
} else if (mark >= 40) {
  console.log("Symbol: E");
} else {
  console.log("Symbol: F");
}
```

Output:

```text
Symbol: B
```

JavaScript asks the questions **one at a time, from the top down**, and **stops at the first `true` one**:

1. Is 74 >= 80? No. Move on.
2. Is 74 >= 70? **Yes.** Run that block, print `Symbol: B`, and skip everything else in the chain.

It never even asks "is 74 >= 60?", although that is also true. Only one block in the whole chain ever runs. The final `else` catches everything that did not match any question above it, and is optional. Leave it off if "none of the above" needs no action.

As a flowchart, a chain looks like a ladder you climb down until you get a yes:

```text
        < mark >= 80 ? > --yes--> "A" ---+
               | no                      |
        < mark >= 70 ? > --yes--> "B" ---+
               | no                      |
        < mark >= 60 ? > --yes--> "C" ---+
               | no                      |
              ...                        |
               | no                      |
              "F" -----------------------+
                                         |
                                         v
                                   carry on
```

### Order matters

Here is the same program with the questions in a different order. It runs without any error:

```js
const mark = 92;

if (mark >= 50) {
  console.log("Symbol: D");
} else if (mark >= 80) {
  console.log("Symbol: A");
} else {
  console.log("Symbol: F");
}
```

Output:

```text
Symbol: D
```

A mark of 92 gets a D. The first question, "is 92 >= 50?", is `true`, so the D block runs and the chain stops. The A question is never asked. No error message warns you. The program is perfectly happy to be wrong.

**The rule: when you check ranges with `>=`, start with the highest threshold and work down.** (If you check with `<`, start with the lowest and work up.) Each question can then assume all the earlier ones were "no". By the time you ask `mark >= 70`, you already know the mark is below 80, so you do not need to say so.

::: try Symbols for any mark
1. Create `phase-2/symbol.js`:
   ```js
   const prompt = require("prompt-sync")();

   const mark = Number(prompt("Your mark (0-100): "));

   if (mark >= 80) {
     console.log("Symbol: A. Outstanding!");
   } else if (mark >= 70) {
     console.log("Symbol: B. Great work.");
   } else if (mark >= 60) {
     console.log("Symbol: C. Solid.");
   } else if (mark >= 50) {
     console.log("Symbol: D. You passed.");
   } else if (mark >= 40) {
     console.log("Symbol: E. Nearly there.");
   } else {
     console.log("Symbol: F. Let's make a study plan.");
   }
   ```
2. Run it with `node phase-2/symbol.js` and type `68`. You should see:
   ```text
   Your mark (0-100): 68
   Symbol: C. Solid.
   ```
3. Try every boundary: `80`, `79`, `50`, `49`, `0`. Predict each before you press Enter.
4. **Now break it on purpose.** Move the `mark >= 50` check to the very top of the chain. Type `95`. What symbol do you get, and why?
:::

::: quiz
A traffic officer's app uses this chain, with `const speed = ...;` above it. Which speed makes it print `Fine: R1000`?

```js
if (speed > 60) {
  console.log("Fine: R500");
} else if (speed > 80) {
  console.log("Fine: R1000");
} else if (speed > 120) {
  console.log("Fine: R2500");
} else {
  console.log("No fine");
}
```

- [ ] `85`
- [ ] `100`
- [ ] `130`
- [x] No speed can make it print that

The chain stops at the first `true` question. Any speed above 80 is also above 60, so the first block (`Fine: R500`) always wins, and the R1000 and R2500 questions are never reached. 85 and 100 feel right because they are "more than 80", but JavaScript never gets that far. The fix is to start with the biggest threshold: `speed > 120` first, then `speed > 80`, then `speed > 60`.
:::

## Separate `if`s versus an `else if` chain

Beginners often write several separate `if` statements where they meant one chain. They look similar but behave differently:

```js
const temperature = 30;

if (temperature >= 25) {
  console.log("Wear shorts.");
}
if (temperature >= 15) {
  console.log("Wear a T-shirt.");
}
if (temperature < 15) {
  console.log("Wear a jersey.");
}
```

Output:

```text
Wear shorts.
Wear a T-shirt.
```

These are three **independent** questions. Each one is asked, no matter what the others said. 30 is at least 25 *and* at least 15, so two messages print. Here that might even be what you want (shorts and a T-shirt).

If you want exactly **one** answer, use a chain:

```js
const temperature = 30;

if (temperature >= 25) {
  console.log("Hot: shorts and a hat.");
} else if (temperature >= 15) {
  console.log("Mild: a T-shirt will do.");
} else {
  console.log("Cold: grab a jersey.");
}
```

Output:

```text
Hot: shorts and a hat.
```

Ask yourself: "Could more than one of these be right at the same time?" If yes, separate `if`s. If exactly one should win, an `else if` chain.

::: quiz
What does this print?

```js
const points = 120;
let reward = "none";

if (points >= 50) {
  reward = "coffee";
}
if (points >= 100) {
  reward = "muffin";
}
if (points >= 200) {
  reward = "lunch";
}

console.log(reward);
```

- [ ] `coffee`
- [x] `muffin`
- [ ] `lunch`
- [ ] `none`

These are three separate `if`s, so all three questions are asked. 120 passes the first (`reward` becomes `coffee`) and the second (`reward` becomes `muffin`), and fails the third. Each passing `if` overwrites the value before it, so the last one to pass wins. `coffee` is what an `else if` chain would give, because a chain stops at the first `true`. Separate `if`s never stop early.
:::

## Blocks and indentation

The curly braces `{ }` group lines into a **block**, so that JavaScript knows which lines belong to the `if`. Everything between `{` and its matching `}` runs together, or not at all.

```js
const stage = 4;

if (stage >= 4) {
  console.log("Load-shedding is heavy today.");
  console.log("Charge your phone and power bank now.");
  console.log("Fill the kettle before the power goes.");
}
```

Output:

```text
Load-shedding is heavy today.
Charge your phone and power bank now.
Fill the kettle before the power goes.
```

The **indentation** (the two spaces at the start of the lines inside the block) is for humans. JavaScript does not care about it at all. This works identically:

```js
const stage = 4;
if (stage >= 4) {
console.log("Load-shedding is heavy today.");
      console.log("Charge your phone and power bank now.");
  console.log("Fill the kettle before the power goes.");}
```

It runs, but it is hard to see at a glance which lines are inside the block. Once you have blocks inside blocks, messy indentation hides bugs. So we indent every line inside a block by two spaces, and put the closing `}` back in line with the `if`. VS Code can do this for you: right-click in your file and choose **Format Document**.

::: warn Always use the braces
JavaScript lets you leave out the `{ }` when the block has only one line. **Do not.** If you later add a second line, it will look like it belongs to the `if`, but it will run every time. Always writing the braces avoids a bug that has caught out even very experienced programmers.
:::

## Variables created inside a block stay inside it

Here is something that surprises everyone the first time:

```js
const age = 15;

if (age < 18) {
  let ticket = "child";
}

console.log(ticket);
```

Output:

```text
ReferenceError: ticket is not defined
```

Node points at the `console.log(ticket)` line. The variable `ticket` was created with `let` **inside** the block, and a variable made inside a block only exists inside that block. When the program reaches the `}`, the box is thrown away. By the last line there is no box called `ticket` any more.

This rule is called **scope**: the part of the program where a name exists. You will study it properly in [Scope](#/phase-04-functions/04-scope). For now, the practical fix is the pattern from the predict exercise above: **create the variable before the `if`, then change it inside the blocks.**

```js
const age = 15;
let ticket;

if (age < 18) {
  ticket = "child";
} else {
  ticket = "adult";
}

console.log(ticket);
```

Output:

```text
child
```

`let ticket;` makes an empty box *outside* the blocks, so it still exists after them. Each block only fills it. Notice that it is `let`, not `const`, because the value is given later.

::: quiz
What does this print?

```js
const age = 20;
let ticket = "child";

if (age >= 18) {
  let ticket = "adult";
}

console.log(ticket);
```

- [ ] `adult`
- [ ] `ReferenceError: ticket is not defined`
- [ ] `SyntaxError: Identifier 'ticket' has already been declared`
- [x] `child`

The `let` inside the block makes a **new**, separate box that only lives inside the block. It happens to have the same name. `"adult"` goes into the inner box, and that box is thrown away at the `}`. The outer `ticket` was never touched, so it still says `child`. There is no error, because the two boxes live in different places. The fix is to remove the word `let` inside the block, so that the line changes the box that already exists: `ticket = "adult";`.
:::

## Checking that input is a number

This is one of the most useful things `if` can do. Users type all sorts of things into a `prompt`, and `Number("twenty")` gives `NaN`. From the last lesson you know to check for that with `Number.isNaN()`, which already gives back `true` or `false`, so you can put it straight in the condition:

```js
const prompt = require("prompt-sync")();

const amount = Number(prompt("How much airtime do you want? R"));

if (Number.isNaN(amount)) {
  console.log("That is not a number. Please use digits, like 29.");
} else if (amount < 5) {
  console.log("The smallest top-up is R5.");
} else {
  console.log(`Buying R${amount} of airtime.`);
}
```

Three sample sessions:

```text
How much airtime do you want? Rtwenty
That is not a number. Please use digits, like 29.
```

```text
How much airtime do you want? R2
The smallest top-up is R5.
```

```text
How much airtime do you want? R29
Buying R29 of airtime.
```

Put the "is it a number at all?" question **first**. It only makes sense to ask whether an amount is too small once you know it is a number. This is called **input validation**: checking that what the user typed makes sense before you use it. Real programs do it everywhere.

For now the program can only complain and carry on. It cannot ask again, because asking again means repeating code, and repeating is what [loops](#/phase-03-loops/01-why-loops) are for. That is coming in Phase 3.

::: exercise Level 1 — Guided · Cinema ticket prices
The local cinema charges R60 for children under 12, R70 for pensioners aged 60 and over, and R95 for everyone else. Create `phase-2/tickets.js`.

1. Add the `prompt` line at the top, then ask for the age and convert it with `Number()`. Store it in `const age`.
2. Create `let price;` on the next line (empty for now).
3. Write an `if` that checks `age < 12` and sets `price = 60`.
4. Add `else if (age >= 60)` that sets `price = 70`.
5. Add an `else` that sets `price = 95`.
6. After the chain, print `` `Your ticket costs R${price}.` ``
7. Run it with `8`, `35`, `60` and `11`. You should get R60, R95, R70 and R60.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const age = Number(prompt("How old are you? "));
let price;

if (age < 12) {
  price = 60;
} else if (age >= 60) {
  price = 70;
} else {
  price = 95;
}

console.log(`Your ticket costs R${price}.`);
```
A sample session:
```text
How old are you? 35
Your ticket costs R95.
```
The order of the first two checks does not matter here, because no age can be both under 12 and 60 or over. Order only matters when the questions overlap, as they did with the marks.
:::

::: exercise Level 2 — On your own · Online shop delivery
Create `phase-2/delivery.js`. Ask for the cart total. The delivery rules are:

- If the total is not a number, print an error and nothing else.
- R500 or more: free delivery.
- R300 up to R499.99: R40 delivery.
- Less than R300: R80 delivery.

Print the delivery cost and the grand total (cart plus delivery), both with two decimal places. If the delivery is not free, also print how much more they need to spend to get free delivery.
:::

::: hint
Start with `if (Number.isNaN(total))` for the error. Put everything else inside its `else { ... }` block: an `if` can live inside another block. In there, create `let delivery;`, then write a chain from the highest threshold down, then print. For "how much more", it is `500 - total`, and it only applies when `delivery` is not `0`, so you can use `if (delivery !== 0)`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const total = Number(prompt("Cart total: R"));

if (Number.isNaN(total)) {
  console.log("Please type the total as a number, like 249.99");
} else {
  let delivery;

  if (total >= 500) {
    delivery = 0;
  } else if (total >= 300) {
    delivery = 40;
  } else {
    delivery = 80;
  }

  console.log(`Delivery: R${delivery.toFixed(2)}`);
  console.log(`Grand total: R${(total + delivery).toFixed(2)}`);

  if (delivery !== 0) {
    console.log(`Spend R${(500 - total).toFixed(2)} more for free delivery.`);
  }
}
```
Two sample sessions:
```text
Cart total: R349.50
Delivery: R40.00
Grand total: R389.50
Spend R150.50 more for free delivery.
```
```text
Cart total: R620
Delivery: R0.00
Grand total: R620.00
```
Notice that an `if` can go **inside** another block. The whole delivery calculation lives in the `else` of the number check, so it only happens for valid input. Indentation is what keeps this readable. Your solution may be arranged differently and still be right: what matters is that it gives the right answers at every boundary (299.99, 300, 499.99, 500).
:::

::: debug Four bugs, one program
This program should tell someone what to wear. It has four problems. Run it, read any error, fix it, and run again until it prints `Mild: bring a light jacket.` for 18 degrees.

```js
const temperature = 18;

if (temperature >= 15) {
  let advice = "Mild: bring a light jacket.";
} else if (temperature >= 28) {
  advice = "Hot: shorts and sunscreen.";
} else (temperature < 15) {
  advice = "Cold: a warm jersey.";
}
console.log(advice)
```
:::

::: solution
Run it first and you get `SyntaxError: Unexpected token '{'`, pointing at the `else (temperature < 15) {` line. Here are all four fixes:

1. **`else` cannot have a condition.** `else (temperature < 15)` is not allowed. Either write `else {` or `else if (temperature < 15) {`. Since "below 15" is all that is left, plain `else` is right.
2. **The order is wrong.** `temperature >= 15` is checked before `temperature >= 28`, so a 30-degree day would get "Mild". Check the highest threshold first.
3. **`advice` is created inside a block,** so it does not exist at the `console.log`. Create it before the chain with `let advice;` and only assign inside.
4. **A missing semicolon** at the end of the last line. JavaScript usually copes without it, but this course always writes it.

```js
const temperature = 18;
let advice;

if (temperature >= 28) {
  advice = "Hot: shorts and sunscreen.";
} else if (temperature >= 15) {
  advice = "Mild: bring a light jacket.";
} else {
  advice = "Cold: a warm jersey.";
}

console.log(advice);
```
Output:
```text
Mild: bring a light jacket.
```
:::

::: mistake
**Putting a condition on `else`.** `else` means "everything else" and never has brackets. If you need a condition, you want `else if (...)`.

**Checking ranges in the wrong order.** With `>=`, start from the biggest threshold. Otherwise the first, widest check swallows everything.

**Using `=` instead of `===` in a condition.** `if (stage = 4)` does not ask anything. It stores 4 in `stage`, and the block runs every time. Write `if (stage === 4)`.

**Putting a semicolon after the condition.** `if (money < fare); { ... }` ends the `if` at the semicolon, so the block after it runs every time. There is no `;` between `)` and `{`.

**Creating a variable inside a block and using it outside.** Create it with `let` before the `if`, and assign to it inside.

**Leaving out the braces.** Always write `{ }`, even for one line.

**Forgetting to convert input.** `if (age >= 18)` on a string mostly works by accident, but `if (age === 18)` never does. Use `Number()`.
:::

## Real-world uses

Decisions are what make software feel smart. A few examples:

- **Taxi and ride apps** charge a higher rate if it is late at night or raining.
- **Banking apps** stop a payment if the amount is more than your balance, else send it.
- **Weather apps** show a sun, cloud or rain icon depending on the forecast, with an `else if` chain.
- **School systems** turn marks into symbols exactly like the program you wrote.
- **Load-shedding apps** show a different message and colour for each stage.
- **Every form on the internet** checks your input before accepting it: "Please enter a valid email address" is an `if` doing input validation.

::: connect
**This builds on:** [comparing values](#/phase-02-making-decisions/01-comparing-values). Every condition in this lesson is a comparison (or `Number.isNaN`), which gives back `true` or `false`.

**This unlocks:** almost every program from now on. Next, [and, or, not](#/phase-02-making-decisions/03-combining-conditions) lets one condition ask two questions at once, such as "is the mark 50 or more **and** was the project handed in?". Later, in [Phase 3](#/phase-03-loops/01-why-loops), the same kind of condition decides how many times a loop repeats.
:::

::: challenge Leap years
A year is a **leap year** (with a 29 February) if it can be divided by 4, **except** that years divisible by 100 are not leap years, **except** that years divisible by 400 are. So 2024 is a leap year, 1900 is not, and 2000 is.

Write `phase-2/leap-year.js` that asks for a year and prints either `2024 is a leap year.` or `1900 is not a leap year.` Use only `if`, `else if` and `else` (no `&&` or `||` yet). Test it with 2024, 2023, 1900 and 2000.
:::

::: hint
"Can be divided by 4" means `year % 4 === 0` (the remainder is zero). Think about the order: which rule is the most specific? Check divisible-by-400 first, then divisible-by-100, then divisible-by-4, then everything else. Store the answer in a `let isLeap;` created before the chain.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const year = Number(prompt("Which year? "));
let isLeap;

if (year % 400 === 0) {
  isLeap = true;
} else if (year % 100 === 0) {
  isLeap = false;
} else if (year % 4 === 0) {
  isLeap = true;
} else {
  isLeap = false;
}

if (isLeap) {
  console.log(`${year} is a leap year.`);
} else {
  console.log(`${year} is not a leap year.`);
}
```
Sample sessions:
```text
Which year? 1900
1900 is not a leap year.
```
```text
Which year? 2000
2000 is a leap year.
```
The order does all the work: the most specific rule goes first. Also notice `if (isLeap)`. A boolean variable already *is* `true` or `false`, so it can go straight into the condition. There is no need to write `if (isLeap === true)`.
:::

::: recap
- `if (condition) { ... }` runs the block only when the condition is `true`. Otherwise it skips it.
- `else { ... }` runs when the condition was `false`. Exactly one of the two runs.
- `else if (...)` adds more options. JavaScript checks from the top and runs **only the first** block whose condition is `true`.
- In a range chain with `>=`, check the **highest** threshold first. The wrong order gives wrong answers with no error.
- Separate `if`s are independent questions. A chain picks exactly one answer.
- A **block** `{ }` groups lines. Indent inside blocks for humans, and always write the braces.
- A variable made with `let` inside a block disappears at the `}`. Create it before the `if`, assign inside.
- Validate input: check `Number.isNaN()` first, then the range.
:::

::: interview What is the difference between writing three separate `if` statements and one `if / else if / else` chain?
Separate `if`s are independent: every condition is checked, and several blocks can run. In a chain, JavaScript stops at the first condition that is `true`, so exactly one block (or none, if there is no `else`) runs.
:::

::: interview Why does the order of conditions in an `else if` chain matter? Give an example.
Because the chain stops at the first `true` condition. If you check `mark >= 50` before `mark >= 80`, a mark of 92 matches the first check and gets the lower symbol, and the `>= 80` check is never reached. With `>=`, check the highest threshold first.
:::

::: interview A learner creates `let message` inside an `if` block and gets "message is not defined" on the line after the block. Explain.
A variable created with `let` inside a block only exists inside that block (its **scope**). After the closing `}`, it is gone. The fix is to declare `let message;` before the `if`, and only assign to it inside the blocks.
:::

::: checkpoint
- [ ] I ran `taxi.js` and tested it with an amount exactly on the boundary
- [ ] I ran `symbol.js` for every boundary, then broke the order on purpose and saw the wrong symbol
- [ ] I saw the `ReferenceError` for a variable created inside a block, and fixed it
- [ ] I finished the cinema ticket exercise and tested all four ages
- [ ] I finished the delivery exercise, including the "not a number" case
- [ ] I fixed the what-to-wear program in "Debug this"
- [ ] I can draw the flowchart for an `if / else` on paper
:::

::: resources
- **javascript.info, "Conditional branching: if, '?'":** https://javascript.info/ifelse. Short and clear. (The `?` part is covered in [switch and the ternary operator](#/phase-02-making-decisions/05-switch-and-ternary).)
- **MDN, "Making decisions in your code — conditionals":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals. A beginner guide with more examples.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the marks chain and step through it. You will see exactly which lines are skipped.
:::
