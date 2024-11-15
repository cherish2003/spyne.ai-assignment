const express = require("express");
const { registerUser, loginUser } = require("../controllers/authcontroller");
const router = express.Router();

router.post("/signin", loginUser);
router.post("/register", registerUser);

module.exports = router;
