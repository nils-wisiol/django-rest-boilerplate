# boilerplate Static HTTP Server

Any Docker image build from these sources will provide a basic (nginx) HTTP service providing all files from the `html` folder to all requests forwarded to the server (currently, that's all requests to the service unless the `/api` prefix is used, per configuration of the `www` container). This service is intended to serve an informative webpage or a JavaScript-implemented browser API client.

## Building this Image

Upon build, all files from the `html/` folder are copied into the image. This image will use the currently stable `nginx` version.

## Starting the Container

Starting the container will only do the obvious: running the nginx webserver. Nothing too fancy.
