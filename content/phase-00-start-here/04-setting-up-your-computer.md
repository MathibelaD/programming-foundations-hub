---
title: Setting up your computer
summary: Install a code editor (VS Code) and Node.js, check they work, and change a few settings that make a beginner's life easier.
minutes: 40
stage: Phase 0
---

## What you will learn

- What a **code editor** is, and why you cannot write code in Word
- How to install **VS Code** and **Node.js** on Windows, macOS or Linux
- How to check that Node is installed, using two short commands
- A few settings that save beginners a lot of pain: auto save, a bigger font, visible file extensions
- What to do when the computer says `node` is "not recognized" or "not found"

**Before this:** [The map](#/phase-00-start-here/03-the-map).

## The problem: two tools, and nothing else

To program in this course you need exactly two things:

1. **Somewhere to write code.** That is a code editor. We will use **VS Code**.
2. **Something to run the code.** That is **Node.js**, the "pianist" from [What is programming?](#/phase-00-start-here/02-what-is-programming) that reads your JavaScript and carries it out.

Both are free, both work on Windows, macOS and Linux, and both are used by millions of professional programmers. You are installing real tools, not toy ones.

::: analogy A kitchen
VS Code is your **kitchen counter**, with good lighting and sharp knives: the place where you prepare things. Node.js is your **stove**: the thing that actually cooks what you prepared. You need both. A beautiful counter with no stove means raw food. A stove with no counter means chopping onions on the floor.
:::

Set aside about half an hour. Installing things is the most boring part of learning to program, and it is also the part most likely to go wrong in odd ways. If something does not match what this page says, jump to the troubleshooting section at the bottom before you give up.

## Part 1: a code editor

A **code editor** is a program for writing and editing plain text files, with extra help for code. "Plain text" means only characters, with no hidden formatting like bold, fonts or page margins.

### Why not Word, Google Docs or Notepad?

- **Word and Google Docs** save lots of hidden formatting with your text, and they "helpfully" change your straight quotes `"` into curly quotes `“ ”`. JavaScript does not understand curly quotes, so the code breaks. (You will see exactly what that error looks like in [When things go wrong](#/phase-00-start-here/07-when-things-go-wrong).)
- **Notepad and TextEdit** can save plain text, but they give you no help at all: no colours, no warnings, no built-in terminal.

A code editor gives you things that matter from day one:

- **Syntax highlighting:** different parts of the code are shown in different colours, so a missing quote stands out immediately.
- **A file explorer** on the left, showing every file in your project.
- **A built-in terminal**, so you can run code without switching windows.
- **Warnings** (red squiggly underlines) when something looks wrong, before you even run it.

### Install VS Code

**VS Code** (short for Visual Studio Code) is a free code editor made by Microsoft. Do not confuse it with "Visual Studio", which is a different, much larger program.

1. Go to **https://code.visualstudio.com/** in your browser.
2. Click the big **Download** button. The site usually detects your operating system automatically.
3. Install it:
   - **Windows:** open the downloaded file (it will be named something like `VSCodeUserSetup-x64-….exe`). Accept the agreement and click **Next** through the screens. On the screen called **Select Additional Tasks**, make sure **Add to PATH** is ticked (it usually is). Ticking **Add "Open with Code" action** is handy too. Then **Install**.
   - **macOS:** open the downloaded `.zip` file. It unpacks into **Visual Studio Code.app**. Drag that into your **Applications** folder. Open it from there (the first time, macOS may ask whether you are sure you want to open an app downloaded from the internet: click **Open**).
   - **Linux:** download the `.deb` file (Ubuntu, Debian, Mint) or the `.rpm` file (Fedora, openSUSE), then double-click it to install with your software centre. Or follow the instructions for your distribution at https://code.visualstudio.com/docs/setup/linux.
4. Open VS Code. You will see a welcome page. You can close it.

::: note VS Code will offer you lots of extensions
Over time VS Code will suggest **extensions** (add-ons). You do not need any for this course. Everything we use is built in. If it asks, you can say "no" or ignore it.
:::

## Part 2: Node.js

**Node.js** is the program that runs JavaScript files on your computer, outside a web browser. When you type `node hello.js`, Node opens `hello.js`, reads your instructions and carries them out.

Installing Node also installs **npm**, a tool for creating JavaScript projects and downloading code that other people have shared. You will use npm for the first time in [Your first program](#/phase-00-start-here/06-your-first-program).

### LTS or Current?

The Node website offers two kinds of version:

- **LTS**, which stands for **Long Term Support**. This version is stable, well tested, and gets bug fixes and security fixes for a long time. It is what most companies use.
- **Current**, which has the newest features, some of which may still change.

**Always choose LTS.** Nothing in this course needs the newest features, and you want the tool you are learning with to be as solid as possible.

### Install Node.js

**Windows**

1. Go to **https://nodejs.org/** and click the download for the **LTS** version. You get a file ending in `.msi`.
2. Open it and click **Next** through the installer, accepting the licence. Leave all the options as they are.
3. You may see a screen called **Tools for Native Modules** with a tick box about installing extra tools automatically. **Leave it unticked.** You do not need those tools, and they take a long time to install.
4. Click **Install**, allow the "make changes to your device" question, then **Finish**.

**macOS**

1. Go to **https://nodejs.org/** and click the download for the **LTS** version. You get a file ending in `.pkg`.
2. Open it and click **Continue** through the installer, accepting the licence. Enter your Mac password when asked.
3. When it says the installation was successful, click **Close**.

**Linux**

The version of Node in many Linux distributions' own software centres is quite old, so the Node website recommends a small tool called **nvm** (Node Version Manager) instead.

1. Go to **https://nodejs.org/en/download**.
2. Choose the **LTS** version, **Linux**, and **nvm**. The page shows a few commands in a grey box.
3. Open a terminal (see [the next lesson](#/phase-00-start-here/05-the-terminal) if you have never done this: on most Linux desktops it is **Ctrl+Alt+T**).
4. Copy the commands from the Node website **one at a time**, paste each into the terminal (in most Linux terminals, paste is **Ctrl+Shift+V**), and press **Enter** after each one. Wait for each to finish before the next.
5. If one of the commands complains that `nvm` is not found, close the terminal, open a new one, and carry on from that command.

## Check that it worked

This is your very first use of the terminal. The next lesson explains it properly. For now, follow the steps exactly.

The **terminal** is a window where you type commands to the computer instead of clicking. You type a command, press **Enter**, and the computer prints a reply.

::: try Check your versions
1. **Close any terminal windows you already had open**, and open a fresh one. This matters: terminals opened *before* you installed Node do not know Node exists.
   - **Windows:** press the **Windows key**, type `PowerShell`, and click **Windows PowerShell** (or **Terminal**, if you have it). Do not choose the one that says "ISE".
   - **macOS:** press **Cmd+Space** to open Spotlight, type `Terminal`, and press **Enter**.
   - **Linux:** press **Ctrl+Alt+T**, or find **Terminal** in your applications menu.
2. A window opens with a line of text ending in a symbol such as `>`, `%` or `$`, and a blinking cursor. That is where you type.
3. Type this, exactly, and then press the **Enter** key:
   ```bash
   node --version
   ```
4. You should see a version number, starting with a `v`. Something like:
   ```text
   v24.8.0
   ```
   Your numbers will probably be different, and that is fine. What matters is that **you see a version number and not an error**, and that the first number is **20 or higher**.
5. Now type this and press **Enter**:
   ```bash
   npm --version
   ```
6. You should see another version number, this time without a `v`. Something like:
   ```text
   11.6.0
   ```
7. If both printed a number: congratulations, your computer can now run JavaScript. If either one printed an error, go to the troubleshooting section below.
:::

What did you just do? `node` is the name of the program. `--version` is an extra instruction to it, meaning "don't run anything, only tell me which version you are". The two dashes are part of the option's name, so type both.

## Part 3: settings that make life easier

A few minutes here will save you hours of confusion later.

### Turn on Auto Save in VS Code

The number one reason beginners say "I changed my code but nothing changed!" is that they **did not save the file**. Node runs the version of the file that is saved on disk, not what you see on the screen.

In VS Code, open the **File** menu and click **Auto Save**, so that it has a tick next to it. VS Code now saves your file automatically, a moment after you stop typing.

You should still learn the save shortcut, because it is used in every program you will ever use: **Ctrl+S** on Windows and Linux, **Cmd+S** on macOS.

::: note How to spot an unsaved file
In VS Code, the tab at the top with your file's name shows a **white dot** instead of the **×** when the file has unsaved changes. Dot means "not saved". Learn to glance at it before running anything.
:::

### Make the text bigger

You will be staring at code for a long time. Make it comfortable.

- To zoom the whole of VS Code in or out: **Ctrl+=** and **Ctrl+-** (Windows and Linux), **Cmd+=** and **Cmd+-** (macOS).
- To change only the code's size: open **Settings** (**Ctrl+,** on Windows and Linux, **Cmd+,** on macOS), type `font size` in the search box at the top, and change **Editor: Font Size** to something like `16` or `18`.

### Open the built-in terminal

VS Code has a terminal built into the bottom of its window. This means you can write code and run it without switching between windows.

- Press **Ctrl+`** to open or close it. That second key is the **backtick**, usually found at the top-left of the keyboard, under **Esc** and next to **1**. On macOS the shortcut is also **Ctrl+`** (Control, not Command).
- Or use the menu: **Terminal → New Terminal** (on some versions, **View → Terminal**).

On Windows, VS Code's terminal uses PowerShell by default. On macOS and Linux it uses the same terminal program you opened in the "Try" box above. It works exactly the same as the separate terminal window. Many people use only this one.

::: warn Some keyboards hide the backtick
On some non-English keyboard layouts the backtick is hard to type. If **Ctrl+`** does nothing, use the **Terminal → New Terminal** menu instead. It does exactly the same thing.
:::

### Show file extensions

A **file extension** is the ending of a file name after the last dot: `.js`, `.txt`, `.jpg`, `.pdf`. It tells the computer (and you) what kind of file it is. Node only treats a file as JavaScript if its name ends in `.js`.

Windows and macOS **hide file extensions by default**. This causes a classic problem: you create a file you think is called `hello.js`, but it is secretly called `hello.js.txt`, and Node cannot find it. Make extensions visible so you can always see the real name.

- **Windows 11:** open **File Explorer**. Click **View** in the toolbar, then **Show**, then click **File name extensions** so that it has a tick.
- **Windows 10:** open **File Explorer**. Click the **View** tab at the top, and tick **File name extensions**.
- **macOS:** open **Finder**. In the menu bar, click **Finder → Settings** (on older macOS versions, **Finder → Preferences**). Click **Advanced**, and tick **Show all filename extensions**.
- **Linux:** most file managers show extensions already. Nothing to do.

VS Code always shows the full name, extension included, which is another reason to create your code files inside VS Code rather than elsewhere.

::: exercise Level 1 — Guided · Get comfortable in VS Code
1. Open VS Code.
2. Turn on **File → Auto Save** if you have not already. Open the **File** menu again and check that it has a tick.
3. Make the editor font size bigger (or smaller) until it is comfortable to read.
4. Open the built-in terminal with **Ctrl+`** or **Terminal → New Terminal**.
5. In that terminal, type `node --version` and press **Enter**. Check that you see the same version number as before.
6. Close the terminal panel with **Ctrl+`** again (or the **×** in its top-right corner), then open it again.
:::

## Troubleshooting

### "node is not recognized" or "command not found"

On **Windows** you may see:

```text
node : The term 'node' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

On **macOS** you may see:

```text
zsh: command not found: node
```

On **Linux** the message usually contains `node: command not found` or `Command 'node' not found`.

All of these mean the same thing: **the terminal cannot find the Node program.** Try these fixes in order:

1. **Close every terminal window and open a new one.** This fixes it most of the time. Terminals only look for programs when they start, so one that was open while you installed Node does not know about it. If you are using VS Code's terminal, close **all of VS Code** and reopen it.
2. **Restart your computer.** It sounds silly, and it often works.
3. **Reinstall Node.** Download the LTS installer again and run it, keeping the default options.

Why does this happen? When you type a command, the terminal looks for a program with that name in a list of folders called the **PATH**. The Node installer adds Node's folder to the PATH, but terminals that were already open keep using the old list until they are restarted.

### Windows: "running scripts is disabled on this system"

On some Windows computers, `node --version` works but `npm --version` shows a red error like this:

```text
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

This is a Windows safety setting in PowerShell, not a problem with your install. To allow it for your own user account, type this into PowerShell and press **Enter**:

```bash
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

If it asks you to confirm, type `Y` and press **Enter**. Then close PowerShell, open a new one, and try `npm --version` again.

### Linux: nvm says "command not found"

Close the terminal and open a new one. The nvm installer adds itself to your terminal's settings, and those are only read when a terminal starts.

### "I can't find the backtick key"

Use **Terminal → New Terminal** from VS Code's menu bar instead. It does exactly the same thing.

::: mistake
**Choosing "Current" instead of "LTS".** It usually still works, but LTS is the safer choice. If you installed Current by accident, you do not need to change it for this course.

**Running `node --version` in a terminal opened before installing Node.** Always open a fresh terminal after installing anything.

**Typing `node -version` with one dash.** Node's long options use two dashes: `--version`. (A short form `node -v` also works.)

**Installing "Visual Studio" instead of "Visual Studio Code".** They are different programs. You want the one called **Visual Studio Code**, from code.visualstudio.com.

**Writing code in Word or Google Docs.** The curly quotes they insert will break your code. Always use VS Code.
:::

## Real-world uses

The tools you just installed are the real thing:

- **VS Code** is the most popular code editor in the world. Professional programmers use it at companies of every size.
- **Node.js** runs the servers behind many websites and apps you use, and the build tools that nearly all modern websites are made with.
- **npm** hosts well over two million shared packages of code. When you install `prompt-sync` in Phase 1, you will be using the same system professional teams use every day.

::: connect
**This builds on:** [What is programming, really?](#/phase-00-start-here/02-what-is-programming), which introduced the idea of code plus something that runs it. VS Code is where the code lives, and Node is what runs it.

**This unlocks:** [The terminal without fear](#/phase-00-start-here/05-the-terminal), where you learn to move around your computer by typing, and then [Your first program](#/phase-00-start-here/06-your-first-program), where VS Code and Node finally work together.
:::

::: recap
- A **code editor** edits plain text with extra help for code: colours, warnings, a file explorer and a terminal. Word and Notepad are not suitable.
- **VS Code** is the editor we use. **Node.js** runs JavaScript files. Installing Node also installs **npm**.
- Always choose the **LTS** (Long Term Support) version of Node: stable and supported for a long time.
- `node --version` and `npm --version` check the installation. A version number means success.
- Turn on **Auto Save**, make the font comfortable, and learn **Ctrl+`** for VS Code's built-in terminal.
- Turn on **file extensions** in Windows or macOS, so `hello.js.txt` can never fool you.
- "Not recognized" or "command not found" almost always means: open a **new** terminal.
:::

::: interview Why do we choose the LTS version of Node?
LTS means **Long Term Support**. It is the stable, well-tested version that gets bug fixes and security fixes for a long time. The "Current" version has the newest features, which beginners do not need and which may still change.
:::

::: interview You installed Node, but the terminal says `node` is not recognized. What is the most likely cause, and the fix?
The terminal was opened **before** Node was installed, so it does not know about Node's folder yet (it has an old copy of the PATH). Close the terminal (or all of VS Code) and open a new one. If that does not work, restart the computer, and then reinstall Node.
:::

::: interview Why should you turn on file extensions?
So that you can see the real, full name of every file. Otherwise a file that looks like `hello.js` might actually be `hello.js.txt`, which Node will not find or will not treat as JavaScript.
:::

::: checkpoint
- [ ] I installed VS Code and opened it
- [ ] I installed the LTS version of Node.js
- [ ] `node --version` printed a version number in a fresh terminal
- [ ] `npm --version` printed a version number
- [ ] I turned on Auto Save and set a comfortable font size
- [ ] I opened VS Code's built-in terminal and ran `node --version` there
- [ ] I turned on file extensions in my file explorer (or checked they were already visible)
:::

::: resources
- **VS Code documentation:** https://code.visualstudio.com/docs. Official guides, including a setup page for each operating system.
- **Node.js downloads:** https://nodejs.org/en/download. The official place to get Node, with instructions for every system.
- **javascript.info, "Code editors":** https://javascript.info/code-editors. A short explanation of what editors are and why they help.
:::
