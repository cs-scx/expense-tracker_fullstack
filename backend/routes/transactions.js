const {
  addExpense,
  getExpense,
  deleteExpense,
  getExpensesByDate,
} = require("../controllers/expense");

const {
  addIncome,
  getIncomes,
  deleteIncome,
  getIncomesByDate,
} = require("../controllers/income");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .get("/get-incomes-by-date", getIncomesByDate)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .get("/get-expenses-by-date", getExpensesByDate)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
