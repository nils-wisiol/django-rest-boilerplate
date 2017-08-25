var chakram = require('./../setup.js').chakram;
var expect = chakram.expect;

describe("www/nginx", function () {

    describe('using HTTP', function () {

        [
            'http://' + process.env.BOILERPLATE_IPV4_16PREFIX + '.0.128/',
            'http://[' + process.env.BOILERPLATE_IPV6_ADDRESS + ']/',
        ].forEach(function (url) {

            describe(" on " + url, function () {

                before(function () {
                    var settings = chakram.getRequestSettings();
                    settings.baseUrl = url;
                    chakram.setRequestSettings(settings);
                });

                it("closes connections for unknown host names", function () {
                    chakram.setRequestHeader('Host', 'unused-hostname.local');
                    return expect(chakram.get('/')).to.not.have.a.body();
                });

                describe('on host www.' + process.env.BOILERPLATE_DOMAIN, function () {

                    before(function () {
                        chakram.setRequestHeader('Host', 'www.' + process.env.BOILERPLATE_DOMAIN);
                    });

                    it("redirects http to https", function () {
                        var response = chakram.get('/');
                        expect(response).to.have.status(301);
                        expect(response).to.have.header('Location', 'https://' + process.env.BOILERPLATE_DOMAIN + '/');

                        return chakram.wait();
                    });

                });

                describe('on host ' + process.env.BOILERPLATE_DOMAIN, function () {

                    before(function () {
                        chakram.setRequestHeader('Host', process.env.BOILERPLATE_DOMAIN);
                    });

                    it("redirects http to https", function () {
                        var response = chakram.get('/');
                        expect(response).to.have.status(301);
                        expect(response).to.have.header('Location', 'https://' + process.env.BOILERPLATE_DOMAIN + '/');
                        return chakram.wait();
                    });

                    it("forwards /api/ to the HTTPS API", function () {
                        var response = chakram.get('/api/');
                        expect(response).to.have.status(301);
                        expect(response).to.have.header('Location', 'https://' + process.env.BOILERPLATE_DOMAIN + '/api/');
                        return chakram.wait();
                    });

                });

            });

        });

    });

    describe('using HTTPS', function () {

        [
            'https://' + process.env.BOILERPLATE_IPV4_16PREFIX + '.0.128/',
            'https://[' + process.env.BOILERPLATE_IPV6_ADDRESS + ']/',
        ].forEach(function (url) {

            describe(" on " + url, function () {

                before(function () {
                    var settings = chakram.getRequestSettings();
                    settings.baseUrl = url;
                    chakram.setRequestSettings(settings);
                });

                it("closes connections for unknown host names", function () {
                    chakram.setRequestHeader('Host', 'unused-hostname.local');
                    return expect(chakram.get('/')).to.not.have.a.body();
                });

                describe('on host www.' + process.env.BOILERPLATE_DOMAIN, function () {

                    before(function () {
                        chakram.setRequestHeader('Host', 'www.' + process.env.BOILERPLATE_DOMAIN);
                    });

                    it("redirects to " + process.env.BOILERPLATE_DOMAIN, function () {
                        var response = chakram.get('/');
                        expect(response).to.have.status(301);
                        expect(response).to.have.header('Location', 'https://' + process.env.BOILERPLATE_DOMAIN + '/');

                        return chakram.wait();
                    });

                });

                describe('on host ' + process.env.BOILERPLATE_DOMAIN, function () {

                    before(function () {
                        chakram.setRequestHeader('Host', process.env.BOILERPLATE_DOMAIN);
                    });

                    it("forwards /api/ to the API", function () {
                        var response = chakram.get('/api/');
                        return expect(response).to.have.status(200);
                    });

                });

            });

        });

    });

});
