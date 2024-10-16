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
    const {pid,productname,price} = req.body;
    items.push({pid,productname,price})
    res.send("item added!")
})


app.get('/items/:id',(req,res)=>{
    debugger
    const update = items.find((id)=>{id == items.pid})
    res.send(update)
    console.log(update)
})

app.get("/items",(req,res)=>{
    res.json(items)
})

app.listen(4000,()=>{
    console.log("Server Start")
})