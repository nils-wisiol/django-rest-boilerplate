#!/bin/bash -e

# generate certs
mkdir -p /autocert/
./autocert.sh /autocert/

# link certs
if [ ! -f /etc/ssl/private/${BOILERPLATE_DOMAIN}.cer ] ||
   [ ! -f /etc/ssl/private/${BOILERPLATE_DOMAIN}.key ] ||
   [ ! -f /etc/ssl/private/www.${BOILERPLATE_DOMAIN}.cer ] ||
   [ ! -f /etc/ssl/private/www.${BOILERPLATE_DOMAIN}.key ] ; then
    export CERT_PATH=/autocert/
    echo "############################################################"
    echo "WARNING some certificate files are missing, using"
    echo "        self-signed certificates"
    echo "############################################################"
    echo "your certificates:"
    ls -lh /etc/ssl/private/
else
    export CERT_PATH=/etc/ssl/private/
fi

# replace environment references in config files
./etc/nginx/sites-available/envreplace.sh

# start nginx
nginx -g "daemon off;"
