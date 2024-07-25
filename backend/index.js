const http=require("http")
const express=require("express")
const cors=require("cors")



const app=express()
const server=http.createServer(app)

app.use(cors())
app.use(express.json())


app.post("/signin",async(req,res,next)=>{
    const body=req.body
    res.json(body)

})




server.listen(5500,()=>console.log("Server started on port 5500"))