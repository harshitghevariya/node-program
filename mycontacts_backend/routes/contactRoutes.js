const express = require("express")
const router = express.Router();
const {getcontact,createContact,updatecontact,deletecontact,getcontacts} = require("../controllers/contactController")

router.route("/").get(getcontacts).post(createContact)
router.route("/:id").get(getcontact).put(updatecontact).delete(deletecontact)

module.exports = router;