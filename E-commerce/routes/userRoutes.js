const express = require("express")
const verifyToken = require("../middlewares/authMiddlewares")
const authorizeRoles = require("../middlewares/roleMiddleware")
const router = express.Router();

//only admin can access this router
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"Welcome admin"});
})

//onlu user can access this router
router.get("/user",verifyToken,authorizeRoles("admin","user"),(req,res)=>{
    res.json({message:"Welcome user"})
})

module.exports = router