FROM node:12.13-stretch

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]