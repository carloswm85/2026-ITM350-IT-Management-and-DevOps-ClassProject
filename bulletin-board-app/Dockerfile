FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only dependency manifests first (cache layer)
COPY package*.json ./

# Deterministic install
RUN npm ci

# Copy remaining source
COPY . .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]