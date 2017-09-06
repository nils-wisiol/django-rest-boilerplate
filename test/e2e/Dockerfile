FROM node:8

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install

COPY setup.js ./setup.js
COPY ./spec ./spec

CMD ./node_modules/mocha/bin/mocha --recursive ./spec
