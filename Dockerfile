FROM node:25-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install && prettier --write .
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
RUN pip install --no-cache-dir .

FROM node:25-slim
RUN apt-get update && \
  apt-get install -y python3 python3-pip nginx dos2unix && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY .env.default /tmp/.env.default
COPY --from=frontend-builder /app/ /app/frontend/
COPY --from=backend-builder /app/ /app/backend/
RUN cp /tmp/.env.default /app/.env && \
    rm -f /tmp/.env.default 2>/dev/null || true

USER nobody

EXPOSE 80