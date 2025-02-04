FROM envoyproxy/envoy-dev:latest

RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

COPY envoy.template.yaml /etc/envoy/envoy.template.yaml

ENTRYPOINT ["/bin/sh", "-c", "envsubst < /etc/envoy/envoy.template.yaml > /etc/envoy/envoy.yaml && /usr/local/bin/envoy -c /etc/envoy/envoy.yaml"]