const jwt = require("jsonwebtoken");

const Verifyjwt = (req, res, next) => {
  try {
    const accesstoken = req.cookies.accesstoken;
    console.log(req.cookies);

    if (!accesstoken) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.clearCookie("accesstoken").status(498).json({
          logout: true,
        });
      }
      console.log("User from JWT:", user);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
      logout: true,
    });
    console.log(error);
  }
};

module.exports = { Verifyjwt };
