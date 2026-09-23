# Authoring guide

How the lessons in this course are written. Read this before adding or changing a lesson.

## Who the reader is

Someone who has **never programmed**. They may not know what a terminal is, what a file extension is, or why code needs to be "run". They are smart, but everything is new, and too much new at once is how people quit.

Everything below follows from that.

## The five rules

1. **Nothing is used before it is taught.** No `if` in Phase 1. No loops in Phase 2. No arrays before Phase 5. No `.map`, `.filter`, `.forEach` or `.reduce` before Phase 7. No arrow functions before lesson 04-05. If an example needs something not yet taught, change the example. See the concept ladder below.
2. **Every idea gets a "why" and a real-world use** before, or right after, the syntax. "You would use a loop when…" matters as much as "a loop looks like…".
3. **The learner types and runs everything.** Every lesson has at least one `::: try` block with exact steps: which folder, which file name, what to type, the command to run, and what they should see. Then something to change and predict.
4. **Plain words.** Short sentences. Define every new term in **bold** the first time it appears. No jargon without a plain-English meaning next to it. Prefer "a name for a value" over "an identifier bound to a binding".
5. **Every output shown is real.** Every code sample was run with Node, and the output block shows exactly what Node printed.

## Where learners put their code

- **`~/coding-practice/`** is created in Phase 0 lesson 06 with `pnpm init`. It gets one folder per phase: `phase-1/`, `phase-2/` and so on. Lessons say, for example, "create `phase-1/variables.js`" and "run `node phase-1/variables.js` from inside `coding-practice`".
- **`~/budget-buddy/`** is the course project, created in the Phase 1 project lesson. Each phase ends with a lesson that adds to it (see `content/project.json`).

The course uses **CommonJS** (`require`, `module.exports`) because it works with no configuration. User input comes from the `prompt-sync` package, installed in lesson 01-08.

The package manager is **pnpm**, not npm. Learners install it in 00-04 and run two one-time settings there (`pnpm config set init-type commonjs --global` and `pnpm config set init-package-manager false --global`), so that `pnpm init` creates a CommonJS project with a short `package.json`. Use `pnpm init`, `pnpm add <package>`, `pnpm install`, `pnpm start` and `pnpm run <script>` in lessons. The lockfile is `pnpm-lock.yaml`. Packages still come from the npm registry, so linking to npmjs.com package pages is fine.

Money in examples is in South African rand, written `R`, with a short note in 01-04 telling learners to use their own currency.

## Lesson template

Front matter:

```
---
title: Variables — giving values a name
summary: One friendly sentence shown in the sidebar and search.
minutes: 40
stage: Phase 1
---
```

Body, in this order. Leave out a section only if it truly does not fit.

```
## What you will learn          2–4 bullets, plus "Before this: <link to previous lesson>"
## <The problem / why>          a relatable problem that this idea solves
::: analogy                     a physical, everyday picture of the idea
## <The idea, step by step>     several small sections, each: explain, tiny code, output
::: try                         exact steps to run it on your machine, then "change X, predict, run"
::: quiz                        a knowledge check at the end of each key ## section (see below)
::: predict                     show code, ask what it prints; answer in a ::: solution
::: exercise Level 1 — Guided   numbered steps
::: exercise Level 2 — On your own   requirements only, with ::: hint and ::: solution
::: debug                       broken code to fix (from Phase 1 onward); ::: solution
::: mistake                     the common beginner mistakes, each with the fix
## Real-world uses               where this idea shows up in actual apps
::: connect                     what this builds on, and what it unlocks next
::: challenge                   optional, harder; ::: solution
::: recap                       5–8 bullet summary
::: interview <question>        "Test yourself" questions, collapsed; 2–4 of them
::: checkpoint                  "- [ ]" checklist of things they have DONE, not read
::: resources                   2–4 links to trusted beginner resources
```

### Block syntax

Blocks start with `::: kind Optional title` and end with a line containing only `:::`. **Blocks cannot be nested.** Put a `::: solution` or `::: hint` straight *after* the exercise it belongs to, never inside it.

| kind | shows as | collapsed? |
|---|---|---|
| `try` | Try it on your computer | no |
| `analogy` | Real-world picture | no |
| `connect` | How this connects | no |
| `exercise` | Your turn | no |
| `challenge` | Challenge | no |
| `project` | Apply it to the project | no |
| `predict` | Predict the output | no |
| `debug` | Debug this | no |
| `mistake` | Common mistakes | no |
| `note` / `warn` / `why` / `recap` / `stop` | as named | no |
| `checkpoint` | Checkpoint (checkboxes are saved) | no |
| `resources` | Go deeper (optional) | **yes** |
| `quiz` | Knowledge check (interactive multiple choice) | no |
| `hint` / `solution` | Hint / Solution | **yes** |
| `interview` | Test yourself | **yes** |

### Knowledge checks (`::: quiz`)

