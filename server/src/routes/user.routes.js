const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  getRefreshToken,
} = require("../controllers/authcontroller");
const router = express.Router();

router.post("/signin", loginUser);
router.post("/register", registerUser);
router.get("/user/:id", getUserData);
router.post("/refresh-token", getRefreshToken);

module.exports = router;
