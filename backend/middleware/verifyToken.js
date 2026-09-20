const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("🔥 verifyToken RUNNING");

  try {
    const token = req.cookies?.token;

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
module.exports = verifyToken;