const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//new user create
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        res.status(200)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered!")
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log(`User created ${user}`)
    if(user){
        console.log("user",user);
        
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("User data us not valid");
    }
    res.json({message:"Register the user"})
});
const loginUser = asyncHandler(async(req,res)=>{
    res.json({message:"login user"})
});
const currentUser = asyncHandler(async(req,res)=>{
    res.json("Current user information")
});
module.exports = {registerUser,loginUser,currentUser}