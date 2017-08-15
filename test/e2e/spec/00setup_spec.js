// allow self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// This is called before all tests are run. It's not mentioned in the documentation.
// See https://stackoverflow.com/questions/10560716/global-beforeeach-in-jasmine
beforeAll(function() {
	
	
});
