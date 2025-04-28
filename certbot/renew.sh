#!/bin/sh

# Receive certs if theirs not found
if [ ! -f "/etc/letsencrypt/live/umaiden.ru/fullchain.pem" ]; then
  certbot certonly \
      --dns-cloudflare \
      --dns-cloudflare-credentials /cloudflare.ini \
      --server https://acme-v02.api.letsencrypt.org/directory \
      --preferred-challenge dns-01 \
      --noninteractive \
      --agree-tos \
      --email $EMAIL \
      -d $APP_DOMAIN \
      -d $OTHER_LEVEL_DOMAINS
fi

while true; do
    certbot renew --quiet --no-self-upgrade
    sleep 86400
done