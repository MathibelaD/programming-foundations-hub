---
title: How to solve problems you have never seen before
summary: A calm, repeatable method for going from "I have no idea where to start" to working code.
minutes: 60
stage: Phase 8
---

## What you will learn

- A five-step method for tackling a problem you have never seen before
- How to **understand** a problem before you touch the keyboard: restating it, examples, and edge cases
- How to plan in plain words (**pseudocode**), solve a smaller version first, and build in small steps
- Two fully worked examples that show the *thinking*, not only the answer, plus five practice problems

**Before this:** [Project: Budget Buddy v7](#/phase-07-functions-as-values/08-project-budget-buddy-v7). You now know every building block this course teaches: values, variables, decisions, loops, functions, arrays, objects and array methods.

## The problem: knowing the pieces is not the same as building something

Here is a feeling almost every learner has at this point. You read a lesson, you understand every line of the example, and then someone gives you a blank file and a new problem, and your mind goes empty.

That is not a sign that you are bad at this. It is a sign that you have learned the **pieces** but not yet a **process** for putting them together. Knowing every Lego brick is different from knowing how to build a house.

Professional programmers do not stare at a problem until the answer appears. They follow a routine, often without noticing. This lesson makes that routine visible, so you can use it on purpose.

::: analogy Cooking a meal you have never made
Imagine someone asks you to cook a dish you have never cooked: say, a vegetable curry for six people.

You would not grab a pot and start throwing things in. You would:

1. **Make sure you understand the request.** How spicy? Any allergies? Six people, so a big pot.
2. **Plan.** Write a rough list: chop onions, fry spices, add vegetables, simmer, cook rice.
3. **Try a small version first**, if you are unsure. Taste the spice mix before you add it to the whole pot.
4. **Cook in stages, tasting as you go.** Not everything at once, then one taste at the end.
5. **Tidy up** the kitchen and write down what worked.

Programming a new problem works exactly the same way. The "tasting as you go" part is running your code after every small change.
:::

## The method: five steps

Keep this list somewhere you can see it. It is the most useful thing in this lesson.

| Step | What you do | The question you ask |
|---|---|---|
| **1. Understand** | Restate the problem in your own words. Write examples of input → output. List **edge cases**. | "What exactly goes in, and what exactly comes out?" |
| **2. Plan** | Write the steps in plain words or pseudocode, before any JavaScript. | "How would I do this by hand, with pen and paper?" |
| **3. Shrink** | Solve a smaller, simpler version first. | "What is the simplest version of this I could get working today?" |
| **4. Build** | Turn one step of the plan into code, run it, check it. Repeat. | "Does what I have so far work?" |
| **5. Tidy** | Once it works: better names, functions with one job, remove leftover logs. | "Would I understand this in a month?" |

Two new terms from the table:

- An **edge case** is an unusual input at the edge of what is allowed: an empty list, a zero, a negative number, a word with capital letters, a very long sentence. Bugs love edge cases.
- **Pseudocode** is a plan written in a mix of plain words and code-like structure. It is not a real programming language, so there are no rules and no errors. It is for you.

::: why Why not start typing straight away?
Because when you type before you understand, you end up solving a *different* problem from the one you were given, and you only find out after an hour. Five minutes of step 1 regularly saves an hour of step 4. Every experienced programmer has learned this the hard way.
:::

## Worked example 1: FizzBuzz

FizzBuzz is a famous little problem, used in job interviews for years. Here is how it is usually worded:

> Print the numbers from 1 to 100. But for multiples of 3 print "Fizz" instead of the number, for multiples of 5 print "Buzz", and for numbers that are multiples of both 3 and 5 print "FizzBuzz".

Watch the method, not only the code.

### Step 1: understand

**Restate it in my own words:** "Count from 1 to 100. For each number, decide which word (or the number itself) to print."

**Examples of input → output**, worked out by hand:

| Number | Divisible by 3? | Divisible by 5? | Print |
|---|---|---|---|
| 1 | no | no | `1` |
| 3 | yes | no | `Fizz` |
| 5 | no | yes | `Buzz` |
| 9 | yes | no | `Fizz` |
| 10 | no | yes | `Buzz` |
| 15 | yes | yes | `FizzBuzz` |

**Edge cases:** the first number (1) and the last (100). Also, 15, 30, 45 and so on, which fit *two* rules at once. That last one is the tricky part, and I only noticed it because I wrote out the table.

**What do I already know that could help?** "Multiple of 3" means "divides by 3 with nothing left over". That is the `%` operator from [Numbers](#/phase-01-storing-information/04-numbers): `n % 3 === 0`.

### Step 2: plan

```text
for each number from 1 to 100:
    if it divides by 3 and by 5  -> print "FizzBuzz"
    otherwise if it divides by 3 -> print "Fizz"
    otherwise if it divides by 5 -> print "Buzz"
    otherwise                    -> print the number
```

Notice that the "both" rule is first. I wrote the plan with the table in front of me, and 15 made it clear that the "both" check must come before the others.

### Step 3: shrink

100 lines of output are hard to check. **Solve 1 to 15 first.** That still contains every case (a Fizz, a Buzz, a FizzBuzz and plain numbers) but fits on one screen.

### Step 4: build, in small steps

**Build step A: only the loop.** Before any Fizz or Buzz, can I print 1 to 15?

```js
for (let i = 1; i <= 15; i++) {
  console.log(i);
}
```

Output (shown on one line here to save space; you will see one number per line):

```text
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

It works. Now I *know* the loop is right, so if something breaks later it must be in the new part.

**Build step B: add the decisions.** Suppose I get excited and write the checks in the order they appear in the problem text:

```js
for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else {
    console.log(i);
  }
}
```

Output (on one line):

```text
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 Fizz
```

The last one says `Fizz`, but my table says 15 should be `FizzBuzz`. Because I had the table from step 1, I spotted it at once. Why did it happen? An `else if` chain stops at the **first** true condition. 15 is divisible by 3, so the first check wins and the "both" check never runs. The plan had it right; my typing did not follow the plan.

**Build step C: move the "both" check to the top**, and, while I am at it, give the decision its own function so I can test it on single numbers:

```js
function fizzBuzzWord(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  }
  return String(n);
}

