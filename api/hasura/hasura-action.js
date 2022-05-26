const axios = require("axios");

const credentials = require("./hasura-credentials");

const action = async (graphqlQuery) => {
  try {
    const response = await axios({
      url: credentials.url,
      method: "post",
      headers: credentials.headers,
      data: graphqlQuery,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

module.exports = action;
