#!/usr/bin/env bash
set -e

function cert {
    NAME_PREFIX=$1
    DOMAIN=$2
    openssl req \
        -newkey rsa:2048 \
        -nodes \
        -keyout $NAME_PREFIX.key \
        -x509 \
        -days 1\
        -out $NAME_PREFIX.cer \
        -subj "/C=DE/ST=Berlin/L=Berlin/O=django-rest-boilerplate/OU=autocert/CN=$DOMAIN"
}

cd $1
pwd

for DOMAIN in ${BOILERPLATE_DOMAIN} www.${BOILERPLATE_DOMAIN} ; do

    if [ ! -f ${DOMAIN}.cer ] || [ ! -f ${DOMAIN}.key ] ; then
        rm -f ${DOMAIN}.cer ${DOMAIN}.key
        cert ${DOMAIN} "${DOMAIN}"
    fi

done

ls -lah