console.log(fizzBuzzWord(9));
console.log(fizzBuzzWord(10));
console.log(fizzBuzzWord(30));
console.log(fizzBuzzWord(7));
```

Output:

```text
Fizz
Buzz
FizzBuzz
7
```

These are the examples from my table (plus 30), and each one matches. Now I put the loop back:

```js
for (let i = 1; i <= 15; i++) {
  console.log(fizzBuzzWord(i));
}
```

Output (on one line):

```text
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
```

Everything matches. Changing `15` to `100` is now a one-character change, and I trust it.

### Step 5: tidy

The function has a clear name and one job. The loop is three lines. There are no leftover test logs. Done.

::: try FizzBuzz, your way
1. Inside your `coding-practice` folder, create a new folder called `phase-8`. In it, create `fizzbuzz.js`.
2. Type the `fizzBuzzWord` function and the loop from build step C. Type it, do not paste it.
3. Save, then run it from inside `coding-practice`:
   ```bash
   node phase-8/fizzbuzz.js
   ```
4. You should see 15 lines, ending with `13`, `14`, `FizzBuzz`.
5. Change the loop to go to `100`, run it, and scroll up to check 30, 45 and 60.
6. **Now predict, then run:** the problem changes. Multiples of 7 should print `"Bang"`, and anything that is a multiple of 3, 5 *and* 7 should print `"FizzBuzzBang"`. Where do the new checks go in the chain, and why? Decide before you type.
:::

## Worked example 2: a word frequency counter

This one is closer to real work. A friend runs a small online shop and wants to know which words appear most often in customer reviews.

> Given a piece of text, show the three words that appear most often, with how many times each appears.

### Step 1: understand

**Restate:** "Text goes in. I split it into words, count how many times each word appears, then print the top three with their counts."

**Example input → output**, by hand. For `"the cat sat on the mat"`:

```text
the: 2
cat: 1
sat: 1
```

(After `the`, several words tie on 1. The problem does not say how to break a tie, so I will note that as a question and not worry about it for now.)

**Edge cases.** Here I have to think harder, because real text is messy:

- Capital letters: should `The` and `the` count as the same word? *Surely yes.*
- Punctuation: `sat.` and `sat` should be the same word.
- Two spaces in a row, which is common when people type.
- Empty text: there should be no words and no crash.

**What do I already know that could help?**

- `split(" ")` turns a sentence into an array of words ([Strings and arrays](#/phase-05-arrays/05-strings-and-arrays)).
- An object used as a **tally**, `counts[word] = (counts[word] || 0) + 1`, from Budget Buddy's category totals ([Project v6](#/phase-06-objects/06-project-budget-buddy-v6)).
- Sorting with a compare function ([sort and chaining](#/phase-07-functions-as-values/07-sort-and-chaining)).

This is the part people skip. Most "new" problems are old patterns in a new outfit. Asking "which patterns do I know that look like this?" is half the work.

### Step 2: plan

```text
clean the text: lower case, remove punctuation
split it into words, and drop any empty ones
make an empty tally object
for each word: add one to its count in the tally
sort the words by their count, biggest first
print the first three
```

### Step 3: shrink

Forget punctuation and capitals for a moment. Can I count words in `"the cat sat on the mat"`?

### Step 4: build, in small steps

**Build step A: split and look.** Never assume what a value looks like. Print it.

```js
const text = "the cat sat on the mat";
const words = text.split(" ");
console.log(words);
```

Output:

```text
[ 'the', 'cat', 'sat', 'on', 'the', 'mat' ]
```

**Build step B: count.**

```js
const text = "the cat sat on the mat";
const words = text.split(" ");
const counts = {};

