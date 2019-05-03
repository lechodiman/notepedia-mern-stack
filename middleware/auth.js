const jwt = require("jsonwebtoken");
const config = require("config");
const secretOrKey = config.get("secretOrKey");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secretOrKey);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
