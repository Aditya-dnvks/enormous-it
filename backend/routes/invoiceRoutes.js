const db = require("../dbConfig/dbconfig");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
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

router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM invoices", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Database error", error: err });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
