const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatar");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.userId}.png`);
  },
});

const upload = multer({ storage: fileStorage });

module.exports = upload;
