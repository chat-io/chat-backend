const express = require("express");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatar");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.userId}.png`);
  },
});
const upload = multer({ storage: fileStorage });

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.put("/avatar/:userId", upload.single("avatar"), async (req, res) => {
  res.send("file uploaded");
});

app.post("/avatar/:userId", async (req, res) => {
  const avatarDirPath = path.join(__dirname, "avatar");
  fs.copyFile(
    path.join(avatarDirPath, "avatar.png"),
    path.join(avatarDirPath, `${req.params.userId}.png`),
    (err) => {
      if (err) throw err;
      res.status(200).send();
    }
  );
});

app.listen(port, () => {
  console.log(`File server is running at http://localhost:${port}`);
});
