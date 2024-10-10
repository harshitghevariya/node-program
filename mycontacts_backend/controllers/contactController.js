const asyncHandler = require("express-async-handler")
const getcontacts = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"get all contacts"})
})
const getcontact = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"get all contacts"})
})
const createContact = asyncHandler(async(req,res)=>{
    console.log("The request body is :",req.body)
    const {name,email} = req.body;
    if(!name||!email){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }
    res.status(201).json({message:"get all contacts"})
})
const updatecontact = asyncHandler(async(req,res)=>{
    res.json({message:"create contact"})
})
const deletecontact = asyncHandler(async(req,res)=>{
    res.json({message:"create contact"})
})
module.exports = {getcontact,createContact,updatecontact,deletecontact,getcontacts}