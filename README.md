# Programming Foundations

A step-by-step course for people who have **never written code before**.

It teaches *programming*: how to store information, make decisions, repeat work, organise steps into functions, and handle lists and records. JavaScript (on Node.js) is the tool. It is already on every computer and the ideas carry over to Python, C#, Java and every other language.

> **Reading is not learning. Typing and running code is.**

## Why this course exists

Most beginner material makes one of two mistakes. Either it shows you shortcuts like `array.map()` before you know what a loop is, or it throws twenty topics at you with no sense of which comes first and how they connect.

This course does the opposite:

- **One idea at a time, in order.** Each lesson uses only what earlier lessons taught. You write a loop by hand long before you meet `map`, so when you do meet it, you already know exactly what it does.
- **Why before how.** Every idea starts with the problem it solves and a real-world picture, then the syntax.
- **Always on your own machine.** Every lesson says what file to create, what to type, what command to run, and what you should see. Then it asks you to change something and predict the result.
- **A map, always.** Phase 0 shows how every topic connects. Every lesson ends with *what this built on* and *what it unlocks next*.
- **One project that grows.** You build **Budget Buddy**, a terminal money tracker, a little more at the end of every phase.

## What is inside

| Phase | Topic | The question it answers |
|---|---|---|
| 0 | Start Here | What is programming, and how do I set up and run code? |
| 1 | Storing Information | How does a program remember things? (variables, numbers, text, types, input) |
| 2 | Making Decisions | How does a program choose? (comparisons, if/else, and/or/not, switch) |
| 3 | Loops | How does a program repeat? (while, for, loop patterns, menus) |
| 4 | Functions | How do I name and reuse steps? (parameters, return, scope, arrow functions) |
| 5 | Arrays | How do I handle many things? (lists, and the classic algorithms by hand) |
| 6 | Objects | How do I describe one thing with many details? (objects, references, JSON files) |
| 7 | Array Methods | How do I do less work? (callbacks, forEach, map, filter, find, reduce, sort) |
| 8 | Becoming a Programmer | How do I solve new problems, debug, organise code, and what next? |

Lessons open **one step at a time** (or as a whole page, if you prefer), and each key step ends with a **knowledge check**: a multiple-choice question with new code, so it tests understanding rather than memory. Each lesson also includes hands-on "try it" steps, guided and independent exercises, predict-the-output questions, broken code to fix, common mistakes, self-check questions, a checkpoint list, and optional links to go deeper.

## Running the course

You need Python 3 (already on macOS and most Linux systems) to serve the pages.

```bash
./serve.sh
```

Then open http://localhost:4174. Progress is saved in your browser, and there is no account and no backend.

To write the code in the lessons, you need [Node.js](https://nodejs.org/) (LTS), [pnpm](https://pnpm.io/) and [VS Code](https://code.visualstudio.com/). Phase 0 walks through installing all three.

## Project layout

```text
index.html, assets/        the course website (vanilla JS, no build step)
content/                   the lessons, one folder per phase, written in Markdown
content/project.json       Budget Buddy's stages
solutions/budget-buddy/    reference code for every Budget Buddy stage
tools/build.py             regenerates content/index.json and search.json
tools/check.py             lints lessons: blocks, quizzes, links, and the concept ladder
AUTHORING.md               how lessons are written (rules, template, concept ladder)
CURRICULUM.md              the lesson-by-lesson plan
```

## Contributing a lesson

Read [AUTHORING.md](AUTHORING.md), then:

```bash
python3 tools/check.py     # no nested/unclosed blocks, well-formed quizzes, no broken links, no concepts used too early
python3 tools/build.py     # rebuild the index
```