for (const word of words) {
  if (counts[word] === undefined) {
    counts[word] = 1;
  } else {
    counts[word] = counts[word] + 1;
  }
}

console.log(counts);
```

Output:

```text
{ the: 2, cat: 1, sat: 1, on: 1, mat: 1 }
```

That matches my hand-worked example. The small version is solved.

**Build step C: now the messy text.** What does `split` do with real punctuation and a double space?

```js
const text = "The cat sat.  The cat ran!";
console.log(text.split(" "));
```

Output:

```text
[
  'The',  'cat',
  'sat.', '',
  'The',  'cat',
  'ran!'
]
```

Three problems, all of which I predicted in step 1: `The` has a capital, `sat.` and `ran!` carry punctuation, and the double space made an empty string `''`. If I had not looked, the counts would have been quietly wrong. Quietly wrong is the worst kind of wrong.

**Build step D: fix each problem with a small function.** To remove punctuation, I keep only the characters I want: letters and spaces. (`for...of` works on a string too: it gives you one character at a time.) That is the "build a string" loop pattern from [Phase 3](#/phase-03-loops/04-loop-patterns). The empty strings can be removed with `filter`.

Here is the whole program after tidying (step 5), with each step of the plan as its own function:

```js
const LETTERS = "abcdefghijklmnopqrstuvwxyz ";

function cleanText(text) {
  let cleaned = "";
  for (const ch of text.toLowerCase()) {
    if (LETTERS.includes(ch)) {
      cleaned = cleaned + ch;
    }
  }
  return cleaned;
}

function toWords(text) {
  return cleanText(text)
    .split(" ")
    .filter((word) => word !== "");
}

function countWords(words) {
  const counts = {};
  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1;
  }
  return counts;
}

function printTop(counts, howMany) {
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  sorted.slice(0, howMany).forEach((word) => {
    console.log(`${word}: ${counts[word]}`);
  });
}

