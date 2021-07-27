# build stage
FROM node:lts-alpine as build-stage

ENV HOME=/app

RUN mkdir -p $HOME


WORKDIR $HOME

COPY package*.json .

RUN npm install

COPY . $HOME

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]