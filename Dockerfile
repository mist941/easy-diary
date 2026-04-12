FROM node:25-slim as frontend-builder
COPY frontend/package*.json ./
RUN npm ci --omit=dev
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim as backend-builder
COPY backend/requirements.txt ./

# RUN apt-get update && \
  # apt-get install -y python3 python3-pip python3-venv nginx dos2unix && \
  # apt-get clean && \
  # rm -rf /var/lib/apt/lists/*