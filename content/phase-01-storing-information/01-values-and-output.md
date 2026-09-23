---
title: Values, expressions and output
summary: The raw material of every program: pieces of information, sums that produce new ones, and how to see them on the screen.
minutes: 35
stage: Phase 1
---

## What you will learn

- What a **value** is, and the two kinds you will use most: numbers and text
- How to show several values on one line with `console.log`
- The difference between an **expression** (something that produces a value) and a **statement** (an instruction)
- Why the order of your lines matters, and why `"2" + "3"` is not `5`

**Before this:** [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong). You should have a `coding-practice` folder, and be able to run a file with `node`.

## The problem: a program is about information

Think about any app on your phone. A banking app shows your balance. A taxi app shows the fare and how many minutes until the driver arrives. A game shows your score and your name. A weather app shows `23°` and the word "Sunny".

Strip away the colours and buttons, and every one of those apps is doing the same few things:

1. It holds **pieces of information**: a balance, a fare, a name.
2. It **works things out** from them: fare plus tip, balance minus a payment.
3. It **shows** the results to you.

In Phase 0 you did step 3 with one sentence: `console.log("Hello, world!")`. In this lesson you will do all three. By the end you will be able to make Node act like a very patient calculator that also talks.

::: analogy Ingredients on a kitchen counter
Imagine you are cooking. Before you do anything, there are ingredients on the counter: 2 eggs, 500 grams of flour, a label on a jar that says "sugar".

- Each ingredient is a **value**: one piece of information.
- Some are **amounts** (2, 500). Some are **words** ("sugar").
- A recipe step like "mix the flour and eggs" takes some ingredients and **produces something new**. In code, that is an **expression**.
- The whole recipe is a list of steps, done **in order**, top to bottom. You cannot ice a cake you have not baked yet.

A program is the same: values are the ingredients, expressions are the mixing, and the list of lines is the recipe.
:::

## What is a value?

A **value** is a single piece of information that a program can work with. Here are some values:

```text
42
19.99
"Nomvula"
"Sunny"
-7
```

There are two kinds here, and you will use them constantly.

| Kind | What it looks like | Examples | Used for |
|---|---|---|---|
| **Number** | Digits, no quotes. May have a minus sign or a decimal point. | `42`, `19.99`, `-7` | Things you count or calculate with: prices, ages, scores |
| **String** | Text inside quotes | `"Nomvula"`, `"Sunny"`, `"42"` | Words, names, messages, anything you show as text |

A **string** is programmer language for "a piece of text". The name comes from the idea of letters strung together like beads on a string. The quotes are how JavaScript knows where the text starts and stops.

Look closely at the last string example: `"42"`. Because it is in quotes, it is **text** that happens to contain the digits 4 and 2, not the number 42. That difference will matter a lot, and you will see why in a few minutes.

