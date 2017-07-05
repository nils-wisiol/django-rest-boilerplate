var frisby = require('frisby');

var URL = 'https://' + process.env.BOILERPLATE_DOMAIN;

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: {
        'Host': process.env.BOILERPLATE_DOMAIN,
        'Connection': 'close',
        'Accept': 'application/json; indent=4',
        'Authorization': '',
    }
  }
});

frisby.create('GET users')
  .get(URL + '/api/users/')
  .expectStatus(200)
.toss();
