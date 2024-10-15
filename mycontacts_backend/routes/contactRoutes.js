const express = require("express")
const router = express.Router();
const {getcontact,createContact,updatecontact,deletecontact,getcontacts} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken)
router.route("/").get(getcontacts).post(createContact)
router.route("/:id").get(getcontact).put(updatecontact).delete(deletecontact)

module.exports = router;