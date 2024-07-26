const express=require("express")
const Expenses = require("../models/Expenses")
const authenticate = require("../middleware/auth")

const router=express.Router()



router.post("/add",authenticate,async(req,res,next)=>{
    try {
        const {category,amount,title,description}=req.body
        const userId=req.user.id
        let amt=parseInt(amount)
        const expense=await Expenses.create({
            title:title,
            description:description,
            amount:amt,
            category:category,
            userId:userId
        })
        
        res.json(expense)
    } catch (error) {
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
    try {
        const {id:expenseId}=req.params
    const userId=req.user.id
    const expenses=await Expenses.findAll({where:{userId:userId}})
    console.log(expenses)
    const expenseToDelete = expenses.find(expense => expense.id === Number(expenseId));
    if(expenseToDelete){
        await expenseToDelete.destroy()
       return res.status(202).json("expense deleted")
    }
    res.status(201).json("expense not found")
    } catch (error) {
        res.status(404).json(error)
    }
    
})

module.exports=router