::: note Two quotes that do the same job
You can write strings with double quotes `"like this"` or single quotes `'like this'`. This course mostly uses double quotes. Pick one and be consistent. [Strings](#/phase-01-storing-information/05-strings) covers the details, including a third kind.
:::

## Showing values with `console.log`

You already know that `console.log(...)` shows whatever is inside the brackets. The proper name for what appears on the screen is **output**: what a program gives back to you.

`console.log` works with numbers too, and numbers do not need quotes:

```js
console.log("Nomvula");
console.log(42);
console.log(19.99);
```

Output:

```text
Nomvula
42
19.99
```

Notice that the quotes do **not** appear in the output. They are instructions to JavaScript ("this is text"), not part of the text itself. Like the quotation marks in a book, they are there to show where the words begin and end.

### Several values on one line

You can give `console.log` more than one value. Separate them with commas, and it prints them on one line with a space between each:

```js
console.log("Age:", 42);
console.log("Sipho", "is", 12, "years old");
```

Output:

```text
Age: 42
Sipho is 12 years old
```

This is very handy for **labelling** your output. A bare `42` on the screen means nothing. `Age: 42` explains itself. You will use this pattern in almost every program in this course.

`console.log()` with nothing inside prints an empty line, which is useful for spacing out your output so it is easier to read.

::: quiz
You want your program to print exactly `Price: R25`, with no space between the `R` and the `25`. Which line does that?

- [ ] `console.log("Price: R", 25);`
- [ ] `console.log("Price:", "R", 25);`
- [x] `console.log("Price: R25");`
- [ ] `console.log("Price: R" 25);`

When you separate values with commas, `console.log` always puts a space between them, so the first two lines both print `Price: R 25`. Putting everything in one string gives you full control over the spaces. The last line has no comma between its two values at all, so Node stops with a `SyntaxError`.
:::

## Expressions: making new values

Here is where it gets interesting. You do not have to give `console.log` a finished value. You can give it a sum, and JavaScript works out the answer first:

```js
console.log(2 + 3);
console.log(10 - 4);
console.log(6 * 7);
console.log(10 / 4);
```

Output:

```text
5
6
42
2.5
```

The four **arithmetic operators** are the same as on a calculator, with two differences in the symbols:

| Operation | Maths | JavaScript |
|---|---|---|
| Add | 2 + 3 | `2 + 3` |
| Subtract | 10 − 4 | `10 - 4` |
| Multiply | 6 × 7 | `6 * 7` (an asterisk, Shift+8 on most keyboards) |
| Divide | 10 ÷ 4 | `10 / 4` (a forward slash) |

An **operator** is a symbol that does something to values. `2 + 3` is called an **expression**: any piece of code that **produces a value**. The expression `2 + 3` produces the value `5`.

Values on their own are expressions too. `42` is an expression that produces `42`. That sounds silly, but it means that anywhere JavaScript wants a value, you can put either a finished value **or** something that works one out.

You can use as many operators as you like, and brackets work the way they do in maths:

```js
console.log(1500 - 450 - 300);
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
```

Output:

```text
750
14
20
```

`2 + 3 * 4` is `14`, not `20`, because multiplication happens before addition, exactly as you learned at school. Brackets let you choose a different order. The full rules come in [Numbers](#/phase-01-storing-information/04-numbers). For now: **when in doubt, add brackets**.

::: try A talking calculator
1. Open your `coding-practice` folder in VS Code.
2. Create a new folder called `phase-1`. In the VS Code Explorer, right-click an empty area and choose **New Folder**. Or, in the terminal, from inside `coding-practice`:
   ```bash
   mkdir phase-1
   ```
   (This works the same on Windows, macOS and Linux.)
3. Inside `phase-1`, create a file called `values.js`.
4. Type this in yourself. Do not copy and paste:
   ```js
   // A weekend trip to the shops
   console.log("Bread:", 18);
   console.log("Milk:", 32);
   console.log("Airtime:", 50);
   console.log("Total:", 18 + 32 + 50);
   console.log("Change from R200:", 200 - 18 - 32 - 50);
   ```
5. Save the file (**Ctrl+S** on Windows and Linux, **Cmd+S** on macOS).
6. In the terminal, make sure you are inside `coding-practice`, then run:
   ```bash
   node phase-1/values.js
   ```
7. You should see:
   ```text
   Bread: 18
   Milk: 32
   Airtime: 50
   Total: 100
   Change from R200: 100
   ```
8. **Now experiment.** Change the price of milk to `35` on line 3 only. Before you run it, predict all five lines of output. Then run it. Did the total change? (It did not, because you typed `32` again on lines 5 and 6. Hold on to that annoyance. It is exactly the problem the [next lesson](#/phase-01-storing-information/02-variables) solves.)
:::

::: note About the R
Money in this course is in South African rand, written `R`. If you use a different currency, swap in your own symbol. The code works the same.
:::

::: quiz
Three friends share a R240 bill plus a R30 tip equally. Which line prints each person's share, `90`?

- [ ] `console.log(240 + 30 / 3);`
- [x] `console.log((240 + 30) / 3);`
- [ ] `console.log(240 / 3 + 30);`
- [ ] `console.log("(240 + 30) / 3");`

Division happens before addition, so without brackets `240 + 30 / 3` divides only the tip: 240 + 10 is 250. The brackets make the addition happen first: 270 / 3 is 90. The third line gives each person the whole tip (80 + 30 is 110). The last line is in quotes, so it prints the text `(240 + 30) / 3` and does no maths at all.
:::

## Statements: the instructions themselves

If an expression is something that *produces a value*, what is the whole line `console.log(2 + 3);`?

It is a **statement**: one complete instruction to the computer. "Show this." A program is a list of statements.

A useful way to tell them apart:

- An **expression** is like a *phrase*: "two plus three". It has a value, but on its own it does not do anything.
- A **statement** is like a *full sentence*: "Write down two plus three." It is an instruction to act.

The semicolon `;` at the end of a statement is like the full stop at the end of a sentence. Most statements in this course sit on their own line and end with `;`.

```js
console.log(6 * 7);
```

In this one line:

- `6 * 7` is an expression. It produces `42`.
- `console.log(6 * 7);` is a statement. It tells the computer to show that `42`.

You do not need to use these words perfectly yet. They matter because error messages and documentation use them, and because "put an expression here" will soon mean "you can put a sum, a value, or (later) a variable here".

## Top to bottom, one line at a time

Node reads your file like you read a recipe: from the first line to the last, doing each statement completely before moving on to the next. This is sometimes called **order of execution**. (To **execute** code means to run it.)

So the order of your output always follows the order of your code:

```js
console.log("1. Wake up");
console.log("2. Brush teeth");
console.log("3. Catch the taxi");
```

Output:

```text
1. Wake up
2. Brush teeth
3. Catch the taxi
```

Swap two lines, and the output swaps too:

```js
console.log("1. Wake up");
console.log("3. Catch the taxi");
console.log("2. Brush teeth");
```

Output:

```text
1. Wake up
3. Catch the taxi
2. Brush teeth
```

The numbers in the text do not matter to the computer. They are only characters inside strings. The computer does not know it has put you on the taxi with dirty teeth. It follows the order you wrote, exactly and literally, which is what you saw in [What is programming](#/phase-00-start-here/02-what-is-programming).

This sounds obvious now, but it is the root of many real bugs: "I used something before I had worked it out." Keep "top to bottom" in mind for the whole course.

::: predict What does this print?
```js
console.log("Start");
console.log(3 * 3);
// console.log("Middle");
console.log("End", 10 - 1);
```
Write down your answer, line by line, before you open the solution.
:::

::: solution
```text
Start
9
End 9
```
The third line starts with `//`, so it is a **comment**: a note for humans that JavaScript skips completely. Nothing is printed for it. The last line shows two values, `"End"` and the result of `10 - 1`, separated by a space.
:::

::: quiz
This program should print `Ready`, `Set` and `Go`, in that order.

```js
console.log("Set");
console.log("Ready");
// console.log("Go");
```

What do you need to change?

- [x] Swap the first two lines, and remove the `//` from the last line
- [ ] Remove the `//` from the last line; Node puts the other two in the right order
- [ ] Swap the first two lines; the last line already prints `Go`
- [ ] Change the strings to `"1. Ready"`, `"2. Set"` and `"3. Go"`

Node runs the lines top to bottom, in exactly the order you wrote them, so `Ready` has to come first in the code. And `//` turns a line into a comment, which Node skips completely, so `Go` is never printed until you remove it. Numbering the strings changes only the text: the computer does not read numbers inside quotes, so the order stays wrong.
:::

## Numbers and strings do different things with `+`

Here is the teaser promised earlier. Try to predict these three lines before you read the output:

```js
console.log(2 + 3);
console.log("2" + "3");
console.log("2 + 3");
```

Output:

```text
5
23
2 + 3
```

Three lines that look almost the same, three completely different results:

1. `2 + 3`: two **numbers**. `+` means *add*. Result: the number `5`.
2. `"2" + "3"`: two **strings**. `+` means *join the text together*. Result: the text `23`, a "2" character followed by a "3" character. No maths happens at all.
3. `"2 + 3"`: **one** string that happens to contain the characters 2, space, plus, space, 3. JavaScript does not look inside quotes for sums. It prints the text as it is.

Joining strings together with `+` is really useful:

```js
console.log("Hello, " + "Thandi");
```

Output:

```text
Hello, Thandi
```

Note the space inside `"Hello, "`. JavaScript joins text exactly as it is, with no extra spaces, so you have to include them yourself.

And when you mix a string and a number with `+`, JavaScript turns the number into text and joins them:

```js
console.log("I have " + 3 + " cats");
```

Output:

```text
I have 3 cats
```

::: analogy Counting beads vs threading beads
Imagine two jars. One holds a **quantity** of beads (a number). The other holds **letter beads** you thread onto a string (a string).

- Put 2 beads and 3 beads together, and you have 5 beads. That is `2 + 3`.
- Thread a "2" bead and then a "3" bead onto a string, and you have a necklace that reads "23". That is `"2" + "3"`.

Same `+`, different kind of thing, different result. The **kind** of value decides what `+` does.
:::

This idea, that every value has a **kind**, and the kind decides what you can do with it, is called a **data type**. It is so important that most of this phase is about it. For now, remember: **quotes make text, and text does not do maths.**

::: exercise Level 1 — Guided · Your day in numbers
Create `phase-1/my-day.js`.

1. On the first line, write a comment saying what the program is for.
2. Print `"Hours in a day:"` followed by `24`.
3. Print `"Minutes in a day:"` followed by the expression `24 * 60`. Let JavaScript do the maths.
4. Print `"Seconds in a day:"` followed by `24 * 60 * 60`.
5. Print an empty line with `console.log();`.
6. Print `"Hours in a year:"` followed by `365 * 24`.
7. Run it with `node phase-1/my-day.js`. The seconds line should say `86400`.
:::

::: solution
```js
// Some facts about time, worked out by JavaScript
console.log("Hours in a day:", 24);
console.log("Minutes in a day:", 24 * 60);
console.log("Seconds in a day:", 24 * 60 * 60);
console.log();
console.log("Hours in a year:", 365 * 24);
```
Output:
```text
Hours in a day: 24
Minutes in a day: 1440
Seconds in a day: 86400

Hours in a year: 8760
```
:::

::: exercise Level 2 — On your own · Splitting a braai
Create `phase-1/braai.js`. Four friends, Lerato, Johan, Aisha and Kagiso, are sharing the cost of a braai. The meat cost R480, the rolls R45, the salads R95 and the drinks R160.

Print:
- each item with a label,
- the **total** cost, calculated by JavaScript,
- how much **each person** pays, also calculated by JavaScript.

Do not work out any answers on paper or a calculator and type them in. Write expressions.
:::

::: hint
To get each person's share, the whole total must be added up *before* you divide by 4. Remember what brackets do.
:::

::: solution
```js
// Four friends share the cost of a braai
console.log("Meat:", 480);
console.log("Rolls:", 45);
console.log("Salads:", 95);
console.log("Drinks:", 160);
console.log("Total:", 480 + 45 + 95 + 160);
console.log("Each person pays:", (480 + 45 + 95 + 160) / 4);
```
Output:
```text
Meat: 480
Rolls: 45
Salads: 95
Drinks: 160
Total: 780
Each person pays: 195
```
Without the brackets, `480 + 45 + 95 + 160 / 4` divides only the drinks by 4, and you get `660`. Try it and see.

You typed every price three times. Next lesson, variables fix that.
:::

::: debug Three small bugs
Each program has one mistake. Run each one, **read the error or the output**, and fix it.

```js
// Program A: should print the word Hello
console.log(Hello);
```

```js
// Program B: should print 15
console.log("10" + "5");
```

```js
// Program C: should print "Total: 40"
console.log("Total:" 25 + 15);
```
:::

::: solution
**A:** Node stops with `ReferenceError: Hello is not defined`, and the caret `^` points at `Hello`. Without quotes, JavaScript thinks `Hello` is the *name* of something (you will meet names next lesson), and there is nothing called that. Text needs quotes: `console.log("Hello");`.

**B:** It prints `105`, not `15`. There is no error, which makes it sneakier. `"10"` and `"5"` are strings, so `+` joins them. Remove the quotes: `console.log(10 + 5);`.

**C:** `SyntaxError: missing ) after argument list`. The comma between the two values is missing, so JavaScript cannot tell where one value ends and the next begins. Fix: `console.log("Total:", 25 + 15);`.
:::

::: mistake
**Forgetting quotes around text.** `console.log(Hello)` crashes. `console.log("Hello")` works. No quotes means "a name", quotes mean "this exact text".

**Putting quotes around a sum you want calculated.** `console.log("5 * 2")` prints `5 * 2`. Remove the quotes to get `10`.

**Mismatched quotes.** `"Hello'` starts with a double quote and ends with a single one. JavaScript keeps looking for the closing `"` and gives a `SyntaxError`. Start and end with the same kind.

**Forgetting the commas between values.** `console.log("Age:" 42)` is a `SyntaxError`. Write `console.log("Age:", 42)`.

**Using `x` for multiply or `÷` for divide.** JavaScript only understands `*` and `/`.

**Forgetting to save before running.** If the output did not change, check the tab in VS Code. A dot on the tab means unsaved changes.
:::

::: quiz
Which line prints exactly `Score: 10`?

- [ ] `console.log("Score: " + 4 + 6);`
- [ ] `console.log("Score: 4 + 6");`
- [ ] `console.log("Score:" + 10);`
- [x] `console.log("Score:", 4 + 6);`

In the right answer, `4 + 6` is two numbers, so it adds to `10`, and the comma puts a space after `Score:`. The first line is the tempting one: `"Score: " + 4` mixes text and a number, so it joins to the text `"Score: 4"`, and then the `6` is joined on too, giving `Score: 46`. The third line is close, but `+` never adds a space for you, so it prints `Score:10`.
:::

## Real-world uses

What you learned in this lesson is the core of every program's output:

- A till slip at a supermarket prints labels and amounts, one after another, in order: exactly `console.log("Milk:", 32)` many times.
- A fitness app shows "Steps today: 8421" and "Distance: 6.3 km": a label and a value.
- A payslip works out gross pay minus deductions: an expression.
- Error messages you have already seen in Node are output too: a program printing values in a particular order.

Later, the values will come from variables, from the person using the program, and from files. But they will always be shown the same way.

::: connect
**This builds on:** your first program in [Phase 0](#/phase-00-start-here/06-your-first-program), where you printed one piece of text.

**This unlocks:** [Variables](#/phase-01-storing-information/02-variables), next. In this lesson you had to type the same prices again and again, and changing one meant changing several lines. Variables let you give a value a name and type it only once. The "strings and numbers behave differently" teaser returns properly in [Strings](#/phase-01-storing-information/05-strings) and [Converting between types](#/phase-01-storing-information/07-converting-between-types).
:::

::: challenge A tidy receipt
Write `phase-1/receipt.js` that prints this receipt **exactly**, with JavaScript calculating every total. The line prices are: 2 loaves of bread at R18 each, 3 cans of beans at R16 each, and 1 bag of apples at R35.

```text
=== Spaza Shop ===
Bread x2: 36
Beans x3: 48
Apples x1: 35

Total: 119
Paid: 150
Change: 31
```

Hint: the `===` line and the blank line need `console.log` too. Only the numbers after the colons should come from expressions.
:::

::: solution
```js
// A receipt from the spaza shop
console.log("=== Spaza Shop ===");
console.log("Bread x2:", 2 * 18);
console.log("Beans x3:", 3 * 16);
console.log("Apples x1:", 1 * 35);
console.log();
console.log("Total:", 2 * 18 + 3 * 16 + 1 * 35);
console.log("Paid:", 150);
console.log("Change:", 150 - (2 * 18 + 3 * 16 + 1 * 35));
```
Output:
```text
=== Spaza Shop ===
Bread x2: 36
Beans x3: 48
Apples x1: 35

Total: 119
Paid: 150
Change: 31
```
The brackets in the last line matter: you want to subtract the *whole* total from 150. Without them, `150 - 2 * 18 + 3 * 16 + 1 * 35` subtracts the bread and then *adds* the beans and apples, which gives `197`.
:::

::: recap
- A **value** is a piece of information. The two main kinds so far are **numbers** (`42`, `19.99`) and **strings**, which are text in quotes (`"Sunny"`).
- `console.log(a, b, c)` prints several values on one line, separated by spaces. Use it to label your output.
- `+ - * /` are **arithmetic operators**. Brackets control the order, like in maths.
- An **expression** produces a value (`2 + 3`). A **statement** is a complete instruction (`console.log(2 + 3);`).
- Code runs **top to bottom**, one statement at a time, so output appears in the order the code is written.
- `+` adds numbers but joins strings: `2 + 3` is `5`, while `"2" + "3"` is `"23"`. The **kind** of value (its data type) decides what happens.
- Comments (`//`) are skipped by JavaScript.
:::

::: interview What is the difference between `42` and `"42"`?
`42` is a **number**, so you can do maths with it. `"42"` is a **string**: text that happens to contain the characters 4 and 2. They look the same when printed, but `42 + 1` is `43`, while `"42" + 1` is `"421"`.
:::

::: interview What is an expression? Give an example.
An expression is any piece of code that produces a value. `6 * 7` is an expression that produces `42`. A plain value like `"hello"` is also an expression, because it produces itself.
:::

::: interview Why does the output of a program appear in the same order as the code?
Because the computer runs statements from top to bottom, finishing each one before starting the next. It does not rearrange anything, even if the result makes no sense to a human.
:::

::: checkpoint
- [ ] I created the `phase-1` folder and ran `phase-1/values.js`
- [ ] I changed a price, predicted the output, and ran it again
- [ ] I printed a label and a value on one line using a comma
- [ ] I ran `"2" + "3"` and `2 + 3` myself and saw the difference
- [ ] I finished the braai exercise using expressions, not a calculator
- [ ] I fixed all three programs in "Debug this"
:::

::: resources
- **javascript.info, "Basic operators, maths":** https://javascript.info/operators. Read the first few sections, up to "Operator precedence". The rest will make more sense after [Numbers](#/phase-01-storing-information/04-numbers).
- **MDN, "What is JavaScript?":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript. A friendly overview of what the language is for.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the "top to bottom" example and step through it line by line.
:::
