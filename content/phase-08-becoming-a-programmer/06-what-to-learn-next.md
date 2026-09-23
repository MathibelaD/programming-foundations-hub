---
title: What to learn next
summary: Look at how far you have come, see how your skills carry over to other languages, and choose where to go from here.
minutes: 40
stage: Phase 8
---

## What you will learn

- What you can now do, described as the real skills they are
- How the same loop and function look in JavaScript, Python and C#, and why that means you already know more than one language
- The main paths you can take next (web, back end, other languages) and the topics you will meet on each
- Where to keep practising: resources, small project ideas, Exercism and Codewars

**Before this:** [Project: Budget Buddy, finished](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final). You have finished the course project.

## You did it

Stop for a moment and look back.

At the start of this course, you may not have known what a terminal was, or why a file needs to end in `.js`. Now you have written, run, broken, debugged, reorganised and saved in Git a program of more than 200 lines, split into modules, that stores data between runs and reports on it with array methods.

That is not "a bit of coding". That is programming.

It is also normal to feel that you know less than you should. Almost every programmer feels that, at every level, because the field is enormous. The feeling does not mean you are behind. It means you can now see how much there is, which is exactly where you need to be to keep going.

::: analogy Learning to drive
When you learn to drive, you learn in one car. But what you actually learn is not "how to drive a white Polo". You learn steering, braking, mirrors, gears, reading the road and judging distances.

Once you can drive, getting into a different car takes minutes: the indicator stalk is on the other side, the handbrake is a button, the seat adjusts differently. The skill is the same.

You learned programming in JavaScript. But what you learned is variables, decisions, loops, functions, lists, records and breaking problems down. Other programming languages are different cars. The controls are in slightly different places, and you already know how to drive.
:::

## What you can now do

Here is what you can do, written the way a job advert or a project would describe it:

- **Break a problem into steps** and plan a solution before writing code.
- **Store and transform data** with variables, numbers, strings and type conversions.
- **Make programs decide** with conditions, and validate input so that bad data does not break them.
- **Repeat work** with loops, including input loops and menus.
- **Write reusable functions** with parameters and return values, and keep them small and focused.
- **Work with collections of records** (arrays of objects), the shape of almost all real-world data.
- **Filter, transform, sort and summarise data** with `filter`, `map`, `sort` and `reduce`.
- **Save and load data** as JSON files.
- **Debug calmly**, with labelled logs, stack traces and the VS Code debugger.
- **Organise code into modules**, and use packages from npm.
- **Track your work with Git**, with a clean history of meaningful commits.
- **Read error messages and documentation**, and find answers on your own.

The last one may be the most valuable of all.

## The ideas transfer: one program, three languages

Here is a small program you could have written in Phase 5: print a numbered list of expenses, then their total using a function. Below is the same program in **JavaScript**, **Python** and **C#** (pronounced "C sharp"). Read them slowly and look for what is the same.

**JavaScript**

```js
function totalSpent(amounts) {
  let total = 0;
  for (const amount of amounts) {
    total = total + amount;
  }
  return total;
}

const amounts = [120, 45, 80];

for (let i = 0; i < amounts.length; i++) {
  console.log(`Expense ${i + 1}: R${amounts[i]}`);
}

console.log(`Total: R${totalSpent(amounts)}`);
```

**Python**

```python
def total_spent(amounts):
    total = 0
    for amount in amounts:
        total = total + amount
    return total


amounts = [120, 45, 80]

for i in range(len(amounts)):
    print(f"Expense {i + 1}: R{amounts[i]}")

print(f"Total: R{total_spent(amounts)}")
```

**C#**

```csharp
double TotalSpent(double[] amounts)
{
    double total = 0;
    foreach (double amount in amounts)
    {
        total = total + amount;
    }
    return total;
}

double[] amounts = { 120, 45, 80 };

for (int i = 0; i < amounts.Length; i++)
{
    Console.WriteLine($"Expense {i + 1}: R{amounts[i]}");
}

Console.WriteLine($"Total: R{TotalSpent(amounts)}");
```

