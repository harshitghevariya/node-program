const Cart = require("../models/cartModel")

const cartcreate = async(req,res)=>{
    const { name, quantity, price } = req.body;
    console.log("body",req.body)
    if(!name||!quantity||!price){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const cart = await Cart.create({
        name,
        quantity,
        price,
        product_id: req.params.product_id
    })
    res.status(201).json(cart)
    console.log("cart",cart)
}

const updateCart = async(req,res)=>{
    const cart = await Cart.findById(req.params.id)
    if(!cart){
        res.status(404).json({message:"Cart not found"})
    }
    const updatecart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json(updatecart)
}

const deletecart = async(req,res)=>{
    const cart = await Cart.findById(req.params.id)
    if(!cart){
        res.status(404).json({message:"Cart not found"})
    }
    await Cart.deleteOne(cart)
    res.status(200).json(cart)
}

module.exports = {cartcreate,updateCart,deletecart}