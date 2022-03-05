FROM node:14-alpine

RUN mkdir -p /home/cuts

COPY . /home/cuts

WORKDIR /home/cuts

RUN npm install

CMD [ "node","server.js" ]
