const express = require("express");
const { registerUser, loginUser } = require("../controllers/authcontroller");
const { getRefreshToken } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/signin", loginUser);
router.post("/register", registerUser);
router.post("/refresh-token", getRefreshToken);

module.exports = router;
