---
title: Why loops exist
summary: Before any new syntax, understand what a loop is, why programs need them, and how to plan one in plain words.
minutes: 40
stage: Phase 3
---

## What you will learn

- Why copying and pasting lines of code stops working very quickly
- What a **loop** is, and the three ingredients every loop needs
- The words programmers use to talk about loops: **iteration**, **loop body**, **loop condition** and **counter**
- How to plan a loop in plain words (**pseudocode**) and check it by hand with a **trace table**, before writing any JavaScript

**Before this:** [Project: Budget Buddy v2](#/phase-02-making-decisions/06-project-budget-buddy-v2). You should be comfortable with variables, `x = x + 1`, comparisons like `<=`, and `if`.

::: note No new JavaScript in this lesson
This lesson is about *thinking*. You will not learn any new JavaScript here, on purpose. Loops are one of the two or three most important ideas in all of programming, and people who rush the idea get lost later. The next two lessons turn everything you plan here into real code.
:::

## The problem: doing the same thing again and again

Here is a small job: print the numbers 1 to 5. With what you know so far, you would write this:

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

Output:

```text
1
2
3
4
5
```

That works. Now change the job: **print the numbers 1 to 1000.** You would need 1000 lines. You could copy and paste, but you would have to edit every single number by hand, and one typo (a `417` where `471` should be) would be almost impossible to spot.

It gets worse. Here are some jobs that copy and paste cannot do **at all**:

- "Keep asking for the PIN **until** the user types the right one." How many times do you copy the question? Two? Ten? You cannot know. Some people get it first time, and some need five tries.
- "Let the user add expenses **until** they say they are finished." Some months have 3 expenses, and some have 40.
- "Add up the numbers from 1 to whatever number the user types in." If they type 7 you need 7 additions, and if they type 5000 you need 5000.

In every one of these, **the number of repeats is only known while the program is running**, not while you are writing it. You cannot copy and paste your way out of that. You need a way to tell the computer:

> "Do these steps. Then do them again. Keep going until *this* is true."

That instruction is called a **loop**.

::: analogy Laps of a running track
Picture Thandi running laps of a school track. Her coach says: "Run laps until you have done 4."

- Before she starts, she has done **0 laps**. That is the *starting point*.
- Before each lap, she asks herself: "Have I done fewer than 4?" If yes, she runs another lap. If no, she stops. That question is the *condition to keep going*.
- Each time she crosses the line, she adds one to her lap count. That is the *step that moves her towards stopping*.
- The running itself (one lap around the track) is the part that repeats.

Notice what the coach did **not** do. She did not say "run a lap, then run a lap, then run a lap, then run a lap". She gave *one* instruction and a rule for when to stop. That is exactly what a loop is.
:::

## Loops are everywhere in everyday life

You already follow loops all day. You do not call them that, but they have the same shape.

| Everyday loop | Where it starts | Keep going while… | What moves it towards stopping |
|---|---|---|---|
| Stirring pap until there are no lumps | Pot on the stove, lumps everywhere | there are still lumps | each stir breaks some lumps |
| Washing the dishes | A pile of dirty plates | there are plates left in the pile | each wash takes one plate off the pile |
| Running 4 laps | 0 laps done | laps done is fewer than 4 | each lap adds 1 to the count |
| Filling a kettle | Empty kettle | the water is below the line | the water keeps rising |
| Counting taxi fares for the driver | R0 counted, a pile of coins | there are coins left in the pile | each coin you count leaves the pile |
| Knocking on a door | Nobody has answered | nobody has answered, and you have knocked fewer than 3 times | each knock adds to your knock count |

Look down each column. Every single loop has the same three things.

## The three ingredients of every loop

1. **A start.** Where things are before the first repeat. (0 laps. R0 counted. A full pile of plates.)
2. **A condition to keep going.** A question with a yes or no answer, asked *before each repeat*. Yes means "go again", and no means "stop". (Fewer than 4 laps? Any plates left?)
3. **A step towards stopping.** Something that changes each time round, so that one day the answer to the question becomes "no". (Add one lap. Take one plate off the pile.)

And, of course, the thing you actually want to repeat: the lap, the wash, the stir.

Here is why the third ingredient matters so much. Imagine Thandi's coach says "run laps while you have done fewer than 4", but nobody ever counts the laps. The count stays at 0 forever. "Is 0 fewer than 4?" Yes. Another lap. "Is 0 fewer than 4?" Yes. Another lap... Thandi runs until she collapses.

A loop whose condition never becomes "no" never stops. It is called an **infinite loop**, and it is the most common loop bug there is. In the next lesson you will make one on purpose, so you know how to stop it.

::: why Why is the condition a yes/no question?
Because the computer needs to decide, every time round, whether to go again. You already know how to write yes/no questions in code: `lapsDone < 4` gives `true` or `false`. That is exactly what you learned in [Comparing values](#/phase-02-making-decisions/01-comparing-values). A loop condition is the same kind of comparison you used with `if`. The difference is that `if` asks the question **once**, and a loop asks it **again and again**.
:::

## Look closely at repeated code

Here is "print 1 to 5" written a different way, using a variable. It uses nothing you have not seen before.

```js
let count = 1;

console.log(count);
count = count + 1;

console.log(count);
count = count + 1;

console.log(count);
count = count + 1;

console.log(count);
count = count + 1;

console.log(count);
count = count + 1;

console.log("Finished. count is now", count);
```

Output:

```text
1
2
3
4
5
Finished. count is now 6
```

Look at the pairs of lines. **They are all identical.** Every pair says "print `count`, then make `count` one bigger". The only thing that is different each time is the *value inside* `count`, and the variable takes care of that for us.

This is the key insight. When you see the same lines copied again and again, with only a changing number, you are looking at a loop that has been written out the long way. Find the three ingredients:

- **Start:** `let count = 1;`
- **Keep going while:** `count` is 5 or less (we stopped after printing 5)
- **Step towards stopping:** `count = count + 1;`
- **The part that repeats:** `console.log(count);`

::: try Feel the pain of copy and paste
1. Open your `coding-practice` folder in VS Code and create a new folder called `phase-3`.
2. In it, create a file called `copy-paste.js` and type in the "print 1 to 5 using `count`" program above. Type it, do not paste it.
3. In the terminal, from inside `coding-practice`, run:
   ```bash
   node phase-3/copy-paste.js
   ```
4. You should see `1` to `5`, then `Finished. count is now 6`.
5. **Now change the job to 1 to 10.** Copy the pair of lines five more times. Before you run it, predict the last line of output. Then run it.
6. Think about how you would feel if the job were 1 to 1000. Or "until the user types stop". That feeling is why loops exist.
:::

You should have seen `Finished. count is now 11`. Did you predict 10? Many people do. After printing 10, the program *still* adds one, so `count` ends one past the last number printed. Keep that in mind, because it comes up again when we write real loops.

## The words programmers use

These four words will be used in every loop lesson from now on. It is worth learning them properly.

- **Iteration:** one trip through the loop. "On the third iteration, `count` was 3." Thandi's fourth lap is her fourth iteration. We also say a loop **iterates**, meaning it goes round.
- **Loop body:** the instructions that repeat. In the laps example, running one lap. In the code above, `console.log(count);` and `count = count + 1;`.
- **Loop condition:** the yes/no question asked before each iteration. `count <= 5`. "Are there plates left?"
- **Counter:** a variable whose job is to count the iterations. `count` in the code above. Thandi's lap count. Counters very often start at 0 or 1 and go up by 1 each time.

::: note "Loop" is a noun and a verb
Programmers say "a loop" (the thing) and also "loop over the letters" or "loop until the user quits" (the action). Both are normal.
:::

## Planning a loop in plain words: pseudocode

Before programmers write a tricky loop in real code, they often write it in **pseudocode**. *Pseudo* means "pretend", so pseudocode is pretend code: plain words laid out like a program, with no strict rules. Nobody runs it. It is for you, to get the *thinking* right before you worry about brackets and semicolons.

Here is "print 1 to 5" in pseudocode:

```text
set count to 1
while count is 5 or less:
    print count
    add 1 to count
print "done"
```

Read it slowly. The indented lines are the loop body: they belong to the `while`, and they repeat. The line that is **not** indented, `print "done"`, happens once, after the loop has finished.

And here is "keep asking for the PIN until it is right":

```text
ask for the PIN
while the PIN is not 4821:
    say "Wrong PIN, try again"
    ask for the PIN
say "Welcome!"
```

Find the ingredients. The **start** is asking the first time. The **condition** is "the PIN is not 4821". The **step towards stopping** is asking again, because each new answer might be the right one. Notice that this loop has no counter, and we have no idea how many times it will run. That is fine.

## Checking a loop by hand: the trace table

How do you know a plan works before you run it? You pretend to be the computer, and you write down what happens at every step. A **trace table** is a table with one row per check of the condition and one column per variable. Tracing is one of the most useful skills in this whole course. Professional programmers do it on paper and whiteboards all the time.

Here is a trace of the "print 1 to 5" plan:

| Iteration | `count` at the start | Is `count` 5 or less? | Printed | `count` after the step |
|---|---|---|---|---|
| 1 | 1 | yes | 1 | 2 |
| 2 | 2 | yes | 2 | 3 |
| 3 | 3 | yes | 3 | 4 |
| 4 | 4 | yes | 4 | 5 |
| 5 | 5 | yes | 5 | 6 |
| (check) | 6 | **no**, so stop | | |

Two things to notice:

- The condition is checked **six** times, but the body runs only **five** times. The last check is the one that says "stop".
- When the loop ends, `count` is 6. The loop stops *because* `count` went past 5.

::: exercise Level 1 — Guided · Trace a savings plan
Sipho saves R200 every month. He wants to know how many months it takes to have at least R1000. Here is the plan:

```text
set savings to 0
set months to 0
while savings is less than 1000:
    add 200 to savings
    add 1 to months
print months
```

1. Copy this trace table onto paper (really, paper).
2. Fill in one row for each check of the condition, until the answer is "no".
3. Write down what gets printed at the end.

| Check | `savings` | `months` | savings less than 1000? |
|---|---|---|---|
| 1 | 0 | 0 | yes |
| 2 | 200 | 1 | ? |
| 3 | ? | ? | ? |
| … | | | |
:::

::: solution
| Check | `savings` | `months` | savings less than 1000? |
|---|---|---|---|
| 1 | 0 | 0 | yes |
| 2 | 200 | 1 | yes |
| 3 | 400 | 2 | yes |
| 4 | 600 | 3 | yes |
| 5 | 800 | 4 | yes |
| 6 | 1000 | 5 | **no**, so stop |

It prints `5`. Five months.

Notice that `months` is a **counter**, even though the condition does not mention it. The condition is about `savings`. This loop is a "keep going until something is true" loop, and the counter tells us, afterwards, how many iterations it took.
:::

## Two kinds of loop: "how many?" and "until"

When you plan a loop, ask yourself one question: **do I know how many times it will repeat before it starts?**

- **Yes, I know (or can work it out).** "Print 1 to 1000." "Do 10 push-ups." "Go through each letter of a word" (the word has a `.length`). These are **counting loops**. They almost always have a counter, and the condition compares the counter to a number.
- **No, I do not know.** "Ask until the PIN is right." "Stir until there are no lumps." "Let the user add expenses until they choose Quit." These are **"until" loops** (also called condition loops). They keep going until something happens, and you cannot say in advance when.

This matters because JavaScript has two main loops, and each one is best at one of these. The `while` loop (next lesson) is the natural fit for "until" loops. The `for` loop (the lesson after) is the natural fit for counting loops. Either one *can* do either job, but picking the right one makes your code easier to read.

::: exercise Level 1 — Guided · Loop or no loop?
For each situation, decide: **(a)** does it need a loop at all, and **(b)** if yes, do you know how many times it will repeat before it starts? Write your answers down, then check.

1. Print a till slip line for each of the 12 items in a trolley.
2. Work out VAT on one price.
3. Keep asking "Are you over 18? (yes/no)" until the user types exactly `yes` or `no`.
4. Print a 7-times table, from 7 × 1 to 7 × 12.
5. A game gives the player 3 lives, and keeps playing rounds until the lives run out.
6. Print a greeting with the user's name.
7. Count the vowels in the name the user typed.
8. Double a R100 investment every year until it is worth at least R10 000. How many years?
:::

::: solution
1. **Loop, and yes, you know:** 12 times. A counting loop.
2. **No loop.** One calculation, done once.
3. **Loop, and no, you do not know:** it depends on the user. An "until" loop.
4. **Loop, and yes, you know:** 12 times.
5. **Loop, and no, you do not know:** it depends on how well they play. You know the *lives* (3), but not the number of *rounds*.
6. **No loop.**
7. **Loop, and yes:** once per letter. You do not know the name while writing the code, but once the program has it, `name.length` tells you exactly how many letters. "I can work it out before the loop starts" counts as knowing.
8. **Loop, and technically you could calculate it with maths, but most people would not.** It is naturally written as "keep doubling until it is at least R10 000", with a counter for the years. The answer is 7 years (R12 800).

If you disagreed on 7 or 8, that is fine. The important skill is *asking the question*.
:::

::: predict Trace this plan
What does this pseudocode print? Make a trace table, then check.

```text
set number to 10
while number is more than 0:
    print number
    take 3 away from number
print "Liftoff!"
```
:::

::: solution
| Check | `number` | more than 0? | Printed |
|---|---|---|---|
| 1 | 10 | yes | 10 |
| 2 | 7 | yes | 7 |
| 3 | 4 | yes | 4 |
| 4 | 1 | yes | 1 |
| 5 | -2 | **no**, stop | |

Output:

```text
10
7
4
1
Liftoff!
```

The step does not have to be "add 1". It can be "take 3 away", "double it", "ask again", anything, as long as it moves towards the condition becoming "no". Notice that `number` never hits exactly 0. It jumps from 1 to -2. That is why the condition is "more than 0" and not "is not 0". If it said "while number is not 0", this loop would never stop. Keep that trap in mind.
:::

::: debug Three broken plans
Each plan below is supposed to print `1 2 3` (one per line), and each one has one problem. Trace each one and say what goes wrong, and which ingredient is broken.

```text
Plan A
set n to 1
while n is 3 or less:
    print n
```

```text
Plan B
set n to 5
while n is 3 or less:
    print n
    add 1 to n
```

```text
Plan C
set n to 1
while n is less than 3:
    print n
    add 1 to n
```
:::

::: solution
**Plan A** never stops. It prints `1` forever, because nothing changes `n`. The **step towards stopping** is missing. This is an infinite loop.

**Plan B** prints nothing at all. The **start** is wrong: `n` starts at 5, so the very first check ("is 5 three or less?") is "no" and the body never runs. A loop body can run zero times, and that is sometimes exactly what you want, but not here.

**Plan C** prints `1` and `2`, and then stops. The **condition** is slightly wrong: when `n` is 3, "3 less than 3?" is "no". It should be "3 or less" (or "less than 4"). Being out by one like this is so common it has a name: an **off-by-one error**. You will meet it again, and a trace table is the fastest way to catch it.
:::

::: exercise Level 2 — On your own · Plan three loops
Write pseudocode for each of these. For each, label the start, the condition and the step towards stopping. Then trace plan 1 with a table.

1. Print a countdown from 10 to 1, then "Happy New Year!".
2. Ask the user for a number of people for a braai (a barbecue) until they type a number that is 1 or more.
3. Print the 5-times table: `5 x 1 = 5` up to `5 x 10 = 50`.
:::

::: hint
Start by asking "do I know how many times?" For plan 2, look back at the PIN example: ask once before the loop, and ask again inside it. For plan 3, a counter from 1 to 10 does the job, and each line can use the counter in a calculation.
:::

::: solution
Your wording will be different, and that is fine. Pseudocode has no strict rules.

```text
Plan 1  (counting loop)
set n to 10                        <- start
while n is 1 or more:              <- condition
    print n
    take 1 away from n             <- step
print "Happy New Year!"
```

```text
Plan 2  ("until" loop)
ask how many people                <- start
while the answer is not a number, or is less than 1:   <- condition
    say "Please type a number of 1 or more"
    ask how many people            <- step (a new answer might be valid)
say "Great, planning for" and the answer
```

```text
Plan 3  (counting loop)
set n to 1                         <- start
while n is 10 or less:             <- condition
    print "5 x", n, "=", 5 times n
    add 1 to n                     <- step
```

The trace of plan 1 has 11 checks: `n` goes 10, 9, 8, … 1 (all "yes"), then 0 ("no"). It prints 10 numbers, then the message.
:::

::: mistake
**Forgetting the step towards stopping.** If nothing in the body changes what the condition looks at, the loop never ends. Always ask: "What changes each time, and will it eventually make the condition false?"

**Checking for an exact value you might jump over.** "While number is not 0" never stops if the number goes 1, -2, -5... Prefer "more than", "less than", "or more" and "or less" when counting.

**Off-by-one errors.** "Less than 3" and "3 or less" differ by one iteration. Trace the last two rows of your table carefully. That is where these bugs live.

**Putting something inside the loop that should happen once.** "Happy New Year!" printed ten times is a sign that it was indented into the body by mistake.

**Thinking a loop always runs at least once.** It does not. If the condition is "no" at the very first check, the body runs zero times.
:::

## Real-world uses

Almost every program you have used is a loop at its heart.

- **Apps and games wait in a loop.** A game draws the screen, checks the controller, updates the world, and does it again, about 60 times every second, until you quit. A chat app loops too: wait for a message, show it, wait again.
- **Checking input.** Every "that password is too short, try again" is an "until" loop.
- **Processing lots of things.** A bank works out interest for every account. A school system calculates the average for every learner. A music app shuffles through every song. One set of instructions, repeated once per item.
- **Counting and totalling.** The total on a till slip is built by adding each item, one at a time, in a loop.

The Budget Buddy you built in Phase 2 can only handle three expenses, because you copied the "ask for an amount" code three times. By the end of this phase it will let you add as many expenses as you like, using one loop.

::: connect
**This builds on:** [variables](#/phase-01-storing-information/02-variables) and the `count = count + 1` pattern (the heartbeat of a counter), and [comparisons](#/phase-02-making-decisions/01-comparing-values), which you will use as loop conditions. A loop condition is an `if` question that gets asked again and again.

**This unlocks:** the next two lessons turn your pseudocode into JavaScript. [The while loop](#/phase-03-loops/02-while-loops) is the natural fit for "until" loops, and [the for loop](#/phase-03-loops/03-for-loops) is the natural fit for counting loops. Much later, in Phase 5, you will loop over whole lists of things. In Phase 7 you will meet `map` and `filter`, which are loops with the looping part already written for you. They only make sense if you understand what a loop does underneath, and that understanding starts here.
:::

::: challenge The doubling rice
An old story: a king offers a reward of rice on a chessboard. One grain on the first square, two on the second, four on the third, doubling each square. Write pseudocode that works out **which square** first has more than 1000 grains on it, and trace it to find the answer. Label the three ingredients.
:::

::: solution
```text
set square to 1                    <- start
set grains to 1                    <- start
while grains is 1000 or less:      <- condition
    add 1 to square
    double grains                  <- step
print square
```

| Check | `square` | `grains` | 1000 or less? |
|---|---|---|---|
| 1 | 1 | 1 | yes |
| 2 | 2 | 2 | yes |
| 3 | 3 | 4 | yes |
| 4 | 4 | 8 | yes |
| 5 | 5 | 16 | yes |
| 6 | 6 | 32 | yes |
| 7 | 7 | 64 | yes |
| 8 | 8 | 128 | yes |
| 9 | 9 | 256 | yes |
| 10 | 10 | 512 | yes |
| 11 | 11 | 1024 | **no**, stop |

It prints `11`. Square 11 has 1024 grains. Here there are two variables that change on every iteration, and both need to be traced. By square 64, by the way, the number is over 9 million million million. Loops let computers do this kind of repeated work without getting tired.
:::

::: recap
- A **loop** repeats a set of instructions, so you write them once instead of copying them.
- Loops handle jobs that copy and paste cannot, such as "until the user types stop", where the number of repeats is only known while the program runs.
- Every loop has three ingredients: a **start**, a **condition to keep going** (a yes/no question asked before each repeat), and a **step towards stopping**.
- An **iteration** is one trip round the loop. The **loop body** is what repeats. The **loop condition** decides whether to go again. A **counter** is a variable that counts the iterations.
- If nothing moves the loop towards stopping, you get an **infinite loop**. If the condition is "no" at the first check, the body runs zero times.
- **Pseudocode** lets you plan a loop in plain words, and a **trace table** lets you check it by hand, one row per check of the condition.
- Ask "do I know how many times?" Counting loops and "until" loops are the two kinds, and JavaScript has a loop suited to each.
:::

::: interview What are the three ingredients of a loop? Give an everyday example.
A **start**, a **condition to keep going**, and a **step that moves towards stopping**. Washing dishes: start with a pile of dirty plates; keep going while there are plates in the pile; each wash takes one plate off the pile, so the pile eventually empties.
:::

::: interview What is an infinite loop, and what usually causes it?
A loop that never stops, because its condition never becomes false. It is usually caused by a missing or wrong step: nothing in the body changes what the condition checks, or the value jumps past the exact value the condition was waiting for.
:::

::: interview What is the difference between a counting loop and an "until" loop?
In a counting loop, you know (or can work out) how many times it will repeat before it starts, like printing 1 to 100 or going through each letter of a word. In an "until" loop, you do not know. It keeps going until something happens, like the user typing a valid answer.
:::

::: checkpoint
- [ ] I created `phase-3/copy-paste.js`, extended it to 10, and predicted the final value of `count`
- [ ] I traced Sipho's savings plan on paper and got 5 months
- [ ] I sorted all eight situations into "no loop", "counting loop" and "until loop"
- [ ] I found the broken ingredient in each of the three broken plans
- [ ] I wrote pseudocode for three loops of my own and traced one of them
- [ ] I can name the three ingredients of a loop without looking
:::

::: resources
- **Harvard CS50, Lecture 0:** https://cs50.harvard.edu/x/. The first lecture builds loops with blocks in Scratch, which is a lovely way to *see* the idea before the syntax.
- **javascript.info, "Loops: while and for":** https://javascript.info/while-for. Read this after the next two lessons, once you have seen the syntax.
- **Eloquent JavaScript, chapter 2:** https://eloquentjavascript.net/02_program_structure.html. The "Control flow" and "while and do loops" sections cover the same ideas in a different voice.
:::
