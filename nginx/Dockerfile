# Stage 0: build-stage, to build and compile Angular
FROM node:12.13-stretch AS build-stage

WORKDIR /app

COPY ./ng-planetary/package.json /app

RUN npm cache clean --force

RUN npm install

COPY ./ng-planetary .

COPY ./nginx.conf .

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1: based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf