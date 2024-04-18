const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const {title, amount, category, description, date} = req.body;

  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !date) {
      return res.status(400).json({message: "All fields are required!"});
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({message: "Amount must be a positive number!"});
    }
    await income.save();
    res.status(200).json({message: "Expense Added"});
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }

  console.log(income);
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({date: -1});
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }
};

exports.getExpensesByDate = async (req, res) => {
  const {year, month} = req.query;
  console.log(month);

  const prevDateStr = `${year}-${Number(month) + 1}-01`;
  const nextDateStr = `${year}-${Number(month) + 1}-31`;
  const prevDate = new Date(prevDateStr);
  const nextDate = new Date(nextDateStr);
  console.log(prevDateStr);
  console.log(nextDateStr);

  try {
    expenses = await ExpenseSchema.find({
      date: {
        $gte: prevDate,
        $lt: nextDate,
      },
    }).sort({date: 1});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  } finally {
  }
};

exports.deleteExpense = async (req, res) => {
  const {id} = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({message: "Expense Deleted"});
    })
    .catch((err) => {
      res.status(500).json({message: "Server Error"});
    });
};
