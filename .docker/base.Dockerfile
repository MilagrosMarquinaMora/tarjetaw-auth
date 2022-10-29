FROM node:14-buster-slim

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    g++ make libc6-dev

RUN groupadd -g 1337 mediabyte && \
    useradd -m -d /opt/mediabyte -u 1337 -g mediabyte mediabyte

USER mediabyte

# install node modules
ADD package.json /tmp/package.json
ADD --chown=mediabyte:mediabyte .docker/dev /usr/local/bin/
RUN chmod +x /usr/local/bin/dev

WORKDIR /tmp
RUN dev yarnn
###

FROM node:14-buster-slim

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    procps vim less libpq-dev

RUN groupadd -g 1337 mediabyte && \
    useradd -m -d /opt/mediabyte -u 1337 -g mediabyte mediabyte

USER mediabyte
WORKDIR /opt/mediabyte
COPY --chown=mediabyte:mediabyte --from=0 /tmp/node_modules /opt/mediabyte/.node_modules
COPY --chown=mediabyte:mediabyte --from=0 /tmp/yarn.lock /opt/mediabyte/
ENV PATH /opt/mediabyte/.node_modules/.bin:$PATH

EXPOSE 3000

ADD --chown=mediabyte:mediabyte .docker/docker-entrypoint.sh /
ADD --chown=mediabyte:mediabyte .docker/dev /usr/local/bin/

RUN ["chmod", "+x", "/usr/local/bin/dev"]
RUN ["chmod", "+x", "/docker-entrypoint.sh"]

ENTRYPOINT ["/docker-entrypoint.sh"]
