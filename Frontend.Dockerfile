FROM node:25-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npx prettier --write "src/**/*.{ts,tsx}"
RUN npm run build

FROM node:25-slim
WORKDIR /app
COPY --from=frontend-builder /app/ /app/

ENTRYPOINT ["npm", "run", "start"]