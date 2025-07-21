# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY wait-for-it.sh .
COPY docker-entrypoint.sh ./
RUN apk add --no-cache bash
RUN chmod +x wait-for-it.sh
RUN npm install --omit=dev

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
