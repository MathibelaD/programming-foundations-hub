---
title: The terminal without fear
summary: What the terminal is, how to read the prompt, and the handful of commands you need to move around, make folders and stop a running program.
minutes: 45
stage: Phase 0
---

## What you will learn

- What the **terminal** is, and why programmers use it instead of clicking
- How to read the **prompt**, and what "type this and press Enter" really means
- The commands you will use every day: `pwd`, `ls`, `cd`, `mkdir` and `clear`
- **Paths**: how to describe where a folder is, including `~`, `.` and `..`
- Two huge time-savers (the up arrow and Tab), and how to stop a running program with **Ctrl+C**

**Before this:** [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer). You should have opened a terminal once already to type `node --version`.

## What the terminal is, and why bother

Normally you use your computer by clicking: open a folder, double-click a file, drag something to the bin. That is called a **graphical interface**, because you work with pictures (icons, windows, buttons).

The **terminal** is a different way in. It is a window where you **type commands**, as short words, and the computer **replies with text**. No icons, no mouse. It looks old-fashioned, and in a way it is. It is also one of the most useful tools a programmer has.

Why do programmers bother?

- **Your programs run there.** Node has no window or buttons. You run a JavaScript file by typing `node hello.js` in a terminal, and your program's output appears in the same terminal. For this whole course, the terminal is where your programs live.
- **It is precise.** "Open the folder called `phase-1` inside `coding-practice`" is one short command, and there is no doubt about what happened.
- **It is fast, once you know a few commands.** Making five folders takes five quick lines instead of twenty clicks.
- **Many programming tools only work there.** pnpm (which you installed in the last lesson) and Git (which you will meet later) are used by typing commands.

You will also hear the terminal called the **command line**, the **console** or the **shell**. For this course they all mean the same thing: the window where you type commands.

::: analogy Texting your computer
Clicking around is like pointing at things in a shop. Using the terminal is like **sending text messages** to your computer. You send a short, exact message ("show me what's in this folder"), and it texts back a reply. It only understands messages written in a very particular way, so you learn a small vocabulary. But once you know it, you can ask for things quickly and precisely.
:::

::: note You cannot break your computer with these commands
Everything in this lesson only *looks* at folders, *moves* you between them, or *creates* new empty folders. None of it deletes anything. Explore freely.
:::

## Opening a terminal

You did this in the last lesson. Here it is again, so that it is all in one place.

