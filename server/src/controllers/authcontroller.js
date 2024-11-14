const user = require("../models/user.model.js").user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateTokens = function (data) {
  const userId = data._id;
  try {
    const accesstoken = jwt.sign(
      {
        data: data,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: userId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return { accesstoken: accesstoken, refreshToken: refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async function (req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res
      .status(422)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const existingUser = await user.findOne({ email });
    console.log(email, password);
    if (existingUser === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const encrypass = existingUser.password;
    const passRes = await bcrypt.compare(password, encrypass);
    if (!passRes) {
      return res.status(422).json({
        success: false,
        message: "Invalid password",
      });
    }

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    existingUser.password = undefined;
    const { accesstoken, refreshToken } = generateTokens(existingUser);
    return res
      .status(200)
      .cookie("accesstoken", accesstoken, options)
      .cookie("refreshtoken", refreshToken, options)
      .json({
        message: "Login successful",
        user: existingUser,
      });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    const existedUser = await user.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existedUser) {
      if (existedUser.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      } else {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const newUser = await user.create({
      username: username,
      email: email,
      password: password,
    });

    return res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserData = function (req, res) {
  const Userid = req.params.id;
  user.findById(Userid, function (err, UserData) {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "User not found" });
    }
    UserData.password = undefined;
    return res.status(200).json({ data: UserData });
  });
};

const getRefreshToken = function (req, res) {
  const refreshtoken = req.cookies.refreshtoken;
  jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, userFromToken) {
      if (err) {
        console.log(err);
        return res
          .status(422)
          .clearCookie("accesstoken")
          .clearCookie("refreshtoken")
          .json({
            message: "Refresh token expired",
            logout: true,
          });
      }
      const userId = userFromToken.userId;
      user.findById(userId, function (err, existedUser) {
        if (err || existedUser === null) {
          return res.status(404).json({ logout: true });
        }
        const accesstoken = generateTokens(userFromToken).accesstoken;
        res
          .status(200)
          .cookie("accesstoken", accesstoken)
          .json({ logout: false });
      });
    }
  );
};

module.exports = { registerUser, loginUser, getUserData, getRefreshToken };
