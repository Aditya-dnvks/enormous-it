const express = require("express");
const getInvoiceData = require("../controllers/invoiceController");
const authenticateToken = require("../controllers/authentication");
const router = express.Router();

router.get("/", authenticateToken, getInvoiceData);

module.exports = router;
