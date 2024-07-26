const http=require("http")
const express=require("express")
const cors=require("cors")
const sequelize=require("./utils/db")
const Users = require("./models/Users")



const app=express()
const server=http.createServer(app)

app.use(cors())
app.use(express.json())

sequelize.sync()
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.log(err))


app.post("/signup",async(req,res,next)=>{
   
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


app.post("/login",async(req,res,next)=>{
    const {email,password}=req.body
    const user=await Users.findOne({where:{email:email}})
    if(!user){
        return res.status(200).json("Email doesnt exist")
    }
    if(user.password!==password) return res.status(201).json("Password is incorrect")
    res.status(202).json("Login Successful")
})




server.listen(5500,()=>console.log("Server started on port 5500"))