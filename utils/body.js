const build = (statusCode, body) =>{
  return {
    statusCode,
    body: JSON.stringify(body)
  }
};

const success = body => build(200, body);
const notFound = body => build(404, body);
const badData = () =>  build(422, {
    "error": "Unprocessable Entity",
    "message": "your data is bad and you should feel bad"
  });

module.exports ={ 
  build,
  success,
  notFound,
  badData
}
