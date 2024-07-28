const express=require("express")

const router=express.Router()
const Users=require("../models/Users")
const authenticate=require("../middleware/auth")
const sequelize = require("../utils/db")
const Expenses = require("../models/Expenses")



router.post("/add",authenticate,async(req,res,next)=>{
    try {
        const userId=req.user.id
    const user=await Users.findByPk(userId)
    user.isPremium=true
    await user.save()
    res.status(202).json("You are a Premium user now")
    } catch (error) {
        res.status(404).json(error)
    }
    
})


router.get("/user",authenticate,async(req,res,next)=>{
    try {
        console.log("user url hitted")
        const userId=req.user.id
        const user=await Users.findByPk(userId)
        res.status(202).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})


router.get("/leaderboard",async(req,res,next)=>{
    try {
        const leaderboard=await Users.findAll({
            attributes:[
                'id','email','totalExpenses'
            ],
            
            order:[['totalExpenses','DESC']]
        })
        res.status(202).json(leaderboard)
    } catch (error) {
        res.status(404).json(error)
    }
})




module.exports=router