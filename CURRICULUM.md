# Curriculum outline

The lesson-by-lesson plan. File names are fixed so that links between lessons work. Each lesson must cover the points listed, in roughly this order, and must follow [AUTHORING.md](AUTHORING.md).

---

## Phase 0 — Start Here (`phase-00-start-here`)

**01-how-this-course-works** — How this course works
- Who it is for: people who have never programmed. It teaches *programming*; JavaScript is the tool, not the goal.
- The lesson loop (understand → tiny example → type and run → exercise → project → check yourself).
- Why typing beats reading. Keep the browser and the editor side by side.
- The block types they will see (try, predict, exercise levels, hint/solution collapsed, checkpoint, Test yourself, Go deeper).
- Being stuck is normal: a "stuck" routine (reread the error, compare with the example character by character, explain it out loud, take a break, then open the hint).
- Progress is saved in the browser.

**02-what-is-programming** — What is programming, really?
- A computer follows instructions exactly, literally and in order. The "make a sandwich" exercise: write instructions for someone who takes everything literally.
- A program is a written list of instructions. A programming language is a strict language that both people and computers can read.
- Code → something that runs it → result. For us: JavaScript + Node.js.
- Why JavaScript: it is already on your computer (the browser), it is used everywhere, and the ideas transfer. Show the same "hello" in Python and C# to prove the ideas are universal.
- What we will *not* do: websites and frameworks. First the foundations.

**03-the-map** — The map: what you will learn, and how it all connects
- A text diagram of the phases, showing how each builds on the one before (values → variables → decisions → loops → functions → arrays → objects → array methods).
- For each phase: the question it answers ("How do I remember things?", "How do I choose?", "How do I repeat?", "How do I reuse?", "How do I handle many things?", "How do I describe one thing with many details?", "How do I do less work?").
- Why the order matters: for example, why you learn loops before `map`, and why you write loops over arrays by hand before using shortcuts.
- A small "every program is made of these" picture: input → store → decide → repeat → output.
- Suggested pace (for example, 1 hour a day, about 8–10 weeks) and the advice not to rush.

**04-setting-up-your-computer** — Setting up your computer
- Install VS Code (what a code editor is, and why not Word or Notepad).
- Install Node.js LTS (what Node is, and what LTS means). Steps for Windows, macOS and Linux.
- Check it worked: `node --version`, `npm --version`.
- Helpful VS Code settings: auto save, font size, the integrated terminal (Ctrl+` / Cmd+`).
- Show file extensions on Windows and macOS (why `.js` matters).
- Troubleshooting: "node is not recognized" (restart the terminal, reinstall, PATH explained in one sentence).

**05-the-terminal** — The terminal without fear
- What the terminal is, and why programmers use it.
- The prompt, the current folder, commands and arguments.
- `pwd` (macOS/Linux) / `cd` alone (Windows PowerShell also supports `pwd`), `ls`/`dir`, `cd folder`, `cd ..`, `cd ~`, `mkdir`, clearing the screen, the up arrow for history, Tab completion.
- Paths: absolute and relative, `~`, `.` and `..`. A folder-tree picture.
- Stopping a running program with Ctrl+C.
- Exercise: create a folder structure and navigate it.

**06-your-first-program** — Your first program (and what every file is for)
- Create `~/coding-practice`, open it in VS Code (`code .` or File → Open Folder).
- `npm init -y`: what npm is (a package manager, like an app store for code), what it did, and **`package.json` explained line by line** (name, version, main, scripts, license, …).
- Create `hello.js`, write `console.log("Hello, world!")`, and run it with `node hello.js`. Explain each part: `console`, `.log`, the parentheses, the quotes, the semicolon.
- The edit → save → run loop. Forgetting to save is the number one "it didn't change!" cause.
- Add a `"start": "node hello.js"` script and run `npm start`.
- The folder layout for the course: `phase-1/`, `phase-2/` and so on.
- Bonus: the browser console as a playground (F12 → Console) and the Node REPL (type `node`, then `.exit`), and when to use each.

