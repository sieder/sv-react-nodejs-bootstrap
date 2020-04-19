function throwNoIndexFileError() {
  throw new Error('No index file was given to bootstrapper');
}

function throwNoResourceDirError() {
  throw new Error('No resource dir path was given to bootstrapper');
}

function sendErrorResponse(res, httpErrorCode, err) {
  return res.status(httpErrorCode).send({ message: err.message || err.toString() });
}

module.exports = {
  throwNoIndexFileError,
  throwNoResourceDirError,
  sendErrorResponse,
};
