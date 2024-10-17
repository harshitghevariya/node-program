const express = require("express");
// const { model } = require("mongoose");
const {register,login,resetPassword,requestPasswordReset,getusers} = require("../controllers/authController");
const { reset } = require("nodemon");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/requestpasswordreset",requestPasswordReset)
router.post("/resetpassword",resetPassword)
router.get("/users",getusers)

module.exports = router;