All three print exactly the same thing. (You do not need to install Python or C# to follow this lesson. The C# version runs inside a console project made with the free .NET SDK, if you ever want to try it.)

```text
Expense 1: R120
Expense 2: R45
Expense 3: R80
Total: R245
```

### What is the same

- A **function** that takes a list, uses an **accumulator** starting at `0`, loops over every item, and **returns** the total. That is the accumulator pattern from [Loop patterns](#/phase-03-loops/04-loop-patterns), identical in all three.
- A **list** written in square brackets or curly braces, with items counted **from 0**.
- A **counting loop** from 0 up to (but not including) the length, and `i + 1` to number the items from 1 for humans.
- A way of putting values inside text: `` `…${x}…` `` in JavaScript, `f"…{x}…"` in Python, `$"…{x}…"` in C#. Three spellings of the template literal.

### What is different

| | JavaScript | Python | C# |
|---|---|---|---|
| Printing | `console.log(…)` | `print(…)` | `Console.WriteLine(…)` |
| Making a function | `function totalSpent(…)` | `def total_spent(…):` | `double TotalSpent(…)` |
| Blocks | `{ }` | **indentation** and `:` | `{ }` |
| Loop over items | `for (const x of list)` | `for x in list:` | `foreach (double x in list)` |
| List length | `.length` | `len(list)` | `.Length` |
| Types | worked out as the program runs | worked out as the program runs | **written in the code**: `double`, `int`, `double[]` |
| Naming style | `camelCase` | `snake_case` | `PascalCase` for functions |

Two differences are worth a closer look:

- **Python uses indentation instead of braces.** The lines that belong inside a loop or function are the ones indented under it. You have been indenting your JavaScript neatly all along for humans; in Python, the computer relies on it too.
- **C# makes you state types.** `double total = 0;` says "`total` will always hold a `double`". If you later try to put text in it, C# refuses before the program even runs. You met `double` in [Numbers](#/phase-01-storing-information/04-numbers): it is the same 64-bit number JavaScript uses for everything. Languages like C# are called **statically typed**. JavaScript and Python are **dynamically typed**.

Array methods transfer too. Here is "keep only the amounts over R50" in each language:

```js
const big = amounts.filter((amount) => amount > 50);
```

```python
big = [amount for amount in amounts if amount > 50]
```

```csharp
var big = amounts.Where(amount => amount > 50).ToList();
```

The C# version even uses an arrow: `amount => amount > 50` is an arrow function, called a **lambda** in C#. The idea of passing a small function that answers "keep this one?" is exactly what you learned in [filter](#/phase-07-functions-as-values/04-filter).

::: try Run the program in two languages
1. In `coding-practice/phase-8/`, create `three-languages.js` with the JavaScript version above. Run it with `node phase-8/three-languages.js` and check you see the four lines of output.
2. Now try the Python version without installing anything. Go to https://pythontutor.com/, choose to visualise **Python**, paste in the Python version, and click **Visualize Execution**. Step through it with **Next** and watch `total` grow, exactly as your JavaScript accumulator does.
3. **Change, predict, run:** in the Python version, add `55` to the list. Before you run it, predict all five lines of output. Then run it.
4. **Try breaking Python on purpose:** remove the indentation from the line `total = total + amount` so it lines up with `for`. What happens? Read the error, as you learned to in Phase 0. (Python refuses to run, with an `IndentationError`. In Python, indentation is part of the grammar.)
:::

## Where you can go next

There is no single right next step. Pick the direction that excites you, because interest is what keeps you going. Here are the three most common paths.

### Path 1: the web (front end)

**Front-end** development means building what people see and click in a web browser.

1. **HTML**: the structure and content of a page (headings, paragraphs, buttons, forms).
2. **CSS**: how it looks (colours, layout, fonts, making it work on phones).
3. **The DOM** ("Document Object Model"): how JavaScript in the browser reads and changes the page. `document.querySelector` finds an element, and an **event listener** is a callback that runs when someone clicks it. You already understand callbacks from Phase 7.
4. **JavaScript in the browser**: everything from this course, now reacting to clicks and typing instead of `prompt`.
5. Later: a **framework** such as React, which helps organise large web apps.

A great first project: turn Budget Buddy into a web page, with a form for adding expenses and a table showing them.

### Path 2: the back end (servers)

**Back-end** development means the programs that run on servers: storing data, handling logins, and answering requests from apps and websites.

1. **More Node.js**: you already know it. Read files, use more of npm.
2. **Express**: a popular package for building a web server in Node. A server is, at heart, a program that receives a request and runs a function to build the reply. That is a callback again.
3. **APIs**: servers that reply with JSON instead of web pages. You already know JSON.
4. **Databases**: proper storage for lots of data, instead of one JSON file. Budget Buddy's `storage.js` is exactly the module you would swap out.

### Path 3: another language

- **Python** is popular for data analysis, automation, science and AI. Its syntax is gentle, and you have seen above that you can already read it.
- **C#** is used for business software, Windows apps, games (with the Unity engine) and web back ends with .NET. It will teach you about types in depth.
- Learning a second language is one of the best things you can do. It shows you which parts of what you know are **programming** and which parts are only **JavaScript**.

### Topics you will meet on any path

Each of these is a name to look up when you are ready. You do not need any of them yet.

- **Classes**: a way to create many objects of the same shape, with methods built in. A bit like `createExpense`, with more structure.
- **Asynchronous code** (**promises** and **`async`/`await`**): code that starts a slow job, like downloading data, and carries on with other work while it waits. It is how JavaScript handles the internet.
- **Testing**: writing small programs that check your functions automatically, like the `check(actual, expected)` helper from Phase 4, but with proper tools such as Node's built-in test runner.
- **Data structures and algorithms**: well-known ways of storing and searching data efficiently (stacks, queues, maps, trees), and how to reason about how fast code is.
- **TypeScript**: JavaScript with types written in, a bit like C#. Very popular in larger projects.
- **Error handling** with `try`/`catch`: dealing with things that go wrong at runtime, such as a broken JSON file, without crashing.

## Curated resources

All of these are free (or have free versions). Pick one or two, not all of them.

| Resource | Best for |
|---|---|
| **MDN Web Docs**, https://developer.mozilla.org/en-US/docs/Learn_web_development | Looking things up, and the web path (HTML, CSS, browser JavaScript). The reference professionals use every day. |
| **javascript.info**, https://javascript.info/ | Going deeper into JavaScript itself, one clear chapter at a time. Covers classes, promises and async/await well. |
| **Eloquent JavaScript**, https://eloquentjavascript.net/ | A free book that goes further and deeper than this course. Challenging, and excellent once you have the basics (which you now do). |
| **The Odin Project**, https://www.theodinproject.com/paths/foundations/courses/foundations | A complete, project-based path into web development, including Git and GitHub. |
| **freeCodeCamp**, https://www.freecodecamp.org/learn | Structured, browser-based courses with certificates, including responsive web design and JavaScript. |
| **CS50**, https://cs50.harvard.edu/x/ | Harvard's famous introduction to computer science. Starts in C, then Python and web. Hard, and worth it. |
| **Python's official tutorial**, https://docs.python.org/3/tutorial/ | Learning Python properly once you know the basics of programming. |
| **Microsoft Learn: C#**, https://learn.microsoft.com/en-us/dotnet/csharp/ | Learning C# and .NET from the people who make them. |
| **Python Tutor**, https://pythontutor.com/ | Seeing any small program run step by step, in JavaScript, Python and other languages. |

## Keep practising

Reading about programming is pleasant. **Writing programs** is what makes you a programmer. A little every day beats a lot once a month.

### Small projects to build

Each of these uses only what you know now. Plan them with the [problem-solving method](#/phase-08-becoming-a-programmer/01-solving-problems), split them into modules, and track them in Git.

- **To-do list.** Add, list, complete and delete tasks, saved to a JSON file. (Arrays of objects, a menu loop, `fs`.)
- **Quiz game.** Questions and answers stored as an array of objects. Ask each one, keep score, and show the result at the end. Shuffle the questions for a challenge. (Loops, `prompt`, objects.)
- **Unit converter.** Kilometres to miles, Celsius to Fahrenheit, rand to another currency. A menu to choose, and one small pure function per conversion. (Functions, validation.)
- **Text adventure.** Rooms stored as objects with descriptions and exits (`{ north: "kitchen" }`). The player types directions and explores. (Objects, bracket notation, a game loop.)
- **Grade book.** Learners and their marks; averages, symbols, the top learner, and who needs help. (Arrays of objects, `map`, `filter`, `reduce`, `sort`.)
- **Recipe scaler.** A recipe for 4 people, rescaled for any number, with sensible rounding. (Numbers, `map`.)

### Practice sites

- **Exercism**, https://exercism.org/tracks/javascript. Hundreds of small exercises with automatic tests, run in the browser or on your own computer. You can ask for **free feedback from human mentors** on your solutions. Probably the best next step straight after this course.
- **Codewars**, https://www.codewars.com/. Short puzzles called **katas**, ranked from **8 kyu** (easiest) up to 1 kyu. Start with 8 kyu and 7 kyu. After you solve one, you can see other people's solutions, which is a wonderful way to learn new tricks. (Do not be discouraged by very clever one-line answers. Readable beats clever.)

::: exercise Level 1 — Guided · Make a plan
Knowing where you are going makes it much more likely that you keep going. In `coding-practice/phase-8/`, create a file called `my-plan.md` (Markdown, like a README) and write:

1. Which **path** interests you most right now (web, back end, another language), and one sentence on why.
2. Which **one resource** from the table you will start with.
3. Which **one project** from the list (or your own idea) you will build first.
4. How much time you will spend, and when: for example, "30 minutes, Monday to Friday, before work".
5. Sign up for **Exercism** or **Codewars** and solve **one** exercise. Write down its name.

Commit the file to Git with the message `Add my learning plan`.
:::

::: mistake
**Tutorial hopping.** Starting a new course every week, never finishing any, never building anything of your own. One resource plus your own projects beats five half-finished courses.

**Waiting until you feel ready.** Nobody feels ready. Build the small project now, badly, and improve it.

**Jumping straight to a framework.** React, Express and the rest are much easier when the foundations are solid. You have the foundations; add HTML, CSS and the DOM (or plain Node servers) before frameworks.

**Comparing your first month to someone else's fifth year.** Compare yourself to where you were at the start of this course.

**Stopping completely.** Skills fade without use. Even 15 minutes a day keeps them alive.
:::

## Real-world uses

What you learned in this course is used, almost unchanged, in:

- **Web apps**: every online shop's cart is an array of objects, filtered, mapped and reduced.
- **Mobile apps**: settings, messages and contact lists are objects and arrays, loaded from and saved to JSON.
- **Data work**: analysts filter, group and summarise data in Python using exactly the patterns you learned with `filter` and `reduce`.
- **Automation**: small scripts that rename files, tidy spreadsheets or send reminders are loops, conditions and functions.
- **Games**: game loops, scores, lives and inventories are variables, loops, arrays and objects.

::: connect
**This builds on:** the whole course, from your first `console.log` in [Your first program](#/phase-00-start-here/06-your-first-program) to the finished [Budget Buddy](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final).

**This unlocks:** whatever you choose next. When a new word confuses you along the way, the [Glossary](#/phase-08-becoming-a-programmer/07-glossary) has every term from this course in plain words.
:::

::: challenge Translate one of your own functions
Pick a function you wrote in this course, such as `countVowels`, `isPalindrome` or `statusFor`, and write it in **Python**, using the side-by-side examples above as your guide. Run it in Python Tutor.

You will need: `def name(parameters):` instead of `function`, indentation instead of braces, `if …:`, `elif …:` and `else:` instead of `if`, `else if` and `else`, and `and`, `or` and `not` instead of `&&`, `||` and `!`. Lower-casing text is `text.lower()`, and checking if a character is in a string is `ch in "aeiou"`.
:::

::: solution
Here is `countVowels` and `statusFor` in Python:

```python
def count_vowels(text):
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count = count + 1
    return count


def status_for(income, left):
    if left < 0:
        return "OVERSPENT"
    elif left > income * 0.2:
        return "HEALTHY"
    else:
        return "TIGHT"


print(count_vowels("Johannesburg"))
print(status_for(10000, 3000))
print(status_for(10000, -50))
```
Output:
```text
4
HEALTHY
OVERSPENT
```
Compare them line by line with your JavaScript. The **thinking** is identical. Only the spelling changed. That is the whole point of this lesson.
:::

::: recap
- You can now plan, write, debug, organise and save real programs. Those are real skills.
- Programming ideas (variables, decisions, loops, functions, lists, records, callbacks) are **the same in every mainstream language**. Only the spelling changes.
- Python uses indentation instead of braces. C# makes you write types such as `double` and `int`.
- Next paths: **web** (HTML, CSS, the DOM), **back end** (Node, Express, databases), or **another language** (Python, C#).
- Topics to meet later: classes, async code (promises, `async`/`await`), testing, data structures, TypeScript.
- Pick **one** resource and **your own small projects**, and practise a little every day on Exercism or Codewars.
:::

::: interview Why is learning a second programming language easier than the first?
Because most of what you learned the first time was programming itself: storing values, making decisions, repeating, breaking problems into functions, and working with lists and records. A new language mostly changes the spelling and a few rules, like indentation in Python or types in C#.
:::

::: interview What is one real difference between JavaScript and C#?
C# is statically typed: you declare what type each variable holds (`double total = 0;`), and the compiler rejects code that puts the wrong type in before the program runs. JavaScript works out types while the program runs, so the same mistake only shows up (if at all) when that line executes.
:::

::: checkpoint
- [ ] I read the list of skills and can honestly say "I can do that" to most of them
- [ ] I ran the three-languages program in JavaScript, and the Python version in Python Tutor
- [ ] I found at least three things that are the same in the JavaScript, Python and C# versions
- [ ] I wrote `my-plan.md` with a path, a resource, a project and a schedule, and committed it
- [ ] I solved one exercise on Exercism or Codewars
:::

::: resources
- **Exercism, JavaScript track:** https://exercism.org/tracks/javascript. Your next step for regular practice, with free mentoring.
- **Codewars:** https://www.codewars.com/. Small daily puzzles. Start at 8 kyu.
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. The natural next course if you choose the web path.
- **Eloquent JavaScript:** https://eloquentjavascript.net/. To go deeper into JavaScript, including the topics listed above.
:::
