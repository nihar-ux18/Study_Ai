const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(403).json("No token");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json("Access denied");

      next();
    } catch (err) {
      res.status(403).json("Invalid token");
    }
  };
};