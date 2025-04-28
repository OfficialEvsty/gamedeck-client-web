FROM certbot/certbot

RUN pip install --upgrade pip && \
    pip install certbot-dns-cloudflare

COPY certbot/cloudflare.ini /cloudflare.ini
RUN chmod 600 /cloudflare.ini

COPY certbot/renew.sh /renew.sh
RUN chmod +x /renew.sh

ENTRYPOINT ["/renew.sh"]