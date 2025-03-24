# Stage 1: Build Frontend
FROM node:23-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend and combine with Frontend
FROM python:3.12-slim
WORKDIR /app

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Copy and install backend requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/ /app/frontend/

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Script to start both services
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 80

CMD ["/app/start.sh"]