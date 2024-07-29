const express=require("express")

const router=express.Router()




router.get("/reset_password/:id",async(req,res,next)=>{
    const {id}=req.params
    const resetReq=await Reset_req.findByPk(id)
    if(resetReq && resetReq.isActive){
     return  res.render("email",{id})
    }
    res.render("error")
  
  })



module.exports=router