const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const encryptedPass = await bcrypt.hash(this.password, 10);
      this.password = encryptedPass;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = { User };
