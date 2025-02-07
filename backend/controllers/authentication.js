const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  console.log("token", token);

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
