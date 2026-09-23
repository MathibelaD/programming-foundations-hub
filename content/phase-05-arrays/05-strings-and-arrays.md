---
title: Strings and arrays together — split and join
summary: Break text into a list, work on the list with loops, then glue it back into text. How programs read sentences, names, dates and lists of numbers.
minutes: 50
stage: Phase 5
---

## What you will learn

- How to break a string into an array of pieces with `split`
- How to glue an array back into a single string with `join`
- Everyday text jobs: counting words, reversing a word, capitalising names
- How to turn user input like `"12.50, 30, 7.25"` into real numbers you can add up

**Before this:** [Classic list algorithms, written by hand](#/phase-05-arrays/04-array-algorithms-by-hand). You should also remember string methods like `.trim()` and `.toUpperCase()` from [Strings](#/phase-01-storing-information/05-strings).

## The problem: text arrives in one long piece

A lot of the information programs deal with arrives as **one string**, even though it is really a list of things:

- A user types `12.50, 30, 7.25` when asked for their expenses. That is one string, not three numbers.
- A spreadsheet saved as a **CSV** file (comma-separated values) has lines like `Nomsa,17,Grade 11,Pretoria`. One string per line, with four facts inside.
- A date looks like `2025-03-21`: a year, a month and a day, stuck together.
- A sentence is a list of words. To count them, you have to find where each one starts and ends.

Loops over arrays are powerful, but they need an **array**. So we need a way to turn a string into an array. And when we are done, we usually want to turn the array back into a string to show it to someone.

::: analogy Scissors and glue
`split` is a pair of **scissors**. You tell it where to cut ("at every comma", "at every space"), and you end up with a pile of separate pieces: an array.

`join` is a tube of **glue**. You tell it what to put between the pieces (", " or " and " or nothing at all), and you end up with one long strip again: a string.

The comma (or space, or whatever you cut at) is where the scissors go. It is thrown away. When you glue the pieces back, you choose what goes in the gaps, and it does not have to be what was there before.
:::

## `split`: from a string to an array

`split` is a string method. You give it the **separator**: the text that marks where to cut. It gives back an array of the pieces in between.

```js
const sentence = "the quick brown fox";
const words = sentence.split(" ");
console.log(words);
console.log(words.length);
console.log(words[1]);
```

Output:

```text
[ 'the', 'quick', 'brown', 'fox' ]
4
quick
```

Cut at every space, and you get the words. `words` is an ordinary array now, so everything from this phase works: `.length`, indexes, loops.

A CSV line works the same way, cutting at commas:

```js
const line = "Nomsa,17,Grade 11,Pretoria";
const parts = line.split(",");
console.log(parts);
console.log(parts[3]);
```

Output:

```text
[ 'Nomsa', '17', 'Grade 11', 'Pretoria' ]
Pretoria
```

Look closely: `'17'` has quotes. **`split` always gives you strings**, even when they look like numbers. If you want to do maths with them, convert them with `Number()`, exactly as you did with `prompt` answers in [Converting between types](#/phase-01-storing-information/07-converting-between-types). Also notice that `"Grade 11"` kept its space: we cut at commas, so spaces were left alone.

Two more cases worth knowing:

```js
console.log("mango".split(""));
console.log("no commas here".split(","));
```

Output:

```text
[ 'm', 'a', 'n', 'g', 'o' ]
[ 'no commas here' ]
```

- Splitting with an empty string `""` cuts between **every character**, giving an array of letters.
- If the separator does not appear at all, you get an array with **one** item: the whole string. (Not an empty array.)

::: quiz
What does this program print?

```js
const parts = "12:30:".split(":");
console.log(parts.length, parts[0] + parts[1]);
```

- [ ] `2 42`
- [ ] `2 1230`
- [x] `3 1230`
- [ ] `3 42`

There are two colons, so the scissors cut twice and make three pieces: `"12"`, `"30"`, and an empty string `""` after the last colon. So the length is 3. The pieces are strings, so `+` glues them: `"1230"`. If you picked `42`, you forgot that `split` always gives strings. If you picked `2`, you forgot the empty piece at the end.
:::

## `join`: from an array back to a string

`join` is an array method. You give it the text to put **between** the items, and it gives back one string:

```js
const fruit = ["mango", "litchi", "guava"];
console.log(fruit.join(", "));
console.log(fruit.join(" and "));
console.log(fruit.join(""));
console.log(fruit.join());
```

Output:

```text
mango, litchi, guava
mango and litchi and guava
mangolitchiguava
mango,litchi,guava
```

Notice the glue only goes **between** items, never after the last one. Remember the prediction in [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays) that printed `2-0-3-1-`, with an annoying extra dash at the end? `join` solves it:

```js
const goals = [2, 0, 3, 1];
console.log(goals.join("-"));
```

Output:

```text
2-0-3-1
```

With no separator at all, `join()` uses a comma with no space, which is rarely what you want for people to read. Always say what glue you want. An empty array joins to an empty string `""`.

`join` is how you turn an array into a nice sentence for the user:

```js
const fruit = ["mango", "litchi", "guava"];
console.log(`Fruit: ${fruit.join(", ")}.`);
```

Output:

```text
Fruit: mango, litchi, guava.
```

Much friendlier than `[ 'mango', 'litchi', 'guava' ]`.

::: try Cut and glue
1. Create `phase-5/split-join.js` in `coding-practice`:
   ```js
   const date = "2025-03-21";
   const parts = date.split("-");
   console.log(parts);
   console.log(parts.length);
   console.log(parts.join("/"));
   console.log(parts[2] + "/" + parts[1]);
   ```
2. **Before you run it**, write down the four lines you expect.
3. Run it:
   ```bash
   node phase-5/split-join.js
   ```
4. You should see:
   ```text
   [ '2025', '03', '21' ]
   3
   2025/03/21
   21/03
   ```
   The last line turned a computer-style date into the South African day/month style. Notice `'03'` kept its leading zero: it is still a string.
5. **Now experiment.** Change the last line so it prints `21/03/2025`. Then try `date.split("")` and predict its `.length` before you run it.
:::

::: quiz
What does this program print?

```js
const digits = "2024".split("");
const joined = digits.join("-");
console.log(joined, joined.length);
```

- [x] `2-0-2-4 7`
- [ ] `2-0-2-4- 8`
- [ ] `2-0-2-4 4`
- [ ] `2024 4`

`split("")` gives four one-letter strings. `join("-")` puts a dash only **between** them, so there are 3 dashes and 4 digits: 7 characters. If you picked the version with a dash at the end, you were thinking of the loop that added a dash every time round. `join` never adds one after the last item.
:::

## Counting words

A word counter sounds straightforward: split at spaces, then take `.length`. Try it on messy text, though:

```js
console.log("hello  world".split(" "));
```

Output:

```text
[ 'hello', '', 'world' ]
```

Two spaces in a row means the scissors cut twice with nothing in between, leaving an **empty string** in the array. `.length` would say 3 words. People type double spaces, and spaces at the start and end, all the time.

The fix uses things you already know: `.trim()` the ends, then **count** only the pieces that are not empty (the counter pattern from the last lesson):

```js
function countWords(text) {
  const pieces = text.trim().split(" ");
  let count = 0;
  for (const piece of pieces) {
    if (piece !== "") {
      count++;
    }
  }
  return count;
}

console.log(countWords("the quick brown fox"));
console.log(countWords("  hello   there  world "));
console.log(countWords(""));
console.log(countWords("   "));
```

Output:

```text
4
3
0
0
```

Notice `text.trim().split(" ")`: first trim, then split the trimmed string. You can call one method straight on the result of another like this. It is read left to right.

::: quiz
What does this program print?

```js
const pieces = " braai at five ".split(" ");
console.log(pieces.length, pieces[0] === "");
```

- [ ] `3 false`
- [ ] `4 true`
- [x] `5 true`
- [ ] `5 false`

There are four spaces, so the scissors cut four times and make five pieces: `""`, `"braai"`, `"at"`, `"five"` and `""`. The space at the start leaves an empty string at index 0, and the space at the end leaves one at the end. If you picked 3, you counted only the words. That is why `countWords` trims first and skips empty pieces.
:::

## Reversing a word, two ways

**Way 1: a loop.** Walk the string backwards, building a new string (the build-a-string pattern, counting down like the Top 5 countdown):

```js
function reverseWord(word) {
  let result = "";
  for (let i = word.length - 1; i >= 0; i--) {
    result = result + word[i];
  }
  return result;
}

console.log(reverseWord("lekker"));
```

Output:

```text
rekkel
```

**Way 2: split, reverse, join.** Arrays have a method called `reverse` that flips the order of the items. Strings do not. So: cut the word into letters, flip the array, glue it back together.

```js
const letters = "lekker".split("");
console.log(letters);

letters.reverse();
console.log(letters);

console.log(letters.join(""));
```

Output:

```text
[ 'l', 'e', 'k', 'k', 'e', 'r' ]
[ 'r', 'e', 'k', 'k', 'e', 'l' ]
rekkel
```

Like `push` and `splice`, `reverse` **changes the array itself**. It does not make a reversed copy.

Because each method hands back a value you can call the next method on, you can do all three in one line:

```js
console.log("stressed".split("").reverse().join(""));
```

Output:

```text
desserts
```

Read it left to right: split `"stressed"` into letters, reverse that array, join it into a string. Both ways give the same answer. The loop shows you **how** it works; the one-liner is what you will usually see in real code.

A classic use: checking whether a word is a **palindrome** (reads the same backwards):

```js
function isPalindrome(word) {
  const clean = word.toLowerCase();
  return clean === clean.split("").reverse().join("");
}

console.log(isPalindrome("Racecar"));
console.log(isPalindrome("Level"));
console.log(isPalindrome("Soweto"));
```

Output:

```text
true
true
false
```

## Capitalising names

People type names in every possible way: `nomvula mabena`, `NOMVULA MABENA`, `nOMVULA`. A friendly program tidies them up. First, one word:

```js
function capitalise(word) {
  if (word === "") {
    return "";
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

console.log(capitalise("tHABO"));
```

Output:

```text
Thabo
```

`word[0]` is the first letter, made upper case. `word.slice(1)` is everything from index 1 onwards, made lower case. Glue them with `+`. (Why check for `""`? Because `""[0]` is `undefined`, and `undefined.toUpperCase()` would crash.)

Now a full name: **split** into words, **map** each word to its capitalised version (the mapping pattern from the last lesson), then **join** with spaces:

```js
function capitaliseName(fullName) {
  const words = fullName.trim().split(" ");
  const result = [];
  for (const word of words) {
    result.push(capitalise(word));
  }
  return result.join(" ");
}

console.log(capitaliseName("nomvula mabena"));
console.log(capitaliseName("  JEAN-PIERRE du toit "));
```

Output:

```text
Nomvula Mabena
Jean-pierre Du Toit
```

This is the most common shape in all text processing: **split → loop → join**. Cut the text into a list, do something to the list, glue it back.

Real names are harder than any rule. `Jean-Pierre` should keep its capital P, and many families write `du Toit` with a small d. A program cannot know that. For real apps, it is often kinder to store names exactly as people typed them. But as practice with split, loop and join, this is perfect.

::: predict What does this print?
```js
const tags = "braai, rugby, sunshine";
const list = tags.split(", ");
list.push("family");
console.log(list.length);
console.log(list.join(" #"));
console.log("#" + list.join(" #"));
```
:::

::: solution
```text
4
braai #rugby #sunshine #family
#braai #rugby #sunshine #family
```
Splitting at `", "` (comma **and** space) gives three clean words, with no spaces left on them. After `push` there are 4. `join(" #")` only puts `" #"` **between** items, so the first word has no `#`. The last line adds it at the front by hand.
:::

::: quiz
This version of `capitalise` has no check for an empty word, and `capitaliseName` does not `trim`. Which call crashes?

```js
function capitalise(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function capitaliseName(fullName) {
  const words = fullName.split(" ");
  const result = [];
  for (const word of words) {
    result.push(capitalise(word));
  }
  return result.join(" ");
}
```

- [ ] `capitaliseName("z b")`
- [ ] `capitaliseName("ZOLA BUDD")`
- [x] `capitaliseName("zola budd ")`
- [ ] `capitaliseName("Zola")`

The space at the end of `"zola budd "` leaves an empty string as the last piece. `""[0]` is `undefined`, and `undefined.toUpperCase()` crashes with `TypeError: Cannot read properties of undefined (reading 'toUpperCase')`. If you picked `"z b"`, one-letter words are fine: `"z".slice(1)` is an empty string, and that is not an error.
:::

## Parsing numbers from input

Now the job from the start of the lesson. The user types a list of amounts in one go, and we want to add them up. Taking a string apart to find the meaningful values inside is called **parsing**.

The recipe:

1. **Split** the input at commas.
2. For each piece, **trim** the spaces and convert it with **`Number()`**.
3. **Skip** anything that is empty or not a number, rather than letting a `NaN` poison the total.
4. **Push** the good numbers onto a new array.

```js
function parseAmounts(text) {
  const pieces = text.split(",");
  const amounts = [];
  for (const piece of pieces) {
    const trimmed = piece.trim();
    if (trimmed === "") {
      continue;               // skip empty pieces, like "12, , 30"
    }
    const amount = Number(trimmed);
    if (Number.isNaN(amount)) {
      console.log(`  Skipping "${trimmed}": not a number.`);
      continue;
    }
    amounts.push(amount);
  }
  return amounts;
}
```

`continue` (from [Phase 3](#/phase-03-loops/05-break-continue-nested)) skips the rest of this iteration and moves on to the next piece. It is perfect for "ignore the bad ones".

Why check for empty pieces separately? Because `Number("")` is `0`, not `NaN`. Without that check, a stray double comma would sneak a `0` into your list. Small surprises like this are why real parsing code checks so carefully.

(This function prints a message when it skips something, so it is not quite a pure function. For a small program that is fine; a larger program might return the bad pieces too.)

::: try Add up a list of amounts
1. Create `phase-5/add-amounts.js`. Type in the `parseAmounts` function above, then this below it:
   ```js
   const prompt = require("prompt-sync")();

   function totalOf(numbers) {
     let total = 0;
     for (const n of numbers) {
       total = total + n;
     }
     return total;
   }

   const input = prompt("Enter your amounts, separated by commas: ");
   const amounts = parseAmounts(input);

   console.log(`You entered ${amounts.length} amount(s): ${amounts.join(" + ")}`);
   console.log(`Total: R${totalOf(amounts).toFixed(2)}`);
   ```
   (Move the `require` line to the very top of the file if you like; it only needs to come before `prompt` is used.)
2. Run it with `node phase-5/add-amounts.js` and type `12.50, 30, 7.25`:
   ```text
   Enter your amounts, separated by commas: 12.50, 30, 7.25
   You entered 3 amount(s): 12.5 + 30 + 7.25
   Total: R49.75
   ```
3. Run it again and type something messy, `45, airtime, 12.5,, 100`:
   ```text
   Enter your amounts, separated by commas: 45, airtime, 12.5,, 100
     Skipping "airtime": not a number.
   You entered 3 amount(s): 45 + 12.5 + 100
   Total: R157.50
   ```
4. **Now experiment.** Remove the `if (trimmed === "")` check, predict what the messy input gives now, and run it. Can you see the extra `0` in the list?
:::

Look at how many ideas that small program used: `prompt`, `split`, `trim`, `Number`, `Number.isNaN`, `continue`, `push`, a filter-like loop, an accumulator, `join` and `toFixed`. Five phases of learning in twenty lines.

::: exercise Level 1 — Guided · Reading a CSV line
Create `phase-5/csv-line.js`.

1. Make `const line = "Sipho,Ndlovu,15,Grade 10";`.
2. Split it at commas into `const fields`.
3. Make four variables from the fields by index: `firstName`, `surname`, `age` (convert it with `Number()`), and `grade`.
4. Print the name as `surname, firstName`.
5. Print `` `Age next year: ${age + 1}` ``. (What would this print without `Number()`? Try it after.)
6. Print `` `Class: ${grade}` ``.
:::

::: solution
```js
const line = "Sipho,Ndlovu,15,Grade 10";
const fields = line.split(",");

const firstName = fields[0];
const surname = fields[1];
const age = Number(fields[2]);
const grade = fields[3];

console.log(`${surname}, ${firstName}`);
console.log(`Age next year: ${age + 1}`);
console.log(`Class: ${grade}`);
```
Output:
```text
Ndlovu, Sipho
Age next year: 16
Class: Grade 10
```
Without `Number()`, `"15" + 1` glues text and gives `151`.
:::

::: exercise Level 2 — On your own · Initials
Write a function `initials(fullName)` that returns a person's initials in capitals, each followed by a full stop. It should cope with extra spaces and any mix of capitals.

```js
console.log(initials("thandiwe nokuthula mbeki"));
console.log(initials("Lindiwe Sisulu"));
console.log(initials("  ahmed   kathrada "));
```

Expected:

```text
T.N.M.
L.S.
A.K.
```
:::

::: hint
Split → loop → join. Trim and split the name at spaces. For each word that is not empty, push its first letter in upper case onto a new array. Then `join(".")` puts a full stop between the letters. What about the one after the last letter?
:::

::: solution
```js
function initials(fullName) {
  const words = fullName.trim().split(" ");
  const letters = [];
  for (const word of words) {
    if (word !== "") {
      letters.push(word[0].toUpperCase());
    }
  }
  return letters.join(".") + ".";
}
```
The `if (word !== "")` handles the double space in `"ahmed   kathrada"`. Without it, `""[0]` is `undefined`, and `undefined.toUpperCase()` crashes with a `TypeError`.
:::

::: debug The total is a strange string
This should add up the amounts and print `Total: 49.75`. Run it:

```js
const input = "12.50, 30, 7.25";
const pieces = input.split(",");

let total = 0;
for (const piece of pieces) {
  total = total + piece;
}

console.log(`Total: ${total}`);
```

Output:

```text
Total: 012.50 30 7.25
```

What happened, and how do you fix it?
:::

::: solution
`split` gives back **strings**: `"12.50"`, `" 30"` and `" 7.25"`. `0 + "12.50"` is not addition: when one side of `+` is a string, JavaScript glues them together, giving `"012.50"`. Every piece after that is glued on too.

Convert each piece to a number before adding:

```js
for (const piece of pieces) {
  total = total + Number(piece);
}
```
Output:
```text
Total: 49.75
```
(`Number(" 30")` ignores the spaces around a number, so this works even without `trim`. It would still be wise to use the full `parseAmounts` from this lesson, to skip bad input.)
:::

::: mistake
**Forgetting that `split` gives strings.** `"15" + 1` is `"151"`. Convert with `Number()` before doing maths.

**Splitting at `","` when the text has `", "`.** You get pieces with a leading space, like `" rugby"`. Either split at `", "` or `trim` each piece.

**Not handling double spaces.** `"a  b".split(" ")` contains an empty string. Trim, and skip empty pieces.

**Expecting `join` to add glue at the end too.** It only goes *between* items. Add anything at the ends yourself.

**Calling `reverse` on a string.** `"hello".reverse()` is a `TypeError`, because only arrays have `reverse`. Split first.

**Forgetting that `reverse` changes the array.** If you still need the original order, reverse a fresh array made by `split`.
:::

::: quiz
What does this program print?

```js
const pieces = "10,,5,".split(",");
let total = 0;
for (const piece of pieces) {
  total = total + Number(piece);
}
console.log(total, total / pieces.length);
```

- [ ] `15 7.5`
- [ ] `15 5`
- [ ] `NaN NaN`
- [x] `15 3.75`

The input splits into four pieces: `"10"`, `""`, `"5"` and `""`. `Number("")` is 0, not `NaN`, so the total is still 15, and nothing looks wrong. But the average divides by 4 pieces, giving 3.75, when there were really only two amounts. That is why `parseAmounts` skips empty pieces before it converts them. If you picked `NaN NaN`, you expected the empty pieces to become `NaN`.
:::

## Real-world uses

- **Search boxes** split what you type into words, so "red running shoes" searches for three words.
- **Spreadsheets and bank exports** save as CSV files. Every line is `split(",")` by the program that reads it.
- **Hashtags and tags** are typed as one string and split into a list.
- **Forms** tidy names with split, capitalise, join, and build initials the same way.
- **Chat apps** join a list of names into "Thabo, Aisha and 3 others are typing".
- **Budget Buddy**, soon: Phase 6 stores data in files, which are long strings until your program takes them apart.

::: connect
**This builds on:** [strings](#/phase-01-storing-information/05-strings), [converting types](#/phase-01-storing-information/07-converting-between-types), `continue` from [Phase 3](#/phase-03-loops/05-break-continue-nested), and the filter, map and count patterns from [the last lesson](#/phase-05-arrays/04-array-algorithms-by-hand).

**This unlocks:** [Budget Buddy v5](#/phase-05-arrays/06-project-budget-buddy-v5), where you store every expense in an array. And in Phase 6, [JSON](#/phase-06-objects/05-saving-data-with-json) is a smarter version of this lesson's idea: turning data into a string to save it, and parsing it back later.
:::

::: challenge Keep it clean
A school chat app hides certain words. Write `censor(sentence, banned)` that returns the sentence with every banned word replaced by `***`. The check should ignore capitals, so `Eish` is caught when `"eish"` is banned.

```js
const banned = ["eish", "voetsek"];
console.log(censor("Eish this traffic is bad", banned));
console.log(censor("voetsek said the uncle to the dog", banned));
console.log(censor("have a lekker day", banned));
```

Expected:

```text
*** this traffic is bad
*** said the uncle to the dog
have a lekker day
```
:::

::: solution
```js
function censor(sentence, banned) {
  const words = sentence.split(" ");
  const result = [];
  for (const word of words) {
    if (banned.includes(word.toLowerCase())) {
      result.push("***");
    } else {
      result.push(word);
    }
  }
  return result.join(" ");
}
```
Split → map → join again. Every word goes into the result (so it is a map, not a filter), but some are swapped for `***` first. `banned.includes(...)` from [Changing arrays](#/phase-05-arrays/02-changing-arrays) does the checking.

(It does not catch `eish!` with an exclamation mark, because `"eish!"` is not in the list. Handling punctuation properly is a harder problem. Real filters use more advanced tools.)
:::

::: recap
- `text.split(separator)` cuts a string into an **array** of pieces. The separator is thrown away. `split("")` gives the letters.
- `split` always gives **strings**. Use `Number()` before doing maths.
- `arr.join(glue)` joins an array into one **string**, with the glue only **between** items.
- `reverse()` flips an array in place. Strings do not have it, so use `split("").reverse().join("")`.
- The common shape of text processing is **split → loop → join**.
- **Parsing** means taking text apart to find the values inside. Trim each piece, skip empty ones, and check for `NaN`.
:::

::: interview What is the difference between `split` and `join`?
`split` is a string method that cuts a string into an array, using a separator to decide where to cut. `join` is an array method that combines the items of an array into one string, putting the given text between them. They are opposites.
:::

::: interview Why does `"a,b,,c".split(",")` have four items, and what is the third?
There is a cut at every comma, and there are three commas, so four pieces. Between the two commas in a row there is nothing, so the third item is an empty string `""`.
:::

::: interview How would you turn the input `"10, 20, 30"` into a total?
Split it at commas, then loop over the pieces: trim each one, convert it with `Number()`, skip anything empty or `NaN`, and add the good numbers to a running total that started at 0.
:::

::: checkpoint
- [ ] I predicted the date output before running `split-join.js`, and printed `21/03/2025`
- [ ] I counted words in a string with double spaces and got the right number
- [ ] I reversed a word both ways: with a loop, and with split, reverse and join
- [ ] I ran the amounts program with messy input and saw a bad value being skipped
- [ ] I wrote `initials` and it handled the extra spaces
- [ ] I fixed the "strange string" total and can explain why it happened
:::

::: resources
- **javascript.info, "Array methods" (split and join section):** https://javascript.info/array-methods. Scroll to "split and join". (Most of the rest of the page is Phase 7 material.)
- **MDN, "Useful string methods":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods. A beginner guide to working with text.
- **MDN, "Arrays" (converting between strings and arrays):** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays. Has a short section on `split` and `join` with a practice task.
:::
