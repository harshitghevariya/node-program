const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//all contacts show
const getcontacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})
//all contacts show by id
const getcontact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    res.status(200).json(contact)
})
//create contacts
const createContact = asyncHandler(async(req,res)=>{
    // console.log("The request body is :",req.body)
    const {name,email,phone} = req.body;
    if(!name||!email||!phone){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }
    const connects = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(connects)
})
//update contacts
const updatecontact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json(updateContact)
})
//delete contacts
const deletecontact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404);
        throw new  Error("Contact not found");
    }
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }
    await Contact.deleteOne(contacts);
    res.status(200).json(contacts)
})
module.exports = {getcontact,createContact,updatecontact,deletecontact,getcontacts}