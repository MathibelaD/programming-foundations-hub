---
title: What is programming, really?
summary: Computers follow instructions exactly, literally and in order. Programming is the craft of writing those instructions well.
minutes: 30
stage: Phase 0
---

## What you will learn

- The three ways a computer follows instructions: **exactly**, **literally**, and **in order**
- What a **program** and a **programming language** are
- How code turns into a result: code, something that runs it, and the result
- Why this course uses JavaScript and Node.js, and why what you learn will carry over to other languages
- What this course deliberately leaves out, and why

**Before this:** [How this course works](#/phase-00-start-here/01-how-this-course-works).

## The problem: computers are powerful, and completely clueless

A computer can do billions of calculations every second. It can store every photo you have ever taken and find one of them in a blink. And yet it has no idea what you *mean*. None at all.

If you ask a friend to "grab some bread on the way home", they fill in a hundred gaps without thinking: which shop, which kind of bread, that they should pay for it, that they should not bring back fifteen loaves. A computer fills in **none** of those gaps. It does precisely what it is told, and nothing else.

That is the whole reason programming exists. Someone has to spell every step out.

## The sandwich game

Teachers all over the world run the same exercise, and it teaches the heart of programming better than any definition. It goes like this.

A student writes instructions for making a peanut-butter sandwich. The teacher then follows the instructions **exactly as written**, pretending to know nothing.

The student writes: *"Put the peanut butter on the bread."*

The teacher picks up the closed jar and places it on top of the unopened bag of bread. Done, exactly as written.

The student tries again: *"Open the peanut butter. Spread it on the bread."*

The teacher twists the lid off, scoops peanut butter out with their fingers, and wipes it across the outside of the plastic bag.

Everybody laughs, and then everybody gets it. The instructions *felt* complete to the person who wrote them, because that person already knew how to make a sandwich. The listener did not.

::: analogy A very fast, very literal assistant
Imagine an assistant who is incredibly fast, never gets tired, never forgets, and never complains, but who has **zero common sense**. They cannot guess. They cannot ask "did you mean…?". They carry out each instruction exactly as written, in the order written.

That assistant is your computer. Programming is learning to write instructions for them.
:::

From the sandwich game come three rules. You will see them again and again in this course.

1. **Exactly.** The computer does precisely what the instruction says. Not roughly. Not what is sensible.
2. **Literally.** It takes every word at face value. "Put the peanut butter on the bread" means put the *jar* on the *bag*. It does not know what you meant, only what you wrote.
3. **In order.** It carries out instructions one after another, from the first to the last. If you spread before you open the jar, it tries to spread from a closed jar.

::: exercise Level 1 — Guided · Instructions for a very literal friend
Grab a pen and paper, or open any notes app. No computer skills needed.

1. Pick a small everyday task: making a cup of rooibos tea, or brushing your teeth.
2. Write numbered instructions for it, for someone who has never seen a kettle, a cup, a teabag or a tap.
3. Now read your instructions as the most literal person alive. For each step ask: *could this be misunderstood?* ("Fill the kettle." With what? From where? How full?)
4. Rewrite any step that could be misread. Split big steps into smaller ones.
5. Count your steps before and after. Most people's list at least doubles.
:::

::: exercise Level 2 — On your own · Spot the gaps
Here are instructions for sending an SMS. Find **at least four** places where a completely literal assistant would go wrong or get stuck.

1. Send an SMS to Sipho.
2. Type the message.
3. Press send.
:::

::: hint
Ask about each step: *Where* is that? *Which* one? *What exactly* do I type? And what should happen if something is missing?
:::

::: solution
There are many good answers. Here are some:

- **Which phone, and is it unlocked?** Nothing says to pick up the phone or unlock it.
- **Which app?** "Send an SMS" does not say to open the Messages app.
- **Which Sipho?** There might be two Siphos in the contacts, or none.
- **What message?** "Type the message" does not say *what* to type.
- **Where is "send"?** The button might be an arrow icon, not the word "send".
- **Order problem:** step 1 already says "send", before the message is typed.
- **What if something fails?** No signal, no airtime, or no Sipho in the contacts. The instructions say nothing about what to do then.

That last one matters a lot. Real programs spend a surprising amount of their code on "what if something goes wrong?". You will learn to handle that in [Phase 2](#/phase-02-making-decisions/02-if-and-else).
:::

::: quiz
A very literal assistant, with a full kettle of cold water in front of it, follows these instructions exactly:

1. Put a teabag in the cup.
2. Pour water from the kettle into the cup.
3. Switch on the kettle and wait until it boils.

What does it end up with?

- [ ] A cup of hot tea, because all the steps are there
- [x] A teabag in cold water, and a kettle of boiling water next to it
- [ ] Nothing: it notices the steps are in the wrong order and refuses to start
- [ ] A cup of hot water, with the teabag still beside the cup

Every step is there, but **in order** matters: the water is poured in step 2, while it is still cold, and boiled only in step 3. The tempting answer is "it refuses". A literal assistant cannot notice that you *meant* something else. It does not refuse sensible-looking steps, it carries them out.
:::

## What a program is

A **program** is a written list of instructions for a computer. That is all it is. Every app on your phone, every website, every game, the software in an ATM and a microwave: all of them are lists of instructions, written by people, carried out by a computer.

The instructions are written in a **programming language**. A programming language is a strict, carefully designed language that **both people and computers can read**. It uses some English words, some maths symbols and a lot of punctuation, and every piece has one exact meaning.

Why not write instructions in plain English? Because English is full of guesses. "I saw her duck" has two meanings. "Put it on the table next to the bread" could mean put *it* next to the bread, or put it on the table *that* is next to the bread. People sort this out using common sense. Computers have none. So programming languages remove the guessing: each instruction means one thing only.

Here is a line of JavaScript, the language this course uses:

```js
console.log("Hello, world!");
```

It means: *show the text `Hello, world!` on the screen.* You will take this line apart piece by piece in [Your first program](#/phase-00-start-here/06-your-first-program). For now, notice that it is readable. You can guess what it does, even though you have never seen JavaScript. That is the "both people and computers" part.

The written instructions of a program are called **code** or **source code**. Writing them is called **programming** or **coding** (the two words mean the same thing in everyday use).

::: quiz
Which of these instructions could **not** be written in a programming language as it stands, and would need rewriting first?

- [ ] "Show the text Welcome on the screen."
- [ ] "Add 15 to the price, then show the new price."
- [ ] "Show the price, then show the word Thanks."
- [x] "If the price seems expensive, show a warning."

"Seems expensive" needs judgement: expensive for whom? R50? R5000? A person guesses, a computer cannot. A program needs an exact rule, such as "if the price is more than R500, show a warning" (you will write rules like that in Phase 2). The other three are already exact: each has one meaning only.
:::

## From code to result

Code on its own is only text in a file, the same way a recipe on its own is only words on paper. Something has to actually *carry it out*.

```text
   +----------------+        +---------------------+        +--------------+
   |  Your code     |  --->  |  Something that     |  --->  |  The result  |
   |  (a text file) |        |  runs it            |        |              |
   +----------------+        +---------------------+        +--------------+

   For us:

   +----------------+        +---------------------+        +--------------+
   |  hello.js      |  --->  |  Node.js            |  --->  |  Hello,      |
   |  (JavaScript)  |        |                     |        |  world!      |
   +----------------+        +---------------------+        +--------------+
```

For this course:

- The **code** is JavaScript, written in files whose names end in `.js`, like `hello.js`.
- The thing that runs it is **Node.js** (usually called **Node**). Node is a free program that reads a JavaScript file and carries out its instructions, one at a time, from top to bottom. You will install it in [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).
- The **result** is whatever the instructions say to do. In this course it is usually text printed in a window called the **terminal**, which you will meet in [The terminal without fear](#/phase-00-start-here/05-the-terminal).

Running a program is also called **executing** it. When programmers say "run the file" or "execute the code", they mean: hand it to the thing that carries it out, and let it go.

::: analogy Sheet music and a pianist
A page of sheet music is not music. It is instructions for making music. It needs a pianist to read it and play it.

Your JavaScript file is the sheet music. Node is the pianist. The sound in the room is the result. And just like a pianist who plays a wrong note exactly where the sheet has a wrong note, Node will carry out your mistakes faithfully too.
:::

::: quiz
Aisha writes a perfectly correct JavaScript program in a file called `tip.js`, but she has not installed Node yet. Using the "code, something that runs it, result" picture, what is true?

- [ ] `tip.js` is not code yet: it only becomes code once Node reads it
- [ ] The program runs, but its result is invisible until she installs Node
- [x] `tip.js` is code, but nothing is carrying it out, so there is no result
- [ ] Her text editor carries out the instructions instead

Code is the written instructions, whether or not anything runs them, the same way sheet music is still sheet music when there is no pianist. With no Node, the middle box of the picture is empty, so nothing happens at all. A text editor only shows and edits the text. It does not carry it out.
:::

## Why JavaScript?

There are hundreds of programming languages. This course uses JavaScript for three plain reasons.

1. **It is already on your computer.** Every web browser (Chrome, Edge, Firefox, Safari) has JavaScript built in. You can run a line of it in the next five minutes without installing anything, and you will in the "Try it" box below.
2. **It is used everywhere.** Websites, phone apps, servers, desktop apps like VS Code (the editor you will install soon) and even some robots use JavaScript. It is one of the most widely used languages in the world, so help and examples are everywhere.
3. **The ideas carry over.** This is the big one. What you learn here (storing information, making decisions, repeating work, building functions, handling lists) works almost identically in other languages.

To prove that third point, here is the same tiny program, one that shows `Hello, world!` on the screen, written in three different languages.

**JavaScript:**

```js
console.log("Hello, world!");
```

**Python:**

```text
print("Hello, world!")
```

**C#:**

```text
Console.WriteLine("Hello, world!");
```

Each prints:

```text
Hello, world!
```

The words are different (`console.log`, `print`, `Console.WriteLine`), but the *shape* is the same: the name of an instruction, then round brackets, then the text in double quotes. Once you understand one of these properly, the others look like a slightly different accent of the same language. The same thing happens with every idea in this course, and in the [last lesson](#/phase-08-becoming-a-programmer/06-what-to-learn-next) you will see a loop and a function side by side in all three.

::: try Your first line of JavaScript, in the browser
You do not need to install anything for this. We will use the JavaScript that is already inside your web browser.

1. Open a new tab in your browser. Any page will do, even a blank one.
2. Open the **developer console**, a hidden panel where you can type JavaScript:
   - **Chrome or Edge:** press **F12**, then click the **Console** tab at the top of the panel. Or press **Ctrl+Shift+J** (Windows and Linux) or **Cmd+Option+J** (macOS).
   - **Firefox:** press **Ctrl+Shift+K** (Windows and Linux) or **Cmd+Option+K** (macOS).
   - **Safari:** first go to **Safari → Settings → Advanced** and tick **Show features for web developers**. Then press **Cmd+Option+C**.
3. You should see a panel, often with some messages already in it. Ignore those. Click at the bottom, next to the `>` symbol.
4. Type this exactly, then press **Enter**:
   ```js
   console.log("Hello, I am learning to program!");
   ```
5. You should see:
   ```text
   Hello, I am learning to program!
   ```
   You may also see a grey `undefined` underneath. That is normal. It is the browser telling you something you do not need yet, so ignore it.
6. **Now experiment.** Change the text between the quotes to your own name, press **Enter**, and watch it appear.
7. Close the developer console by pressing **F12** again (or the **×** in the corner of the panel).

That was real JavaScript, run by a real computer. You are, technically, already a programmer.
:::

::: warn "Don't paste code you don't understand"
Some browsers show a warning in the console about pasting code. Take it seriously: never paste code into a console because a stranger on the internet told you to, since it can do things on the website you are logged in to. Typing your own `console.log` lines is completely safe.
:::

::: predict Exactly and literally
Remember the literal assistant. What do you think these four lines print? Look carefully at every letter and space.

```js
console.log("Hello");
console.log("hello");
console.log("HELLO   there");
console.log("Helo, wrold!");
```
:::

::: solution
```text
Hello
hello
HELLO   there
Helo, wrold!
```
The computer prints **exactly** what is between the quotes: the capital letters, the three spaces, and even the spelling mistakes. It does not correct `wrold` to `world`, because it has no idea what you meant. It does not know that "Hello" and "hello" are the same greeting. To a computer, they are different pieces of text. This is the sandwich game again, in code.
:::

::: quiz
In C#, this line shows `Sala kahle` on the screen:

```text
Console.WriteLine("Sala kahle");
```

Which JavaScript line does the same job?

- [x] `console.log("Sala kahle");`
- [ ] `console.WriteLine("Sala kahle");`
- [ ] `Console.log("Sala kahle");`
- [ ] `console.log(Sala kahle);`

The *shape* carries over (instruction name, round brackets, text in double quotes), but the exact words belong to each language, and computers take them **literally**. JavaScript has no `WriteLine`, and `Console` with a capital C is a different name from `console`, so both of those fail. Without the quotes, `Sala kahle` is no longer text to show, so that fails too.
:::

## What this course will *not* teach (yet)

When people think of JavaScript, they often think of building websites: buttons, pages, colours, animations. Many courses start there, with HTML, CSS, and a framework such as React.

This course **does not**. There are no web pages, no styling and no frameworks here. Everything you build runs in the terminal as plain text.

That is on purpose. Building a web page means learning three things at once (the page structure, the styling, and the programming), plus the rules of the browser. Beginners who start there often learn to copy patterns without understanding them, and get stuck the moment something breaks.

This course gives you the **foundations** first: the core ideas that every program in every language is built from. With those solid, the web (or Python, or phone apps, or games) becomes a matter of learning new tools, not new thinking. The [last lesson](#/phase-08-becoming-a-programmer/06-what-to-learn-next) points you to where to go next.

::: mistake
**"I'm not a maths person, so I can't program."** Most everyday programming uses very little maths: adding, subtracting, and comparing numbers. The skill that matters most is patience with small steps, which you already use every time you follow a recipe or directions.

**"I need to memorise all the commands."** Professional programmers look things up constantly. You will remember the common things naturally by using them. Focus on understanding the ideas.

**"The computer is being stupid."** It feels that way, often. But the computer is only doing exactly what you wrote. When the result is wrong, the question to ask is: "what did I actually tell it to do?" That question solves most problems.

**"Real programmers don't make mistakes."** Real programmers make mistakes all day. The difference is that they have a calm routine for finding them. You will build yours in [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).
:::

## Real-world uses

Once you notice programs, you see them everywhere, each one a list of exact instructions:

- **A traffic light:** stay green for a set time, switch to orange, then red, then repeat, forever.
- **An ATM:** check the PIN, check the balance, count out notes, subtract the amount, print a slip, in that order.
- **A taxi or ride app:** find nearby drivers, work out a price from the distance, send the request, track the car.
- **Buying airtime or data on your phone:** check you have enough money, take the amount off, add the airtime, send a confirmation SMS.
- **A music app's shuffle button:** pick a random song you have not heard yet, play it, and repeat.

Every one of these was written by a person, one small instruction at a time. By the end of this course you will be able to write programs that work the same way.

::: connect
**This builds on:** [How this course works](#/phase-00-start-here/01-how-this-course-works), which explained that JavaScript is the tool and programming is the skill.

**This unlocks:** [The map](#/phase-00-start-here/03-the-map), which shows every idea you will learn and how each one leads to the next. The three rules (exactly, literally, in order) come back in every phase, especially in [Phase 1](#/phase-01-storing-information/01-values-and-output), where you will watch your code run from top to bottom.
:::

::: recap
- A computer follows instructions **exactly**, **literally**, and **in order**. It has no common sense and cannot guess what you meant.
- A **program** is a written list of instructions. The instructions are called **code**.
- A **programming language** is a strict language that both people and computers can read, where every instruction has one meaning.
- Code needs something to run it. For us: **JavaScript** code, run by **Node.js**, with the result shown in the terminal.
- JavaScript is already in your browser, is used everywhere, and its ideas carry over to Python, C# and most other languages.
- This course teaches foundations first. No websites or frameworks, on purpose.
:::

::: interview Why can't we write programs in plain English?
Because English is ambiguous: the same sentence can mean different things, and people use common sense to decide which. A computer has no common sense, so it cannot choose. Programming languages are designed so that every instruction has exactly one meaning.
:::

::: interview What does Node.js do?
Node.js is a program that reads a JavaScript file and carries out its instructions, one at a time from top to bottom. It is the "something that runs it" between your code and the result.
:::

::: interview Name the three ways a computer follows instructions, with an example of each going wrong.
**Exactly:** asked to print `Helo`, it prints `Helo`, not `Hello`. **Literally:** told to "put the peanut butter on the bread", it puts the jar on the bag. **In order:** told to spread and *then* open the jar, it tries to spread from a closed jar.
:::

::: checkpoint
- [ ] I wrote instructions for a task for a very literal friend, then improved them
- [ ] I found at least four gaps in the SMS instructions
- [ ] I opened my browser's developer console and ran a `console.log` line
- [ ] I changed the text to my own name and ran it again
- [ ] I can explain, in my own words, what a program is and what Node.js does
:::

::: resources
- **MDN, "What is JavaScript?":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript. A friendly overview from the people who document the web. (It talks about web pages quite a lot. You can skip those parts.)
- **javascript.info, "An Introduction to JavaScript":** https://javascript.info/intro. A short page on what JavaScript is and where it runs.
- **Eloquent JavaScript, Introduction:** https://eloquentjavascript.net/00_intro.html. A beautifully written chapter on what programming is and why it is hard at first.
:::
