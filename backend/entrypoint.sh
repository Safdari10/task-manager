#!/usr/bin/env bash
# Entrypoint script for Docker container — ensure the DB is ready before starting the app.

# If the command is 'pytest', run tests immediately and skip DB wait and app startup
if [ "$1" = "pytest" ]; then
	shift
	exec pytest "$@"
fi

# Wait for the PostgreSQL database to be available
echo "Waiting for db to be ready..."
# run wait-for-it with bash to support its bash-specific syntax
bash /app/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up"

# Run Alembic migrations only when explicitly allowed (prevents accidental concurrent migrations)
if [ "${RUN_MIGRATIONS:-0}" = "1" ]; then
	echo "RUN_MIGRATIONS=1 — Running Alembic migrations..."
	alembic upgrade head
else
	echo "RUN_MIGRATIONS not set — skipping migrations"
fi

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