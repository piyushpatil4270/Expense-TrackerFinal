const http=require("http")
const express=require("express")
const cors=require("cors")
const sequelize=require("./utils/db")
const AuthRouter=require("./routes/auth")
const Users=require("./models/Users")
const Expenses=require("./models/Expenses")
const ExpenseRouter=require("./routes/expense")

Users.hasOne(Expenses,{foreignKey:"userId"})


const app=express()
const server=http.createServer(app)



app.use(cors())
app.use(express.json())

sequelize.sync()
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.log(err))

app.use("/auth",AuthRouter)
app.use("/expense",ExpenseRouter)






server.listen(5500,()=>console.log("Server started on port 5500"))