const axios = require("axios");

//TODO: move baseURL to env
const axiosConfig = axios.create({
  baseURL: "https://service-deloy.eastus.cloudapp.azure.com/service",
  //   headers: { "X-Custom-Header": "foobar" },
});

export default axiosConfig;