The site shows a lesson one `##` section at a time. Each key section ends with a knowledge check, so that learners find out straight away whether the idea landed. Aim for 3–5 per lesson.

````
::: quiz
What does this print?

```js
let total = 0;
for (let i = 1; i < 4; i++) {
  total = total + i;
}
console.log(total);
```

- [ ] `10`
- [x] `6`
- [ ] `4`

`i` takes 1, 2 and 3, so `total` is 6. If you picked 10, you included 4: check `<` versus `<=`.
:::
````

The question comes first, then 3–5 options (exactly one `- [x]`), then the explanation, which is shown after the learner answers. `tools/check.py` enforces the shape.

- **Test understanding, not memory.** Use new code, names and numbers. Never ask for a definition, or for a sentence copied from the lesson.
- **Wrong options are real mistakes**: off by one, `"52"` instead of `7`, the value before reassignment, `undefined` vs an error.
- **The explanation names the trap** behind the most tempting wrong option.
- Only concepts from the ladder up to this point. Run every snippet with Node.
- Vary where the right answer sits.

Code fences: use `js` for JavaScript, `bash` for terminal commands, and `text` for program output. Put the output directly under the code, introduced with "Output:" or "You should see:".

Internal links look like `[Variables](#/phase-01-storing-information/02-variables)`.

### Trusted resources to link

- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- javascript.info: https://javascript.info/ (link to specific chapters, for example https://javascript.info/variables)
- Eloquent JavaScript (free book): https://eloquentjavascript.net/
- freeCodeCamp: https://www.freecodecamp.org/learn
- The Odin Project Foundations: https://www.theodinproject.com/paths/foundations/courses/foundations
- CS50 (Harvard, free): https://cs50.harvard.edu/x/
- Python Tutor, which shows code running step by step and supports JavaScript: https://pythontutor.com/javascript.html

Only link specific pages you are confident exist. Otherwise link the site's front page.

## The concept ladder

This is what a lesson may use. It may use everything from earlier rows and **nothing from later rows**.

| Lesson(s) | Newly allowed |
|---|---|
| 00-xx | terminal commands, `console.log("text")`, `pnpm init`, `node file.js` |
| 01-01 | values, numbers and strings in `console.log`, `+ - * /`, comments, top-to-bottom order |
| 01-02 | `let`, assignment, reassignment, `x = x + 1` |
| 01-03 | `const`, naming rules |
| 01-04 | number operators `% ** += -= ++ --`, precedence, `Math.round/floor/ceil/max/min/random`, `toFixed` |
| 01-05 | strings, template literals, `.length`, `[i]` on strings, `.toUpperCase() .toLowerCase() .trim() .includes() .slice()` |
| 01-06 | booleans, `null`, `undefined`, `typeof` |
| 01-07 | `Number()`, `String()`, `parseInt`, `parseFloat`, `NaN`, `Number.isNaN` |
| 01-08 | `require("prompt-sync")`, `prompt()`, `pnpm add`, `node_modules` |
| 02-01 | `=== !== < > <= >=` (and why not `==`) |
| 02-02 | `if`, `else`, `else if`, blocks `{ }` |
| 02-03 | `&& || !` |
| 02-04 | truthy and falsy |
| 02-05 | `switch`, ternary `? :` |
| 03-02 | `while` |
| 03-03 | `for` |
| 03-05 | `break`, `continue`, nested loops, `do...while` (brief) |
| 04-01 | `function name() {}` declarations and calls |
| 04-02 | parameters, arguments, default parameters |
| 04-03 | `return` |
| 04-04 | scope (block and function) |
| 04-05 | function expressions, **arrow functions** |
| 05-01 | arrays: literals, index, `.length` |
| 05-02 | `push pop shift unshift includes indexOf splice`, changing by index |
| 05-03 | `for...of`, looping over arrays by index |
| 05-05 | `split`, `join` |
| 06-01 | objects, dot and bracket notation, `for...in` (brief) |
| 06-03 | methods on your own objects, simple `this` |
| 06-04 | references vs copies, spread `[...a]` `{...o}` |
| 06-05 | `JSON.stringify/parse`, `fs.readFileSync/writeFileSync`, `fs.existsSync` |
| 07-01 | passing functions as arguments (callbacks) |
| 07-02 onward | `forEach map filter find findIndex some every reduce sort`, chaining |
| 08-03 | `module.exports`, `require("./file")` |

Never used anywhere: classes, `async/await`/promises, `var` (except in the lesson explaining why not), the DOM, TypeScript. These appear in the "what next" lesson only, as names to look up later.

## Tone

Warm, direct and honest. Never say "simply", "just", "obviously" or "easy", because nothing is obvious the first time. Admit when something is confusing ("This trips up everyone at first"). Celebrate small wins without gushing. Use "you" and "we". Use British spelling (organise, behaviour, colour) in prose. Code keeps its own spelling (`color` in CSS).

## Checking your work

```bash
python3 tools/build.py      # regenerates the index and search files
./serve.sh                  # http://localhost:4174
```
