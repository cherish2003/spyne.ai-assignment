const express = require("express");
const {
  getUserData,
  getRefreshToken,
} = require("../controllers/authcontroller");
const upload = require("../middlewares/uploadMiddleware");
const { createNewcar } = require("../controllers/usercontroller");
const { Verifyjwt } = require("../middlewares/verifyJWT");
const router = express.Router();

router.get("/:id", getUserData);
router.post("/refresh-token", getRefreshToken);
router.post("/upload", Verifyjwt, upload.array("images", 10), createNewcar);

module.exports = router;
