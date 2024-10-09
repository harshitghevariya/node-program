const express = require("express")
const users = require("./MOCK_DATA.json")
const path = require("path")
const app = express();

app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.get("/users",(req,res)=>{
    const html = `
        <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id)
    return res.json(user)
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.listen(5000,()=>console.log("Server Start!"))