FROM node:alpine

WORKDIR /app/

COPY package.json package.json

COPY yarn.lock yarn.lock

COPY test/ test/

RUN yarn

COPY . .

EXPOSE 4000
