FROM node:17-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development

RUN npm install -g nodemon && npm install
RUN npm install -g jest babel-jest
RUN npm install -g enzyme enzyme-adapter-react-16 enzyme-to-json

COPY . /
CMD ["nodemon", "bin/www"]
