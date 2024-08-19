const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// Middleware to verify JWT token
dotenv.config();
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid JWT token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized to access this resource" });
  }
};
