// Budget Buddy — stage 7: reports with array methods
const prompt = require("prompt-sync")();
const fs = require("fs");

const DATA_FILE = "budget.json";

// ---------- small helpers ----------

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

function askForAmount(question) {
  let amount = Number(prompt(question));
  while (!isValidAmount(amount)) {
    console.log("  Please enter a number of 0 or more.");
    amount = Number(prompt(question));
  }
  return amount;
}

function askForText(question, fallback) {
  const answer = prompt(question).trim();
  return answer || fallback;
}

function statusFor(income, left) {
  if (left < 0) {
    return "OVERSPENT";
  }
  if (left > income * 0.2) {
    return "HEALTHY";
  }
  return "TIGHT";
}

function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

// ---------- saving and loading ----------

function loadBudget() {
  if (!fs.existsSync(DATA_FILE)) {
    return null;
  }
  const text = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(text);
}

function saveBudget(budget) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(budget, null, 2));
}

// ---------- calculations (now with array methods) ----------

const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);

function largestExpense(expenses) {
  if (expenses.length === 0) {
    return null;
  }
  return topExpenses(expenses, 1)[0];
}

function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});
}

const inCategory = (expenses, category) =>
  expenses.filter((expense) => expense.category === category);

// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);

const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));

// ---------- screens ----------

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Totals by category");
  console.log("6) Show one category");
  console.log("7) Top 3 biggest expenses");
  console.log("8) Search by description");
  console.log("9) Quit");
}

function describe(expense) {
  return `${expense.description} (${expense.category}): ${formatMoney(expense.amount)}`;
}

function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  expenses.forEach((expense, index) => {
    console.log(`  ${index + 1}. ${describe(expense)}`);
  });
}

function addExpense(budget) {
  const description = askForText("What was it for? ", "Something");
  const amount = askForAmount("Amount: R");
  const category = askForText("Category (e.g. food, transport): ", "other").toLowerCase();
  budget.expenses.push(createExpense(description, amount, category));
  saveBudget(budget);
  console.log(`  Added ${description} for ${formatMoney(amount)}.`);
}

function removeExpense(budget) {
  const expenses = budget.expenses;
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    saveBudget(budget);
    console.log(`  Removed ${removed[0].description}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}

function printSummary(budget) {
  const total = totalSpent(budget.expenses);
  const left = budget.income - total;
  const largest = largestExpense(budget.expenses);
  console.log(`  Income:    ${formatMoney(budget.income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${budget.expenses.length} expense(s)`);
  if (largest !== null) {
    console.log(`  Largest:   ${describe(largest)}`);
  }
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(budget.income, left)}`);
}

function printCategoryTotals(expenses) {
  const totals = categoryTotals(expenses);
  const categories = Object.keys(totals);
  if (categories.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  categories.forEach((category) => {
    console.log(`  ${category}: ${formatMoney(totals[category])}`);
  });
}

function printOneCategory(expenses) {
  const category = askForText("Which category? ", "other").toLowerCase();
  const matches = inCategory(expenses, category);
  if (matches.length === 0) {
    console.log(`  Nothing in "${category}".`);
    return;
  }
  matches.forEach((expense) => console.log(`  - ${describe(expense)}`));
  console.log(`  Total for ${category}: ${formatMoney(totalSpent(matches))}`);
}

function printTopThree(expenses) {
  const top = topExpenses(expenses, 3);
  if (top.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  top.forEach((expense, index) => console.log(`  #${index + 1} ${describe(expense)}`));
}

function printSearch(expenses) {
  const word = askForText("Search for: ", "");
  const matches = searchExpenses(expenses, word);
  if (matches.length === 0) {
    console.log(`  No expenses mention "${word}".`);
    return;
  }
  matches.map(describe).forEach((line) => console.log(`  - ${line}`));
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");

  let budget = loadBudget();
  if (budget === null) {
    const name = askForText("What is your name? ", "friend");
    const income = askForAmount("Monthly income: R");
    budget = { name: name, income: income, expenses: [] };
    saveBudget(budget);
  } else {
    console.log(`Welcome back, ${budget.name}! You have ${budget.expenses.length} saved expense(s).`);
  }

  let running = true;
  while (running) {
    showMenu();
    const choice = prompt("Choose 1-9: ").trim();

    if (choice === "1") {
      addExpense(budget);
    } else if (choice === "2") {
      listExpenses(budget.expenses);
    } else if (choice === "3") {
      removeExpense(budget);
    } else if (choice === "4") {
      printSummary(budget);
    } else if (choice === "5") {
      printCategoryTotals(budget.expenses);
    } else if (choice === "6") {
      printOneCategory(budget.expenses);
    } else if (choice === "7") {
      printTopThree(budget.expenses);
    } else if (choice === "8") {
      printSearch(budget.expenses);
    } else if (choice === "9") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 9.");
    }
  }

  console.log(`Goodbye, ${budget.name}! Your data is saved in ${DATA_FILE}.`);
}

main();
