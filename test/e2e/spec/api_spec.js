var chakram = require("./../setup.js").chakram;
var expect = chakram.expect;

describe("API", function () {

    before(function () {
        chakram.setRequestHeader("Host", process.env.BOILERPLATE_DOMAIN);
        var settings = chakram.getRequestSettings();
        settings.baseUrl = "https://www/api";
        chakram.setRequestSettings(settings);
    });

    it("provides an index page", function () {
        var response = chakram.get("/");
        return expect(response).to.have.status(200);
    });

    describe("user endpoint", function () {

        it("returns a list of all users on GET", function () {
            var response = chakram.get("/users/");
            return expect(response).to.have.status(200);
        });

        it("creates a user on POST", function () {
            var response = chakram.post("/users/", {
                username: "e2e-test-" + require("uuid").v4(),
                password: "shit123!",
            });
            return expect(response).to.have.status(201);
        });

        describe("with an existing user", function () {

            var userSchema = {
                type: "array",
                items: {
                    "type": "object",
                    "properties": {
                        "email": {type: "string"},
                        "groups": {type: "array"},
                        "url": {type: "string"},
                        "username": {type: "string"},
                    },
                    "required": ["email", "groups", "url", "username"],
                }
            };

            var username, password;

            before(function () {
                username = "e2e-test-" + require("uuid").v4();
                password = "shit123!";
                var response = chakram.post("/users/", {
                    username: "e2e-test-" + require("uuid").v4(),
                    password: "asdf123!",
                });
                return expect(response).to.have.status(201);
            });

            it("returns a non-empty list of all users on GET", function () {
                var response = chakram.get("/users/");
                return expect(response).to.have.schema(userSchema);
            });

        });

    });

    it("provides a group list", function () {
        var response = chakram.get("/users/");
        return expect(response).to.have.status(200);
    });

});
