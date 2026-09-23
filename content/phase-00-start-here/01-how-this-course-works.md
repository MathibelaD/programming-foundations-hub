---
title: How this course works
summary: Who this course is for, how each lesson is built, what every coloured box means, and what to do when you get stuck.
minutes: 20
stage: Phase 0
---

## What you will learn

- Who this course is for, and what it will (and will not) teach you
- The loop every lesson follows, and why you must type the code yourself
- What each kind of box on these pages means, including the ones that stay closed until you open them
- A calm, step-by-step routine for when you are stuck
- Where your progress is saved

**Before this:** nothing at all. This is the very first page.

## Who this course is for

This course is for people who have **never written a line of code**. You do not need to know what a terminal is, what a "file extension" means, or why code has to be "run". You do not need to be good at maths. If you can follow a recipe and you are willing to be patient with yourself, you can learn to program.

Everything here is explained from zero. When a new word appears for the first time it is written in **bold** and explained in plain English straight away. If a page ever uses a word you do not understand, that is the page's fault, not yours.

## This course teaches programming, not JavaScript

This is the most important idea on this page.

**Programming** is the skill of breaking a problem into small, exact steps that a computer can follow. It is a way of thinking: how to remember information, how to make choices, how to repeat work, how to organise a big job into small named pieces.

**JavaScript** is a **programming language**: one particular set of words and punctuation for writing those steps down. We use it because it is free, it is already on your computer, and it is used everywhere. But JavaScript is the *tool*. Programming is the *skill*.

::: analogy Learning to drive
When you learn to drive, you learn in one particular car. Maybe it is an old Toyota with a sticky gear stick. You learn where *that* car's indicator is and how *that* clutch feels.

But what you are really learning is **driving**: checking mirrors, judging gaps, reading the road, knowing when to slow down. A year later you can climb into a completely different car and, after a minute of finding the wipers, you drive it fine.

JavaScript is the car you learn in. Programming is driving. By the end of this course you will be able to pick up Python, C# or Java and, after a short while finding the wipers, you will program in it fine, because the thinking is the same.
:::

So when a lesson explains a loop or a function, pay most attention to the **idea** (why it exists, what problem it solves) and a bit less to the exact punctuation. The punctuation you will pick up by typing it many times.

## The lesson loop

Almost every lesson follows the same rhythm. Once you know it, you will always know where you are.

```text
  1. Understand         Why does this idea exist? What problem does it solve?
         |
         v
  2. Tiny example       A few lines of code, and exactly what they print
         |
         v
  3. Type and run       You type it on your own computer and run it
         |
         v
  4. Exercise           You use the idea yourself, with help if you need it
         |
         v
  5. Project            You add the idea to Budget Buddy, the app you build
         |
         v
  6. Check yourself     Recap, questions, and a checklist of what you did
```

