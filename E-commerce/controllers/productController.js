// const Product = require("../models/productModel")

// const products = async(req,res)=>{
//     const products = await Product.find()
//     res.status(200).json(products)
// }

// const createProduct = async(req,res)=>{
//     const {name,image,color,price,description} = req.body;
//     // if(!name||!email||!phone){
//     //     res.status(400).json({message:"All fields are mandatory !"})
//     // }
//     const product = await Product.create({
//         name,
//         image,
//         color,
//         price,
//         description,
//     })
//     res.status(201).json(product)
// }

// const product = async(req,res)=>{
//     const product = await Product.findById(req.params.id)
//     res.status(200).json(product)
// }

// const updateProduct = async(req,res)=>{
//     const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true}
//     )
//     res.json({message:"successfully record update",product})
// }

// const deleteProduct = async(req,res)=>{
//     const product = await Product.findById(req.params.id)
//     if(!product){   
//         res.status(404).json({message:"Product not found"})
//     }
//     await Product.deleteOne(product)
//     res.status(200).json({message:"successfully record delete",product})
// }

// module.exports = {products,createProduct,product,updateProduct,deleteProduct}