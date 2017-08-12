from jinja2 import FileSystemLoader, Environment
import os
import sys

client_id_key = 'CLIENT_ID'

# Check whether client id is provided
if not client_id_key in os.environ:
    print 'ERROR: Environment variable CLIENT_ID has to be provided'
    sys.exit(-1)

client_id = os.environ[client_id_key]

cwd = os.path.dirname(os.path.abspath(__file__))
jinja_env = Environment(loader = FileSystemLoader(cwd))

html_file = open (cwd + "/index.html", 'w')
html_file.write (jinja_env.get_template('index_tmp.html').render(client_id = client_id))
html_file.close()
