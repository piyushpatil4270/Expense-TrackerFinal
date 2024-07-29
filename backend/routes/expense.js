const express = require("express");
const Expenses = require("../models/Expenses");
const authenticate = require("../middleware/auth");
const Users = require("../models/Users");
const sequelize = require("../utils/db");
const moment = require("moment");
const Sequelize = require("sequelize");
const { col, literal, fn } = require("sequelize");

const router = express.Router();

router.post("/add", authenticate, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { category, amount, title, description, date } = req.body;
    const userId = req.user.id;

    const formattedDate = moment.utc(date).toDate();

    let amt = parseInt(amount);
    const user = await Users.findByPk(userId, { transaction: t });

    const expense = await Expenses.create(
      {
        title: title,
        description: description,
        amount: amt,
        category: category,
        userId: userId,
        date: formattedDate,
      },
      { transaction: t }
    );
    await user.increment("totalExpenses", { by: amt, transaction: t });
    await t.commit();
    res.json(expense);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(404).json(error);
  }
});

router.post("/all", authenticate, async (req, res, next) => {
  try {
    const { date,limit,page } = req.body;
    const userId =req.user.id;
    const skip=(page-1)*limit

    const startOfDay = moment.utc(date).startOf("day").toDate();
    const endOfDay = moment.utc(date).add(1,'day').startOf('day').toDate();
    console.log("Daily ",startOfDay," ",endOfDay)
   
    const {count,rows} = await Expenses.findAndCountAll({
      where: {
        userId: userId,
        date: {
          [Sequelize.Op.between]: [startOfDay, endOfDay],
        },
      },
      limit:parseInt(limit),
      offset:parseInt(skip)
    });
    console.log("count is ",count," expenses ",rows)
    res.status(202).json({expenses:rows,total:count});
  } catch (error) {
    console.log(error)
    res.status(404).json(error);
  }
});

router.post("/delete/:id", authenticate, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id: expenseId } = req.params;
    const userId = req.user.id;

    const expense = await Expenses.findOne(
      { where: { userId: userId, id: expenseId } },
      { transaction: t }
    );
    if (expense) {
      const amt = expense.amount;
      const user = await Users.findByPk(userId, { transaction: t });
      await user.decrement("totalExpenses", { by: amt, transaction: t });
      await expense.destroy({ transaction: t });
      t.commit();
      return res.status(202).json("expense deleted");
    }
    t.rollback();

    res.status(201).json("expense not found");
  } catch (error) {
    t.rollback();
    res.status(404).json(error);
  }
});

router.post("/getbyMonth", authenticate, async (req, res, next) => {
  try {
    const { month: date,limit,page } = req.body;
    const userId = req.user.id;
    console.log("The date is ", date);
    const startMonth = moment.utc(date).startOf("month").format("YYYY-MM-DD");
    const endMonth = moment.utc(date).add(1, "month").startOf("month").format("YYYY-MM-DD");
    console.log("start-month ", startMonth, "  ", "end-month ", endMonth);
    const skip=(page-1)*limit
    const {rows,count}=await Expenses.findAndCountAll({
        where:{
            userId:userId,
            date:{
                [Sequelize.Op.between]:[startMonth,endMonth]
            }
        },
        limit:parseInt(limit),
        offset:parseInt(skip),
       order:[literal('DATE(date)')]
    })

  
    res.status(202).json({expenses:rows,total:count});
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
