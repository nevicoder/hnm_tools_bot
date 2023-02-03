const axios = require("axios");

const getCrypto = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v2/cryptocurrency",
  timeout: 1000,
  headers: { "X-CMC_PRO_API_KEY": "2765465b-7b38-4058-8ec6-f12949f0dd56" },
  methods: "get",
});

module.exports = getCrypto;
