---
title: Why functions exist
summary: Stop copying and pasting. Give a group of steps a name, write it once, and use it as often as you like.
minutes: 40
stage: Phase 4
---

## What you will learn

- The problem that **functions** solve: the same lines copied again and again
- How to **declare** a function (write the recipe) and **call** it (cook it)
- What really happens when a program calls a function: it jumps in, runs the steps, and comes back
- How to name functions well, and why you have been using functions since your very first program

**Before this:** [Project: Budget Buddy v3](#/phase-03-loops/06-project-budget-buddy-v3). You should be comfortable with variables, `if`, loops and the menu loop.

## The problem: the same lines, three times

Mama Thandi runs a small kitchen in Soweto. Her till program prints a slip for every customer, and every slip starts with the same header. Here is a program that prints three slips:

```js
// Customer 1
console.log("==============================");
console.log("   MAMA THANDI'S KITCHEN");
console.log("   Shop 4, Main Road, Soweto");
console.log("   Tel: 011 555 0199");
console.log("==============================");
console.log("Vetkoek x2        R16.00");
console.log("");

// Customer 2
console.log("==============================");
console.log("   MAMA THANDI'S KITCHEN");
console.log("   Shop 4, Main Road, Soweto");
console.log("   Tel: 011 555 0199");
console.log("==============================");
console.log("Kota x1           R45.00");
console.log("");

// Customer 3
console.log("==============================");
console.log("   MAMA THANDI'S KITCHEN");
console.log("   Shop 4, Main Road, Soweto");
console.log("   Tel: 011 555 0199");
console.log("==============================");
console.log("Amagwinya x5      R40.00");
```

Output:

```text
==============================
   MAMA THANDI'S KITCHEN
   Shop 4, Main Road, Soweto
   Tel: 011 555 0199
==============================
Vetkoek x2        R16.00

==============================
   MAMA THANDI'S KITCHEN
   Shop 4, Main Road, Soweto
   Tel: 011 555 0199
==============================
Kota x1           R45.00

==============================
   MAMA THANDI'S KITCHEN
   Shop 4, Main Road, Soweto
   Tel: 011 555 0199
==============================
Amagwinya x5      R40.00
```

It works. Now imagine three things that will certainly happen:

1. **The phone number changes.** You must find and change it in three places. If you miss one, some customers get the old number. In a real program the header might be copied into thirty places, not three.
2. **Someone reads the code.** They see fifteen header lines and have to check each group carefully to be sure all three are really the same. Maybe one has a typo. Who knows?
3. **A fourth customer arrives.** You copy the five lines again. The program keeps growing, but it is not getting any smarter.

A loop does not help here, because the header is not repeated back to back. It is repeated *between other things*. What we want is a way to say: "these five lines are called *print the header*. Whenever I say *print the header*, do all five."

That is exactly what a function is.

::: analogy A recipe card
Think of a recipe card for making vetkoek. On the front it says **"Vetkoek"**. On the back are the steps: mix flour, yeast, sugar and salt; add warm water; knead; let it rise; fry in hot oil.

- **Writing the card** does not make any food. It only saves the steps under a name, so nobody has to remember them.
- **Cooking from the card** is when things actually happen. You can cook from the same card on Monday, on Friday, and for a wedding with two hundred guests.
- If you improve the recipe (a little more sugar), you **fix the card once**, and every future batch is better.

A function is a recipe card for your program. Writing the card is called **declaring** the function. Cooking from it is called **calling** the function.
:::

## Your first function

Here is the header, turned into a function:

```js
function printHeader() {
  console.log("==============================");
  console.log("   MAMA THANDI'S KITCHEN");
  console.log("   Shop 4, Main Road, Soweto");
  console.log("   Tel: 011 555 0199");
  console.log("==============================");
}
```

A **function** is a named group of steps that you can run whenever you want by using its name. Read the code piece by piece:

| Piece | What it means |
|---|---|
| `function` | "I am writing a new recipe card." This word starts a function **declaration**. |
| `printHeader` | The name on the card. The same naming rules as variables apply. |
| `()` | Round brackets. They are empty for now. In the [next lesson](#/phase-04-functions/02-parameters-and-arguments) you will put things in them. |
| `{ ... }` | Curly braces hold the steps. Everything between them is the **function body**. |

You already know curly braces from `if` and loops: they group lines into a block. Indenting the body by two spaces makes it easy to see what belongs to the function.

Now the important part. Put only that declaration in a file and run it, and you get... nothing at all. No output, no error. The terminal goes straight back to waiting for your next command. That is not a mistake. **Declaring a function does not run it.** You wrote the recipe card, but nobody has cooked anything yet.

## Calling a function

To run the steps, write the function's name followed by round brackets:

```js
printHeader();
```

This is a **function call**. The brackets are what say "do it now". Here is the whole program, rewritten:

```js
function printHeader() {
  console.log("==============================");
  console.log("   MAMA THANDI'S KITCHEN");
  console.log("   Shop 4, Main Road, Soweto");
  console.log("   Tel: 011 555 0199");
  console.log("==============================");
}

printHeader();
console.log("Vetkoek x2        R16.00");
console.log("");

printHeader();
console.log("Kota x1           R45.00");
console.log("");

printHeader();
console.log("Amagwinya x5      R40.00");
```

The output is exactly the same as before, letter for letter. But look at what changed:

- The header lives in **one** place. Change the phone number there, and all three slips change.
- The bottom of the program now reads almost like plain English: print the header, print the vetkoek line, print the header, print the kota line...
- A fourth customer costs one line (`printHeader();`), not five.

This idea has a name among programmers: **DRY**, short for "**Don't Repeat Yourself**". When you notice you are copying the same lines, that is your signal to make a function.

::: try Fix the phone number once
1. In your `coding-practice` folder, create a folder called `phase-4` if it does not exist yet. In it, create `receipts.js`.
2. Type in the function version of the program above (the one with `function printHeader()`). Type it, do not paste it.
3. Save, then from inside `coding-practice` run:
   ```bash
   node phase-4/receipts.js
   ```
4. You should see three slips, each with the full header, exactly as in the first output above.
5. **Now experiment.** Mama Thandi has a new number: `011 555 0200`. Change it in the function only. Before you run it, predict: how many slips will show the new number? Run it and check.
6. Add a fourth customer who buys `Chips x1          R25.00`. How many lines did you need to add?
:::

::: quiz
What does this program print?

```js
function announce() {
  console.log("Sale on today!");
}

announce;
announce();
console.log("Doors open at 9");
announce;
```

- [ ] `Sale on today!`, `Sale on today!`, `Doors open at 9`
- [ ] `Sale on today!`, `Doors open at 9`, `Sale on today!`
- [x] `Sale on today!`, `Doors open at 9`
- [ ] An error, because `announce;` has no brackets

Only `announce();`, with the brackets, is a call. `announce;` on its own names the recipe card without cooking from it, so nothing happens and there is no error either. If you picked an option with `Sale on today!` more than once, you counted the lines without brackets as calls.
:::

## What really happens when you call a function

This is worth slowing down for, because it explains the order in which things print.

When JavaScript reaches a function call, it:

1. **Pauses** where it is, and remembers the spot.
2. **Jumps** into the function and runs its body from top to bottom.
3. **Comes back** to the spot it remembered, and carries on with the next line.

Here is a small program that shows the jumping:

```js
function brushTeeth() {
  console.log("   - brush the top teeth");
  console.log("   - brush the bottom teeth");
  console.log("   - rinse and spit");
}

console.log("07:00 Wake up");
console.log("07:15 Eat breakfast");
brushTeeth();
console.log("07:45 Leave for work");
console.log("21:30 Get ready for bed");
brushTeeth();
console.log("22:00 Sleep");
```

Output:

```text
07:00 Wake up
07:15 Eat breakfast
   - brush the top teeth
   - brush the bottom teeth
   - rinse and spit
07:45 Leave for work
21:30 Get ready for bed
   - brush the top teeth
   - brush the bottom teeth
   - rinse and spit
22:00 Sleep
```

Follow it with your finger:

- JavaScript reads the declaration of `brushTeeth` and files the recipe card away. Nothing prints.
- It prints `07:00` and `07:15`.
- It meets `brushTeeth();`, so it jumps into the function, prints the three brushing lines, then comes back.
- It prints `07:45` and `21:30`.
- It meets `brushTeeth();` again, jumps in again, and comes back again.
- It prints `22:00`.

The code still runs top to bottom, like every program you have written. A function call is a short **detour**, and the program always returns to where it left off.

::: note Where to put your functions
Put your function declarations **near the top** of the file and your calls **below** them. That way, anyone reading your code meets the recipe cards before the cooking. (JavaScript is a bit more flexible than this, and you will see why in [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions). The tidy habit is still the right one.)
:::

::: try Watch the detour
1. Create `phase-4/routine.js` and type in the `brushTeeth` program above.
2. Run it with `node phase-4/routine.js` and compare with the output shown.
3. **Change it, predict, run.** Add a third call to `brushTeeth();` straight after `07:15 Eat breakfast`, so there are two calls in a row. Before you run it, write down the full output you expect. Then run it and check.
4. Now delete **all** the calls but keep the function. Predict what prints. Run it.
:::

::: quiz
What does this program print, in order?

```js
console.log("Gate opens");

function checkTicket() {
  console.log("Ticket scanned");
}

console.log("Queue moves");
checkTicket();
console.log("Enjoy the match");
```

- [ ] `Gate opens`, `Ticket scanned`, `Queue moves`, `Enjoy the match`
- [ ] `Gate opens`, `Ticket scanned`, `Queue moves`, `Ticket scanned`, `Enjoy the match`
- [ ] `Gate opens`, `Queue moves`, `Enjoy the match`
- [x] `Gate opens`, `Queue moves`, `Ticket scanned`, `Enjoy the match`

The declaration sits in the middle of the file, but declaring a function runs nothing. `Ticket scanned` only prints when the call `checkTicket();` is reached, after `Queue moves`. Then the program comes back and prints `Enjoy the match`. If you picked the first option, you let the declaration run where it was written.
:::

## Functions can call other functions

A function body can contain anything you already know: variables, `if`, loops, and calls to other functions.

```js
function printLine() {
  console.log("------------------------------");
}

function printTitle() {
  printLine();
  console.log("   SIPHO'S FIVE-A-SIDE LEAGUE");
  printLine();
}

printTitle();
console.log("Round 1: Lions 3 - 1 Eagles");
printLine();
console.log("Round 2: Eagles 2 - 2 Sharks");
printLine();
```

Output:

```text
------------------------------
   SIPHO'S FIVE-A-SIDE LEAGUE
------------------------------
Round 1: Lions 3 - 1 Eagles
------------------------------
Round 2: Eagles 2 - 2 Sharks
------------------------------
```

`printTitle` uses `printLine` twice. The detours nest: the program jumps into `printTitle`, which jumps into `printLine`, which comes back to `printTitle`, which later comes back to the main program. Small functions built from even smaller functions is how all big programs are made.

::: quiz
How many lines of dashes (`-----`) does this program print?

```js
function dash() {
  console.log("-----");
}

function box() {
  dash();
  console.log("| R50 |");
  dash();
}

box();
dash();
box();
```

- [ ] 3
- [x] 5
- [ ] 4
- [ ] 6

Each `box()` call makes two detours into `dash`, so the two `box()` calls give 4 dash lines. The `dash()` call in the middle adds 1 more: 5 in total. If you picked 3, you counted each call at the bottom as one line, and forgot that `box` calls `dash` twice on the inside.
:::

## Loops inside functions, and functions inside loops

A function can contain a loop:

```js
function countdown() {
  for (let i = 5; i >= 1; i--) {
    console.log(i);
  }
  console.log("Lift off!");
}

countdown();
```

Output:

```text
5
4
3
2
1
Lift off!
```

And a loop can call a function:

```js
function cheer() {
  console.log("Hip hip... HOORAY!");
}

for (let i = 1; i <= 3; i++) {
  cheer();
}
```

Output:

```text
Hip hip... HOORAY!
Hip hip... HOORAY!
Hip hip... HOORAY!
```

::: quiz
How many lines does this program print in total?

```js
function stars() {
  for (let i = 0; i < 3; i++) {
    console.log("*");
  }
}

for (let round = 1; round <= 2; round++) {
  stars();
  console.log("round done");
}
```

- [x] 8
- [ ] 5
- [ ] 6
- [ ] 10

The outer loop runs twice (`round` is 1, then 2). Each time, `stars()` prints 3 stars (`i` is 0, 1, 2) and then `round done` prints once: 4 lines per round, so 8 lines. If you picked 5, you ran `stars` only once. If you picked 10, you gave `stars` 4 stars: `i < 3` stops when `i` reaches 3.
:::

## Functions that ask questions

A function can use `prompt` too. That makes it a small, reusable tool:

```js
const prompt = require("prompt-sync")();

function askAndGreet() {
  const name = prompt("What is your name? ");
  console.log(`Sawubona, ${name}! Welcome to the team.`);
}

askAndGreet();
askAndGreet();
```

A sample session in the terminal (you type the names):

```text
What is your name? Lerato
Sawubona, Lerato! Welcome to the team.
What is your name? Pieter
Sawubona, Pieter! Welcome to the team.
```

Notice that the variable `name` is created **inside** the function. Each call makes a fresh one. You will find out exactly why that matters in [Scope](#/phase-04-functions/04-scope). For now, a good habit: variables that a function needs for its own work are made inside it.

::: try A reusable greeter
1. Create `phase-4/greeter.js` and type in the `askAndGreet` program above. The `prompt-sync` package is already installed in `coding-practice` from Phase 1, so the `require` line works here.
2. Run it with `node phase-4/greeter.js` and answer both questions.
3. **Change it, predict, run.** Put the call inside a `for` loop that runs 3 times, instead of writing it twice. How many questions will you be asked? Run it and see.
:::

::: predict What does this print?
```js
function a() {
  console.log("A");
  b();
  console.log("C");
}

function b() {
  console.log("B");
}

console.log("Start");
a();
b();
console.log("End");
```
Write down all the lines, in order, before you open the solution.
:::

::: solution
```text
Start
A
B
C
B
End
```
`Start` prints first. Then `a()` jumps into `a`, which prints `A`, then calls `b`, which prints `B` and comes back into `a`, which prints `C`. Then `a` is finished, so we come back to the main program, which calls `b` again (another `B`), and finally prints `End`.

If you wrote `A B C` at the very top, before `Start`: remember that declaring `a` and `b` runs nothing. Only calls run code.
:::

## Naming functions

A function **does** something, so name it with a **verb** (a doing word), followed by what it acts on. Use camelCase, as with variables.

| Good names | Why they are good |
|---|---|
| `printReceipt` | You know it prints, and what it prints. |
| `showMenu` | You know it shows something to the user. |
| `askForName` | You know it asks a question. |
| `rollDice` | Short, clear and a verb. |

| Poor names | The problem |
|---|---|
| `stuff`, `doIt`, `thing` | Tells you nothing. |
| `receipt` | A noun. Does it print one? Make one? Delete one? |
| `f1`, `f2` | You will forget which is which by tomorrow. |
| `printReceiptAndAlsoShowMenuAndAskName` | If the name needs "and", the function is doing too much. Make two or three functions. |

A good test: read the call out loud. `showMenu();` sounds like an instruction. `stuff();` does not.

## You have been using functions all along

Look back at code you have already written:

```js
console.log("Hello");
Math.round(4.7);
Number("25");
prompt("Your name? ");
```

Every one of those is a **function call**. A name, followed by round brackets. Someone else wrote those recipe cards (the people who made JavaScript, Node and the `prompt-sync` package), and you have been cooking from them since Phase 0.

Two things about them are different from the functions you wrote today:

1. You put values **inside** the brackets: `Math.round(4.7)`. That value is the function's input. You learn to do this in [the next lesson](#/phase-04-functions/02-parameters-and-arguments).
2. Some of them **hand back an answer**: `Math.round(4.7)` gives you `5`, which you can store in a variable. You learn to do that in [Return values](#/phase-04-functions/03-return-values).

By the end of this phase, the functions you write will do both.

::: exercise Level 1 — Guided · A banner for Market Day
Greenfield High School is having a Market Day. Create `phase-4/banner.js`.

1. Declare a function called `printBanner`.
2. Inside it, print these four lines:
   ```text
   *******************************
   *   GREENFIELD HIGH SCHOOL    *
   *       Market Day 2026       *
   *******************************
   ```
3. Below the function, call it once.
4. Then print `Stall 1: Boerewors rolls - R25` and `Stall 2: Face painting  - R10`.
5. Call `printBanner` once more, so the banner appears at the top and bottom.
6. Run it with `node phase-4/banner.js`. You should see the banner twice, with the two stalls in between.
:::

::: solution
```js
function printBanner() {
  console.log("*******************************");
  console.log("*   GREENFIELD HIGH SCHOOL    *");
  console.log("*       Market Day 2026       *");
  console.log("*******************************");
}

printBanner();
console.log("Stall 1: Boerewors rolls - R25");
console.log("Stall 2: Face painting  - R10");
printBanner();
```
Output:
```text
*******************************
*   GREENFIELD HIGH SCHOOL    *
*       Market Day 2026       *
*******************************
Stall 1: Boerewors rolls - R25
Stall 2: Face painting  - R10
*******************************
*   GREENFIELD HIGH SCHOOL    *
*       Market Day 2026       *
*******************************
```
:::

::: exercise Level 2 — On your own · The spaza shop menu
Auntie Grace wants a menu program for her spaza shop. Create `phase-4/spaza.js`.

- Write a function `showMenu` that prints a blank line, a title `=== Auntie Grace's Spaza ===`, and the options `1) Bread R18`, `2) Milk R22`, `3) Airtime R10` and `q) Quit`.
- Use the **menu loop** from Phase 3: keep calling `showMenu()`, asking for a choice, and replying (for example `One bread coming up.`) until the user types `q`.
- Anything else should get `Sorry, I don't know that one.`

Notice how much easier the loop is to read when the menu is tucked away in a function.
:::

::: hint
Start with `let choice = "";` and `while (choice !== "q") { ... }`. Inside the loop: call `showMenu()`, then `choice = prompt("Your choice: ").trim();`, then a `switch` (or `if`/`else if`) on `choice`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

function showMenu() {
  console.log("");
  console.log("=== Auntie Grace's Spaza ===");
  console.log("1) Bread      R18");
  console.log("2) Milk       R22");
  console.log("3) Airtime    R10");
  console.log("q) Quit");
}

let choice = "";
while (choice !== "q") {
  showMenu();
  choice = prompt("Your choice: ").trim();
  switch (choice) {
    case "1":
      console.log("One bread coming up.");
      break;
    case "2":
      console.log("One milk coming up.");
      break;
    case "3":
      console.log("R10 airtime coming up.");
      break;
    case "q":
      console.log("Thank you, come again!");
      break;
    default:
      console.log("Sorry, I don't know that one.");
  }
}
```
A sample session:
```text

=== Auntie Grace's Spaza ===
1) Bread      R18
2) Milk       R22
3) Airtime    R10
q) Quit
Your choice: 2
One milk coming up.

