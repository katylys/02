FROM node:alpine

WORKDIR /app

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "start" ]