Step 5 does not happen in every lesson. Each phase ends with a project lesson where you add what you learned to **Budget Buddy**, a money-tracking app that grows with you. You will meet it properly in [the map](#/phase-00-start-here/03-the-map).

## Why typing beats reading

Reading code and understanding it feels like learning. It is not quite the same thing.

::: analogy Learning to swim from a book
You could read a whole book about swimming. You would understand the strokes, the breathing, the kick. Then you would jump into the pool and sink, because your arms and lungs have never actually done it.

Programming is the same. Your eyes will happily skim `console.log("Hello")` and say "yes, got it". Your fingers, typing it for the first time, will forget the closing bracket, put the quote in the wrong place and spell `console` as `consle`. **Those mistakes are where the learning happens.** You only make them by typing.
:::

Three habits that make a real difference:

1. **Type the code. Do not copy and paste it.** Every code box on these pages has a **Copy** button. It is there for long files later on. For the examples you are learning from, type them out, even when it feels slow.
2. **Keep the lesson and your code editor side by side.** On a laptop, put this page on the left half of the screen and your code editor on the right. On Windows, drag a window to the left edge of the screen until it snaps into place, or press **Windows key + Left arrow**. On macOS, hover over the green button in a window's top-left corner and choose to tile it left. On most Linux desktops, **Super + Left arrow** does the same.
3. **Change things and predict.** When an example works, change something small, *say out loud what you expect to happen*, then run it. When your prediction is wrong, you have found something worth understanding.

You will set up the code editor in [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer). For now, reading is fine. Starting from lesson 06, you type everything.

## The boxes you will see on every page

Lessons are made of normal text and coloured boxes. Each kind of box has one job. Here is every kind, and several of them are shown for real below so you can see how they behave.

| Box | What it is for | Open or closed? |
|---|---|---|
| **Try it on your computer** | Exact steps: which folder, which file name, what to type, what command to run, and what you should see. Then something to change. | Open |
| **Real-world picture** | An everyday comparison (like the driving one above) to hang a new idea on. | Open |
| **Predict the output** | Some code and a question: what will this print? You answer *before* checking. | Open |
| **Your turn** (exercises) | Practice. **Level 1 — Guided** gives numbered steps. **Level 2 — On your own** gives only the goal. | Open |
| **Debug this** | Broken code for you to fix. | Open |
| **Challenge** | An optional, harder problem for when you want more. | Open |
| **Hint** | A nudge in the right direction, without the answer. | **Closed** |
| **Solution** | The full answer, with an explanation. | **Closed** |
| **Common mistakes** | The mistakes nearly everyone makes with this idea, and how to fix each one. | Open |
| **Apply it to the project** | Steps that add the new idea to Budget Buddy. | Open |
| **How this connects** | What this lesson builds on, and what it unlocks next. | Open |
| **Note**, **Watch out**, **Why it matters** | Side comments, warnings, and reasons. | Open |
| **Recap** | A short summary of the lesson. | Open |
| **Test yourself** | A question you should be able to answer. The answer is hidden inside. | **Closed** |
| **Checkpoint** | A checklist of things you have *done*. Your ticks are saved. | Open |
| **Go deeper (optional)** | Links to trusted outside resources, if you want more. | Open |

The closed boxes (**Hint**, **Solution** and **Test yourself**) are closed on purpose. Click the title bar to open one, and click again to close it. Their job is to *not* give the answer away until you have had a real go.

### A real example: predict, then check

Here is a genuine **Predict the output** box, followed by its closed **Solution** box. You do not need to know any JavaScript yet. Read the three lines, make a guess, then open the solution.

::: predict What does this print?
Each line tells the computer to show one piece of text on the screen.

```js
console.log("Ready");
console.log("Steady");
console.log("Go!");
```

Make your guess *before* you open the solution below. Say it out loud, or write it down.
:::

::: solution
```text
Ready
Steady
Go!
```
The computer carries out the lines one at a time, from top to bottom, so the text appears in the same order as the code. Each `console.log` line prints the text between the quotes, without the quotes themselves.

If you guessed that, well done: you have read your first program. If you guessed something else, that is fine too. That is exactly what predicting is for.
:::

Notice what happened. The solution stayed hidden until *you* decided to look. Hints work the same way.

### Exercise levels

Exercises come in levels, and the steps get smaller as you get stronger:

- **Level 1 — Guided.** Numbered steps. Follow them in order. Some have a solution to compare with afterwards.
- **Level 2 — On your own.** Only the goal is given. There is always a closed **Hint** and a closed **Solution** straight after.
- **Challenge.** Optional and harder. Skip them on a first pass if you like, and come back later. They always have a solution.
- **Debug this.** Code that does not work. You run it, read the error, and fix it. From lesson 07 onward you will see plenty of these.

Here is what a **Test yourself** box looks like. Try to answer in your head, then click it open.

::: interview What is the difference between a Hint and a Solution box?
A **Hint** gives you a nudge (a direction to think in, or the name of something to use) but not the answer. A **Solution** shows a complete, working answer with an explanation. Open the hint first. Open the solution only after you have really tried, or to compare with your own answer once you have finished.
:::

::: note Solutions are one answer, not the answer
In programming there are usually several correct answers. If your code works and does what was asked, it is correct, even if it looks different from the solution. Compare them anyway. You will often learn a neat trick from the difference.
:::

## When you are stuck

You will get stuck. Everyone does, in every lesson, including people who have programmed for twenty years. Being stuck is not a sign that you are bad at this. **It is what learning to program feels like from the inside.**

What matters is having a routine, so that "stuck" turns into "working on it" instead of "giving up". Here it is. Do the steps in order.

::: analogy The mechanic's checklist
A good mechanic does not stare at a broken car feeling hopeless. They run a checklist: Is there fuel? Is the battery charged? Is anything loose? Most problems are found by the third check. The routine below is your checklist.
:::

1. **Reread the error message, slowly.** If there is an error, it tells you *which line* and *what kind of problem*. In [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong) you will learn to read these properly. Most beginners glance at errors. Read every word.
2. **Compare with the example, character by character.** Put your code next to the lesson's code and check one character at a time: every quote, every bracket, every capital letter, every full stop. `Console` and `console` are different to a computer.
3. **Check you saved and ran the right file.** Is there a dot on the file's tab in your editor, meaning it is not saved? Are you in the right folder? Did you run the file you edited?
4. **Explain it out loud.** Say, line by line, what each line does, to a friend, a pet, or a rubber duck on your desk. Programmers really do this. It is called **rubber duck debugging**, and it works because saying it out loud forces you to notice the step you had skipped in your head.
5. **Take a break.** Stand up, walk around, drink some water. Five minutes away often shows you the problem in five seconds when you come back. This is not giving up. It is part of the routine.
6. **Now open the hint.** You have earned it.
7. **Still stuck? Open the solution, then close it and type your own version from memory.** Do not only read it and move on. Understand *why* it works, then prove it by writing it yourself.

::: mistake
**Opening the solution after ten seconds.** It feels efficient, but you learn very little from reading an answer you have not struggled with. Try for at least five to ten honest minutes first.

**Refusing to ever open the solution.** The opposite mistake. After thirty minutes of being stuck on one small exercise, open it. Being stuck for too long drains your motivation, and motivation is what gets you to the end.

**Skipping the "type and run" steps because the code "looks obvious".** Your fingers need the practice even when your eyes do not.

**Rushing.** Doing two lessons properly beats skimming six. Nobody is timing you.
:::

## Your progress is saved in this browser

At the bottom of every lesson is a **Mark lesson complete** button. Click it when you have finished a lesson, and the lesson gets a tick in the sidebar on the left. Ticks in **Checkpoint** boxes are remembered too, and so are the stages you tick on the [project page](#/project).

All of this is stored **in the web browser you are using, on this device**. Nothing is sent anywhere, and you do not need an account. That also means:

- If you switch to a different browser or computer, your ticks will not be there.
- If you clear your browser's history and site data, or use a private (incognito) window, your ticks will be lost.

Your *code* is different. It lives in files on your own computer, and nothing on this site can touch it.

::: try Find your way around
You do not need to install anything for this one.

1. Look at the sidebar on the left (on a phone, open the menu). You should see the phases listed, starting with **Start Here**.
2. Open the [Roadmap](#/roadmap) in a new tab. It shows every phase and every lesson on one page. Come back to this tab.
3. Scroll down to the **Checkpoint** box near the bottom of this page and tick the first item.
4. Reload the page (**F5** or **Ctrl+R** on Windows and Linux, **Cmd+R** on macOS). Scroll back down. Your tick is still there.
5. Arrange your screen: this page on one half, and on the other half, any other window you like for now. From lesson 04, that other half will be your code editor.
:::

::: connect
**This builds on:** nothing yet. You are at the very start.

**This unlocks:** the rest of the course. Next, [What is programming, really?](#/phase-00-start-here/02-what-is-programming) explains what a program actually is and why computers need such exact instructions. After that, [the map](#/phase-00-start-here/03-the-map) shows everything you will learn and how each piece connects to the next.
:::

::: recap
- This course is for complete beginners. It teaches **programming** (the thinking), using **JavaScript** as the tool.
- Every lesson follows the same loop: understand, tiny example, type and run, exercise, project, check yourself.
- Type the code yourself. The mistakes your fingers make are where most of the learning happens.
- Keep the lesson and your editor side by side, and predict before you run.
- **Hint**, **Solution** and **Test yourself** boxes stay closed until you open them. Try first.
- When stuck: reread the error, compare character by character, check you saved, explain it out loud, take a break, then open the hint.
- Your ticks and completed lessons are saved in this browser, on this device.
:::

::: interview Why does this course say "JavaScript is the tool, not the goal"?
Because the lasting skill is **programming**: breaking problems into exact steps, storing information, making decisions, repeating work, and organising code. Those ideas are the same in almost every language. JavaScript is the language you practise them in, the way you learn to drive in one particular car and can then drive others.
:::

::: interview What should you do first when your code does not work?
Reread the error message slowly (if there is one), then compare your code with the example character by character. Only after going through the stuck routine (check you saved, explain it out loud, take a break) should you open the hint, and after that the solution.
:::

::: interview Where is your progress stored, and when could you lose it?
In the web browser you are using, on this device. You would not see it in a different browser or on a different computer, and it would be lost if you cleared the browser's site data or used a private window.
:::

::: checkpoint
- [ ] I made a prediction in the "Ready, Steady, Go!" box before opening its solution
- [ ] I opened and closed a Test yourself box
- [ ] I opened the Roadmap and found where Phase 1 starts
- [ ] I ticked a box, reloaded the page, and saw it was still ticked
- [ ] I can list the stuck routine from memory (at least four of the steps)
- [ ] I arranged my screen so the lesson takes up one half
:::

::: resources
- **CS50 (Harvard, free):** https://cs50.harvard.edu/x/. If you enjoy video lectures, the first lecture is a wonderful introduction to how programmers think. Optional.
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. Its early lessons on "how this course will work" and "motivation and mindset" give excellent advice about learning to code.
- **freeCodeCamp:** https://www.freecodecamp.org/learn. Short browser-based exercises, useful as extra practice later on.
:::