**07-when-things-go-wrong** — When things go wrong: errors are your friends
- Errors are messages, not failures. Anatomy of a Node error: file, line number, caret, error type, message.
- Make these on purpose: missing quote (SyntaxError), a typo in `console` (ReferenceError), a missing bracket.
- Comments: `//` and `/* */`, and "commenting out" code to test.
- How to search an error message effectively.
- Debug exercises with small broken programs (using only `console.log`).

---

## Phase 1 — Storing Information (`phase-01-storing-information`)

**01-values-and-output** — Values, expressions and output
- A value is a piece of information: `42`, `"hello"`. `console.log` shows values. Several values: `console.log("Age:", 42)`.
- Expressions: something that produces a value (`2 + 3`). Statements: an instruction (a line that does something).
- Code runs top to bottom, one line at a time. Show that the order of output follows the order of the code.
- Arithmetic `+ - * /`, and strings vs numbers at a glance (`"2" + "3"` vs `2 + 3`). A teaser for the data types lesson.

**02-variables** — Variables: giving values a name *(already written — use it as the style reference)*

**03-let-and-const** — let, const, and choosing good names
- `const` for values that never get a new value, `let` for ones that do. Default to `const`.
- Why `var` exists, and why we do not use it (one short paragraph, no scope deep dive).
- Naming rules (letters, digits, `_`, `$`, cannot start with a digit, case-sensitive, reserved words) and conventions (camelCase, meaningful names, booleans like `isPaid`, constants like `VAT_RATE`).
- Good and bad names side by side. Exercise: rename a messy program's variables.

