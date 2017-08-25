FROM node:8

RUN npm install -g chakram mocha

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install

COPY setup.js ./setup.js
COPY ./spec ./spec

CMD mocha ./spec
