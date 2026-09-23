---
title: Return values — getting answers back
summary: The difference between showing an answer and handing it back. Clear this one up and functions finally become truly useful.
minutes: 50
stage: Phase 4
---

## What you will learn

- How a function can **return** a value, so you can store it and use it again
- The single most common beginner confusion in this phase: **`console.log` versus `return`**, and why a function that only logs gives you `undefined`
- That `return` ends a function immediately, and how to use that for invalid input
- How to use returned values in calculations, conditions, and calls to other functions, including functions that return `true` or `false`

**Before this:** [Parameters and arguments](#/phase-04-functions/02-parameters-and-arguments). You should be able to pass values into a function.

## The problem: the answer is stuck on the screen

Three friends, Tumi, Megan and Sizwe, have a R300 dinner and want to add a 10% tip, then split the total three ways. You already have a tip function from last lesson, so you try to use it:

```js
function calculateTip(bill, percent) {
  const tip = bill * percent / 100;
  console.log(tip);
}

const tip = calculateTip(300, 10);
const each = (300 + tip) / 3;
console.log(`Each person pays R${each}`);
```

Output:

```text
30
Each person pays RNaN
```

The function clearly worked out the tip: `30` is right there on the screen. So why is the split `NaN`?

Because **printing something is not the same as handing it back**. `console.log(tip)` put `30` on the screen for a human to read, and that is all it did. The program itself never got the number. The variable `tip` outside the function ended up empty.

This lesson fixes that, and it is one of the most important ideas in the whole course. This trips up everyone at first, so take it slowly.

::: analogy Two calculators
Imagine two calculators.

**Calculator one has only a screen.** You type `300 × 10 ÷ 100` and it shows `30`. Lovely. But if you want to use that 30 in the next sum, you have to read it off the screen with your own eyes and type it in again yourself. The calculator did not give you anything you can hold.

**Calculator two prints a slip of paper**, like a till. You type the sum, and it hands you a slip that says `30`. You can put the slip in your pocket, pass it to a friend, or feed it into another calculation.

- `console.log` is **calculator one**: it *shows* the answer to a human. The program cannot use what is on the screen.
- `return` is **calculator two**: it *hands the answer back* to the code that asked, so the program can store it and use it.

Most of the time, you want calculator two.
:::

## `return`: handing the answer back

Here is the fixed tip function:

```js
function calculateTip(bill, percent = 10) {
  return bill * percent / 100;
}

const bill = 300;
const tip = calculateTip(bill);
const each = (bill + tip) / 3;
console.log(`Tip: R${tip.toFixed(2)}`);
console.log(`Each person pays R${each.toFixed(2)}`);
```

Output:

```text
Tip: R30.00
Each person pays R110.00
```

The keyword **`return`** means: "work out this value, and hand it back to whoever called me". The value that comes back is called the function's **return value**.

Here is the trick to reading code with `return`. **Picture the call being replaced by the value it returns.**

```js
const tip = calculateTip(bill);
```

When this line runs, JavaScript jumps into `calculateTip`, works out `300 * 10 / 100`, which is `30`, and returns it. Back on the calling line, `calculateTip(bill)` is swapped for `30`, so the line becomes:

```js
const tip = 30;
```

That is why `tip` now holds a real number, and the split works.

You have been doing exactly this with built-in functions all along. `const rounded = Math.round(4.7);` works because `Math.round` *returns* `5`. `const age = Number("25");` works because `Number` *returns* `25`. Now your own functions can do the same.

## Seeing the difference: `undefined`

Let us put a logging function and a returning function side by side and look at what each one gives back.

```js
function addAndShow(a, b) {
  console.log(a + b);
}

function addAndReturn(a, b) {
  return a + b;
}

const first = addAndShow(2, 3);
const second = addAndReturn(2, 3);

console.log("first holds:", first);
console.log("second holds:", second);
console.log("first * 10 =", first * 10);
console.log("second * 10 =", second * 10);
```

Output:

```text
5
first holds: undefined
second holds: 5
first * 10 = NaN
second * 10 = 50
```

Go through it line by line:

- The `5` on the very first line of output came from **inside** `addAndShow`, when it ran. It went to the screen, and nowhere else.
- `addAndShow` has no `return`, so it hands back **`undefined`**. That is JavaScript's rule: **a function without a `return` returns `undefined`**. So `first` holds `undefined`.
- `addAndReturn` printed nothing while it ran. But it handed back `5`, so `second` holds `5`.
- Maths with `undefined` gives `NaN`. Maths with `5` works.

::: try See `undefined` with your own eyes
1. Create `phase-4/show-or-return.js` in `coding-practice` and type in the program above.
2. Run it:
   ```bash
   node phase-4/show-or-return.js
   ```
3. Match every line of output to the line of code that printed it. Which line printed the lone `5` at the top?
4. **Change it, predict, run.** Change `addAndShow` so that it has *both* lines: `console.log(a + b);` and then `return a + b;`. Predict the new output before running it. What does `first` hold now?
:::

Here is the difference in one table. Learn it well.

| | `console.log(value)` | `return value` |
|---|---|---|
| Who gets the value? | A **human**, looking at the screen | The **code** that called the function |
| Can you store it in a variable? | No. The variable gets `undefined` | Yes |
| Can you use it in maths or an `if`? | No | Yes |
| Does the function stop there? | No, it carries on | **Yes**, immediately |
| When to use it | To show a final result to a person | To give a result back so the program can use it |

A helpful habit: **functions that work something out should return it. Leave the printing to the code that calls them.** You will build on this habit in [Designing programs with functions](#/phase-04-functions/06-designing-with-functions).

::: note Where does a returned value go if you ignore it?
Nowhere. If you write `addAndReturn(2, 3);` on its own line, the function runs, returns `5`, and the `5` is thrown away. Nothing prints. If you want to see a returned value, log it at the calling end: `console.log(addAndReturn(2, 3));`.
:::

## Using returned values anywhere a value can go

Because a call is replaced by its return value, you can put a call **anywhere you could write a value**:

```js
function add(a, b) {
  return a + b;
}

const total = add(2, 3);
console.log(total);
console.log(add(10, 20) * 2);
console.log(`R${add(99, 1)}`);
console.log(add(add(1, 2), add(3, 4)));
```

Output:

```text
5
60
R100
10
```

The last line looks scary but works exactly like brackets in maths, from the inside out: `add(1, 2)` becomes `3`, and `add(3, 4)` becomes `7`, so the line becomes `add(3, 7)`, which is `10`.

## Functions that use other functions

Once functions return values, you can build bigger answers out of small functions. Here is a VAT calculator for a shop. South Africa's VAT rate is 15%:

```js
const VAT_RATE = 0.15;

function vatOn(price) {
  return price * VAT_RATE;
}

function priceWithVat(price) {
  return price + vatOn(price);
}

function formatMoney(amount) {
  return `R${amount.toFixed(2)}`;
}

const kettle = 400;
console.log(`Kettle:     ${formatMoney(kettle)}`);
console.log(`VAT (15%):  ${formatMoney(vatOn(kettle))}`);
console.log(`You pay:    ${formatMoney(priceWithVat(kettle))}`);
```

Output:

```text
Kettle:     R400.00
VAT (15%):  R60.00
You pay:    R460.00
```

Look at how small each function is:

- `vatOn` only knows how to work out VAT.
- `priceWithVat` does not repeat that maths. It **asks** `vatOn` for the VAT and adds it on.
- `formatMoney` turns any number into a neat rand amount. It returns a **string**, which is fine: a return value can be any type.

If the VAT rate changes, you change one line. If you want money shown as `R 400,00` instead, you change `formatMoney` once, and every amount in the program follows. `formatMoney` will appear in Budget Buddy by the end of this phase.

::: try A tiny VAT tool
1. Create `phase-4/vat.js` and type in the VAT program above.
2. Run it and check you get R400.00, R60.00 and R460.00.
3. **Change it, predict, run.** Add a second item: a `toaster` costing `259.99`. Print the same three lines for it. Work out the VAT roughly in your head first (15% of about 260 is about 39), then run it and see how close you were.
:::

## `return` ends the function immediately

When JavaScript reaches `return`, the function is **finished**. It hands the value back at once, and any lines below the `return` in that function do not run.

```js
function test() {
  console.log("before return");
  return "done";
  console.log("after return");
}

const result = test();
console.log(result);
```

Output:

```text
before return
done
```

`"after return"` never prints. (VS Code will even fade that line out, as a hint that it can never run.)

This sounds like a limitation, but it is very handy. You can use it to **stop early** when something is wrong, before the main work starts. This is called an **early return**:

```js
function splitBill(total, people) {
  if (people <= 0) {
    return 0;
  }
  return total / people;
}

console.log(splitBill(600, 4));
console.log(splitBill(600, 0));
```

Output:

```text
150
0
```

Read it as: "If the number of people makes no sense, give back 0 and stop. Otherwise, do the real work." There is no `else` needed, because if the first `return` runs, the function has already ended. Many programmers like this style: deal with the bad cases first, at the top, and then the rest of the function can relax and do its job.

You can have several `return` statements in one function. Only one of them ever runs per call: whichever is reached first. Here is a mark-to-grade function for a school:

```js
function gradeFor(mark) {
  if (mark >= 80) {
    return "A";
  }
  if (mark >= 70) {
    return "B";
  }
  if (mark >= 60) {
    return "C";
  }
  if (mark >= 50) {
    return "D";
  }
  return "F";
}

console.log(gradeFor(91));
console.log(gradeFor(74));
console.log(gradeFor(50));
console.log(gradeFor(12));
```

Output:

```text
A
B
D
F
```

For a mark of 74, the first check (`>= 80`) is false, so we move on. The second check (`>= 70`) is true, so the function returns `"B"` and stops. It never even looks at the `>= 60` check. That is why each check only needs a lower limit.

## Functions that answer yes or no

A very common kind of function answers a yes/no question by returning `true` or `false`. By convention, their names start with **`is`**, **`has`** or **`can`**, so a call reads like a question: `isEven(10)`, `hasPaid(order)`, `canVote(age)`.

```js
function isEven(number) {
  return number % 2 === 0;
}

function isValidAmount(amount) {
  return !Number.isNaN(amount) && amount >= 0;
}

console.log(isEven(10));
console.log(isEven(7));
console.log(isValidAmount(250));
console.log(isValidAmount(-5));
console.log(isValidAmount(Number("abc")));

const guests = 7;
if (isEven(guests)) {
  console.log("Everyone has a partner for the dance.");
} else {
  console.log("Someone will need to dance alone.");
}
```

Output:

```text
true
false
true
false
false
Someone will need to dance alone.
```

Two things to notice:

1. `return number % 2 === 0;` returns the result of a comparison, which is already `true` or `false`. You *could* write:
   ```js
   if (number % 2 === 0) {
     return true;
   } else {
     return false;
   }
   ```
   That works, but it is five lines to say what one line says. Returning the comparison directly is the usual style.
2. `if (isEven(guests))` reads almost like English: "if guests is even". Tucking a check into a well-named function makes the code around it much easier to read. `isValidAmount` will do exactly this job in Budget Buddy.

::: predict What does this print?
```js
function double(n) {
  return n * 2;
}

function shout(word) {
  console.log(word.toUpperCase() + "!");
}

const a = double(4);
const b = double(a) + 1;
const c = shout("goal");
console.log(a, b, c);
console.log(double(double(double(1))));
```
:::

::: solution
```text
GOAL!
8 17 undefined
8
```
- `a` is `double(4)`, which returns `8`.
- `b` is `double(8) + 1`, which is `16 + 1`, so `17`.
- `const c = shout("goal");` runs `shout`, which **prints** `GOAL!` straight away. That is why `GOAL!` is the first line of output. But `shout` has no `return`, so `c` is `undefined`.
- `double(double(double(1)))`, from the inside out, is `double(double(2))`, then `double(4)`, then `8`.
:::

::: exercise Level 1 — Guided · Temperature conversion, both ways
Create `phase-4/temperature-return.js`.

1. Write `celsiusToFahrenheit(celsius)` that **returns** `celsius * 9 / 5 + 32`.
2. Write `fahrenheitToCelsius(fahrenheit)` that **returns** `(fahrenheit - 32) * 5 / 9`.
3. Log `celsiusToFahrenheit(100)` and `celsiusToFahrenheit(-40)`.
4. Log `fahrenheitToCelsius(212)` and `fahrenheitToCelsius(98.6)`.
5. Finally, log `fahrenheitToCelsius(celsiusToFahrenheit(25))`. Before you run it, think: converting there and back again should give you what?
6. Run it. You should see `212`, `-40`, `100`, `37` and `25`.
:::

::: solution
```js
function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

console.log(celsiusToFahrenheit(100));
console.log(celsiusToFahrenheit(-40));
console.log(fahrenheitToCelsius(212));
console.log(fahrenheitToCelsius(98.6));
console.log(fahrenheitToCelsius(celsiusToFahrenheit(25)));
```
Output:
```text
212
-40
100
37
25
```
Fun fact: −40 is the one temperature that is the same in both scales. The last line proves the two functions undo each other.
:::

::: exercise Level 2 — On your own · BMI calculator
A clinic's app works out Body Mass Index. Create `phase-4/bmi.js`.

- `bmi(weightKg, heightM)` returns the weight divided by the height squared.
- `bmiCategory(value)` returns `"underweight"` (below 18.5), `"healthy"` (below 25), `"overweight"` (below 30) or `"obese"`.
- Use both to print `BMI: 22.9 (healthy)` for 70 kg and 1.75 m, and the same line for 95 kg and 1.8 m.
:::

::: hint
"Squared" means multiplied by itself: `heightM * heightM` (or `heightM ** 2`). For the category, use early returns, like `gradeFor`. Store the BMI in a variable so you can pass it to `bmiCategory` *and* print it with `toFixed(1)`.
:::

::: solution
```js
function bmi(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}

function bmiCategory(value) {
  if (value < 18.5) {
    return "underweight";
  }
  if (value < 25) {
    return "healthy";
  }
  if (value < 30) {
    return "overweight";
  }
  return "obese";
}

const result = bmi(70, 1.75);
console.log(`BMI: ${result.toFixed(1)} (${bmiCategory(result)})`);
const result2 = bmi(95, 1.8);
console.log(`BMI: ${result2.toFixed(1)} (${bmiCategory(result2)})`);
```
Output:
```text
BMI: 22.9 (healthy)
BMI: 29.3 (overweight)
```
:::

::: exercise Level 2 — On your own · Is this PIN valid?
A bank card PIN must be **exactly 4 characters**, and **every character must be a digit**. Create `phase-4/pin.js`.

- Write `isValidPin(pin)` that takes the PIN as a string and returns `true` or `false`.
- Test: `"4821"` → true, `"482"` → false, `"48a1"` → false, `"04821"` → false, `"0000"` → true.
:::

::: hint
Use early returns. First, if the length is not 4, return `false`. Then loop over every character. If one is not a digit, return `false` straight away. `"0123456789".includes(pin[i])` tells you whether a character is a digit. If the loop finishes without returning, every character was fine, so return `true`.
:::

::: solution
```js
function isValidPin(pin) {
  if (pin.length !== 4) {
    return false;
  }
  for (let i = 0; i < pin.length; i++) {
    if (!"0123456789".includes(pin[i])) {
      return false;
    }
  }
  return true;
}

console.log(isValidPin("4821"));
console.log(isValidPin("482"));
console.log(isValidPin("48a1"));
console.log(isValidPin("04821"));
console.log(isValidPin("0000"));
```
Output:
```text
true
false
false
false
true
```
Returning `false` from inside the loop stops the whole function, not only the loop. This is the **flag** pattern from Phase 3 ("did we find a bad character?") with `return` doing the job of `break`.
:::

::: exercise Level 2 — On your own · Upgrade last lesson's functions
In the last lesson, `printTaxiFare`, `printUnits` and `countVowels` all *printed* their answers. Create `phase-4/upgrades.js` and rewrite them to **return** instead:

- `taxiFare(distanceKm, ratePerKm = 10)` returns R25 plus the distance times the rate.
- `unitsFor(amount, pricePerUnit = 2.85)` returns the number of electricity units.
- `countVowels(word)` returns the count.
- Add `formatMoney(amount)` from the VAT example.

Now do things that were impossible before:

1. Print the cost of a return trip of 8 km each way (two fares added together): `Return trip: R210.00`.
2. Print how many units R500 buys, to one decimal place.
3. Use `taxiFare(30)` inside an `if` to print whether a 30 km trip is over R300.
4. Print which word has more vowels, `"Mississippi"` or `"Umhlanga"`.
:::

::: hint
The only change inside each function is: instead of `console.log(...)` at the end, `return` the number. All the printing moves to the code **below** the functions.
:::

::: solution
```js
function taxiFare(distanceKm, ratePerKm = 10) {
  const baseFare = 25;
  return baseFare + distanceKm * ratePerKm;
}

function unitsFor(amount, pricePerUnit = 2.85) {
  return amount / pricePerUnit;
}

function countVowels(word) {
  let count = 0;
  const lower = word.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    if ("aeiou".includes(lower[i])) {
      count++;
    }
  }
  return count;
}

function formatMoney(amount) {
  return `R${amount.toFixed(2)}`;
}

const toWork = taxiFare(8);
const toHome = taxiFare(8);
console.log(`Return trip: ${formatMoney(toWork + toHome)}`);

console.log(`R500 buys ${unitsFor(500).toFixed(1)} units`);

if (taxiFare(30) > 300) {
  console.log("A 30 km trip is over R300. Take the train?");
} else {
  console.log("A 30 km trip is R300 or less.");
}

const a = countVowels("Mississippi");
const b = countVowels("Umhlanga");
if (a > b) {
  console.log(`Mississippi wins, ${a} to ${b}`);
} else {
  console.log(`Umhlanga wins (or it's a draw), ${b} to ${a}`);
}
```
Output:
```text
Return trip: R210.00
R500 buys 175.4 units
A 30 km trip is over R300. Take the train?
Mississippi wins, 4 to 3
```
Every one of those four tasks needed the *number*, not the printed words. That is what `return` gives you.
:::

::: debug Three functions that give back the wrong thing
Run each one, notice what is wrong, and fix it.

```js
// Program A: should print "VAT is R30"
function vatOn(price) {
  const vat = price * 0.15;
}

const vat = vatOn(200);
console.log(`VAT is R${vat}`);
```

```js
// Program B: should add 1 + 2 + 3 + 4 and print 10
function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
    return total;
  }
}

