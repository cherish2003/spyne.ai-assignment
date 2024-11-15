const express = require("express");
const { Verifyjwt } = require("../middlewares/verifyJWT");
const {
  getUserCars,
  editCardDetails,
  searchCars,
} = require("../controllers/carcontroller");

const router = express.Router();

router.get("/me", Verifyjwt, getUserCars);
router.put("/edit/:id", Verifyjwt, editCardDetails);
router.get("/search", Verifyjwt, searchCars);

module.exports = router;
