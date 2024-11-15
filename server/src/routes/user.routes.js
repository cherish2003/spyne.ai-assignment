const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { createNewcar, deleteCar } = require("../controllers/usercontroller");
const { Verifyjwt } = require("../middlewares/verifyJWT");
const router = express.Router();

router.post("/upload", Verifyjwt, upload.array("images", 10), createNewcar);
router.delete("/delete/:carId", Verifyjwt, deleteCar);

module.exports = router;