console.log(sumUpTo(4));
```

```js
// Program C: should print "Nomsa Dlamini"
function fullName(first, last) {
  return
    first + " " + last;
}

console.log(fullName("Nomsa", "Dlamini"));
```
:::

::: solution
**A:** It prints `VAT is Rundefined`. The function works out `vat` but never hands it back, so it returns `undefined`. Add `return vat;` as the last line of the function (or replace both lines with `return price * 0.15;`).

**B:** It prints `1`. The `return` is **inside** the loop, so on the very first time round (when `total` is 1) the function returns and stops. The loop never gets a second turn. Move `return total;` to *after* the loop's closing brace, so the loop finishes first:
```js
function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```
Now it prints `10`.

**C:** It prints `undefined`. This one is sneaky. When JavaScript sees `return` with nothing else on that line, it assumes you meant `return;` (return nothing) and ends the function. The next line is never reached. **Always start the returned value on the same line as `return`:** `return first + " " + last;`.
:::

::: mistake
**Logging instead of returning.** If the answer is needed anywhere else in the program, the function must `return` it. A variable that stores the result of a log-only function holds `undefined`.

**Putting `return` inside a loop by accident.** The function stops the first time it gets there. If you want the loop to finish, put the `return` after the loop.

**Writing code after `return` and expecting it to run.** Nothing after a `return` runs, in that call.

**Putting the value on the next line after `return`.** `return` alone on a line returns `undefined`. Keep the value on the same line.

**Calling a returning function and ignoring the answer.** `formatMoney(50);` on its own does nothing you can see. Store it, print it, or use it.
:::

## Real-world uses

Almost every function in real software returns something:

- A shopping app's `calculateTotal(cart)` returns a number, which is then shown on screen, charged to your card, and saved in your order history. Three different uses for one returned value.
- A login form calls `isValidEmail(text)`, which returns `true` or `false`, to decide whether to show a red error message.
- A banking app's `formatMoney(amount)` returns neat text like `R1 250.00`, used on every single screen.
- A school system's `gradeFor(mark)` returns a letter that goes on report cards, into averages, and into class lists.

The pattern is always: the function **works something out and returns it**. The code that called it decides what to do with the answer.

::: connect
**This builds on:** [parameters](#/phase-04-functions/02-parameters-and-arguments), which are the *input* to a function. `return` is the *output*. Together, a function is a little machine: values in, a value out. The early-return style builds on `if` from Phase 2, and returning from inside a loop builds on the flag pattern from Phase 3.

**This unlocks:** building programs out of small pieces that pass answers to each other. Next, [Scope](#/phase-04-functions/04-scope) explains why the `tip` inside a function and the `tip` outside it can be two completely separate variables.
:::

::: challenge A payslip calculator
Create `phase-4/payslip.js`. Kabelo is paid by the hour. Write these functions, each of which **returns** its answer:

- `grossPay(hours, rate)`: normal pay for up to 40 hours. Any hours **over 40** are overtime, paid at 1.5 times the rate.
- `uifDeduction(gross)`: 1% of the gross pay (UIF is a small South African deduction).
- `netPay(hours, rate)`: gross pay minus the UIF deduction. It must **use** the other two functions, not repeat their maths.
- `formatMoney(amount)`.

Print a small payslip for 45 hours at R120 an hour, and another for 30 hours at R95 an hour. For 45 hours at R120 you should get a gross of R5700.00, UIF of R57.00 and net pay of R5643.00.
:::

::: hint
In `grossPay`, use an early return: if `hours <= 40`, return `hours * rate`. Otherwise, the pay is `40 * rate` plus `(hours - 40) * rate * 1.5`.
:::

::: solution
```js
function grossPay(hours, rate) {
  if (hours <= 40) {
    return hours * rate;
  }
  const overtimeHours = hours - 40;
  return 40 * rate + overtimeHours * rate * 1.5;
}

