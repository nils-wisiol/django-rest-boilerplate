#!/bin/bash
cd /root
python process_tmpl.py || exit 1

mkdir server
mv index.html server/

cd server

python -m SimpleHTTPServer 3000
