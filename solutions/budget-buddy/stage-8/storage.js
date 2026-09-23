// storage.js — saving and loading the budget file

const fs = require("fs");

const DATA_FILE = "budget.json";

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

module.exports = { DATA_FILE, loadBudget, saveBudget };
