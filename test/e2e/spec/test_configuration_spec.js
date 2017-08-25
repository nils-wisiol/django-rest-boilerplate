var chakram = require('./../setup.js').chakram;
var expect = chakram.expect;

describe("test configuration", function () {

    it("has a hostname", function () {
        return expect(process.env.BOILERPLATE_DOMAIN).to.not.equal('');
    });

    it("knows the ipv4 prefix", function () {
        return expect(process.env.BOILERPLATE_IPV4_16PREFIX).to.not.equal('');
    });

    it("knows the ipv6 address of www", function () {
        return expect(process.env.BOILERPLATE_IPV6_ADDRESS).to.not.equal('');
    });

});
