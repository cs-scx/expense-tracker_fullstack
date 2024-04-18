const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const {title, amount, category, description, date} = req.body;
  const income = IncomeSchema({
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
    res.status(200).json({message: "Income Added"});
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  } finally {
    return income;
  }
};

exports.getIncomesByDate = async (req, res) => {
  const {year, month} = req.query;
  const prevDateStr = `${year}-${Number(month) + 1}-01`;
  const nextDateStr = `${year}-${Number(month) + 1}-31`;
  const prevDate = new Date(prevDateStr);
  const nextDate = new Date(nextDateStr);

  try {
    incomes = await IncomeSchema.find({
      date: {
        $gte: prevDate,
        $lt: nextDate,
      },
    }).sort({date: 1});
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }
};

exports.getIncomes = async (req, res) => {
  let incomes;
  try {
    //incomes = await IncomeSchema.find().sort({createdAt: -1});
    incomes = await IncomeSchema.find().sort({date: -1});
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }
};

exports.deleteIncome = async (req, res) => {
  const {id} = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({message: "Income Deleted"});
    })
    .catch((err) => {
      res.status(500).json({message: "Server Error"});
    });
};
