const express = require("express")
const verifyToken = require("../middlewares/authMiddlewares")
const authorizeRoles = require("../middlewares/roleMiddleware")
const fs = require("fs")
const router = express.Router();
const Product = require("../models/productModel")
// const products  = require("./productRoutes")
// const {products,createProduct,product,updateProduct,deleteProduct} = require("../controllers/productController")

//only admin can access this router
router.get("/admin/",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const products = await Product.find()
    res.json({message:"Welcome admin",products});
    console.log("hello",products)
})
router.post("/admin/create",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const {name,image,color,price,description} = req.body;

    console.log(name,image,color,price)
 
    // if(!name||!email||!phone){
    //     res.status(400).json({message:"All fields are mandatory !"})
    // }
    // app.post("/",bodyParser.raw({type: ["image/jpeg", "image/png"], limit: "5mb"}),(req, res) => {
    //     try {
    //     console.log(req.body);
    //     fs.writeFile("image.jpeg", req.body, (error) => {
    //         if (error) {
    //         throw error;
    //         }
    //     });
    //     res.sendStatus(200);
    //     } catch (error) {
    //     res.sendStatus(500);
    //     }
    // });
    // const path = media/product.name.png
    // const temPath = req.file.image;
    // const targetPath = path.join(__dirname,"./uploads/image.png")
    // if(path.extname(req.file.originalname).toLowerCase() === ".png"){
    //     fs.
    // }

    console.log(req.file, req.body.name)
    res.status(200).json("ok")

    const product = await Product.create({
        name,
        image,
        color,
        price,
        description,
    })
    res.status(201).json(product)
})
router.get("/admin/:id",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})
router.put("/admin/update",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json({message:"successfully record update",product})
})
router.delete("/admin/delete",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){   
        res.status(404).json({message:"Product not found"})
    }
    await Product.deleteOne(product)
    res.status(200).json({message:"successfully record delete",product})
})
router.post("admin/upload",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    
})


//onlu user can access this router
router.get("/user",verifyToken,authorizeRoles("admin","user"),async(req,res)=>{
    const products = await Product.find()
    res.status(200).json({message:"Welcome user",products})
})

module.exports = router