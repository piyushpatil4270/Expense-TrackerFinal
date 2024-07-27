const express=require("express")

const router=express.Router()
const Users=require("../models/Users")
const authenticate=require("../middleware/auth")



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





module.exports=router