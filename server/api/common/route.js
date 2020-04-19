const statusCodes = require("http-status-codes");
const { sendErrorResponse } = require("../../core/utils/error");

function get(controller, req, res) {
  return handleRequest(controller, "get", [req], res);
}

function post(controller, req, res) {
  return handleRequest(controller, "save", [req], res);
}

function put(controller, req, res) {
  return handleRequest(controller, "put", [req], res);
}

function remove(controller, req, res) {
  return handleRequest(controller, "remove", [req], res);
}

async function handleRequest(controller, method, args, res) {
  try {
    const result = await controller[method](...args);
    if (result) {
      res.status(statusCodes.OK).send(result);
    } else {
      res.status(statusCodes.OK);
    }
  } catch (err) {
    sendErrorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, err);
  }
}

module.exports = {
  handleRequest,
  get,
  post,
  put,
  remove,
};
