---
title: Saving data to a file with JSON
summary: Make your programs remember things between runs by turning objects into JSON text and saving it to a file.
minutes: 55
stage: Phase 6
---

## What you will learn

- Why everything in your variables disappears when a program ends, and how files fix that
- What **JSON** is, and how `JSON.stringify` and `JSON.parse` turn objects into text and back
- How to write and read files with Node's built-in `fs` module, and how to handle the very first run with `fs.existsSync`
- The "load, change, save" pattern, and a small safety net for a broken file

**Before this:** [Copies and references](#/phase-06-objects/04-values-and-references).

## The problem: programs have no memory

Every program you have written so far forgets everything the moment it ends. Try this one:

```js
let visits = 0;
visits = visits + 1;
console.log(`You have run this program ${visits} time(s).`);
```

Run it twice:

```text
You have run this program 1 time(s).
You have run this program 1 time(s).
```

It always says `1`. Variables live in the computer's **memory** (its RAM), which is a scratch pad the program uses while it runs. When the program ends, Node throws the scratch pad away. Next time, everything starts from zero.

That is fine for a calculator. It is useless for a budget app, where you want to add Monday's expenses on Monday, close the program, and still see them on Friday. Your Budget Buddy has this exact problem right now: quit, and every expense you typed is gone.

To remember something **between runs**, a program has to write it somewhere that lasts: a **file** on the disk. Next time it starts, it reads the file back.

::: analogy A notebook by the bed
Your memory during the day is like a program's variables: quick and handy, but you cannot trust it to last. So before you go to sleep, you write the important things in a notebook: "Owe Sizwe R50. Buy school shoes." In the morning you open the notebook and carry on where you left off.

A file is the program's notebook. **Saving** is writing in it before you sleep (before the program ends). **Loading** is reading it when you wake up (when the program starts). A computer game's "save game" works exactly like this.
:::

There is one catch. A file can only hold **text** (well, bytes, but for us: text). Your data is in objects and arrays. So we need a way to turn an object into text, and text back into an object. That is JSON.

## JSON: objects written as text

**JSON** (say "JAY-son") stands for *JavaScript Object Notation*. It is a way of writing data as plain text that looks almost exactly like a JavaScript object or array:

```json
{
  "name": "Ayanda",
  "age": 17,
  "subjects": ["maths", "art"],
  "hasPaid": true
}
```

You can read that without any training. That is why JSON is everywhere: websites, phone apps, and servers all use it to send data to each other and to save it. Nearly every programming language can read and write it, not only JavaScript.

JSON is stricter than JavaScript, though:

- **Keys must be in double quotes**: `"name"`, not `name`.
- **Strings must use double quotes**: `"Ayanda"`, never `'Ayanda'`.
- **No trailing comma** after the last item.
- **No comments**, and **no functions**. Only data: strings, numbers, `true`/`false`, `null`, arrays and objects.

You will rarely write JSON by hand. JavaScript writes it for you.

### Object to text: `JSON.stringify`

`JSON.stringify(value)` takes an object or array and returns a string of JSON:

```js
const learner = { name: "Ayanda", age: 17, subjects: ["maths", "art"], hasPaid: true };

const text = JSON.stringify(learner);
console.log(text);
console.log(typeof text);
console.log(text.length);
```

Output:

```text
{"name":"Ayanda","age":17,"subjects":["maths","art"],"hasPaid":true}
string
68
```

It looks like an object, but `typeof` tells the truth: it is a **string**, 68 characters of text. That text can be saved to a file or sent over the internet. The name means "turn into a string".

All squashed onto one line is hard for people to read. Give `JSON.stringify` two extra arguments, `null, 2`, and it lays the text out neatly with 2 spaces of indentation:

```js
const learner = { name: "Ayanda", age: 17, subjects: ["maths", "art"], hasPaid: true };

console.log(JSON.stringify(learner, null, 2));
```

Output:

```text
{
  "name": "Ayanda",
  "age": 17,
  "subjects": [
    "maths",
    "art"
  ],
  "hasPaid": true
}
```

The `2` is the number of spaces to indent. The `null` fills a slot for an advanced option we do not need; treat `null, 2` as "make it pretty". We will always use it for files, so that you can open them and read them.

### Text to object: `JSON.parse`

`JSON.parse(text)` does the opposite. It reads a string of JSON and builds a real object (or array) from it:

```js
const text = '{"name":"Ayanda","age":17,"subjects":["maths","art"],"hasPaid":true}';

const learner = JSON.parse(text);
console.log(learner);
console.log(learner.subjects[1]);
console.log(typeof learner);
```

Output:

```text
{
  name: 'Ayanda',
  age: 17,
  subjects: [ 'maths', 'art' ],
  hasPaid: true
}
art
object
```

(The JSON is wrapped in single quotes here so that the double quotes inside it do not end the string early.)

After parsing, `learner` is a proper object again: you can use the dot, loop over it, push to its arrays. To **parse** means to read text and work out its structure.

So the two go in a circle:

```text
   object  --- JSON.stringify --->  text   (ready to save or send)
   object  <--- JSON.parse -------  text   (after loading or receiving)
```

::: predict What does this print?
```js
const text = JSON.stringify({ a: 1, b: [2, 3] });
console.log(text);
console.log(text.length);
console.log(text.a);
const back = JSON.parse(text);
console.log(back.a);
```
:::

::: solution
```text
{"a":1,"b":[2,3]}
17
undefined
1
```
`text` is a **string**, so `text.length` counts its characters (17), and `text.a` is `undefined`, because a string has no property called `a`. Only after `JSON.parse` is it an object again, so `back.a` is `1`. Mixing up "the JSON text" and "the object" is the most common JSON mistake, so keep asking yourself: do I have the string, or the object?
:::

::: note Two small things JSON leaves out
Functions and `undefined` values are left out:

```js
const thing = {
  name: "Timer",
  seconds: undefined,
  start: function () {
    console.log("tick");
  },
};
console.log(JSON.stringify(thing));
```

Output:

```text
{"name":"Timer"}
```

JSON is for **data** only. That is one reason Budget Buddy keeps its functions separate from its data.

And a bonus link to the last lesson: `JSON.parse(JSON.stringify(obj))` makes a brand-new copy of `obj`, **all the way down**, including nested objects. It is an old trick for a deep copy of plain data (it drops functions, as shown above).
:::

::: quiz
What does this print?

```js
const text = JSON.stringify({ qty: 2, price: "15" });
const order = JSON.parse(text);
console.log(order.qty + order.price, text.qty);
```

- [ ] `17 undefined`
- [ ] `215 2`
- [x] `215 undefined`
- [ ] `17 2`

JSON keeps each value's type: `2` goes in as a number and comes back as a number, and `"15"` goes in as a string and comes back as a string. So `2 + "15"` joins them into `"215"`. And `text` is a **string**, so `text.qty` is `undefined`: only the parsed `order` has a `qty`. If you picked `17`, you expected JSON to turn everything into numbers. It does not.
:::

## Files: the `fs` module

Node comes with a set of built-in tools for working with files, called **`fs`** (short for *file system*). You load it with `require`, the same way you load `prompt-sync`, but there is nothing to install: it is part of Node.

```js
const fs = require("fs");
```

After this line, `fs` is an object full of file methods. We need three of them.

### Writing a file: `fs.writeFileSync`

`fs.writeFileSync(fileName, text)` creates the file (or **replaces** it completely if it already exists) and writes the text into it:

```js
const fs = require("fs");

const shoppingList = ["maize meal", "tomatoes", "onions"];
const text = JSON.stringify(shoppingList, null, 2);

fs.writeFileSync("shopping.json", text);
console.log("Saved!");
```

Output:

```text
Saved!
```

The *Sync* at the end means "do it right now, and wait until it is finished before going to the next line". Node also has versions without *Sync* that work in the background, but those need ideas outside this course. The *Sync* versions are the right choice for small programs like ours.

### Where did the file go?

This trips up everyone. A file name like `"shopping.json"` is saved in the folder **your terminal is in** when you run the program, not the folder the `.js` file is in.

If you are inside `coding-practice` and run `node phase-6/write.js`, the file appears at `coding-practice/shopping.json`, **not** inside `phase-6`. That folder, the one your terminal is currently in, is called the **working directory**. Keep running your programs from the same folder and your files will always be where you expect.

### Reading a file: `fs.readFileSync`

`fs.readFileSync(fileName, "utf8")` reads the whole file and gives it back as a string. Then `JSON.parse` turns that string back into data:

```js
const fs = require("fs");

const text = fs.readFileSync("shopping.json", "utf8");
console.log(typeof text);

const shoppingList = JSON.parse(text);
console.log(shoppingList);
console.log(`First item: ${shoppingList[0]}`);
```

Output:

```text
string
[ 'maize meal', 'tomatoes', 'onions' ]
First item: maize meal
```

The `"utf8"` tells Node "this file is text, please give me a string". (UTF-8 is the standard way computers store text, including letters like é and emoji.) If you leave it out, you get raw bytes instead, which look like this:

```text
<Buffer 5b 0a 20 20 22 6d 61 69 7a 65 20 6d 65 61 6c 22 2c 0a 20 20 22 74 6f 6d 61 74 6f 65 73 22 2c 0a 20 20 22 6f 6e 69 6f 6e 73 22 0a 5d>
```

Always pass `"utf8"`.

### The first run: `fs.existsSync`

What if the file is not there yet? The very first time a program runs, nothing has been saved:

```js
const fs = require("fs");
const text = fs.readFileSync("notes.json", "utf8");
```

Output:

```text
Error: ENOENT: no such file or directory, open 'notes.json'
```

`ENOENT` is an old code meaning "Error: NO ENTry", in other words, no such file. To avoid it, check first. `fs.existsSync(fileName)` returns `true` if the file is there and `false` if not:

```js
const fs = require("fs");
console.log(fs.existsSync("shopping.json"));
console.log(fs.existsSync("notes.json"));
```

Output:

```text
true
false
```

::: try Write a file, then read it
1. In `coding-practice/phase-6`, create `write.js` with the "Writing a file" example above, and `read.js` with the "Reading a file" example.
2. From inside `coding-practice`, run:
   ```bash
   node phase-6/write.js
   ```
   You should see `Saved!`.
3. Look in the VS Code file explorer. A new file `shopping.json` has appeared in `coding-practice` (not in `phase-6`). Click it to open it. That is your array, stored as text.
4. Now run:
   ```bash
   node phase-6/read.js
   ```
   You should see the three lines shown above.
5. **Edit the data by hand:** in VS Code, change `"tomatoes"` in `shopping.json` to `"spinach"` and save the file. Run `read.js` again, without changing any code. The program reads whatever the file says. Data and code are now separate things.
6. You can also look at the file from the terminal:
   ```bash
   cat shopping.json
   ```
   On Windows in Command Prompt, use `type shopping.json` instead. (In PowerShell, `cat` works too.)
:::

::: quiz
You are inside `coding-practice`, and there is no `scores.json` anywhere yet. `phase-6/save.js` and `phase-6/check.js` contain:

```js
// save.js
const fs = require("fs");
fs.writeFileSync("scores.json", "[5, 9]");
```

```js
// check.js
const fs = require("fs");
console.log(fs.existsSync("scores.json"), fs.existsSync("phase-6/scores.json"));
```

You run these four commands in order. What does the last one print?

```bash
cd phase-6
node save.js
cd ..
node phase-6/check.js
```

- [ ] `true false`
- [ ] `true true`
- [x] `false true`
- [ ] `false false`

A file name like `"scores.json"` is saved in the folder your terminal is **in**, not the folder of the `.js` file. `save.js` ran while you were inside `phase-6`, so the file is `phase-6/scores.json`. `check.js` runs from `coding-practice`, where there is no `scores.json`, so the first check is `false` and the second is `true`. If you picked `true false`, you remembered the rule but mixed up which folder the terminal was in when you saved.
:::

## The pattern: load, change, save

Put the pieces together, and you get the pattern that every program with saved data follows:

1. **Load.** If the file exists, read it and parse it. If not, start with a sensible default.
2. **Change.** Do the program's work on ordinary objects and arrays.
3. **Save.** Stringify the data and write it back to the file.

Here is the forgetful visit counter from the start of the lesson, fixed:

```js
const fs = require("fs");

const FILE = "visits.json";

// 1. Load: use the saved data if there is any, otherwise start fresh
let data = { visits: 0 };
if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE, "utf8"));
}

// 2. Change it
data.visits = data.visits + 1;
console.log(`You have run this program ${data.visits} time(s).`);

// 3. Save it
fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
```

Run it three times:

```text
You have run this program 1 time(s).
You have run this program 2 time(s).
You have run this program 3 time(s).
```

And `visits.json` now contains:

```json
{
  "visits": 3
}
```

The program finally remembers. Notice `FILE` in capitals: a common way to name a **constant** setting that never changes while the program runs, so it stands out. If you ever want to rename the file, you change it in one place.

::: try A program that remembers
1. Create `phase-6/visits.js` with the code above.
2. Run `node phase-6/visits.js` three times, from inside `coding-practice`. Watch the number climb.
3. Open `visits.json` in VS Code and keep it open. Run the program again and watch the number in the editor change by itself. (VS Code notices when a file changes on disk. If it does not update, click on the file's tab.)
4. **Change the data by hand:** set `"visits"` to `99` in VS Code, save, and run the program. Predict what it prints first.
5. **Start fresh:** delete the file, then run the program again. It should say `1` again, because `fs.existsSync` is `false` and the default is used.
   - macOS and Linux: `rm visits.json`
   - Windows (Command Prompt): `del visits.json` (in PowerShell, `rm` or `del` both work)
   - Or right-click the file in VS Code's explorer and choose **Delete**.
:::

The same pattern, tidied into two functions and used with user input. Each run shows your notes and lets you add one:

```js
const prompt = require("prompt-sync")();
const fs = require("fs");

const FILE = "notes.json";

function loadNotes() {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveNotes(notes) {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

const notes = loadNotes();
console.log(`You have ${notes.length} note(s):`);
for (let i = 0; i < notes.length; i++) {
  console.log(`  ${i + 1}. ${notes[i]}`);
}

const newNote = prompt("New note (or press Enter to skip): ").trim();
if (newNote !== "") {
  notes.push(newNote);
  saveNotes(notes);
  console.log("Saved.");
}
```

Three runs:

```text
You have 0 note(s):
New note (or press Enter to skip): Buy airtime
Saved.
```

```text
You have 1 note(s):
  1. Buy airtime
New note (or press Enter to skip): Call Gogo on Sunday
Saved.
```

```text
You have 2 note(s):
  1. Buy airtime
  2. Call Gogo on Sunday
New note (or press Enter to skip): 
```

`loadNotes` and `saveNotes` are worth copying into your own programs. Budget Buddy v6 uses exactly this shape, with `loadBudget` and `saveBudget`.

::: quiz
`tally.json` does not exist yet. You run this program **three times**. What does the third run print?

```js
const fs = require("fs");
const FILE = "tally.json";

let data = { count: 10 };
if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE, "utf8"));
}
data.count = data.count * 2;
fs.writeFileSync(FILE, JSON.stringify(data));
console.log(data.count);
```

- [ ] `20`
- [ ] `60`
- [ ] `40`
- [x] `80`

Run 1: no file, so the default `10` is used, doubled to `20`, and saved. Run 2: the file exists, so it loads `20`, doubles to `40`, saves. Run 3: loads `40`, prints `80`. The default is only used once. If you picked `20`, you forgot that each run starts from what the last run saved. If you picked `60`, you added 20 each time instead of doubling what was loaded.
:::

## When the file is broken

Because JSON files are plain text, anyone can edit them, and that includes making mistakes. Open `visits.json`, add a comma after the number so it looks like this, and save:

```json
{
  "visits": 3,
}
```

Now run `node phase-6/visits.js`:

```text
SyntaxError: Expected double-quoted property name in JSON at position 17 (line 3 column 1)
```

The trailing comma made it invalid JSON (JavaScript allows it, JSON does not), so `JSON.parse` gave up and the whole program crashed. Read the message: after the comma, JSON expected another `"key"`, but on line 3, column 1 it found `}` instead. Other broken files give similar messages, for example `Unexpected end of JSON input` for an empty or half-written file.

For your own practice files, the fix is to correct the JSON (or delete the file and start fresh). But a program that crashes whenever its file is damaged is not very friendly. JavaScript has a tool for this called **`try`/`catch`**: "**try** to run this code, and if it throws an error, **catch** the error and run this other code instead of crashing". A full treatment is beyond this course, so treat this as a pattern to copy:

```js
const fs = require("fs");

const FILE = "visits.json";

let data = { visits: 0 };
if (fs.existsSync(FILE)) {
  try {
    data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch (error) {
    console.log(`Warning: ${FILE} could not be read, so starting fresh.`);
    console.log(`(The problem was: ${error.message})`);
  }
}

data.visits = data.visits + 1;
console.log(`You have run this program ${data.visits} time(s).`);

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
```

With the broken file, the first run prints:

```text
Warning: visits.json could not be read, so starting fresh.
(The problem was: Expected double-quoted property name in JSON at position 17 (line 3 column 1))
You have run this program 1 time(s).
```

and the next run is back to normal:

```text
You have run this program 2 time(s).
```

How to read it:

- The code inside `try { }` runs as normal.
- If anything in it throws an error, JavaScript jumps straight into `catch (error) { }` instead of crashing. `error.message` is the error's text.
- If nothing goes wrong, the `catch` part is skipped completely.

Here, the default `{ visits: 0 }` is still in `data` because the parse failed, so the program carries on from zero. Be aware of what that means: the next save **overwrites** the broken file, so whatever was in it is lost. For a visit counter that is fine. For something precious, a real program would first make a backup copy of the broken file. Wrap only the load in the safety net, and only where a broken file is a real possibility.

::: exercise Level 1 — Guided · Save a profile, load it back
1. Create `phase-6/save-profile.js`:
   - `require` the `fs` module.
   - Make an object `profile` with a `name`, a `city`, and an array `favouriteSports`.
   - Write it to `profile.json` using `JSON.stringify(profile, null, 2)` and `fs.writeFileSync`.
   - Print `Profile saved to profile.json`.
2. Run it, then open `profile.json` in VS Code and look at it.
3. Create a **second** file, `phase-6/load-profile.js`, which reads `profile.json`, parses it, and prints `Kwame lives in Polokwane.` and `Favourite sports: soccer, cricket` (with your own values). Use `.join(", ")` for the sports.
4. Run `load-profile.js`. Then change the city in `profile.json` by hand, save, and run `load-profile.js` again. It shows the new city, and you did not touch any code.
:::

::: solution
`save-profile.js`:
```js
const fs = require("fs");

const profile = {
  name: "Kwame",
  city: "Polokwane",
  favouriteSports: ["soccer", "cricket"],
};

fs.writeFileSync("profile.json", JSON.stringify(profile, null, 2));
console.log("Profile saved to profile.json");
```

`load-profile.js`:
```js
const fs = require("fs");

const text = fs.readFileSync("profile.json", "utf8");
const profile = JSON.parse(text);

console.log(`${profile.name} lives in ${profile.city}.`);
console.log(`Favourite sports: ${profile.favouriteSports.join(", ")}`);
```
Output of `load-profile.js`:
```text
Kwame lives in Polokwane.
Favourite sports: soccer, cricket
```
After changing the city to Thohoyandou in the file:
```text
Kwame lives in Thohoyandou.
Favourite sports: soccer, cricket
```
Two separate programs shared data through a file. That is how much bigger systems work too.
:::

::: exercise Level 2 — On your own · A taxi fare tracker
Create `phase-6/fares.js`. Each time it runs, it should:

- load a list of trips from `fares.json` (or start with an empty list if there is no file yet),
- ask `Where did you go?` and `Fare: R`,
- add a new trip **object** `{ route, fare }` to the list, with the fare as a number,
- save the whole list back to `fares.json`,
- print how many trips there are and the total spent, like `Saved. 2 trip(s), R28.50 in total.`

Use a `loadTrips()` function, a `saveTrips(trips)` function, and a `totalFares(trips)` function with a loop. Run it at least three times, then open `fares.json` to check it.
:::

::: hint
Follow the shape of `loadNotes`/`saveNotes` from the notes program. The difference is that each item in the list is an object instead of a string, so `totalFares` uses the accumulator pattern with `trip.fare`, as in [Lists of objects](#/phase-06-objects/02-arrays-of-objects).
:::

::: solution
```js
const prompt = require("prompt-sync")();
const fs = require("fs");

const FILE = "fares.json";

function loadTrips() {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveTrips(trips) {
  fs.writeFileSync(FILE, JSON.stringify(trips, null, 2));
}

function totalFares(trips) {
  let total = 0;
  for (const trip of trips) {
    total += trip.fare;
  }
  return total;
}

const trips = loadTrips();

const route = prompt("Where did you go? ").trim();
const fare = Number(prompt("Fare: R"));
trips.push({ route: route, fare: fare });
saveTrips(trips);

console.log(`Saved. ${trips.length} trip(s), R${totalFares(trips).toFixed(2)} in total.`);
```
Two runs:
```text
Where did you go? Home to town
Fare: R16
Saved. 1 trip(s), R16.00 in total.
```
```text
Where did you go? Town to Mall
Fare: R12.5
Saved. 2 trip(s), R28.50 in total.
```
And `fares.json`:
```json
[
  {
    "route": "Home to town",
    "fare": 16
  },
  {
    "route": "Town to Mall",
    "fare": 12.5
  }
]
```
Notice the fares are saved as numbers (no quotes), because we converted them with `Number` before saving. If you forget, they are saved as strings and your total goes wrong the next time.
:::

::: debug Three programs that forget, crash or confuse
Run each program **twice** (delete any `.json` files first so you start clean). Explain what goes wrong, then fix it.

```js
// Program A
const fs = require("fs");

let settings = { theme: "light" };
if (fs.existsSync("settings.json")) {
  settings = JSON.parse(fs.readFileSync("settings.json", "utf8"));
}
settings.theme = "dark";
fs.writeFileSync("settings.json", settings);
console.log("Saved settings.");
```

```js
// Program B
const fs = require("fs");

const scores = JSON.parse(fs.readFileSync("scores.json", "utf8"));
scores.push(42);
fs.writeFileSync("scores.json", JSON.stringify(scores));
console.log(scores);
```

```js
// Program C
const fs = require("fs");

let counter = { count: 0 };
if (fs.existsSync("counter.json")) {
  counter = fs.readFileSync("counter.json", "utf8");
}
counter.count = counter.count + 1;
console.log(`Count: ${counter.count}`);
fs.writeFileSync("counter.json", JSON.stringify(counter));
```
:::

::: solution
**A** crashes with `TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Object`. A long message, but the end says it plainly: it wanted a string and received an object. `writeFileSync` only writes text. Fix: `fs.writeFileSync("settings.json", JSON.stringify(settings, null, 2));`.

**B** crashes on the very first run with `Error: ENOENT: no such file or directory, open 'scores.json'`. It reads the file without checking that it exists. Fix: start with a default and only read if `fs.existsSync("scores.json")` is `true`:
```js
let scores = [];
if (fs.existsSync("scores.json")) {
  scores = JSON.parse(fs.readFileSync("scores.json", "utf8"));
}
```

**C** is the sneaky one. The first run prints `Count: 1`, and the second prints `Count: undefined`. On the second run, the file exists, so `counter` becomes the **text** read from the file, not an object. A string has no `count` property, so `counter.count` is `undefined`. It then saves that string wrapped in yet another layer of quotes. Fix: parse it: `counter = JSON.parse(fs.readFileSync("counter.json", "utf8"));`. Delete `counter.json` after fixing, because the broken run saved bad data into it.
:::

::: mistake
**Writing an object instead of JSON text.** `fs.writeFileSync(file, data)` needs a string. Always `JSON.stringify` first.

**Forgetting to `JSON.parse` after reading.** `readFileSync` gives you text. Until you parse it, `.length` counts characters and properties are `undefined`.

**Reading before checking the file exists.** The first run always has no file. Use `fs.existsSync` and a default.

**Leaving out `"utf8"`.** You get a `Buffer` of raw bytes instead of text.

**Looking for the file in the wrong folder.** Files are saved in the folder your terminal is in when you run `node`, not next to the `.js` file.

**Hand-editing JSON like JavaScript.** Single quotes, unquoted keys, trailing commas and comments are all fine in JavaScript and all **broken** in JSON.
:::

::: quiz
`tally.json` exists and contains exactly this text: `{ count: 5 }`. What does the program print?

```js
const fs = require("fs");
const FILE = "tally.json";

let data = { count: 1 };
if (fs.existsSync(FILE)) {
  try {
    data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    data.count = data.count + 100;
  } catch (error) {
    data.count = data.count + 10;
  }
}
data.count = data.count * 2;
console.log(data.count);
```

- [x] `22`
- [ ] `210`
- [ ] `30`
- [ ] `SyntaxError`, and the program stops

`count` has no double quotes around it, so this is not valid JSON and `JSON.parse` throws. JavaScript jumps straight to `catch`, skipping the `+ 100` line, and `data` is still the default `{ count: 1 }`. So `1 + 10 = 11`, then `11 * 2 = 22`. If you picked `210`, you missed that the file is broken. If you picked `30`, you thought the `5` was loaded before the error. The `try`/`catch` is what stops the crash.
:::

## Real-world uses

- **Settings files.** VS Code stores your settings in a JSON file called `settings.json`. Your own `coding-practice/package.json` is JSON too: open it and look.
- **Save games.** Many games save your progress as JSON (or something very like it): level, inventory, position.
- **Talking to servers.** When a weather app asks for the forecast, the reply is JSON text, which the app turns into objects with the equivalent of `JSON.parse`. When you post a message, your app turns it into JSON with the equivalent of `JSON.stringify` and sends it.
- **Small apps and tools.** Plenty of real command-line tools, scripts and prototypes keep their data in a JSON file, exactly like Budget Buddy is about to. Larger apps use a **database**, which is the same idea with more power.

::: connect
**This builds on:** [objects](#/phase-06-objects/01-what-is-an-object) and [lists of objects](#/phase-06-objects/02-arrays-of-objects) (JSON is those, as text), `require` from [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user), and functions that load and return data.

**This unlocks:** next, [Budget Buddy v6](#/phase-06-objects/06-project-budget-buddy-v6) finally remembers your expenses between runs. In Phase 8, [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files) explains `require` fully, and Budget Buddy's saving code moves into its own `storage.js` file.
:::

::: challenge A high-score board
Write `phase-6/scores.js`. It keeps a list of scores in `scores.json`, as objects like `{ name: "Lindiwe", score: 340 }`. Each run:

1. Loads the list (or starts empty).
2. Asks for a name and a score, and adds them.
3. Saves the list.
4. Prints the **best** score so far and who got it (use the "keep the whole best object" pattern).
5. Bonus: add the `try`/`catch` safety net around the load, then break `scores.json` on purpose and check that the program warns you instead of crashing.
:::

::: solution
```js
const prompt = require("prompt-sync")();
const fs = require("fs");

const FILE = "scores.json";

function loadScores() {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch (error) {
    console.log(`Warning: ${FILE} is damaged, so starting a new list.`);
    return [];
  }
}

function saveScores(scores) {
  fs.writeFileSync(FILE, JSON.stringify(scores, null, 2));
}

function bestOf(scores) {
  let best = scores[0];
  for (const entry of scores) {
    if (entry.score > best.score) {
      best = entry;
    }
  }
  return best;
}

const scores = loadScores();

const name = prompt("Name: ").trim();
const score = Number(prompt("Score: "));
scores.push({ name: name, score: score });
saveScores(scores);

const best = bestOf(scores);
console.log(`High score: ${best.name} with ${best.score}`);
```
Three runs:
```text
Name: Lindiwe
Score: 340
High score: Lindiwe with 340
```
```text
Name: Tariq
Score: 520
High score: Tariq with 520
```
```text
Name: Hannah
Score: 410
High score: Tariq with 520
```
`bestOf` is only called after a score has been pushed, so the list is never empty there and `scores[0]` always exists.
:::

::: recap
- Variables live in memory and vanish when the program ends. To remember between runs, save to a **file**.
- **JSON** is a text format for data that looks like JavaScript objects and arrays, but with double-quoted keys and strings, no trailing commas, no comments and no functions.
- `JSON.stringify(data, null, 2)` turns data into neat JSON text. `JSON.parse(text)` turns JSON text back into data.
- `const fs = require("fs");` loads Node's built-in file tools. `fs.writeFileSync(file, text)` saves, `fs.readFileSync(file, "utf8")` loads, and `fs.existsSync(file)` checks for the first run.
- Files are saved in the **working directory**, the folder your terminal is in.
- The pattern: **load** (or use a default), **change**, **save**.
- `try { ... } catch (error) { ... }` is a safety net that stops a broken file from crashing the program.
:::

::: interview What is the difference between `JSON.stringify` and `JSON.parse`?
`JSON.stringify` takes an object or array and returns a string of JSON text, ready to save or send. `JSON.parse` takes a string of JSON text and returns a real object or array you can work with. They are opposites.
:::

::: interview Why do we need `fs.existsSync` before reading a saved file?
The first time the program runs, nothing has been saved yet, so the file does not exist and `fs.readFileSync` would crash with an `ENOENT` error. Checking first lets the program fall back to a sensible default, such as an empty list.
:::

::: interview Name two things that are valid in a JavaScript object but not in JSON.
Any two of: keys without quotes (`name: "Ayanda"`), single-quoted strings (`'Ayanda'`), a trailing comma after the last property, comments, functions, and `undefined` values.
:::

::: checkpoint
- [ ] I ran the forgetful counter and saw it reset every time
- [ ] I wrote `shopping.json`, found it in the right folder, and edited it by hand in VS Code
- [ ] I ran `visits.js` several times, watched the file change in VS Code, and deleted it to start fresh
- [ ] I broke a JSON file on purpose, read the error, and then tried the `try`/`catch` safety net
- [ ] I finished the taxi fare tracker and it remembers trips between runs
- [ ] I fixed all three programs in "Debug this"
:::

::: resources
- **javascript.info, "JSON methods, toJSON":** https://javascript.info/json. Everything about `JSON.stringify` and `JSON.parse`. The first half is plenty.
- **MDN, "Working with JSON":** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON. A beginner guide to what JSON is and why it is everywhere.
- **javascript.info, "Error handling, try...catch":** https://javascript.info/try-catch. For when you want to understand the safety net properly. Optional.
:::
