const express = require("express");
const path = require("path");
const port = 3002;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.listen(port, () => {
  console.log(`File server is running at http://localhost:${port}`);
});
