var frisby = require('frisby');

var URL = 'https://' + process.env.BOILERPLATE_DOMAIN;

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: {
        'Host': process.env.BOILERPLATE_DOMAIN,
        'Connection': 'close',
    }
  }
});

frisby.create('GET root')
  .get(URL + '/')
  .expectStatus(200)
.toss();

frisby.create('GET admin login redirect')
  .get(URL + '/api/admin/', {followRedirect: false})
  .expectStatus(302)
.toss();

frisby.create('GET admin login redirect')
  .get(URL + '/api/admin')
  .expectStatus(200)
.toss();

frisby.create('GET admin login')
  .get(URL + '/api/admin/login/')
  .expectStatus(200)
.toss();
