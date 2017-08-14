from jinja2 import FileSystemLoader, Environment
import os
import sys

client_id_key = 'CLIENT_ID'
authority_url_key = 'AUTHORITY_URL'
redirect_url_key = 'REDIRECT_URL'

def getEnv(key):
    if not key in os.environ:
        print "ERROR: Environment variable " + key + " has to be provided"
        sys.exit(-1)
    return os.environ[key]
    

client_id = getEnv(client_id_key)
authority_url = getEnv(authority_url_key)
redirect_url = getEnv(redirect_url_key)

cwd = os.path.dirname(os.path.abspath(__file__))
jinja_env = Environment(loader = FileSystemLoader(cwd))

html_file = open (cwd + "/index.html", 'w')
html_file.write (jinja_env.get_template('index_tmp.html').render(
    client_id = client_id,
    redirect_url = redirect_url,
    authority_url = authority_url
))
html_file.close()
