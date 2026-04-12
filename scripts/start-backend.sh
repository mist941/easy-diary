#!/bin/bash

# Start backend in background
cd backend || echo "Failed to change directory"
source venv/bin/activate || echo "Failed to activate virtual environment"
alembic upgrade head || echo "Failed to upgrade database"
uvicorn src.main:app --host 0.0.0.0 --port 8000 || echo "Failed to start backend" &

# Wait for all background processes
wait