# boilerplate www Server

Any Docker image build from these sources will provide the (nginx) HTTP server that is supposed to be the (only) frontend service for this REST API service.

## Request Handling

### Allowed Hosts

Request handling depends on the `Host` HTTP header provided by the client. First, all requests that are not for `$BOILERPLATE_DOMAIN` or www.`$BOILERPLATE_DOMAIN` will be answered with the somewhat special status code 444. (Although not being standard, this helps to easily identify those requests using the nginx log files.)

Second, all requests that are not using TLS or are not directed to `$BOILERPLATE_DOMAIN` (no `www` prefix) will be redirected to https://$BOILERPLATE_DOMAIN/, maintaining the originally requested path.

Third, requests to https://$BOILERPLATE_DOMAIN/api/ will be forwarded to the Django `api` service; all other requests will be forwarded to the nginx `static` service and handled there.

### Rate Limits

Although this image is ready to rate limit requests, **the currently set limits are ridiculously high**. Rate limiting is handled seperately for `api` and `static` requests, assuming `api` requests will usually be more expensive and should thus be limited more strictly than `static` requests. Please refer to the configuration files for exact configuration.

### TLS Certificates

To authenticate this service to clients, nginx needs SSL certificates for `$BOILERPLATE_DOMAIN` and www.`$BOILERPLATE_DOMAIN`. To provide them, place two certificate-key-pairs into the directory specified in the according environment variable (the pairs can be identical, if you have one certificate for both names, but must be provided seperately).

Note that all requests will be answered with an `HSTS` header to spread TLS usage.

## Building this Image

Upon build, all configuration files are copied into the image. Note that they still contain placeholders for variables that will only become available once a container is started. Nevertheless, updating the configuration files will make a rebuild necessary.

Note that the image will not contain any sensitive data such as certificates or even private keys.

## Starting the Container

Upon startup, all environment variable placeholders are replaced with their appropriate values, and the volume containing the certificates and private keys will be mounted.
