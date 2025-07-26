FROM node:22-alpine3.22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci  --production 

COPY . .
RUN npm build


FROM node:22-alpine3.22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]