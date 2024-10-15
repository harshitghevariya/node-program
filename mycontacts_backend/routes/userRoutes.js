const express = require("express")
const {registerUser,loginUser,currentUser,getuser} = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)
router.route("/:id").get(getuser)
module.exports = router;