const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const multer = require("multer")
// const productRoutes = require("./routes/productRoutes")
const port = 4000;
const app = express();

dbConnect();
//middleware
app.use(express.json())

const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".png")
        }
    })
}).single("user_file")
app.post("/api/upload",upload,(req,resp)=>{
    console.log(req.file, req.body.name)
    res.status(200).json("ok")
    resp.send("file upload")
    console.log("hello")
})

//routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
// app.use("/api/products",productRoutes)

//server port
app.listen(port,()=>{
    console.log(`Server runnig on port ${port}`)
})