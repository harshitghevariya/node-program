const express = require("express")
const app = express();
const path = require("path")

app.get('/hello',(req,res)=>{
    res.send("<h1>Hello Word!<h1>")
})

app.use(express.json());
app.post("/",(req,res)=>{
    const {name} = req.body;
    res.send(`<h1>Welcome ${name}<h1>`)
})
app.get("/home",(req,res)=>{
    res.send("<h1>hello page<h1>")
})
app.get("/about",(req,res)=>{
    res.send("<h1>this is about page<h1>")
})

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"))
})
app.get("/",(req,res,next)=>{
    console.log("hello world")
    next();
    },
    (req,res)=>{
        res.send(`<div>
                    <h2>welcome to geeksforgeeks</h2>
                    <h5>tutorial on middleware</h5>
                    </div>
            `)
    },
);
app.listen(4000,()=>{
    console.log("server start!")
})

// var express = require('express');
// var app = express();
// var path = require('path');

// app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname,"index.html"));
// })

// app.listen(5000, function () {
   
//    console.log("Express App running at http://127.0.0.1:5000/");
// })