// Budget Buddy — stage 4: tidy it into functions
const prompt = require("prompt-sync")();

// ---------- small helpers ----------

const formatMoney = (amount) => `R${amount.toFixed(2)}`;

const isValidAmount = (amount) => !Number.isNaN(amount) && amount >= 0;

// Keep asking until we get a valid amount, then hand it back
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

function showMenu() {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) Show summary");
  console.log("3) Quit");
}

function printSummary(income, total, count) {
  const left = income - total;
  console.log(`  Income:    ${formatMoney(income)}`);
  console.log(`  Spent:     ${formatMoney(total)} across ${count} expense(s)`);
  console.log(`  Left over: ${formatMoney(left)}`);
  console.log(`  Status:    ${statusFor(income, left)}`);
}

// ---------- the program ----------

function main() {
  console.log("=== Budget Buddy ===");
  const name = prompt("What is your name? ").trim() || "friend";
  const income = askForAmount("Monthly income: R");

  let total = 0;
  let count = 0;
  let biggest = 0;
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt("Choose 1, 2 or 3: ").trim();

    if (choice === "1") {
      const amount = askForAmount("Amount: R");
      total += amount;
      count++;
      biggest = Math.max(biggest, amount);
      console.log(`  Added ${formatMoney(amount)}.`);
    } else if (choice === "2") {
      printSummary(income, total, count);
    } else if (choice === "3") {
      running = false;
    } else {
      console.log("  I don't know that option. Please type 1, 2 or 3.");
    }
  }

  const average = count > 0 ? total / count : 0;
  console.log("");
  console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
  console.log(`Biggest: ${formatMoney(biggest)}  Average: ${formatMoney(average)}`);
}

main();
