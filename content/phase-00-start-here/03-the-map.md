---
title: The map — what you will learn, and how it all connects
summary: Every phase at a glance, the question each one answers, what it needs from before, and why the order matters. Come back here whenever you feel lost.
minutes: 25
stage: Phase 0
---

## What you will learn

- The whole course on one page: nine phases, each building on the one before
- The one question each phase answers, and what you will be able to build after it
- Why the order matters, and in particular why you write loops by hand before learning the shortcuts
- The five building blocks that every program is made of
- Budget Buddy, the project you will grow from phase to phase, and a sensible pace

**Before this:** [What is programming, really?](#/phase-00-start-here/02-what-is-programming).

## Why you need a map

The most common reason people give up learning to program is not that it is too hard. It is that they feel **lost**. They learn a thing, then another thing, and cannot see how the pieces fit or where it is all going. Every new idea feels like a random fact to memorise.

This page fixes that. It shows you the whole journey before you start, and how every idea leads to the next. **Bookmark it.** Whenever you are halfway through a phase and wonder "why am I learning this?", come back here and find where you are.

::: analogy Learning to cook
Nobody learns to cook by starting with a five-course dinner. You learn to boil water. Then to cook rice in that water. Then to fry onions. Then to make a sauce, which uses frying. Then a stew, which uses the sauce and the rice. Then a whole meal, which uses all of it.

Each skill is small, and each one *uses the ones before it*. Skip boiling water and the rice goes wrong. Skip the sauce and the stew goes wrong.

Programming is learned the same way. Each phase in this course is one skill, and each one is used by all the phases after it.
:::

## The whole journey in one picture

Each phase answers one question. Read the chain from top to bottom. Every arrow means "the next phase needs this one".

```text
  PHASE 0  Start Here                 "How do I run code at all?"
     |
     v
  PHASE 1  Storing Information        "How do I remember things?"
     |       values -> variables -> types -> input
     v
  PHASE 2  Making Decisions           "How do I choose?"
     |       compare -> if / else -> and / or / not
     v
  PHASE 3  Loops                      "How do I repeat?"
     |       while -> for -> loop patterns -> menus
     v
  PHASE 4  Functions                  "How do I reuse steps?"
     |       name a job -> give it input -> get an answer back
     v
  PHASE 5  Arrays                     "How do I handle many things?"
     |       a list -> change it -> loop through it -> list algorithms
     v
  PHASE 6  Objects                    "How do I describe one thing
     |                                  with many details?"
     |       one record -> lists of records -> save to a file
     v
  PHASE 7  Array methods              "How do I do less work?"
     |       pass a function in -> map, filter, find, reduce, sort
     v
  PHASE 8  Becoming a Programmer      "How do I work like a programmer?"
             solve new problems -> debug -> split into files -> Git
```

And here is the same chain as a row of core ideas. This is the backbone of the whole course. Each idea only makes sense once you have the one on its left.

```text
values -> variables -> types -> decisions -> loops -> functions -> arrays -> objects -> array methods
```

Do not worry if half of those words mean nothing to you yet. That is exactly what the course is for. The point for now is only this: **they come in a chain, and you will meet them one link at a time.**

::: quiz
You are keen to get to arrays, so you skip Phase 3 and jump straight into Phase 5. Going by the map, what will you be missing that Phase 5 relies on?

- [ ] Nothing: each phase stands on its own
- [ ] Objects, which you need before you can make a list
- [ ] Array methods like `map`, which make lists usable
- [x] Loops, which you use to go through a list one item at a time

Every arrow on the map means "the next phase needs this one", and arrays need loops: adding up a list, or finding its biggest item, means going through it with a loop. Objects and array methods come **after** arrays, so Phase 5 cannot rely on them.
:::

## Every program is made of five things

Before looking at each phase, here is a small picture worth keeping in your head. Nearly every program you will ever write, from a tip calculator to a banking app, is made of the same five building blocks.

```text
  INPUT  -->  STORE  -->  DECIDE  -->  REPEAT  -->  OUTPUT
  get          remember    choose       do it        show the
  information  it          what to do   again        result
```

Take a taxi fare app:

- **Input:** where you are, and where you want to go.
- **Store:** remember the pickup point, the destination and the distance.
- **Decide:** is it peak hour? If so, charge more.
- **Repeat:** for every nearby driver, check how far away they are.
- **Output:** show the price and the driver's name.

Now look at where each building block is taught:

| Building block | Where you learn it |
|---|---|
| Output | Phase 0 (`console.log`) |
| Store | Phase 1 (variables and types) |
| Input | Phase 1 (asking the user a question) |
| Decide | Phase 2 |
| Repeat | Phase 3 |

By the end of Phase 3 you will have all five. Everything after that (functions, arrays, objects, array methods) is about **organising** those five things so that bigger programs stay manageable.

::: quiz
A program asks you to type in the price of an item, remembers it, and shows the price with 15% VAT added. What is the **earliest** phase after which you could build it?

- [ ] Phase 0, because it only shows a result
- [x] Phase 1
- [ ] Phase 2
- [ ] Phase 3, because that is when you have all five building blocks

It needs **input** (the price you type), **store** (remember it) and **output** (show the answer), plus a little arithmetic. There is no choice to make and nothing to repeat, so it needs neither Phase 2 nor Phase 3. Input and store are both taught in Phase 1. The trap is thinking every program needs all five blocks: many useful ones need only three.
:::

## Phase by phase

For each phase: the question it answers, what it needs from earlier phases, and a concrete example of something you will be able to build at the end of it.

### Phase 0 — Start Here

- **The question:** How do I run code at all?
- **Needs from before:** nothing.
- **You will learn:** what programming is, how to set up your computer, how to use the terminal, how to create a project, and how to read error messages.
- **You will be able to build:** a file that prints a few lines of text, run from the terminal with one command. Small, but it is the doorway to everything else.

### Phase 1 — Storing Information

- **The question:** How do I remember things?
- **Needs from before:** running a file with `node` (Phase 0).
- **You will learn:** **values** (pieces of information like `42` or `"hello"`), **variables** (named boxes that hold values), the different **types** of value (numbers, text, true/false), converting between them, and asking the user a question.
- **You will be able to build:** a program that asks for your name and your monthly income and expenses, then tells you how much is left, to two decimal places.

### Phase 2 — Making Decisions

- **The question:** How do I choose?
- **Needs from before:** variables and types (Phase 1). You cannot decide *anything* without a value to look at.
- **You will learn:** comparing values, `if` and `else`, combining conditions with "and", "or" and "not", and choosing between many options.
- **You will be able to build:** a ticket-price calculator that charges children, adults and pensioners different prices, and says "Please enter a number" if someone types nonsense.

### Phase 3 — Repeating Things: Loops

- **The question:** How do I repeat?
- **Needs from before:** variables (a loop needs something to count with) and decisions (a loop has to decide when to stop).
- **You will learn:** the `while` and `for` loops, and the classic loop patterns: keeping a running total, counting, and finding the biggest.
- **You will be able to build:** a menu-driven program that keeps running until you choose "quit". For example, a till that lets you enter prices one by one and shows the total, the number of items and the most expensive item when you finish.

### Phase 4 — Functions: Naming Your Steps

- **The question:** How do I reuse steps?
- **Needs from before:** everything so far. A function is a *container* for the variables, decisions and loops you already know.
- **You will learn:** how to package some steps under a name (like `formatMoney`), give them input, get an answer back, and use them as often as you like.
- **You will be able to build:** a tip-and-bill splitter made of small, clearly named functions, and you will know how to test each function on its own.

### Phase 5 — Lists of Things: Arrays

- **The question:** How do I handle many things?
- **Needs from before:** loops (you go through a list with a loop) and functions (to keep list-handling code tidy).
- **You will learn:** **arrays** (numbered lists of values), how to add and remove items, and how to loop through a list to add it up, count things, find the biggest, and build new lists.
- **You will be able to build:** a class marks tool: type in everyone's marks, then see the average, the highest mark, how many passed, and a list of only the marks above 75.

### Phase 6 — Grouping Data: Objects

- **The question:** How do I describe one thing with many details?
- **Needs from before:** arrays (you will make lists *of* objects) and functions.
- **You will learn:** **objects** (one thing with labelled details, like a contact with a name, a phone number and an email), lists of objects, a surprise about copies that catches everyone, and saving data to a file so it is still there tomorrow.
- **You will be able to build:** a contacts or recipe book that saves to a file on your computer and loads everything back the next time it runs.

### Phase 7 — Functions as Values: Array Methods

- **The question:** How do I do less work?
- **Needs from before:** functions (Phase 4), arrays and the hand-written list loops (Phase 5), and objects (Phase 6).
- **You will learn:** that a function can be handed to another function, and the built-in **array methods** (`map`, `filter`, `find`, `reduce`, `sort` and friends) that do in one line what your Phase 5 loops did in six.
- **You will be able to build:** short, readable reports: "only the grocery expenses", "the three biggest expenses, largest first", "total spent per category", each in a line or two.

### Phase 8 — Becoming a Programmer

- **The question:** How do I work like a programmer?
- **Needs from before:** all of it.
- **You will learn:** a method for solving problems you have never seen, calm step-by-step debugging (including the debugger in your editor), splitting code across files, and saving your work with Git.
- **You will be able to build:** Budget Buddy, finished and tidy, split into files, with a README and a history of saved versions. Then you pick where to go next.

## Why the order matters: loops before shortcuts

Some courses teach the Phase 7 shortcuts very early, because they are short and look impressive. This course deliberately makes you wait. Here is why.

In Phase 5, you will write loops by hand for jobs like these:

- **Transform every item:** "take every price, add VAT to each one, and collect the results in a new list".
- **Keep only some items:** "go through the expenses and keep only the ones over R100".
- **Boil a list down to one value:** "go through the prices and keep a running total".

Each of those takes about five or six lines. You will write them several times, and you will understand every line, because you wrote it.

Then in Phase 7 you learn that JavaScript has a built-in shortcut for each:

```text
   PHASE 5: you write the loop           PHASE 7: you meet the shortcut
   --------------------------------      ------------------------------
   transform every item          --->    map
   keep only matching items      --->    filter
   find the first match          --->    find
   boil down to one value        --->    reduce
```

**You learn what the shortcut replaces first.** That way, when you see `map`, you do not think "some magic word that makes things happen". You think "ah, that is my transform loop, written for me". You know exactly what it does inside, so you can predict its results, spot when it is the wrong tool, and fix it when it goes wrong.

People who learn the shortcuts first often get stuck the moment a problem does not quite fit one. People who learned the loops first can always fall back on writing the loop.

::: analogy A calculator in maths class
Schools teach long division by hand before letting you use a calculator. Not because calculators are bad, but because once you understand what division *does*, you can tell when the calculator's answer is clearly wrong, and you know what to do when there is no calculator.

Loops are long division. Array methods are the calculator. You will use the calculator far more in real life, and you will use it better because you learned long division first.
:::

The same thinking runs through the whole course:

- **Variables before decisions:** you cannot decide anything without a value to look at.
- **Decisions before loops:** every loop contains a decision ("keep going, or stop?").
- **Loops before functions:** functions are most useful when they wrap up something worth reusing, like a loop.
- **Functions before arrays:** list code gets long quickly, and functions keep it tidy.
- **Arrays before objects:** real data is usually a *list of objects*, so you need lists first.
- **Everything before array methods:** array methods combine functions, arrays and objects at once.

::: quiz
In Phase 5 you will write a loop that goes through a list of learners' names and builds a **new** list with every name in capital letters. Which Phase 7 shortcut will that loop turn into?

- [x] `map`, because it changes every item and collects the results
- [ ] `filter`, because it goes through the list and picks names
- [ ] `reduce`, because it ends up with one list
- [ ] `find`, because it looks at each name in turn

Every name goes in, and every name comes out changed: that is the "transform every item" pattern, which becomes `map`. `filter` is tempting, but it *keeps some items and drops others*, and here nothing is dropped. `reduce` boils a list down to a single value, like a total.
:::

## Budget Buddy: the project that grows with you

Learning ideas one at a time is good. Seeing them work together in something real is better. So alongside the lessons, you will build one program, **Budget Buddy**, from Phase 1 to Phase 8.

Budget Buddy is a money tracker that runs in your terminal. The last lesson of every phase adds one new layer to it, using exactly what that phase taught. You never throw the code away. You keep improving the same program, the way real software is built.

```text
  Phase 1  Ask and calculate          name, income, 3 expenses -> money left
  Phase 2  Warnings and checks        reject nonsense, warn when overspending
  Phase 3  Keep going until I quit    a menu that loops; add as many expenses as you like
  Phase 4  Tidy it into functions     formatMoney, askForAmount, showMenu ...
  Phase 5  Remember every expense     a list you can show and remove items from
  Phase 6  Real records, saved        description + amount + category, saved to a file
  Phase 7  Reports                    by category, top 3, search, totals
  Phase 8  Finished and organised     split into files, a README, saved in Git
```

At the end of Phase 1 it will look something like this when you run it. The person using it types the name and the amounts, and the program works out the rest:

```text
=== Budget Buddy ===
What is your name? Lerato
Monthly income: R12500
Rent: R4500
Food: R2800
Transport: R1200

Hi Lerato, here is your month:
Income:          R12500.00
Total expenses:  R8500.00
Left over:       R4000.00
That is 32.0% of your income, or about R133 a day.
```

By Phase 8 it has a menu, categories, reports, and remembers everything between runs. Every line of it will be yours.

You can see each stage, what it adds, and tick them off as you finish them on the [Project page](#/project). To see every lesson in every phase on one screen, use the [Roadmap](#/roadmap).

::: quiz
You want Budget Buddy to still have last week's expenses when you close it and run it again today. Which stage adds that?

- [ ] Phase 3, "keep going until I quit"
- [ ] Phase 5, "remember every expense"
- [x] Phase 6, "real records, saved"
- [ ] Phase 8, "saved in Git"

Phase 5 remembers every expense **while the program is running**, but when it stops, the list is gone. Phase 6 saves the records to a file, and files stay on your computer between runs. Git (Phase 8) saves versions of your *code*, not the expenses a user typed in.
:::

## A sensible pace

This course has about 60 lessons. Most take 30 to 60 minutes if you do the exercises properly, and some project lessons take longer.

A realistic pace for someone with a job or studies is **about one hour a day, five or six days a week**. At that pace the course takes roughly **8 to 10 weeks**. Some people go faster, many go slower, and both are fine.

A few pieces of advice from people who have done this before:

- **Consistency beats intensity.** Thirty minutes every day beats five hours on a Sunday. Your brain needs sleep between sessions to make new ideas stick.
- **Do not rush the early phases.** Phases 1 to 3 feel slow. They are the foundation that everything else stands on. If they are solid, Phases 5 to 7 go much faster.
- **Do not skip the exercises.** Reading a lesson takes 15 minutes. *Learning* it takes the exercises.
- **Go back without shame.** If Phase 4 feels confusing, it is often because something in Phase 2 or 3 is a little shaky. Revisiting an earlier lesson is not going backwards. It is what everyone does.
- **Stop at a good point.** End a session after something works, not in the middle of a bug. It makes it much easier to start the next day.

::: try Make your plan
No coding yet. This is about setting yourself up.

1. Open the [Roadmap](#/roadmap) in a new tab. Scroll through it once, top to bottom, and notice how many lessons each phase has.
2. Open the [Project page](#/project). Read the eight Budget Buddy stages.
3. Decide on your pace. Write it down somewhere you will see it (a sticky note on your screen, a reminder on your phone, or a note in your calendar). For example: "Mon to Fri, 19:00 to 20:00, one lesson a day."
4. Pick a target date for finishing Phase 3, when you will have all five building blocks. Write that down too.
5. Bookmark this page in your browser (**Ctrl+D** on Windows and Linux, **Cmd+D** on macOS), so you can find the map again when you need it.
:::

::: exercise Level 1 — Guided · Which phase?
For each program below, decide which phase you would need to reach before you could build it. Use the "phase by phase" section above. Write your answers down, then open the solution.

1. A program that prints your name and your favourite food.
2. A program that asks for a temperature and says "Take a jacket" if it is below 15 degrees.
3. A program that keeps asking for quiz answers until you type "done", then shows your score.
4. A program that stores a whole class's marks and shows the top one.
5. A program that saves a list of your contacts (name, phone number, email) to a file.
:::

::: solution
1. **Phase 1** (Phase 0 if the name and food are typed straight into `console.log`). You only need to store and show information.
2. **Phase 2.** It needs input (Phase 1) and a decision: *if* below 15, show the message.
3. **Phase 3.** "Keep asking until" is a loop, and it needs a running score.
4. **Phase 5.** "A whole class's marks" is a list of values, which is an array.
5. **Phase 6.** Each contact has several details (an object), there is a list of them, and it saves to a file. All of that is Phase 6.

If you got most of these, you already understand how the phases stack up, before writing any code.
:::

::: exercise Level 2 — On your own · Plan a program with the five building blocks
Think of an app you use (a music app, a school system, a shop's till, a taxi app, a game). Pick one feature of it and describe it using the five building blocks: **input**, **store**, **decide**, **repeat** and **output**. Write one sentence for each.
:::

::: hint
Look back at the taxi example above. For "repeat", ask yourself: what does this feature do more than once, or for each of several things?
:::

::: solution
Here is one example, for a shop's till:

- **Input:** the cashier scans each item's barcode.
- **Store:** the till remembers each item's price and the running total.
- **Decide:** if an item is on special, use the special price; if the customer pays with too little cash, show an error.
- **Repeat:** for every item scanned, add its price to the total, until the cashier presses "finish".
- **Output:** show the total, then print a slip listing every item.

Any feature works, as long as each of your five sentences makes sense for it. You have just done a real part of a programmer's job: breaking a feature into its building blocks before writing any code.
:::

::: mistake
**Jumping ahead to "the interesting bit".** Skipping to Phase 7 because `map` sounds exciting leads straight to confusion, because `map` is built out of Phases 4 and 5. The order is there for a reason.

**Trying to understand the whole map right now.** You are not supposed to understand "array methods" yet. You only need to know that there is a path, and that each step leads to the next.

**Comparing your pace with someone else's.** Some people have more free time, or have tinkered with code before. Finishing matters. Speed does not.
:::

::: connect
**This builds on:** [What is programming, really?](#/phase-00-start-here/02-what-is-programming): a program is a list of exact instructions, and now you have seen the kinds of instructions you will learn.

**This unlocks:** the practical part of Phase 0. Next, [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer) installs the two tools you need, and then [the terminal](#/phase-00-start-here/05-the-terminal) teaches you how to use them. Come back to this page at the start of every new phase to see where you are.
:::

::: recap
- The course is a chain: **values → variables → types → decisions → loops → functions → arrays → objects → array methods**, then working like a programmer.
- Each phase answers one question: remember, choose, repeat, reuse, handle many, describe one thing in detail, do less work.
- Nearly every program is made of five building blocks: **input, store, decide, repeat, output**. You will have all five by the end of Phase 3.
- You write loops by hand (Phase 5) before learning `map`, `filter` and `reduce` (Phase 7), so you know exactly what each shortcut replaces.
- **Budget Buddy** grows by one layer at the end of every phase. Track it on the [Project page](#/project).
- A good pace is about an hour a day, for roughly 8 to 10 weeks. Consistency beats speed.
:::

::: interview Why does this course teach loops before map and filter?
Because `map` and `filter` are shortcuts for loops you would otherwise write yourself. Writing the loops first means you know exactly what each shortcut does inside, so you can predict its results, notice when it is the wrong tool, and fall back on a loop when no shortcut fits.
:::

::: interview What are the five building blocks of most programs? Give an example of each from an ATM.
**Input:** the card and PIN you enter. **Store:** your account balance. **Decide:** is the PIN correct, and is there enough money? **Repeat:** count out notes one at a time until the amount is reached. **Output:** the cash and the printed slip.
:::

::: interview Why do objects come after arrays in this course?
Because real data is usually a **list of objects** (a list of expenses, a list of contacts). To work with that shape you need to already know how to handle lists and loop through them. Arrays come first so that Phase 6 can build on them straight away.
:::

::: checkpoint
- [ ] I scrolled through the whole Roadmap once
- [ ] I read the eight Budget Buddy stages on the Project page
- [ ] I wrote down my pace and a target date for finishing Phase 3
- [ ] I bookmarked this page
- [ ] I decided which phase each of the five example programs needs
- [ ] I described one app feature using input, store, decide, repeat and output
:::

::: resources
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. Its early lessons have good advice on motivation and learning pace.
- **freeCodeCamp:** https://www.freecodecamp.org/learn. Useful later, for extra practice alongside a phase you are working on.
- **CS50 (Harvard, free):** https://cs50.harvard.edu/x/. Its first lectures cover the same building blocks (store, decide, repeat) in a different style, if you like video.
:::
