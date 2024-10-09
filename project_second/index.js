const express = require("express")
const path = require("path")

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let items = [];

app.get("/",function(req,res){
   res.sendFile(path.join(__dirname,"public","index.html"))
})

app.post('/add',(req,res)=>{
    const {userId,name,item} = req.body;
    items.push({userId,name,item})
    res.send("item added!")
})

app.get("/items",(req,res)=>{
    res.json(items)
})

app.listen(4000,()=>{
    console.log("Server Start")
})