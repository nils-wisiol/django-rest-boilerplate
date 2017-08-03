// Race conditions cannot occurs in js.
this.ClientChecker = function(callback, checkInterval) {
	var that = this;

	that.eidClients = [
		{ "url": "http://127.0.0.1:24727/eID-Client", "protocol": "http", "host": "127.0.0.1" },
		{ "url": "eid://127.0.0.1:24727/eID-Client", "protocol": "eid", "host": "127.0.0.1" },
		{ "url": "http://localhost:24727/eID-Client", "protocol": "http", "host": "127.0.0.1" },
		{ "url": "eid://localhost:24727/eID-Client", "protocol": "eid", "host": "127.0.0.1" }
	];
	var statusParam = "?Status";

	var clientIsAvailable = false;

	var checkClientStatus = function() {
		if(!clientIsAvailable) {
			$.each(that.eidClients, function(index, eidClient) {
				$.get(eidClient.url + statusParam)
					.done(function() {
						if(!clientIsAvailable) {
							clientIsAvailable = true;
							callback(eidClient);
						}
					});
			});
			setTimeout(checkClientStatus, checkInterval);
		}
	};

	// asynchronous function call
	setTimeout(checkClientStatus, 0);

	return this;
}
