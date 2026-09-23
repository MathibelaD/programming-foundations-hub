# Budget Buddy

A small money tracker that runs in the terminal. I built it while learning to program.

## What it does

- Asks for your name and monthly income the first time it runs
- Lets you add expenses with a description, amount and category
- Lists, removes and searches expenses
- Shows a summary, totals per category, and your top 3 biggest expenses
- Saves everything to `budget.json`, so your data is still there next time

## How to run it

You need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

```bash
pnpm install
pnpm start
```

## How the code is organised

| File | Job |
|---|---|
| `index.js` | Talks to the user: menu, questions, printing |
| `money.js` | Formatting money, checking amounts, budget status |
| `reports.js` | Calculations on the list of expenses |
| `storage.js` | Saving to and loading from `budget.json` |
