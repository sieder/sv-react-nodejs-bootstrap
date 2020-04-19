const sinon = require("sinon");
const { route } = require("../../common");

describe("common.route", () => {
  let mockController;

  afterEach(() => {
    sinon.restore();
  });

  describe("get", () => {
    beforeEach(() => {
      mockController = {
        get: sinon.stub().resolves("get result"),
      };
    });

    it("should return result and status code 200 when success", () => {
      const req = {};
      const res = {
        status: (_status) => {
          expect(_status).to.equal(200);
          return {
            send: (_result) => {
              expect(_result).to.equal("get result");
            },
          };
        },
      };
      expect(mockController.get.calledOnce).to.be.false();
      route.get(mockController, req, res);
      expect(mockController.get.calledOnce).to.be.true();
    });

    it("should return default error message and status code 500 when normal error thrown", () => {
      mockController = {
        get: sinon.stub().rejects(new Error()),
      };

      const req = {};
      const res = {
        status: (_status) => {
          expect(_status).to.equal(500);
          return {
            send: (_result) => {
              expect(_result.message).to.equal("Error");
            },
          };
        },
      };
      expect(mockController.get.calledOnce).to.be.false();
      route.get(mockController, req, res);
      expect(mockController.get.calledOnce).to.be.true();
    });

    it("should return custom error message and status code 500 when custom error thrown", () => {
      mockController = {
        get: sinon.stub().rejects(new Error("some exception")),
      };

      const req = {};
      const res = {
        status: (_status) => {
          expect(_status).to.equal(500);
          return {
            send: (_result) => {
              expect(_result.message).to.equal("some exception");
            },
          };
        },
      };
      expect(mockController.get.calledOnce).to.be.false();
      route.get(mockController, req, res);
      expect(mockController.get.calledOnce).to.be.true();
    });
  });

  describe("post", () => {
    beforeEach(() => {
      mockController = {
        save: sinon.stub().resolves(),
      };
    });

    it("should return status code 200 when success", () => {
      const req = {};
      const res = {
        status: (_status) => {
          expect(_status).to.equal(200);
        },
      };
      expect(mockController.save.calledOnce).to.be.false();
      route.post(mockController, req, res);
      expect(mockController.save.calledOnce).to.be.true();
    });
  });
});
