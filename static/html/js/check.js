$(function() {

  var redirectIfClientIsAvailable = function(eidClient) {
    $('#result').html('Detected eID-Client. Forwarding...');
    setTimeout(function() {
      window.location = "../api/getTcTokenUrl?protocol=" + eidClient.protocol + "&host=" + eidClient.host;
    }, 3000);
  };

  var checker = new ClientChecker(redirectIfClientIsAvailable, 5000);
});