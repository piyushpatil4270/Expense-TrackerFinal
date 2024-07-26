const express=require("express")
const Users=require("../models/Users")

const router=express.Router()


router.post("/signup",async(req,res,next)=>{
    try {
        const body=req.body
        const username=body.username
        const user=await Users.findOne({where:{username:username}})
        if(user)return res.status(202).json("User already exist")
        await Users.create({
         username:body.username,
         email:body.email,
         password:body.password
        })
        res.json("User created succesfully")
    } catch (error) {
        res.status(404).json(error)
    }
})


router.post("/login",async(req,res,next)=>{
    const {email,password}=req.body
    const user=await Users.findOne({where:{email:email}})
    if(!user){
        return res.status(401).json("Email doesnt exist")
    }
    if(user.password!==password) return res.status(404).json("Password is incorrect")
    res.status(202).json("Login Successful")
})



module.exports=router