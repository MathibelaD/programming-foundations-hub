---
title: Lists of objects — the shape of real data
summary: Put objects inside an array to hold a whole table of records, then loop, total, search and filter them by hand.
minutes: 50
stage: Phase 6
---

## What you will learn

- Why a list of objects is the most common shape of data in real programs
- How to read one property of one item, like `products[2].price`
- How to loop over a list of objects to print, total, find the biggest, find one item, and keep only the items that match
- How to build new objects from the user's answers and add them to a list

**Before this:** [Objects: describing one thing with many details](#/phase-06-objects/01-what-is-an-object).

## The problem: lists that fall out of step

In Phase 5 you kept lists of single values: amounts, names, marks. But real things have several details. A shop has products, and each product has a name, a price and whether it is in stock.

With arrays alone, you might try **parallel arrays**: one array per detail, where position `0` in each array is the first product, position `1` is the second, and so on.

```js
const names = ["Bread", "Milk", "Eggs"];
const prices = [18.99, 24.5, 45];

// Milk is sold out, so remove it...
names.splice(1, 1);
// ...but we forget to remove its price

for (let i = 0; i < names.length; i++) {
  console.log(`${names[i]}: R${prices[i]}`);
}
```

Output:

```text
Bread: R18.99
Eggs: R24.5
```

Eggs now cost R24.50, which is the price of milk. Nothing crashed, and the program looks fine, but the data is wrong. With parallel arrays, **every** change has to be made to **every** array in exactly the same way, forever. Miss one, and the lists quietly fall out of step.

The fix is to keep each product's details **together in one object**, and keep the objects in **one array**. Remove a product and its name, price and stock all leave together, because they were never apart.

::: analogy A spreadsheet
Picture a spreadsheet, or a class register:

| name | price | inStock |
|---|---|---|
| Bread | 18.99 | true |
| Milk | 24.5 | false |
| Eggs | 45 | true |

- Each **row** is one thing: that is one **object**.
- Each **column heading** is a key that every row shares.
- The whole **table** is the **array**: a list of rows, in order, numbered from 0.

Delete a row and the whole row goes. You cannot accidentally delete a name but leave its price behind.
:::

## Creating a list of objects

Here is that table in JavaScript:

```js
const products = [
  { name: "Bread", price: 18.99, inStock: true },
  { name: "Milk", price: 24.5, inStock: false },
  { name: "Eggs", price: 45, inStock: true },
];

console.log(products.length);
console.log(products[0]);
console.log(products[0].name);
console.log(products[2].price);
```

Output:

```text
3
{ name: 'Bread', price: 18.99, inStock: true }
Bread
45
```

Square brackets on the outside make the array. Curly brackets inside make each object. Commas separate the objects, exactly as they separate numbers in `[1, 2, 3]`. Putting one object per line keeps it readable.

Read `products[2].price` from left to right, one step at a time:

1. `products`: the whole array.
2. `products[2]`: the item at index 2, which is the eggs object.
3. `products[2].price`: that object's `price`, which is `45`.

Everything you learned about arrays still works (`.length`, `.push`, `.splice`, indexes from 0), and everything you learned about objects works on each item.

::: note What real data looks like
This shape is everywhere. When a banking app asks the bank's server for your recent transactions, the answer comes back as text that looks like this:

```json
[
  { "date": "2026-09-01", "description": "Checkers Hyper", "amount": -342.5 },
  { "date": "2026-09-01", "description": "Salary", "amount": 18500 },
  { "date": "2026-09-02", "description": "Uber", "amount": -86 }
]
```

A list of objects. The weather app gets a list of objects (one per day), the music app gets a list of objects (one per song), and a shop gets a list of objects (one per product). The quotes around the keys are because this is **JSON**, a way of writing data as text. You will meet it properly in [Saving data with JSON](#/phase-06-objects/05-saving-data-with-json).

Once you can work with a list of objects, you can work with the data of almost any app.
:::

::: predict What does this print?
```js
const pets = [
  { name: "Rex", type: "dog", age: 3 },
  { name: "Mimi", type: "cat", age: 5 },
];
console.log(pets[1].name);
console.log(pets.length);
console.log(pets[0].age + pets[1].age);
console.log(pets[2]);
```
:::

::: solution
```text
Mimi
2
8
undefined
```
`pets[1]` is the second object (Mimi). The array holds two objects, so its length is `2`. `3 + 5` is `8`. There is no index `2` in a two-item array, so `pets[2]` is `undefined`, the same as reading past the end of any array.
:::

## Looping over a list of objects

The `for...of` loop from Phase 5 works unchanged. The only difference is that each item is now an object, so you read its properties with a dot:

```js
const products = [
  { name: "Bread", price: 18.99, inStock: true },
  { name: "Milk", price: 24.5, inStock: false },
  { name: "Eggs", price: 45, inStock: true },
];

for (const product of products) {
  console.log(`${product.name}: R${product.price.toFixed(2)}`);
}
```

Output:

```text
Bread: R18.99
Milk: R24.50
Eggs: R45.00
```

Name the loop variable as **one** of the things in the list: `products` holds many, so each one is a `product`. This small habit makes code read like a sentence: "for each product of products".

When you need the position too, for example to number the list for a person, use the counting `for` loop and pull out the item first:

```js
const products = [
  { name: "Bread", price: 18.99, inStock: true },
  { name: "Milk", price: 24.5, inStock: false },
  { name: "Eggs", price: 45, inStock: true },
];

for (let i = 0; i < products.length; i++) {
  const product = products[i];
  const stock = product.inStock ? "in stock" : "SOLD OUT";
  console.log(`${i + 1}. ${product.name} - R${product.price.toFixed(2)} (${stock})`);
}
```

Output:

```text
1. Bread - R18.99 (in stock)
2. Milk - R24.50 (SOLD OUT)
3. Eggs - R45.00 (in stock)
```

`const product = products[i];` gives the current item a friendly name, so the rest of the loop body does not need `products[i]` over and over.

::: try A shop list
1. Create `phase-6/shop.js` and type in the numbered-list program above.
2. Run it from inside `coding-practice`:
   ```bash
   node phase-6/shop.js
   ```
3. You should see the three numbered lines shown above.
4. **Change it:** add a fourth product, `{ name: "Maize meal", price: 64.99, inStock: true },`. Predict the new output, then run it. You did not have to change the loop at all. That is the power of the pattern.
5. Set Bread's `inStock` to `false`. Predict and run again.
:::

## The Phase 5 patterns, on objects

In [Classic list algorithms, written by hand](#/phase-05-arrays/04-array-algorithms-by-hand) you wrote loops to sum, find the maximum, count, find and filter. They all work on lists of objects too. The only change is that you work with **one property** of each item.

### Sum a property

The **accumulator** pattern: start at zero, and add each item's value.

```js
const trips = [
  { from: "Soweto", to: "Joburg CBD", fare: 18 },
  { from: "Joburg CBD", to: "Sandton", fare: 15 },
  { from: "Sandton", to: "Soweto", fare: 24 },
  { from: "Soweto", to: "Joburg CBD", fare: 18 },
];

let total = 0;
for (const trip of trips) {
  total += trip.fare;
}

console.log(`Taxi fares this week: R${total}`);
console.log(`Average fare: R${(total / trips.length).toFixed(2)}`);
```

Output:

```text
Taxi fares this week: R75
Average fare: R18.75
```

Notice `total += trip.fare`, not `total += trip`. You add the **fare**, not the whole trip.

### Find the biggest, and keep the whole object

The **maximum** pattern: keep the best so far. With objects, there is a nice upgrade. Instead of keeping only the biggest *number*, keep the whole *object*, so you also know whose it was:

```js
const players = [
  { name: "Lerato", goals: 4 },
  { name: "Musa", goals: 7 },
  { name: "Priya", goals: 5 },
];

let top = players[0];
for (const player of players) {
  if (player.goals > top.goals) {
    top = player;
  }
}

console.log(`Top scorer: ${top.name} with ${top.goals} goals`);
```

Output:

```text
Top scorer: Musa with 7 goals
```

We start with the first player as "the best so far", then compare **goals** but keep the **player**. At the end, `top` is a whole object, so both `top.name` and `top.goals` are ready to use.

### Find one item by a property

The **find** pattern: look at each item, and stop as soon as one matches. Wrapping it in a function lets you `return` the match, which ends the loop immediately:

```js
const contacts = [
  { name: "Nomsa", phone: "071 234 5678" },
  { name: "Ahmed", phone: "082 555 1234" },
  { name: "Grace", phone: "060 987 6543" },
];

function findContact(list, name) {
  for (const contact of list) {
    if (contact.name === name) {
      return contact;
    }
  }
  return undefined;
}

const found = findContact(contacts, "Ahmed");
console.log(found);
console.log(found.phone);

const missing = findContact(contacts, "Pieter");
console.log(missing);
```

Output:

```text
{ name: 'Ahmed', phone: '082 555 1234' }
082 555 1234
undefined
```

If nothing matches, the loop ends and the function returns `undefined`, meaning "not found". Whoever calls `findContact` should check for that before reading `.phone`, otherwise they get the `Cannot read properties of undefined` error you met in the last lesson.

### Keep only the items that match

The **filter** pattern: build a new, empty array, and `push` in only the items that pass a test:

```js
const learners = [
  { name: "Sipho", mark: 45 },
  { name: "Anele", mark: 78 },
  { name: "Ruan", mark: 52 },
  { name: "Fatima", mark: 91 },
  { name: "Tumi", mark: 38 },
];

const passed = [];
for (const learner of learners) {
  if (learner.mark >= 50) {
    passed.push(learner);
  }
}

console.log(`${passed.length} of ${learners.length} passed:`);
for (const learner of passed) {
  console.log(`  ${learner.name} (${learner.mark}%)`);
}
```

Output:

```text
3 of 5 passed:
  Anele (78%)
  Ruan (52%)
  Fatima (91%)
```

`passed` holds whole learner objects, so we can still print both the name and the mark. The original `learners` list is untouched.

### Pull one property out of every item

The **transform** (map) pattern: build a new array with one thing from each item. Here, only the names:

```js
const learners = [
  { name: "Sipho", mark: 45 },
  { name: "Anele", mark: 78 },
  { name: "Ruan", mark: 52 },
];

const names = [];
for (const learner of learners) {
  names.push(learner.name);
}
console.log(names.join(", "));
```

Output:

```text
Sipho, Anele, Ruan
```

These five loops (sum, max, find, filter, transform) will carry you through a surprising amount of real programming. In Phase 7 you will meet shortcuts for each one, and you will understand them instantly because you have written them by hand.

::: try Your own playlist
1. Create `phase-6/playlist.js`:
   ```js
   const playlist = [
     { title: "Jerusalema", artist: "Master KG", seconds: 342 },
     { title: "Water", artist: "Tyla", seconds: 200 },
     { title: "Paper Planes", artist: "M.I.A.", seconds: 204 },
     { title: "Calm Down", artist: "Rema", seconds: 239 },
   ];

   for (let i = 0; i < playlist.length; i++) {
     const song = playlist[i];
     console.log(`${i + 1}. ${song.title} by ${song.artist}`);
   }
   ```
2. Run `node phase-6/playlist.js`. You should see:
   ```text
   1. Jerusalema by Master KG
   2. Water by Tyla
   3. Paper Planes by M.I.A.
   4. Calm Down by Rema
   ```
3. **Add to it:** below the loop, use the accumulator pattern to add up `seconds`, then print the total as minutes and seconds (use `Math.floor(total / 60)` and `total % 60`).
4. **Add more:** use the maximum pattern to print the longest song's title.
5. Replace the songs with four of your own favourites and run it again. The full solution is in the Level 1 exercise below, if you get stuck.
:::

## Adding new objects from user input

A list is not much use if you cannot add to it. The recipe is:

1. Ask for each detail.
2. Build an object from the answers.
3. `push` the object onto the array.

Here it is inside a "keep going until the user enters nothing" loop from [The while loop](#/phase-03-loops/02-while-loops):

```js
const prompt = require("prompt-sync")();

const contacts = [];

let name = prompt("Name (leave empty to stop): ").trim();
while (name !== "") {
  const phone = prompt("Phone: ").trim();
  const contact = { name: name, phone: phone };
  contacts.push(contact);
  name = prompt("Name (leave empty to stop): ").trim();
}

console.log(`You saved ${contacts.length} contact(s):`);
for (const contact of contacts) {
  console.log(`  ${contact.name}: ${contact.phone}`);
}
console.log(contacts);
```

A sample session (the user presses Enter on an empty line to stop):

```text
Name (leave empty to stop): Nomsa
Phone: 071 234 5678
Name (leave empty to stop): Ahmed
Phone: 082 555 1234
Name (leave empty to stop): 
You saved 2 contact(s):
  Nomsa: 071 234 5678
  Ahmed: 082 555 1234
[
  { name: 'Nomsa', phone: '071 234 5678' },
  { name: 'Ahmed', phone: '082 555 1234' }
]
```

Look closely at `{ name: name, phone: phone }`. The first `name` is the **key** (the label on the card). The second `name` is the **variable** holding what the user typed. It looks repetitive, but each half has a different job.

::: note A shortcut you will see
When the key and the variable have the same name, JavaScript lets you write it once: `{ name, phone }` means exactly `{ name: name, phone: phone }`. You will see this in other people's code. In this course we will mostly write the long form, because it shows clearly what is going on.
:::

::: try Build a contact list
1. Create `phase-6/contacts.js` and type in the program above.
2. Run it with `node phase-6/contacts.js`. Add three people, then press Enter on an empty name.
3. Check that the count and the list match what you typed.
4. **Change it:** also ask for a `city` for each contact, store it in the object, and print it in the list. You need to change three places: the question, the object, and the printout.
5. Run it and add someone. Then add a person with the same name twice. What happens? (Both are added. A list of objects does not stop duplicates unless you write a check.)
:::

::: exercise Level 1 — Guided · Playlist statistics
Finish the playlist from the "Your own playlist" try block, in `phase-6/playlist.js`.

1. Keep the numbered list.
2. Make `let totalSeconds = 0;` and loop over `playlist`, adding each `song.seconds`.
3. Work out `const minutes = Math.floor(totalSeconds / 60);` and `const seconds = totalSeconds % 60;`, and print `Total playing time: 16 min 25 sec`.
4. Make `let longest = playlist[0];`. Loop over the songs, and when a song's `seconds` is greater than `longest.seconds`, store that song in `longest`.
5. Print `Longest song: Jerusalema (342 seconds)`.
:::

::: solution
```js
const playlist = [
  { title: "Jerusalema", artist: "Master KG", seconds: 342 },
  { title: "Water", artist: "Tyla", seconds: 200 },
  { title: "Paper Planes", artist: "M.I.A.", seconds: 204 },
  { title: "Calm Down", artist: "Rema", seconds: 239 },
];

for (let i = 0; i < playlist.length; i++) {
  const song = playlist[i];
  console.log(`${i + 1}. ${song.title} by ${song.artist}`);
}

let totalSeconds = 0;
for (const song of playlist) {
  totalSeconds += song.seconds;
}
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
console.log(`Total playing time: ${minutes} min ${seconds} sec`);

let longest = playlist[0];
for (const song of playlist) {
  if (song.seconds > longest.seconds) {
    longest = song;
  }
}
console.log(`Longest song: ${longest.title} (${longest.seconds} seconds)`);
```
Output:
```text
1. Jerusalema by Master KG
2. Water by Tyla
3. Paper Planes by M.I.A.
4. Calm Down by Rema
Total playing time: 16 min 25 sec
Longest song: Jerusalema (342 seconds)
```
:::

::: exercise Level 2 — On your own · The school library
Create `phase-6/library.js` with this list:

```js
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", available: true },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", available: false },
  { title: "Arrow of God", author: "Chinua Achebe", available: false },
  { title: "Born a Crime", author: "Trevor Noah", available: true },
  { title: "Anthills of the Savannah", author: "Chinua Achebe", available: true },
];
```

Write three functions, each with its own loop:

- `booksBy(list, author)` returns a **new array** of the books by that author.
- `countAvailable(list)` returns **how many** books are available.
- `findBook(list, title)` returns the **book object** with that title, or `undefined`. It should not care about capitals, so `"born a crime"` finds `"Born a Crime"`.

Then use them to print: the number and titles of books by Chinua Achebe, `Available right now: 3 of 5`, and whether "born a crime" is on the shelf or out on loan. Finally, print the result of searching for `"Harry Potter"`.
:::

::: hint
`booksBy` is the filter pattern (empty array, `push` the matches). `countAvailable` is the counter pattern (`count++` when `book.available` is true). `findBook` is the find pattern: compare `book.title.toLowerCase()` with `title.toLowerCase()`, and `return book` as soon as they match. Put `return undefined;` after the loop.
:::

::: solution
```js
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", available: true },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", available: false },
  { title: "Arrow of God", author: "Chinua Achebe", available: false },
  { title: "Born a Crime", author: "Trevor Noah", available: true },
  { title: "Anthills of the Savannah", author: "Chinua Achebe", available: true },
];

function booksBy(list, author) {
  const result = [];
  for (const book of list) {
    if (book.author === author) {
      result.push(book);
    }
  }
  return result;
}

function countAvailable(list) {
  let count = 0;
  for (const book of list) {
    if (book.available) {
      count++;
    }
  }
  return count;
}

function findBook(list, title) {
  for (const book of list) {
    if (book.title.toLowerCase() === title.toLowerCase()) {
      return book;
    }
  }
  return undefined;
}

const achebe = booksBy(books, "Chinua Achebe");
console.log(`Books by Chinua Achebe: ${achebe.length}`);
for (const book of achebe) {
  console.log(`  ${book.title}`);
}

console.log(`Available right now: ${countAvailable(books)} of ${books.length}`);

const wanted = findBook(books, "born a crime");
if (wanted === undefined) {
  console.log("Sorry, we don't have that book.");
} else {
  console.log(`${wanted.title}: ${wanted.available ? "on the shelf" : "out on loan"}`);
}

const missing = findBook(books, "Harry Potter");
console.log(missing);
```
Output:
```text
Books by Chinua Achebe: 3
  Things Fall Apart
  Arrow of God
  Anthills of the Savannah
Available right now: 3 of 5
Born a Crime: on the shelf
undefined
```
:::

::: debug Three shopping-cart bugs
None of these crash, but all three print the wrong thing. Run each, explain what went wrong, and fix it.

```js
// Program A
const cart = [
  { item: "Rice", price: 32 },
  { item: "Beans", price: 21 },
];
console.log(`First item costs R${cart.price}`);
```

```js
// Program B
const cart = [
  { item: "Rice", price: 32 },
  { item: "Beans", price: 21 },
];
for (const thing in cart) {
  console.log(thing.item);
}
```

```js
// Program C
const cart = [
  { item: "Rice", price: 32 },
  { item: "Beans", price: 21 },
];
let total = 0;
for (const thing of cart) {
  total += thing;
}
console.log(`Total: R${total}`);
```
:::

::: solution
**A** prints `First item costs Rundefined`. `cart` is the whole array, and an array has no `price` property. You need to pick an item first: `cart[0].price`, which gives `32`.

**B** prints `undefined` twice. `for...in` gives the **keys** of the array, which are the index strings `"0"` and `"1"`, not the objects. `"0".item` is `undefined`. Use `for...of` to get each object: `for (const thing of cart)`.

**C** prints `Total: R0[object Object][object Object]`. It adds the whole object, not its price. JavaScript does not know how to add an object to a number, so it turns both into text and glues them together. `[object Object]` is what an object looks like when forced into a string. Whenever you see `[object Object]` in your output, you have used an object where you meant one of its properties. Fix: `total += thing.price;`, which gives `Total: R53`.
:::

::: mistake
**Reading a property of the array instead of an item.** `products.name` is `undefined`. You want `products[0].name`, or `product.name` inside a loop.

**Using `for...in` on an array.** It gives you index strings, not the items. For arrays, use `for...of` (or a counting `for` loop).

**Adding or comparing the whole object.** `total += expense` or `if (player > top)` uses the object, not the number inside it. Say which property: `expense.amount`, `player.goals`.

**Missing commas between objects.** Each `{ ... }` in the array needs a comma after it (the last one is optional). A missing one gives `SyntaxError: Unexpected token '{'`.

**Inconsistent keys.** If one object has `price` and another has `Price` or `cost`, your loop will get `undefined` for some items. Every object in a list should have the same keys. The next lesson shows a neat way to guarantee that.
:::

## Real-world uses

Almost every screen you use shows a list of objects:

- Your **WhatsApp chat list**: each chat is an object with a name, last message, time and unread count.
- A **bank statement**: each transaction is an object with a date, description and amount. The "total spent this month" figure is the accumulator pattern.
- An **online shop's search results**: a list of product objects, filtered by the price range you chose.
- A **school report system**: a list of learner objects. "Who failed maths?" is the filter pattern.
- A **leaderboard** in a game: player objects, with the maximum pattern crowning the winner.

::: connect
**This builds on:** [objects](#/phase-06-objects/01-what-is-an-object), [looping through arrays](#/phase-05-arrays/03-looping-through-arrays), and the hand-written algorithms from [Classic list algorithms](#/phase-05-arrays/04-array-algorithms-by-hand).

**This unlocks:** Budget Buddy's expenses become a list of objects in [Project: Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6). Next, [Objects and functions together](#/phase-06-objects/03-objects-and-functions) shows how to create objects with a function so they always have the same shape. In Phase 7 you will meet shortcuts for all five loop patterns.
:::

::: challenge Spending per category
Here is a week of spending:

```js
const spending = [
  { description: "Taxi to work", amount: 18, category: "transport" },
  { description: "Bread and milk", amount: 43.5, category: "food" },
  { description: "Airtime", amount: 50, category: "phone" },
  { description: "Taxi home", amount: 18, category: "transport" },
  { description: "Vetkoek", amount: 12, category: "food" },
];
```

Build an object called `totals` with one key per category and the total spent in that category as the value. Then print each category on its own line with the amount to two decimal places. Do not type any category names yourself: the program must work for any list.
:::

::: hint
This is the tally from the lunch-vote challenge in the last lesson, but instead of adding `1` for each vote you add the item's `amount`. The key comes from `spend.category`, so you need bracket notation: `totals[spend.category]`. Then loop over `totals` with `for...in` to print it.
:::

::: solution
```js
const spending = [
  { description: "Taxi to work", amount: 18, category: "transport" },
  { description: "Bread and milk", amount: 43.5, category: "food" },
  { description: "Airtime", amount: 50, category: "phone" },
  { description: "Taxi home", amount: 18, category: "transport" },
  { description: "Vetkoek", amount: 12, category: "food" },
];

const totals = {};
for (const spend of spending) {
  totals[spend.category] = (totals[spend.category] || 0) + spend.amount;
}

console.log(totals);
for (const category in totals) {
  console.log(`${category}: R${totals[category].toFixed(2)}`);
}
```
Output:
```text
{ transport: 36, food: 55.5, phone: 50 }
transport: R36.00
food: R55.50
phone: R50.00
```
The key line says: "the total for this category is whatever it was so far (or `0` if this is the first time we have seen the category), plus this amount". This exact line is the heart of the Budget Buddy category report.
:::

::: recap
- A **list of objects** (an array whose items are objects) is the most common shape of real data: rows in a table, where each row is an object.
- It avoids **parallel arrays**, which fall out of step when one is changed and the others are not.
- Read one detail with `list[index].property`, left to right.
- Loop with `for...of` and read `item.property`. Use a counting `for` loop when you need numbering.
- The Phase 5 patterns work on one property: **sum** (`total += trip.fare`), **max** (keep the whole best object), **find** (return the first match or `undefined`), **filter** (push matches into a new array) and **transform** (push one property from each).
- Add new records by asking questions, building an object from the answers, and pushing it.
- `[object Object]` in your output means you used a whole object where you meant one of its properties.
:::

::: interview Why is a list of objects better than several parallel arrays?
Each object keeps all the details of one thing together. With parallel arrays, removing or reordering an item has to be done identically in every array, and one mistake silently mismatches the data (the eggs end up with the milk's price). With a list of objects, a record is added, moved or removed as one unit.
:::

::: interview How would you find the most expensive product in a list of product objects?
Use the maximum pattern: store the first product as "the most expensive so far", loop over all products, and whenever `product.price` is greater than the stored one's price, store that product instead. Keeping the whole object (not only the price) means you also know its name at the end.
:::

::: interview What does `[object Object]` in your output usually mean?
That a whole object was turned into text, for example by adding it to a number or a string. It usually means you forgot to pick a property, such as writing `total += item` instead of `total += item.price`.
:::

::: checkpoint
- [ ] I ran the numbered shop list and added a product without changing the loop
- [ ] I finished the playlist statistics: total playing time and longest song
- [ ] I built the contact list from user input and added a `city` to each contact
- [ ] I wrote `booksBy`, `countAvailable` and `findBook` for the school library
- [ ] I fixed all three shopping-cart bugs and know what `[object Object]` means
- [ ] I can explain why parallel arrays are risky, out loud
:::

::: resources
- **javascript.info, "Objects":** https://javascript.info/object. A refresher on objects, with tasks.
- **Eloquent JavaScript, chapter 4, "Data Structures: Objects and Arrays":** https://eloquentjavascript.net/04_data.html. Works through a longer example that uses a list of objects (a journal of daily entries).
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the "find the top scorer" example and watch `top` point at different player objects as the loop runs.
:::
