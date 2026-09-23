// Budget Buddy — stage 2: warnings and checks
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");

// If the user just presses Enter, "" is falsy, so we fall back to "friend"
const name = prompt("What is your name? ").trim() || "friend";

let income = Number(prompt("Monthly income: R"));
if (Number.isNaN(income) || income < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  income = 0;
}

let rent = Number(prompt("Rent: R"));
if (Number.isNaN(rent) || rent < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  rent = 0;
}

let food = Number(prompt("Food: R"));
if (Number.isNaN(food) || food < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  food = 0;
}

let transport = Number(prompt("Transport: R"));
if (Number.isNaN(transport) || transport < 0) {
  console.log("  That is not a valid amount, so I will use R0.");
  transport = 0;
}

const totalExpenses = rent + food + transport;
const left = income - totalExpenses;

// Work out a status word
let status;
if (left < 0) {
  status = "overspent";
} else if (left > income * 0.2) {
  status = "healthy";
} else {
  status = "tight";
}

// Choose a label with the ternary operator
const leftLabel = left >= 0 ? "Left over:" : "Short by: ";

console.log("");
console.log(`Hi ${name}, here is your month:`);
console.log(`Income:          R${income.toFixed(2)}`);
console.log(`Total expenses:  R${totalExpenses.toFixed(2)}`);
console.log(`${leftLabel}       R${Math.abs(left).toFixed(2)}`);

if (totalExpenses > income) {
  console.log("WARNING: you are spending more than you earn!");
}

switch (status) {
  case "healthy":
    console.log("Status: HEALTHY. You keep more than 20% of your income.");
    break;
  case "tight":
    console.log("Status: TIGHT. You keep 20% or less. Watch the small stuff.");
    break;
  case "overspent":
    console.log("Status: OVERSPENT. Time to cut something.");
    break;
}
