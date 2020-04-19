// const cache = require('@api/utils/assets.cache');

function toAsset({
  id,
  assetType,
  title,
  description,
  heroImage,
  videoEmbed,
  videoAspectRatio,
  content,
  categories,
  authors,
  tags,
  updatedAt,
  publishedDate,
}) {
  const asset = {
    id,
    type: assetType,
    title,
    description,
    heroImage: heroImage ? heroImage.url : null,
    videoEmbed,
    videoAspectRatio,
    content,
    categories: categories || [],
    authors: authors || [],
    tags: tags || [],
    dateUpdated: updatedAt,
    datePosted: publishedDate || updatedAt,
  };

  // cache.storeAsset(asset);
  return asset;
}

module.exports = { toAsset };
