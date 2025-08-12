#!/bin/sh
# Entrypoint script for Docker container, we need this because we want to ensure that the database is ready before starting the application.

# Wait for the PostgreSQL database to be available
echo "Waiting for db to be ready..."
/app/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up"

# Run Alembic migrations
echo "Running Alembic migrations..."
alembic upgrade head

# Start FastAPI app with Uvicorn
echo "Starting FastAPI app..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000