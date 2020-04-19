const axios = require("axios");
const get = require("lodash/get");

const serviceFactory = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const { response, request, message } = error;
      let errorResponse = {};
      if (response) {
        const { data, status, headers } = error.response;
        errorResponse = { data, status, headers, message };
      } else if (request) {
        // eslint-disable-next-line no-underscore-dangle
        errorResponse.message = `Request failed for ${request._currentUrl}`;
      } else {
        errorResponse.message = message;
      }
      errorResponse.stack = error.stack;
      return Promise.reject(errorResponse);
    }
  );

  return {
    getInstance: () => instance,
    extractAuthHeader: (headers) => {
      const authToken = get(headers, "authtoken", null);
      return authToken ? { Authorization: `Bearer ${authToken}` } : {};
    },
    get: (url, { headers, params } = {}) => {
      return instance.get(url, { headers, params });
    },
    post: (url, { headers, params } = {}, data) => {
      return instance.post(url, data, { headers, params });
    },
    put: (url, { headers, params } = {}, data) => {
      return instance.put(url, data, { headers, params });
    },
    delete: (url, { headers, params } = {}) => {
      return instance.delete(url, { headers, params });
    },
  };
};

module.exports = {
  createService: (baseURL) => {
    return serviceFactory(baseURL);
  },
};
