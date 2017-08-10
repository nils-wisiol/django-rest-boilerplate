FROM debian:jessie

RUN apt-get update \
	&& apt-get install -y curl gnupg \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends bzip2 git nodejs ruby-compass \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install -g jasmine

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install

COPY ./spec ./spec

CMD jasmine