**04-numbers** — Numbers: whole numbers, decimals, and why 0.1 + 0.2 is weird
- Integers vs decimal numbers, in everyday terms (counting people vs measuring weight).
- **Float vs double vs decimal, explained plainly.** Computers store numbers in a fixed number of boxes (bits). A *float* (32-bit) holds about 7 significant digits. A *double* (64-bit) holds about 15–17. Analogy: a ruler with a limited number of markings. Many languages (C#, Java, C) make you choose `int`, `float`, `double` or `decimal`. JavaScript has one `number` type, which is always a 64-bit double. That is why `0.1 + 0.2` prints `0.30000000000000004`: 0.1 cannot be written exactly in binary, just as 1/3 cannot be written exactly in decimal. `decimal` in other languages exists for money.
- Real-world consequence: store money as whole cents (R12.50 → 1250), or round when displaying with `toFixed(2)`. `Number.MAX_SAFE_INTEGER` gets a mention only.
- Operators: `+ - * / % **`, precedence (BODMAS/PEMDAS), brackets. `%` real uses: even/odd, minutes → hours and minutes.
- Shortcuts: `+= -= *= /= ++ --`.
- `Math.round`, `Math.floor`, `Math.ceil`, `Math.max`, `Math.min`, `Math.random` (dice roll), and `toFixed(2)` (it returns a string, which is revisited in 01-07).
- Division by zero gives `Infinity`.
- Real problems: VAT calculator, splitting a bill, converting temperatures.

**05-strings** — Strings: working with text
- What a string is. `'single'`, `"double"`, and `` `backtick` `` quotes. Quotes inside strings and escaping (`\"`, `\n`).
- Joining with `+`, and template literals with `${}` (why they are nicer).
- `.length`, characters by position `[0]` (counting from 0, which is revisited in arrays), the last character.
- Useful built-in abilities: `toUpperCase`, `toLowerCase`, `trim`, `includes`, `startsWith`, `slice`, `replace`. Explain "the dot means 'ask this string to do something'", with a note that Phase 6 explains the dot properly.
- Strings do not change: methods return a new string. Show that `name.toUpperCase()` alone does not change `name`.
- `"5" + 5` → `"55"`, the most common beginner surprise.
- Real problems: formatting a receipt line, building a username, checking an email contains `@`.

**06-booleans-null-undefined** — true, false, and "nothing": booleans, null and undefined
- Booleans: yes/no values, real examples (`isLoggedIn`, `hasPaid`). A preview: comparisons produce booleans (`5 > 3`). Say that Phase 2 covers them fully.
- `undefined`: declared but no value yet (`let x;`). `null`: deliberately empty. Analogy: an empty mailbox slot vs a slot with a note saying "nothing here".
- `typeof`, and a summary table of the data types so far: number, string, boolean, undefined, null (and the `typeof null === "object"` quirk, labelled as a historic bug).
- Why data types matter: the type decides what you can do with a value.

**07-converting-between-types** — Converting between types
- Why: user input and files are always text. `"25" + 5`.
- `Number("25")`, `parseInt`, `parseFloat` (differences, with examples like `"12.5kg"`), `String(25)`, `` `${n}` ``.
- `NaN`: "Not a Number", how you get it, `Number.isNaN`, and that `NaN` is not equal to anything (a preview only).
- Automatic conversion surprises (`"10" - 2`, `"10" + 2`, `"3" * "4"`), and why you convert explicitly.
- `toFixed` returns a string; convert back if you need to calculate.

**08-getting-input-from-the-user** — Asking the user questions (and your first package)
- Programs that only print are boring. Input makes them interactive.
- Packages: code other people wrote. `npm install prompt-sync` in `coding-practice`. What changed: `node_modules/`, `package-lock.json`, `dependencies` in `package.json`. Why `node_modules` is never shared (and a `.gitignore` mention).
- `const prompt = require("prompt-sync")();`: explain it line by line, and say it is fine to treat it as a magic line for now (Phase 8 explains `require`).
- `prompt()` always returns a **string**, which links back to 01-07. Convert with `Number()`.
- If the user presses Ctrl+C, `prompt` returns `null`. Note it; handle it later.
- Exercises: greeting program, age next year, a simple calculator.

**09-project-budget-buddy-v1** — Project: Budget Buddy v1
- Create `~/budget-buddy`, `npm init -y`, `npm install prompt-sync`, `index.js`, and a `start` script.
- Ask for name, monthly income, and rent, food and transport amounts. Calculate total expenses and what is left. Print a formatted summary with `toFixed(2)` and template literals.
- Plan it first in plain words (comments as a to-do list), then code it step by step, running after each step.
- Stretch: savings percentage, and money per day left (`Math.floor`).
- Full solution collapsed.

---

## Phase 2 — Making Decisions (`phase-02-making-decisions`)

**01-comparing-values** — Comparing values
- Comparisons produce booleans. `=== !== > < >= <=`.
- `=` vs `===` (store vs ask). Why `===` and not `==` (show `"5" == 5` is true, then say never use it).
- Comparing strings (case matters, alphabetical order is weird: `"apple" < "banana"`, `"Zebra" < "apple"`).
- Storing a comparison result in a variable: `const isAdult = age >= 18`.

**02-if-and-else** — if and else: making your program choose
- A flowchart picture. `if` with a block, `else`, and `else if` chains. Order matters in `else if` (grade example, checking from highest down).
- Blocks and indentation, and why they matter for humans. Variables declared inside a block (a short preview of scope, which Phase 4 covers).
- Real problems: shipping cost, ticket price by age, grade calculator, and "is the input a number?" with `Number.isNaN`.

**03-combining-conditions** — and, or, not
- `&&`, `||`, `!`. Truth tables in plain words. Real examples: can this person rent a car? (age AND licence), weekend (Saturday OR Sunday), a free-shipping rule.
- Range checks: `age >= 13 && age <= 19`. The common mistake `13 <= age <= 19`.
- Brackets to make intent clear.

**04-truthy-and-falsy** — Truthy and falsy: JavaScript's shortcuts
- The falsy list: `false, 0, "", null, undefined, NaN`. Everything else is truthy.
- The practical use: `if (name)` to check for empty input, and the pitfall where `0` is a valid amount.
- Default values with `||` (and a light mention of `??`).
- When to be explicit instead.

**05-switch-and-ternary** — switch and the ternary operator
- `switch` for picking one of many exact values (menu options, days of the week). `break`, fall-through (and why forgetting `break` is a bug), `default`.
- The ternary `condition ? a : b` for choosing between two values. When it helps and when it hurts readability.
- Rewrite an `if` chain as a `switch`, and the other way round.

**06-project-budget-buddy-v2** — Project: Budget Buddy v2
- Validate each amount (must be a number, and not negative). For now, show an error and use 0, because loops come next.
- Warn if expenses are more than income. Status: "healthy" (more than 20% left), "tight", or "overspent".
- A `switch` on a chosen "mood" message, or a currency choice.
- Full solution collapsed.

---

## Phase 3 — Repeating Things: Loops (`phase-03-loops`)

**01-why-loops** — Why loops exist
- The problem: print 1 to 5 by copying lines, then imagine 1 to 1000. Copy-paste does not scale and cannot handle "until the user says stop".
- Everyday loops: stirring until mixed, washing each plate, laps of a track. Every loop has a *start*, a *condition to keep going*, and a *step that moves towards stopping*.
- Vocabulary: iteration, loop body, loop condition, counter.
- No syntax dumped yet. Plan loops in plain words and pseudocode. End by saying the next two lessons give JavaScript's two main loops.

**02-while-loops** — The while loop
- Syntax, and a trace table (write down every variable at each step). Countdown, doubling money until a target.
- Infinite loops: create one on purpose and stop it with Ctrl+C. Why it happened.
- A `while` for "keep asking until the input is valid" with prompt-sync. This is the classic real-world use.
- When to use `while`: when you do not know how many times you will repeat.

**03-for-loops** — The for loop
- The three parts: start; condition; step. The same countdown as a `for`. A trace table.
- Counting up and down, steps of 2, and starting at 0 vs 1.
- When to use `for`: when you know (or can calculate) how many times.
- Side-by-side comparison with `while`, turning one into the other.
- Real problems: times table, compound interest over 12 months, printing a simple text bar chart `"#".repeat(n)` (or building a string in a loop).

**04-loop-patterns** — The classic loop patterns
- **Accumulator** (running total), **counter** (how many match), **maximum/minimum** (keep the best so far), **building a string**, **flag** (did we find it?).
- Each pattern: the plain-words recipe, code, a trace, and a real-world example (total of receipts, count passing marks, highest temperature). Use numbers from a loop or from prompt, because there are no arrays yet.
- Say plainly: "Remember these patterns. In Phase 5 you will use them on lists, and in Phase 7 you will meet shortcuts that do the same things."

**05-break-continue-nested** — break, continue, nested loops and menus
- `break` to stop early (found it), and `continue` to skip one iteration (skip invalid entries).
- `do...while` in brief (runs at least once, for menus).
- Nested loops: a multiplication grid, and a picture of the clock (minutes inside hours).
- **The menu loop pattern**: show options, read a choice, `switch`, repeat until "q".

**06-project-budget-buddy-v3** — Project: Budget Buddy v3
- Menu: 1) Add expense 2) Show total 3) Quit. Loops until quit.
- Keep asking until the amount is valid.
- Running total, count of expenses, biggest expense, and average on quit.
- Full solution collapsed.