=== Auntie Grace's Spaza ===
1) Bread      R18
2) Milk       R22
3) Airtime    R10
q) Quit
Your choice: x
Sorry, I don't know that one.

=== Auntie Grace's Spaza ===
1) Bread      R18
2) Milk       R22
3) Airtime    R10
q) Quit
Your choice: q
Thank you, come again!
```
:::

::: exercise Level 2 — On your own · A temperature tool
A weather app shows temperatures in Celsius, but your cousin in America thinks in Fahrenheit. Create `phase-4/temperature.js`.

- Write a function `convertTemperature` that asks for a temperature in °C, converts it to °F with `fahrenheit = celsius * 9 / 5 + 32`, and prints something like `25°C is 77°F`.
- Call it twice, so you can convert two temperatures in one run.
- Try `25` and `-5`. You should get `77` and `23`.
:::

::: hint
Remember that `prompt` always gives you a string. Wrap it in `Number(...)` before you do maths with it.
:::

::: solution
```js
const prompt = require("prompt-sync")();

function convertTemperature() {
  const celsius = Number(prompt("Temperature in °C: "));
  const fahrenheit = celsius * 9 / 5 + 32;
  console.log(`${celsius}°C is ${fahrenheit}°F`);
}

convertTemperature();
convertTemperature();
```
A sample session:
```text
Temperature in °C: 25
25°C is 77°F
Temperature in °C: -5
-5°C is 23°F
```
:::

::: exercise Level 2 — On your own · Board game dice
Ayanda and Kyle are playing a board game but lost the dice. Create `phase-4/dice.js`.

- Write a function `rollDice` that picks a random whole number from 1 to 6 and prints `You rolled a 4` (or whatever it rolled).
- Print `Ayanda's turn:`, call `rollDice()`, then print `Kyle's turn:` and call it again.
- Run it several times. The numbers should change each time.
:::

::: hint
You met the dice roll in the numbers lesson: `Math.floor(Math.random() * 6) + 1`.
:::

::: solution
```js
function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(`You rolled a ${roll}`);
}

