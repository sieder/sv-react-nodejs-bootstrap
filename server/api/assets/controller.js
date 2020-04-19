const ContentHubService = require("../../integrations/services/content.hub.service");
const { toAsset } = require("../../api/utils/mapper.util");

async function get(req) {
  const { assetType, category, pageNum, pageSize } = req.query;
  const response = await ContentHubService.getAssets(req, {
    assetType,
    category,
    pageNum,
    pageSize,
  });

  return {
    ...response,
    data: response.data.map(toAsset),
  };
}

async function getDetail(req) {
  const { assetId } = req.params;
  const response = await ContentHubService.getAsset(req, assetId);

  return toAsset({ ...response.data });
}

module.exports = {
  get,
  getDetail,
};
