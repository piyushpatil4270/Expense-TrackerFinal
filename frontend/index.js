let form1=document.getElementById("form1")

form1.addEventListener("submit",async(event)=>{
event.preventDefault()
const username=document.getElementById("username").value
const email=document.getElementById("email").value
const password=document.getElementById("password").value
if(email==="" || username==="" || password===""){
    alert("Please enter all fields")
    return 
}
const res=await fetch("http://localhost:5500/signin",{
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({username:username,email:email,password:password})
})


})