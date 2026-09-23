// Budget Buddy — stage 5: remember every expense
const prompt = require("prompt-sync")();

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

function statusFor(income, left) {
  if (left < 0) {
    return "OVERSPENT";
  }
  if (left > income * 0.2) {
    return "HEALTHY";
  }
  return "TIGHT";
}

// ---------- list calculations, written by hand ----------

function sumOf(amounts) {
  let total = 0;
  for (const amount of amounts) {
    total += amount;
  }
  return total;
}

function largestOf(amounts) {
  let largest = 0;
  for (const amount of amounts) {
    if (amount > largest) {
      largest = amount;
    }
  }
  return largest;
}

function averageOf(amounts) {
  if (amounts.length === 0) {
    return 0;
  }
  return sumOf(amounts) / amounts.length;
}

// ---------- screens ----------

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) List expenses");
  console.log("3) Remove an expense");
  console.log("4) Show summary");
  console.log("5) Quit");
}

function listExpenses(expenses) {
  if (expenses.length === 0) {
    console.log("  No expenses yet.");
    return;
  }
  for (let i = 0; i < expenses.length; i++) {
    console.log(`  ${i + 1}. ${formatMoney(expenses[i])}`);
  }
}

function removeExpense(expenses) {
  listExpenses(expenses);
  if (expenses.length === 0) {
    return;
  }
  const number = Number(prompt("Number to remove: "));
  const index = number - 1;   // people count from 1, arrays count from 0
  if (Number.isInteger(number) && index >= 0 && index < expenses.length) {
    const removed = expenses.splice(index, 1);
    console.log(`  Removed ${formatMoney(removed[0])}.`);
  } else {
    console.log(`  Please choose a number from 1 to ${expenses.length}.`);
  }
}

function printSummary(income, expenses) {
  const total = sumOf(expenses);
  const left = income - total;
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${expenses.length} expense(s)`);
  console.log(`  Largest:   ${formatMoney(largestOf(expenses))}`);
  console.log(`  Average:   ${formatMoney(averageOf(expenses))}`);
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");
  const name = prompt("What is your name? ").trim() || "friend";
  const income = askForAmount("Monthly income: R");
  const expenses = [];
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt("Choose 1-5: ").trim();

    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      expenses.push(amount);
      console.log(`  Added ${formatMoney(amount)}.`);
    } else if (choice === "2") {
      listExpenses(expenses);
    } else if (choice === "3") {
      removeExpense(expenses);
    } else if (choice === "4") {
      printSummary(income, expenses);
    } else if (choice === "5") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type a number from 1 to 5.");
    }
  }

  console.log(`Goodbye, ${name}!`);
}

main();