const text = "The cat sat.  The cat ran! Then the dog sat on the cat.";
const counts = countWords(toWords(text));
console.log(counts);
printTop(counts, 3);
```

Output:

```text
{ the: 4, cat: 3, sat: 2, ran: 1, then: 1, dog: 1, on: 1 }
the: 4
cat: 3
sat: 2
```

Notice `then` was counted separately from `the`. Good: they are different words, and it proves the cleaning did not chop words up.

**The empty-text edge case:** `countWords(toWords(""))` gives `{}`, and `printTop` then prints nothing. No crash. I checked it rather than hoping.

::: note The honest version of this story
In real life, build step D took me three attempts. My first `cleanText` forgot the space in `LETTERS`, so every word was glued together into one giant word. I only noticed because I logged the result after each change. **Running after every small step is what turns a mystery into a one-line fix.**
:::

::: try Count the words in something you care about
1. Create `phase-8/word-counter.js` and type in the final program above.
2. Run `node phase-8/word-counter.js` and check you get the same four lines of output.
3. Replace `text` with a paragraph of your own: song lyrics, a news paragraph, a WhatsApp message you wrote. Run it.
4. **Predict, then run:** what happens to a word with an apostrophe, like `don't`? Look at `LETTERS` and decide before you run it. (It becomes `dont`, because `'` is not in the list. Is that acceptable? That is a *design decision*, and it is yours to make.)
5. Change `printTop(counts, 3)` to show the top 5.
:::

## Two habits that make the method work

**Write the examples down first.** In both worked examples, the table of input → output caught the bug. If you cannot write down what the right answer is for a few inputs, you do not understand the problem yet, and no amount of code will fix that.

**Keep the program runnable.** Aim to run your code every few minutes. If you have written 40 lines without running them, and something is wrong, the bug could be in any of 40 places. If you run after every 3 lines, it is in one of 3.

::: mistake
**Starting with the hardest part.** In FizzBuzz, the hard part is the "both" rule. Get the loop working first, so that the hard part is the *only* new thing when you get to it.

**Solving the whole thing in your head, then typing it all at once.** Even professionals cannot do that reliably. Build in slices.

**Forgetting edge cases until the end.** Write them down in step 1, then test each one on purpose in step 4.

**Staying stuck in silence for an hour.** If you have been stuck for 20 minutes, change something: shrink the problem further, explain it out loud, take a walk, or open the hint. Being stuck is part of the job, not a verdict on you.
:::

## Practice problems

These get harder as you go. For each one, do step 1 on paper first (restate it, write three examples, list the edge cases), then build it in `phase-8/`. Each problem has a hint and a solution. Try for at least 15 minutes before opening either.

::: exercise Level 1 — Guided · Count the vowels
Create `phase-8/vowels.js`. Write a function `countVowels(text)` that returns how many vowels (a, e, i, o, u) are in the text. Capital vowels count too.

1. **Understand.** Examples: `countVowels("Johannesburg")` → `4`. `countVowels("AEIOU")` → `5`. `countVowels("rhythm")` → `0`. Edge case: `countVowels("")` → `0`.
2. **Plan.** Start a counter at 0. Look at each character. If it is a vowel, add 1. Return the counter.
3. **Build.** First write a loop that prints each character of `"Johannesburg"`. Run it.
4. Then add the counter and the vowel check. To check "is this character a vowel?", ask the string `"aeiou"` whether it `includes` the character.
5. Handle capitals by lower-casing the text before you loop.
6. Test all four examples with `console.log`.
:::

::: solution
```js
function countVowels(text) {
  let count = 0;
  for (const ch of text.toLowerCase()) {
    if ("aeiou".includes(ch)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("Johannesburg"));
console.log(countVowels("AEIOU"));
console.log(countVowels("rhythm"));
console.log(countVowels(""));
```
Output:
```text
4
5
0
0
```
A shorter version uses `split("")` to turn the text into an array of characters, then `filter`:

```js
const countVowels = (text) =>
  text.toLowerCase().split("").filter((ch) => "aeiou".includes(ch)).length;
```
Both are fine. Use whichever you find clearer to read.
:::

::: exercise Level 2 — On your own · Palindrome checker
A **palindrome** reads the same forwards and backwards: `level`, `Racecar`, `never odd or even`. Create `phase-8/palindrome.js` with a function `isPalindrome(text)` that returns `true` or `false`. Ignore capital letters and spaces.

Your examples to test: `"level"` → `true`, `"Racecar"` → `true`, `"never odd or even"` → `true`, `"hello"` → `false`.
:::

::: hint
Shrink it first: write `reverseText(text)` that returns the text backwards, and test it on its own. A `for` loop that counts **down** from `text.length - 1` to `0` will do it. Then a palindrome is text that is `===` to its own reverse. To remove spaces, `split(" ")` then `join("")`.
:::

::: solution
```js
function reverseText(text) {
  let reversed = "";
  for (let i = text.length - 1; i >= 0; i--) {
    reversed = reversed + text[i];
  }
  return reversed;
}

function isPalindrome(text) {
  const cleaned = text.toLowerCase().split(" ").join("");
  return cleaned === reverseText(cleaned);
}

console.log(isPalindrome("level"));
console.log(isPalindrome("Racecar"));
console.log(isPalindrome("never odd or even"));
console.log(isPalindrome("hello"));
console.log(isPalindrome(""));
```
Output:
```text
true
true
true
false
true
```
Is an empty string a palindrome? This code says yes, which is mathematically fair (nothing reads the same backwards). Noticing the question is what matters.
:::

::: exercise Level 2 — On your own · Password strength checker
Create `phase-8/password.js`. Write `passwordStrength(password)` that returns `"weak"`, `"medium"` or `"strong"`. Give the password one point for each of these:

- it is at least 8 characters long
- it has an uppercase letter
- it has a lowercase letter
- it has a digit
- it has a symbol (anything that is not a letter or a digit)

0 to 2 points is `"weak"`, 3 or 4 is `"medium"`, and 5 is `"strong"`.

Test with: `"abc"` → weak, `"password"` → weak, `"Password1"` → medium, `"Pa55word!"` → strong, `""` → weak.
:::

::: hint
Split it into small functions. Write `hasAny(text, allowed)` that returns `true` if any character of `text` is in the string `allowed`. Then `hasAny(password, "0123456789")` checks for a digit. For symbols, a character is a symbol if it is **not** in the uppercase letters, **not** in the lowercase letters and **not** in the digits. Then a `passwordScore` function adds up the points, and `passwordStrength` turns the score into a word.
:::

::: solution
```js
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

function hasAny(text, allowed) {
  for (const ch of text) {
    if (allowed.includes(ch)) {
      return true;
    }
  }
  return false;
}

function hasSymbol(text) {
  for (const ch of text) {
    if (!UPPER.includes(ch) && !LOWER.includes(ch) && !DIGITS.includes(ch)) {
      return true;
    }
  }
  return false;
}

function passwordScore(password) {
  let score = 0;
  if (password.length >= 8) {
    score++;
  }
  if (hasAny(password, UPPER)) {
    score++;
  }
  if (hasAny(password, LOWER)) {
    score++;
  }
  if (hasAny(password, DIGITS)) {
    score++;
  }
  if (hasSymbol(password)) {
    score++;
  }
  return score;
}

function passwordStrength(password) {
  const score = passwordScore(password);
  if (score <= 2) {
    return "weak";
  } else if (score <= 4) {
    return "medium";
  }
  return "strong";
}

console.log(passwordStrength("abc"));
console.log(passwordStrength("password"));
console.log(passwordStrength("Password1"));
console.log(passwordStrength("Pa55word!"));
console.log(passwordStrength(""));
```
Output:
```text
weak
weak
medium
strong
weak
```
Notice `hasAny` uses an early `return true` as soon as it finds a match. That is the flag pattern from [loop patterns](#/phase-03-loops/04-loop-patterns), written as a function.
:::

::: exercise Level 3 — Stretch · The change-maker
A spaza shop till needs to give change using as few notes and coins as possible. The South African denominations are R200, R100, R50, R20, R10, R5, R2 and R1 (we will ignore cents).

Create `phase-8/change.js`. Write `makeChange(amount)` that returns an array of strings describing the notes and coins. For example:

- `makeChange(48)` → `[ '2 x R20', '1 x R5', '1 x R2', '1 x R1' ]`
- `makeChange(600)` → `[ '3 x R200' ]`
- `makeChange(0)` → `[]`

Then print each result with `.join(", ")`.
:::

::: hint
Do it by hand for R48 first. What do you do? "How many R200s fit into 48? None. R100s? None. R50s? None. R20s? Two, which uses R40, leaving R8. R10s? None. R5s? One, leaving R3…" You are going through the denominations **from biggest to smallest**, and each time asking "how many fit?" (`Math.floor(left / value)`) and "what is left?". Put the denominations in an array and loop over it.
:::

::: solution
```js
const DENOMINATIONS = [200, 100, 50, 20, 10, 5, 2, 1];

function makeChange(amount) {
  const result = [];
  let left = amount;
  for (const value of DENOMINATIONS) {
    const howMany = Math.floor(left / value);
    if (howMany > 0) {
      result.push(`${howMany} x R${value}`);
      left = left - howMany * value;
    }
  }
  return result;
}

console.log(makeChange(387).join(", "));
console.log(makeChange(48).join(", "));
console.log(makeChange(600).join(", "));
console.log(makeChange(0));
```
Output:
```text
1 x R200, 1 x R100, 1 x R50, 1 x R20, 1 x R10, 1 x R5, 1 x R2
2 x R20, 1 x R5, 1 x R2, 1 x R1
3 x R200
[]
```
`left = left - howMany * value` could also be written `left = left % value`, because the remainder after taking out as many as fit is exactly what `%` gives you. Both work.

Always taking the biggest piece that fits is called a **greedy** approach. It gives the fewest notes and coins for rand, but not for every imaginable set of coins. You do not need to worry about that yet, but it is a lovely example of an idea you will meet again.
:::

::: exercise Level 3 — Stretch · Change for a purchase
Build on the change-maker. Write `changeFor(price, paid)` that returns a sentence:

- `changeFor(113, 500)` → `"Change R387: 1 x R200, 1 x R100, 1 x R50, 1 x R20, 1 x R10, 1 x R5, 1 x R2"`
- `changeFor(80, 80)` → `"No change needed."`
- `changeFor(250, 200)` → `"Not enough: you are R50 short."`

Write your three examples down, then decide which case to check first.
:::

::: hint
Check the "not enough" case first and `return` early. Then the "exactly right" case. Only then call `makeChange` and use `join(", ")` to build the sentence.
:::

::: solution
```js
function changeFor(price, paid) {
  if (paid < price) {
    return `Not enough: you are R${price - paid} short.`;
  }
  const change = paid - price;
  if (change === 0) {
    return "No change needed.";
  }
  return `Change R${change}: ${makeChange(change).join(", ")}`;
}

console.log(changeFor(113, 500));
console.log(changeFor(80, 80));
console.log(changeFor(250, 200));
```
(Keep `DENOMINATIONS` and `makeChange` from the previous exercise above this code in the same file.)

Output:
```text
Change R387: 1 x R200, 1 x R100, 1 x R50, 1 x R20, 1 x R10, 1 x R5, 1 x R2
No change needed.
Not enough: you are R50 short.
```
:::

## Real-world uses

This method is not a beginner's crutch. It is how software actually gets built:

- Before a team builds a feature, someone writes down **examples of what should happen**, often as a list of "given this, expect that". That is step 1, and those examples often become automatic tests.
- Developers routinely **build a tiny prototype** (step 3) to check an idea before building the real thing.
- Job interviews for programming roles often use puzzles like FizzBuzz. Interviewers care much more about seeing you restate the problem, ask about edge cases, and test as you go than about you being fast.
- Real programs are built in **small, working slices**, each one saved and tested before the next begins. You will see this with Git in [Saving your work with Git](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).

::: connect
**This builds on:** everything. The worked examples used `%` from Phase 1, `else if` order from Phase 2, the loop patterns from Phase 3, small functions from Phase 4, `split` from Phase 5, an object as a tally from Phase 6, and `filter` and `sort` from Phase 7.

**This unlocks:** confidence with blank files. Next, [Debugging](#/phase-08-becoming-a-programmer/02-debugging) covers what to do when step 4 goes wrong: how to find a bug calmly instead of guessing.
:::

::: challenge Anagram checker
Two words or phrases are **anagrams** if they use exactly the same letters: `listen` and `silent`, `Dormitory` and `dirty room`. Write `isAnagram(a, b)` that returns `true` or `false`, ignoring capitals and spaces.

Use the full method: examples, edge cases, a plan in plain words, then build. Before you code, think: what could you do to *both* words so that anagrams become identical?
:::

::: solution
If you sort the letters of both words, anagrams become exactly the same string: `listen` → `eilnst`, and `silent` → `eilnst`.

```js
function sortedLetters(word) {
  return word.toLowerCase().split(" ").join("").split("").sort().join("");
}

function isAnagram(a, b) {
  return sortedLetters(a) === sortedLetters(b);
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("Dormitory", "dirty room"));
console.log(isAnagram("hello", "world"));
```
Output:
```text
true
true
false
```
The default `sort()` sorts as text, which is exactly what you want for single letters. Turning a hard question ("are these rearrangements of each other?") into a simpler one ("are these two strings equal?") is one of the most powerful problem-solving tricks there is.
:::

::: recap
- Knowing the pieces is not enough. You also need a **process**, and it can be learned.
- **Understand**: restate the problem, write examples of input → output, and list **edge cases**.
- **Plan** in plain words or **pseudocode** before writing JavaScript. Ask "how would I do this by hand?"
- **Shrink**: solve a smaller version first (1 to 15 instead of 1 to 100).
- **Build** in small steps and run after each one. Log values to see what they really look like.
- **Tidy** once it works: functions with one job, good names, no leftover logs.
- Most new problems are old patterns in a new outfit. Ask "what do I already know that looks like this?"
:::

::: interview Why is it worth writing examples of input and output before coding?
They prove you understand the problem. If you cannot say what the right answer is for a few inputs, you are not ready to code it. They also become your tests: in FizzBuzz, the table was what caught the `15` bug straight away.
:::

::: interview What is an edge case? Give two examples.
An unusual input at the edge of what is allowed, where bugs tend to hide. Examples: an empty string or empty array, zero, a negative number, text with capitals or punctuation, the first or last item in a range.
:::

::: interview You have a big problem and no idea where to start. What do you do?
Make it smaller. Restate it, work one example by hand, and look for the easiest slice you could get working today (fewer items, no edge cases, only printing). Get that running, then add one thing at a time.
:::

::: checkpoint
- [ ] I created `phase-8/fizzbuzz.js`, ran it to 100, and added the "Bang" rule
- [ ] I ran the word counter on text of my own
- [ ] I wrote examples and edge cases on paper *before* coding at least one practice problem
- [ ] I solved the vowel counter and the palindrome checker
- [ ] I solved at least one of the password checker and the change-maker
- [ ] I can list the five steps of the method without looking
:::

::: resources
- **Exercism, JavaScript track:** https://exercism.org/tracks/javascript. Small problems with automatic tests, and free human mentoring. Perfect practice for this method.
- **Codewars:** https://www.codewars.com/. Short puzzles called "katas", ranked by difficulty. Start with the easiest (8 kyu).
- **Eloquent JavaScript, chapter 2 exercises:** https://eloquentjavascript.net/02_program_structure.html. Includes FizzBuzz and a chessboard problem, with hints.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in a solution and watch it run step by step.
:::
