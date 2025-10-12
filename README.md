# Task Manager Monorepo

This repository contains both the **backend** (FastAPI) and **frontend** (Next.js/React) for the Task Manager project.

---

## 📁 Project Structure

```
task_manager/
  backend/        # FastAPI backend (API, DB, tests, docs)
  frontend/       # Next.js frontend app
  docker-compose.yml         # Local/dev Compose (backend, db, frontend)
  docker-compose.prod.yml    # Production Compose (backend, db, frontend)
  README.md                  # Project overview (this file)
```

---

## 🚀 Quick Start

### Local Development

1. Create `backend/.env.example` and `backend/.env.production` if they do not exist, and use them to set your secrets and DB credentials.
2. Copy `backend/.env.example` to `backend/.env` for local development.
3. Start backend, frontend, and database:

```sh
docker compose up --build
```

3. Access API docs: [http://localhost:8000/docs](http://localhost:8000/docs)
4. Access frontend: [http://localhost:3000](http://localhost:3000)

### Production

1. Copy `backend/.env.production` and set your production secrets and DB credentials.
2. Start with production settings:

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

---

## 🧪 Running Backend Tests

```sh
docker compose run --rm test
```

---

## ⚙️ Configuration

- Create `backend/.env.example` and `backend/.env.production` as templates for onboarding and production configuration.

---

## 📚 Documentation

- **Backend:** See [`backend/ReadMe.md`](backend/ReadMe.md) for API, DB, and developer details.
- **Frontend:** See [`frontend/README.md`](frontend/README.md) for setup and usage.

---
