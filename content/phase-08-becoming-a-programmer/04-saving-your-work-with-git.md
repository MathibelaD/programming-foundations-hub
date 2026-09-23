---
title: Saving your work with Git
summary: Save points for your code. Install Git, then use init, status, add, commit and log to keep a history you can always go back to.
minutes: 50
stage: Phase 8
---

## What you will learn

- What **version control** is, and why every programmer uses it
- How to install **Git** and tell it your name and email
- The everyday commands: `git init`, `git status`, `git add`, `git commit` and `git log`
- How to keep `node_modules` out with a `.gitignore` file, and how to write a good commit message

**Before this:** [Splitting code into files](#/phase-08-becoming-a-programmer/03-splitting-code-into-files). You need to be comfortable with the terminal: `cd`, `ls` (or `dir`) and running commands from inside a folder, from [The terminal](#/phase-00-start-here/05-the-terminal).

## The problem: "it worked yesterday"

Here is a story almost every programmer has lived through.

Your program works. You decide to improve it. You change a few things in three files, and now it is broken. You try to undo, but you have closed the editor, and you cannot remember exactly what it looked like before. You would give anything to get yesterday's version back.

People try to solve this by hand, and you end up with folders like this:

```text
budget-buddy/
budget-buddy-backup/
budget-buddy-old/
budget-buddy-WORKING-dont-touch/
budget-buddy-final/
budget-buddy-final-v2/
```

Nobody remembers which is which, and none of them say *what* changed.

There is a much better way. It is called **version control**: a tool that records snapshots of your project over time, with a note explaining each one, so you can see what changed and go back to any earlier point. The version control tool almost everyone uses is called **Git**.

::: analogy Save points in a video game
In a long video game, you do not play from the start every time. Before a hard boss fight, you **save**. If the fight goes badly, you **load** your save and try again. Good players save often, and give their saves names like "Before the dragon" so they can find the right one.

Git gives your code save points. Each one is called a **commit**. You decide when to make one, and you give it a short message ("Add category totals"). If a change goes badly, the earlier save points are all still there.

There is one difference from a game: in Git, you **choose which files** go into each save. That is what `git add` is for.
:::

## A few words first

- **Git** is the version control program. It runs on your computer, in the terminal. It is free.
- A **repository** (or **repo**) is a project folder that Git is keeping track of. Git stores its history in a hidden folder called `.git` inside your project.
- A **commit** is one saved snapshot of your project, with a message, the author's name, and the date.
- The **staging area** is a waiting area for changes that you have *chosen* to include in the next commit. Think of it as packing a box before you seal and label it.

## Installing Git

First check whether you already have it. Open a terminal (in VS Code, or on its own) and run:

```bash
git --version
```

If you see something like `git version 2.39.3` (any number is fine), you have Git. Skip ahead to "Telling Git who you are". If you see an error like "command not found" or "not recognized", install it.

**Windows**

1. Go to https://git-scm.com/downloads and choose **Windows**. The download of **Git for Windows** starts.
2. Run the installer. It asks a lot of questions. The defaults are fine for all of them, with one useful change: on the screen **"Choosing the default editor used by Git"**, choose **Use Visual Studio Code as Git's default editor**.
3. When it finishes, **close every terminal and VS Code**, then open them again. (A terminal that was already open does not know about new programs.)
4. Run `git --version` again.

**macOS**

1. In Terminal, run `git --version`.
2. If Git is not installed, macOS shows a window offering to install the **command line developer tools**. Click **Install** and wait. It can take several minutes.
3. Run `git --version` again. (If you use Homebrew, `brew install git` also works.)

**Linux**

Use your package manager. On Ubuntu or Debian:

```bash
sudo apt update
sudo apt install git
```

On Fedora: `sudo dnf install git`. Then run `git --version`.

## Telling Git who you are

Every commit records who made it. Git needs your name and email **once** per computer. Run these three commands, with your own details inside the quotes:

```bash
git config --global user.name "Thandi Mokoena"
git config --global user.email "thandi@example.com"
git config --global init.defaultBranch main
```

- `--global` means "for every project on this computer", so you only do this once.
- The email does not have to be real for practising on your own computer. If you later use GitHub, use the same email you sign up with there.
- The third line names the main line of history `main`. (Older versions of Git used the name `master`. You will see both online. They mean the same thing.)

Check what you set:

```bash
git config --global --list
```

You should see (with your details):

```text
user.name=Thandi Mokoena
user.email=thandi@example.com
init.defaultbranch=main
```

If you skip this step, your first commit fails with a message that starts `Author identity unknown` and `*** Please tell me who you are.` That is Git asking you to do this step.

## The everyday cycle

Using Git day to day comes down to a small loop:

```text
change some files  →  git status  →  git add  →  git commit -m "message"
       ↑                                                    |
       └────────────────────────────────────────────────────┘
```

We will practise on your `coding-practice` folder, which has lots of files from this course in it.

### `git init`: start tracking a folder

In the terminal, go into your `coding-practice` folder and run:

```bash
git init
```

You should see something like this (your path will be different):

```text
Initialized empty Git repository in /Users/you/coding-practice/.git/
```

That is all. The folder is now a repository. Git created the hidden `.git` folder, where it will keep the history. **You never edit anything inside `.git` yourself.**

You only run `git init` **once per project**. Running it inside a folder that is already a repository does no harm, but there is no need.

::: warn Run git init in the right folder
Check where you are first (`pwd` on macOS/Linux, `cd` on its own or `pwd` in Windows PowerShell). Running `git init` in your home folder would make Git try to track *everything* you own. If that happens by accident, delete the hidden `.git` folder that it created there, and nothing else is affected.
:::

### `git status`: what is going on?

```bash
git status
```

You will see something like:

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hello.js
	node_modules/
	package-lock.json
	package.json
	phase-1/

nothing added to commit but untracked files present (use "git add" to track)
```

(Your list will be longer: `phase-2/`, `phase-3/` and so on.) **Untracked** means "Git can see these files, but has never saved them". `git status` is the command you will run most. It changes nothing. It only tells you what state things are in, so run it whenever you are unsure.

Something is wrong in that list, though: `node_modules/`.

### `.gitignore`: files Git should never save

`node_modules` holds the packages you installed with npm, such as `prompt-sync`. You should not save it in Git, because:

- It can be huge (thousands of files for bigger projects), and it is not *your* code.
- Anyone can recreate it exactly by running `npm install`, because `package.json` lists what is needed. You met this idea in [Asking the user questions](#/phase-01-storing-information/08-getting-input-from-the-user).

A file called **`.gitignore`** lists files and folders that Git should pretend do not exist.

1. In VS Code, create a new file in the **top** of `coding-practice` (next to `package.json`) called exactly `.gitignore`. The dot at the start matters, and there is no other extension.
2. Put this line in it and save:
   ```text
   node_modules/
   ```
3. Run `git status` again.

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	hello.js
	package-lock.json
	package.json
	phase-1/

nothing added to commit but untracked files present (use "git add" to track)
```

`node_modules/` has gone from the list, and `.gitignore` itself has appeared. The `.gitignore` file *should* be saved, so that the rule is kept with the project.

::: note Files starting with a dot
On macOS and Linux, files whose names start with `.` are **hidden** in the normal file browser and in `ls`. VS Code shows them, and `ls -a` shows them in the terminal. This is why you may not see `.git` or `.gitignore` in Finder.
:::

### `git add`: choose what goes in the next commit

```bash
git add .
```

The `.` means "this folder and everything in it" (except whatever `.gitignore` lists). You can also add single files: `git add hello.js`.

This does **not** save anything permanent yet. It puts the changes in the **staging area**. Check with `git status`:

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   hello.js
	new file:   package-lock.json
	new file:   package.json
	new file:   phase-1/variables.js
```

"Changes to be committed" is the staging area: the box is packed, but not sealed yet.

### `git commit`: make the save point

```bash
git commit -m "Add practice files from phases 0 and 1"
```

`-m` means "here is the message", and the message goes in quotes. You should see something like:

```text
[main (root-commit) 8b842d1] Add practice files from phases 0 and 1
 5 files changed, 5 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 hello.js
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 phase-1/variables.js
```

Your numbers will be different. `8b842d1` is the start of this commit's unique ID, called its **hash**. `root-commit` means it is the very first one. Now:

```bash
git status
```

```text
On branch main
nothing to commit, working tree clean
```

"Working tree clean" means everything in the folder matches the last commit. There is nothing unsaved. That is a lovely message to see.

::: try Your first repository
1. Make sure Git is installed and configured (`git --version`, and `git config --global --list` shows your name and email).
2. In the terminal, `cd` into your `coding-practice` folder. Check where you are.
3. Run `git init`.
4. Run `git status` and find `node_modules/` in the list.
5. Create `.gitignore` containing `node_modules/`, then run `git status` again and check that `node_modules/` has gone.
6. Run `git add .`, then `git status`. Everything should be under "Changes to be committed".
7. Run `git commit -m "Add all my practice files so far"`.
8. Run `git status`. You should see `nothing to commit, working tree clean`.
9. **Predict, then run:** open `hello.js`, add a line, and save it. What will `git status` say now? Which word will appear next to `hello.js`? Run it and see.
:::

## The second commit, and every one after

In step 9 you changed a file that Git already knows about. `git status` shows:

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   hello.js

no changes added to commit (use "git add" and/or "git commit -a")
```

**Modified** means "this file is different from the last commit". To see exactly *what* is different, use `git diff`:

```bash
git diff
```

```text
diff --git a/hello.js b/hello.js
index a8141d3..e3219d1 100644
--- a/hello.js
+++ b/hello.js
@@ -1 +1,2 @@
 console.log("Hello, world!");
+console.log("Hello again!");
```

Lines starting with `+` were added. Lines starting with `-` were removed. The rest is context, to show you where. Checking `git diff` before you commit is a great habit: it catches leftover debug logs and accidental changes.

Now save the change as a new commit, in the usual two steps:

```bash
git add hello.js
git commit -m "Say hello twice"
```

```text
[main aecd305] Say hello twice
 1 file changed, 1 insertion(+)
```

That is the whole everyday cycle: **change, status, add, commit**. Everything else in Git builds on it.

## `git log`: the history

```bash
git log
```

```text
commit aecd305e223e1f78a56f53c05e83917145fab166
Author: Thandi Mokoena <thandi@example.com>
Date:   Wed Sep 23 19:44:45 2026 +0200

    Say hello twice

commit 8b842d1b12679953d5cc409139136f9b8c5c64d9
Author: Thandi Mokoena <thandi@example.com>
Date:   Wed Sep 23 19:44:45 2026 +0200

    Add practice files from phases 0 and 1
```

The newest commit is at the top. Each one has its full hash, who made it, when, and the message.

When the log is longer than your screen, Git shows it one page at a time. Use the arrow keys or Space to scroll, and press **q** to quit and get your prompt back. (People often think the terminal has frozen at this point. It has not: press q.)

For a compact view, one line per commit:

```bash
git log --oneline
```

```text
aecd305 Say hello twice
8b842d1 Add practice files from phases 0 and 1
```

## Undoing a change you have not committed yet

Suppose you edit `hello.js`, break it, and want it back exactly as it was at the last commit. `git status` even told you how:

```bash
git restore hello.js
```

The file goes back to how it was in the last commit. **Careful:** this throws your uncommitted changes to that file away for good. That is exactly what you want when you have made a mess, and exactly what you do not want by accident.

Going back to *older* commits is possible too, but it is a step further than this lesson. For now, the big win is this: **once something is committed, it is safe.** However badly you break things, the committed version is still in the history.

## Writing good commit messages

A commit message is a note to your future self (and your teammates) explaining **what this save point is**. In six months, you will read `git log` to find when something changed. Make that search painless for yourself.

| Weak message | Better message |
|---|---|
| `stuff` | `Add search by description` |
| `fixed it` | `Fix off-by-one error in average` |
| `changes` | `Move money helpers into money.js` |
| `asdf` | `Save budget after every change` |
| `update` | `Show top 3 expenses in the menu` |

Guidelines:

- **Say what the commit does**, as a short command: "Add…", "Fix…", "Move…", "Remove…". Imagine it finishing the sentence "If applied, this commit will…".
- **Keep it short**, about 50 characters. Detail can go in the code or a second paragraph later.
- **One idea per commit.** "Add search and fix total and rename things" is three commits. Small commits are easier to understand and easier to undo.
- **Commit when something works.** A good rhythm is: get a small thing working, run it, commit it.

::: exercise Level 1 — Guided · A tiny history
In your `coding-practice` repository:

1. Create `phase-8/git-practice.js` containing `console.log("Version 1");`. Run it with `node`.
2. Run `git status`. The new file shows as **untracked**.
3. `git add phase-8/git-practice.js`, then `git commit -m "Add git practice file"`.
4. Change the line to `console.log("Version 2");`. Run it. Run `git diff` and find the `-` and `+` lines.
5. `git add` and `git commit` with the message `Print version 2`.
6. Change it again to `console.log("Version 3 is broken"` (no closing bracket). Run it and see the `SyntaxError`.
7. Get the working version back with `git restore phase-8/git-practice.js`. Run it: you should see `Version 2`.
8. Run `git log --oneline`. You should see your two new commits at the top.
:::

::: exercise Level 2 — On your own · Commit your Phase 8 work properly
Look at `git status` in `coding-practice`. You probably have untracked files from earlier in this phase (`fizzbuzz.js`, the `modules` folder, and so on). Make **at least three separate commits**, each one containing a group of related files, each with a clear message. Use `git add` with specific file or folder names, not `git add .`.

Finish with `git status` showing a clean working tree, and `git log --oneline` showing your commits.
:::

::: hint
You can add a whole folder: `git add phase-8/modules`. Check `git status` between each `git add` and `git commit` so you can see exactly what is in the staging area before you seal the box.
:::

::: solution
Your files will differ. One possible sequence:

```bash
git add phase-8/fizzbuzz.js phase-8/word-counter.js phase-8/vowels.js phase-8/palindrome.js
git commit -m "Add problem-solving practice"

git add phase-8/average.js phase-8/trace.js phase-8/lives.js phase-8/airtime.js
git commit -m "Add debugging exercises"

git add phase-8/modules phase-8/results
git commit -m "Add module examples and helpers exercise"

git status
git log --oneline
```
`git status` should end with `nothing to commit, working tree clean`. If a file is still listed, it still needs its own `git add` and commit.
:::

::: debug What went wrong?
Three learners ran into trouble. For each, say what happened and how to fix it.

**A.** Sipho ran `git commit -m "First save"` and got `Author identity unknown` and `*** Please tell me who you are.`

**B.** Maria ran `git commit -m "Add menu"` and got:
```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   index.js

no changes added to commit (use "git add" and/or "git commit -a")
```

**C.** Arjun ran `git log`, and the terminal filled with commits and then stopped responding to his commands, showing a `:` or `(END)` at the bottom.
:::

::: solution
**A.** Git does not know Sipho's name and email yet. Run `git config --global user.name "…"` and `git config --global user.email "…"` once, then commit again.

**B.** Maria changed `index.js` but never staged it, so there was nothing in the staging area to commit. Run `git add index.js` first, then commit.

**C.** Nothing is frozen. Git is showing the log one page at a time. Press **q** to quit and get the prompt back.
:::

::: mistake
**Running `git init` in the wrong folder**, such as your home folder. Always check where you are first. Remove an accidental `.git` folder to undo it.

**Committing `node_modules`.** Create `.gitignore` with `node_modules/` *before* the first `git add .`. (If you already committed it, run `git rm -r --cached node_modules`, add the `.gitignore`, and commit again.)

**Forgetting `git add`.** A commit only includes what is staged. "I committed but my change is missing" almost always means the file was not added.

**Forgetting `-m`.** `git commit` on its own opens an editor for the message. If VS Code opens, type the message on the first line, save, and close the tab. If a strange terminal editor appears instead, type `:q!` and press Enter to get out, then commit again with `-m`.

**Waiting too long to commit.** One giant commit at the end of the week is almost as bad as none. Commit every time a small piece works.
:::

## GitHub: an optional next step

Git works entirely on your own computer. **GitHub** is a website that stores copies of Git repositories online. People use it to:

- **back up** their code, so a broken laptop does not lose their work
- **share** projects, for example as a portfolio when applying for jobs
- **work together**, with several people contributing to one project

Git and GitHub are different things: Git is the tool, and GitHub is one popular place to keep repositories. (GitLab and Bitbucket are others.) You do **not** need GitHub for this course. When you are ready, GitHub's own beginner guide walks you through creating an account and putting a repository online: https://docs.github.com/en/get-started.

## Real-world uses

- Practically every software team in the world uses Git. "Do you know Git?" is a question in many job interviews, and the answer you can now give is yes.
- Open-source projects, from Node.js itself to VS Code, keep their entire history in Git. You can read every change anyone has ever made.
- When a new release of an app has a bug, developers use the history to find exactly which commit introduced it.
- Writers, designers and scientists use Git too, for anything stored as text files: books, research data, configuration.

::: connect
**This builds on:** the terminal from [Phase 0](#/phase-00-start-here/05-the-terminal), and `package.json` and `node_modules` from [Phase 1](#/phase-01-storing-information/08-getting-input-from-the-user).

**This unlocks:** fearless changes. In [Budget Buddy, finished](#/phase-08-becoming-a-programmer/05-project-budget-buddy-final) you will put the project under Git, then split it into modules one commit at a time, knowing you can always get back to a working version.
:::

::: challenge See your history in VS Code
VS Code has Git built in. Open `coding-practice` in VS Code and click the **Source Control** icon in the Activity Bar (it looks like three dots joined by lines, a branching shape). Then:

1. Change a file and save it. Find it in the Source Control panel, and click it to see a side-by-side view of what changed.
2. Stage it by clicking the **+** next to the file name.
3. Type a message in the box at the top of the panel and click **Commit**.
4. Run `git log --oneline` in the terminal. Is your VS Code commit there?
:::

::: solution
Yes: VS Code's Source Control panel runs the same Git commands for you. The **+** is `git add`, and the **Commit** button is `git commit -m`. Your commit appears at the top of `git log --oneline` with the message you typed. Use whichever you prefer, but knowing the terminal commands means you understand what the buttons do, and you can use Git anywhere, even where there is no VS Code.
:::

::: recap
- **Version control** records snapshots of a project over time. **Git** is the tool almost everyone uses.
- Install Git, then set `user.name` and `user.email` once with `git config --global`.
- `git init` once per project. It creates the hidden `.git` folder where history lives.
- The everyday cycle: change files → `git status` → `git add` → `git commit -m "message"`.
- `.gitignore` lists what Git should never save. `node_modules/` always goes in it.
- `git log` (or `git log --oneline`) shows the history. Press **q** to leave it. `git diff` shows uncommitted changes.
- Good messages say what the commit does, briefly: "Fix off-by-one error in average".
- GitHub is an optional website for storing repositories online, not the same thing as Git.
:::

::: interview What is the difference between `git add` and `git commit`?
`git add` puts changes into the staging area, choosing what will go in the next save point. `git commit` takes everything in the staging area and saves it permanently as a new commit, with a message. Adding is packing the box; committing is sealing and labelling it.
:::

::: interview Why should `node_modules` be in `.gitignore`?
It is not your code, it can be very large, and it can be recreated exactly at any time with `npm install`, because `package.json` lists the packages the project needs. Saving it would bloat the repository for no benefit.
:::

::: interview What is the difference between Git and GitHub?
Git is a version control program that runs on your computer and records the history of a project. GitHub is a website where you can store Git repositories online, to back them up, share them and work on them with other people.
:::

::: checkpoint
- [ ] `git --version` works on my computer, and I configured my name and email
- [ ] I ran `git init` in `coding-practice` and added a `.gitignore` with `node_modules/`
- [ ] I made my first commit and saw `working tree clean`
- [ ] I changed a file, read `git diff`, and committed the change with a clear message
- [ ] I used `git restore` to get back a file I had broken
- [ ] I read my history with `git log --oneline`
:::

::: resources
- **Pro Git (free book), chapter 2, "Git Basics":** https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository. The official book. Chapter 2 covers everything in this lesson, and a bit more.
- **GitHub, "Get started":** https://docs.github.com/en/get-started. For when you are ready to put a project online.
- **The Odin Project, Foundations:** https://www.theodinproject.com/paths/foundations/courses/foundations. Includes friendly lessons on Git and GitHub as part of its free path.
:::
