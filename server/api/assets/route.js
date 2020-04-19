const express = require("express");
const { route: commonRouter } = require("../../api/common");
const controller = require("./controller");

const router = express.Router();

async function get(req, res) {
  commonRouter.get(controller, req, res);
}

async function getDetail(req, res) {
  commonRouter.handleRequest(controller, "getDetail", [req], res);
}

router.get("/", get);
router.get("/:assetId", getDetail);

module.exports = router;