---

## Phase 4 — Functions: Naming Your Steps (`phase-04-functions`)

**01-why-functions** — Why functions exist
- The problem: the same 5 lines copied three times, then a bug fix needed in all three. A recipe card analogy.
- Declaring vs calling (defining a recipe vs cooking it). The code jumps into the function and comes back. Show the order of console output.
- Naming functions as verbs (`printReceipt`, `showMenu`).
- You have already used functions: `console.log`, `Math.round`, `prompt`.

**02-parameters-and-arguments** — Parameters and arguments: giving functions input
- Parameters are placeholders, and arguments are the actual values. Analogy: a coffee machine with "size" and "sugar" dials.
- Several parameters, order matters, a missing argument gives `undefined`, and default parameters.
- Real problems: `greet(name)`, `printLine(char, length)`, `calculateTip(bill, percent)` (printing for now).

**03-return-values** — Return values: getting answers back
- **The big confusion: `console.log` vs `return`.** A calculator that shows the answer on a screen vs one that hands it to you on paper so you can use it again. Show why `const total = add(2, 3)` is `undefined` if the function only logs.
- `return` ends the function immediately (early return for invalid input).
- Using return values in other expressions, and functions calling functions.
- Functions that return booleans (`isEven`, `isValidAmount`).
- Real problems: VAT, BMI, temperature conversion, formatting money.

