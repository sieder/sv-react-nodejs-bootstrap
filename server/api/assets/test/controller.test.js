const sinon = require('sinon');
const { controller } = require('@api/assets');
const ContentHubService = require('@root/integrations/services/content.hub.service');

describe('assets.controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('get', () => {
    function stubGetAssets(data) {
      sinon.stub(ContentHubService, 'getAssets').resolves(data);
    }

    function stubGetAsset(data) {
      sinon.stub(ContentHubService, 'getAsset').resolves(data);
    }

    it('should return assets when success', async () => {
      stubGetAssets({
        data: [
          {
            id: 'asset1',
            assetType: 'video',
            title: 'title',
            heroImage: { url: 'some image source' },
            authors: [{ id: '1', title: 'Nimesh', email: 'nimeshsinghal@airasia.com' }],
            categories: [
              { id: '1', title: 'tag1' },
              { id: '2', title: 'tag2' },
            ],
            updatedAt: '2020-02-01',
            publishedDate: '2020-02-02',
          },
        ],
      });

      const { id, type, title, heroImage, categories, dateUpdated, datePosted, authors } = (
        await controller.get({ query: '' })
      ).data[0];
      expect(id).to.equal('asset1');
      expect(type).to.equal('video');
      expect(title).to.equal('title');
      expect(heroImage).to.equal('some image source');
      expect(categories).to.have.lengthOf(2);
      const category1 = categories[0];
      expect(category1.id).to.equal('1');
      expect(category1.title).to.equal('tag1');
      const category2 = categories[1];
      expect(category2.id).to.equal('2');
      expect(category2.title).to.equal('tag2');
      expect(dateUpdated).to.equal('2020-02-01');
      expect(datePosted).to.equal('2020-02-02');
      const author = authors[0];
      expect(author.title).to.equal('Nimesh');
      expect(author.email).to.equal('nimeshsinghal@airasia.com');
    });

    it('should return assets without cover photo when success', async () => {
      stubGetAssets({
        data: [
          {
            id: 'asset1',
            assetType: 'text',
            title: 'title without image',
            updatedAt: '2020-02-01',
            publishedDate: '2020-02-02',
          },
        ],
      });

      const { id, type, title, heroImage, categories, dateUpdated, datePosted } = (
        await controller.get({ query: '' })
      ).data[0];
      expect(id).to.equal('asset1');
      expect(type).to.equal('text');
      expect(title).to.equal('title without image');
      expect(heroImage).to.be.null();
      expect(categories).to.be.empty();
      expect(dateUpdated).to.equal('2020-02-01');
      expect(datePosted).to.equal('2020-02-02');
    });

    it('should return asset when success', async () => {
      stubGetAsset({
        data: {
          id: 'asset1',
          assetType: 'video',
          title: 'title',
          heroImage: { url: 'some image source' },
          categories: [
            { id: '1', title: 'tag1' },
            { id: '2', title: 'tag2' },
          ],
          updatedAt: '2020-02-01',
        },
      });

      const { id, type, title, heroImage, categories, dateUpdated, datePosted } = await controller.getDetail({
        params: { assetId: 'asset1' },
      });
      expect(id).to.equal('asset1');
      expect(type).to.equal('video');
      expect(title).to.equal('title');
      expect(heroImage).to.equal('some image source');
      expect(categories).to.have.lengthOf(2);
      const category1 = categories[0];
      expect(category1.id).to.equal('1');
      expect(category1.title).to.equal('tag1');
      const category2 = categories[1];
      expect(category2.id).to.equal('2');
      expect(category2.title).to.equal('tag2');
      expect(dateUpdated).to.equal('2020-02-01');
      expect(datePosted).to.equal('2020-02-01');
    });
  });
});