console.log("Ayanda's turn:");
rollDice();
console.log("Kyle's turn:");
rollDice();
```
One run printed this (yours will have different numbers, because they are random):
```text
Ayanda's turn:
You rolled a 2
Kyle's turn:
You rolled a 6
```
:::

::: debug Three broken programs
Each program has one problem. Run it, read what Node says (or notice what it does *not* say), and fix it.

```js
// Program A: prints nothing at all
function printReceiptFooter() {
  console.log("Thank you for shopping with us!");
  console.log("Please keep your slip.");
}

printReceiptFooter;
```

```js
// Program B
function printWeather() {
  console.log("Cape Town: 18°C, windy");
}

printWeather();
printWheather();
```

```js
// Program C
function showRules() {
  console.log("Rule 1: No running near the pool");
  console.log("Rule 2: Shower before swimming");
}

showRules()
console.log("Enjoy your swim!");
}
```
:::

::: solution
**A:** There is no error, but nothing prints. `printReceiptFooter;` mentions the function's name without the brackets, so it is never called. It is like pointing at the recipe card without cooking. Change it to `printReceiptFooter();`.

**B:** The first line prints, then Node stops with `ReferenceError: printWheather is not defined`, and it points a `^` at line 6. The name is misspelt (an extra `h`). A function name must be spelt exactly the same, capitals included, everywhere you use it. Change it to `printWeather();`.

**C:** `SyntaxError: Unexpected token '}'`, pointing at the last line. There is a stray closing brace at the end that does not belong to anything. Delete it. (The missing semicolon after `showRules()` is not the problem. JavaScript usually copes without it, but adding it is a good habit.)
:::

::: mistake
**Forgetting the brackets when calling.** `showMenu;` does nothing. `showMenu();` runs the function. The brackets mean "do it now".

**Expecting the declaration to run.** Writing `function showMenu() { ... }` only saves the recipe. Nothing happens until you call it.

**Spelling the name differently.** `showMenu` and `showmenu` are two different names. Copy the exact spelling.

**Missing or extra curly braces.** Every `{` needs a matching `}`. Indenting the body neatly makes a missing brace much easier to spot. `SyntaxError: Unexpected end of input` usually means a `}` is missing at the end.

**Writing the function but still copying the lines.** Once the steps are in a function, delete the copies and call the function instead.
:::

## Real-world uses

Every app you use is built from thousands of small, named functions:

- A banking app has functions like `showBalance`, `sendMoney` and `logOut`. The "log out" button calls the same `logOut` function from every screen.
- A game has `startLevel`, `playSound` and `showGameOver`. When you lose, `showGameOver` runs, whether you fell in a hole or ran out of time.
- A shop's till has `printReceipt`, `openCashDrawer` and `printHeader`, exactly like Mama Thandi's.

The big win is always the same: write it once, give it a clear name, use it everywhere, and fix it in one place.

::: connect
**This builds on:** everything so far. A function body is ordinary code: variables, decisions, loops and `prompt` all work inside it. The menu loop from [break, continue, nested loops and menus](#/phase-03-loops/05-break-continue-nested) became much tidier with a `showMenu` function.

**This unlocks:** the rest of this phase. Right now every call to `printHeader` prints the *same* header. In [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments) you will pass values *into* a function so it can do something slightly different each time, like `greet("Lerato")`.
:::

::: challenge Squares of hashes
Create `phase-4/squares.js`. Write:

1. A function `printRow` that **builds a string** of 10 `#` characters with a loop (the "build a string" pattern from Phase 3), then prints it once.
2. A function `printSquare` that calls `printRow` 5 times, using a loop.
3. Below them, call `printSquare()`, print an empty line, and call `printSquare()` again.

