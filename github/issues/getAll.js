const _ = require('lodash');
const axios = require('axios');
const { success, notFound } = require('../../utils/body');

const { USER, GITHUB_TOKEN } = process.env;

axios.defaults.headers.common['Authorization'] = `token ${GITHUB_TOKEN}`;
  
const handler = ( event, context, callback ) => {
  
  const { fullName } = event.pathParameters;
  
  axios.get(`https://api.github.com/repos/${USER}/${fullName}/issues`)
    .then(({ data }) => {
      const result = _.map(data , (repo) => {
        return _.pick(repo, ['id', 'title', 'number', 'state']);
      });

      callback(null, success(result));  
    })
    .catch(({ response }) => {
      callback(null, notFound(response.data));
    });
};

module.exports = { handler };
