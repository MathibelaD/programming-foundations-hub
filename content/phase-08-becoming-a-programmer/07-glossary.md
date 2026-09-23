---
title: Glossary
summary: Every term from the course in plain words, from "accumulator" to "while loop", each linked to the lesson that teaches it.
minutes: 15
stage: Phase 8
---

Programming comes with a lot of new words. This page collects every term introduced in the course, in alphabetical order, each with a plain-words definition and a link to the lesson where it is taught properly.

Use it whenever a word in a lesson, an error message or an article looks unfamiliar. The definitions here are short on purpose: they remind you what a word means. For the full story, with examples you can run, follow the link.

::: note How to use this page
- Press **Ctrl+F** (Windows and Linux) or **Cmd+F** (macOS) to search this page for a word.
- Terms that start with a symbol or a dot, such as `.gitignore`, are listed under the first letter of their name.
- Code words, like `filter` or `const`, are listed as you would type them.
- If a word is missing, try the site search at the top of the page, or look it up on MDN (link at the bottom).
:::

## A

**Accumulator**: A variable that collects a running result as a loop goes round, such as a total that starts at 0 and has each item added to it. *See [Loop patterns](#/phase-03-loops/04-loop-patterns).*

**Algorithm**: A step-by-step recipe for solving a problem, precise enough that a computer can follow it. Finding the largest item in a list is an algorithm. *See [Array algorithms by hand](#/phase-05-arrays/04-array-algorithms-by-hand).*

**Argument**: The actual value you hand to a function when you call it. In `greet("Aisha")`, `"Aisha"` is the argument. In the terminal, the extra words after a command are also called arguments. *See [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments).*

**Arithmetic operators**: The maths symbols: `+` add, `-` subtract, `*` multiply, `/` divide, `%` remainder and `**` power. *See [Numbers](#/phase-01-storing-information/04-numbers).*

**Array**: An ordered list of values in one variable, written in square brackets: `[120, 45, 80]`. Each item has a numbered position, starting at 0. *See [Arrays](#/phase-05-arrays/01-what-is-an-array).*

**Array of objects**: A list where each item is an object, such as a list of expenses. The most common shape of real-world data. *See [Arrays of objects](#/phase-06-objects/02-arrays-of-objects).*

**Arrow function**: A short way to write a function: `(a, b) => a + b`. Without curly braces, the value after the arrow is returned automatically. *See [Arrow functions](#/phase-04-functions/05-arrow-functions).*

**Assignment**: Storing a value in a variable with `=`. Work out the right-hand side, then put the result in the name on the left. Read `=` as "gets". *See [Variables](#/phase-01-storing-information/02-variables).*


## B

**Back end**: The part of an app that runs on a server: storing data, handling logins and answering requests. Node.js is often used for it. *See [What to learn next](#/phase-08-becoming-a-programmer/06-what-to-learn-next).*

**Block**: A group of statements between curly braces `{ }`, such as the body of an `if`, a loop or a function. *See [if and else](#/phase-02-making-decisions/02-if-and-else).*

**Boolean**: A value that is either `true` or `false`. Every comparison produces one. *See [Booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined).*

**Bracket notation**: Reading or writing an object property with square brackets and a string: `expense["amount"]` or `totals[category]`. Needed when the key is held in a variable. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**Break**: `break` stops a loop immediately, even if its condition is still true. Used when you have found what you were looking for. *See [break, continue, nested loops](#/phase-03-loops/05-break-continue-nested).*

**Breakpoint**: A marker you put on a line (by clicking the gutter in VS Code) that tells the debugger to pause the program just before that line runs. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Bug**: The difference between what you expected a program to do and what it actually did. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Built-in module**: A module that comes with Node, needing no installation, such as `fs`. Loaded with `require("fs")`. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*


## C

**Call**: Running a function by writing its name followed by brackets: `showMenu()`. Also called invoking it. The code jumps into the function and comes back when it finishes. *See [Why functions exist](#/phase-04-functions/01-why-functions).*

**Callback**: A function you pass to another function, for it to call when it needs to. The function inside `forEach(...)` or `filter(...)` is a callback. *See [Callbacks](#/phase-07-functions-as-values/01-passing-functions-to-functions).*

**camelCase**: The naming style used for JavaScript variables and functions: words joined together, each new word starting with a capital, such as `monthlyIncome`. *See [let and const](#/phase-01-storing-information/03-let-and-const).*

**Chaining**: Calling one method straight after another on the result, such as `expenses.filter(...).map(...)`. It reads like a sentence of steps. *See [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining).*

**Code editor**: A program for writing code, such as VS Code. Unlike a word processor, it saves plain text and helps with colours, indentation and running code. *See [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).*

**Command**: An instruction you type into the terminal, such as `cd`, `ls` or `node hello.js`. *See [The terminal](#/phase-00-start-here/05-the-terminal).*

**Comment**: A note for humans inside code that JavaScript ignores. `//` starts a one-line comment; `/* */` surrounds a longer one. *See [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).*

**Commit**: In Git, one saved snapshot of your project, with a message, the author and the date. Made with `git commit -m "message"`. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**CommonJS**: The module style this course uses, with `require` and `module.exports`. It works in Node with no setup. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**Compare function**: The function you give to `sort` to decide the order of two items. `(a, b) => a - b` sorts numbers from smallest to largest. *See [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining).*

**Comparison operators**: Symbols that compare two values and produce a boolean: `===`, `!==`, `<`, `>`, `<=` and `>=`. *See [Comparing values](#/phase-02-making-decisions/01-comparing-values).*

**Concatenation**: Joining strings together with `+`: `"Hello, " + name`. When one side of `+` is a string, the other side is turned into text too. *See [Strings](#/phase-01-storing-information/05-strings).*

**Condition**: An expression that is checked as true or false to decide what happens next, such as the `age >= 18` in `if (age >= 18)`. *See [if and else](#/phase-02-making-decisions/02-if-and-else).*

**const**: Declares a variable that can never be given a new value. The default choice in this course unless the value needs to change. *See [let and const](#/phase-01-storing-information/03-let-and-const).*

**Continue**: `continue` skips the rest of the current trip round a loop and moves straight on to the next one. *See [break, continue, nested loops](#/phase-03-loops/05-break-continue-nested).*

**Counter**: A variable that counts how many times something happens, usually starting at 0 and going up by 1. *See [Loop patterns](#/phase-03-loops/04-loop-patterns).*

**CSV**: "Comma-separated values": plain text with one record per line and commas between the values. Spreadsheet programs can open it. *See [Strings and arrays](#/phase-05-arrays/05-strings-and-arrays).*


## D

**Data type**: The kind of a value, which decides what you can do with it: number, string, boolean, undefined, null, object and so on. `typeof` tells you the type. *See [Booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined).*

**Debugger**: A tool that pauses a running program so you can look at every variable and run it one line at a time. VS Code has one built in for Node. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Debugging**: The process of finding the cause of a bug and fixing it. Best done like a scientist: observe, guess, test, repeat. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Declaration**: Creating a variable (with `let` or `const`) or a function (with `function name() {}`). *See [Variables](#/phase-01-storing-information/02-variables).*

**Default parameter**: A value a parameter uses when no argument is given: `function greet(name = "friend")`. *See [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments).*

**Dependency**: A package that your project needs to run, listed under `dependencies` in `package.json`. *See [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).*

**Destructuring**: Picking named properties out of an object into variables in one go: `const { formatMoney } = require("./money");`. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**Dot notation**: Reading or writing a property with a dot: `expense.amount`. Also used to call methods: `name.toUpperCase()`. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**Double**: A number stored in 64 bits, with about 15 to 17 significant digits. Every JavaScript number is a double. *See [Numbers](#/phase-01-storing-information/04-numbers).*

**do...while**: A loop that runs its body once before checking the condition, so it always runs at least once. *See [break, continue, nested loops](#/phase-03-loops/05-break-continue-nested).*


## E

**Edge case**: An unusual input at the limits of what is allowed, such as an empty list, zero or a negative number. Bugs love edge cases. *See [Solving problems](#/phase-08-becoming-a-programmer/01-solving-problems).*

**Element**: One item in an array. Also called an item. *See [Arrays](#/phase-05-arrays/01-what-is-an-array).*

**else if**: Adds another condition to an `if` chain, checked only when the ones above it were false. *See [if and else](#/phase-02-making-decisions/02-if-and-else).*

**Error message**: What Node prints when it cannot run your code: the file and line, a caret `^` pointing at the spot, the error type (such as `SyntaxError`) and a description. *See [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).*

**Escape character**: A backslash `\` that gives the next character a special meaning inside a string, such as `\n` for a new line or `\"` for a quote. *See [Strings](#/phase-01-storing-information/05-strings).*

**Export**: Making something from a file available to other files. In Node, you do it with `module.exports`. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**Expression**: Any piece of code that produces a value, such as `2 + 3`, `price * 1.15` or `age >= 18`. *See [Values and output](#/phase-01-storing-information/01-values-and-output).*


## F

**Factory function**: A function that creates and returns a new object, such as `createExpense(description, amount, category)`. *See [Objects and functions](#/phase-06-objects/03-objects-and-functions).*

**Fall-through**: In a `switch`, when a missing `break` lets the code carry on into the next `case`. *See [switch and ternary](#/phase-02-making-decisions/05-switch-and-ternary).*

**Falsy**: A value that counts as false in a condition. There are six: `false`, `0`, `""`, `null`, `undefined` and `NaN`. *See [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy).*

**File extension**: The letters after the last dot in a file name, such as `.js` or `.json`, which tell programs what kind of file it is. *See [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).*

**filter**: An array method that returns a new array containing only the items for which the callback returns `true`. *See [filter](#/phase-07-functions-as-values/04-filter).*

**find**: An array method that returns the first item for which the callback returns `true`, or `undefined` if there is none. `findIndex` returns its position, or `-1`. *See [find, some, every](#/phase-07-functions-as-values/05-find-some-every).*

**Flag**: A boolean variable that remembers whether something has happened yet, such as `found = true`. *See [Loop patterns](#/phase-03-loops/04-loop-patterns).*

**Float**: A number stored in 32 bits, with about 7 significant digits. Used in languages like C# and C. JavaScript does not use them. *See [Numbers](#/phase-01-storing-information/04-numbers).*

**for loop**: A loop with three parts in its brackets: a start, a condition to keep going, and a step: `for (let i = 0; i < 5; i++)`. Best when you know how many times to repeat. *See [The for loop](#/phase-03-loops/03-for-loops).*

**forEach**: An array method that calls a callback once for each item. A loop with the action passed in. *See [forEach](#/phase-07-functions-as-values/02-foreach).*

**for...in**: A loop over the keys of an object. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**for...of**: A loop over the items of an array (or the characters of a string), when you do not need the index. *See [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays).*

**Framework**: A large set of ready-made code that shapes how you build a certain kind of app, such as React for web pages. Best learned after the foundations. *See [What to learn next](#/phase-08-becoming-a-programmer/06-what-to-learn-next).*

**Front end**: The part of an app that people see and use, such as a web page in a browser. Built with HTML, CSS and JavaScript. *See [What to learn next](#/phase-08-becoming-a-programmer/06-what-to-learn-next).*

**fs**: Node's built-in module for working with files, such as `fs.readFileSync` and `fs.writeFileSync`. *See [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json).*

**Function**: A named, reusable set of steps. You declare it once and call it as often as you like, optionally passing arguments in and getting a value back. *See [Why functions exist](#/phase-04-functions/01-why-functions).*

**Function expression**: A function stored in a variable, such as `const add = function (a, b) { return a + b; };`. Arrow functions are a shorter form. *See [Arrow functions](#/phase-04-functions/05-arrow-functions).*


## G

**Git**: A version control program that records snapshots (commits) of your project over time, so you can see what changed and go back. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**git diff**: The Git command that shows exactly which lines changed since the last commit: `+` for added lines, `-` for removed ones. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**GitHub**: A website for storing Git repositories online, to back them up, share them and work on them with others. Not the same thing as Git. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**.gitignore**: A file listing files and folders that Git should ignore, such as `node_modules/`. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**Global variable**: A variable created outside every function and block, which the whole file can see. Too many of them make bugs hard to find. *See [Scope](#/phase-04-functions/04-scope).*


## H

**Hash**: In Git, the unique ID of a commit, such as `8b842d1`. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**Hoisting**: The reason a function declaration can be called before the line where it is written. Function expressions and arrow functions cannot. *See [Arrow functions](#/phase-04-functions/05-arrow-functions).*


## I

**if**: Runs a block of code only when its condition is true. Can be followed by `else if` and `else`. *See [if and else](#/phase-02-making-decisions/02-if-and-else).*

**Immutable**: Cannot be changed. Strings are immutable: methods like `toUpperCase` return a new string and leave the original alone. *See [Strings](#/phase-01-storing-information/05-strings).*

**Implicit return**: When an arrow function without curly braces returns its value automatically: `n => n * 2`. *See [Arrow functions](#/phase-04-functions/05-arrow-functions).*

**Import**: Bringing something another file exported into this one. In Node's CommonJS style, you import with `require`. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**Index**: The numbered position of a character in a string or an item in an array, counting from 0. *See [Arrays](#/phase-05-arrays/01-what-is-an-array).*

**Infinite loop**: A loop whose condition never becomes false, so it never stops. Stop it with Ctrl+C. *See [The while loop](#/phase-03-loops/02-while-loops).*

**Input validation**: Checking that what the user typed makes sense (for example, a number that is not negative) before using it, and asking again if not. *See [The while loop](#/phase-03-loops/02-while-loops).*

**Integer**: A whole number, with no decimal part, such as `7` or `-120`. *See [Numbers](#/phase-01-storing-information/04-numbers).*

**Iteration**: One trip round a loop. A loop that runs five times does five iterations. *See [Why loops exist](#/phase-03-loops/01-why-loops).*


## J

**JavaScript**: The programming language used in this course. It runs in every web browser, and on computers through Node.js. *See [What is programming?](#/phase-00-start-here/02-what-is-programming).*

**JSON**: "JavaScript Object Notation": a text format for data that looks like JavaScript objects and arrays. Used for saving files and for data sent between apps. *See [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json).*


## K

**Key**: The name part of an object property. In `{ amount: 28 }`, the key is `amount`. *See [Objects](#/phase-06-objects/01-what-is-an-object).*


## L

**let**: Declares a variable whose value can be changed later. *See [let and const](#/phase-01-storing-information/03-let-and-const).*

**Local variable**: A variable created inside a function or block. It only exists there. *See [Scope](#/phase-04-functions/04-scope).*

**Logical operators**: `&&` (and), `||` (or) and `!` (not), used to combine or flip conditions. *See [and, or, not](#/phase-02-making-decisions/03-combining-conditions).*

**Loop**: Code that repeats a block of statements while a condition stays true, or once for each item in a list. *See [Why loops exist](#/phase-03-loops/01-why-loops).*

**Loop body**: The statements inside a loop's curly braces, which run on every iteration. *See [Why loops exist](#/phase-03-loops/01-why-loops).*

**LTS**: "Long-term support": the version of Node that gets fixes for the longest, and the one beginners should install. *See [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).*


## M

**map**: An array method that returns a new array of the same length, with each item transformed by the callback. *See [map](#/phase-07-functions-as-values/03-map).*

**Markdown**: A simple way to format plain text: `#` for headings, `-` for bullet points, backticks for code. README files are usually written in it. *See [Budget Buddy, finished](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final).*

**Menu loop**: A loop that shows options, reads a choice, acts on it and repeats until the user chooses to quit. *See [break, continue, nested loops](#/phase-03-loops/05-break-continue-nested).*

**Method**: A function that belongs to an object, called with a dot: `name.toUpperCase()`, `expenses.push(item)`. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**Module**: A file whose code can be shared with other files. Everything in it is private until it is exported. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**module.exports**: The property that holds whatever a Node file hands out to files that `require` it. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*


## N

**NaN**: "Not a Number": the value you get when a calculation or conversion does not make sense, such as `Number("abc")`. Check for it with `Number.isNaN`. *See [Converting between types](#/phase-01-storing-information/07-converting-between-types).*

**Nested loop**: A loop inside another loop. The inner loop runs completely for each iteration of the outer one. *See [break, continue, nested loops](#/phase-03-loops/05-break-continue-nested).*

**Node.js**: The program that runs JavaScript outside a web browser, on your own computer. You use it with `node file.js`. *See [What is programming?](#/phase-00-start-here/02-what-is-programming).*

**node_modules**: The folder where npm puts installed packages. Never shared or saved in Git, because `npm install` can recreate it. *See [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).*

**npm**: Node's package manager, which installs packages (`npm install`) and runs scripts (`npm start`). Like an app store for code. *See [Your first program](#/phase-00-start-here/06-your-first-program).*

**null**: A value that means "deliberately empty". You set it on purpose. *See [Booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined).*


## O

**Object**: A group of related values stored under names (keys), written in curly braces: `{ description: "Taxi", amount: 28 }`. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**Off-by-one error**: A bug where a loop runs one time too many or too few, often from using `<=` instead of `<`. *See [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays).*

**Operator precedence**: The order in which operators are worked out, such as `*` before `+`. Brackets change it. *See [Numbers](#/phase-01-storing-information/04-numbers).*


## P

**Package**: Code someone else wrote and shared, which you install with npm, such as `prompt-sync`. *See [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).*

**package.json**: The file that describes a Node project: its name, version, scripts and dependencies. Created by `npm init -y`. *See [Your first program](#/phase-00-start-here/06-your-first-program).*

**Parameter**: A placeholder name in a function's definition that receives an argument when the function is called. In `function greet(name)`, `name` is the parameter. *See [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments).*

**Path**: The address of a file or folder. An absolute path starts from the top of the drive; a relative path starts from where you are now. *See [The terminal](#/phase-00-start-here/05-the-terminal).*

**Program**: A written list of instructions that a computer follows exactly, in order. *See [What is programming?](#/phase-00-start-here/02-what-is-programming).*

**Programming language**: A strict language that both people and computers can read, used to write programs. JavaScript, Python and C# are programming languages. *See [What is programming?](#/phase-00-start-here/02-what-is-programming).*

**prompt**: The function from the `prompt-sync` package that asks a question in the terminal and returns the answer. It always returns a string. *See [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).*

**Property**: One named value inside an object: a key and its value. *See [Objects](#/phase-06-objects/01-what-is-an-object).*

**Pseudocode**: A plan written in plain words with a code-like structure, before writing real code. It has no rules and cannot have errors. *See [Solving problems](#/phase-08-becoming-a-programmer/01-solving-problems).*

**Pure function**: A function that always gives the same output for the same input and does nothing else: no printing, no asking, no changing things outside it. *See [Designing with functions](#/phase-04-functions/06-designing-with-functions).*


## R

**README**: A file, usually `README.md`, that explains a project to newcomers: what it does, how to run it and how it is organised. *See [Budget Buddy, finished](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final).*

**reduce**: An array method that boils a list down to one value, such as a total, by passing an accumulator from item to item. *See [reduce](#/phase-07-functions-as-values/06-reduce).*

**Refactoring**: Changing how code is organised without changing what it does. *See [Budget Buddy v4](#/phase-04-functions/07-project-budget-buddy-v4).*

**Reference**: What a variable holds for an array or object: the address of the data, not a copy of it. Two variables can refer to the same array. *See [Copies and references](#/phase-06-objects/04-values-and-references).*

**REPL**: "Read, evaluate, print, loop": an interactive prompt where you type JavaScript one line at a time and see the result. Start it by typing `node`. *See [Your first program](#/phase-00-start-here/06-your-first-program).*

**Repository**: A project folder that Git is tracking, with its history in a hidden `.git` folder. Often shortened to repo. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**require**: The Node function that loads a module and returns what it exports: `require("fs")`, `require("prompt-sync")`, `require("./money")`. *See [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files).*

**Return value**: The value a function hands back to the code that called it, using `return`. Different from printing it with `console.log`. *See [Return values](#/phase-04-functions/03-return-values).*

**Rubber duck debugging**: Explaining your code out loud, line by line, to an object or a person. You often hear the bug yourself halfway through. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*


## S

**Scope**: Where in the code a variable exists and can be used. Variables made inside a function or block only exist there. *See [Scope](#/phase-04-functions/04-scope).*

**Script (npm)**: A named command in `package.json` under `scripts`, run with `npm start` or `npm run name`. *See [Your first program](#/phase-00-start-here/06-your-first-program).*

**Shadowing**: When a variable inside a function or block has the same name as one outside, hiding the outer one while inside. *See [Scope](#/phase-04-functions/04-scope).*

**Shallow copy**: A new array or object made with spread, such as `[...list]` or `{...obj}`. The top level is new, but objects inside it are still shared. *See [Copies and references](#/phase-06-objects/04-values-and-references).*

**some and every**: Array methods that answer yes or no: `some` returns `true` if any item passes the test, `every` if all of them do. *See [find, some, every](#/phase-07-functions-as-values/05-find-some-every).*

**sort**: An array method that puts items in order. It changes the original array, and without a compare function it sorts as text. *See [sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining).*

**splice**: An array method that removes (or inserts) items at a given position, changing the original array. *See [Changing arrays](#/phase-05-arrays/02-changing-arrays).*

**split and join**: `split` breaks a string into an array at a separator; `join` glues an array's items into one string. *See [Strings and arrays](#/phase-05-arrays/05-strings-and-arrays).*

**Spread**: The `...` syntax that copies the items of an array or the properties of an object into a new one: `[...expenses]`. *See [Copies and references](#/phase-06-objects/04-values-and-references).*

**Stack trace**: The list of function calls that were in progress when an error happened, with file and line numbers, starting with where it broke. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Staging area**: In Git, the set of changes you have chosen with `git add` to go into the next commit. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**Statement**: One complete instruction, usually one line ending in `;`, such as `let total = 0;`. *See [Values and output](#/phase-01-storing-information/01-values-and-output).*

**Statically typed**: Describes languages such as C#, where you write each variable's type in the code and mistakes are caught before the program runs. JavaScript and Python are dynamically typed. *See [What to learn next](#/phase-08-becoming-a-programmer/06-what-to-learn-next).*

**Stepping**: Running a paused program one line at a time in the debugger, with Step Over, Step Into and Step Out. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**Strict equality**: `===`: checks whether two values are the same, without converting types. Use it instead of `==`. *See [Comparing values](#/phase-02-making-decisions/01-comparing-values).*

**String**: A piece of text, written in quotes: `"hello"`, `'hello'` or `` `hello` ``. *See [Strings](#/phase-01-storing-information/05-strings).*

**switch**: Picks one of several blocks of code by comparing a value against exact `case` values. *See [switch and ternary](#/phase-02-making-decisions/05-switch-and-ternary).*

**SyntaxError**: An error meaning the code breaks the grammar rules of JavaScript, such as a missing quote or bracket, so it cannot run at all. *See [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).*


## T

**Template literal**: A string in backticks that can contain `${...}` to put values inside it: `` `Total: R${total}` ``. *See [Strings](#/phase-01-storing-information/05-strings).*

**Terminal**: A text window where you type commands to the computer. Also called the command line or console. *See [The terminal](#/phase-00-start-here/05-the-terminal).*

**Ternary operator**: A short way to choose between two values: `condition ? valueIfTrue : valueIfFalse`. *See [switch and ternary](#/phase-02-making-decisions/05-switch-and-ternary).*

**this**: Inside a method, `this` means the object the method was called on. *See [Objects and functions](#/phase-06-objects/03-objects-and-functions).*

**Trace table**: A table you fill in by hand showing the value of every variable at each step of a loop. A great way to understand or debug one. *See [The while loop](#/phase-03-loops/02-while-loops).*

**Truthy**: Any value that counts as true in a condition: everything that is not falsy, including `"0"` and `[]`. *See [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy).*

**try...catch**: A safety net: code in `try` runs, and if it throws an error, the code in `catch` runs instead of the program crashing. *See [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json).*

**Type conversion**: Turning a value of one type into another, such as `Number("25")` or `String(25)`. Input from users and files is text until you convert it. *See [Converting between types](#/phase-01-storing-information/07-converting-between-types).*

**typeof**: An operator that tells you a value's type as a string: `typeof 42` is `"number"`. *See [Booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined).*


## U

**undefined**: The value of something that exists but has not been given a value, such as a declared variable or a missing property. *See [Booleans, null and undefined](#/phase-01-storing-information/06-booleans-null-undefined).*


## V

**Value**: A single piece of information, such as `42`, `"hello"` or `true`. *See [Values and output](#/phase-01-storing-information/01-values-and-output).*

**var**: The old way of declaring variables in JavaScript. It has confusing rules, so this course uses `let` and `const` instead. *See [let and const](#/phase-01-storing-information/03-let-and-const).*

**Variable**: A named box that holds a value, so a program can remember it and use it later. *See [Variables](#/phase-01-storing-information/02-variables).*

**Version control**: A system that records the changes to a project over time, so you can see who changed what and go back to any earlier version. Git is the most popular. *See [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).*

**VS Code**: Visual Studio Code, the free code editor used in this course. *See [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).*


## W

**Watch**: In the debugger, an expression you ask VS Code to show and update every time the program pauses, such as `numbers[i]`. *See [Debugging](#/phase-08-becoming-a-programmer/02-debugging).*

**while loop**: A loop that keeps going as long as its condition is true. Best when you do not know in advance how many times to repeat. *See [The while loop](#/phase-03-loops/02-while-loops).*

::: resources
- **MDN Web Docs, JavaScript Guide:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide. The reference for every JavaScript word on this page, and many more.
- **javascript.info:** https://javascript.info/. Clear explanations of each term, with extra exercises.
- **MDN Glossary:** https://developer.mozilla.org/en-US/docs/Glossary. Short definitions of hundreds of web and programming terms, for when you move beyond this course.
:::
