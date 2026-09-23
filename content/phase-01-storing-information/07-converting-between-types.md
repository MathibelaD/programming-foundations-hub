---
title: Converting between types
summary: Turning text into numbers and numbers into text, what NaN means, and why you should never let JavaScript guess.
minutes: 40
stage: Phase 1
---

## What you will learn

- Why programs constantly need to turn text into numbers (and back)
- How to convert with `Number()`, `parseInt()`, `parseFloat()` and `String()`, and when to use each
- What `NaN` means, how you end up with it, and how to check for it with `Number.isNaN`
- Why JavaScript's automatic conversions are a trap, and why you should always convert on purpose

**Before this:** [true, false, and "nothing"](#/phase-01-storing-information/06-booleans-null-undefined). You should know the five types and how to use `typeof`.

## The problem: text that looks like a number

Here is a fact that surprises most beginners: **anything a person types into a program arrives as text.** It does not matter whether they typed `Thabo` or `25` or `1500.50`. It always comes in as a string. The same goes for anything read from a file, or received from a website.

That is a problem the moment you try to calculate. Pretend a user typed their age, and your program wants to work out how old they will be next year:

```js
const typedAge = "25";   // pretend the user typed this
console.log(typedAge + 1);
```

Output:

```text
251
```

"You will be 251 next year!" Because `typedAge` is a string, `+` joins instead of adding. You saw this trap in [Strings](#/phase-01-storing-information/05-strings). Now you will learn to get out of it.

In the [next lesson](#/phase-01-storing-information/08-getting-input-from-the-user), your programs will ask real questions and get real typed answers. Everything in this lesson is preparation for that. For now, strings like `"25"` stand in for what a user would type.

::: analogy Changing money at the airport
You land in another country with rand in your wallet. The shops only take the local currency. The money you have is real and has value, but you cannot spend it until you **exchange** it.

Converting types is the same. The string `"25"` really does contain the information "twenty-five". But until you take it to the exchange counter, `Number()`, you cannot do maths with it. And, just like at a real exchange counter, some things cannot be exchanged at all: try changing a bus ticket into rand and you will get nothing back. In JavaScript, that "nothing" is called `NaN`.
:::

## Text to number: `Number()`

`Number(value)` converts a value to a number:

```js
const typedAge = "25";
const age = Number(typedAge);

console.log(age + 1);
console.log(typeof typedAge, typeof age);
```

Output:

```text
26
string number
```

That is the fix for the "251" problem. `typedAge` is still a string (remember, converting never changes the original), but `age` is a real number.

`Number()` is **strict**: the whole string must look like a number. It allows spaces at the start and end, a minus sign, and a decimal point. Anything else, and it gives up:

```js
console.log(Number("19.99"));
console.log(Number("  42  "));
console.log(Number("-3"));
console.log(Number("12.5kg"));
console.log(Number("R150"));
console.log(Number("1,500"));
```

Output:

```text
19.99
42
-3
NaN
NaN
NaN
```

The last three show a very real problem. People often type `R150` or `1,500` (with a comma or a space between thousands). To a human, those are clearly numbers. To `Number()`, they are not, because of the `R` and the `,`. What you get back is `NaN`, which you will meet properly in a moment.

::: warn Number("") is 0
One odd case: `Number("")`, an empty string, gives `0`, not `NaN`. So if a user presses **Enter** without typing anything, `Number()` quietly turns that into zero. Remember this. It is a sneaky source of bugs, and you will handle it in [Phase 2](#/phase-02-making-decisions/04-truthy-and-falsy).
:::

## Text to number, more forgivingly: `parseInt()` and `parseFloat()`

JavaScript has two other converters that are more forgiving. They read from the start of the string and **stop** at the first character that does not fit, keeping what they have so far.

- `parseInt` ("parse integer") reads a **whole number**.
- `parseFloat` ("parse floating-point number") reads a number that **may have a decimal point**.

To **parse** means to read text and work out its meaning.

```js
console.log(parseInt("12.5kg"));
console.log(parseFloat("12.5kg"));
console.log(parseInt("42 people"));
console.log(parseInt("19.99"));
console.log(parseInt("kg12"));
```

Output:

```text
12
12.5
42
19
NaN
```

Walk through them:

- `parseInt("12.5kg")` reads `1`, `2`, then hits `.`, which is not part of a whole number. It stops and gives `12`.
- `parseFloat("12.5kg")` reads `12.5`, then hits `k`, and stops. It gives `12.5`.
- `parseInt("42 people")` reads `42` and ignores the rest.
- `parseInt("19.99")` gives `19`. It does **not** round. It stops at the dot. That is a surprise if you expected `20`.
- `parseInt("kg12")` fails, because the very first character is not a digit. There is nothing to keep.

### Which one should I use?

| You have | Use | Example | Result |
|---|---|---|---|
| Text that should be a number and nothing else (most user input) | `Number()` | `Number("19.99")` | `19.99` |
| A number followed by units or words | `parseFloat()` | `parseFloat("12.5kg")` | `12.5` |
| The same, but you only want the whole number part | `parseInt()` | `parseInt("42 people")` | `42` |

The course's advice: **use `Number()` by default**. Its strictness is a feature. If someone types `12abc` for their income, you *want* to find out that it is not a proper number, rather than quietly carrying on with `12`. Reach for `parseInt` and `parseFloat` when you know the text has extra bits on the end that you want to ignore.

::: try Three converters, side by side
1. In `coding-practice`, create `phase-1/convert.js`.
2. Type in:
   ```js
   const weight = "2.75kg";

   console.log("Number:", Number(weight));
   console.log("parseInt:", parseInt(weight));
   console.log("parseFloat:", parseFloat(weight));
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-1/convert.js
   ```
4. You should see:
   ```text
   Number: NaN
   parseInt: 2
   parseFloat: 2.75
   ```
5. **Now experiment.** Change `weight` to each of these in turn, and predict all three lines before you run it: `"2.75"`, `"  8  "`, `"kg 2.75"`, `"3 bags"`.
:::

## `NaN`: Not a Number

`NaN` stands for **Not a Number**. It is JavaScript's way of saying "you asked for a number, but there is no sensible number I can give you". You get it when:

- a conversion fails: `Number("abc")`,
- you do maths with something that is not a number: `"5" - "abc"`,
- a calculation has no answer: `0 / 0`, which you saw in [Numbers](#/phase-01-storing-information/04-numbers).

Here is the strange part:

```js
console.log(typeof NaN);
```

Output:

```text
number
```

"Not a Number" is of type `number`. Think of it as a special number-shaped **error value**: it lives in the number type, but it means "this calculation went wrong".

### `NaN` spreads

Anything you calculate with `NaN` also becomes `NaN`:

```js
const income = Number("R8000");   // the user typed an R
const rent = 3500;
const left = income - rent;
console.log("Left over:", left);
```

Output:

```text
Left over: NaN
```

The mistake happened on the first line, but it only shows up at the end, after passing through other calculations. In a bigger program, `NaN` can travel a long way from where it was born. When you see `NaN` in your output, **trace it backwards**: find the first value that was `NaN`, and you have found the bug.

### Checking for `NaN`: `Number.isNaN()`

Since `NaN` means "this went wrong", you will want to check for it. `Number.isNaN(value)` answers the question "is this value `NaN`?" with a boolean:

```js
console.log(Number.isNaN(Number("abc")));
console.log(Number.isNaN(Number("42")));
```

Output:

```text
true
false
```

Why not something simpler? Because `NaN` has one more oddity: it is **not equal to anything, not even to itself**. That means the obvious way of checking, "is this value the same as `NaN`?", always says no. You will see exactly what that means when you learn to compare values in [Phase 2](#/phase-02-making-decisions/01-comparing-values). For now, the rule is simple: **to check for `NaN`, always use `Number.isNaN()`**.

Right now, all you can do with the answer is print it. In [Phase 2](#/phase-02-making-decisions/02-if-and-else) you will use it to say "that is not a number, please try again".

::: predict NaN or not?
For each line, decide whether it prints a number or `NaN`. If it is a number, which one?

```js
console.log(Number("007"));
console.log(Number("seven"));
console.log(parseInt("7 days"));
console.log(Number("7 days"));
console.log(Number("") + 7);
console.log(Number.isNaN(Number("7.0")));
```
:::

::: solution
```text
7
NaN
7
NaN
7
false
```
- Leading zeros are fine: `"007"` is `7`.
- `"seven"` is a word. `Number()` does not read English.
- `parseInt` keeps the `7` and ignores `" days"`, while the strict `Number` refuses the whole thing.
- `Number("")` is `0` (the sneaky case from the warning), so `0 + 7` is `7`.
- `"7.0"` converts to `7`, which is a real number, so `Number.isNaN` says `false`.
:::

## Number to text: `String()` and template literals

Going the other way is easier, because any number can be written as text:

```js
const year = 2025;
const yearText = String(year);
console.log(yearText, typeof yearText);

const alsoText = `${year}`;
console.log(alsoText, typeof alsoText);
```

Output:

```text
2025 string
2025 string
```

When would you want this? When you need to treat a number as text: to count its digits with `.length`, take its last two digits with `slice`, or join it into a code:

```js
const year = 2025;
console.log(String(year).length);
console.log(String(year).slice(-2));
```

Output:

```text
4
25
```

Most of the time, though, you do not need to convert numbers to text yourself. Template literals and `console.log` do it for you when they display a number.

## Automatic conversion: when JavaScript guesses

If you mix types in an expression, JavaScript does not stop with an error. It **guesses** what you meant, and converts one side automatically. This is called **type coercion** (coercion means "forcing"). The rules are consistent, but they are not what most people expect:

```js
console.log("10" - 2);
console.log("10" + 2);
console.log("3" * "4");
console.log("10" / "2");
```

Output:

```text
8
102
12
5
```

The pattern:

- `-`, `*` and `/` only make sense for numbers, so JavaScript converts the strings to numbers and does the maths. `"10" - 2` is `8`.
- `+` makes sense for **both** numbers and strings. If either side is a string, JavaScript joins. `"10" + 2` is `"102"`.

So `-` "works" with text, and `+` does not. That inconsistency is exactly why you should not rely on automatic conversion. Code that happens to work with `-` breaks the day someone changes it to `+`.

::: analogy A waiter who guesses your order
Imagine a waiter who, instead of asking what you meant, guesses. Order "a tea and a two" and they bring... something. Sometimes the guess is right. Sometimes you get a very strange plate of food. You would much rather say exactly what you want.

**Converting explicitly**, with `Number()` or `String()`, is saying exactly what you want. Your code then does the same thing every time, and anyone reading it can see what is happening.
:::

The rule for this course: **as soon as you get text that should be a number, convert it with `Number()`, once, straight away.** Then every calculation after that is working with real numbers.

```js
const typedPrice = "12.50";
const typedTip = "7.25";

// Wrong: + joins the text
console.log(typedPrice + typedTip);

// Right: convert first, then calculate
const price = Number(typedPrice);
const tip = Number(typedTip);
console.log(price + tip);
```

Output:

```text
12.507.25
19.75
```

## `toFixed` gives you text

In [Numbers](#/phase-01-storing-information/04-numbers) you were warned that `toFixed` returns a string. Now you can see why that matters:

```js
const price = 19.99;
const shown = price.toFixed(2);

console.log(typeof shown);
console.log(shown + 5);
console.log(Number(shown) + 5);
```

Output:

```text
string
19.995
24.99
```

`shown + 5` joins `"19.99"` and `5` into `"19.995"`, which looks like a real price, so the mistake is hard to notice. If you ever need to calculate with a rounded value, convert it back with `Number()`. But the better habit, as before, is: **do all your maths with numbers, and call `toFixed` last, only for display.**

::: exercise Level 1 — Guided · Fixing typed input
Pretend these three values were typed by a user filling in a form for a school trip:

```js
const typedName = "  Precious ";
const typedTickets = "3";
const typedPrice = "85.50";
```

Create `phase-1/trip.js` and start with those three lines.

1. Create `name` by trimming `typedName`.
2. Create `tickets` by converting `typedTickets` with `Number()`.
3. Create `price` by converting `typedPrice` with `Number()`.
4. Create `total` as `tickets * price`.
5. Print `Precious: 3 tickets, total R256.50` using a template literal and `toFixed(2)`.
6. Print the types of `typedTickets` and `tickets`, to prove the conversion happened.
:::

::: solution
```js
const typedName = "  Precious ";
const typedTickets = "3";
const typedPrice = "85.50";

const name = typedName.trim();
const tickets = Number(typedTickets);
const price = Number(typedPrice);
const total = tickets * price;

console.log(`${name}: ${tickets} tickets, total R${total.toFixed(2)}`);
console.log(typeof typedTickets, typeof tickets);
```
Output:
```text
Precious: 3 tickets, total R256.50
string number
```
(`"3" * "85.50"` would actually give the right answer here without converting, because `*` converts automatically. But change it to `+` one day and it breaks. Convert explicitly, always.)
:::

::: exercise Level 2 — On your own · Shopping list totals
Three prices came from a text file, so they are strings: `"R24.99"`, `"R9.50"` and `"R105.00"`. Each one has an `R` at the front.

Create `phase-1/shopping-total.js` that converts them to numbers, adds them up, and prints:

```text
Total: R139.49
```

Then change the second price to `"R9,50"` (with a comma, as some people write it) and see what happens. Write a comment in your file explaining why.
:::

::: hint
`Number("R24.99")` is `NaN` because of the `R`. You know a string method that can cut off the first character. Once the `R` is gone, `Number()` works.
:::

::: solution
```js
const price1 = "R24.99";
const price2 = "R9.50";
const price3 = "R105.00";

const total = Number(price1.slice(1)) + Number(price2.slice(1)) + Number(price3.slice(1));

console.log(`Total: R${total.toFixed(2)}`);
```
Output:
```text
Total: R139.49
```
With `"R9,50"`, `Number("9,50")` is `NaN`, because JavaScript only understands a **dot** as a decimal point. `NaN` then spreads through the addition, and the program prints `Total: RNaN`. (`parseFloat("9,50")` would give `9`, which is worse: a wrong answer with no warning.)
:::

::: debug The birthday calculator
This program should say `Zanele will be 18 next year.` and `In 10 years: 27`. Run it, work out what is wrong with each line, and fix it.

```js
const typedName = "Zanele";
const typedAge = "17";

const nextYear = typedAge + 1;
console.log(`${typedName} will be ${nextYear} next year.`);

const inTenYears = parseInt(typedAge + 10);
console.log(`In 10 years: ${inTenYears}`);
```
:::

::: solution
It prints `Zanele will be 171 next year.` and `In 10 years: 1710`.

Both bugs are the same one: `typedAge` is a string, so `+` joins. In the second line, `parseInt` is called **after** the joining, on `"1710"`, which is already wrong. Convert first, once, straight away:

```js
const typedName = "Zanele";
const typedAge = "17";
const age = Number(typedAge);

const nextYear = age + 1;
console.log(`${typedName} will be ${nextYear} next year.`);

const inTenYears = age + 10;
console.log(`In 10 years: ${inTenYears}`);
```
Output:
```text
Zanele will be 18 next year.
In 10 years: 27
```
:::

::: mistake
**Forgetting to convert.** Typed input is always a string. `"25" + 1` is `"251"`. Convert with `Number()` before any maths.

**Converting too late.** `Number(a + b)` joins first, then converts the joined text. Write `Number(a) + Number(b)`.

**Using `parseInt` for money.** `parseInt("19.99")` is `19`. Use `Number()` (or `parseFloat` if there are units on the end).

**Being surprised by `Number("")`.** Empty text becomes `0`, not `NaN`.

**Expecting `Number()` to understand `R`, commas or spaces between thousands.** `"R1,500"` becomes `NaN`. Strip them out first.

**Checking for `NaN` any way other than `Number.isNaN()`.** `NaN` is not equal to anything, not even itself.

**Doing maths with the result of `toFixed`.** It is text. Calculate first, format last.
:::

## Real-world uses

- **Every form on every website:** the age, quantity and amount boxes all give the program strings, which are converted to numbers before any calculation.
- **Reading files:** a spreadsheet saved as CSV is pure text. A program reading it converts each column: `Number()` for amounts, and dates and names left as text.
- **Shopping carts:** a quantity box that says `"2"` becomes `2` before it is multiplied by the price. Sites that forget this have shipped real bugs where "2 + 1 items" became "21 items".
- **Data cleaning:** `parseFloat("72.5kg")` pulls the number out of a measurement typed with units.
- **Validation:** `Number.isNaN(Number(input))` is the first step in "please enter a valid number" messages.

::: connect
**This builds on:** [data types](#/phase-01-storing-information/06-booleans-null-undefined) and the `"5" + 5` trap from [Strings](#/phase-01-storing-information/05-strings).

**This unlocks:** the [next lesson](#/phase-01-storing-information/08-getting-input-from-the-user), where your programs ask real questions. Every answer arrives as a string, and you will immediately wrap it in `Number()`. In [Phase 2](#/phase-02-making-decisions/02-if-and-else), `Number.isNaN` will finally let you *do* something about bad input, instead of printing `NaN`.
:::

::: challenge Tidy a messy amount
Someone typed their salary as `"  R 12 500.75 "`: with spaces around it, an `R`, and a space between the thousands.

Using only the string methods you know (`trim`, `slice`, `replace`) and `Number()`, turn it into the number `12500.75`, and print:

```text
Salary: 12500.75 (number)
Per week: R2884.79
```

Assume there are 52 weeks in a year and the salary is monthly, so "per week" is salary × 12 ÷ 52.
:::

::: hint
Work in small steps, printing after each one with square brackets around it so you can see the spaces: `` console.log(`[${step1}]`) ``. `replace` only replaces the **first** match, so count how many spaces you need to remove after trimming.
:::

::: solution
```js
const typed = "  R 12 500.75 ";

const trimmed = typed.trim();                // "R 12 500.75"
const withoutR = trimmed.slice(1);           // " 12 500.75"
const noSpace1 = withoutR.replace(" ", "");  // "12 500.75"
const noSpace2 = noSpace1.replace(" ", "");  // "12500.75"
const salary = Number(noSpace2);

const perWeek = salary * 12 / 52;

console.log(`Salary: ${salary} (${typeof salary})`);
console.log(`Per week: R${perWeek.toFixed(2)}`);
```
Output:
```text
Salary: 12500.75 (number)
Per week: R2884.79
```
This works for this exact input, but a different amount might have a different number of spaces. Cleaning up *any* input needs decisions and loops, which is where Phases 2 and 3 come in. Real programs usually ask people to type numbers without symbols, and then check the result.
:::

::: recap
- Typed input, file contents and web data always arrive as **strings**.
- `Number(text)` converts strictly: the whole string must be a number (spaces around it are fine). `Number("")` is `0`.
- `parseInt` and `parseFloat` read from the start and stop at the first character that does not fit. `parseInt` does not round.
- `String(n)` or `` `${n}` `` turns a number into text.
- `NaN` means "Not a Number". It comes from failed conversions and impossible maths, it spreads through calculations, its `typeof` is `"number"`, and you check for it with `Number.isNaN()`.
- JavaScript converts automatically when types are mixed (`"10" - 2` is `8`, `"10" + 2` is `"102"`). Do not rely on it. **Convert explicitly, once, straight away.**
- `toFixed` returns a string: calculate first, format last.
:::

::: interview What is the difference between `Number("12px")` and `parseInt("12px")`?
`Number("12px")` is `NaN`, because `Number` requires the whole string to be a valid number. `parseInt("12px")` is `12`, because it reads digits from the start and stops at the first character that is not part of a number.
:::

::: interview What is `NaN`, and how do you check for it?
`NaN` means "Not a Number". It is the result of a failed conversion or an impossible calculation, such as `Number("abc")` or `0 / 0`. Its type is still `number`. You check for it with `Number.isNaN(value)`, because `NaN` is not equal to anything, including itself.
:::

::: interview Why does `"10" - 2` give `8`, but `"10" + 2` give `"102"`?
Because of automatic type conversion. `-` only works on numbers, so JavaScript converts `"10"` to `10`. `+` works on strings too, and if either side is a string, it joins them. The safe habit is to convert with `Number()` yourself, so you never depend on these rules.
:::

::: checkpoint
- [ ] I saw `"25" + 1` give `251`, and fixed it with `Number()`
- [ ] I compared `Number`, `parseInt` and `parseFloat` on the same strings in `convert.js`
- [ ] I made `NaN` on purpose, watched it spread, and checked it with `Number.isNaN`
- [ ] I saw that `toFixed` returns a string and `"19.99" + 5` is `"19.995"`
- [ ] I finished the trip calculator and got `R256.50`
- [ ] I fixed the birthday calculator
:::

::: resources
- **javascript.info, "Type Conversions":** https://javascript.info/type-conversions. Short and precise, including the empty string rule.
- **javascript.info, "Numbers":** https://javascript.info/number. The sections on `parseInt`, `parseFloat` and `isNaN`.
- **MDN, "Number()":** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number. The official reference, with more examples.
:::
