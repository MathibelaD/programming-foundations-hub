---
title: Parameters and arguments — giving functions input
summary: One function, many different jobs. Pass values in, and the same steps work on whatever you give them.
minutes: 45
stage: Phase 4
---

## What you will learn

- How to give a function **input**, so it can do something slightly different each time you call it
- The difference between a **parameter** (the placeholder) and an **argument** (the actual value)
- Why the order of arguments matters, and what happens when you leave one out
- How **default parameters** give a function a sensible value to fall back on

**Before this:** [Why functions exist](#/phase-04-functions/01-why-functions). You should be able to declare a function and call it.

## The problem: a function for every person?

Last lesson, every call to a function did exactly the same thing. That is fine for a header that never changes. But suppose a gym's check-in screen should greet each member by name:

```js
function greetLerato() {
  console.log("Hello, Lerato! Welcome back.");
}
function greetPieter() {
  console.log("Hello, Pieter! Welcome back.");
}
function greetAisha() {
  console.log("Hello, Aisha! Welcome back.");
}
greetLerato();
greetPieter();
greetAisha();
```

Output:

```text
Hello, Lerato! Welcome back.
Hello, Pieter! Welcome back.
Hello, Aisha! Welcome back.
```

That is the copy-paste problem all over again, only now it is hiding inside functions. The gym has 800 members. And it cannot greet a new member at all until a programmer writes a new function.

The three functions are identical **except for one piece**: the name. What we want is one function with a gap in it, where the name goes, and a way to fill the gap each time we call it.

::: analogy The coffee machine
Picture a coffee machine in an office. It has one button that says **Make coffee**, and two dials: **Size** (small, medium, large) and **Sugar** (0, 1, 2, 3).

- The machine does the same *job* every time: grind, heat, pour.
- The dials change the *details*: how much, and how sweet.
- Nobody builds a separate machine for "large with two sugars". One machine, with dials, covers every combination.

The dials, with their labels, are the machine's **parameters**. They are built into the machine. The settings you actually turn them to this morning ("large", "2") are the **arguments**. Tomorrow you might pass different arguments to the same machine.
:::

## Your first parameter

Here is one greeting function with a gap for the name:

```js
function greet(name) {
  console.log(`Hello, ${name}! Welcome back.`);
}

greet("Lerato");
greet("Pieter");
greet("Aisha");
```

Output:

```text
Hello, Lerato! Welcome back.
Hello, Pieter! Welcome back.
Hello, Aisha! Welcome back.
```

Look at the two new pieces:

| Piece | Where it is | What it is called |
|---|---|---|
| `name` in `function greet(name)` | in the **declaration** | a **parameter**: a placeholder name for a value the function will receive |
| `"Lerato"` in `greet("Lerato")` | in the **call** | an **argument**: the actual value you hand over this time |

A parameter behaves like a variable that lives inside the function. You do not write `let` for it. Its value is filled in automatically **each time the function is called**.

When JavaScript runs `greet("Lerato")`, this is what happens:

1. It jumps into `greet`.
2. It puts `"Lerato"` into the parameter `name`, as if it had written `name = "Lerato"`.
3. It runs the body, where `${name}` becomes `Lerato`.
4. It comes back to the next line.

The next call, `greet("Pieter")`, starts fresh: `name` gets `"Pieter"` this time.

::: note Remembering which is which
**P**arameter = **P**laceholder, in the declaration. **A**rgument = **A**ctual value, in the call. Many programmers mix the two words up in conversation, and everyone understands. But knowing the difference helps you read error messages and documentation.
:::

::: try Greet anyone
1. Create `phase-4/greet.js` inside `coding-practice` and type in the `greet` function with its three calls.
2. Run it:
   ```bash
   node phase-4/greet.js
   ```
3. You should see three greetings, one per name.
4. **Change it, predict, run.** Add a call with your own name. Then change the message inside the function to `Hi ${name}, your class starts in 10 minutes.` Before running, predict: how many lines change? Run it and check.
:::

## Arguments can be anything that makes a value

An argument does not have to be typed-in text. It can be a variable, or a whole expression. JavaScript works out the value first, then hands it over.

```js
function greet(name) {
  console.log(`Hello, ${name}! Welcome back.`);
}

const customer = "Thabo";
greet(customer);

const surname = "Naidoo";
greet("Mrs " + surname);
```

Output:

```text
Hello, Thabo! Welcome back.
Hello, Mrs Naidoo! Welcome back.
```

Notice that the variable outside is called `customer`, but the parameter inside is called `name`. **They do not have to match.** At the moment of the call, JavaScript looks in the `customer` box, finds `"Thabo"`, and puts a copy of that value into `name`. The function never knows or cares what the box outside was called.

This is a big deal. It means you can write a function without knowing anything about the code that will call it. The function only needs to know "I will be given a name".

::: quiz
What does this program print?

```js
function showTotal(amount) {
  console.log("Total: R" + amount);
}

const price = 20;
showTotal(price * 2 + 5);
showTotal("5" + price);
```

- [ ] `Total: R45` and `Total: R25`
- [x] `Total: R45` and `Total: R520`
- [ ] `Total: R140` and `Total: R520`
- [ ] `Total: Rprice * 2 + 5` and `Total: R5price`

JavaScript works out each argument first, then hands the value over. `price * 2 + 5` is `40 + 5`, which is `45` (multiplication before addition). `"5" + price` has a string in it, so `+` glues instead of adding: `"520"`. If you picked `R25`, you added a string as if it were a number.
:::

## Several parameters

A function can have as many parameters as it needs. Separate them with commas, in the declaration and in the call.

Here is a function that prints a line made of any character, at any length. It uses the **build-a-string** pattern from Phase 3:

```js
function printLine(char, length) {
  let line = "";
  for (let i = 1; i <= length; i++) {
    line += char;
  }
  console.log(line);
}

printLine("-", 20);
printLine("*", 5);
printLine("=", 30);
```

Output:

```text
--------------------
*****
==============================
```

In `printLine("-", 20)`, the first argument `"-"` goes into the first parameter `char`, and the second argument `20` goes into the second parameter `length`.

Now a real-world one. At a restaurant, you want to work out a tip:

```js
function calculateTip(bill, percent) {
  const tip = bill * percent / 100;
  const total = bill + tip;
  console.log(`Bill R${bill.toFixed(2)} + ${percent}% tip R${tip.toFixed(2)} = R${total.toFixed(2)}`);
}

calculateTip(350, 10);
calculateTip(820, 15);
```

Output:

```text
Bill R350.00 + 10% tip R35.00 = R385.00
Bill R820.00 + 15% tip R123.00 = R943.00
```

One function, and it works for every bill and every tip percentage in the world. Notice that `tip` and `total` are ordinary variables made inside the function, next to the parameters. That is fine and very common.

::: note Printing, for now
`calculateTip` *prints* its answer. That is useful, but it means you cannot use the tip in another calculation afterwards. In [Return values](#/phase-04-functions/03-return-values) you will learn how a function can hand its answer back to you instead. For this lesson, our functions print.
:::

::: try Lines and tips
1. Create `phase-4/tips.js`. Type in both `printLine` and `calculateTip`.
2. Below them, call `printLine("=", 40)`, then `calculateTip(350, 10)`, then `printLine("=", 40)` again.
3. Run it with `node phase-4/tips.js`. You should see the tip line between two lines of 40 `=` signs.
4. **Change it, predict, run.** What will `calculateTip(99.99, 12.5)` print? Work it out on paper (or with a calculator), then add the call and run it.
:::

::: quiz
What does this program print?

```js
function repeatWord(word, times) {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += word + "-";
  }
  console.log(result);
}

repeatWord("ha", 3);
```

- [ ] `ha-ha-ha`
- [ ] `ha-ha-`
- [ ] `hahaha`
- [x] `ha-ha-ha-`

`word` gets `"ha"` and `times` gets `3`. The loop runs for `i` = 0, 1 and 2, three times, and each time adds `"ha"` **and** a dash. So the dash comes after the last `ha` too. If you picked `ha-ha-ha`, you expected the dash to go only *between* the words, but the code adds one every time round.
:::

## Order matters

JavaScript matches arguments to parameters **by position**: first to first, second to second. It does not look at the names, and it does not guess what you meant.

```js
function describePet(name, animal) {
  console.log(`${name} is a very good ${animal}.`);
}

describePet("Bongo", "dog");
describePet("dog", "Bongo");
```

Output:

```text
Bongo is a very good dog.
dog is a very good Bongo.
```

The second call is not an error. JavaScript happily ran it. It is wrong, and only a human reading the output would notice. The coffee machine does the same:

```js
function orderCoffee(size, sugars) {
  console.log(`One ${size} coffee with ${sugars} sugar(s), coming up!`);
}

orderCoffee("large", 2);
orderCoffee(2, "large");
```

Output:

```text
One large coffee with 2 sugar(s), coming up!
One 2 coffee with large sugar(s), coming up!
```

This is one of the most common bugs in real programs. Two habits help:

- Choose clear parameter names, so the declaration tells you the order: `orderCoffee(size, sugars)`.
- Before you call a function, glance back at its first line to check the order.

::: quiz
What does this program print?

```js
function owes(name, amount) {
  console.log(`${name} owes R${amount * 2}`);
}

owes("Sipho", 50);
owes(50, "Sipho");
```

- [x] `Sipho owes R100`, then `50 owes RNaN`
- [ ] `Sipho owes R100` twice
- [ ] `Sipho owes R100`, then an error
- [ ] `Sipho owes R100`, then `50 owes RSiphoSipho`

Arguments are matched by position, not by meaning. In the second call, `name` gets `50` and `amount` gets `"Sipho"`. `"Sipho" * 2` is not a number, so it gives `NaN`, and JavaScript carries on without an error. If you picked "twice", you expected JavaScript to notice the mix-up. It never does.
:::

## A missing argument becomes `undefined`

What if you call a function with fewer arguments than it has parameters?

```js
function greet(name) {
  console.log(`Hello, ${name}! Welcome back.`);
}

function calculateTip(bill, percent) {
  const tip = bill * percent / 100;
  const total = bill + tip;
  console.log(`Bill R${bill.toFixed(2)} + ${percent}% tip R${tip.toFixed(2)} = R${total.toFixed(2)}`);
}

greet();
calculateTip(200);
```

Output:

```text
Hello, undefined! Welcome back.
Bill R200.00 + undefined% tip RNaN = RNaN
```

JavaScript does not stop you. Any parameter that did not get an argument holds `undefined`, the "box exists, but nothing was put in it" value from [true, false and nothing](#/phase-01-storing-information/06-booleans-null-undefined). Then doing maths with `undefined` gives `NaN`.

When you see `undefined` or `NaN` appear in output where a real value should be, one of the first things to check is: **did I pass every argument?**

(Passing *too many* arguments is quieter still: the extra ones are ignored. `greet("Zanele", "Mokoena", 42)` prints `Hello, Zanele! Welcome back.`)

::: quiz
What does this program print?

```js
function area(width, height) {
  console.log(width * height);
}

area(4);
area(4, 5, 6);
```

- [ ] `undefined`, then `20`
- [x] `NaN`, then `20`
- [ ] `NaN`, then `120`
- [ ] `4`, then `120`
- [ ] An error on the first call

In `area(4)`, `height` got no argument, so it is `undefined`, and `4 * undefined` is `NaN`. In `area(4, 5, 6)`, the extra `6` has no parameter to go into, so it is ignored: `4 * 5` is `20`. If you picked `undefined`, remember that the maths still runs, and maths with `undefined` gives `NaN`.
:::

## Default parameters

Sometimes leaving an argument out is reasonable, and the function should use a sensible value instead. Most people tip 10%, so why make them type it every time?

You can give a parameter a **default value** with `=` in the declaration:

```js
function greet(name = "friend") {
  console.log(`Hello, ${name}! Welcome back.`);
}

greet("Zanele");
greet();

function calculateTip(bill, percent = 10) {
  const tip = bill * percent / 100;
  const total = bill + tip;
  console.log(`Bill R${bill.toFixed(2)} + ${percent}% tip R${tip.toFixed(2)} = R${total.toFixed(2)}`);
}

calculateTip(200);
calculateTip(200, 15);
```

Output:

```text
Hello, Zanele! Welcome back.
Hello, friend! Welcome back.
Bill R200.00 + 10% tip R20.00 = R220.00
Bill R200.00 + 15% tip R30.00 = R230.00
```

Read `percent = 10` as: "if nobody gives me a percent, use 10". When an argument *is* given, it wins, and the default is ignored.

Defaults are like the coffee machine's dials starting at "medium, one sugar". Turn them if you want something different. Leave them alone and you still get a reasonable coffee.

A few rules of thumb:

- Put parameters **with** defaults **after** the ones without. `calculateTip(bill, percent = 10)` is easy to use. `calculateTip(percent = 10, bill)` would force you to always type the percent anyway, to reach `bill`.
- Only use a default when there really is a sensible everyday value. There is no sensible default for `bill`, so it has none.

Several defaults work too:

```js
function printLine(char = "-", length = 20) {
  let line = "";
  for (let i = 1; i <= length; i++) {
    line += char;
  }
  console.log(line);
}

printLine();
printLine("*");
printLine("=", 8);
```

Output:

```text
--------------------
********************
========
```

::: try Try the defaults
1. Create `phase-4/defaults.js` and type in the `printLine` version with two defaults.
2. Run it and compare with the output above.
3. **Change it, predict, run.** Add `printLine(8)`. You passed only one argument, so it goes into the *first* parameter, `char`. Predict what prints before you run it. (Hint: it will not be 8 dashes.)
:::

::: predict What does this print?
```js
function introduce(name, city = "Durban", age) {
  console.log(`${name} (${age}) lives in ${city}.`);
}

introduce("Naledi", "Polokwane", 23);
introduce("Johan");
introduce("Fatima", 31);
```
:::

::: solution
```text
Naledi (23) lives in Polokwane.
Johan (undefined) lives in Durban.
Fatima (undefined) lives in 31.
```
- The first call fills every parameter.
- The second call gives only `name`. `city` falls back to its default `"Durban"`, but `age` has no default, so it is `undefined`.
- The third call is the sneaky one. `31` is the **second** argument, so it goes into the **second** parameter, `city`. JavaScript matches by position, never by meaning. This is also why parameters with defaults are best placed last.
:::

::: exercise Level 1 — Guided · Taxi fare
A metered taxi charges a **R25** flat fee plus a price per kilometre. Create `phase-4/taxi.js`.

1. Declare a function `printTaxiFare` with two parameters: `distanceKm`, and `ratePerKm` with a default of `10`.
2. Inside it, make `const baseFare = 25;`.
3. Work out `const fare = baseFare + distanceKm * ratePerKm;`.
4. Print a line like `5 km at R10/km: R75.00` (use `toFixed(2)` on the fare).
5. Call it three times: `printTaxiFare(5)`, `printTaxiFare(12.5)` and `printTaxiFare(12.5, 14)`.
6. Run it. The three fares should be R75.00, R150.00 and R200.00.
:::

::: solution
```js
function printTaxiFare(distanceKm, ratePerKm = 10) {
  const baseFare = 25;
  const fare = baseFare + distanceKm * ratePerKm;
  console.log(`${distanceKm} km at R${ratePerKm}/km: R${fare.toFixed(2)}`);
}

printTaxiFare(5);
printTaxiFare(12.5);
printTaxiFare(12.5, 14);
```
Output:
```text
5 km at R10/km: R75.00
12.5 km at R10/km: R150.00
12.5 km at R14/km: R200.00
```
:::

::: exercise Level 2 — On your own · Prepaid electricity
When you buy prepaid electricity, your rand amount is turned into **units** (kWh). Create `phase-4/electricity.js`.

- Write `printUnits(amount, pricePerUnit)` where `pricePerUnit` defaults to `2.85`.
- It prints how many units the amount buys, to one decimal place, like `R200 buys 70.2 units of electricity.`
- Call it for R200 and R50 at the default price, and R200 at `3.1` per unit.
:::

::: hint
Units bought is the amount divided by the price of one unit. `toFixed(1)` gives one decimal place.
:::

::: solution
```js
function printUnits(amount, pricePerUnit = 2.85) {
  const units = amount / pricePerUnit;
  console.log(`R${amount} buys ${units.toFixed(1)} units of electricity.`);
}

printUnits(200);
printUnits(50);
printUnits(200, 3.1);
```
Output:
```text
R200 buys 70.2 units of electricity.
R50 buys 17.5 units of electricity.
R200 buys 64.5 units of electricity.
```
:::

::: exercise Level 2 — On your own · Password length check
A sign-up page needs passwords of at least 8 characters. Create `phase-4/password.js`.

- Write `checkPassword(password)`.
- If the password is shorter than 8 characters, print something like `"cat" is too short: 3 characters, needs at least 8.`
- Otherwise print `"sunshine2026" is long enough.`
- Test it with `"cat"`, `"sunshine2026"` and `"12345678"`.
:::

::: hint
A string's `.length` tells you how many characters it has. To put double quotes inside a template literal, type them as normal: `` `"${password}" is long enough.` ``
:::

::: solution
```js
function checkPassword(password) {
  if (password.length < 8) {
    console.log(`"${password}" is too short: ${password.length} characters, needs at least 8.`);
  } else {
    console.log(`"${password}" is long enough.`);
  }
}

checkPassword("cat");
checkPassword("sunshine2026");
checkPassword("12345678");
```
Output:
```text
"cat" is too short: 3 characters, needs at least 8.
"sunshine2026" is long enough.
"12345678" is long enough.
```
`"12345678"` passes, even though it is a terrible password. Real sign-up pages check more than length. You could add more checks later, and they would all live in this one function.
:::

::: exercise Level 2 — On your own · Count the vowels
A word game gives bonus points for vowels. Create `phase-4/vowels.js`.

- Write `countVowels(word)` that loops over every character of the word and counts how many are `a`, `e`, `i`, `o` or `u` (capital or small).
- It prints something like `banana has 3 vowel(s).`
- Test it with `"banana"`, `"Ubuntu"` and `"rhythm"`. You should get 3, 3 and 0.
:::

::: hint
Use the **counter** pattern: start at 0, and add 1 when you find a match. Loop with `for (let i = 0; i < word.length; i++)` and look at `word[i]`. To check if one character is a vowel, `"aeiou".includes(character)` is a neat trick. Make the word lower case first, so `U` counts.
:::

::: solution
```js
function countVowels(word) {
  let count = 0;
  const lower = word.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    if ("aeiou".includes(lower[i])) {
      count++;
    }
  }
  console.log(`${word} has ${count} vowel(s).`);
}

countVowels("banana");
countVowels("Ubuntu");
countVowels("rhythm");
```
Output:
```text
banana has 3 vowel(s).
Ubuntu has 3 vowel(s).
rhythm has 0 vowel(s).
```
:::

::: exercise Level 2 — On your own · Any times table
Create `phase-4/times.js`. Write `printTimesTable(number, upTo)` where `upTo` defaults to `10`. It prints lines like `3 x 7 = 21`. Call `printTimesTable(7, 3)`, print a blank line, then call `printTimesTable(9, 5)`.
:::

::: solution
```js
function printTimesTable(number, upTo = 10) {
  for (let i = 1; i <= upTo; i++) {
    console.log(`${i} x ${number} = ${i * number}`);
  }
}

printTimesTable(7, 3);
console.log("");
printTimesTable(9, 5);
```
Output:
```text
1 x 7 = 7
2 x 7 = 14
3 x 7 = 21

1 x 9 = 9
2 x 9 = 18
3 x 9 = 27
4 x 9 = 36
5 x 9 = 45
```
:::

::: debug Three broken calls
Each program runs, but at least one thing about it is wrong. Run each, look closely at the output or the error, and fix it.

```js
// Program A
function welcome(name) {
  console.log(`Welcome to the gym, ${Name}!`);
}

welcome("Kagiso");
```

```js
// Program B: a 20% discount on a R450 pair of takkies
function printDiscount(price, percent) {
  const saving = price * percent / 100;
  console.log(`Save R${saving.toFixed(2)} on R${price.toFixed(2)}`);
}

printDiscount(20, 450);
```

```js
// Program C: three friends share a R600 bill
function printBill(amount, people) {
  const each = amount / people;
  console.log(`Each person pays R${each.toFixed(2)}`);
}

printBill(600);
```
:::

::: solution
**A:** `ReferenceError: Name is not defined`. Node points at `${Name}` inside the function, and the next line of the error says `at welcome`, which tells you *which function* the problem is in. The parameter is `name` (small n). Change `${Name}` to `${name}`.

**B:** It prints `Save R90.00 on R20.00`, which is nonsense. The arguments are the wrong way round. The declaration says `(price, percent)`, so the call must be `printDiscount(450, 20)`, which prints `Save R90.00 on R450.00`. (By luck the saving is the same both ways, because multiplication does not care about order. The price shown is what gives the bug away.)

**C:** It prints `Each person pays RNaN`. The call forgot the second argument, so `people` is `undefined`, and `600 / undefined` is `NaN`. Fix it with `printBill(600, 3)`, which prints `Each person pays R200.00`.
:::

::: mistake
**Swapping the order of arguments.** JavaScript matches by position only. Check the declaration's first line when you call a function.

**Forgetting an argument.** The parameter becomes `undefined`, and maths on it gives `NaN`. If you see either one in your output, count your arguments.

**Using `let` for a parameter.** `function greet(let name)` is a `SyntaxError`. Parameters are created for you. Write only their names.

**Thinking the argument's variable name must match the parameter.** `greet(customer)` works fine with `function greet(name)`. Only the *value* is passed.

**Putting a parameter with a default first.** `function tip(percent = 10, bill)` means you can never leave `percent` out. Put defaults last.
:::

::: quiz
What does this program print?

```js
function ticket(price, discount = 50) {
  console.log(price - discount);
}

ticket(200);
ticket(200, 0);
ticket(80, 100);
```

- [ ] `150`, `150`, `-20`
- [ ] `150`, `200`, `30`
- [ ] `200`, `200`, `-20`
- [x] `150`, `200`, `-20`

The default is only used when the argument is **missing**. `ticket(200)` uses 50, giving 150. `ticket(200, 0)` passes a real value, `0`, so the default is ignored and nothing is taken off: 200. `ticket(80, 100)` gives `80 - 100`, which is -20. If you picked `150` for the second line, you treated `0` as "nothing given". It is a real argument.
:::

## Real-world uses

Almost every useful function takes input:

- A banking app's `sendMoney(toAccount, amount)` is one function used for millions of different transfers.
- A delivery app's `estimateFare(distanceKm)`, like your taxi fare, works for any trip.
- A music app's `setVolume(level)` is called every time you move the slider.
- A school system's `printReportCard(learnerName, term)` prints thousands of report cards from one function.

Parameters are what make a function *general*: it describes how to do a kind of job, and the arguments supply the details.

::: connect
**This builds on:** [functions](#/phase-04-functions/01-why-functions), and variables, since a parameter is a variable that gets its value from the call. `undefined` and `NaN` from Phase 1 show up whenever an argument is missing.

**This unlocks:** functions that give answers back. All of today's functions *print* their result, so you cannot use that result anywhere else. In [Return values](#/phase-04-functions/03-return-values), `calculateTip` will hand you the tip as a number, so you can add it to a total, compare it, or store it.
:::

::: challenge Draw any box
Create `phase-4/box.js`. Write `printBox(width, height, char)` where `char` defaults to `"#"`. It prints a solid rectangle `width` characters wide and `height` rows tall. Test it with `printBox(6, 3)` and `printBox(10, 2, "*")`.

**Extra challenge:** change it to draw a *hollow* box: the edges are `char` and the inside is spaces. `printBox(8, 4)` should print:
```text
########
#      #
#      #
########
```
:::

::: hint
Use **nested loops**, from Phase 3: an outer loop for rows and an inner loop for columns. Build each row as a string, then print it. For the hollow version, a character is on the edge when it is in the first or last row, **or** the first or last column.
:::

::: solution
Solid box:
```js
function printBox(width, height, char = "#") {
  for (let row = 1; row <= height; row++) {
    let line = "";
    for (let col = 1; col <= width; col++) {
      line += char;
    }
    console.log(line);
  }
}

printBox(6, 3);
console.log("");
printBox(10, 2, "*");
```
Output:
```text
######
######
######

**********
**********
```
Hollow box: change the inner loop's body to choose between `char` and a space:
```js
function printBox(width, height, char = "#") {
  for (let row = 1; row <= height; row++) {
    let line = "";
    for (let col = 1; col <= width; col++) {
      if (row === 1 || row === height || col === 1 || col === width) {
        line += char;
      } else {
        line += " ";
      }
    }
    console.log(line);
  }
}

printBox(8, 4);
```
Output:
```text
########
#      #
#      #
########
```
:::

::: recap
- A **parameter** is a placeholder in the function's declaration: `function greet(name)`. Inside the function it works like a variable.
- An **argument** is the actual value you pass in the call: `greet("Lerato")`. Each call can pass different arguments.
- Arguments can be values, variables or expressions. Their variable names do not need to match the parameter names.
- Separate several parameters (and arguments) with commas. They are matched **by position**, so order matters.
- A missing argument makes its parameter `undefined`. Extra arguments are ignored.
- A **default parameter** (`percent = 10`) is used only when no argument is given. Put defaults last.
:::

::: interview What is the difference between a parameter and an argument?
A parameter is the name in the function's declaration, a placeholder for a value the function will receive, like `name` in `function greet(name)`. An argument is the real value passed when calling it, like `"Lerato"` in `greet("Lerato")`.
:::

::: interview A function prints `NaN` where a number should be. What is one likely cause?
An argument was left out, so its parameter is `undefined`, and any maths with `undefined` gives `NaN`. Another cause is passing the arguments in the wrong order, so a word ends up where a number was expected.
:::

::: interview When would you give a parameter a default value?
When there is a sensible, common value that most callers would use anyway, such as a 10% tip or a line length of 20. It makes the function easier to call, while still letting people pass a different value when they need one.
:::

::: checkpoint
- [ ] I wrote `greet(name)` and called it with several different names
- [ ] I passed a variable with a different name than the parameter, and it still worked
- [ ] I swapped two arguments on purpose and saw the wrong (but error-free) output
- [ ] I finished the taxi fare exercise with a default parameter
- [ ] I finished at least two of: electricity, password check, count the vowels, times table
- [ ] I fixed all three programs in "Debug this"
:::

::: resources
- **javascript.info, "Functions":** https://javascript.info/function-basics. The sections on parameters and default values match this lesson.
- **MDN, "Functions — reusable blocks of code":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions. See the part on function parameters.
- **Eloquent JavaScript, chapter 3 "Functions":** https://eloquentjavascript.net/03_functions.html. A little more advanced, but the "Optional Arguments" section is worth a look.
:::
