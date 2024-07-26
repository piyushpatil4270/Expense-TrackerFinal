const http=require("http")
const express=require("express")
const cors=require("cors")
const sequelize=require("./utils/db")
const AuthRouter=require("./routes/auth")


const app=express()
const server=http.createServer(app)

app.use(cors())
app.use(express.json())

sequelize.sync()
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.log(err))

app.use("/auth",AuthRouter)






server.listen(5500,()=>console.log("Server started on port 5500"))