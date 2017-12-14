const _ = require('lodash');
const axios = require('axios');
const { success, notFound, badData } = require('../../utils/body');

const { USER, GITHUB_TOKEN } = process.env;

axios.defaults.headers.common['Authorization'] = `token ${GITHUB_TOKEN}`;

const handler = ( event, context, callback ) => {
  
  const { fullName, number } = event.pathParameters;
  const { state } = JSON.parse(event.body);
  
  if(!state || (state != 'open' && state != 'closed') ){
    return callback(null, badData());
  }
  
  axios.patch(`https://api.github.com/repos/${USER}/${fullName}/issues/${number}`,{
    state
  })
    .then(({ data }) => {
      const result = _.pick(data, ['id', 'title', 'number', 'state']);
      
      callback(null, success(result));  
    })
    .catch(({ response }) => {
      callback(null, notFound(response.data));
    });
};

module.exports = { handler };