**04-scope** — Scope: where variables live
- Variables made inside a function (or block) only exist there. Analogy: what happens in the kitchen stays in the kitchen, but the kitchen can see the house.
- Global vs local, and why too many globals cause bugs. Parameters are local.
- Shadowing (same name inside and outside), briefly.
- Exercises that predict output and fix errors.

**05-arrow-functions** — Function expressions and arrow functions
- Functions are values: store a function in a variable (a function expression).
- Arrow functions, step by step: turn `function (a, b) { return a + b; }` into `(a, b) => { return a + b; }`, then `(a, b) => a + b`. One parameter: `n => n * 2`. No parameters: `() => ...`.
- Implicit return, and the braces trap (`=> { a + b }` returns undefined).
- When to use which (a beginner-friendly rule: declarations for main named steps, arrows for short helpers, and especially later in Phase 7 for passing functions around). Mention that arrows behave differently with `this`, and that this does not matter until much later.
- Hoisting in one sentence: declarations can be called before they are written, and expressions cannot.
- Lots of conversion practice both ways.

**06-designing-with-functions** — Designing programs with functions
- Break a problem into steps. Each step becomes a function with one job.
- Pure functions (same input gives the same output, with no printing or prompting inside), and keeping input/output at the edges.
- Test your functions with a tiny homemade `check(actual, expected)` helper.
- A worked example: a tip/bill splitter built from small functions.

**07-project-budget-buddy-v4** — Project: Budget Buddy v4
- Refactor v3 into functions: `formatMoney`, `askForAmount` (with the validation loop inside), `showMenu`, `statusFor`, `printSummary`.
- At least two arrow functions.
- Check the behaviour stays exactly the same (refactoring). Full solution collapsed.

---

## Phase 5 — Lists of Things: Arrays (`phase-05-arrays`)

**01-what-is-an-array** — Arrays: storing a list of values
- The problem: `expense1`, `expense2`, `expense3`… does not scale.
- An array is an ordered list. Analogy: a row of numbered lockers starting at 0. Why computers count from 0 (the distance from the start).
- Create, read by index, `.length`, the last item `arr[arr.length - 1]`, and reading past the end gives `undefined`.
- Arrays can hold any type (and mixed types, though you usually should not).

**02-changing-arrays** — Changing arrays
- Set by index, `push`/`pop` (end), `unshift`/`shift` (start), `includes`, `indexOf` (−1 means not found), `splice` to remove at a position.
- A `const` array can still change its contents (the box vs what is in the box). A short preview of references, which Phase 6 covers.
- Real problems: a shopping list, a queue at a bank (shift), undo history (pop).

**03-looping-through-arrays** — Looping through arrays
- Why arrays and loops belong together.
- `for (let i = 0; i < arr.length; i++)`: why `<` and not `<=`, and a trace table.
- `for...of` when you do not need the index. When you do need it (numbering items, changing items).
- Printing a numbered list, and changing every item in place.

**04-array-algorithms-by-hand** — Classic list algorithms, written by hand
- Using the Phase 3 patterns on arrays: sum and average, max and min, count matching items, **build a new array of only matching items** (filter by hand), **build a new array of transformed items** (map by hand), find the first match (find by hand), and check if any/all match.
- Each one: plain-words recipe → code → real example. Name the pattern ("this pattern is called *filtering*").
- Close by saying: "In Phase 7 you will learn that JavaScript has shortcuts for each of these. Because you wrote them yourself, you will know exactly what the shortcuts do."

**05-strings-and-arrays** — Strings and arrays together: split and join
- `split` (a sentence to words, a CSV line to values), and `join`.
- Counting words, reversing a word (loop or `split`/`reverse`/`join`), capitalising names.
- Parsing input like `"12.50, 30, 7.25"` into numbers with a loop.

**06-project-budget-buddy-v5** — Project: Budget Buddy v5
- Store expense amounts in an array. A menu option lists them numbered from 1. Remove by number (convert to index, and validate the range).
- Total, average and largest calculated with your own loops in functions.
- Full solution collapsed.

---

## Phase 6 — Grouping Data: Objects (`phase-06-objects`)

