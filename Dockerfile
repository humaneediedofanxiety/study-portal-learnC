# Build Stage
FROM node:22-slim AS builder

WORKDIR /app

# Install dependencies for both
COPY client/package*.json ./client/
RUN cd client && npm install

COPY server/package*.json ./server/
RUN cd server && npm install

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build Client
RUN cd client && npm run build

# Build Server
RUN cd server && npm run build

# Final Stage
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/server/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/src/models ./dist/models
# Copy the built client into the server's dist folder
COPY --from=builder /app/client/dist ./dist/client

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
