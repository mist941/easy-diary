# Stage 1: Build Frontend
FROM node:23 as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend and combine with Frontend
FROM node:23-slim
WORKDIR /app

# Install Python and required packages first
RUN apt-get update && \
  apt-get install -y python3 python3-pip python3-venv nginx && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Copy backend code and requirements first
COPY backend/ .

# Now create venv and install requirements
RUN python3 -m venv venv && \
  . ./venv/bin/activate && \
  pip3 install --no-cache-dir -r requirements.txt

# Copy built frontend and node_modules from previous stage
COPY --from=frontend-builder /app/frontend/ /app/frontend/

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Script to start all services
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 80

ENTRYPOINT ["/app/start.sh"]