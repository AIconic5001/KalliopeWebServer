# FROM node:22.12-alpine as builder

# # Create app directory
# RUN mkdir /app
# WORKDIR /app

# # Install app dependencies
# COPY ./package.json /app

# RUN npm install --force

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "run", "preview"]

# # # Build step #2: build an nginx container
# # FROM nginx:stable-alpine
# # COPY --from=build-step /app/build /usr/share/nginx/html
# # COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf

# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:lts AS development
# RUN mkdir /app
# WORKDIR /app
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM development AS build

RUN ["npm", "run", "build"]

FROM nginx:1.13-alpine

COPY --from=build /code/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf