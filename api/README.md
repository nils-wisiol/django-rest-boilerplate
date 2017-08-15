# boilerplate Django REST API

Any Docker image built from these sources will contain a complete Django framework running an uwsgi service.

## Customization

To serve the REST API for the boilerplate, the Django installation in this image is customized to suit our needs.

### Installed Python Environment

As it is running inside the Docker container, no Python virtual environment is needed. All dependencies are installed 'globally' using `pip`.

### Installed Django Apps

This Django installation (currently 1.11) is extended by the [Django REST Framework](http://www.django-rest-framework.org/) and [Django-OIDC-Provider](https://github.com/juanifioren/django-oidc-provider)

### Settings

The service obtains a couple of crucial settings from environment variables, such as the database password, general secret key, and the service's domain name. For details, please refer to `settings.py`.


## Building this Image

At build time, this image installs some `mysql` dependencies and tools onto the Python 3.6 Docker image, then copies the Django app source code into the image and installs the `pip` requirements. Compatible updates to any `pip` requirements are automatically installed on each build (unless the build is cached).

## Starting a Container

When started, `entrypoint.sh` is executed. It connects to the database and executes Django database migration if necessary. Afterwards, the Django uswgi service is started. Note that this service is not inteded to be exposed to the public, and doing so may yield unintended consequences.

## Django OIDC Provider

This package is installed as Django App in the `api` container. It provides all the endpoints, data and logic to add OpenID Connect capabilities.

### OpenID Connect

OpenID Connect is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user in an interoperable and REST-like manner.

### Configuration

The URLs are configured in the `urls.py` file. The app itself is registered in `settings.py`.

### Customization

The app provides some custom [settings](http://django-oidc-provider.readthedocs.io/en/v0.5.x/sections/settings.html) which has to be written in `settings.py`.
Especially `OIDC_IDTOKEN_EXPIRE` and `OIDC_IDTOKEN_PROCESSING_HOOK` could be important to adjust the IDToken.

### Use the Provider

1. Be sure you already created a superuser.
1. Once you have to create a RSA-key with `docker-compose exec api python manage.py creatersakey`.
1. Connect to `BOILERPLATE_DOMAIN/api/openid` and login as superuser.
1. Now you can create clients with the following mandatory information:
    * Name
    * Client Type
    * Response Type: Be sure the client is configured with the same type.
    * Redirect URL: The client will be redirected to this URL(s) after login.
    * JWT Algorithm
1. After the client was created a client ID was generated. The implementation of the real client must know this id.
