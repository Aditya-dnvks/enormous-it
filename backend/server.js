const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
require("dotenv").config();

const db = require("./dbConfig/dbconfig");

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.use("/auth", authRoutes);
app.use("/invoices", invoiceRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server Running Succesfully in PORT ${PORT}`)
);
