# First Stage: Install dependencies and Build backend
FROM node:18 AS builder
WORKDIR /app
COPY ./package.json ./
COPY . .
RUN npm install
RUN npx nx run api:build:production


# Second Stage: Setup command to run your app using lightweight node image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/api ./
EXPOSE 3000
CMD ["node", "main.js"]

