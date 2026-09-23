// Budget Buddy — stage 1: ask and calculate
const prompt = require("prompt-sync")();

console.log("=== Budget Buddy ===");

// 1. Ask the questions (prompt always gives back text, so convert amounts to numbers)
const name = prompt("What is your name? ");
const income = Number(prompt("Monthly income: R"));
const rent = Number(prompt("Rent: R"));
const food = Number(prompt("Food: R"));
const transport = Number(prompt("Transport: R"));

// 2. Do the maths
const totalExpenses = rent + food + transport;
const left = income - totalExpenses;
const percentLeft = (left / income) * 100;
const perDay = Math.floor(left / 30);

// 3. Show the results
console.log("");
console.log(`Hi ${name}, here is your month:`);
console.log(`Income:          R${income.toFixed(2)}`);
console.log(`Total expenses:  R${totalExpenses.toFixed(2)}`);
console.log(`Left over:       R${left.toFixed(2)}`);
console.log(`That is ${percentLeft.toFixed(1)}% of your income, or about R${perDay} a day.`);
