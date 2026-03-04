FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only dependency manifests first (better layer caching)
COPY package*.json ./

# Deterministic, CI-safe install
RUN npm ci

# Copy remaining source
COPY . .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]