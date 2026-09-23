// reports.js — calculations on the list of expenses.
// Nothing in here prints or asks questions: data in, answer out.

function createExpense(description, amount, category) {
  return { description: description, amount: amount, category: category };
}

const totalSpent = (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0);

// Copy first, because sort changes the array it is called on
const topExpenses = (expenses, howMany) =>
  [...expenses].sort((a, b) => b.amount - a.amount).slice(0, howMany);

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

const searchExpenses = (expenses, word) =>
  expenses.filter((expense) => expense.description.toLowerCase().includes(word.toLowerCase()));

module.exports = {
  createExpense,
  totalSpent,
  topExpenses,
  largestExpense,
  categoryTotals,
  inCategory,
  searchExpenses,
};
