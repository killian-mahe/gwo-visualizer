FROM node:apline

WORKDIR /code

COPY . .

RUN apk update
RUN npm install
RUN npm run build

ENTRYPOINT ["/bin/bash"]
