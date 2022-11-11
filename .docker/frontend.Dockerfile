# First Stage: Install dependencies and Build frontend
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN nx run ui:build:production

# Second Stage: Setup command to copy app to nginx image
FROM nginx:alpine
COPY --from=builder /app/dist/apps/ui /usr/share/nginx/html
