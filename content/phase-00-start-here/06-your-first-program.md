---
title: Your first program (and what every file is for)
summary: Create your practice folder, set it up with pnpm init, write and run hello.js, and understand every line of every file involved.
minutes: 50
stage: Phase 0
---

## What you will learn

- How to create your course folder, `coding-practice`, and open it in VS Code
- What **pnpm** does for a project, what `pnpm init` does, and what every line of **`package.json`** means
- How to write and run your first program, and what each piece of `console.log("Hello, world!");` does
- The **edit → save → run** loop, and the number one reason "nothing changed"
- How to add a `start` script and run it with `pnpm start`
- Two playgrounds for quick experiments: the Node **REPL** and the browser console

**Before this:** [The terminal without fear](#/phase-00-start-here/05-the-terminal). You should be able to use `cd`, `mkdir` and `pwd`, and you should have installed pnpm and run its two settings lines in [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer).

## The problem: a place for everything

Over the next few weeks you will write well over a hundred small programs. If they end up scattered across your Desktop, Downloads and Documents, you will lose them, overwrite them, and waste time hunting for them.

So before writing any code, we make **one folder** for all your practice, with a sub-folder for each phase. Then we turn that folder into a proper JavaScript **project**, the same way professionals start every project. Then, finally, we write code.

::: analogy A new exercise book for each subject
At school you did not write maths, history and science on loose sheets of paper. You had an exercise book for each subject, with your name on the cover and the pages in order. `coding-practice` is your exercise book for this course, and `package.json` (which you are about to create) is the label on its cover.
:::

## Step 1: create the folder

::: try Make coding-practice
Open a terminal (a separate one, or VS Code's with **Ctrl+`**). Type each command and press **Enter** after each one.

1. Go to your home folder:
   ```bash
   cd ~
   ```
2. Create the folder:
   ```bash
   mkdir coding-practice
   ```
3. Go into it:
   ```bash
   cd coding-practice
   ```
4. Check where you are:
   ```bash
   pwd
   ```
   You should see your home folder with `coding-practice` on the end, for example `/Users/thandi/coding-practice` on macOS, `/home/thandi/coding-practice` on Linux, or `C:\Users\thandi\coding-practice` on Windows.
:::

If `mkdir` says the folder already exists, that is fine: you made it before. Carry on with `cd coding-practice`.

## Step 2: open it in VS Code

You want VS Code to show this folder in its file explorer, so that everything you create lands in the right place. There are two ways.

**The menu way (works everywhere):** in VS Code, click **File → Open Folder…** (on macOS, **File → Open…**), find `coding-practice` in your home folder, select it, and click **Open** (or **Select Folder**).

**The terminal way:** while you are inside `coding-practice` in the terminal, type:

```bash
code .
```

Remember from the last lesson that `.` means "the folder I am in right now". So `code .` means "open VS Code, showing this folder".

- **Windows and Linux:** this works straight away if you installed VS Code in the usual way.
- **macOS:** you need to switch it on once. Open VS Code, press **Cmd+Shift+P**, type `shell command`, and click **Shell Command: Install 'code' command in PATH**. Then close your terminal, open a new one, `cd ~/coding-practice`, and try `code .` again.

VS Code may ask **"Do you trust the authors of the files in this folder?"**. They are your own files, so click **Yes, I trust the authors**.

On the left you should now see a panel called **Explorer** with `CODING-PRACTICE` at the top. It is empty. That is about to change.

From now on, use **VS Code's built-in terminal** (**Ctrl+`**). When you open it with a folder open, it starts **inside that folder** automatically, which saves you a `cd` every time.

## Step 3: `pnpm init`

You installed **pnpm** in [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer). It is a **package manager**: a tool for managing **packages**, bundles of code that other people have written and shared, so you do not have to write everything yourself.

::: analogy An app store for code
pnpm is like the app store on your phone, but for code. There are millions of free packages in a public library called the **npm registry**: one that asks the user questions, one that works with dates, one that draws charts. When you want one, you ask pnpm, and it downloads it and connects it to your project. You will install your first package, `prompt-sync`, in [Phase 1](#/phase-01-storing-information/08-getting-input-from-the-user).
:::

Before pnpm can add anything to a project, the folder needs a small settings file called **`package.json`**, which describes the project. The command `pnpm init` creates it, filled in with sensible starting values. ("init" is short for **initialise**: set something up for the first time.) It does not ask you any questions.

::: try Create package.json
1. Make sure VS Code's terminal is open and the prompt shows you are in `coding-practice`. (If not, run `cd ~/coding-practice`.)
2. Type this and press **Enter**:
   ```bash
   pnpm init
   ```
3. You should see something like this (with your own home folder in the first line):
   ```text
   Wrote to /Users/thandi/coding-practice/package.json

   {
     "name": "coding-practice",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC"
   }
   ```
4. Look at the Explorer panel in VS Code. A file called `package.json` has appeared. Click it to open it. It contains exactly the text that was printed.
:::

Depending on your version of pnpm, the lines might be in a slightly different order. That makes no difference. But if you see an extra line `"type": "module",`, the first `pnpm config set` line from [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer) was missed. Delete that line from `package.json`, save, and run `pnpm config set init-type commonjs --global` so your next project is right.

::: quiz
Thandi opens a new terminal, which starts in her home folder, `/Users/thandi`. She forgets to `cd` anywhere and runs `pnpm init`. What happens?

- [ ] pnpm finds her `coding-practice` folder and writes `package.json` there
- [x] A `package.json` appears in `/Users/thandi`, with `"name": "thandi"`
- [ ] An error, because a home folder cannot be a project
- [ ] pnpm asks which folder she wants to use

`pnpm init` always works in the **current folder**, the one `pwd` would show, and it takes the project's name from that folder's name. So her home folder becomes a "project" called `thandi`. No error warns her, which is why checking the prompt (or `pwd`) first is a good habit.
:::

## `package.json`, line by line

`package.json` is written in a format called **JSON**, a way of writing information as labels and values. Each line is a **label** in double quotes, a colon, and a **value**. The curly brackets `{ }` wrap the whole thing. You will learn JSON properly in [Phase 6](#/phase-06-objects/05-saving-data-with-json). For now, read it like a form someone has filled in.

| Line | What it means |
|---|---|
| `{` | The start of the description. Everything up to the matching `}` at the end belongs to it. |
| `"name": "coding-practice",` | The project's **name**. pnpm took it from the folder's name. Names in `package.json` use lower case and dashes, no spaces. |
| `"version": "1.0.0",` | The project's **version number**. The three numbers mean *major.minor.patch*: a big change, a small new feature, a small fix. It only matters if you share your project. You can ignore it. |
| `"description": "",` | A one-sentence description of the project. `""` means empty. |
| `"main": "index.js",` | The project's **main file**, the one other code would use first if this project were installed as a package. We will not use it (you do not even have an `index.js`), so leave it. |
| `"scripts": { ... },` | Shortcut **commands** for this project. Each one has a name and the command it runs. You will add your own in a moment. |
| `"test": "echo \"Error: no test specified\" && exit 1"` | A placeholder script called `test`. It prints `Error: no test specified` and then reports failure. It is there to remind you that you have not written any automated tests. Leave it. |
| `"keywords": [],` | Words that help people find the project if you publish it to the npm registry. `[]` means an empty list. |
| `"author": "",` | Your name, if you want. `""` means empty. You can type your name between the quotes. |
| `"license": "ISC"` | The **licence**: the legal rules for anyone who copies your code. ISC is a simple, permissive one. It only matters if you share your code publicly. |
| `}` | The end of the description. |

Notice the **commas**. Every line inside the curly brackets ends in a comma **except the last one** before a closing `}`. JSON is extremely strict about this, stricter than JavaScript. A missing or extra comma breaks the whole file. Keep that in mind when you edit it below.

::: note You do not need to memorise this
You will rarely write `package.json` by hand. pnpm creates and updates it for you. What matters is that you know **what it is for**, so it never feels like a mysterious file you are afraid to open. The two parts you will actually use in this course are `scripts` (today) and `dependencies` (which pnpm adds in Phase 1, when you install a package).
:::

::: quiz
Lerato edited her `package.json`. It now breaks every pnpm command. Which line is the problem?

```json
{
  "name": "coding-practice",
  "version": "1.0.0",
  "description": "My practice files",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Lerato Mokoena",
  "license": "ISC",
}
```

- [ ] Line 4: a description cannot contain spaces
- [ ] Line 10: the author's name cannot contain a space
- [ ] Line 2: the name must be exactly the same as her user name
- [x] Line 11: the comma after `"ISC"`, because it is now the last line before `}`

The text between quotes may contain spaces: it is only the *labels* like `"name"` that are fixed. The trouble is the comma rule: every line inside `{ }` ends in a comma **except the last one**. Here `"license": "ISC",` is the last line, but it still has a comma, so JSON expects another label that never comes. Delete that comma.
:::

## Step 4: your first program

At last. Time to write code.

::: try Hello, world!
1. In VS Code's Explorer panel, hover over `CODING-PRACTICE` and click the **New File** icon (a page with a plus sign). Or use **File → New File…**. Name the file `hello.js` and press **Enter**. Make sure it sits directly inside `coding-practice`, next to `package.json`, not inside another folder.
2. The file opens, empty. Type this line **yourself**. Do not copy and paste it:
   ```js
   console.log("Hello, world!");
   ```
3. Save the file: **Ctrl+S** on Windows and Linux, **Cmd+S** on macOS. (If you turned on Auto Save, it is already saved, but pressing it anyway is a good habit.)
4. In VS Code's terminal, check you are in `coding-practice`, then type this and press **Enter**:
   ```bash
   node hello.js
   ```
5. You should see:
   ```text
   Hello, world!
   ```
:::

That is it. You wrote a program, and a computer ran it. Every programmer in the world started with a line almost exactly like this one, and it is a real milestone. Take a second to enjoy it.

Here is what happened: `node hello.js` told Node to open the file `hello.js` in the current folder, read the instructions inside, and carry them out. There was one instruction: show `Hello, world!`.

## Every part of `console.log("Hello, world!");`

One short line, six parts. Here is each one.

| Part | What it means |
|---|---|
| `console` | The **console** is the text output of your program, which for us means the terminal. In JavaScript, `console` is a built-in tool for writing to it. |
| `.` | The dot means "the thing on the left has something called…". Here: `console` has something called `log`. You will see this dot a lot, and [Phase 6](#/phase-06-objects/01-what-is-an-object) explains it properly. |
| `log` | The action: **log** means write a line, like writing an entry in a logbook. `console.log` together means "write a line to the console". |
| `( )` | The round brackets hold what you are handing to `console.log`: the thing it should show. The opening `(` and the closing `)` must match. |
| `"Hello, world!"` | The text to show. The double quotes mark where the text starts and ends. They are not printed. Text in quotes is called a **string**, and you will learn much more about strings in [Phase 1](#/phase-01-storing-information/05-strings). |
| `;` | The semicolon marks the **end of the instruction**, like a full stop at the end of a sentence. |

::: note About that semicolon
JavaScript will usually work without the semicolon, because it guesses where instructions end. But guessing is exactly what we do not want computers doing, so this course always writes it. It is a good habit that also carries over to languages like C# and Java, where it is required.
:::

You can have as many instructions as you like. They run **one at a time, from top to bottom**:

```js
console.log("Hello, world!");
console.log("My name is Thandi.");
console.log("I am learning to program.");
```

Output:

```text
Hello, world!
My name is Thandi.
I am learning to program.
```

`console.log` can also show a number. Numbers do not need quotes:

```js
console.log(2026);
```

Output:

```text
2026
```

You will learn what you can *do* with numbers, and why quotes matter so much, in [Phase 1](#/phase-01-storing-information/01-values-and-output).

::: quiz
What does this program print?

```js
console.log("Sipho;");
console.log("Lerato")
```

- [x] `Sipho;` on the first line and `Lerato` on the second
- [ ] `Sipho` on the first line and `Lerato` on the second
- [ ] `Sipho;` and then an error, because line 2 has no semicolon
- [ ] `Sipho;Lerato` on one line

Everything between the quotes is text, and it is printed exactly, so the `;` inside the quotes appears. The semicolon that ends an instruction is the one *outside* the brackets. Line 2 has none, which is bad style but still works, because JavaScript guesses where the instruction ends. Each `console.log` prints its own line.
:::

## The edit → save → run loop

Programming is a loop of three steps, repeated all day long:

```text
   +--------+       +--------+       +--------+
   |  EDIT  | ----> |  SAVE  | ----> |  RUN   |
   +--------+       +--------+       +--------+
       ^                                  |
       |                                  |
       +------  look at the result  ------+
```

1. **Edit** the code in VS Code.
2. **Save** the file (**Ctrl+S** or **Cmd+S**).
3. **Run** it in the terminal (**↑** then **Enter** brings back the last command).
4. Look at the result, and go round again.

**Forgetting to save is the number one cause of "I changed it but nothing changed!"** Node reads the file from the disk. If you have not saved, the disk still has the old version, and Node runs the old version. Check for the **white dot** on the file's tab: a dot means unsaved.

::: try Round the loop
1. In `hello.js`, change the text to `"Hello, world! I made this."`.
2. **Do not save yet.** Look at the tab: there is a dot next to `hello.js` (if you turned on Auto Save, wait a second and it disappears; you can turn Auto Save off for this experiment and back on afterwards).
3. Run `node hello.js`. If the file was not saved, you get the **old** message.
4. Now save, and run it again (press **↑**, then **Enter**). The new message appears.
5. **Now experiment.** Add two more `console.log` lines with anything you like: your name, your town, your favourite food. Before running, say out loud exactly what the terminal will show, line by line. Then run it. Were you right?
:::

## Step 5: a `start` script and `pnpm start`

Remember the `scripts` section of `package.json`? It holds shortcut commands for your project. The most common one is called `start`: the command that starts the project. Real projects use it so that anyone can run them by typing `pnpm start`, without needing to know which file is the main one.

::: try Add a start script
1. Open `package.json` in VS Code.
2. Find the `"scripts"` section. Add a new line **above** the `"test"` line, so the section looks like this (note the comma at the end of the new line):
   ```json
   "scripts": {
     "start": "node hello.js",
     "test": "echo \"Error: no test specified\" && exit 1"
   },
   ```
3. Save the file.
4. In the terminal (still in `coding-practice`), type this and press **Enter**:
   ```bash
   pnpm start
   ```
5. You should see:
   ```text
   $ node hello.js
   Hello, world!
   ```
   The first line is pnpm telling you which command it is running for the `start` script: `node hello.js`. (The `$` is a traditional sign for "a command typed at the terminal".) Then comes your program's output.

   The very first time, pnpm may print two extra lines before that, such as `Already up to date` and `Done in 60ms using pnpm v12.6.0`. That is pnpm checking the project has everything it needs. It is not an error.
:::

The whole `package.json` should now look like this:

```json
{
  "name": "coding-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node hello.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

If you forget the comma at the end of the `"start"` line, `pnpm start` shows an error like this:

```text
Error: ERR_PNPM_PACKAGE_MANIFEST_SERIALIZATION_ERROR

  × Failed to parse /Users/thandi/coding-practice/package.json: expected `,` or `}` at line 8 column 5
```

It looks frightening, but read it slowly: it names the file (`package.json`), says what it expected (a `,` or a `}`), and gives the **line number**. The problem is usually at the end of the line **before** the one it names. Add the comma, save, and try again.

The standard way to run **any** script is `pnpm run` followed by the script's name: `pnpm run start`, `pnpm run test`, and so on. For `start`, the short form `pnpm start` is so common that everyone uses it. pnpm also lets you leave out `run` for your own script names, as long as the name is not already one of pnpm's own commands. You will try that in an exercise below.

::: note Two ways to run the same thing
`pnpm start` and `node hello.js` do the same job here. In lessons, we will mostly type `node` and a file name directly, because you will be running many different files. Budget Buddy, your course project, will use `pnpm start`, like a real app.
:::

::: quiz
Your `start` script is `"start": "node hello.js"`, and it works. Then you rename `hello.js` to `greet.js` in VS Code, but do not touch `package.json`. What does `pnpm start` do now?

- [ ] Runs `greet.js`, because it is the only program in the folder
- [ ] Says `Missing script: start`
- [x] Runs `node hello.js`, which fails because Node cannot find `hello.js`
- [ ] Nothing: pnpm updated `package.json` for you when you renamed the file

The script is only a saved command. pnpm finds the `start` script (so it is not "missing") and runs exactly the command written there, `node hello.js`. Node then looks for `hello.js`, which no longer exists, and fails with `Cannot find module`. Nothing updates `package.json` automatically: change the script to `node greet.js` yourself.
:::

## Step 6: the folder layout for the course

All your practice files will live in `coding-practice`, in one folder per phase. Let's create the first two now.

::: try Make the phase folders
In VS Code's terminal, inside `coding-practice`, type each line and press **Enter** after each:

```bash
mkdir phase-0
mkdir phase-1
```

Your `coding-practice` folder now looks like this:

```text
coding-practice
├── hello.js
├── package.json
├── phase-0
└── phase-1
```

When you reach Phase 2, you will make `phase-2`, and so on. (You can make them all now if you prefer, one `mkdir` at a time up to `phase-8`.)
:::

Lessons will say things like "create `phase-1/variables.js`" and "run `node phase-1/variables.js`". That means:

- Create the file **inside** the `phase-1` folder. In VS Code, right-click `phase-1` in the Explorer and choose **New File…**, or click the folder first and then the **New File** icon.
- Run it from **inside `coding-practice`** (not inside `phase-1`). The path `phase-1/variables.js` is a **relative path**: starting from `coding-practice`, go into `phase-1`, and find `variables.js`.

Keep your terminal in `coding-practice` and you will rarely need to `cd` anywhere.

::: quiz
You used `cd phase-0` to go into the `phase-0` folder, and now you run `node phase-0/about-me.js`. What happens?

- [ ] It runs `about-me.js` as normal
- [x] `Cannot find module`, because Node looks for `coding-practice/phase-0/phase-0/about-me.js`
- [ ] Node goes back up to `coding-practice` automatically, then runs the file
- [ ] `Cannot find module`, because Node looks for `about-me.js` directly in `coding-practice`

`phase-0/about-me.js` is a **relative path**: it starts from where you are *now*. You are already inside `phase-0`, so Node looks for another `phase-0` folder inside it, which does not exist. Either `cd ..` back to `coding-practice` first, or run `node about-me.js` from where you are.
:::

## Bonus: two playgrounds for quick experiments

Sometimes you want to try one line quickly, without making a file. There are two places to do that.

### The Node REPL

Type `node` on its own (with no file name) and press **Enter**:

```bash
node
```

You will see something like:

```text
Welcome to Node.js v24.8.0.
Type ".help" for more information.
>
```

This is the **REPL**, which stands for **Read, Evaluate, Print, Loop**: it **reads** a line you type, **evaluates** (runs) it, **prints** the result, and **loops** back to wait for the next one. Its prompt is a lonely `>`.

Type `console.log("Hi from the REPL");` and press **Enter**. You will see:

```text
Hi from the REPL
undefined
```

The first line is your output. The `undefined` is the REPL also printing the "result" of the line itself, which for `console.log` is nothing. Ignore it for now. You will understand exactly what it means by [Phase 4](#/phase-04-functions/03-return-values).

To leave the REPL and get your normal terminal prompt back, type `.exit` and press **Enter** (or press **Ctrl+C** twice).

::: warn Commands vs code
Inside the REPL, you type **JavaScript**. At the normal terminal prompt, you type **terminal commands**. They do not mix: typing `cd` inside the REPL, or `console.log(...)` at the terminal prompt, gives a confusing error. If something strange happens, look at the prompt. A lonely `>` means you are in the REPL: type `.exit`.
:::

### The browser console

You used this in [What is programming?](#/phase-00-start-here/02-what-is-programming): press **F12** in Chrome or Edge and click **Console** (or **Ctrl+Shift+J** / **Cmd+Option+J**). It runs JavaScript in the same way as the REPL. It is handy when you are reading a lesson in the browser and want to test one line without switching windows.

### When to use which

| Use… | When… |
|---|---|
| **A file, run with `node`** | Almost always. Anything more than one or two lines, anything you want to keep, every exercise and every project. |
| **The Node REPL** | You want to check one quick thing ("what does this print?") in the terminal. |
| **The browser console** | Same as the REPL, when you are already in the browser. |

The REPL and the console forget everything when you close them. Files stay. That is why real work always goes in files.

::: exercise Level 1 — Guided · About me
1. In VS Code, create a new file `about-me.js` inside the `phase-0` folder.
2. Write three `console.log` lines: one with your name, one with where you live, one with your favourite food.
3. Save it.
4. In the terminal, from inside `coding-practice`, run:
   ```bash
   node phase-0/about-me.js
   ```
5. Check that your three lines appear, in the order you wrote them.
:::

::: solution
Yours will have your own details. For example:

```js
console.log("My name is Kagiso.");
console.log("I live in Polokwane.");
console.log("My favourite food is chakalaka.");
```
Output:
```text
My name is Kagiso.
I live in Polokwane.
My favourite food is chakalaka.
```
If you got `Cannot find module`, check that you ran the command from inside `coding-practice` (not from inside `phase-0`), and that the file name is spelled exactly the same.
:::

::: exercise Level 2 — On your own · Your own script
Add a second script to `package.json`, called `about`, that runs `phase-0/about-me.js`. Then run it using pnpm.
:::

::: hint
Copy the shape of the `"start"` line, with a different name and a different command. Remember the comma rules. The always-safe way to run a script is `pnpm run` followed by the script's name.
:::

::: solution
The `scripts` section:

```json
"scripts": {
  "start": "node hello.js",
  "about": "node phase-0/about-me.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
Then run:
```bash
pnpm run about
```
Output (with your own lines):
```text
$ node phase-0/about-me.js
My name is Kagiso.
I live in Polokwane.
My favourite food is chakalaka.
```
`pnpm about` (without `run`) also works, because `about` is not one of pnpm's own commands. But imagine you had called the script `add` or `install`: those are pnpm's own commands, so `pnpm add` would do pnpm's job, not run your script. `pnpm run` always means "run my script", so it is the safe habit.
:::

::: challenge A text birthday card
Create `phase-0/card.js` that prints a birthday card with a border, using only `console.log` lines. For example:

```text
+----------------------+
|  HAPPY BIRTHDAY!     |
|  Love from Aisha     |
+----------------------+
```

Make the right-hand edge line up neatly. Then change the name to someone longer, and fix the border so it still lines up.
:::

::: solution
```js
console.log("+----------------------+");
console.log("|  HAPPY BIRTHDAY!     |");
console.log("|  Love from Aisha     |");
console.log("+----------------------+");
```
Output:
```text
+----------------------+
|  HAPPY BIRTHDAY!     |
|  Love from Aisha     |
+----------------------+
```
The trick to lining things up is that every line must have the **same number of characters**, spaces included. When a name gets longer, take the same number of spaces away before the `|` (or make the whole border wider). VS Code shows the column number in the bottom-right corner (for example `Col 25`), which helps you check.

Avoid the backslash `\` in your card for now: inside quotes it has a special meaning, which you will learn in [Phase 1](#/phase-01-storing-information/05-strings).
:::

::: mistake
**Running `node hello.js` from the wrong folder.** You get `Error: Cannot find module` followed by a path. Look at that path: it shows where Node looked. Use `pwd` and `cd` to get into `coding-practice`.

**Forgetting to save.** The dot on the tab means unsaved. Node runs what is on disk.

**Naming the file `hello.js.txt` or `Hello.JS`.** Use exactly `hello.js`, all lower case. Turning on file extensions (from [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer)) helps you spot this.

**Breaking `package.json` with a missing or extra comma.** pnpm reports `ERR_PNPM_PACKAGE_MANIFEST_SERIALIZATION_ERROR`, `Failed to parse`, and a line number. Every line inside `{ }` ends in a comma except the last one.

**A `"type": "module",` line in `package.json`.** It means pnpm's `init-type` setting was not done. Delete the line and run `pnpm config set init-type commonjs --global`. If you leave it, `require` (which you meet in Phase 1) will crash with `require is not defined in ES module scope`.

**Typing JavaScript at the terminal prompt, or terminal commands in the REPL.** Check the prompt. A lonely `>` means you are in the REPL.

**Running `pnpm init` in your home folder by mistake.** You get a `package.json` in the wrong place. Delete that stray `package.json` (not the folder!) in File Explorer or Finder, then `cd ~/coding-practice` and run it again.
:::

## Real-world uses

- **Every** Node.js project in the world starts with a `package.json`, created by `pnpm init`, `npm init`, or a tool that does the same job.
- `pnpm start` (or `npm start`, in projects that use npm) is the standard way to run a project. When you download someone else's JavaScript project, it is usually the first thing you try.
- Professional developers keep a REPL or browser console open all day to test small ideas before putting them into real files.
- Printing messages with `console.log` is how programmers check what their code is doing. You will use it for exactly that in [Debugging](#/phase-08-becoming-a-programmer/02-debugging).

::: connect
**This builds on:** [the terminal](#/phase-00-start-here/05-the-terminal) (you used `cd`, `mkdir`, relative paths and the up arrow) and [setting up your computer](#/phase-00-start-here/04-setting-up-your-computer) (VS Code, Node and pnpm).

**This unlocks:** everything from here on. Every lesson now follows the loop you just learned: create a file in `coding-practice/phase-N/`, type, save, run with `node`. Next, [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong) teaches you to read the error messages you will inevitably meet. In [Phase 1](#/phase-01-storing-information/08-getting-input-from-the-user), `package.json` gets its first dependency.
:::

::: recap
- `coding-practice` is your course folder, with one sub-folder per phase (`phase-0`, `phase-1`, …). Run files from inside `coding-practice`.
- **pnpm** is a package manager, an app store for code. `pnpm init` creates `package.json` with default values.
- `package.json` describes the project: `name`, `version`, `main`, `scripts`, `keywords`, `author`, `license` and `description`. It is JSON, which is strict about commas.
- `console.log("...")` shows a line of text. `console` is the output, `.log` writes a line, the brackets hold what to show, the quotes mark the text, and `;` ends the instruction.
- `node file.js` runs a file. Instructions run top to bottom.
- **Edit → save → run.** Unsaved changes do not run.
- `"start": "node hello.js"` in `scripts` lets you run the project with `pnpm start`. Any script runs with `pnpm run name`, the always-safe form.
- The **REPL** (`node` on its own, leave with `.exit`) and the browser console are for quick one-line experiments. Real work goes in files.
:::

::: interview What does `pnpm init` do, and which folder does it affect?
It creates a `package.json` file in the **current** folder (the one `pwd` shows), filled in with default values. That turns the folder into a project that pnpm can manage. Run it in the wrong folder and the file lands in the wrong place.
:::

::: interview You change `hello.js`, run `node hello.js`, and see the old output. What is the most likely reason?
The file was not saved. Node reads the saved file from disk, not what is on the screen. Look for the dot on the file's tab, save with Ctrl+S (Cmd+S on macOS), and run it again.
:::

::: interview `pnpm about` and `pnpm run about` both work. Why do we still teach `pnpm run`?
`pnpm run name` always means "run my script called name". The short form only works when the name is not one of pnpm's own commands. A script called `add` or `install` would clash: `pnpm add` would run pnpm's own `add` command instead of your script. `pnpm run` never clashes.
:::

::: interview When would you use the Node REPL instead of a file?
To quickly try one or two lines and see what they do. Anything longer, or anything you want to keep, goes in a file, because the REPL forgets everything when you leave it.
:::

::: checkpoint
- [ ] I created `~/coding-practice` and opened it in VS Code
- [ ] I ran `pnpm init` and can explain what at least five lines of `package.json` are for
- [ ] I wrote `hello.js` myself and ran it with `node hello.js`
- [ ] I saw the old output when I forgot to save, then the new output after saving
- [ ] I added a `start` script and ran it with `pnpm start`
- [ ] I created `phase-0` and `phase-1`, and ran `node phase-0/about-me.js`
- [ ] I opened the Node REPL, ran a line, and left with `.exit`
:::

::: resources
- **javascript.info, "Hello, world!":** https://javascript.info/hello-world. A short page on running JavaScript. (Its examples use a web page. The idea is the same.)
- **javascript.info, "Developer console":** https://javascript.info/devtools. How to open the browser console in every browser.
- **pnpm docs, "package.json":** https://pnpm.io/package_json. The official description of the fields pnpm uses. Very detailed: dip in, do not read it all.
- **pnpm docs, `pnpm init` and `pnpm run`:** https://pnpm.io/cli/init and https://pnpm.io/cli/run. Short reference pages for the two commands you used today.
:::
