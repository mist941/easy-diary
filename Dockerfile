FROM node:25-slim as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

WORKDIR /app/backend

RUN apt-get update && \
  apt-get install -y python3 python3-pip python3-venv nginx dos2unix && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*