describe("The client checker", function() {

  var checker = null;
  var spy = null;
  var result = null;

  beforeAll(function(done) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { window } = new JSDOM(`<!DOCTYPE html>`);

    global.jQuery = global.$ = require("jquery")(window); 
    global.window = window;
    global.document = window.window;

    global.ClientChecker = require('../../html/js/clientChecker.js').ClientChecker;

    var requestOK = { done: function(f) { f() } };
    var requestFail = { done: function(f) {} };
    spy = spyOn($, 'get').and.returnValues(
      requestFail, requestFail, requestFail, requestFail,
      requestOK, requestOK, requestFail, requestFail
    );

    var resultHandler = function(url) {
      result = url;
      done();
    };

    checker = ClientChecker(resultHandler, 100);
  });

  it("can be initialized", function() {
    expect(checker).not.toBe(null);
  });

  it("returns the available url", function() {
    expect(result.url).toBe("http://127.0.0.1:24727/eID-Client");
    expect(result.protocol).toBe("http");
    expect(result.host).toBe("127.0.0.1");
  });

  it("tests all urls", function() {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("http://127.0.0.1:24727/eID-Client?Status");
    expect(spy).toHaveBeenCalledWith("eid://127.0.0.1:24727/eID-Client?Status");
    expect(spy).toHaveBeenCalledWith("http://localhost:24727/eID-Client?Status");
    expect(spy).toHaveBeenCalledWith("eid://localhost:24727/eID-Client?Status");
  });

  it("tests all urls two times", function() {
    expect(spy).toHaveBeenCalledTimes(8);
  });
});
