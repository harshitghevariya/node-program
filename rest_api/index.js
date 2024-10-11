const express = require("express")
const users = require("./MOCK_DATA.json")
const path = require("path")
const fs = require("fs")
const app = express();
// app.use(express.urlencoded({extended: false}))
// app.use(express.json())

//middleware
app.use((req,res,next)=>{
    console.log("hello middleware 1")
    // res.json({mesaage:"middleware response"})
    next()
})
app.use((req,res,next)=>{
    console.log("hello middleware 2")
    res.end("hey")
})

//show all data path
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
//show all data from html form
app.get("/users",(req,res)=>{
    const html = `
        <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})
//home page path
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
// route path get update delete
app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id)
    return res.json(user)
}).patch((req,res)=>{
    res.json({mesaage:"pending"})
})
.delete((req,res)=>{
    res.json({message:"pending"})
})
//add
app.post("/api/users",(req,res)=>{
    const body = req.body;
    users.push({...body,id: users.length +1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({mesaage:"Create"})
    })
})
//server port
app.listen(5000,()=>console.log("Server Start!"))