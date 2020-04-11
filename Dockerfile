FROM node:alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src ./src
RUN yarn build
RUN yarn install --frozen-lockfile --production

FROM node:12.13.0-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

EXPOSE 4000

CMD ["node",  "src/main.js"]
