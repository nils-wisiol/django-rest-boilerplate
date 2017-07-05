# boilerplate Static HTTP Server

Any docker image build from this sources will provide a basic (nginx) HTTP service providing all files from the `html` folder to all requests forwarded to the server (currently, that's all requests to the service unless the `/api` prefix is used). This service is intended to serve an informative webpage or a javascript-implemented browser API client.

## Building this Image

Upon build, all files from the `html/` folder are copied onto the image. This image will use the currently stable `nginx` version.

## Starting the Container

Starting the container will only do the obvious: running the nginx webserver. Nothing too fancy.
