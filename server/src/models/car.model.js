const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  images: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
  },
  tags: {
    type: [String],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

function arrayLimit(val) {
  return val.length <= 10;
}

const Car = mongoose.model("Car", CarSchema);

module.exports = { Car };
