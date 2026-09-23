---
title: Asking the user questions (and your first package)
summary: Make your programs interactive with prompt-sync, and learn what really happens when you run pnpm add.
minutes: 45
stage: Phase 1
---

## What you will learn

- What a **package** is, and how to install one with `pnpm add`
- What `node_modules`, `pnpm-lock.yaml` and the `dependencies` section of `package.json` are for
- How to ask the user a question and use their answer, with `prompt()`
- Why every answer arrives as a **string**, and how to turn it into a number

**Before this:** [Converting between types](#/phase-01-storing-information/07-converting-between-types). You will use `Number()` straight away.

## The problem: programs that only talk

Every program you have written so far does exactly the same thing every time you run it. The VAT calculator always works out VAT on R1149.99. The pizza program always orders 4 pizzas. To use a different amount, you have to open the code and change it.

Real programs are not like that. An ATM does not ask the bank's programmers to edit the code before you withdraw R300. It **asks you**: "How much would you like to withdraw?" Then it uses your answer.

A program that waits for the person using it and reacts to what they type is called **interactive**. The person using it is called the **user**, and what they type is called **input**. You have been doing output since Phase 0. Now you add input, and your programs start to feel like real software.

There is one hitch: Node does not come with a simple "ask a question and wait for the answer" tool. So you are going to borrow one that somebody else wrote. That is your first **package**.

::: analogy Apps on your phone
Your phone comes with some apps built in: the clock, the camera, the calculator. For everything else, you go to an app store, find what somebody else built, and install it. You do not write your own WhatsApp.

Code works the same way. Node comes with some tools built in (like `console.log` and `Math`). For everything else, there is the **npm registry**, an app store for code, where millions of free **packages** are available. A package is a bundle of code someone else wrote and shared, so that you do not have to write it yourself.

The app on your phone that downloads and installs things from the store is like **pnpm**, the tool you installed in [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer). pnpm is a **package manager**: a program that fetches packages from the registry and puts them in your project.
:::

## Installing your first package

The package you need is called `prompt-sync`. It gives you one tool, `prompt`, which shows a question in the terminal and waits for the user to type an answer and press **Enter**.

::: try Install prompt-sync
1. Open a terminal and go into your practice folder:
   ```bash
   cd ~/coding-practice
   ```
   (This works in the macOS and Linux terminals, and in Windows PowerShell, where `~` also means your home folder.)
2. Check you are in the right place. On macOS and Linux, run `ls`. On Windows, run `dir`. You should see `package.json` in the list, along with your `phase-1` folder. **If there is no `package.json`, stop:** you are in the wrong folder, or you need to run `pnpm init` first, as in [Your first program](#/phase-00-start-here/06-your-first-program).
3. Install the package:
   ```bash
   pnpm add prompt-sync
   ```
4. After a few seconds, you should see something like this (the time and the pnpm version will be different):
   ```text
   Packages: +3
   +++
   Progress: resolved 3, reused 0, downloaded 3, added 3, done

   dependencies:
   + prompt-sync 4.2.0

   Done in 1.2s using pnpm v12.6.0
   ```
   The very first time you use pnpm on a computer, it may also print a few lines about a "content-addressable store" and a "virtual store". You can ignore them: that is pnpm setting up its storage.
5. That is it: prompt-sync is installed in this folder. Now look at what changed.
:::

You need an internet connection for this, because pnpm downloads the package from the online store, the **npm registry**. (The registry is still called "npm" because it was built for npm, the package manager that comes with Node. pnpm uses the very same registry.)

**`add`** is pnpm's word for "install a new package into this project". There is also `pnpm install` with no package name, which you will meet below: it installs everything a project *already* lists.

"Packages: +3" and "added 3" may seem odd, since you asked for one. The next section explains why.

## What changed in your folder

Run `ls` (or `dir` on Windows) again, or look in the VS Code Explorer. There are two new things, and one file has changed.

```text
coding-practice/
├── node_modules/         ← new folder
│   ├── .pnpm/            ← where pnpm really keeps prompt-sync, strip-ansi and ansi-regex
│   └── prompt-sync       ← a shortcut (link) into .pnpm
├── phase-0/
├── phase-1/
├── hello.js
├── package.json          ← changed: now has "dependencies"
└── pnpm-lock.yaml        ← new file
```

(On macOS and Linux, names that start with a dot, like `.pnpm`, are **hidden**: `ls` does not show them unless you run `ls -a`. VS Code's Explorer shows them either way. Inside `node_modules` there is also a small file called `.modules.yaml`, where pnpm keeps notes for itself.)

### `node_modules/`: where the packages live

`node_modules` is the folder where your project's packages live. When your code says `require("prompt-sync")`, Node looks in here for it. Open `node_modules/prompt-sync` in VS Code if you are curious. It is ordinary JavaScript, written by another programmer. You will not understand all of it yet, and you do not need to.

You asked for one package but got three because packages use other packages. `prompt-sync` needs a small package called `strip-ansi` to do its job, and `strip-ansi` needs one called `ansi-regex`. pnpm worked all of that out and installed the whole chain. A package that another package needs is called a **dependency**.

So why is only `prompt-sync` at the top of `node_modules`? pnpm keeps all three packages inside the hidden `.pnpm` folder, and puts a **link** (a shortcut, like a shortcut on your desktop that opens a file stored somewhere else) at the top level only for the packages **you** asked for. That is deliberate: your code can only `require` what you installed on purpose, so it cannot accidentally depend on `strip-ansi`, a package you never chose and that could disappear if prompt-sync changes. This is one of the reasons people choose pnpm. (The other big one: pnpm keeps a single copy of each package version in a shared store on your computer, so ten projects that use prompt-sync do not need ten copies.)

**Never edit anything inside `node_modules`.** It is pnpm's folder. If it ever gets into a mess, you can delete the whole `node_modules` folder and run `pnpm install` (with no package name). pnpm reads the list in `package.json` and puts everything back.

### `package.json`: the `dependencies` section

Open `package.json`. pnpm has added a new section at the bottom:

```text
  "dependencies": {
    "prompt-sync": "^4.2.0"
  }
```

This is the list of packages **your project** depends on. It says "this project needs prompt-sync, version 4.2.0 or a compatible newer one". (The `^` means "this version, or a newer one with fixes and small improvements, but no big changes that might break things".) The version number you see might be newer, which is fine.

This list is the important part. It means anyone with a copy of your project can run `pnpm install` and get exactly the packages it needs.

### `pnpm-lock.yaml`: the exact record

`pnpm-lock.yaml` is a longer file that records the **exact** version of every package that was installed, including `strip-ansi` and `ansi-regex`. It is a **YAML** file (say "yam-ul"), which is a simple text format for settings and lists. pnpm writes it and keeps it up to date. You never edit it by hand.

Why have both? `package.json` says what you *asked for* ("prompt-sync, version 4.2 or compatible"). `pnpm-lock.yaml` records what you *actually got* ("prompt-sync 4.2.0, strip-ansi 5.2.0, ansi-regex 4.1.1"), so that someone installing your project next year gets the same versions you tested with.

| File or folder | What it is | Who edits it | Share it with others? |
|---|---|---|---|
| `package.json` | Your project's details and the list of packages it needs | You (and pnpm, when you add a package) | Yes |
| `pnpm-lock.yaml` | The exact versions pnpm installed | pnpm only | Yes |
| `node_modules/` | The code of every package (or links to it) | pnpm only | **No** |

### Why `node_modules` is never shared

`node_modules` can get very big. Real projects often have hundreds of packages and tens of thousands of files in there. Since `package.json` and `pnpm-lock.yaml` hold everything needed to download it again, there is no point sending it to anyone. When programmers share a project, they leave `node_modules` out, and the other person runs `pnpm install`.

When you start using Git to save your work in [Phase 8](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git), you will create a file called `.gitignore` containing the line `node_modules`, which tells Git to leave that folder out automatically.

::: note One install per project folder
A package is installed into the folder where you ran `pnpm add`. Because you installed prompt-sync in `coding-practice`, every file inside `coding-practice` (including everything in `phase-1/`, `phase-2/` and so on) can use it. A different project folder would need its own `pnpm add`. You will see this in the [project lesson](#/phase-01-storing-information/09-project-budget-buddy-v1).
:::

::: quiz
You ran `pnpm add prompt-sync` in `coding-practice`. Now you create `phase-1/clean.js`, which starts with this line (`strip-ansi` is one of the packages prompt-sync needs):

```js
const strip = require("strip-ansi");
```

What happens when you run `node phase-1/clean.js` from inside `coding-practice`?

- [ ] It works, because `strip-ansi` was installed along with prompt-sync
- [x] It fails with `Error: Cannot find module 'strip-ansi'`
- [ ] It works, but only after you run `pnpm install` once more
- [ ] pnpm notices and copies `strip-ansi` to the top of `node_modules` the first time Node asks for it

`strip-ansi` is on your computer, but pnpm keeps it inside the hidden `node_modules/.pnpm` folder. Only packages **you** added get a link at the top of `node_modules`, and that is where `require` looks, so Node cannot find it. To use it on purpose, you would run `pnpm add strip-ansi`. Running `pnpm install` again changes nothing, because it installs only what `package.json` lists.
:::

## Asking your first question

Here is the smallest possible interactive program:

```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ");
console.log(`Hello, ${name}!`);
```

A sample session (what you type is shown after the question):

```text
What is your name? Thandi
Hello, Thandi!
```

### The first line: the "magic line"

```js
const prompt = require("prompt-sync")();
```

This line loads the package and gives you the `prompt` tool. Here is what each part does, roughly:

| Piece | What it does |
|---|---|
| `require("prompt-sync")` | "Go and fetch the prompt-sync package from `node_modules`." **require** is how a Node program loads a package. |
| `()` | The package hands back a tool-maker. The empty brackets say "make me a prompt tool now". |
| `const prompt =` | Store that tool in a constant called `prompt`, so you can use it below. |

Honestly: it is fine to treat this as a **magic line for now**. Copy it exactly to the top of any program that asks questions, and it works. The pieces behind it (loading code from other files, and tools that make other tools) are explained properly in [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files), in Phase 8. By then it will make complete sense.

Two things to get exactly right: the package name in quotes, and the `()` at the very end. Leaving off those last brackets gives a confusing error, which you will see in "Debug this" below.

### The second line: asking

```js
const name = prompt("What is your name? ");
```

When Node reaches this line, three things happen:

1. The text in the brackets, `What is your name? `, appears in the terminal.
2. The program **stops and waits**. Nothing else happens until the user types something and presses **Enter**.
3. Whatever they typed is handed back, and stored in `name`.

Then the program carries on to the next line, top to bottom as always.

Notice the **space** at the end of `"What is your name? "`. Without it, the user's typing is squashed right up against the question mark: `What is your name?Thandi`. It is a small detail that makes your program feel much more polished.

::: try Your first interactive program
1. Make sure you have done the "Install prompt-sync" steps above.
2. In `coding-practice`, create `phase-1/greet.js`:
   ```js
   const prompt = require("prompt-sync")();

   const name = prompt("What is your name? ");
   const town = prompt("Where do you live? ");

   console.log(`Hello, ${name} from ${town}!`);
   console.log(`Your name has ${name.length} letters.`);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-1/greet.js
   ```
4. The program asks the first question and waits. Type your name and press **Enter**. Then answer the second question. A session looks like this:
   ```text
   What is your name? Sipho
   Where do you live? Soweto
   Hello, Sipho from Soweto!
   Your name has 5 letters.
   ```
5. **Now experiment.** Run it again, and this time type your name with two spaces in front of it. What does the letter count say? Which string method from [Strings](#/phase-01-storing-information/05-strings) would fix it? Add it and run again.
:::

::: note If you see "Cannot find module 'prompt-sync'"
It means Node could not find the package. Almost always, prompt-sync was installed in a different folder, or not at all. Go into `coding-practice`, run `pnpm add prompt-sync` again, and make sure your file is somewhere inside `coding-practice`.
:::

::: quiz
The user types two spaces, then `Soweto`, then one space, and presses **Enter**. What is the last line printed?

```js
const prompt = require("prompt-sync")();

const town = prompt("Town: ");
console.log(`${town.trim().toUpperCase()} has ${town.length} letters`);
```

- [ ] `SOWETO has 6 letters`
- [ ] `  SOWETO  has 9 letters`
- [ ] `Soweto has 6 letters`
- [x] `SOWETO has 9 letters`

`prompt` hands back exactly what was typed, spaces included: `"  Soweto "`. The first `${ }` trims and upper-cases a **copy**, but `town` itself never changes, so `town.length` still counts the three spaces: 9. To count only the letters, you would need `town.trim().length`.
:::

## Every answer is a string

Here is where the [last lesson](#/phase-01-storing-information/07-converting-between-types) pays off. `prompt()` **always** gives you back a string, even if the user types digits. It has no idea you meant a number:

```js
const prompt = require("prompt-sync")();

const age = prompt("How old are you? ");
console.log(`Next year you will be ${age + 1}.`);
```

A sample session:

```text
How old are you? 15
Next year you will be 151.
```

There it is again: `"15" + 1` is `"151"`. The fix is the one you already know. Wrap the answer in `Number()`, straight away, on the same line:

```js
const prompt = require("prompt-sync")();

const age = Number(prompt("How old are you? "));
console.log(`Next year you will be ${age + 1}.`);
```

A sample session:

```text
How old are you? 15
Next year you will be 16.
```

Read `Number(prompt("How old are you? "))` from the inside out: first `prompt` asks the question and gets the text `"15"`, then `Number` converts that text into the number `15`, then it is stored in `age`.

This pattern, `Number(prompt(...))`, is one you will type many, many times. Use it for every question whose answer is a number.

### "But what if they type letters?"

Good question. Try it:

```text
How old are you? fifteen
Next year you will be NaN.
```

`Number("fifteen")` is `NaN`, as you saw in the last lesson, and `NaN + 1` is still `NaN`.

Right now, you have no way to stop this. To reject bad input, a program has to **make a decision**: *if* the answer is not a number, show a message. Decisions are exactly what [Phase 2](#/phase-02-making-decisions/02-if-and-else) teaches, and the project there adds this check to Budget Buddy. For the rest of Phase 1, type sensible numbers when your programs ask for them, and know that you will fix this properly very soon.

### What if the user presses Ctrl+C?

**Ctrl+C** is how you stop a running program in the terminal, as you learned in [The terminal](#/phase-00-start-here/05-the-terminal). If the user presses it while `prompt` is waiting for an answer, `prompt` gives back `null` instead of a string: "the user refused to answer". (Remember `null`, deliberately empty, from [lesson 6](#/phase-01-storing-information/06-booleans-null-undefined)?)

Your program then carries on with `null` as the answer, which usually leads to strange output or a `TypeError` such as `Cannot read properties of null`. For now, note that this can happen. Handling it gracefully also needs decisions, so it waits for Phase 2.

And if the user presses **Enter** without typing anything, `prompt` gives back the empty string `""`. Remember what `Number("")` is? It is `0`. Keep that in the back of your mind.

::: predict What happens?
Here is a program and the user's answers. What is printed on the last two lines?

```js
const prompt = require("prompt-sync")();

const first = prompt("First number: ");
const second = prompt("Second number: ");

console.log("Joined:", first + second);
console.log("Added:", Number(first) + Number(second));
```

The user types `20` and then `5`.
:::

::: solution
```text
First number: 20
Second number: 5
Joined: 205
Added: 25
```
Both answers are strings, `"20"` and `"5"`, so `first + second` joins them into `"205"`. Converting each one first gives the real sum.
:::

::: exercise Level 1 — Guided · Age in the future
Create `phase-1/future-age.js`.

1. Add the magic line at the top.
2. Ask `"What is your name? "` and store the answer in `name`.
3. Ask `"How old are you? "`, convert it with `Number()`, and store it in `age`.
4. Ask `"How many years into the future? "`, convert it, and store it in `years`.
5. Create `futureAge` as `age + years`.
6. Print: `In 10 years, Ayanda will be 26.` (using the real values).
7. Run it and answer the questions. Then run it again with different answers.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const name = prompt("What is your name? ");
const age = Number(prompt("How old are you? "));
const years = Number(prompt("How many years into the future? "));

const futureAge = age + years;

console.log(`In ${years} years, ${name} will be ${futureAge}.`);
```
A sample session:
```text
What is your name? Ayanda
How old are you? 16
How many years into the future? 10
In 10 years, Ayanda will be 26.
```
:::

::: exercise Level 2 — On your own · A simple calculator
Create `phase-1/calculator.js`. Ask the user for two numbers, then print their sum, difference, product and quotient (the result of dividing), each on its own line with a label. Show the quotient to two decimal places.

Try it with `12` and `5`. Then try `12` and `0`. What does the quotient show, and why? (Look back at [Numbers](#/phase-01-storing-information/04-numbers) if you are not sure.)
:::

::: hint
Two questions, both wrapped in `Number(...)`. Then four `console.log` lines. `toFixed(2)` goes only on the quotient, at the moment you print it.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const a = Number(prompt("First number: "));
const b = Number(prompt("Second number: "));

console.log(`${a} + ${b} = ${a + b}`);
console.log(`${a} - ${b} = ${a - b}`);
console.log(`${a} x ${b} = ${a * b}`);
console.log(`${a} / ${b} = ${(a / b).toFixed(2)}`);
```
A sample session:
```text
First number: 12
Second number: 5
12 + 5 = 17
12 - 5 = 7
12 x 5 = 60
12 / 5 = 2.40
```
With `12` and `0`, the last line is `12 / 0 = Infinity`. Dividing by zero gives `Infinity` in JavaScript. Checking for a zero before dividing is another job for Phase 2.

`a` and `b` are acceptable names here, because they really are "the first number" and "the second number" with no other meaning. `firstNumber` and `secondNumber` would be fine too.
:::

::: debug Two broken programs
**Program A** works out the cost of airtime bundles. With the answers `3` and `29`, it should print `Total: R87.00` and then `Bundles plus one free: 4`. The first line is right, but the second says `31`. Why does one line work and the other not? Fix it so both are right.

```js
const prompt = require("prompt-sync")();

const bundles = prompt("How many bundles? ");
const price = prompt("Price per bundle: R");
const total = bundles * price;

console.log(`Total: R${total.toFixed(2)}`);
console.log(`Bundles plus one free: ${bundles + 1}`);
```

**Program B** crashes with `TypeError: Cannot create property 'autocomplete' on string 'Your name? '`. Find the problem.

```js
const prompt = require("prompt-sync");

const name = prompt("Your name? ");
console.log(`Hi ${name}`);
```
:::

::: solution
**A:** Neither answer was converted, so both are strings. `bundles * price` happens to work, because `*` converts automatically (lesson 7). But `bundles + 1` joins `"3"` and `1` into `"31"`. This is exactly why you should convert straight away, rather than relying on luck:

```js
const prompt = require("prompt-sync")();

const bundles = Number(prompt("How many bundles? "));
const price = Number(prompt("Price per bundle: R"));
const total = bundles * price;

console.log(`Total: R${total.toFixed(2)}`);
console.log(`Bundles plus one free: ${bundles + 1}`);
```
A sample session:
```text
How many bundles? 3
Price per bundle: R29
Total: R87.00
Bundles plus one free: 4
```

**B:** The `()` at the end of the magic line is missing. Without it, `prompt` is the tool-*maker*, not the tool, and it does not know what to do with a question. The error message comes from deep inside the package, which is why it makes no sense. When an error mentions a file inside `node_modules`, the mistake is almost always in how *your* code used the package. Fix:

```js
const prompt = require("prompt-sync")();
```
:::

::: mistake
**Running `pnpm add` in the wrong folder.** Always `cd` into the project folder (the one with `package.json`) first. Check with `ls` or `dir`.

**Forgetting the `()` on the magic line.** It is `require("prompt-sync")();`, with brackets at the end.

**Forgetting to convert numbers.** `prompt` always returns a string. Use `Number(prompt(...))` for numeric answers.

**No space at the end of the question.** `prompt("Name?")` squashes the answer against the question. Use `prompt("Name? ")`.

**Editing files in `node_modules`, or sending it to someone.** Leave it to pnpm. Share `package.json` and `pnpm-lock.yaml` instead, and let the other person run `pnpm install`.

**Typing `pnpm install prompt-sync`.** To add a *new* package, the word is `add`: `pnpm add prompt-sync`. `pnpm install` on its own is for installing what `package.json` already lists.

**Thinking the program has frozen.** When `prompt` is waiting, the program pauses until you type and press **Enter**. Look for the question in the terminal.
:::

::: quiz
The user types `3` and then `20`. What is the last line printed?

```js
const prompt = require("prompt-sync")();

const bags = prompt("Bags: ");
const price = Number(prompt("Price: R"));
console.log(bags * price, bags + price, Number(bags + price));
```

- [ ] `60 23 23`
- [ ] `60 320 23`
- [x] `60 320 320`
- [ ] `NaN 320 320`

`bags` was never converted, so it is the text `"3"`. `*` converts it for you, so the first value is 60. `+` joins instead: `"3" + 20` is `"320"`. Wrapping the result in `Number()` afterwards is too late: the text is already `"320"`, so it becomes the number 320, not 23. Convert each answer as it arrives: `Number(prompt("Bags: "))`.
:::

## Real-world uses

- **Command-line tools** that programmers use every day ask questions exactly like this. `npm init`, the npm version of `pnpm init`, asks for your project's name, version and description, one question at a time.
- **ATMs, ticket machines and USSD menus** (like `*120*...#` on your phone) follow the same pattern: show a question, wait, use the answer.
- **Packages** are how all modern software is built. A typical web app depends on hundreds of packages for things like dates, security and payments. Knowing how to install one, and what `node_modules` and `package.json` are, is an everyday professional skill.

::: connect
**This builds on:** [Converting between types](#/phase-01-storing-information/07-converting-between-types), because every answer is a string and needs `Number()`, and on `package.json` and `pnpm init` from [Your first program](#/phase-00-start-here/06-your-first-program).

**This unlocks:** the [Budget Buddy project](#/phase-01-storing-information/09-project-budget-buddy-v1), next, which puts all of Phase 1 together into a program that asks about your money and works out what is left. In Phase 2, your programs start **checking** the answers, and in [Phase 3](#/phase-03-loops/02-while-loops) they keep asking until the answer is valid.
:::

::: challenge Recipe scaler
A recipe for vetkoek serves 4 people and needs 500 g of flour, 2 eggs and 250 ml of water. Write `phase-1/recipe.js` that asks how many people you are cooking for, and prints the amounts needed:

```text
How many people? 10
For 10 people you need:
1250 g flour
5 eggs
625 ml water
```

You cannot buy part of an egg, so the eggs must always be rounded **up** to a whole number. Try it with 5 people: how many eggs should it say?
:::

::: hint
Work out a scale factor first: `people / 4`. Multiply each amount by it. For the eggs, one of the `Math` rounding tools from [Numbers](#/phase-01-storing-information/04-numbers) always rounds up.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const RECIPE_SERVES = 4;
const people = Number(prompt("How many people? "));
const scale = people / RECIPE_SERVES;

const flour = 500 * scale;
const eggs = Math.ceil(2 * scale);
const water = 250 * scale;

console.log(`For ${people} people you need:`);
console.log(`${flour} g flour`);
console.log(`${eggs} eggs`);
console.log(`${water} ml water`);
```
A sample session:
```text
How many people? 5
For 5 people you need:
625 g flour
3 eggs
312.5 ml water
```
For 5 people, 2 × 1.25 = 2.5 eggs, which `Math.ceil` rounds up to 3.
:::

::: recap
- A **package** is code someone else wrote and shared. **pnpm** is a package manager: it installs packages from the npm registry.
- `pnpm add prompt-sync` (inside your project folder) installs the package and its dependencies into `node_modules/`, adds it to `dependencies` in `package.json`, and records exact versions in `pnpm-lock.yaml`.
- Only the packages you asked for appear at the top of `node_modules`; the rest live in the hidden `node_modules/.pnpm` folder.
- Never edit or share `node_modules`. `pnpm install` can always recreate it from `package.json` and `pnpm-lock.yaml`.
- `const prompt = require("prompt-sync")();` is the "magic line" that gives you the `prompt` tool. Phase 8 explains it fully.
- `prompt("Question? ")` shows the question, waits for **Enter**, and returns what was typed.
- The answer is **always a string**. Use `Number(prompt(...))` for numbers. Letters give `NaN`, which you will learn to check for in Phase 2.
- If the user presses Ctrl+C, `prompt` returns `null`. If they press Enter without typing, it returns `""`.
:::

::: interview What is the difference between `package.json`, `pnpm-lock.yaml` and `node_modules`?
`package.json` describes your project and lists the packages it needs. `pnpm-lock.yaml` records the exact versions that were installed. `node_modules` holds the actual package code (or links to it). You share the first two, and anyone can recreate `node_modules` from them with `pnpm install`.
:::

::: interview Why does `prompt()` return `"15"` rather than `15` when the user types 15?
Because a program cannot know what the user *meant*. Everything typed at a keyboard is text, so `prompt` returns a string. It is the programmer's job to convert it, for example with `Number()`.
:::

::: interview Why should you not share your `node_modules` folder?
It can be huge, and it can be recreated exactly from `package.json` and `pnpm-lock.yaml` by running `pnpm install`. Sharing it wastes space and can cause problems on a different computer.
:::

::: checkpoint
- [ ] I ran `pnpm add prompt-sync` inside `coding-practice`
- [ ] I found `node_modules`, `pnpm-lock.yaml` and the new `dependencies` section in `package.json`
- [ ] I ran `greet.js`, answered its questions, and fixed the extra-spaces problem with `trim()`
- [ ] I saw `"15" + 1` give `151` and fixed it with `Number(prompt(...))`
- [ ] I typed letters instead of a number and saw `NaN`
- [ ] I built the simple calculator and tried dividing by zero
- [ ] I fixed both programs in "Debug this"
:::

::: resources
- **pnpm Docs, "pnpm add":** https://pnpm.io/cli/add. Everything the `add` command can do.
- **pnpm Docs, "Motivation":** https://pnpm.io/motivation. Why pnpm keeps one shared copy of each package, and why only your own packages sit at the top of `node_modules`.
- **npm registry, the prompt-sync page:** https://www.npmjs.com/package/prompt-sync. The package's own page, with its instructions and version history.
- **pnpm Docs, "package.json":** https://pnpm.io/package_json. The reference. Look at the `dependencies` section.
:::
