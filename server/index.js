const request = require('request');

const sortId = (n) =>{return parseInt(Math.random()*n)} 

request(`https://kitsu.io/api/edge/anime/${sortId(5000)}`, async function (error, response, body) {
  if(response.statusCode == 200){
    const res = await body.data
    console.log(res);
  }
});

