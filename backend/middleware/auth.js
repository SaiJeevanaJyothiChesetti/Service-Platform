const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "serviceplatformsecret");
    
    User.findById(decoded.userId).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "User not found or invalid token" });
      }
      req.user = user;
      req.token = token;
      next();
    });
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Optional auth - doesn't fail if no token
const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "serviceplatformsecret");
      User.findById(decoded.userId).exec((err, user) => {
        if (!err && user) {
          req.user = user;
          req.token = token;
        }
        next();
      });
      return;
    } catch (error) {
      console.error("Optional auth error:", error.message);
    }
  }
  next();
};

module.exports = { auth, optionalAuth };
