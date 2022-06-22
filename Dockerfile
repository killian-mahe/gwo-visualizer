FROM node:alpine

WORKDIR /code

COPY . .

RUN apk update
RUN npm install
RUN npm run build