function uifDeduction(gross) {
  return gross * 0.01;
}

function netPay(hours, rate) {
  const gross = grossPay(hours, rate);
  return gross - uifDeduction(gross);
}

function formatMoney(amount) {
  return `R${amount.toFixed(2)}`;
}

console.log("Kabelo: 45 hours at R120");
console.log(`  Gross: ${formatMoney(grossPay(45, 120))}`);
console.log(`  UIF:   ${formatMoney(uifDeduction(grossPay(45, 120)))}`);
console.log(`  Net:   ${formatMoney(netPay(45, 120))}`);

console.log("Kabelo: 30 hours at R95");
console.log(`  Gross: ${formatMoney(grossPay(30, 95))}`);
console.log(`  UIF:   ${formatMoney(uifDeduction(grossPay(30, 95)))}`);
console.log(`  Net:   ${formatMoney(netPay(30, 95))}`);
```
Output:
```text
Kabelo: 45 hours at R120
  Gross: R5700.00
  UIF:   R57.00
  Net:   R5643.00
Kabelo: 30 hours at R95
  Gross: R2850.00
  UIF:   R28.50
  Net:   R2821.50
```
Notice that the printing code repeats itself for the two payslips. How would you fix that? With a `printPayslip(hours, rate)` function, of course. Try adding one.
:::

::: recap
- `return value;` hands a value back to the code that called the function. That value is the **return value**.
- Picture the call being **replaced by** its return value: `const tip = calculateTip(300);` becomes `const tip = 30;`.
- `console.log` shows a value to a human. `return` gives it to the program. A function with no `return` returns `undefined`.
- `return` ends the function at once. Use **early returns** to deal with bad input first.
- A returned value can be used anywhere a value can: in variables, maths, template literals, `if` conditions, and as arguments to other functions.
- Functions returning `true`/`false` are named like questions: `isEven`, `isValidAmount`, `isValidPin`.
- Good habit: functions work things out and return them. The calling code decides what to print.
:::

::: interview What is the difference between `console.log` and `return` inside a function?
`console.log` prints a value to the screen for a person to read, and the function carries on. `return` hands the value back to the code that called the function, so it can be stored or used in further calculations, and it ends the function immediately. A function that only logs gives back `undefined`.
:::

::: interview What does a function return if it has no `return` statement?
`undefined`.
:::

::: interview Why might a function have more than one `return`?
To hand back different answers in different situations, such as a grade for each mark range, or to stop early when the input is invalid. Only the first `return` reached in a particular call actually runs, because `return` ends the function.
:::

::: checkpoint
- [ ] I ran the `addAndShow` / `addAndReturn` program and saw `undefined` and `NaN` appear
- [ ] I can explain the two-calculators picture to someone else
- [ ] I built the VAT tool with `vatOn`, `priceWithVat` and `formatMoney`
- [ ] I wrote a function with an early return
- [ ] I finished at least two of: BMI, valid PIN, upgrading last lesson's functions
- [ ] I fixed all three debug programs, including the `return` on its own line
:::

::: resources
- **javascript.info, "Functions":** https://javascript.info/function-basics. The "Returning a value" section, including the warning about `return` on its own line.
- **MDN, "Function return values":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Return_values. A beginner guide with more examples.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Step through the `predict` example and watch the return value come back to the calling line.
:::
