#!/bin/bash

# Start nginx
service nginx start

# Start backend
uvicorn src.main:app --host 0.0.0.0 --port 8000