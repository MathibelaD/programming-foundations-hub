---
title: Objects — describing one thing with many details
summary: Group related values under one name with labelled properties, and finally find out what the dot in "hi".length really means.
minutes: 50
stage: Phase 6
---

## What you will learn

- What an **object** is, and the problem it solves that variables and arrays cannot
- How to read, change, add and delete an object's properties with **dot notation** and **bracket notation**
- How to put arrays and other objects *inside* an object, and how to loop over an object's keys
- What the dot in `"hi".length`, `Math.round` and `console.log` has meant all along

**Before this:** [Project: Budget Buddy v5](#/phase-05-arrays/06-project-budget-buddy-v5). You should be comfortable with arrays and `for...of` loops.

## The problem: one thing, many details

Say you are writing a program for a school. For one learner you need a name, an age and a grade. With what you know so far, you would write:

```js
let studentName = "Thandi";
let studentAge = 16;
let studentGrade = 10;

let student2Name = "Liam";
let student2Age = 15;
let student2Grade = 9;

console.log(studentName, studentAge, studentGrade);
console.log(student2Name, student2Age, student2Grade);
```

Output:

```text
Thandi 16 10
Liam 15 9
```

It works, but look at what is going wrong:

- The three values for Thandi **belong together**, but nothing in the code says so. They are three loose boxes that happen to have similar names.
- Every new learner means three more variables with ever sillier names (`student2Age`, `student3Age`…).
- If you want to hand "Thandi" to a function, you have to pass three separate arguments, in the right order, every time.

An array does not fix this either. `["Thandi", 16, 10]` keeps the values together, but which one is the age? Position `1`? You would have to remember that `1` means "age" and `2` means "grade", and nobody can read `student[2]` and know what it is.

What we want is **one box** that holds several values, where each value has its own **label**. That is an object.

::: analogy An ID card or a form
Think of a South African ID card, a library card, or any form you have filled in. It is **one** card, about **one** person, but it has several labelled fields:

| Label | Value |
|---|---|
| Name | Thandi |
| Age | 16 |
| Grade | 10 |

You never ask "what is in field number 2?". You ask "what is the **age**?" and read the value next to that label.

An object is exactly this: one thing, made of labelled details. The labels are called **keys**, and what is written next to each label is its **value**.
:::

## Your first object

Here is Thandi as an object:

```js
const student = {
  name: "Thandi",
  age: 16,
  grade: 10,
};

console.log(student);
```

Output:

```text
{ name: 'Thandi', age: 16, grade: 10 }
```

Piece by piece:

| Piece | What it means |
|---|---|
| `{ }` | Curly brackets around key–value pairs make a new **object**. (Arrays use square brackets `[ ]`, objects use curly ones.) |
| `name` | A **key**: the label for one detail. Keys follow the same naming rules as variables. |
| `:` | Separates a key from its value. Read it as "is". `name: "Thandi"` says "name is Thandi". |
| `"Thandi"` | The **value** for that key. It can be any value: a number, a string, a boolean, an array, even another object. |
| `,` | Separates one pair from the next. The comma after the last pair is optional, but handy: adding a new line later cannot break anything. |

One key together with its value is called a **property**. So `student` has three properties: `name`, `age` and `grade`.

Two small things about the output:

- Node prints the object on one line when it is short, and over several lines when it is long. That is only presentation.
- Node shows text inside objects in single quotes (`'Thandi'`). Single and double quotes mean the same thing in JavaScript. We will keep writing double quotes in our code.

## Reading a property: the dot

To read one detail, write the object's name, a dot, and the key:

```js
const student = {
  name: "Thandi",
  age: 16,
  grade: 10,
};

console.log(student.name);
console.log(student.age + 1);
console.log(`${student.name} is in grade ${student.grade}.`);
```

Output:

```text
Thandi
17
Thandi is in grade 10.
```

Read `student.name` as "student's name". This is called **dot notation**. `student.age` behaves exactly like a normal variable holding `16`, so you can do maths with it, put it in a template literal, or pass it to a function.

What if you ask for a key that is not there?

```js
const student = { name: "Thandi", age: 16, grade: 10 };

console.log(student.surname);
console.log(student.Name);
```

Output:

```text
undefined
undefined
```

No error, only `undefined`: "this card has no field with that label". Keys are **case-sensitive**, like variable names, so `Name` is not `name`. This quiet `undefined` is friendly but also sneaky: a typo in a key does not crash your program, it silently gives you nothing. When you see `undefined` where you expected a value, check the spelling of the key first.

::: try Your first object
1. In your `coding-practice` folder, create a new folder called `phase-6`. In it, create `student.js`.
2. Type this in yourself:
   ```js
   const student = {
     name: "Thandi",
     age: 16,
     grade: 10,
   };

   console.log(student);
   console.log(student.name);
   console.log(`${student.name} is in grade ${student.grade}.`);
   ```
3. From inside `coding-practice`, run:
   ```bash
   node phase-6/student.js
   ```
4. You should see:
   ```text
   { name: 'Thandi', age: 16, grade: 10 }
   Thandi
   Thandi is in grade 10.
   ```
5. **Now experiment.** Add a fourth property, `school: "Soweto High",` inside the curly brackets. Predict what `console.log(student)` prints now, then run it.
6. Add `console.log(student.teacher);`. Predict, then run. (You should get `undefined`, because there is no `teacher` key.)
:::

## Changing, adding and deleting properties

Objects are not frozen. You can change a value, add a brand-new property, or remove one:

```js
const phone = { brand: "Samsung", model: "A15", airtime: 25 };

phone.airtime = phone.airtime + 50;   // change a property
phone.colour = "blue";                // add a new property
delete phone.model;                   // remove a property

console.log(phone);
```

Output:

```text
{ brand: 'Samsung', airtime: 75, colour: 'blue' }
```

- **Changing** looks like assigning to a variable: `phone.airtime = ...`. The right-to-left rule from [Variables](#/phase-01-storing-information/02-variables) still applies: work out `phone.airtime + 50` first, then store it.
- **Adding** uses the same syntax. If the key does not exist yet, JavaScript creates it. There is no special "add" command.
- **Deleting** uses the keyword `delete`. You will not need it often.

"Wait," you might say, "`phone` is a `const`. How can it change?" You met this with arrays in [Changing arrays](#/phase-05-arrays/02-changing-arrays): `const` stops you putting a **different object** in the box. It does not stop you changing what is written **on the card** inside the box. This is not allowed:

```js
const phone = { brand: "Samsung", airtime: 25 };
phone = { brand: "Nokia", airtime: 0 };
```

Output:

```text
TypeError: Assignment to constant variable.
```

Node points its `^` at the `=` on line 2. There is more to say about what the box really holds, and it is one of the most important ideas in the course. It is waiting for you in [Copies and references](#/phase-06-objects/04-values-and-references).

::: predict What does this print?
```js
const bike = { make: "Honda", km: 12000 };
bike.km = bike.km + 250;
bike.owner = "Kagiso";
console.log(bike.km);
console.log(bike.owner);
console.log(bike.colour);
console.log(bike);
```
Write down all four lines before you open the solution.
:::

::: solution
```text
12250
Kagiso
undefined
{ make: 'Honda', km: 12250, owner: 'Kagiso' }
```
`km` was changed, `owner` was added (a new key is created the moment you assign to it), and `colour` was never set, so it is `undefined`. Printing the whole object shows the new `owner` property at the end, because new properties are added after the existing ones.
:::

## Bracket notation: when the key is in a variable

There is a second way to reach a property: put the key, as a string, inside square brackets.

```js
const player = { name: "Siya", position: "flank", caps: 60 };

console.log(player["name"]);

const detail = "position";
console.log(player[detail]);
console.log(player.detail);
```

Output:

```text
Siya
flank
undefined
```

`player["name"]` is the same as `player.name`. So why have two ways? Look at the last two lines, because they are the whole point:

- `player[detail]` means "look inside the variable `detail`, find `"position"`, then get the `position` property". The key is **worked out while the program runs**.
- `player.detail` means "get the property literally called `detail`". There is no such key, so it is `undefined`.

This is **bracket notation**. Use it when:

1. **The key is in a variable**, for example because the user typed it or because you are looping over keys.
2. **The key has a space or a dash in it**, which dot notation cannot handle.

```js
const prices = {
  bread: 18.99,
  milk: 24.5,
  "peanut butter": 42,
};

console.log(prices["peanut butter"]);

prices["rooibos tea"] = 35;
console.log(prices);
```

Output:

```text
42
{ bread: 18.99, milk: 24.5, 'peanut butter': 42, 'rooibos tea': 35 }
```

A key with a space must be written in quotes when you create the object, and read with brackets. `prices.peanut butter` would be a syntax error. Most of the time you will choose keys without spaces and use the dot, because it is shorter and easier to read.

::: note A simple rule
**Use the dot when you know the key while writing the code** (`student.name`). **Use brackets when the key is only known while the program runs** (`student[whatTheUserAskedFor]`).
:::

Here is where brackets shine. An object can work as a little lookup table, a **dictionary**: give it a word, get back a matching value.

::: try A capital-city lookup
1. Create `phase-6/capitals.js`. This uses `prompt-sync`, which you installed in `coding-practice` back in Phase 1.
   ```js
   const prompt = require("prompt-sync")();

   const capitals = {
     "south africa": "Pretoria",
     kenya: "Nairobi",
     ghana: "Accra",
     egypt: "Cairo",
   };

   const country = prompt("Which country? ").trim().toLowerCase();
   const capital = capitals[country];

   if (capital === undefined) {
     console.log(`Sorry, I don't know the capital of ${country}.`);
   } else {
     console.log(`The capital is ${capital}.`);
   }
   ```
2. Run it with `node phase-6/capitals.js` and type `Kenya`:
   ```text
   Which country? Kenya
   The capital is Nairobi.
   ```
3. Run it again with `South Africa`, then with `Brazil`. Why does `Brazil` give the "Sorry" message? (There is no `brazil` key, so the lookup gives `undefined`.)
4. **Change it:** add `brazil: "Brasília",` and two more countries you know. Run it again.
5. **Think about it:** why do we call `.toLowerCase()` on the answer? Try removing it and typing `Kenya` again.
:::

Without an object, that program would be a long `if`/`else if` chain or a `switch` with a case for every country. The object turns it into one line: `capitals[country]`.

## Objects inside objects, and arrays inside objects

A property's value can be anything, including an array or another object:

```js
const person = {
  name: "Aisha",
  phone: "082 555 0199",
  hobbies: ["netball", "baking", "chess"],
  address: {
    street: "12 Jacaranda Road",
    city: "Durban",
    postalCode: "4001",
  },
};

console.log(person.address.city);
console.log(person.hobbies[0]);
console.log(person.hobbies.length);
console.log(person);
```

Output:

```text
Durban
netball
3
{
  name: 'Aisha',
  phone: '082 555 0199',
  hobbies: [ 'netball', 'baking', 'chess' ],
  address: { street: '12 Jacaranda Road', city: 'Durban', postalCode: '4001' }
}
```

Read `person.address.city` from left to right, one step at a time: "take `person`, get its `address` (which is an object), then get that object's `city`". Each dot goes one level deeper. `person.hobbies[0]` works the same way: get the `hobbies` array, then item `0` of it.

This is called **nesting**, and real data is full of it: an order has a customer, who has an address, which has a city.

Nesting has one trap. If a level in the middle is missing, you get an error rather than `undefined`:

```js
const person = { name: "Aisha" };
console.log(person.address);
console.log(person.address.city);
```

Output:

```text
undefined
TypeError: Cannot read properties of undefined (reading 'city')
```

Line 2 is fine: no `address`, so `undefined`. Line 3 tries to get `.city` **of** `undefined`, and `undefined` has no properties at all. Node points its `^` at `.city`. Learn to read this message: "Cannot read properties of undefined (reading 'city')" means "the thing **before** `.city` was `undefined`". So check `person.address`, not `city`.

## Looping over an object

Sometimes you want to visit every property without knowing the keys in advance. There are two common ways. Here is the first, `for...in`:

```js
const marks = { maths: 72, english: 65, science: 81 };

for (const subject in marks) {
  console.log(`${subject}: ${marks[subject]}`);
}
```

Output:

```text
maths: 72
english: 65
science: 81
```

`for...in` gives you each **key** in turn. To get the value, you use bracket notation, `marks[subject]`, because the key is in a variable. (This is the "key only known while the program runs" case.)

::: warn in vs of
`for...of` is for **arrays**: it gives you each item. `for...in` is for **objects**: it gives you each key. They differ by two letters, and mixing them up is a very common slip. If you try `for...of` on a plain object, Node stops with `TypeError: marks is not iterable`.
:::

The second way is `Object.keys(...)`, which hands you all the keys **as an array**. Once you have an array, everything from Phase 5 works on it:

```js
const marks = { maths: 72, english: 65, science: 81 };

const subjects = Object.keys(marks);
console.log(subjects);
console.log(subjects.length);

let total = 0;
for (const subject of subjects) {
  total += marks[subject];
}
console.log("Average:", total / subjects.length);
```

Output:

```text
[ 'maths', 'english', 'science' ]
3
Average: 72.66666666666667
```

`Object.keys` is handy when you need to know **how many** properties there are, or when you want to use an array tool such as `.length` or `.includes`. We will use it in Budget Buddy. Both ways are fine, so use whichever reads more clearly to you.

## The dot, finally explained

Since Phase 1 you have been writing things like these:

```js
"sawubona".length
"sawubona".toUpperCase()
Math.round(4.6)
console.log("hi")
```

Each one has a dot, and until now we have said "the dot means *ask this thing to do something*, and Phase 6 explains it properly". This is Phase 6. You now know what the dot does: **it reads a property of an object.**

- `Math` is an object that comes built into JavaScript. It has properties such as `PI` (a number) and `round` (a function).
- `console` is also a built-in object. One of its properties, `log`, is a function.

You can check this yourself:

```js
console.log(typeof console);
console.log(typeof console.log);
console.log(typeof Math);
console.log(typeof Math.round);
console.log(Math.PI);
```

Output:

```text
object
function
object
function
3.141592653589793
```

So `console.log("hi")` really means: "go to the `console` object, get its property called `log`, which is a function, and call it with `"hi"`". The dot fetches the function. The brackets `( )` call it.

A function stored as a property of an object has a special name: a **method**. `log` is a method of `console`. `round` is a method of `Math`. That is all a method is: **a function that lives on an object**.

You can even look at the function without calling it:

```js
console.log(Math.round);
console.log(Math.round(4.6));
```

Output:

```text
[Function: round]
5
```

Without brackets, you get the function itself. With brackets, it runs and you get its answer. (This is the same difference you saw in [Function expressions and arrow functions](#/phase-04-functions/05-arrow-functions): a function is a value until you call it.)

What about strings and arrays?

```js
const word = "sawubona";
console.log(word.length);
console.log(word.toUpperCase());
console.log(typeof word.toUpperCase);
```

Output:

```text
8
SAWUBONA
function
```

```js
const fruit = ["mango", "litchi"];
console.log(typeof fruit);
console.log(fruit.length);
```

Output:

```text
object
2
```

- **Arrays are objects.** A special kind, with numbered keys (`0`, `1`, `2`…), a `length` property, and methods like `push` and `pop`. That is why `typeof` says `"object"`.
- **Strings are not quite objects**, but whenever you put a dot after one, JavaScript lends it a set of properties and methods for a moment, so it *behaves* like one. `word.length` is a property. `word.toUpperCase` is a method. For everyday programming you can think of a string as "a value with useful methods attached".

This is a big moment, so let it sink in. Every dot you have typed in this course, `.length`, `.trim()`, `.push()`, `Math.floor()`, `console.log()`, has been the same thing: **get a property of an object**. Sometimes that property is a plain value. Sometimes it is a function, and then we call it a method and add `( )` to run it.

In [Objects and functions together](#/phase-06-objects/03-objects-and-functions) you will put methods on **your own** objects.

::: exercise Level 1 — Guided · A recipe card
Create `phase-6/recipe.js`.

1. Make a `const` object called `recipe` with four properties: `name` (`"Chakalaka"`), `servings` (`4`), `minutes` (`30`) and `ingredients`, an array of five strings: `"onion"`, `"peppers"`, `"carrots"`, `"baked beans"`, `"curry powder"`.
2. Print one line: `Chakalaka (serves 4, 30 minutes)`, using a template literal and dot notation. Do not type the numbers in the string.
3. Print `You need:`, then use a `for...of` loop over `recipe.ingredients` to print each one with `- ` in front.
4. You are cooking for a bigger family. Change `servings` to `8`.
5. Add a new property `vegetarian` with the value `true`.
6. Print the whole object and check both changes are there.
:::

::: solution
```js
const recipe = {
  name: "Chakalaka",
  servings: 4,
  minutes: 30,
  ingredients: ["onion", "peppers", "carrots", "baked beans", "curry powder"],
};

console.log(`${recipe.name} (serves ${recipe.servings}, ${recipe.minutes} minutes)`);
console.log("You need:");
for (const ingredient of recipe.ingredients) {
  console.log(`- ${ingredient}`);
}

recipe.servings = 8;
recipe.vegetarian = true;
console.log(recipe);
```
Output:
```text
Chakalaka (serves 4, 30 minutes)
You need:
- onion
- peppers
- carrots
- baked beans
- curry powder
{
  name: 'Chakalaka',
  servings: 8,
  minutes: 30,
  ingredients: [ 'onion', 'peppers', 'carrots', 'baked beans', 'curry powder' ],
  vegetarian: true
}
```
:::

::: exercise Level 2 — On your own · A profile builder
Create `phase-6/profile.js`. Using `prompt-sync`, ask the user for their name, favourite team and age, and store all three answers in **one object** called `profile` (remember to turn the age into a number). Then:

- Print a sentence such as `Zanele (19) supports Kaizer Chiefs.` using the object's properties.
- Add one to the age *inside the object*, and print `Next year Zanele will be 20.`
- Finally, print `Everything I know:` followed by every property as `key: value`, using a loop. Your loop must not mention `name`, `team` or `age` by name, so it would still work if you added more properties later.
:::

::: hint
You can call `prompt(...)` directly as a property's value: `name: prompt("Your name: ").trim(),`. For the last part, loop over `Object.keys(profile)` (or use `for...in`) and read each value with `profile[key]`.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const profile = {
  name: prompt("Your name: ").trim(),
  team: prompt("Favourite team: ").trim(),
  age: Number(prompt("Your age: ")),
};

console.log(`${profile.name} (${profile.age}) supports ${profile.team}.`);

profile.age = profile.age + 1;
console.log(`Next year ${profile.name} will be ${profile.age}.`);

console.log("Everything I know:");
for (const key of Object.keys(profile)) {
  console.log(`  ${key}: ${profile[key]}`);
}
```
A sample run:
```text
Your name: Zanele
Favourite team: Kaizer Chiefs
Your age: 19
Zanele (19) supports Kaizer Chiefs.
Next year Zanele will be 20.
Everything I know:
  name: Zanele
  team: Kaizer Chiefs
  age: 20
```
Notice the last loop prints `age: 20`, because it runs after the age was changed.
:::

::: debug Four broken orders
Each program has one problem. Two of them crash, and two of them quietly print the wrong thing, which is worse. Run each one, work out what went wrong, and fix it.

```js
// Program A
const order = { item: "kota", price: 35 };
console.log(`You ordered a ${order.Item}.`);
```

```js
// Program B
const order = { item: "kota", "extra chips": true };
console.log(order.extra chips);
```

```js
// Program C
const order = { item: "kota", price: 35 };
const wanted = "price";
console.log(order.wanted);
```

```js
// Program D
const order = { item: "kota", price: 35 };
console.log(order.customer.name);
```
:::

::: solution
**A** prints `You ordered a undefined.` Keys are case-sensitive: there is no `Item`, only `item`. Fix: `order.item`.

**B** crashes with `SyntaxError: missing ) after argument list`. Dot notation cannot handle a key with a space. Fix: `order["extra chips"]`.

**C** prints `undefined`. `order.wanted` looks for a key literally called `wanted`. The key you want is *inside* the variable, so use brackets: `order[wanted]`, which prints `35`.

**D** crashes with `TypeError: Cannot read properties of undefined (reading 'name')`. There is no `customer`, so `order.customer` is `undefined`, and you cannot get `.name` of `undefined`. Fix: either add a customer to the order, for example `customer: { name: "Bongani" }`, or do not ask for one that is not there.
:::

::: mistake
**Using `=` instead of `:` inside the curly brackets.** Inside an object it is `name: "Thandi"`, not `name = "Thandi"`. The colon means "is".

**Forgetting the commas between properties.** Every pair except the last needs a comma after it. A missing comma gives a `SyntaxError` pointing at the next line.

**Using the dot when the key is in a variable.** `obj.key` looks for a key called `key`. Use `obj[key]`.

**Putting quotes inside the brackets when the key is a variable.** `marks["subject"]` looks for a key called `subject`. `marks[subject]` uses the variable. Same rule as in [Variables](#/phase-01-storing-information/02-variables): quotes mean "this exact text".

**Mixing up `for...of` and `for...in`.** *Of* for arrays (items), *in* for objects (keys).

**Trusting a quiet `undefined`.** A misspelt key does not crash. If a value comes out as `undefined`, check the spelling and capitals of the key first.
:::

## Real-world uses

Objects are how programs describe *things*:

- A **user account**: `{ username, email, joined, isVerified }`.
- A **product** in an online shop: `{ name, price, inStock, sizes: [...] }`.
- A **settings screen**: `{ darkMode: true, language: "isiZulu", volume: 70 }`. Each switch on the screen is one property.
- A **lookup table**, like the capital cities above: exchange rates by currency code, prices by item name, or translations by word.
- **Built-in tools**: `Math`, `console`, and every string and array method you have used.

When you hear programmers talk about "a record", "a model" or "an entity", they usually mean an object like these.

::: connect
**This builds on:** [variables](#/phase-01-storing-information/02-variables) (an object is one box with labelled compartments), [arrays](#/phase-05-arrays/01-what-is-an-array) (arrays are a special kind of object), and every `.method()` you have called since Phase 1.

**This unlocks:** next, [Lists of objects](#/phase-06-objects/02-arrays-of-objects) puts objects inside arrays, which is the shape of almost all real data. Then [Objects and functions together](#/phase-06-objects/03-objects-and-functions) adds methods to your own objects, and [Copies and references](#/phase-06-objects/04-values-and-references) explains why `const` objects can still change.
:::

::: challenge The lunch vote
The class voted on what to eat at the year-end party:

```js
const votes = ["pizza", "braai", "pizza", "bunny chow", "braai", "pizza"];
```

Write a program that builds an object called `counts`, with one key per food and the number of votes as its value, and prints it. It should give:

```text
{ pizza: 3, braai: 2, 'bunny chow': 1 }
```

Do not type the food names anywhere except in the `votes` array, so that it works for any list of votes. Then, as a bonus, loop over `counts` to find and print the winner.
:::

::: hint
Start with an empty object: `const counts = {};`. Loop over the votes. For each vote, check whether `counts[vote]` is `undefined`. If it is, this is the first vote for that food, so set it to `1`. Otherwise add one to it. For the winner, use the "keep the best so far" pattern from [Loop patterns](#/phase-03-loops/04-loop-patterns).
:::

::: solution
```js
const votes = ["pizza", "braai", "pizza", "bunny chow", "braai", "pizza"];
const counts = {};

for (const vote of votes) {
  if (counts[vote] === undefined) {
    counts[vote] = 1;
  } else {
    counts[vote] = counts[vote] + 1;
  }
}

console.log(counts);
```
Output:
```text
{ pizza: 3, braai: 2, 'bunny chow': 1 }
```
The key comes from a variable (`vote`), so you **must** use brackets.

There is a popular shorter way to write the `if`/`else`. It uses the `||` default trick from [Truthy and falsy](#/phase-02-making-decisions/04-truthy-and-falsy):

```js
counts[vote] = (counts[vote] || 0) + 1;
```

In plain words: "take the count so far, or `0` if there is none yet, and add one". Here it is with the winner added:

```js
const votes = ["pizza", "braai", "pizza", "bunny chow", "braai", "pizza"];
const counts = {};

for (const vote of votes) {
  counts[vote] = (counts[vote] || 0) + 1;
}

console.log(counts);

let winner = "";
for (const food in counts) {
  if (winner === "" || counts[food] > counts[winner]) {
    winner = food;
  }
}
console.log(`The winner is ${winner} with ${counts[winner]} votes.`);
```
Output:
```text
{ pizza: 3, braai: 2, 'bunny chow': 1 }
The winner is pizza with 3 votes.
```
An object used like this, to count or add things up by name, is called a **tally**. You will use exactly this pattern to add up spending per category in Budget Buddy.
:::

::: recap
- An **object** groups related values under one name. Each value has a label called a **key**. A key with its value is a **property**.
- Create one with curly brackets: `{ name: "Thandi", age: 16 }`.
- Read with **dot notation** (`student.name`) when you know the key while writing code, and **bracket notation** (`student[key]`) when the key is in a variable or has a space.
- Assigning to a property changes it, or creates it if it did not exist. `delete` removes one. A missing property gives `undefined`.
- Values can be arrays or other objects (**nesting**): `person.address.city`. Reading a property of `undefined` is a `TypeError`.
- `for...in` loops over an object's keys, and `Object.keys(obj)` gives the keys as an array.
- `Math`, `console`, arrays (and, in effect, strings) are objects. A **method** is a function stored as a property, which is what every `.something()` you have written really is.
:::

::: interview When would you use bracket notation instead of dot notation?
When the key is stored in a variable (for example, typed by the user or coming from a `for...in` loop), because `obj.key` would look for a key literally called "key". Also when the key contains a space or dash, like `prices["peanut butter"]`. Otherwise the dot is shorter and clearer.
:::

::: interview What is a method?
A function that is stored as a property of an object. `console.log` is the `log` method of the `console` object, and `"hi".toUpperCase()` calls a string's `toUpperCase` method. The dot gets the function, and the brackets call it.
:::

::: interview Why use an object instead of three separate variables, or an array?
Separate variables do not show that the values belong together, and they are awkward to pass around. An array keeps them together, but you have to remember what each position means. An object keeps them together **and** labels each one, so `student.age` explains itself.
:::

::: checkpoint
- [ ] I created `phase-6/student.js`, added a property, and saw `undefined` for a key that does not exist
- [ ] I ran the capital-city lookup and added my own countries
- [ ] I finished the recipe card and changed a property inside a `const` object
- [ ] I built the profile program and printed every property with a loop
- [ ] I fixed all four broken orders and can say which ones crashed and which ones failed quietly
- [ ] I can explain what the dot in `console.log` means, out loud, without looking
:::

::: resources
- **javascript.info, "Objects":** https://javascript.info/object. A clear chapter on everything in this lesson, with small tasks at the end.
- **MDN, "JavaScript object basics":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics. A beginner guide covering dot and bracket notation.
- **Eloquent JavaScript, chapter 4, "Data Structures: Objects and Arrays":** https://eloquentjavascript.net/04_data.html. A story-based chapter, good for a second angle on the same ideas.
:::
