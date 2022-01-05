const path = require("path");
const fs = require("fs");

exports.putAvatar = async (req, res, next) => {
  res.send("file uploaded");
};

exports.postAvatar = async (req, res) => {
  const avatarDirPath = path.join(__dirname, "..", "avatar");
  fs.copyFile(
    path.join(avatarDirPath, "avatar.png"),
    path.join(avatarDirPath, `${req.params.userId}.png`),
    (err) => {
      if (err) throw err;
      res.status(200).send();
    }
  );
};
