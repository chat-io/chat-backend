const express = require("express");
require("dotenv").config();

const path = require("path");

const avatarRoutes = require("./routes/avatar");
const port = 3002;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/avatar", express.static(path.join(__dirname, "avatar")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
  );
  res.setHeader("Acess-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/avatar", avatarRoutes);

app.listen(port, () => {
  console.log(`File server is running at http://localhost:${port}`);
});
