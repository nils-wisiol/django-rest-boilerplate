# boilerplate Django REST API

Any Docker image built from these sources will contain a complete Django framework running an uwsgi service.

## Customization

To serve the REST API for the boilerplate, the Django installation in this image is customized to suit our needs.

### Installed Python Environment

As it is running inside the Docker container, no Python virtual environment is needed. All dependencies are installed 'globally' using `pip`.

### Installed Django Apps

This Django installation (currently 1.11) is extended by the [Django REST Framework](http://www.django-rest-framework.org/).

### Settings

The service obtains a couple of crucial settings from environment variables, such as the database password, general secret key, and the service's domain name. For details, please refer to `settings.py`.


## Building this Image

At build time, this image installs some `mysql` dependencies and tools onto the Python 3.6 Docker image, then copies the Django app source code into the image and installs the `pip` requirements. Compatible updates to any `pip` requirements are automatically installed on each build (unless the build is cached).

## Starting a Container

When started, `entrypoint.sh` is executed. It connects to the database and executes Django database migration if necessary. Afterwards, the Django uswgi service is started. Note that this service is not inteded to be exposed to the public, and doing so may yield unintended consequences.