You should see two blocks of hashes, each 5 rows tall and 10 wide. Then ask yourself: if you wanted the rows to be 20 wide, how many places would you need to change?
:::

::: solution
```js
function printRow() {
  let row = "";
  for (let i = 1; i <= 10; i++) {
    row += "#";
  }
  console.log(row);
}

function printSquare() {
  for (let i = 1; i <= 5; i++) {
    printRow();
  }
}

printSquare();
console.log("");
printSquare();
```
Output:
```text
##########
##########
##########
##########
##########

##########
##########
##########
##########
##########
```
To make the rows 20 wide, you change **one** number, inside `printRow`. Both squares change. That is the whole point of functions. (And if you are thinking "but what if I want one square 10 wide and another 20 wide?", you are asking exactly the right question. The next lesson answers it.)
:::

::: recap
- A **function** is a named group of steps. Write the steps once, then run them whenever you like by using the name.
- **Declaring** a function (`function name() { ... }`) saves the recipe. It does not run anything.
- **Calling** a function (`name();`) runs it. The brackets mean "do it now".
- When a function is called, the program pauses, jumps into the function, runs its body, then comes back and carries on.
- Functions can contain any code you know, including loops, `prompt` and calls to other functions.
- Name functions with a verb and what they act on: `printReceipt`, `showMenu`, `askForName`.
- **DRY** (Don't Repeat Yourself): when you catch yourself copying lines, make a function, and fix bugs in one place.
- `console.log`, `Math.round`, `Number` and `prompt` are all functions that other people wrote.
:::

::: interview What is the difference between declaring a function and calling it?
Declaring it (`function showMenu() { ... }`) writes down the steps and gives them a name, but runs nothing, like writing a recipe card. Calling it (`showMenu();`) actually runs those steps, like cooking from the card. You declare once and can call as many times as you want.
:::

::: interview Give two reasons to put repeated code into a function.
If the steps need to change, you fix them in one place instead of hunting for every copy (and missing one). And the code becomes easier to read, because a name like `printHeader()` explains what five lines do in one word.
:::

::: interview After a function finishes, where does the program continue?
It goes back to the exact place the function was called from, and carries on with the next line after the call.
:::

::: checkpoint
- [ ] I created `phase-4/receipts.js`, changed the phone number in one place, and saw all three slips change
- [ ] I ran `routine.js` and predicted the output after adding and removing calls
- [ ] I built the spaza shop menu with a `showMenu` function inside a menu loop
- [ ] I finished at least one more Level 2 exercise (temperature or dice)
- [ ] I fixed all three debug programs, including the one with no error message
- [ ] I can explain, out loud, what happens step by step when a function is called
:::

::: resources
- **javascript.info, "Functions":** https://javascript.info/function-basics. The first half covers exactly what you did today. The rest is coming in the next lessons.
- **MDN, "Functions — reusable blocks of code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions. A beginner-friendly overview from the people who document the web.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the "predict" program and click through it. You will see the program jump into each function and come back.
:::
