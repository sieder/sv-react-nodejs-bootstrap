const serviceFactory = require("../../core/utils/service.factory");
const ContentHubService = serviceFactory.createService(
  `http://localhost:8090/api`
);

module.exports = {
  getAssets: async (req, params) => {
    return ContentHubService.get("/contents", {
      headers: ContentHubService.extractAuthHeader(req.headers),
      params,
    });
  },
};
