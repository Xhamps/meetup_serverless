const _ = require('lodash');
const axios = require('axios');
const { success, notFound } = require('../../utils/body');

const { USER, GITHUB_TOKEN } = process.env;

axios.defaults.headers.common['Authorization'] = `token ${GITHUB_TOKEN}`;

const handler = ( event, context, callback ) => {
  axios.get(`https://api.github.com/users/${USER}/repos`)
    .then(({ data }) => {
      const result = _.map(data , (repo) => {
        return _.pick(repo, ['id', 'name', 'full_name']);
      });

      callback(null, success(result));  
    })
    .catch(({ response }) => {
      callback(null, notFound(response.data));
    });
};

module.exports = { handler };
