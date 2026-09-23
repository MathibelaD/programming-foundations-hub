---
title: Debugging — finding and fixing bugs calmly
summary: A calm method for hunting bugs, smarter console.log, and the VS Code debugger, step by step.
minutes: 60
stage: Phase 8
---

## What you will learn

- What a **bug** really is, and a calm, scientific way of finding one
- How to use `console.log` strategically, and `console.table` for lists of objects
- How to use the **VS Code debugger**: breakpoints, stepping through code line by line, and watching variables
- How to read a **stack trace**, and why explaining your code to a rubber duck works

**Before this:** [How to solve problems you have never seen before](#/phase-08-becoming-a-programmer/01-solving-problems). You have been fixing errors since [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong). This lesson gives you better tools for the harder cases.

## The problem: the program runs, but the answer is wrong

Some bugs are loud. Node stops, prints a red error, and tells you the line number. Those are the friendly ones.

The difficult bugs are **quiet**. The program runs to the end with no error at all, and prints the wrong thing. Here is one:

```js
const marks = [72, 85, 64, 90];

function average(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    total = total + numbers[i];
  }
  return total / numbers.length;
}

console.log("Average mark:", average(marks));
```

Output:

```text
Average mark: NaN
```

No error. No line number. The answer should be `77.75`, and instead it is `NaN`. Where do you even start?

Most beginners start by **guessing**: change something, run it, change something else, run it again. Sometimes that works. Often it makes things worse, because now there are two changes and you do not know which one did what.

This lesson replaces guessing with a method.

::: analogy A doctor, not a gambler
When you feel ill, a good doctor does not hand you random pills until one works. They **observe** (where does it hurt, since when?), make a **guess** about the cause, **test** that guess (a blood test, an X-ray), and use the result to narrow things down.

Debugging is exactly this. The symptom is the wrong output. Your job is to find the cause by collecting evidence, not by trying random fixes.
:::

## What a bug actually is

A **bug** is the difference between what you **expected** the program to do and what it **actually** did.

That definition sounds obvious, but it has a useful consequence: **you cannot find a bug until you know exactly what you expected**. "It's broken" is not enough. "I expected `77.75` and got `NaN`" is something you can work with.

**Debugging** is the process of finding and removing a bug.

::: note Why "bug"?
In 1947, engineers working on the Harvard Mark II computer found a real moth stuck in one of its parts and taped it into their logbook as the "first actual case of bug being found". The word was already in use for faults in machines, but the moth made it famous.
:::

## The method: observe, guess, test, repeat

1. **Observe.** What exactly happened? Write down the expected output and the actual output. Can you make it happen every time?
2. **Guess.** Form a specific idea: "I think `total` goes wrong inside the loop."
3. **Test.** Collect evidence that proves or disproves the guess. Usually: look at the values of variables at that point in the program.
4. **Repeat.** If the guess was wrong, you have still learned something: the bug is somewhere else. Make a new guess.

Let us apply it to the `NaN` average.

- **Observe:** expected `77.75`, got `NaN`.
- **Guess:** `NaN` appears when you do maths with something that is not a number. Maybe one of the things being added to `total` is not a number.
- **Test:** print what is being added, each time around the loop.

## Strategic `console.log`

You have used `console.log` since the very first lesson. Used carefully, it is still one of the best debugging tools there is. The trick is to log **with labels**, and to log the **values going in** as well as the result.

```js
const marks = [72, 85, 64, 90];

function average(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    console.log("i:", i, "item:", numbers[i], "total before:", total);
    total = total + numbers[i];
  }
  return total / numbers.length;
}

console.log("Average mark:", average(marks));
```

Output:

```text
i: 0 item: 72 total before: 0
i: 1 item: 85 total before: 72
i: 2 item: 64 total before: 157
i: 3 item: 90 total before: 221
i: 4 item: undefined total before: 311
Average mark: NaN
```

There it is. There are four marks, at indexes 0 to 3, but the loop ran a **fifth** time with `i` equal to `4`. `numbers[4]` is `undefined`, and `311 + undefined` is `NaN`.

The cause is `i <= numbers.length`. It should be `i < numbers.length`. This is called an **off-by-one error**: a loop that runs one time too many or one time too few. It is one of the most common bugs in all of programming. You met the reason in [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays).

Fix it, remove the debugging log, and run again:

```text
Average mark: 77.75
```

**Rules for useful logs:**

- **Always label them.** `console.log(total)` in three places gives you three mystery numbers. `console.log("total after loop:", total)` tells you where it came from.
- **Log before and after** the line you suspect. If the value is right before and wrong after, you have found the line.
- **Log the inputs**, not only the result. Most wrong answers come from wrong inputs.
- **Remove them afterwards.** Leftover debug logs make your real output confusing.

### `console.table` for lists of objects

When you are looking at an array of objects, `console.log` can get cramped. `console.table` draws it as a table:

```js
const expenses = [
  { description: "Taxi", amount: 28, category: "transport" },
  { description: "Bread", amount: 21.5, category: "food" },
  { description: "Airtime", amount: 50, category: "phone" },
];
console.table(expenses);
```

Output:

```text
┌─────────┬─────────────┬────────┬─────────────┐
│ (index) │ description │ amount │ category    │
├─────────┼─────────────┼────────┼─────────────┤
│ 0       │ 'Taxi'      │ 28     │ 'transport' │
│ 1       │ 'Bread'     │ 21.5   │ 'food'      │
│ 2       │ 'Airtime'   │ 50     │ 'phone'     │
└─────────┴─────────────┴────────┴─────────────┘
```

(Older versions of Node centre the values in each column. The information is the same.) This is perfect for checking your Budget Buddy data at a glance.

::: try Log your way to the bug
1. In `coding-practice/phase-8/`, create `average.js` and type in the **buggy** version from the top of this lesson (with `<=`).
2. Run it from inside `coding-practice`:
   ```bash
   node phase-8/average.js
   ```
   You should see `Average mark: NaN`.
3. Add the labelled `console.log` line inside the loop and run it again. Find the line with `undefined` in it.
4. Fix `<=` to `<`, delete the debug log, and run it. You should see `Average mark: 77.75`.
5. **Predict, then run:** put the bug back, but this time change the array to an **empty** array `[]`. What will it print? (Hint: what is `0 / 0`?) Then fix the bug and try the empty array again. Is `NaN` a sensible answer for "the average of no marks"? What would you rather show?
6. Create `phase-8/table.js` with the `console.table` example and run it.
:::

## The VS Code debugger

`console.log` means editing your code, running it, reading the output, and editing again. A **debugger** is a tool that lets you **pause** a running program at any line, look at every variable, and then move forward **one line at a time**. It is like watching a football replay in slow motion, with the ability to pause on any frame and check where every player is.

VS Code has a debugger for Node built in. There is nothing to install.

Two new terms:

- A **breakpoint** is a marker you put on a line that says "pause here when you get to this line". The program runs normally until it reaches that line, then freezes *before* running it.
- **Stepping** means running the program one line at a time after it has paused.

### Setting a breakpoint

1. In VS Code, open your `coding-practice` folder (**File → Open Folder…**), then open `phase-8/average.js`. Put the `<=` bug back so that there is something to find.
2. Look at the line numbers down the left side of the editor. The narrow strip immediately to the left of the numbers is called the **gutter**.
3. Move your mouse over the gutter next to the line `total = total + numbers[i];`. A faint red dot appears.
4. **Click** it. The dot turns solid red. That is your breakpoint. (Click it again to remove it.)

### Starting the debugger

5. Make sure `average.js` is the file showing in the editor. The debugger starts whichever file is open.
6. Open the **Run and Debug** view. Either click its icon in the **Activity Bar** (the column of icons on the far left; it looks like a play triangle with a small bug on it), or press **Ctrl+Shift+D** (Windows and Linux) or **Cmd+Shift+D** (macOS).
7. Click the blue **Run and Debug** button.
8. If VS Code shows a list asking you to **select a debugger**, choose **Node.js**.

The program starts and then **stops** at your breakpoint. You will see:

- The breakpoint line **highlighted in yellow**. That line has *not* run yet.
- A small **debug toolbar** floating at the top of the window.
- On the left, the **Variables** panel. Under **Local** you can see `i: 0`, `total: 0` and `numbers` (click the little arrow to open it and see all four marks).
- At the bottom, the **Debug Console**, where any `console.log` output appears.

### The debug toolbar

| Button | Shortcut | What it does |
|---|---|---|
| **Continue** (play triangle) | F5 | Run until the next breakpoint (or the end). |
| **Step Over** (curved arrow over a dot) | F10 | Run this line, then pause on the next one. If the line calls a function, run the whole function without going inside. |
| **Step Into** (arrow pointing down to a dot) | F11 | If this line calls one of your functions, go inside it and pause on its first line. |
| **Step Out** (arrow pointing up from a dot) | Shift+F11 | Finish the current function and pause back where it was called from. |
| **Restart** (circular arrow) | Ctrl+Shift+F5 / Cmd+Shift+F5 | Start again from the beginning. |
| **Stop** (red square) | Shift+F5 | Stop debugging. |

(On some laptops, the F keys need the **Fn** key held down too.)

### Watching the bug happen

9. Press **Continue** (F5). The program runs around the loop once and pauses on the same line again. Look at the Variables panel: `i` is now `1` and `total` is `72`.
10. Now add a **watch**. In the Run and Debug view there is a **Watch** section under Variables. Hover over its title and click the **+** button, type `numbers[i]` and press Enter. The Watch panel now shows the value of that expression, updated every time the program pauses. You can watch any expression, such as `total + numbers[i]` or `numbers.length`.
11. Keep pressing **Continue**. Watch `i` climb: 2, 3, then **4**. At that moment the Watch panel shows `numbers[i]: undefined`. You have caught the off-by-one error in the act, without writing a single `console.log`.
12. Press **Step Over** (F10) once. `total` becomes `NaN` in the Variables panel.
13. Click **Stop** (the red square). Fix the bug.

::: note Hovering and the Debug Console
While the program is paused, you can also **hover your mouse over any variable** in the editor to see its value. And in the **Debug Console** at the bottom, you can type any expression, such as `numbers.length` or `total / 4`, and press Enter to see its value right now. It is like the Node REPL, but inside your paused program.
:::

::: try Step through with Step Into
1. Create `phase-8/trace.js` and type this in:
   ```js
   const expenses = [
     { description: "Taxi", amount: 28 },
     { description: "Bread", amount: 21.5 },
   ];

   function describe(expense) {
     return `${expense.description}: R${expense.amount}`;
   }

   function printExpense(list, number) {
     const expense = list[number];
     console.log(describe(expense));
   }

   printExpense(expenses, 1);
   printExpense(expenses, 2);
   ```
2. Set a breakpoint on the line `printExpense(expenses, 1);`.
3. Start the debugger (Run and Debug → Run and Debug → Node.js if asked).
4. When it pauses, press **Step Into** (F11). You jump inside `printExpense`. In the Variables panel, `list` and `number` now have values. Notice that `expense` shows `undefined`: that line has not run yet.
5. Press **Step Over** (F10). Now `expense` holds the Bread object.
6. Press **Step Into** again. You are now inside `describe`.
7. Press **Step Out** (Shift+F11) to finish `describe` and go back to `printExpense`. Then press **Continue**.
8. The program crashes on the second call. Before you read the next section, **predict**: what is `list[2]` when the list only has two items?
:::

### Debugging programs that ask questions (prompt-sync)

There is one catch. When you start a program with the **Run and Debug** button, its output goes to the **Debug Console**, and the Debug Console cannot take typed answers. A program that uses `prompt()` will not work properly there.

The fix is a special terminal that VS Code connects to its debugger, called the **JavaScript Debug Terminal**. Any `node` command you run in it is debugged automatically: breakpoints pause the program, *and* you can still type your answers.

1. Set your breakpoints as usual by clicking the gutter.
2. Open the JavaScript Debug Terminal in either of these ways:
   - In the **terminal panel**, click the small **down arrow (⌄)** next to the **+** button and choose **JavaScript Debug Terminal**.
   - Or open the **Command Palette** with **Ctrl+Shift+P** (Windows and Linux) or **Cmd+Shift+P** (macOS), type `Debug: JavaScript Debug Terminal`, and press Enter.
3. A new terminal opens. Make sure you are inside the right folder (use `cd` as usual), then run your program the normal way:
   ```bash
   node phase-8/your-program.js
   ```
4. Answer the questions in that terminal. When the program reaches a breakpoint, it pauses, and the Variables panel, Watch and the debug toolbar all work exactly as before.

Use this for Budget Buddy: open a JavaScript Debug Terminal inside your `budget-buddy` folder and run `node index.js`.

## Reading a stack trace

Back to the crash from `trace.js`. Here is what Node prints (your file path will be different, and a few lines about Node's own internal code have been left off the end):

```text
/Users/you/coding-practice/phase-8/trace.js:7
  return `${expense.description}: R${expense.amount}`;
                    ^

TypeError: Cannot read properties of undefined (reading 'description')
    at describe (/Users/you/coding-practice/phase-8/trace.js:7:21)
    at printExpense (/Users/you/coding-practice/phase-8/trace.js:12:15)
    at Object.<anonymous> (/Users/you/coding-practice/phase-8/trace.js:16:1)
    at Module._compile (node:internal/modules/cjs/loader:1572:14)
```

The lines starting with `at` are the **stack trace**: the list of function calls that were in progress when the crash happened. Read it **top to bottom as "where it broke, then who called that"**:

1. `at describe (…trace.js:7:21)`: it crashed inside `describe`, on line 7, character 21.
2. `at printExpense (…trace.js:12:15)`: `describe` was called by `printExpense`, on line 12.
3. `at Object.<anonymous> (…trace.js:16:1)`: `printExpense` was called from the main part of the file (not inside any function), on line 16.
4. Lines mentioning `node:internal` are Node's own code. You can ignore them.

The error message says `expense` was `undefined` when `describe` tried to read `.description`. The crash is in `describe`, but the **cause** is further down the stack: line 16 asked for item number `2`, which does not exist. This is very common: **the line that crashes is often not the line that is wrong**. The stack trace shows you the path to follow back to the cause.

(The word **stack** comes from the way function calls pile up like a stack of plates: each call goes on top, and when a function finishes it comes off the top.)

## Rubber duck debugging

This sounds like a joke, and it works. Put a rubber duck (or a mug, or a patient friend) next to your computer. When you are stuck, **explain your code to it, line by line, out loud**: what each line does, and what each variable should hold at that moment.

Very often, halfway through a sentence like "and then this loop goes up to and including the length, which is…", you hear the bug yourself. Explaining forces you to stop skimming and actually read what you wrote, rather than what you *meant* to write.

## Seeing code run: Python Tutor

For short programs, [Python Tutor](https://pythontutor.com/javascript.html) (which also runs JavaScript) draws every variable, array and object as boxes and arrows as your code runs, one step at a time. It is excellent for bugs involving references, where two variables point to the same array. Paste in a small program, click **Visualize Execution**, and use the **Next** button to step through.

## Bug hunts

Each program below has one realistic bug. For each one: **observe** (run it and note expected vs actual), **guess**, **test** (with a labelled log or the debugger), then fix it. Create each one in `phase-8/`.

::: debug Bug hunt 1 · Game over?
Create `phase-8/lives.js`:
```js
let lives = 3;
lives = lives - 1;

if (lives = 0) {
  console.log("Game over!");
} else {
  console.log(`Keep going, you have ${lives} lives left.`);
}
```
Output:
```text
Keep going, you have 0 lives left.
```
The player should have 2 lives left. What went wrong? Set a breakpoint on the `if` line and step over it, watching `lives` in the Variables panel.
:::

::: solution
`if (lives = 0)` uses a **single** `=`, which is **assignment**: it *puts* `0` into `lives`. The value of an assignment is the value assigned, `0`, which is falsy, so the `else` branch runs, now printing the changed `lives`. In the debugger you can watch `lives` change from `2` to `0` on the `if` line, which should never happen on a line that only *checks* something.

Fix: `if (lives === 0)`. Output: `Keep going, you have 2 lives left.` Remember from [Comparing values](#/phase-02-making-decisions/01-comparing-values): `=` stores, `===` asks.
:::

::: debug Bug hunt 2 · Airtime adds up strangely
Create `phase-8/airtime.js`:
```js
const line = "120,45,80";
const amounts = line.split(",");

let total = 0;
for (const amount of amounts) {
  total = total + amount;
}

console.log("Total airtime spent: R" + total);
```
Output:
```text
Total airtime spent: R01204580
```
Expected `R245`. Add a labelled log inside the loop that prints `amount` and `typeof amount`.
:::

::: solution
`split` always gives you an array of **strings**: `["120", "45", "80"]`. `0 + "120"` is the string `"0120"`, not the number `120`, because `+` with a string joins text. Each loop joins on another piece. Logging `typeof amount` shows `string` every time.

Fix: convert each piece with `Number`:

```js
total = total + Number(amount);
```
Output:
```text
Total airtime spent: R245
```
This is the `"5" + 5` surprise from [Converting between types](#/phase-01-storing-information/07-converting-between-types). Anything that comes from typing, `prompt`, `split` or a file is text until you convert it.
:::

::: debug Bug hunt 3 · The VAT that vanished
Create `phase-8/vat.js`:
```js
function addVat(price) {
  price * 1.15;
}

const shoes = 600;
const withVat = addVat(shoes);
console.log(`Shoes with VAT: R${withVat}`);
```
Output:
```text
Shoes with VAT: Rundefined
```
Set a breakpoint on the `const withVat` line, Step Into `addVat`, and step through it. What does the function hand back?
:::

::: solution
The function calculates `price * 1.15` and then throws the answer away, because there is no `return`. A function without `return` gives back `undefined`. Stepping through shows the calculation line running, then the function ending, and `withVat` being `undefined`.

Fix:
```js
function addVat(price) {
  return price * 1.15;
}
```
Output: `Shoes with VAT: R690`. This is the `console.log` vs `return` idea from [Return values](#/phase-04-functions/03-return-values).
:::

::: debug Bug hunt 4 · Who arrived first?
Create `phase-8/arrivals.js`. A teacher records learners in the order they arrive, and also wants an alphabetical list for the register:
```js
const arrivalOrder = ["Thabo", "Aisha", "Pieter", "Mei"];
const alphabetical = arrivalOrder.sort();

console.log("Alphabetical:", alphabetical);
console.log("Who arrived first?", arrivalOrder[0]);
```
Output:
```text
Alphabetical: [ 'Aisha', 'Mei', 'Pieter', 'Thabo' ]
Who arrived first? Aisha
```
Thabo arrived first, not Aisha. Why did the original list change?
:::

::: solution
`sort` **changes the array it is called on**, and then returns that same array. So `alphabetical` and `arrivalOrder` are two names for **one** array, which is now sorted. You can prove it with `console.log(alphabetical === arrivalOrder)`, which prints `true`. Python Tutor shows it beautifully: two arrows pointing at one array.

Fix: copy first, then sort the copy.
```js
const alphabetical = [...arrivalOrder].sort();
```
Now `Who arrived first? Thabo`. See [Copies and references](#/phase-06-objects/04-values-and-references) and [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining).
:::

::: debug Bug hunt 5 · A list of nothing
Create `phase-8/prices.js`:
```js
const prices = [100, 250, 40];
const withVat = prices.map((price) => {
  Math.round(price * 1.15);
});
console.log(withVat);
```
Output:
```text
[ undefined, undefined, undefined ]
```
The right length, but every item is `undefined`. What is the arrow function returning?
:::

::: solution
With **curly braces**, an arrow function is a normal function body, and it needs a `return` like any other. Without `return`, each call gives back `undefined`, so `map` builds an array of three `undefined`s.

Either add `return`:
```js
const withVat = prices.map((price) => {
  return Math.round(price * 1.15);
});
```
or remove the braces, which makes the return automatic:
```js
const withVat = prices.map((price) => Math.round(price * 1.15));
```
Output:
```text
[ 115, 288, 46 ]
```
This is the braces trap from [Arrow functions](#/phase-04-functions/05-arrow-functions) and [map](#/phase-07-functions-as-values/03-map).
:::

::: mistake
**Changing several things at once.** If you change three lines and it starts working, you do not know which change fixed it, or whether the other two broke something else. Change one thing, then run.

**Unlabelled logs.** `console.log(x)` five times gives you five mystery values. Label every log.

**Assuming instead of checking.** "That variable is definitely a number" is a guess. `console.log(typeof x)` is evidence.

**Fixing the line that crashed instead of the cause.** The stack trace's top line is where it broke. The mistake is often further down the stack, in the code that passed in the bad value.

**Using Run and Debug for a prompt-sync program.** The Debug Console cannot take typed input. Use the JavaScript Debug Terminal instead.

**Forgetting to remove debug logs.** Search your file for `console.log(` before you call a job finished.
:::

## Real-world uses

- Professional developers spend a large part of their working day debugging. Being calm and methodical about it is one of the most valued skills in the job.
- The breakpoint, step and watch tools you used here exist, with almost the same buttons, in the debuggers for Python, C#, Java and browsers. Learn them once, use them everywhere.
- Stack traces appear in error reports from real apps. When an app crashes, developers get a stack trace like the one above and read it exactly the way you did.
- Many teams write a small program that reproduces a bug *before* fixing it, which is the "observe" step made permanent.

::: connect
**This builds on:** errors from [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong), and every classic bug from the course: off-by-one from Phase 5, `=` vs `===` from Phase 2, string and number mix-ups from Phase 1, missing `return` from Phase 4, references from Phase 6 and the arrow braces trap from Phase 7.

**This unlocks:** confidence when things go wrong. Next, [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files) makes big programs easier to navigate, which also makes bugs easier to find.
:::

::: challenge Debug a quiet bug in Budget Buddy
Open your Budget Buddy project. Pick a function that does a calculation (for example `totalSpent` or `categoryTotals`). Set a breakpoint inside it, open a **JavaScript Debug Terminal** in your `budget-buddy` folder, run `node index.js`, and choose the menu option that uses the function.

While it is paused: find the `expenses` array in the Variables panel and open it, add a watch for `expenses.length`, and step through at least three iterations. Then write down, in one sentence, what the function does, based only on what you watched.
:::

::: solution
There is no single right answer. You have succeeded if the program paused at your breakpoint **while still letting you type menu choices**, you could open the `expenses` array in the Variables panel, and your Watch showed the number of expenses. If it did not pause, check that you started it from a **JavaScript Debug Terminal** (not a normal terminal), and that the breakpoint is on a line that actually runs for the option you chose.
:::

::: recap
- A **bug** is the gap between what you expected and what happened. Write both down before you start.
- Debug like a scientist: **observe, guess, test, repeat**. Never change several things at once.
- Use **labelled** `console.log`s before and after the suspect line, and `console.table` for arrays of objects.
- The **VS Code debugger**: click the gutter to set a **breakpoint**, start from **Run and Debug** (choose **Node.js**), then **Step Over**, **Step Into**, **Step Out** and **Continue**, reading the **Variables** and **Watch** panels.
- For programs that use `prompt`, run them with `node` inside a **JavaScript Debug Terminal**.
- A **stack trace** lists the function calls in progress when a crash happened. The top is where it broke; the cause is often lower down.
- Explaining your code out loud (**rubber duck debugging**) finds bugs surprisingly often.
:::

::: interview What is the difference between Step Over and Step Into?
Both run the current line and pause again. If the line calls one of your functions, **Step Into** goes inside that function and pauses on its first line, while **Step Over** runs the whole function in one go and pauses on the next line of the current code.
:::

::: interview A program prints the wrong total but shows no error. How do you start?
Write down the expected and actual totals. Guess where the value might go wrong (for example, inside the loop that adds things up). Then gather evidence: a labelled `console.log` of the inputs and the running total each time around, or a breakpoint in the loop with a watch on the total. Change one thing at a time.
:::

::: interview What does a stack trace tell you?
Which functions were running when the error happened, and the file and line number for each, starting with the place where it actually broke and working back through whoever called it. It lets you follow the trail back to the code that caused the problem, which is not always the line that crashed.
:::

::: checkpoint
- [ ] I found the off-by-one bug in `average.js` using labelled `console.log`s
- [ ] I set a breakpoint by clicking the gutter and started the debugger from Run and Debug
- [ ] I used Continue, Step Over and Step Into, and watched `numbers[i]` in the Watch panel
- [ ] I read the stack trace from `trace.js` and found the line that caused the crash
- [ ] I ran a prompt-sync program in a JavaScript Debug Terminal and it paused at my breakpoint
- [ ] I fixed all five bug hunts
:::

::: resources
- **VS Code, "Node.js debugging in VS Code":** https://code.visualstudio.com/docs/nodejs/nodejs-debugging. The official guide, including the JavaScript Debug Terminal.
- **javascript.info, "Debugging in the browser":** https://javascript.info/debugging-chrome. The same ideas (breakpoints, stepping, watch) in the browser's developer tools.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. See every variable and reference drawn as your code runs.
:::
