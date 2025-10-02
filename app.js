const express = require ("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");

dotenv.config ({ path: "./.env" });

const app = express();

// Session setup
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  })
);

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

// Middleware
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Connect MySQL
db.connect((error) => {
  if (error) {
    console.error(" MySQL Connection Error:", error);
  } else {
    console.log(`MySQL Connected: ${process.env.DATABASE_NAME}`);
  }
});

// Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
