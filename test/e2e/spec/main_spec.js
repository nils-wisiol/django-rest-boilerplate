describe("Ngnix/django", function() {

	var frisby = require('frisby');
	var URL = 'https://' + process.env.BOILERPLATE_DOMAIN;

	beforeAll(function() {
		frisby.globalSetup({ // globalSetup is for ALL requests
		  request: {
			headers: {
				'Host': process.env.BOILERPLATE_DOMAIN,
				'Connection': 'close',
			}
		  }
		});
	});

	it("provides an index page", function(done) {
		frisby.get(URL + '/')
		  .expect('status', 200)
		.done(done);
	});

	it("provides an admin page", function(done) {
		frisby.get(URL + '/api/admin')
		  .expect('status', 200)
		.done(done);
	});

	it("provides an admin login page", function(done) {
		frisby.get(URL + '/api/admin/login/')
		  .expect('status', 200)
		.done(done);
	});

	it("provides an openid page", function(done) {
		frisby.get(URL + '/api/openid/')
		  .expect('status', 200)
		.done(done);
	});

	it("provides an openid login page", function(done) {
		frisby.get(URL + '/api/openid/accounts/login/')
		  .expect('status', 200)
		.done(done);
	});
});

