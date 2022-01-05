const express = require("express");
const router = express.Router();

const avatarController = require("../controllers/avatar");
const upload = require("../middleware/upload");

router.put("/:userId", upload.single("avatar"), avatarController.putAvatar);

router.post("/:userId", avatarController.postAvatar);

module.exports = router;
