FROM nginx:1.11

# nginx configuration and entrypoint
COPY conf /etc/nginx
COPY entrypoint.sh .
COPY autocert.sh .

# mountable ssl certificate and key directory
# (we don't want any keys in this repository)
VOLUME /etc/ssl/private

CMD ["./entrypoint.sh"]
