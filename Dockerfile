# FROM 032274180776.dkr.ecr.eu-central-1.amazonaws.com/node-images:14
FROM node:14.15-alpine AS build

ENV NODE_OPTIONS=--max_old_space_size=6144


WORKDIR /usr

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build


EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]