FROM node:25-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --omit=dev
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
RUN pip install --no-cache-dir .

USER nobody