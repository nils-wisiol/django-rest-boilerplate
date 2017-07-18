# boilerplate MariaDB Server

Any Docker image build from these sources will provide a custom configured MariaDB service.

## Customization

To serve the REST API for the boilerplate, the MariaDB installation in this image is customized to suit our needs.

### User Setup

Upon starting a container for the first time, this image will execute the SQL scripts in `initdb.d` folder, which create a user called `api` with the password provided by environment variables. It will also create a password-free root user that can only login from the local command line, a feature useful for direct database access via

    docker-compose exec db mysql -u root
    
The only user that can login remotely is `api`.

### Database Setup

Upon starting the container for the first time, an empty database `api` will be created, with the `api` user having full access rights.

### Volume

All database values are stored on a Docker volume and are hence persistent when replacing the image or container.


## Building this Image

Database initialization scripts are copied into the image when building. Note that they will not be executed during build time, as they depend on environment variables that will only be available during run time. Any change to the initialization scripts necessitates a rebuild to become effective.

## Starting a Container

Upon first startup, database initialization scripts from `initdb.d/` are executed. Note that the first startup will take some time (~1 min).

You may notice a randomly chosen root password logged during first startup. The root user is deactivated after database initialization, so the logged password will likely not be a security issue.
