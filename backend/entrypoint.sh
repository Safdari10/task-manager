#!/usr/bin/env bash
# Entrypoint script for Docker container — ensure the DB is ready before starting the app.

# If the command is 'pytest', run tests immediately and skip DB wait and app startup
if [ "$1" = "pytest" ]; then
	shift
	exec pytest "$@"
fi

# Wait for the PostgreSQL database to be available
echo "Waiting for db to be ready..."
/app/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up"

# Run Alembic migrations
echo "Running Alembic migrations..."
alembic upgrade head

# Start FastAPI app with Uvicorn (production settings)
echo "Starting FastAPI app..."
# Use 4 workers by default, can be overridden with UVICORN_WORKERS env var
WORKERS="${UVICORN_WORKERS:-4}"
# Optionally disable docs in production by setting DISABLE_DOCS env var
if [ "$DISABLE_DOCS" = "1" ]; then
	exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers $WORKERS --no-server-header --proxy-headers --log-level info --env-file /app/.env.production --root-path / --lifespan on
else
	exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers $WORKERS --no-server-header --proxy-headers --log-level info --env-file /app/.env.production
fi