const express = require("express");

const router = express.Router();

// any new resource api should imported here and then registered to
// router with proper api endpoint prefix (e.g /user user.route, /items items.route etc.)
const assets = require("./assets");

router.use("/assets", assets.route);

module.exports = router;
