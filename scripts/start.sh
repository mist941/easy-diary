#!/bin/bash

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Start nginx in background
service nginx start || handle_error "Failed to start nginx" &

# Start backend in background
source venv/bin/activate || handle_error "Failed to activate virtual environment"
alembic upgrade head || handle_error "Failed to upgrade database"
uvicorn src.main:app --host 0.0.0.0 --port 8000 || handle_error "Failed to start backend" &

# Start frontend
cd frontend || handle_error "Failed to change directory"
npm run start || handle_error "Failed to start frontend"

# Wait for all background processes
wait