# syntax=docker/dockerfile:experimental
FROM node:lts-alpine3.14
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "app.js"]