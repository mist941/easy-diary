FROM node:24-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM node:24-slim
WORKDIR /app
COPY --from=frontend-builder /app/.next/standalone/ /app/

RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]