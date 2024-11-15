const User = require("../models/user.model.js").User;
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
  console.log(email, password);

  if (!(email && password)) {
    return res
      .status(422)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    console.log(email, password);
    if (existingUser === null) {
      return res.status(404).json({ message: "User not found" });
    }
    const encrypass = existingUser.password;
    const passRes = await bcrypt.compare(password, encrypass);
    if (!passRes) {
      return res
        .status(422)
        .json({ success: false, message: "Invalid password" });
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
      .json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const registerUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      if (existedUser.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      } else {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    await User.create({ username, email, password });

    return res
      .status(200)
      .json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// const getUserData = function (req, res) {
//   const Userid = req.params.id;
//   user.findById(Userid, function (err, UserData) {
//     if (err) {
//       console.log(err);
//       return res.status(404).json({ message: "User not found" });
//     }
//     UserData.password = undefined;
//     return res.status(200).json({ data: UserData });
//   });
// };

const getRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ message: "Refresh token missing", logout: true });
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", logout: true });
    }

    const { accesstoken } = generateTokens({ userId: user._id });

    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ logout: false });
  } catch (error) {
    console.error("Error verifying refresh token:", error);

    return res
      .status(422)
      .clearCookie("accesstoken")
      .clearCookie("refreshtoken")
      .json({ message: "Refresh token expired", logout: true });
  }
};

module.exports = { registerUser, loginUser, getRefreshToken };
