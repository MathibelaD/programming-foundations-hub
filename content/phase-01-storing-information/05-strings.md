---
title: Strings — working with text
summary: Names, messages, receipts and email addresses. How to build text, measure it, pick it apart and tidy it up.
minutes: 50
stage: Phase 1
---

## What you will learn

- What a **string** is, the three kinds of quotes, and how to put a quote *inside* a string
- How to build text from pieces, with `+` and with the much nicer **template literals**
- How to measure a string and pick out single characters by their position
- The most useful built-in string abilities: changing case, trimming spaces, searching, and cutting out pieces

**Before this:** [Numbers](#/phase-01-storing-information/04-numbers). You should be comfortable with `const`, `let` and `toFixed(2)`.

## The problem: programs are full of text

Look at almost any screen and most of what you see is text: your name at the top of an app, "Your order is on its way", a receipt line like `Bread x2 ........ R36.00`, an error saying "Please enter a valid email address".

Programs need to:

- **build** text from pieces ("Hello, " + your name),
- **measure** it ("a password needs at least 8 characters"),
- **check** it ("does this email contain an @?"),
- **tidy** it (someone typed "  THABO " with extra spaces and capitals).

You met strings briefly in [lesson 1](#/phase-01-storing-information/01-values-and-output). This lesson gives you the tools to do all four jobs.

::: analogy Beads on a string
Picture a necklace of letter beads. Each bead has one character on it: a letter, a digit, a space or a symbol.

- The whole necklace is a **string**.
- The number of beads is its **length**.
- Every bead has a position, counting from the clasp. The first bead is position **0** (more on that surprise soon).
- You can read any bead, count the beads, or make a **new** necklace by copying some of the beads. But in JavaScript, you cannot re-thread a bead on an existing necklace. Keep that in mind; it matters later in the lesson.
:::

## Three kinds of quotes

A **string** is a piece of text: a sequence of **characters** (letters, digits, spaces, punctuation, even emoji), surrounded by quotes. JavaScript accepts three kinds of quotes:

```js
const a = "double quotes";
const b = 'single quotes';
const c = `backticks`;
console.log(a);
console.log(b);
console.log(c);
```

Output:

```text
double quotes
single quotes
backticks
```

Double and single quotes work exactly the same. The **backtick** (`` ` ``, usually at the top left of the keyboard, below **Esc**) has extra powers, which you will see shortly.

Whichever quote you start with, you must end with the same one.

### Quotes inside strings

What if the text itself contains a quote, like *It's raining*? This breaks:

```js
console.log('It's raining');
```

Output:

```text
SyntaxError: missing ) after argument list
```

JavaScript sees `'It'` as the whole string, and then does not know what to do with `s raining'`. Node's caret points at the part it could not make sense of.

There are two fixes. The first: use the **other** kind of quote around the outside.

```js
console.log("It's raining");
console.log('She said "hello"');
```

Output:

```text
It's raining
She said "hello"
```

The second: put a **backslash** `\` in front of the quote. A backslash means "the next character is part of the text, not the end of the string". This is called **escaping** a character.

```js
console.log('It\'s raining');
console.log("She said \"hello\"");
```

Output:

```text
It's raining
She said "hello"
```

### Special characters: new lines and tabs

The backslash has one more job. Some characters are hard to type inside a string, so they have short codes called **escape sequences**:

| Code | Means |
|---|---|
| `\n` | new line |
| `\t` | tab (a wide space) |
| `\"` or `\'` | a quote |
| `\\` | a real backslash |

```js
console.log("Line one\nLine two");
```

Output:

```text
Line one
Line two
```

## Joining strings together

You already know that `+` joins strings. This is called **concatenation** (from the Latin for "chaining together"):

```js
const firstName = "Ama";
const lastName = "Owusu";
const fullName = firstName + " " + lastName;
console.log(fullName);
```

Output:

```text
Ama Owusu
```

Note the `" "` in the middle, a string containing one space. Without it you would get `AmaOwusu`.

Concatenation gets messy quickly, though. Here is a single receipt line:

```js
const item = "Bread";
const quantity = 2;
const price = 18;
console.log(item + " x" + quantity + ": R" + (quantity * price).toFixed(2));
```

Output:

```text
Bread x2: R36.00
```

It works, but count the quotes and plus signs. It is hard to read, and a space in the wrong place is hard to spot.

## Template literals: the nicer way

A **template literal** is a string written with backticks, in which you can drop values straight into the text using `${ }`:

```js
const item = "Bread";
const quantity = 2;
const price = 18;
console.log(`${item} x${quantity}: R${(quantity * price).toFixed(2)}`);
```

Output:

```text
Bread x2: R36.00
```

Same result, but now you can **see** the shape of the line. Read it like a form with blanks to fill in: "*item* x*quantity*: R*total*".

Inside `${ }` you can put **any expression**: a variable, a sum, a `toFixed` call. JavaScript works it out and puts the answer into the text.

```js
console.log(`2 + 3 = ${2 + 3}`);
```

Output:

```text
2 + 3 = 5
```

The `2 + 3` outside the braces is ordinary text. The one inside `${ }` is calculated.

Template literals can also span several lines, exactly as you type them:

```js
console.log(`Dear customer,
Your order has shipped.`);
```

Output:

```text
Dear customer,
Your order has shipped.
```

::: analogy A form with blanks
A template literal is like a printed form: "Dear ______, your balance is R______." The backticks are the form. Each `${ }` is a blank. JavaScript fills in each blank with the value you name, and hands you the finished page.
:::

From here on, this course uses template literals whenever it builds text that contains values. You will write them hundreds of times.

::: try Build a greeting card
1. In `coding-practice`, create `phase-1/strings.js`.
2. Type in:
   ```js
   const name = "Lindiwe";
   const age = 16;
   const town = "Mthatha";

   console.log("Hello, " + name + "!");
   console.log(`Hello, ${name}!`);
   console.log(`${name} is ${age} and lives in ${town}.`);
   console.log(`Next year ${name} will be ${age + 1}.`);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-1/strings.js
   ```
4. You should see:
   ```text
   Hello, Lindiwe!
   Hello, Lindiwe!
   Lindiwe is 16 and lives in Mthatha.
   Next year Lindiwe will be 17.
   ```
5. **Now experiment.** On the last line, change the backticks to double quotes (leave everything else). Predict what will print, then run it. Change them back afterwards.
:::

That experiment shows the most common template literal mistake: `${ }` only works inside **backticks**. In ordinary quotes, it is printed as plain text: `Next year ${name} will be ${age + 1}.`

::: quiz
What does this print?

```js
const qty = 3;
const price = 12;
console.log(`${qty} x R${price} = R${qty} * ${price}`);
```

- [ ] `3 x R12 = R36`
- [x] `3 x R12 = R3 * 12`
- [ ] `qty x Rprice = Rqty * price`
- [ ] `3 x R12 = R3 * price`

Only what is **inside** a `${ }` is worked out. `${qty}` and `${price}` are filled in separately, and the ` * ` between them is ordinary text. To get `R36`, the whole sum has to be inside one pair of braces: `R${qty * price}`.
:::

## How long is a string?

Every string knows how many characters it has. Ask for its `.length`:

```js
const password = "sunshine";
console.log(password.length);
console.log("Hello, world!".length);
console.log("".length);
```

Output:

```text
8
13
0
```

Spaces and punctuation count as characters. `"Hello, world!"` has 13. `""` (two quotes with nothing between) is the **empty string**, a string with no characters, so its length is `0`.

Notice there are no brackets after `length`. It is not an action, it is a fact about the string, like the number of beads on the necklace.

Real uses: "your password must be at least 8 characters", "a tweet can be at most 280 characters", "an SA ID number has exactly 13 digits".

## Picking out one character

Each character has a position number, called its **index**. You get a character by putting its index in square brackets:

```js
const name = "Lindiwe";
console.log(name[0]);
console.log(name[1]);
console.log(name[6]);
```

Output:

```text
L
i
e
```

**Counting starts at 0, not 1.** The first character is `name[0]`. This trips up everyone at first, and it will keep catching you out for a while.

| Character | L | i | n | d | i | w | e |
|---|---|---|---|---|---|---|---|
| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 |

"Lindiwe" has 7 characters, numbered 0 to 6. So the **last** index is always one less than the length. That gives you a way to get the last character of any string, whatever its length:

```js
const name = "Lindiwe";
console.log(name[name.length - 1]);
```

Output:

```text
e
```

If you ask for an index that does not exist, like `name[99]`, you do not get an error. You get `undefined`, JavaScript's word for "nothing is there". You will meet `undefined` properly in the [next lesson](#/phase-01-storing-information/06-booleans-null-undefined).

Why start at 0? Think of the index as "how many steps from the start". The first character is 0 steps from the start. This same counting returns with lists in [Phase 5](#/phase-05-arrays/01-what-is-an-array), so it is worth getting used to now.

::: quiz
What does this print?

```js
const code = "JHB-47";
console.log(code[2], code[code.length - 2], code[6]);
```

- [x] `B 4 undefined`
- [ ] `H - 7`
- [ ] `B 7 undefined`
- [ ] `B 4 7`

Indexes start at 0, so `code[2]` is the third character, `B`. The string has 6 characters, so `code.length - 2` is 4, and `code[4]` is `4`. The last index is 5, so `code[6]` does not exist and gives `undefined`, with no error. `H - 7` is what you get if you count from 1.
:::

## Asking a string to do something

Strings come with built-in abilities, called **methods**. You use one by writing the string (or its variable), a dot, the method's name, and brackets:

```js
const shout = "hello".toUpperCase();
console.log(shout);
```

Output:

```text
HELLO
```

Read the dot as "**ask this string to…**": "ask `"hello"` to turn itself into upper case". The brackets mean "do it now". Some methods need extra information inside the brackets, some do not. You used the same pattern with `total.toFixed(2)` on numbers. [Phase 6](#/phase-06-objects/03-objects-and-functions) explains exactly what the dot means. For now, the "ask it to…" reading is all you need.

Here are the ones you will use most.

### Changing case: `toUpperCase()` and `toLowerCase()`

```js
console.log("Pretoria".toUpperCase());
console.log("PRETORIA".toLowerCase());
```

Output:

```text
PRETORIA
pretoria
```

Real use: people type things in all sorts of ways ("Yes", "YES", "yes"). Turning everything to lower case first means you only have one version to deal with.

### Removing spaces: `trim()`

`trim()` removes spaces (and tabs and new lines) from the **start and end** of a string, but not from the middle:

```js
const typed = "   Thabo Nkosi  ";
console.log(`[${typed}]`);
console.log(`[${typed.trim()}]`);
```

Output:

```text
[   Thabo Nkosi  ]
[Thabo Nkosi]
```

(The square brackets are only there so you can see where the spaces are.) Real use: when people type into a form, they often add a stray space by accident. `trim()` cleans that up.

### Searching: `includes()` and `startsWith()`

`includes` asks "does this string contain that piece of text somewhere?" `startsWith` asks "does it begin with that?"

```js
console.log("thandi@example.com".includes("@"));
console.log("thandi.example.com".includes("@"));
console.log("0821234567".startsWith("08"));
```

Output:

```text
true
false
true
```

The answers are `true` and `false`: yes-or-no values. They are a data type of their own, and they are the subject of the [next lesson](#/phase-01-storing-information/06-booleans-null-undefined). Later they will let your program *decide* things, such as rejecting an email address without an `@`.

Searching is **case-sensitive**: `"Hello".includes("h")` is `false`, because `h` and `H` are different characters.

### Cutting out a piece: `slice()`

`slice(start, end)` gives you a copy of part of the string, from index `start` up to **but not including** index `end`:

```js
const city = "Johannesburg";
console.log(city.slice(0, 4));
console.log(city.slice(4));
console.log(city.slice(-4));
```

Output:

```text
Joha
nnesburg
burg
```

- `slice(0, 4)` gives indexes 0, 1, 2 and 3: four characters.
- `slice(4)`, with no end, goes all the way to the end.
- `slice(-4)` counts **from the end**: the last four characters.

"Up to but not including" feels odd at first. One upside: `slice(0, 4)` gives exactly 4 characters, because 4 − 0 = 4.

### Swapping text: `replace()`

`replace(old, new)` gives you a copy with the **first** match of `old` swapped for `new`:

```js
console.log("I love tea. Tea is great.".replace("tea", "coffee"));
console.log("banana".replace("a", "o"));
```

Output:

```text
I love coffee. Tea is great.
bonana
```

Two surprises here: `Tea` with a capital T was not replaced (case-sensitive again), and only the **first** `a` in banana changed. Keep both in mind.

::: try Tidy up messy input
1. Create `phase-1/tidy-name.js` and type:
   ```js
   const typedName = "   nOMSA  ";

   const clean = typedName.trim();
   const firstLetter = clean[0].toUpperCase();
   const rest = clean.slice(1).toLowerCase();

   console.log(`[${typedName}]`);
   console.log(`[${firstLetter + rest}]`);
   console.log(`Length before: ${typedName.length}, after: ${clean.length}`);
   ```
2. Run it with `node phase-1/tidy-name.js`. You should see:
   ```text
   [   nOMSA  ]
   [Nomsa]
   Length before: 10, after: 5
   ```
3. **Now experiment.** Change the typed name to `"  jOHN-PAUL "`. Predict the output, then run it. Does the capital P survive? Why not?
:::

::: quiz
What does this print?

```js
const email = "  Sipho.Dlamini@Mail.co.za ";
console.log(email.trim().toLowerCase().slice(0, 5), email.includes("mail"));
```

- [ ] `sipho true`
- [ ] `sipho. false`
- [x] `sipho false`
- [ ] `  sip false`

Read the chain left to right: `trim()` removes the outside spaces, `toLowerCase()` gives `"sipho.dlamini@mail.co.za"`, and `slice(0, 5)` takes indexes 0 to 4, five characters: `sipho`. But `includes` is asked of the **original** `email`, which has `Mail` with a capital M, and searching is case-sensitive, so the answer is `false`. `sipho.` is the off-by-one answer: `slice` stops *before* index 5.
:::

## Strings never change

Here is the rule from the analogy: a string, once made, **cannot be changed**. Programmers say strings are **immutable** (unchangeable). Every method you have seen gives you back a **new** string. The original stays exactly as it was.

This catches out almost everyone:

```js
let city = "durban";
city.toUpperCase();
console.log(city);
```

Output:

```text
durban
```

The second line did make `"DURBAN"`, but nobody kept it. It was thrown away straight after. To keep the result, store it:

```js
let city = "durban";
city = city.toUpperCase();
console.log(city);
```

Output:

```text
DURBAN
```

Or store it in a new `const`, such as `const loudCity = city.toUpperCase();`, and keep both versions.

The same applies to single characters. Trying to change one by index does nothing at all, with no error:

```js
let word = "cat";
word[0] = "b";
console.log(word);
```

Output:

```text
cat
```

To get `"bat"`, build a new string: `"b" + word.slice(1)`.

::: predict What does this print?
```js
const greeting = "  Sawubona  ";
greeting.trim();
const loud = greeting.toUpperCase();
console.log(`[${loud}]`);
```
:::

::: solution
```text
[  SAWUBONA  ]
```
The spaces are still there. `greeting.trim()` on line 2 created a trimmed copy, but it was never stored, so it vanished. `greeting` itself never changed. Fix it with `const loud = greeting.trim().toUpperCase();`. That line asks for a trimmed copy, then asks *that* copy for an upper-case version. Calling one method straight after another like this is called **chaining**.
:::

::: quiz
What does this print?

```js
let code = "abc";
code.toUpperCase();
code = code + "d";
code[0] = "X";
console.log(code, code.length);
```

- [ ] `ABCd 4`
- [ ] `Xbcd 4`
- [ ] `XBCD 4`
- [x] `abcd 4`

Line 2 makes `"ABC"` but never stores it, so it is thrown away. Line 3 does store something: a new string, `"abcd"`. Line 4 tries to change one character by index, which silently does nothing, because strings cannot be changed. So `code` is `"abcd"`, 4 characters long. `ABCd` is what you would expect if `toUpperCase()` changed the string in place.
:::

## The number-and-string trap: `"5" + 5`

You saw this coming in lesson 1. It is still the single most common surprise for beginners, so here it is again, on purpose:

```js
console.log(5 + 5);
console.log("5" + 5);
console.log(5 + "5");
```

Output:

```text
10
55
55
```

When `+` has a string on **either** side, it joins instead of adding. JavaScript quietly turns the number `5` into the text `"5"` and glues them together.

It gets sneakier when there are several `+` signs, because JavaScript works left to right:

```js
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
```

Output:

```text
33
123
```

In the first line, `1 + 2` is two numbers, so it adds to `3`, then `3 + "3"` joins to `"33"`. In the second, `"1" + 2` is already a string, `"12"`, and from then on everything is joined.

Why does this matter so much? Because when a user types a number into your program, it arrives as a **string**. `"1500" + 200` is `"1500200"`, not `1700`. The fix, converting text to a number, is the subject of [Converting between types](#/phase-01-storing-information/07-converting-between-types).

::: exercise Level 1 — Guided · A receipt line
Create `phase-1/receipt-line.js`.

1. Create constants `item` (`"Rooibos tea"`), `quantity` (`3`) and `unitPrice` (`42.5`).
2. Create a constant `lineTotal` that is `quantity * unitPrice`.
3. Using a template literal, print: `3 x Rooibos tea @ R42.50 = R127.50`. Use `toFixed(2)` for both money amounts.
4. Print the item name in upper case on its own line.
5. Print how many characters the item name has, with a label.
6. Run it and compare with the expected output in the solution.
:::

::: solution
```js
const item = "Rooibos tea";
const quantity = 3;
const unitPrice = 42.5;
const lineTotal = quantity * unitPrice;

console.log(`${quantity} x ${item} @ R${unitPrice.toFixed(2)} = R${lineTotal.toFixed(2)}`);
console.log(item.toUpperCase());
console.log(`Name length: ${item.length}`);
```
Output:
```text
3 x Rooibos tea @ R42.50 = R127.50
ROOIBOS TEA
Name length: 11
```
:::

::: exercise Level 2 — On your own · Make a username
A school creates usernames for its learners like this: the **first letter** of the first name, then the **whole surname**, all in **lower case**, then the last two digits of the year they started.

Create `phase-1/username.js`. Start with:

```js
const firstName = "Thabo";
const surname = "Nkosi";
const startYear = 2024;
```

Print `tnkosi24`. Then change the names to `"Aisha"` and `"Van der Merwe"` and see what you get. (Spaces in a username are a problem. You do not have the tool to remove them all yet, so note it and move on.)
:::

::: hint
`firstName[0]` gives the first letter. For the last two digits of the year, remember `%` from [Numbers](#/phase-01-storing-information/04-numbers): what is the remainder when you divide 2024 by 100?
:::

::: solution
```js
const firstName = "Thabo";
const surname = "Nkosi";
const startYear = 2024;

const username = `${firstName[0]}${surname}${startYear % 100}`.toLowerCase();
console.log(username);
```
Output:
```text
tnkosi24
```
With `"Aisha"` and `"Van der Merwe"` it prints `avan der merwe24`. Another way to write it, without the template literal, is `firstName[0].toLowerCase() + surname.toLowerCase() + startYear % 100`. Both are fine. (Be careful with the year: `startYear % 100` for 2007 gives `7`, not `07`. Real systems handle that with an extra step you will be able to write later.)
:::

::: debug Three string bugs
Each program has a bug. Run it, compare with what it *should* print, and fix it.

```js
// Program A: should print  Welcome back, Kagiso!
const user = "Kagiso";
console.log("Welcome back, ${user}!");
```

```js
// Program B: should print  SIPHO
const name = "sipho";
name.toUpperCase();
console.log(name);
```

```js
// Program C: should print the last letter,  e
const town = "Polokwane";
console.log(town[town.length]);
```
:::

::: solution
**A** prints `Welcome back, ${user}!` literally. `${ }` only works inside backticks. Use `` console.log(`Welcome back, ${user}!`); ``.

**B** prints `sipho`. Strings never change, and the upper-case copy was not stored. Use `console.log(name.toUpperCase());`, or store it in a new variable.

**C** prints `undefined`, not `e`. Indexes start at 0, so the last one is `town.length - 1`. `town.length` is 9, the characters are numbered 0 to 8, and there is nothing at index 9. Use `town[town.length - 1]`. Being out by one like this is so common that it has a name: an **off-by-one error**.
:::

::: mistake
**Using `${ }` inside normal quotes.** Only backticks fill in the blanks.

**Forgetting that counting starts at 0.** The first character is `[0]`, and the last is `[text.length - 1]`.

**Calling a method and not keeping the result.** `name.trim();` on its own does nothing useful. Write `name = name.trim();` or use the result directly.

**Writing `.length()` with brackets.** `length` is a fact, not an action: `name.length`. With brackets you get `TypeError: name.length is not a function`.

**Mixing quote types.** `"Hello'` is not a string. Start and end with the same quote.

**Expecting `+` to add when one side is text.** `"5" + 5` is `"55"`. Convert text to numbers first (two lessons from now).

**Forgetting that searches are case-sensitive.** `"Hello".includes("h")` is `false`. Lower-case both sides first if case should not matter.
:::

::: quiz
What does this print?

```js
const a = 2;
const b = "3";
console.log(a + a + b + a);
```

- [ ] `9`
- [x] `432`
- [ ] `2232`
- [ ] `45`

JavaScript works left to right. `a + a` is two numbers, so it adds: 4. Then `4 + "3"` has a string in it, so it joins: `"43"`. From then on everything joins, so `"43" + 2` is `"432"`. `45` is the trap of thinking the last `+` adds again: once the result is a string, it stays a string.
:::

## Real-world uses

- **Receipts, invoices and payslips:** every line is a template literal with amounts formatted by `toFixed(2)`.
- **Sign-up forms:** `trim()` the input, check `.length` for passwords, check that an email `includes("@")`.
- **Search boxes:** lower-case both the search word and the text, then use `includes`, so "PAP" finds "pap".
- **Usernames and file names:** built from pieces with `slice`, `toLowerCase` and template literals.
- **Messages:** "Hi Lerato, your order #1042 has shipped" is a template literal with two blanks.
- **Masking:** banking apps show `**** 4821` using `slice(-4)` to show only the last four digits of a card.

::: connect
**This builds on:** [values](#/phase-01-storing-information/01-values-and-output), where you first joined strings with `+`, and [numbers](#/phase-01-storing-information/04-numbers), whose `toFixed(2)` now slots neatly into template literals.

**This unlocks:** almost every line of output in the rest of the course. `true` and `false`, which `includes` just gave you, are the subject of the [next lesson](#/phase-01-storing-information/06-booleans-null-undefined). Counting from 0 comes back with arrays in [Phase 5](#/phase-05-arrays/01-what-is-an-array), and [Strings and arrays together](#/phase-05-arrays/05-strings-and-arrays) shows how to split a sentence into words.
:::

::: challenge Mask a card number
Banking apps never show your whole card number. Given:

```js
const cardNumber = "4539148803436467";
```

Print it masked like this, with twelve `*` characters followed by the real last four digits:

```text
Card: ************6467
Length check: 16
```

The second line should confirm that the masked version is still 16 characters long. Do not count the stars by hand: build them from the card number's length. (Hint: `"*".repeat(12)` gives twelve stars. `repeat` is another string method; try it.)
:::

::: solution
```js
const cardNumber = "4539148803436467";

const lastFour = cardNumber.slice(-4);
const stars = "*".repeat(cardNumber.length - 4);
const masked = stars + lastFour;

console.log(`Card: ${masked}`);
console.log(`Length check: ${masked.length}`);
```
Output:
```text
Card: ************6467
Length check: 16
```
Using `cardNumber.length - 4` instead of typing `12` means the same code works for a card number of any length.
:::

::: recap
- A **string** is text in quotes: `"double"`, `'single'` or `` `backticks` ``. Escape a quote inside with `\`, and use `\n` for a new line.
- Join strings with `+` (**concatenation**), or, more readably, with a **template literal**: `` `Hello, ${name}!` ``. Any expression can go inside `${ }`.
- `.length` gives the number of characters. `text[0]` is the first character, and `text[text.length - 1]` is the last. Counting starts at 0.
- **Methods** are abilities you ask for with a dot: `toUpperCase()`, `toLowerCase()`, `trim()`, `includes()`, `startsWith()`, `slice()`, `replace()`.
- Strings are **immutable**: methods return a new string, and you must store it to keep it.
- If either side of `+` is a string, `+` joins instead of adding: `"5" + 5` is `"55"`.
:::

::: interview Why do template literals make code easier to read than `+`?
The text keeps its shape, with values slotted in at `${ }`, so you can see the finished line at a glance. With `+`, the text is broken into many small pieces, and a lost space or quote is hard to spot.
:::

::: interview What does `"Hello"[1]` give, and why?
`"e"`. String positions (indexes) start at 0, so index 1 is the second character.
:::

::: interview After `const name = "ayo"; name.toUpperCase();`, why is `name` still `"ayo"`?
Strings are immutable. `toUpperCase()` returns a new string, `"AYO"`, and does not change the original. The new string was not stored anywhere, so it was lost. (And `name` is a `const`, so it could not be given the new value anyway.)
:::

::: checkpoint
- [ ] I printed strings with double quotes, single quotes and backticks, and printed a quote inside a string
- [ ] I built the greeting card with template literals, and saw what happens with the wrong quotes
- [ ] I picked out the first and last characters of a string using indexes
- [ ] I tidied messy input with `trim`, `toUpperCase`, `toLowerCase` and `slice`
- [ ] I saw for myself that `name.toUpperCase();` on its own does not change `name`
- [ ] I built the username `tnkosi24`
- [ ] I fixed all three bugs in "Debug this"
:::

::: resources
- **javascript.info, "Strings":** https://javascript.info/string. Everything in this lesson and a bit more, with small exercises.
- **MDN, "Handling text — strings in JavaScript":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Strings. A beginner guide to quotes, escaping and template literals.
- **MDN, "Useful string methods":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods. More methods, with examples you can edit in the page.
:::
