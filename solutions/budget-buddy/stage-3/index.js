// Budget Buddy — stage 3: keep going until I quit
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");
const name = prompt("What is your name? ").trim() || "friend";

// Keep asking until the income is a valid number
let income = Number(prompt("Monthly income: R"));
while (Number.isNaN(income) || income < 0) {
  console.log("  Please enter a number of 0 or more.");
  income = Number(prompt("Monthly income: R"));
}

let total = 0;     // accumulator: running total of expenses
let count = 0;     // counter: how many expenses
let biggest = 0;   // maximum: the largest expense so far
let running = true;

while (running) {
  console.log("");
  console.log("1) Add an expense");
  console.log("2) Show summary");
  console.log("3) Quit");
  const choice = prompt("Choose 1, 2 or 3: ").trim();

  if (choice === "1") {
    let amount = Number(prompt("Amount: R"));
    while (Number.isNaN(amount) || amount < 0) {
      console.log("  Please enter a number of 0 or more.");
      amount = Number(prompt("Amount: R"));
    }
    total += amount;
    count++;
    if (amount > biggest) {
      biggest = amount;
    }
    console.log(`  Added R${amount.toFixed(2)}.`);
  } else if (choice === "2") {
    const left = income - total;
    console.log(`  Income:    R${income.toFixed(2)}`);
    console.log(`  Spent:     R${total.toFixed(2)} across ${count} expense(s)`);
    console.log(`  Left over: R${left.toFixed(2)}`);
    if (left < 0) {
      console.log("  WARNING: you are spending more than you earn!");
    }
  } else if (choice === "3") {
    running = false;
  } else {
    console.log("  I don't know that option. Please type 1, 2 or 3.");
  }
}

const average = count > 0 ? total / count : 0;
console.log("");
console.log(`Goodbye, ${name}! You added ${count} expense(s).`);
console.log(`Biggest: R${biggest.toFixed(2)}  Average: R${average.toFixed(2)}`);
