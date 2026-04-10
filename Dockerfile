FROM node:25

WORKDIR /app/frontend

COPY frontend/package*.json ./

COPY frontend/ .

RUN npm install