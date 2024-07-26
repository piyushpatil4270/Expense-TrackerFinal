const express=require("express")
const Expenses = require("../models/Expenses")

const router=express.Router()



router.post("/add",async(req,res,next)=>{
    try {
        const {category,amount,title,description}=req.body
        let amt=parseInt(amount)
        const expense=await Expenses.create({
            title:title,
            description:description,
            amount:amt,
            category:category,
            userId:1
        })
        
        res.json(expense)
    } catch (error) {
        res.status(404).json(error)
    }
   
})



router.get("/all",async(req,res,next)=>{
try {
    const allExpenses=await Expenses.findAll({where:{userId:1}})
    res.status(202).json(allExpenses)
} catch (error) {
    res.status(404).json(error)
}
})

module.exports=router