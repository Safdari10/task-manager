# Task Manager Monorepo

This repository contains both the backend (FastAPI) and frontend (to be added) for the Task Manager project.

## Project Structure

```
task_manager/
  backend/        # FastAPI backend (API, DB, tests, docs)
  frontend/       # Frontend app (React, Vue, etc.)
  docker-compose.yml           # Local/dev Compose (backend, db, test)
  docker-compose.prod.yml      # Production Compose (backend, db)
  README.md      # This file
```

## Quick Start

### Local Development (Backend)

1. Copy `backend/.env.example` to `backend/.env` and set your secrets and DB credentials.
2. Start backend and db:
   ```sh
   docker compose up --build
   ```
3. API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Production

1. Copy `backend/.env.production` and set your production secrets and DB credentials.
2. Start with production settings:
   ```sh
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
   ```

### Running Backend Tests

```sh
docker compose run --rm test
```

## Backend Documentation

See [`backend/ReadMe.md`](backend/ReadMe.md) for backend API, DB, and developer details.

## Frontend

- To be added in the `frontend/` folder.
- Add a `frontend/README.md` for frontend-specific setup and usage.

## Adding More Services

- Add new services (e.g., frontend, nginx, redis) to the Compose files as needed.

---

For questions or contributions, see the backend and (future) frontend documentation.
