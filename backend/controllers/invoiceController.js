const db = require("../dbConfig/dbconfig");

const getInvoiceData = (req, res) => {
  db.query("SELECT * FROM invoices", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Database error", error: err });
    } else {
      res.json(data);
    }
  });
};

module.exports = getInvoiceData;
