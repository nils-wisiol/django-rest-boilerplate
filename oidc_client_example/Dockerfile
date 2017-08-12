FROM python:2.7-stretch

RUN pip install Jinja2

COPY index_tmp.html /root/
COPY process_tmpl.py /root/
COPY entrypoint.sh /root/

CMD ["/root/entrypoint.sh"]