**01-what-is-an-object** — Objects: describing one thing with many details
- The problem: `studentName`, `studentAge`, `studentGrade` as loose variables. An object groups them. Analogy: a form or ID card with labelled fields.
- Keys and values, dot notation, bracket notation (with a key held in a variable), and adding, changing and deleting properties. A missing property gives `undefined`.
- Nesting (an address inside a person), briefly.
- `for...in` and `Object.keys` (a brief look).
- Now explain properly: `"hi".length` and `console.log` use the same dot. Strings and `console` are objects, and methods are functions attached to objects.

**02-arrays-of-objects** — Lists of objects: the shape of real data
- The most common data shape in real programs: a list of records (products, contacts, transactions). Show that a real app's data looks like this (for example a JSON response).
- Loop over them, read properties, sum a property, find by property, and filter by property by hand.
- Adding a new object from user input.

**03-objects-and-functions** — Objects and functions together
- Passing objects into functions and returning objects from functions (factory functions like `createExpense(description, amount)`).
- Methods on your own objects, with simple `this` inside a regular method. Why an arrow function as a method breaks `this`, as a gentle warning only.
- When to use an object vs an array (a thing vs a list of things), with a decision table.

**04-values-and-references** — Copies and references: the surprise that catches everyone
- Numbers and strings are copied. Arrays and objects are shared (the variable holds the address, not the house). A house-address analogy.
- Show the bug: change a "copy" and the original changes. A function that changes an array that was passed in.
- Making real copies: `[...arr]`, `{...obj}` (shallow copies, briefly).
- `===` on objects compares the address, not the contents.

**05-saving-data-with-json** — Saving data to a file with JSON
- Why: variables disappear when the program ends.
- JSON: text that looks like JS objects. `JSON.stringify` (with `null, 2` for pretty output) and `JSON.parse`.
- `const fs = require("fs")` (built into Node), `fs.writeFileSync`, `fs.readFileSync(path, "utf8")`, and `fs.existsSync` for the first run.
- Open the JSON file in VS Code to see the data. What happens when the file is broken (a very light mention of try/catch as a "safety net", with a copyable pattern).

**06-project-budget-buddy-v6** — Project: Budget Buddy v6
- Each expense becomes `{ description, amount, category }`. Ask for all three.
- A category totals report (an object used as a tally: `totals[category] = (totals[category] || 0) + amount`).
- Save to `budget.json` after each change and load on start.
- Full solution collapsed.

---

## Phase 7 — Functions as Values: Array Methods (`phase-07-functions-as-values`)

**01-passing-functions-to-functions** — Passing functions to functions (callbacks)
- Functions are values (a recap of 04-05), so they can be passed as arguments. Build `repeat(times, action)` and `doTwice(fn)`.
- A **callback** is a function you hand to someone else to call later. Analogy: leaving your number at the restaurant so they call you when the table is ready.
- Write `processEach(array, fn)`, your own forEach, using the Phase 5 loop. This is the key moment: "the loop stays the same, only the *action* changes, so pass the action in".
- Passing a named function vs an arrow function inline.

**02-foreach** — forEach: a loop with the action passed in
- Show the Phase 5 `for...of` loop, then the same thing with `forEach`. The callback receives `(item, index, array)`.
- You cannot `break` out of `forEach`. When to prefer `for...of`.

**03-map** — map: transform every item into a new list
- Start with the hand-written "transform" loop from 05-04. Write `myMap(arr, fn)`. Then `.map`.
- Rules: map always returns a new array of the **same length**, and does not change the original.
- Examples: prices with VAT, names to uppercase, objects to display strings.
- The mistake: forgetting `return` in a braces arrow gives an array of `undefined`. Using `map` only for side effects.

**04-filter** — filter: keep only the items that pass a test
- The hand-written filter loop → `myFilter` → `.filter`. The callback returns true or false.
- Examples: expenses over R100, adults only, non-empty strings.
- Length can be anything from 0 to the original length.

**05-find-some-every** — find, findIndex, some and every
- find (the first match or `undefined`), findIndex (−1), some (any?), every (all?). Each linked back to the hand-written version from 05-04 and the flag pattern in 03-04.
- Choosing the right one: a decision table.

