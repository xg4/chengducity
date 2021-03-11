FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

CMD ["npm", "run", "start"]

VOLUME /app/data

EXPOSE 3000/tcp