- **Windows:** press the **Windows key**, type `PowerShell`, and click **Windows PowerShell**. If you have an app called **Terminal**, that is even better, because it opens PowerShell in a nicer window. (Avoid the old **Command Prompt**: several commands in this lesson work differently there.)
- **macOS:** press **Cmd+Space**, type `Terminal`, and press **Enter**. Or find **Terminal** in **Applications → Utilities**.
- **Linux:** press **Ctrl+Alt+T**, or find **Terminal** in your applications menu.
- **Any system, inside VS Code:** press **Ctrl+`**, or use **Terminal → New Terminal**. This is what you will use most of the time.

## The prompt

When the terminal opens, you see a line of text and a blinking cursor. That line is called the **prompt**. It means "I am ready, type a command". It usually shows **which folder you are in right now**.

Here is what it looks like on each system, for a person whose user name is `thandi`:

**Windows (PowerShell):**

```text
PS C:\Users\thandi>
```

**macOS:**

```text
thandi@Thandis-MacBook ~ %
```

**Linux:**

```text
thandi@laptop:~$
```

Yours will look a bit different (your name, your computer's name), and that is fine. The important parts:

- **Where you are.** `C:\Users\thandi` on Windows, or `~` on macOS and Linux. You will learn what `~` means in a moment.
- **The last symbol** (`>`, `%` or `$`) marks the end of the prompt. You type after it.

::: warn Do not type the prompt
In lessons and online tutorials, commands are sometimes shown with a `$` or `>` in front, to show they belong in a terminal. **Never type that symbol yourself.** In this course, command boxes show only the command itself, so you can type exactly what you see.
:::

### "Type this and press Enter"

When a lesson says *run* a command, or *type this and press Enter*, it means:

1. Click inside the terminal window, so the cursor is blinking after the prompt.
2. Type the command exactly as shown: same spelling, same spaces, same capital or small letters.
3. Press the **Enter** key (on some Mac keyboards it is labelled **Return**).
4. Wait for the reply. When the prompt appears again on a new line, the command has finished and the terminal is ready for the next one.

Nothing happens until you press **Enter**. And if a command prints nothing at all and the prompt comes straight back, that usually means **it worked**. In the terminal, no news is good news.

## Commands and arguments

A command is made of words separated by spaces:

```bash
node --version
```

- The first word is the **command**: the name of the program or action (`node`).
- The words after it are **arguments**: extra information for the command (`--version`). Arguments that start with dashes are often called **options** or **flags**.

You will see this shape everywhere: `cd phase-1`, `mkdir recipes`, `node hello.js`. Command first, then what to do it to.

::: quiz
You type `cd My Documents` (with a space) and press **Enter**. How does the terminal read that line?

- [ ] Command `cd`, with one argument: `My Documents`
- [ ] Command `cd My`, with one argument: `Documents`
- [x] Command `cd`, with two arguments: `My` and `Documents`
- [ ] Command `Documents`, because the last word is what you want

Spaces separate the words of a command, so the terminal sees `cd` followed by **two** arguments, and it does not know you meant one folder name. That is why names with spaces cause trouble, and why quotes (`cd "My Documents"`) are needed to glue them into one argument.
:::

## Where am I? `pwd`

Your computer's files are organised into **folders** (also called **directories**, which means the same thing). Folders contain files and other folders.

The terminal is always "standing in" one folder. It is called the **current folder** or **working directory**. Commands work there unless you say otherwise.

To ask where you are, type `pwd`, which stands for **print working directory**:

```bash
pwd
```

On **macOS** you will see something like:

```text
/Users/thandi
```

On **Linux**:

```text
/home/thandi
```

On **Windows PowerShell**, `pwd` works too, and prints a little table:

```text
Path
----
C:\Users\thandi
```

This folder, the one named after you, is your **home folder**. A new terminal always starts there.

## What's here? `ls`

To list what is inside the current folder, type `ls` (short for **list**):

```bash
ls
```

On **macOS and Linux** you see the names of the files and folders, something like:

```text
Desktop    Documents  Downloads  Music      Pictures   Public
```

On **Windows PowerShell**, `ls` also works (so does `dir`, which means the same thing there). It shows a table with extra columns:

```text
    Directory: C:\Users\thandi

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-r---        2026/09/01     08:15                Desktop
d-r---        2026/09/10     17:42                Documents
d-r---        2026/09/20     12:03                Downloads
```

A `d` at the start of the **Mode** column means it is a folder (a **d**irectory). Look at the **Name** column and ignore the rest for now.

Your list will be different, of course. These are the same folders you see when you open File Explorer or Finder. The terminal and the graphical interface are two windows onto **the same files**.

## Moving around: `cd`

To move into a folder, use `cd`, short for **change directory**, followed by the folder's name:

```bash
cd Documents
```

It prints nothing, but the prompt changes to show your new location. Check with `pwd`:

```text
/Users/thandi/Documents
```

To go **back up** one level, to the folder that contains the one you are in, use two dots:

```bash
cd ..
```

To go straight **home** from anywhere, use the tilde, `~`:

```bash
cd ~
```

On most keyboards, `~` is **Shift** plus the key at the top-left, under **Esc**. These three commands work the same way on Windows PowerShell, macOS and Linux.

::: analogy Walking around a building
Think of your computer's folders as rooms in a building, with doors that lead into smaller rooms. The terminal is you, standing in one room.

- `pwd` is asking "which room am I in?"
- `ls` is looking around: "what is in this room?"
- `cd Documents` is walking through the door marked **Documents**.
- `cd ..` is walking back out through the door you came in by.
- `cd ~` is teleporting back to your own front room, from anywhere.

You can only walk through doors that exist in the room you are standing in. That is why `cd` with the wrong name gives an error.
:::

If you type a folder name that does not exist in the current folder, you get an error. On macOS:

```text
cd: no such file or directory: Documnets
```

On Windows PowerShell, a red message starting with:

```text
cd : Cannot find path 'C:\Users\thandi\Documnets' because it does not exist.
```

That is not a disaster. It is the terminal telling you precisely what went wrong: there is no folder with that exact name here. Check the spelling (`Documnets`!) and check where you are with `pwd` and `ls`.

::: note Capital letters
On **Linux**, `Documents` and `documents` are two different folders, and `cd documents` fails if the folder has a capital D. Windows and macOS are more forgiving about this. To be safe, always type names with exactly the same capitals as they really have. Your code will need the same habit.
:::

::: quiz
On a Mac, your terminal starts in `/Users/thandi`. You run these commands one after another:

```bash
cd Documents
cd ..
cd Downloads
cd ..
cd ..
pwd
```

What does `pwd` print?

- [ ] `/Users/thandi`
- [ ] `/Users/thandi/Downloads`
- [ ] Nothing: the last `cd ..` fails, because you cannot go above your home folder
- [x] `/Users`

Trace it: into `Documents`, back to `thandi`, into `Downloads`, back to `thandi`, and then one more `cd ..` goes up to `/Users`, the folder that contains your home folder. Your home folder is where a terminal *starts*, not a wall. The last `cd ..` is the one people lose track of.
:::

## Making folders: `mkdir`

To create a new, empty folder inside the current one, use `mkdir`, short for **make directory**:

```bash
mkdir recipes
```

On macOS and Linux it prints nothing (it worked). On Windows PowerShell it prints a small table showing the folder it made. Either way, `ls` now shows `recipes`, and so would File Explorer or Finder if you looked.

::: warn Avoid spaces in folder and file names
`mkdir my recipes` makes **two** folders, `my` and `recipes`, because spaces separate arguments. Programmers avoid spaces in names for this reason. Use a dash instead: `my-recipes`. (If you ever need to use a name with spaces, put quotes around it: `cd "My Documents"`.)
:::

::: quiz
You are in your home folder. You run `mkdir budget buddy`, then `cd budget-buddy`. What happens?

- [ ] One folder called `budget buddy` is made, and the `cd` works
- [x] Two folders, `budget` and `buddy`, are made, and the `cd` fails with "no such file or directory"
- [ ] One folder called `budget-buddy` is made, because the terminal swaps the space for a dash, and the `cd` works
- [ ] `mkdir` shows an error, because folder names cannot contain spaces

The space splits the line into two arguments, so `mkdir` makes one folder for each. Nothing is called `budget-buddy`, so `cd` cannot find it. The terminal never "fixes" your names: it does exactly what the words say.
:::

## Clearing the screen: `clear`

After a while the terminal fills up with old text. To wipe it clean, type:

```bash
clear
```

This works in Windows PowerShell as well as macOS and Linux. (On Windows, `cls` does the same thing.) It does not delete anything or undo anything. It only tidies the screen.

::: try Look around
Open a terminal: VS Code's built-in one (**Ctrl+`**) or a separate one.

