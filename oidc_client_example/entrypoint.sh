#!/bin/bash -e
cd /root
python process_tmpl.py

mkdir server
mv index.html server/

cd server

python -m SimpleHTTPServer 3000
