---
title: When things go wrong — errors are your friends
summary: How to read a Node error message piece by piece, the three errors every beginner meets first, comments, and how to search for help.
minutes: 45
stage: Phase 0
---

## What you will learn

- Why an error message is help, not a telling-off
- How to read a Node error: the file, the line number, the arrow, the error type and the message
- The difference between a **SyntaxError** and a **ReferenceError**, and why one stops *everything*
- How to write **comments**, and how to "comment out" code to test an idea
- How to search the internet for an error message effectively

**Before this:** [Your first program](#/phase-00-start-here/06-your-first-program). You should have `coding-practice` set up, with a `phase-0` folder inside it.

## The problem: red text is scary

The first time a beginner sees an error, it looks like this: a wall of text, a long path, some odd symbols, words like `SyntaxError` and `at Module._compile`, and the feeling that they have broken something.

They have not. **An error message is the computer telling you exactly what confused it and where.** It is one of the most helpful things a computer ever does for you. Professional programmers see errors dozens of times a day, and they are glad of every one, because an error that *tells* you what is wrong is far easier to fix than a program that quietly does the wrong thing.

::: analogy The dashboard warning light
When a warning light comes on in a car, it is not the car being rude. It is the car saying "oil pressure is low" instead of letting the engine quietly destroy itself. The light tells you *what* and roughly *where*. The worst possible car is one with no warning lights at all.

Error messages are your program's warning lights. Your job is not to fear them. It is to read them.
:::

Most beginners **glance** at an error, see red, and go straight back to staring at their code. The single biggest improvement you can make is to **read every word of the error first**. This lesson teaches you how.

## Anatomy of a Node error

Let's make an error on purpose, so that you can take it apart calmly.

::: try Make your first error
1. In VS Code, create `phase-0/oops.js`.
2. Type these three lines exactly, **including the mistake** on line 2 (the closing quote is missing):
   ```js
   console.log("Line one");
   console.log("Hello, world!);
   console.log("Line three");
   ```
   VS Code may already colour things oddly or show a red squiggle. That is VS Code spotting the problem before you even run it. Ignore it for now.
3. Save, and from inside `coding-practice`, run:
   ```bash
   node phase-0/oops.js
   ```
4. You should see something like this (your path at the top will be different):
   ```text
   /Users/thandi/coding-practice/phase-0/oops.js:2
   console.log("Hello, world!);
               ^^^^^^^^^^^^^^^^

   SyntaxError: Invalid or unexpected token
       at wrapSafe (node:internal/modules/cjs/loader:1497:18)
       at Module._compile (node:internal/modules/cjs/loader:1519:20)
       ...several more lines starting with "at"...

   Node.js v24.8.0
   ```
:::

Now read it from the top, one piece at a time.

```text
/Users/thandi/coding-practice/phase-0/oops.js:2      <-- 1. which file, which line
console.log("Hello, world!);                          <-- 2. the line itself
            ^^^^^^^^^^^^^^^^                          <-- 3. the arrow: "around here"

SyntaxError: Invalid or unexpected token              <-- 4. the type  5. the message
    at wrapSafe (node:internal/...)                   <-- 6. the "at" lines
    ...
Node.js v24.8.0                                       <-- 7. your Node version
```

1. **The file and line number.** The path of the file, then a colon, then the line number: `oops.js:2` means **line 2 of `oops.js`**. On Windows the path looks like `C:\Users\thandi\coding-practice\phase-0\oops.js:2`. VS Code shows line numbers down the left side of the editor, so you can jump straight there.
2. **The line itself.** Node copies the problem line so you do not even have to look.
3. **The arrow**, called a **caret** (`^`). It points at the part of the line where Node got confused. Here it underlines everything from the opening quote onwards, because that is where the text started and never ended.
4. **The error type**: `SyntaxError`. There are only a handful of types, and each one is a big clue. More on these below.
5. **The message**: `Invalid or unexpected token`. A **token** is one "word" of code: a name, a bracket, a quote, a piece of text. So this means "I found a piece of code I could not make sense of".
6. **The `at` lines.** This is called a **stack trace**. It lists the places *inside Node itself* that were running when the error happened. For errors in your own small programs, it is almost never useful. **You can ignore every line starting with `at` for now.** You will learn to use them in [Debugging](#/phase-08-becoming-a-programmer/02-debugging).
7. **The Node version.** Useful when asking someone for help. Otherwise ignore it.

So the whole message, in plain English, says: **"In `oops.js`, on line 2, around the text starting `"Hello`, I found something I could not understand."** That is precise help.

Fix it by adding the missing `"` before the `)`, save, and run again:

```js
console.log("Line one");
console.log("Hello, world!");
console.log("Line three");
```

Output:

```text
Line one
Hello, world!
Line three
```

::: note The arrow shows where Node noticed, not always where you went wrong
Node points at the spot where it *realised* something was wrong. Sometimes the real mistake is a little earlier: on the same line, or even the line before. If the line it points at looks fine, look at the line above it.
:::

## The two errors you will see most

### SyntaxError: "I can't even read this"

**Syntax** means the grammar rules of a language: where quotes, brackets and semicolons go. A **SyntaxError** means your code breaks those rules, so Node cannot understand the file at all.

Here is something important. Look back at the `oops.js` output. Did it print `Line one`? **No.** Even though line 1 was perfectly fine.

That is because Node **reads the whole file first**, checking the grammar, before it runs **any** of it. If the grammar is broken anywhere, nothing runs.

::: analogy A recipe in a language you half-know
Imagine you are handed a recipe, and in step 5 there is a sentence that is complete nonsense. A careful cook reads the whole recipe *before* switching on the stove, finds the nonsense, and refuses to start. That is a SyntaxError: nothing is cooked, because the instructions do not make sense as written.
:::

Common causes: a missing quote, a missing or extra bracket, and curly "smart" quotes pasted from Word or a website.

### ReferenceError: "I don't know that name"

A **ReferenceError** means the grammar is fine, but you used a **name** that JavaScript does not know. The most common cause is a typo.

::: try A misspelled name
1. Create `phase-0/typo.js` with this code. Line 2 has `consle` instead of `console`:
   ```js
   console.log("Line one");
   consle.log("Hello, world!");
   console.log("Line three");
   ```
2. Save and run:
   ```bash
   node phase-0/typo.js
   ```
3. You should see:
   ```text
   Line one
   /Users/thandi/coding-practice/phase-0/typo.js:2
   consle.log("Hello, world!");
   ^

   ReferenceError: consle is not defined
       at Object.<anonymous> (/Users/thandi/coding-practice/phase-0/typo.js:2:1)
       ...several more lines starting with "at"...

   Node.js v24.8.0
   ```
:::

Read it the same way: **file `typo.js`, line 2**. The caret points at the very start of `consle`. The type is `ReferenceError` and the message says, in plain words, `consle is not defined`: "I have never heard of anything called `consle`".

Now notice the big difference: **`Line one` was printed this time!**

The grammar was fine, so Node started running the program. It ran line 1 successfully, then reached line 2, did not recognise `consle`, and stopped. Line 3 never ran.

```text
SyntaxError   ->  grammar broken   ->  Node refuses to start   ->  nothing runs
ReferenceError ->  unknown name    ->  Node stops at that line ->  earlier lines already ran
```

This is a useful clue. If **none** of your output appears, suspect a SyntaxError. If **some** of it appears and then an error, the problem is at the line where it stopped.

Fix it by correcting `consle` to `console`.

::: note The first "at" line has a clue too
In the ReferenceError, the first `at` line ends with `typo.js:2:1`. That means **line 2, column 1**: the first character of line 2. When a stack trace does mention your own file, that is the line to look at.
:::

### Capitals matter

JavaScript is **case-sensitive**: it treats capital and small letters as completely different. `Console` with a capital C is a different name from `console`.

```js
Console.log("Hello");
```

```text
ReferenceError: Console is not defined
```

And a capital in the wrong place in `log` gives a third error type:

```js
console.Log("Hello");
```

```text
TypeError: console.Log is not a function
```

A **TypeError** here means "`console` exists, but it has nothing called `Log` that can be run". The fix is the same: `console.log`, all lower case. You will meet `TypeError` more often once you start working with different kinds of values in [Phase 1](#/phase-01-storing-information/06-booleans-null-undefined).

## A bracket too few, or too many

Every opening bracket `(` needs a matching closing bracket `)`.

A **missing** closing bracket:

```js
console.log("Hello, world!";
```

```text
SyntaxError: missing ) after argument list
```

This message is unusually clear: "there should be a `)` after what you gave `console.log`". (The things you put inside the brackets are called **arguments**, which is where "argument list" comes from.)

An **extra** closing bracket:

```js
console.log("Hello, world!"));
```

```text
SyntaxError: Unexpected token ')'
```

"Unexpected token" means "I found this, and it makes no sense here". The caret points right at the extra `)`.

## Curly quotes: the invisible error

If you ever copy code from a Word document, a chat app, or some websites, the straight quotes `"` may have been turned into curly ones `“ ”`. They look almost the same to you. They are completely different to JavaScript:

```js
console.log(“Hello”);
```

```text
SyntaxError: Invalid or unexpected token
```

The fix is to delete the curly quotes and type straight ones in VS Code. This is one of the reasons we never write code outside a code editor.

## When Node cannot find your file at all

This one is not a mistake in your code. It means Node could not find the file you asked for:

```bash
node helo.js
```

```text
Error: Cannot find module '/Users/thandi/coding-practice/helo.js'
```

(It comes with a few other lines, including `code: 'MODULE_NOT_FOUND'`.) The path in quotes is **where Node looked**. Either the file name is misspelled (here, `helo` instead of `hello`), or you are in the wrong folder. Check with `pwd` and `ls`.

::: exercise Level 1 — Guided · Break it on purpose
Create `phase-0/break-it.js` containing:

```js
console.log("Sawubona");
console.log("Molo");
console.log("Dumela");
```

Run it once to check it prints three greetings. Then, one at a time, make each change below, run the file, **read the error type and line number**, write them down, and then undo the change before doing the next one.

1. Delete the closing `"` after `Molo`.
2. Change `console` on line 3 to `Console`.
3. Delete the `)` on line 1.
4. Change `log` on line 2 to `lg`.

For each one, also note: did any greeting print before the error?
:::

::: solution
1. **Missing quote:** `SyntaxError: Invalid or unexpected token`, pointing at line 2. Nothing prints, because Node could not read the file.
2. **`Console` on line 3:** `ReferenceError: Console is not defined`, line 3. `Sawubona` and `Molo` print first, then it stops.
3. **Missing `)` on line 1:** `SyntaxError: missing ) after argument list`, line 1. Nothing prints.
4. **`console.lg` on line 2:** `TypeError: console.lg is not a function`, line 2. `Sawubona` prints first, then it stops.

The pattern: **SyntaxError means nothing runs.** ReferenceError and TypeError happen while the program is running, so the lines before them have already printed.
:::

## Comments: notes for humans

Sometimes you want to write a note in your code that is meant for **people**, not for the computer: what a program is for, why you did something a certain way, or a reminder to yourself. These notes are called **comments**, and JavaScript skips them completely.

There are two kinds.

A **line comment** starts with two forward slashes, `//`. Everything from `//` to the end of that line is ignored:

```js
// This program prints a greeting.
console.log("Hello!");   // this part is ignored too
```

A **block comment** starts with `/*` and ends with `*/`. Everything between them is ignored, even across several lines:

```js
/*
  Greeting program.
  Written by Thandi, September 2026.
*/
console.log("Hello!");
```

Both of these print only:

```text
Hello!
```

### "Commenting out" code

Comments have a second, very practical use. Putting `//` in front of a line of code **switches it off** without deleting it. This is called **commenting out**. It is perfect for testing: "does the error go away if I turn this line off?"

::: try Comment things out
1. Create `phase-0/comments.js` and type:
   ```js
   // This program prints a short shopping list.
   // Written by Thandi, for practice.

   console.log("Shopping list:");
   console.log("- bread");   // brown, not white
   // console.log("- sweets");
   console.log("- milk");

   /*
     Everything between the slash-star and the star-slash
     is ignored, even across several lines.
     console.log("- chips");
   */
   console.log("Done!");
   ```
2. Before you run it, **predict** exactly which lines will appear.
3. Run it:
   ```bash
   node phase-0/comments.js
   ```
4. You should see:
   ```text
   Shopping list:
   - bread
   - milk
   Done!
   ```
   The sweets and chips lines were never run, because they are inside comments.
5. **Now experiment.** Remove the `//` in front of the sweets line, predict, and run it again.
:::

VS Code has a shortcut for this. Click on a line (or select several lines) and press **Ctrl+/** on Windows and Linux, or **Cmd+/** on macOS. It adds `//` to the start of each line. Press it again to remove them. VS Code also shows comments in a dimmer colour, so you can see at a glance what is switched off.

::: note Good comments explain why
Comments that repeat what the code already says (`// print hello` above `console.log("hello")`) add nothing. Good comments explain what the code *cannot* say: *why* you did it this way, or what a section is for. You will write plenty of the useful kind when you plan Budget Buddy in [Phase 1](#/phase-01-storing-information/09-project-budget-buddy-v1).
:::

## Searching for an error message

Sometimes the message alone is not enough. Then it is time to search, and there is a knack to it.

1. **Copy the error type and message**, for example `SyntaxError: missing ) after argument list`.
2. **Leave out anything specific to you**: your file paths, your user name, your file names, and your own words from the code (like `consle` or `Molo`). Nobody else has those, so they spoil the search.
3. **Add the language**: put `javascript` or `node` in front.

So:

```text
Bad:   /Users/thandi/coding-practice/phase-0/oops.js:2 console.log("Hello
Good:  javascript SyntaxError: missing ) after argument list
Good:  node ReferenceError is not defined
```

Good places the results will lead you to:

- **MDN Web Docs** has a page for every JavaScript error message, with an explanation and examples. Their pages are trustworthy and beginner-friendly.
- **Stack Overflow** is a question-and-answer site. Look at the top-voted answer, and at the date: answers from many years ago can be out of date.

::: warn Understand before you paste
If you find a fix online, make sure you understand *why* it works before you use it. Pasting code you do not understand is how a small problem becomes a big one. If an answer makes no sense yet, that is fine: go back to the stuck routine from [How this course works](#/phase-00-start-here/01-how-this-course-works).
:::

::: debug Fix all four
Each of these programs has **one** problem. For each one: run it, read the error (the type, the message and the line number), then fix it. Create them as `phase-0/fix1.js` to `phase-0/fix4.js`, including the comment on the first line of each. (That comment counts as line 1, so keep it in and the line numbers in the solution will match yours.)

```js
// fix1.js
console.log("Good morning");
console.log("Time for school);
```

```js
// fix2.js
console.log("Taxi fare:");
console.log(25));
```

```js
// fix3.js
console.log("Team sheet");
Console.log("Captain: Bafana");
console.log("Vice-captain: Aiden");
```

```js
// fix4.js
console.log("Recipe: vetkoek");
console.log("1. Make the dough";
console.log("2. Fry until golden");
```
:::

::: solution
**fix1.js:** `SyntaxError: Invalid or unexpected token` on line 3. The text `"Time for school` has no closing quote. Fix: `console.log("Time for school");`. Nothing printed at all, because it was a SyntaxError.

**fix2.js:** `SyntaxError: Unexpected token ')'` on line 3. There is one closing bracket too many. Fix: `console.log(25);`.

**fix3.js:** `ReferenceError: Console is not defined` on line 3. JavaScript is case-sensitive. Fix: `console` with a small c. Notice that `Team sheet` printed before the error.

**fix4.js:** `SyntaxError: missing ) after argument list` on line 3. The closing bracket is missing after the text. Fix: `console.log("1. Make the dough");`.

After fixing, each program should run without errors. For example, fix4.js prints:
```text
Recipe: vetkoek
1. Make the dough
2. Fry until golden
```
:::

::: exercise Level 2 — On your own · Comment it
Create `phase-0/menu.js`. It should:

1. Start with a block comment giving the program's purpose and your name.
2. Print a small menu for a food stall: a title and four items with prices written as text (for example `"Kota - R35"`).
3. One item is sold out today. Comment it out so it does not print, without deleting it.
4. Add one line comment that explains *why* that item is commented out.
:::

::: hint
Block comments use `/*` at the start and `*/` at the end. To switch off one line of code, put `//` at the start of it, or click on it and press **Ctrl+/** (**Cmd+/** on macOS).
:::

::: solution
```js
/*
  Menu for Mama Zodwa's food stall.
  Written by Lindiwe.
*/

console.log("=== Today's menu ===");
console.log("Kota - R35");
console.log("Vetkoek and mince - R20");
// Sold out today, bring it back tomorrow:
// console.log("Chicken feet - R25");
console.log("Chips - R15");
```
Output:
```text
=== Today's menu ===
Kota - R35
Vetkoek and mince - R20
Chips - R15
```
Your menu will be different, and that is fine. Check that the commented-out item does not print, and that removing its `//` brings it back.
:::

::: mistake
**Not reading the error.** Read every word before touching the code. The line number alone saves minutes.

**Reading only the last line of output.** The most useful parts (the file, the line number and the caret) are at the **top**. The error type and message come right after them.

**Worrying about the `at` lines.** For now, skip every line starting with `at`. They describe Node's insides.

**Fixing the wrong line.** The caret shows where Node *noticed* the problem. If that line looks perfect, check the line before it.

**Fixing several things at once.** Change one thing, save, run again, and read the new message. Sometimes fixing one error reveals the next. That is progress, not failure.

**Searching with your own file paths in the search.** Search for the error type and message, plus the word "javascript".
:::

## Real-world uses

- Professional programmers read error messages all day. Being able to go straight to the file and line is one of the things that makes them fast.
- Tools that run your code for companies (test systems and servers) produce exactly these kinds of messages, and developers read them to find out what broke.
- Comments are everywhere in real code: at the top of files, explaining tricky parts, and marking to-do items (`// TODO: handle empty input`).
- Commenting out code is a standard way to narrow down a problem: switch half the code off, and see whether the bug is still there.

::: connect
**This builds on:** [Your first program](#/phase-00-start-here/06-your-first-program), where you ran files with `node`, and the stuck routine from [How this course works](#/phase-00-start-here/01-how-this-course-works), whose first step is "reread the error message".

**This unlocks:** Phase 1. From [Values and output](#/phase-01-storing-information/01-values-and-output) onwards, every "Debug this" box expects you to read the error type and line number first. You will use comments to plan programs step by step, starting with [Budget Buddy v1](#/phase-01-storing-information/09-project-budget-buddy-v1), and you will master the whole art of finding bugs in [Debugging](#/phase-08-becoming-a-programmer/02-debugging).
:::

::: challenge Predict the error
Without running them, predict for each program: **will anything print before the error?** And which error type will it be? Then create each one and run it to check.

```js
// A
console.log("One");
console.log("Two");
console.log("Three";
```

```js
// B
console.log("One");
console.log("Two");
consol.log("Three");
```
:::

::: solution
**A** prints **nothing**:
```text
SyntaxError: missing ) after argument list
```
The error is on line 4 (the comment counts as line 1), but because it is a **SyntaxError**, Node refuses to run the file at all. The `One` and `Two` lines never run, even though they are fine.

**B** prints two lines, then the error:
```text
One
Two
```
followed by:
```text
ReferenceError: consol is not defined
```
The `One` and `Two` lines run normally. The `Three` line uses a name Node does not know, so it stops there.

If you got both right, you understand the most useful difference between error types: whether the program started at all.
:::

::: recap
- An error message is help: it says **what** went wrong and **where**.
- Read an error from the top: **file:line**, the copied line, the **caret** (`^`), then the **error type** and **message**. Ignore the `at` lines for now.
- **SyntaxError:** the grammar is broken (a missing quote or bracket, curly quotes). Node refuses to run **any** of the file.
- **ReferenceError:** a name Node does not know, usually a typo or wrong capitals. Lines before it have already run.
- `Error: Cannot find module` means Node could not find the file: check the name and the folder.
- Comments are notes for humans: `// one line` and `/* several lines */`. **Commenting out** switches code off without deleting it (**Ctrl+/** or **Cmd+/**).
- To search, use the error type and message plus "javascript", without your own paths or names.
:::

::: interview Your program printed nothing at all, only an error. What kind of error is it probably, and why?
Probably a **SyntaxError**. Node checks the grammar of the whole file before running any of it, so if the grammar is broken anywhere, not even line 1 runs. Errors like ReferenceError happen while the program runs, so the lines before them would already have printed.
:::

::: interview What does `ReferenceError: consle is not defined` mean?
It means the code used a name, `consle`, that JavaScript does not know. Here it is a typo for `console`. The error also gives the file and line number, so you know exactly where to fix it.
:::

::: interview What are two uses of comments?
First, **notes for humans**: explaining what a program is for or why something is done a certain way. Second, **commenting out** code: putting `//` in front of a line to switch it off temporarily without deleting it, for example to test whether that line causes a problem.
:::

::: checkpoint
- [ ] I made a SyntaxError on purpose and found its file, line number, caret, type and message
- [ ] I made a ReferenceError and noticed that the lines before it still printed
- [ ] I did all four "break it on purpose" changes and wrote down each error type
- [ ] I fixed all four programs in "Debug this"
- [ ] I wrote a program with a block comment and a commented-out line
- [ ] I used Ctrl+/ (or Cmd+/) to comment a line out and back in
:::

::: resources
- **MDN, "JavaScript error reference":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors. A page for every JavaScript error message, with explanations and fixes.
- **MDN, "What went wrong? Troubleshooting JavaScript":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong. A beginner guide to finding and fixing errors.
- **javascript.info, "Code structure":** https://javascript.info/structure. Covers statements, semicolons and comments.
:::
