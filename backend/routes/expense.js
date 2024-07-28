const express=require("express")
const Expenses = require("../models/Expenses")
const authenticate = require("../middleware/auth")
const Users = require("../models/Users")
const sequelize = require("../utils/db")

const router=express.Router()



router.post("/add",authenticate,async(req,res,next)=>{
    const t=await sequelize.transaction()
    try {
        const {category,amount,title,description}=req.body
        const userId=req.user.id
        let amt=parseInt(amount)
        const user=await Users.findByPk(userId,{transaction:t})
       
        const expense=await Expenses.create({
            title:title,
            description:description,
            amount:amt,
            category:category,
            userId:userId
        },
        {transaction:t}
    )
        await user.increment('totalExpenses', { by:amt,transaction:t })
        await t.commit()
        res.json(expense)
    } catch (error) {
        await t.rollback()
        res.status(404).json(error)
    }
   
})



router.get("/all",authenticate,async(req,res,next)=>{
try {
    const userId=req.user.id
    const allExpenses=await Expenses.findAll({where:{userId:userId}})

    res.status(202).json(allExpenses)
} catch (error) {
    res.status(404).json(error)
}
})


router.post("/delete/:id",authenticate,async(req,res,next)=>{
    const t=await sequelize.transaction()
    try {
        const {id:expenseId}=req.params
    const userId=req.user.id
    
    const expense=await Expenses.findOne({where:{userId:userId,id:expenseId}},{transaction:t})
    if(expense){
        const amt=expense.amount
        const user=await Users.findByPk(userId,{transaction:t})
        await user.decrement('totalExpenses', { by:amt ,transaction:t})
        await expense.destroy({transaction:t})
        t.commit()
        return res.status(202).json("expense deleted")
    }
    t.rollback()
    
    
    res.status(201).json("expense not found")
    } catch (error) {
        t.rollback()
        res.status(404).json(error)
    }
    
})

module.exports=router