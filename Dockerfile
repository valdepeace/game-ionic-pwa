### STAGE 1: Build ###
FROM node:12.17-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && \
    npm run build:prod
### STAGE 2: Run ###
FROM nginx:1.19.10-alpine
ENV NGINX_HOST_API=https://game-ionic-pwa-api.valdepeace.com

COPY infraestructure/docker/nginx/default.template /etc/nginx/templates/default.conf.template
COPY --from=build /usr/src/app/www /usr/share/nginx/html
