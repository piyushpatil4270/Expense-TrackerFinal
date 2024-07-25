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


app.post("/signin",async(req,res,next)=>{
   
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




server.listen(5500,()=>console.log("Server started on port 5500"))