1. Type `pwd` and press **Enter**. Which folder are you in? It should be your home folder.
2. Type `ls` and press **Enter**. Do you recognise the folders? Open File Explorer (Windows) or Finder (macOS) and compare. They are the same.
3. Type `cd Desktop` and press **Enter**. Watch the prompt change.
4. Type `pwd` again. You should see your home folder with `Desktop` on the end.
5. Type `ls`. You see whatever is on your desktop.
6. Type `cd ..` and press **Enter**, then `pwd`. You are back home.
7. Type `clear` and press **Enter**. The screen is empty, but you are still in the same folder. Check with `pwd`.
8. **Now experiment.** Predict what `pwd` will print after `cd Documents`, then `cd ..`, then `cd Downloads`. Write your prediction down, then run the three commands followed by `pwd`. Were you right?
:::

::: note Windows: is your Desktop somewhere else?
On some Windows computers that use OneDrive, the Desktop and Documents folders live inside a `OneDrive` folder, so `cd Desktop` from your home folder fails. Try `cd OneDrive`, then `ls`, and you should find them there.
:::

## Two time-savers: the up arrow and Tab

These two keys will save you thousands of keystrokes.

**The up arrow (↑) repeats old commands.** Press **↑** and the last command you typed appears after the prompt. Press it again to go further back. Press **Enter** to run it again, or edit it first with the left and right arrows. You will use this constantly to re-run `node` on the same file.

