---
title: Changing arrays — add, remove, replace and search
summary: Lists in real programs grow and shrink. Here is how to add to the ends, take from the ends, search, and remove from the middle.
minutes: 45
stage: Phase 5
---

## What you will learn

- How to replace an item by its index
- How to add and remove items at the end (`push`, `pop`) and at the start (`unshift`, `shift`)
- How to search a list (`includes`, `indexOf`) and remove an item from the middle (`splice`)
- Why a `const` array can still change, and a first glimpse of something Phase 6 explains properly

**Before this:** [Arrays: storing a list of values](#/phase-05-arrays/01-what-is-an-array).

## The problem: real lists change

In the last lesson every array was typed out in full, and then only read. Real lists are not like that:

- A **shopping list** grows as you remember things, and shrinks as you put things in the trolley.
- A **queue at the bank** gets new people joining at the back, while the person at the front is served and leaves.
- The **undo button** in a word processor remembers every change you make, and takes back the most recent one when you press it.
- In **Budget Buddy**, the user adds expenses one by one while the program runs. You cannot type them into the code in advance.

So we need ways to change a list after it has been made: add things, take things away, swap things, and find things. JavaScript arrays come with a set of built-in tools for this.

::: analogy A stack of plates and a queue of people
Two everyday pictures cover most of this lesson.

**A stack of clean plates.** You put a new plate on **top**. When you need one, you take it from the **top**. The last plate you put down is the first one you pick up. That is `push` (put on the end) and `pop` (take off the end).

**A queue at the bank.** New people join at the **back**. The teller serves whoever is at the **front**, and they leave. The first person to arrive is the first to be served. That is `push` (join at the back) and `shift` (leave from the front).

The "end" of an array is the high-numbered side, the last index. The "start" is index 0.
:::

## Replacing an item by index

You already know how to *read* `arr[1]`. You can also *write* to it, with `=`, exactly like a variable:

```js
const shopping = ["bread", "milk", "eggs"];
shopping[1] = "maas";
console.log(shopping);
```

Output:

```text
[ 'bread', 'maas', 'eggs' ]
```

Read `shopping[1] = "maas"` right to left, like any assignment: "put `"maas"` into locker 1 of `shopping`". The old `"milk"` is gone.

## Adding and removing at the end: `push` and `pop`

`push` adds one or more items to the **end** of the array:

```js
const shopping = ["bread", "maas", "eggs"];

shopping.push("tomatoes");
console.log(shopping);

shopping.push("onions", "rice");
console.log(shopping);
console.log(shopping.length);
```

Output:

```text
[ 'bread', 'maas', 'eggs', 'tomatoes' ]
[ 'bread', 'maas', 'eggs', 'tomatoes', 'onions', 'rice' ]
6
```

`pop` removes the **last** item, and hands it back to you, so you can keep it in a variable if you want to:

```js
const last = shopping.pop();
console.log(last);
console.log(shopping);
```

Output:

```text
rice
[ 'bread', 'maas', 'eggs', 'tomatoes', 'onions' ]
```

Notice the brackets: `push(...)` and `pop()`. These are functions that belong to the array. A function that belongs to a value like this is called a **method**, and you call it with a dot, the way you have been calling `"hello".toUpperCase()` since [Strings](#/phase-01-storing-information/05-strings). Most array methods **change the array itself**, which is new: string methods never changed the original string.

`push` also hands something back: the new length. You rarely need it, but now you know why it exists:

```js
const newLength = shopping.push("mielie meal");
console.log(newLength);
```

Output:

```text
6
```

::: try The undo button
1. In `coding-practice`, create `phase-5/undo.js`.
2. Type this in yourself:
   ```js
   const history = [];

   history.push("Typed: Dear Mr Nkosi");
   history.push("Made it bold");
   history.push("Deleted a line by accident");
   console.log("History:", history);

   const undone = history.pop();
   console.log("Undid:", undone);
   console.log("History:", history);
   console.log("Steps left to undo:", history.length);
   ```
3. Run it from inside `coding-practice`:
   ```bash
   node phase-5/undo.js
   ```
4. You should see:
   ```text
   History: [
     'Typed: Dear Mr Nkosi',
     'Made it bold',
     'Deleted a line by accident'
   ]
   Undid: Deleted a line by accident
   History: [ 'Typed: Dear Mr Nkosi', 'Made it bold' ]
   Steps left to undo: 2
   ```
   (The first array was long, so Node printed it over several lines.)
5. **Now experiment.** Add a second `history.pop()` before the last line. Predict what "Steps left to undo" will show, then run it. What do you think `pop` gives back if you keep popping after the array is empty? Try it.
:::

That last question has a gentle answer: popping an empty array does not crash. It gives `undefined`, because there was nothing to hand back.

::: quiz
What does this program print?

```js
const tray = ["pie"];
const a = tray.push("scone", "muffin");
const b = tray.pop();
console.log(a, b, tray.length);
```

- [ ] `2 muffin 2`
- [x] `3 muffin 2`
- [ ] `3 muffin 3`
- [ ] `undefined muffin 2`

`push` hands back the **new length**. After adding two items to a one-item tray, that is 3, so `a` is 3. `pop` removes the last item and hands it back, so `b` is `"muffin"`, and the tray now has 2 items. If you picked `2 muffin 2`, you thought `push` returns how many items were added. If you picked `3 muffin 3`, you forgot that `pop` really removes the item.
:::

## Adding and removing at the start: `unshift` and `shift`

`shift` removes the **first** item (index 0) and hands it back. Everything else moves up one place, so the old index 1 becomes the new index 0. `unshift` does the opposite: it adds an item at the **front**, and everything else moves back one place.

Here is the bank queue:

```js
const queue = ["Naledi", "Johan", "Priya"];

queue.push("Kwame");          // Kwame joins at the back
console.log(queue);

const next = queue.shift();   // the person at the front is served
console.log(`Now serving: ${next}`);
console.log(queue);

queue.unshift("Gogo Dlamini"); // a pensioner is let in at the front
console.log(queue);
```

Output:

```text
[ 'Naledi', 'Johan', 'Priya', 'Kwame' ]
Now serving: Naledi
[ 'Johan', 'Priya', 'Kwame' ]
[ 'Gogo Dlamini', 'Johan', 'Priya', 'Kwame' ]
```

A quick summary so far:

| Method | Where | What it does | What it hands back |
|---|---|---|---|
| `push(x)` | end | adds `x` | the new length |
| `pop()` | end | removes the last item | the removed item |
| `unshift(x)` | start | adds `x` | the new length |
| `shift()` | start | removes the first item | the removed item |

The names `shift` and `unshift` are odd, and nobody finds them memorable. One trick: `shift` makes everyone *shift* up the queue. `unshift` undoes that.

::: predict What does this print?
```js
const stack = ["plate A", "plate B"];
stack.push("plate C");
stack.unshift("plate Z");
const top = stack.pop();
const bottom = stack.shift();
console.log(top);
console.log(bottom);
console.log(stack);
console.log(stack.length);
```
Draw the array on paper after every line. That is how professionals do it too.
:::

::: solution
```text
plate C
plate Z
[ 'plate A', 'plate B' ]
2
```
Step by step:

| After line | `stack` |
|---|---|
| 1 | `["plate A", "plate B"]` |
| 2 `push` | `["plate A", "plate B", "plate C"]` |
| 3 `unshift` | `["plate Z", "plate A", "plate B", "plate C"]` |
| 4 `pop` | `["plate Z", "plate A", "plate B"]`, and `top` is `"plate C"` |
| 5 `shift` | `["plate A", "plate B"]`, and `bottom` is `"plate Z"` |

We added two and removed two, so we are back where we started.
:::

::: quiz
What does this program print?

```js
const line = ["Ama", "Bongi", "Chris"];
line.unshift(line.pop());
console.log(line[0], line.length);
```

- [ ] `Ama 3`
- [ ] `Chris 4`
- [ ] `Bongi 2`
- [x] `Chris 3`

Work from the inside out. `line.pop()` removes `"Chris"` from the end and hands it back. Then `unshift` puts that same `"Chris"` at the front. One item out, one item in: the length is still 3, and `"Chris"` is at index 0. If you picked `Chris 4`, you forgot that `pop` removed him before he was added back.
:::

## Searching: `includes` and `indexOf`

Often you need to ask "is this on the list?" or "where on the list is it?".

`includes` answers yes or no, as a boolean:

```js
const guests = ["Zanele", "Tom", "Fatima", "Bongani"];

console.log(guests.includes("Fatima"));
console.log(guests.includes("fatima"));
```

Output:

```text
true
false
```

The search is exact, so capitals matter: `"fatima"` is not `"Fatima"`. (You used `includes` on strings in Phase 1. Same name, same idea: "does this contain…?")

`indexOf` answers "where is it?". It gives back the index of the first match. If the item is not there at all, it gives back **`-1`**:

```js
console.log(guests.indexOf("Fatima"));
console.log(guests.indexOf("Sam"));
```

Output:

```text
2
-1
```

Why `-1`? Because every real index is 0 or more, so `-1` can never be mistaken for a real position. It is the array's way of saying "not found". You will check for it all the time:

```js
if (guests.indexOf("Sam") === -1) {
  console.log("Sam is not on the guest list.");
}
```

::: note Which one should I use?
If you only need yes or no, use `includes`. It reads like English: `if (guests.includes(name))`. Use `indexOf` when you need the **position**, usually because you want to change or remove that item next.
:::

::: quiz
What does this program print?

```js
const codes = ["ZA", "BW", "NA", "BW"];
console.log(codes.indexOf("BW") + codes.indexOf("LS"));
console.log(codes.includes("na"));
```

- [x] `0`, then `false`
- [ ] `2`, then `false`
- [ ] `1`, then `false`
- [ ] `0`, then `true`

`indexOf` gives the index of the **first** match, so `"BW"` gives 1. `"LS"` is not there, so it gives -1. `1 + -1` is 0. `includes` is exact, and `"na"` is not `"NA"`, so it is `false`. If you picked `1`, you treated "not found" as 0; it is -1. If you picked `2`, you used the last `"BW"` (index 3).
:::

## Removing from the middle: `splice`

`pop` and `shift` only work at the ends. To remove an item from anywhere, use `splice(start, howMany)`:

```js
const chores = ["dishes", "laundry", "sweep", "take out bins"];

const removed = chores.splice(1, 1);
console.log(removed);
console.log(chores);
```

Output:

```text
[ 'laundry' ]
[ 'dishes', 'sweep', 'take out bins' ]
```

`chores.splice(1, 1)` means "starting at index 1, remove 1 item". The items after it close the gap and move up.

Two things to notice:

- `splice` hands back the removed items **in an array**, even when there is only one. That is why `removed` prints with brackets. To get the item itself, use `removed[0]`. You will use exactly this in Budget Buddy.
- The second number is how many to remove. `chores.splice(0, 2)` would remove the first two.

(`splice` can also insert items, but removing is by far the most common use, and all you need for now.)

**Find, then remove.** A very common two-step: use `indexOf` to find where something is, then `splice` to remove it. But always check for `-1` in between:

```js
const list = ["a", "b", "c"];
const position = list.indexOf("b");

if (position !== -1) {
  list.splice(position, 1);
}
console.log(list);
```

Output:

```text
[ 'a', 'c' ]
```

The debug exercise below shows what goes wrong if you skip that check.

::: try A shopping list you can change
Now you have enough to make a small but real program. It uses a menu loop, like the ones from [Phase 3](#/phase-03-loops/05-break-continue-nested), and an array that grows and shrinks while it runs.

1. Create `phase-5/shopping.js` and type this in:
   ```js
   const prompt = require("prompt-sync")();

   const shopping = [];
   let running = true;

   while (running) {
     const choice = prompt("(a)dd, (r)emove, (s)how or (q)uit? ").trim().toLowerCase();

     if (choice === "a") {
       const item = prompt("Item to add: ").trim().toLowerCase();
       if (shopping.includes(item)) {
         console.log(`  ${item} is already on the list.`);
       } else {
         shopping.push(item);
         console.log(`  Added ${item}. ${shopping.length} item(s) on the list.`);
       }
     } else if (choice === "r") {
       const item = prompt("Item to remove: ").trim().toLowerCase();
       const index = shopping.indexOf(item);
       if (index === -1) {
         console.log(`  ${item} is not on the list.`);
       } else {
         shopping.splice(index, 1);
         console.log(`  Removed ${item}.`);
       }
     } else if (choice === "s") {
       console.log(shopping);
     } else if (choice === "q") {
       running = false;
     } else {
       console.log("  Please type a, r, s or q.");
     }
   }

   console.log("Final list:", shopping);
   ```
2. Run it with `node phase-5/shopping.js` and try this session (your typing is after each `?` or `:`):
   ```text
   (a)dd, (r)emove, (s)how or (q)uit? a
   Item to add: Bread
     Added bread. 1 item(s) on the list.
   (a)dd, (r)emove, (s)how or (q)uit? a
   Item to add: milk
     Added milk. 2 item(s) on the list.
   (a)dd, (r)emove, (s)how or (q)uit? a
   Item to add: bread
     bread is already on the list.
   (a)dd, (r)emove, (s)how or (q)uit? r
   Item to remove: cheese
     cheese is not on the list.
   (a)dd, (r)emove, (s)how or (q)uit? r
   Item to remove: milk
     Removed milk.
   (a)dd, (r)emove, (s)how or (q)uit? a
   Item to add: rooibos
     Added rooibos. 2 item(s) on the list.
   (a)dd, (r)emove, (s)how or (q)uit? s
   [ 'bread', 'rooibos' ]
   (a)dd, (r)emove, (s)how or (q)uit? q
   Final list: [ 'bread', 'rooibos' ]
   ```
3. **Now experiment.** Why did `Bread` and `bread` count as the same item? Find the part of the code responsible. Remove `.toLowerCase()` from the "Item to add" line only, predict what happens when you add `Bread` then `bread`, and run it.
:::

::: quiz
What does this program print?

```js
const seats = ["A1", "A2", "A3", "A4", "A5"];
const taken = seats.splice(1, 2);
console.log(taken.length, seats[1]);
```

- [ ] `1 A3`
- [ ] `2 A2`
- [x] `2 A4`
- [ ] `2 A3`

`splice(1, 2)` means "starting at index 1, remove 2 items": `"A2"` and `"A3"`. They come back in an array, so `taken.length` is 2. The rest close the gap, so `seats` is now `["A1", "A4", "A5"]`, and index 1 is `"A4"`. If you picked `1 A3`, you read the second number as "stop at index 2". It is how many to remove.
:::

## A `const` array can still change

You may have noticed something odd. Every array in this lesson was made with `const`, and yet we changed them all the time. Doesn't `const` mean "cannot change"?

Here is the precise rule: **`const` means the name can never be pointed at a different array.** It does not freeze what is *inside* the array.

```js
const basket = ["apples"];
basket.push("pears");       // fine: changing what is inside
console.log(basket);

basket = ["bananas"];       // not fine: swapping for a different array
```

Output:

```text
[ 'apples', 'pears' ]
TypeError: Assignment to constant variable.
```

Node points at the line `basket = ["bananas"];`, the only line that tries to give the name `basket` a whole new array.

::: analogy A box glued to its label
Think of `const basket` as a shopping basket with your name on a tag that is **glued** to the handle. You cannot swap it for a different basket; the tag will not come off. But you can put things in, and take things out, as much as you like. It is still the same basket.

`let` would be a tag you can move to a different basket.
:::

Most programmers use `const` for arrays, because they want the same list for the whole program, even though its contents change. You will see that in Budget Buddy: `const expenses = [];`, and then `push` and `splice` for the rest of the program.

::: warn A preview of something surprising
Arrays behave differently from numbers and strings in one important way. Look at this:

```js
const myList = ["tea", "sugar"];
const sharedList = myList;
sharedList.push("rusks");
console.log(myList);
```

Output:

```text
[ 'tea', 'sugar', 'rusks' ]
```

We pushed onto `sharedList`, yet `myList` changed too. That is because `const sharedList = myList` does **not** make a copy. It gives the **same** list a second name, like two name tags on one basket. With numbers, `let b = a` makes a copy (you saw that in [Variables](#/phase-01-storing-information/02-variables)). With arrays, it does not.

This catches everyone out at some point. Phase 6 explains why, and how to make a real copy, in [Copies and references](#/phase-06-objects/04-values-and-references). For now, remember: **giving an array a second name does not copy it.**
:::

::: exercise Level 1 — Guided · The bank queue
Create `phase-5/queue.js`.

1. Make `const queue` holding `"Naledi"`, `"Johan"` and `"Priya"`.
2. `"Kwame"` arrives. Add him to the **back** of the queue.
3. The teller serves the person at the **front**. Remove them with the right method and store them in `const next`.
4. Print `Now serving:` followed by `next`.
5. A pensioner, `"Gogo Dlamini"`, is invited to the **front**. Add her there.
6. Print the whole queue, and then `People waiting:` and how many are in it.
7. Run it. You should end with 4 people waiting and Gogo Dlamini at the front.
:::

::: solution
```js
const queue = ["Naledi", "Johan", "Priya"];

queue.push("Kwame");
const next = queue.shift();
console.log("Now serving:", next);

queue.unshift("Gogo Dlamini");
console.log(queue);
console.log("People waiting:", queue.length);
```
Output:
```text
Now serving: Naledi
[ 'Gogo Dlamini', 'Johan', 'Priya', 'Kwame' ]
People waiting: 4
```
:::

::: exercise Level 2 — On your own · Recently played
Music apps show your "recently played" songs, but only the last few. Create `phase-5/recent.js`.

Write a function `played(song)` that adds `song` to a `recent` array (made outside the function), but keeps **at most 3** songs: when a fourth is added, the oldest one is dropped. The function should then print the array. Call it five times with different songs.

Expected output (with these songs):

```text
[ 'Mnike' ]
[ 'Mnike', 'Water' ]
[ 'Mnike', 'Water', 'Pata Pata' ]
[ 'Water', 'Pata Pata', 'Umlando' ]
[ 'Pata Pata', 'Umlando', 'Jerusalema' ]
```
:::

::: hint
The newest songs go on the end with `push`. That means the oldest song is always at the **start**. After pushing, check the length with an `if`. Which method removes from the start?
:::

::: solution
```js
const recent = [];
const maxRecent = 3;

function played(song) {
  recent.push(song);
  if (recent.length > maxRecent) {
    recent.shift();
  }
  console.log(recent);
}

played("Mnike");
played("Water");
played("Pata Pata");
played("Umlando");
played("Jerusalema");
```
The function can use `recent` because it was made outside, in the "house" the function can see (remember [Scope](#/phase-04-functions/04-scope)). Putting the limit in `maxRecent` means you can change it to 5 in one place.
:::

::: debug The wrong song disappears
This program should remove `"Jerusalema"` from the playlist, if it is there. But `"Jerusalema"` is not on the list at all, and a different song vanishes. Run it and see:

```js
const playlist = ["Mnike", "Water", "Pata Pata", "Umlando"];
const toRemove = "Jerusalema";

const index = playlist.indexOf(toRemove);
playlist.splice(index, 1);

console.log(playlist);
```

Output:

```text
[ 'Mnike', 'Water', 'Pata Pata' ]
```

Why did `"Umlando"` disappear? Fix it so that nothing is removed when the song is not on the list.
:::

::: solution
`indexOf` could not find `"Jerusalema"`, so it gave back `-1`. Then `playlist.splice(-1, 1)` ran. `splice` treats a negative start as "count from the end", so `-1` means the last item, and it removed `"Umlando"`. No error, a wrong answer. These are the worst kind of bug.

The fix is to check for `-1` before removing:

```js
const playlist = ["Mnike", "Water", "Pata Pata", "Umlando"];
const toRemove = "Jerusalema";

const index = playlist.indexOf(toRemove);
if (index !== -1) {
  playlist.splice(index, 1);
}

console.log(playlist);
```
Output:
```text
[ 'Mnike', 'Water', 'Pata Pata', 'Umlando' ]
```
Rule of thumb: **every `indexOf` should be followed by a check for `-1`** before you use the result.
:::

::: mistake
**Forgetting the brackets on a method.** `shopping.pop` without `()` does not remove anything. You must call it: `shopping.pop()`.

**Expecting `splice` to hand back the item itself.** It hands back an *array* of removed items. Use `removed[0]` to get the one item.

**Using `indexOf`'s answer without checking for `-1`.** As in the debug exercise, `-1` fed into `splice` quietly removes the last item.

**Mixing up `shift` and `unshift`.** `shift` removes from the start; `unshift` adds to the start. If your queue is going the wrong way, check these.

**Setting an index far past the end.** `seats[5] = "Chen"` on a 2-item array makes a list of length 6 with three empty gaps, which Node shows as `<3 empty items>`. To add to the end, use `push`.

**Thinking `const` freezes the array.** It only stops you swapping the whole array for a different one. The contents can still change.
:::

::: quiz
Which line of this program crashes, if any?

```js
const tins = ["beans"];      // line 1
tins.push("pilchards");      // line 2
tins[0] = "soup";            // line 3
tins = ["tomatoes"];         // line 4
```

- [ ] Line 2, with `TypeError: Assignment to constant variable.`
- [ ] Line 3, with `TypeError: Assignment to constant variable.`
- [x] Line 4, with `TypeError: Assignment to constant variable.`
- [ ] None of them: `tins` ends up as `[ 'tomatoes' ]`

`const` only stops the name `tins` from being pointed at a different array. Lines 2 and 3 change what is **inside** the same array, which is allowed. Line 4 tries to give the name a whole new array, and that is the one thing `const` forbids. If you picked line 3, remember the glued-on label: you can swap what is in the basket, but not the basket.
:::

## Real-world uses

- **Shopping lists and to-do lists:** `push` to add, `indexOf` + `splice` to tick something off.
- **Queues:** customers at a bank, songs "up next" in a music app, print jobs waiting for a printer. New things `push` onto the back, and the next thing to handle is `shift`ed off the front. Programmers call this **first in, first out**.
- **Undo history:** every change is `push`ed, and the undo button `pop`s the most recent. Your browser's back button works the same way. This is called **last in, first out**, a **stack**.
- **"Recently viewed"** lists in online shops: add to the end, and drop from the start when it gets too long, like your exercise.
- **Guest lists and banned words:** `includes` to answer "is this allowed?".

::: connect
**This builds on:** [Arrays](#/phase-05-arrays/01-what-is-an-array) (index and `.length`) and [the menu loop pattern](#/phase-03-loops/05-break-continue-nested).

**This unlocks:** [Looping through arrays](#/phase-05-arrays/03-looping-through-arrays), next. So far you have worked with one item at a time. Next, a loop will visit every item, so you can print a proper numbered list instead of `[ 'bread', 'rooibos' ]`. In Budget Buddy v5 you will `push` every expense and `splice` the ones the user wants to remove.
:::

::: challenge Waiting room
A clinic has a waiting room. Create `phase-5/clinic.js` with a menu loop:

- `j` asks for a name and adds that patient to the back of the queue, unless they are already waiting (then print a message).
- `n` calls the next patient: prints `Next: Dr Mokoena will see <name>` and removes them. If nobody is waiting, print `Nobody is waiting.` instead.
- `w` prints how many people are waiting and who is at the front.
- `q` quits.

Use `includes`, `push`, `shift` and `.length`. Remember the `undefined` you get from shifting an empty array: your code should check the length first.
:::

::: solution
```js
const prompt = require("prompt-sync")();

const waiting = [];
let open = true;

while (open) {
  const choice = prompt("(j)oin, (n)ext, (w)ho is waiting, (q)uit? ").trim().toLowerCase();

  if (choice === "j") {
    const name = prompt("Patient name: ").trim();
    if (waiting.includes(name)) {
      console.log(`  ${name} is already waiting.`);
    } else {
      waiting.push(name);
      console.log(`  ${name} joined. Position: ${waiting.length}`);
    }
  } else if (choice === "n") {
    if (waiting.length === 0) {
      console.log("  Nobody is waiting.");
    } else {
      const next = waiting.shift();
      console.log(`  Next: Dr Mokoena will see ${next}`);
    }
  } else if (choice === "w") {
    if (waiting.length === 0) {
      console.log("  Nobody is waiting.");
    } else {
      console.log(`  ${waiting.length} waiting. First in line: ${waiting[0]}`);
    }
  } else if (choice === "q") {
    open = false;
  } else {
    console.log("  Please type j, n, w or q.");
  }
}
```
A sample session:
```text
(j)oin, (n)ext, (w)ho is waiting, (q)uit? j
Patient name: Anele
  Anele joined. Position: 1
(j)oin, (n)ext, (w)ho is waiting, (q)uit? j
Patient name: Marco
  Marco joined. Position: 2
(j)oin, (n)ext, (w)ho is waiting, (q)uit? j
Patient name: Anele
  Anele is already waiting.
(j)oin, (n)ext, (w)ho is waiting, (q)uit? w
  2 waiting. First in line: Anele
(j)oin, (n)ext, (w)ho is waiting, (q)uit? n
  Next: Dr Mokoena will see Anele
(j)oin, (n)ext, (w)ho is waiting, (q)uit? n
  Next: Dr Mokoena will see Marco
(j)oin, (n)ext, (w)ho is waiting, (q)uit? n
  Nobody is waiting.
(j)oin, (n)ext, (w)ho is waiting, (q)uit? q
```
:::

::: recap
- `arr[i] = value` replaces the item at index `i`.
- `push` adds to the end, `pop` removes from the end. `unshift` adds to the start, `shift` removes from the start. `pop` and `shift` hand back the removed item (or `undefined` if the array was empty).
- A function that belongs to a value, called with a dot, is a **method**. Array methods like these change the array itself.
- `includes(x)` answers true or false. `indexOf(x)` gives the position, or **`-1`** if not found. Always check for `-1`.
- `splice(start, howMany)` removes items from anywhere, and hands them back in an array.
- `const` stops you swapping the array for another one, but its contents can still change.
- Giving an array a second name does not copy it. Phase 6 explains why.
:::

::: interview What is the difference between `pop` and `shift`?
Both remove one item and hand it back. `pop` removes from the **end** (the last item). `shift` removes from the **start** (index 0), and every other item moves up one place. A stack of plates uses `pop`; a queue uses `shift`.
:::

::: interview What does `indexOf` return when the item is not in the array, and why that value?
It returns `-1`. Every real index is 0 or more, so `-1` can never be confused with a real position. You must check for it before using the result, especially with `splice`, where `-1` would mean "the last item".
:::

::: interview If an array is declared with `const`, how can `push` change it?
`const` only stops the variable from being given a different array (reassignment). It does not freeze the contents. `push` changes what is inside the same array, which is allowed.
:::

::: checkpoint
- [ ] I ran the undo program and saw what `pop` gives back from an empty array
- [ ] I ran the shopping list program and added, removed and showed items
- [ ] I finished the bank queue with Gogo Dlamini at the front
- [ ] I made a "recently played" list that never grows past 3
- [ ] I fixed the "wrong song disappears" bug and can explain what `-1` did
- [ ] I can explain why `const` arrays can still change
:::

::: resources
- **javascript.info, "Arrays":** https://javascript.info/array. The sections on `pop`/`push`/`shift`/`unshift` match this lesson closely.
- **MDN, "Arrays" (beginner guide):** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays. See the sections on adding and removing items.
- **Python Tutor (JavaScript mode):** https://pythontutor.com/javascript.html. Paste in the stack-of-plates predict example and watch the array change line by line.
:::
