FROM node:14.19.0-alpine3.14 as builder

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . . 

RUN npm run build

FROM node:14.19.0-alpine3.14 as runtime

WORKDIR /src

COPY --from=builder /app/node_modules /src/node_modules
COPY --from=builder /app/dist /src/dist
COPY --from=builder /app/server.js /src
COPY --from=builder /app/serverHelper.js /src
COPY --from=builder /app/.env /src

EXPOSE 7001

CMD ["node", "server.js"]