**Tab completes names for you.** Type the first few letters of a folder or file name, then press the **Tab** key. The terminal fills in the rest.

```bash
cd Docu
```

Press **Tab** after `Docu` and it becomes `cd Documents` (on Windows, `cd .\Documents\`, which means the same thing). Tab never makes spelling mistakes, so it is faster **and** safer than typing the whole name. If nothing happens, there is either no match or more than one: type another letter and press **Tab** again.

## Paths: describing where something is

A **path** is the written directions to a file or folder. Paths use the names of folders separated by slashes.

Here is part of a home folder, drawn as a tree. You will create this `coding-practice` folder in the next lesson.

```text
thandi                  <- your home folder, also called ~
├── Desktop
├── Documents
└── coding-practice
    ├── hello.js
    ├── phase-0
    └── phase-1
        └── variables.js
```

There are two kinds of path.

An **absolute path** starts from the very top of the computer, so it works no matter where you are standing:

```text
/Users/thandi/coding-practice/phase-1         (macOS)
/home/thandi/coding-practice/phase-1          (Linux)
C:\Users\thandi\coding-practice\phase-1       (Windows)
```

A **relative path** starts from **where you are right now**. If you are standing in `coding-practice`, then:

```text
phase-1                    the phase-1 folder in here
phase-1/variables.js       the file variables.js, inside phase-1
```

Some special short names you can use in any path:

| Symbol | Means |
|---|---|
| `~` | your home folder |
| `.` | the folder you are in right now ("here") |
| `..` | the folder one level up ("the folder that contains this one") |

So you can combine them:

```bash
cd ~/coding-practice/phase-1
cd ../..
```

The first line goes to `phase-1` from anywhere, in one step. The second goes up **two** levels at once.

::: note Forward slashes or backslashes?
Windows writes paths with backslashes (`\`), and macOS and Linux with forward slashes (`/`). PowerShell happily accepts **forward slashes** too, and so does Node. So in this course, commands such as `cd ~/coding-practice` and `node phase-1/variables.js` are written with forward slashes and work on all three systems.
:::

::: quiz
Using the tree above, your terminal is in `coding-practice/phase-1`. Which **single** command takes you into `phase-0`?

- [ ] `cd phase-0`
- [ ] `cd ~/phase-0`
- [x] `cd ../phase-0`
- [ ] `cd ../../phase-0`

`phase-0` is not inside `phase-1`, so `cd phase-0` fails. `..` goes up one level, to `coding-practice`, and from there `phase-0` is right in front of you. `~/phase-0` looks in your home folder, but `phase-0` is inside `coding-practice`, not directly in home. `../..` climbs one level too far, to your home folder.
:::

## Stopping a running program: Ctrl+C

Sometimes a program runs forever, or takes far longer than you expected. You will write a program like that by accident in Phase 3 (everybody does). The emergency stop is:

**Ctrl+C**: hold down **Ctrl** and press **C**. On macOS it is also **Ctrl** (Control), **not** Cmd.

In the terminal, Ctrl+C does not mean "copy". It means **"stop the program that is running now"**. The program stops and the prompt comes back.

::: try Stop a program that never ends
We will use `ping`, a real program that checks whether a website is reachable. It keeps going until you stop it. (You need an internet connection.)

1. On **macOS or Linux**, type:
   ```bash
   ping google.com
   ```
   On **Windows**, type (the `-t` means "keep going forever"):
   ```bash
   ping -t google.com
   ```
2. Press **Enter**. A new line appears every second or so. Each line is one "are you there?" message and its reply. The exact text does not matter.
3. Notice that you cannot type a new command, because the terminal is busy running `ping`.
4. Press **Ctrl+C**. The lines stop, `ping` prints a short summary, and the prompt comes back.
5. Press the **up arrow**. The `ping` command appears again. Press **Enter** to run it, then stop it again with **Ctrl+C**. You now know the most important emergency key in programming.
:::

::: exercise Level 1 — Guided · Build a folder structure
You will build this structure inside your home folder, using only the terminal:

```text
~
└── terminal-practice
    ├── recipes
    │   ├── breakfast
    │   └── dinner
    └── music
```

1. Go home: `cd ~`
2. Make the top folder: `mkdir terminal-practice`
3. Move into it: `cd terminal-practice`
4. Make two folders here: `mkdir recipes`, then `mkdir music`
5. Check with `ls`. You should see `music` and `recipes`.
6. Move into recipes: `cd recipes`
7. Make two folders: `mkdir breakfast`, then `mkdir dinner`
8. Run `pwd`. It should end in `terminal-practice/recipes` (or `terminal-practice\recipes` on Windows).
9. Go up one level with `cd ..`, then into music with `cd music`, and run `pwd` again.
10. Open File Explorer or Finder, go to your home folder, and look inside `terminal-practice`. Everything you made by typing is there.
:::

::: exercise Level 2 — On your own · Navigate with paths
Starting from your **home folder**, and using the `terminal-practice` structure you just built:

1. Go into `dinner` with a **single** `cd` command.
2. From `dinner`, go into `music` with a **single** `cd` command, without going home first.
3. From `music`, go back home with a **single** command, in two different ways.

Check where you are with `pwd` after each step.
:::

::: hint
Paths can have several folder names joined with `/`. And `..` means "up one level", so `../..` means "up two levels". Draw the tree on paper and trace the route with your finger: from `dinner`, how many levels up do you need to go before you can walk down into `music`?
:::

::: solution
1. From home:
   ```bash
   cd terminal-practice/recipes/dinner
   ```
2. From `dinner`, up two levels (to `terminal-practice`), then down into `music`:
   ```bash
   cd ../../music
   ```
3. From `music`, either the home shortcut:
   ```bash
   cd ~
   ```
   or up two levels (to `terminal-practice`'s parent, which is your home folder):
   ```bash
   cd ../..
   ```

On Windows, `cd ..\..\music` also works, but forward slashes work too. When you have finished, you can delete the `terminal-practice` folder in File Explorer or Finder the way you normally delete things. It was only for practice.
:::

::: mistake
**Typing the `$` or `>` from a tutorial.** Those symbols are the prompt, not part of the command. Type only the command.

**Being in the wrong folder.** This is the most common terminal problem of all. Before running anything, check the prompt, or run `pwd`. If a file "does not exist" but you can see it in VS Code, you are almost certainly in the wrong folder.

**Forgetting the space after `cd`.** `cd..` works on Windows but not on macOS or Linux. Always type `cd ..` with a space.

**Spaces in names.** `mkdir my project` makes two folders. Use `my-project`.

**Pressing Ctrl+C to copy.** In the terminal, Ctrl+C stops a program. To copy text from the terminal, select it and use **Ctrl+Shift+C** on Windows Terminal and most Linux terminals, or **Cmd+C** on macOS. In VS Code's terminal on Windows, **Ctrl+C** copies when some text is selected, and stops the program when nothing is.

**Panicking at red text.** An error in the terminal is a message, not a catastrophe. Read it: it usually says exactly what is wrong.
:::

::: quiz
You run `node counter.js`, and it starts printing numbers without ever stopping. You press **Ctrl+C**, then press **↑** and **Enter**. What happens?

- [x] `node counter.js` runs again from the beginning, and keeps printing until you press Ctrl+C again
- [ ] The program carries on from the number where you stopped it
- [ ] Nothing: Ctrl+C stopped the program for good, so it cannot run again
- [ ] The numbers that were printed are copied, ready to paste

**↑** brings back the last command, and **Enter** runs it, so the program starts again, from the top, and never stops by itself. Ctrl+C only stopped that one run: the file is unchanged. In the terminal, Ctrl+C does not copy, which is why the last option is a trap.
:::

## Real-world uses

- Every professional JavaScript project is started, run and tested from a terminal: `pnpm install`, `pnpm start`, `pnpm test`.
- Servers (the computers that run websites) usually have **no** graphical interface at all. Programmers manage them entirely by typing commands.
- **Git**, the tool almost all programmers use to save versions of their code, is mostly used from the terminal. You will meet it in [Phase 8](#/phase-08-becoming-a-programmer/04-saving-your-work-with-git).
- Automating boring jobs (renaming 500 photos, backing up a folder every night) starts with the same commands you learned today.

::: connect
**This builds on:** [Setting up your computer](#/phase-00-start-here/04-setting-up-your-computer), where you opened a terminal to run `node --version`.

**This unlocks:** [Your first program](#/phase-00-start-here/06-your-first-program), where you use `cd` and `mkdir` to create your `coding-practice` folder, and `node` to run your very first file. From then on, every lesson ends with you typing a command in the terminal.
:::

::: recap
- The **terminal** is a window where you type commands and get text back. Your programs run there.
- The **prompt** shows where you are. Type after it, then press **Enter**. Never type the prompt symbol itself.
- `pwd` shows where you are, `ls` shows what is here, `cd name` goes into a folder, `cd ..` goes up, and `cd ~` goes home.
- `mkdir name` makes a folder. `clear` tidies the screen.
- A **path** is directions to a file or folder. **Absolute** paths start from the top. **Relative** paths start from where you are. `~` is home, `.` is here, and `..` is one level up.
- **↑** repeats old commands, and **Tab** completes names.
- **Ctrl+C** stops a running program.
:::

::: interview What is the difference between an absolute path and a relative path?
An **absolute path** starts from the very top of the computer (like `/Users/thandi/coding-practice` or `C:\Users\thandi\coding-practice`), so it points to the same place wherever you are. A **relative path** starts from the current folder (like `phase-1/variables.js`), so where it points depends on where you are standing.
:::

::: interview You run `cd phase-1` and get "no such file or directory" (or "Cannot find path"). What do you check?
Two things: **where you are** (`pwd`), and **what is here** (`ls`). Most likely you are not in the folder that contains `phase-1`, or the name is spelled differently (including capital letters). Tab completion avoids spelling mistakes.
:::

::: interview What does Ctrl+C do in the terminal, and when would you use it?
It stops the program that is currently running and gives you the prompt back. You use it when a program runs forever (for example a loop that never ends) or is taking too long.
:::

::: checkpoint
- [ ] I used `pwd` and `ls` and matched what I saw with File Explorer or Finder
- [ ] I moved into a folder with `cd`, back up with `cd ..`, and home with `cd ~`
- [ ] I built the `terminal-practice` folder structure using only the terminal
- [ ] I moved between folders with a single `cd` using `../..`
- [ ] I used the up arrow to repeat a command and Tab to complete a name
- [ ] I started `ping` and stopped it with Ctrl+C
:::

::: resources
- **The Odin Project, "Command Line Basics":** https://www.theodinproject.com/lessons/foundations-command-line-basics. A friendly lesson with more practice commands.
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. The course that lesson belongs to, if you want the surrounding lessons too.
- **VS Code, "Terminal Basics":** https://code.visualstudio.com/docs/terminal/basics. Everything VS Code's built-in terminal can do.
:::