**06-reduce** — reduce: boiling a list down to one value
- Start with the accumulator loop. Write `myReduce`. Then `.reduce((total, item) => total + item, 0)`.
- A trace table of accumulator and item at each step. Always give a starting value.
- Examples: total, max, and counting by category into an object.
- Honesty: a `for...of` loop is often clearer than reduce, and that is fine.

**07-sort-and-chaining** — sort, and chaining methods together
- `sort` changes the original. The default sorts as text (`[10, 9, 1].sort()` → `[1, 10, 9]`). Compare functions `(a, b) => a - b` explained in plain words. Sort objects by a property, and copy first with `[...arr]`.
- Chaining: `expenses.filter(...).map(...)` reads like a sentence. Split long chains over lines.
- **Loop or method?** A guide: use methods for transform/select/summarise, and use loops when you need `break`, complex steps, or when it is clearer.

**08-project-budget-buddy-v7** — Project: Budget Buddy v7
- Reports: filter by category, top 3 expenses (copy, sort, slice), category totals with reduce, search by a word in the description (`filter` + `includes` + `toLowerCase`).
- Replace some Phase 5/6 loops with methods where it makes the code clearer. Keep the ones that are clearer as loops.
- Full solution collapsed.

---

## Phase 8 — Becoming a Programmer (`phase-08-becoming-a-programmer`)

**01-solving-problems** — How to solve problems you have never seen before
- A method: understand the problem (restate it, examples of input → output, edge cases), plan in plain words or pseudocode, solve a smaller version first, build in small steps and run often, then tidy up.
- A fully worked example, for example "FizzBuzz" and then "a word frequency counter", showing the thinking and not just the answer.
- Practice problems with increasing difficulty, each with hints and solutions (for example palindrome check, count vowels, a password strength checker, a simple change-maker with denominations).

**02-debugging** — Debugging: finding and fixing bugs calmly
- A bug is the difference between what you expected and what happened. The scientific method: observe, guess, test, repeat.
- Strategic `console.log` (label your logs, log before/after, and use `console.table` for arrays of objects).
- **The VS Code debugger**: breakpoints, "Run and Debug", step over/into, and watching variables. Step-by-step instructions.
- Rubber duck debugging, and reading a stack trace.
- Several debug exercises with realistic bugs (off-by-one, `=` vs `===`, string + number, missing return, mutating the original array).
- Mention Python Tutor for visualising code.

**03-splitting-code-into-files** — Splitting code into files (modules)
- Why: long files are hard to navigate, and a module is like a drawer in a tool cabinet.
- `module.exports = { formatMoney, calcTotal }` and `const { formatMoney } = require("./money")`. Why `./`. Now explain the prompt-sync line fully: `require("prompt-sync")` returns a function, and `()` calls it.
- Built-in modules (`fs`) vs installed packages (`prompt-sync`) vs your own files.
- Exercise: move helper functions into `helpers.js`.

**04-saving-your-work-with-git** — Saving your work with Git
- What version control is (save points in a game). Install Git, and configure name and email.
- `git init`, `git status`, `git add`, `git commit -m`, `git log`. `.gitignore` with `node_modules`.
- Writing good commit messages. GitHub as an optional next step (what it is, and the link to its guide).

**05-project-budget-buddy-final** — Project: Budget Buddy, finished
- Split into `index.js`, `money.js`, `storage.js`, `reports.js`, and `package.json` `start` script.
- Write a README. Commit with Git.
- Feature ideas for going further (monthly budgets per category, edit an expense, export to CSV).
- Full final solution collapsed (all files).

**06-what-to-learn-next** — What to learn next
- What you can now do (a list, framed as real skills).
- How the ideas transfer: the same loop and function in Python and C#, side by side.
- Paths: web (HTML, CSS, the DOM, then JavaScript in the browser), back end (Node, Express), other languages (Python, C#). Topics to meet next: objects and classes, asynchronous code (promises, async/await), testing, data structures. Each gets one plain sentence.
- Curated resources with what each is best for.
- Keep practising: small projects list (to-do list, quiz game, unit converter, text adventure), Exercism, and Codewars (easy katas).

**07-glossary** — Glossary
- Every term from the course in plain words, alphabetical, each with a link to the lesson that teaches it.
