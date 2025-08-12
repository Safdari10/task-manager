## Task Manager FastAPI Project

This project is a FastAPI application for managing a personal task list with full CRUD (Create, Read, Update, Delete) functionality, user authentication, and robust validation.

---

### Features

- **User Authentication:** JWT-based login and registration
- **Authorization:** All `/tasks` endpoints are protected; users can only access their own tasks
- **User Association:** Each task is linked to its creator (user_id foreign key)
- **Pydantic v2 Models:** For request/response validation (email, password, task fields)
- **SQLAlchemy ORM:** For database models and queries
- **Alembic:** For database migrations
- **PostgreSQL:** Database (Docker/local)
- **Testing:** Pytest + FastAPI TestClient, with isolated test database and fixtures
- **Error Handling:** Friendly error messages and validation for all endpoints

---

### Requirements

- Python 3.10+
- Docker (recommended for PostgreSQL)
- PostgreSQL

---

### Authentication & Authorization

- **Register:** `POST /users/register`  
  Create a new user (email, password, first/last name)
- **Login:** `POST /users/login`  
  Authenticate and receive a JWT token
- **JWT Protection:** All `/tasks` endpoints require a valid JWT in the `Authorization` header
- **User Ownership:** Users can only access and modify their own tasks

---

### Endpoints

| Endpoint        | Method | Description                             |
| --------------- | ------ | --------------------------------------- |
| /users/register | POST   | Register a new user                     |
| /users/login    | POST   | Login and receive JWT token             |
| /tasks          | GET    | List all tasks for current user         |
| /tasks/{id}     | GET    | Get a single task (must belong to user) |
| /tasks          | POST   | Create a new task for current user      |
| /tasks/{id}     | PUT    | Update a task (must belong to user)     |
| /tasks/{id}     | DELETE | Delete a task (must belong to user)     |

---

### Task Model

Each task has:

- Title (string, required, max length enforced)
- Description (string, optional)
- Status (enum: pending, in_progress, completed, cancelled)
- created_at (timestamp, set automatically)
- updated_at (timestamp, set automatically)
- user_id (UUID, foreign key to users table)

---

### Input Validation & Error Handling

- **Email format:** Validated on registration
- **Password:** Minimum length enforced
- **Task title:** Required, max length enforced
- **Error responses:** 422 for validation errors, 401 for unauthorized, 409 for duplicates, etc.
- **Database errors:** Handled with friendly messages (e.g., user already exists)

---

### Timestamp Handling (Best Practice)

- Timestamps are managed with Python-side defaults in the SQLAlchemy model:
  - `default=utcnow` for `created_at` and `updated_at`
  - `onupdate=utcnow` for `updated_at`
- No server-side defaults are used in the model. This is best for FastAPI + SQLAlchemy apps.
- Pydantic schemas use `datetime` type for these fields, so FastAPI serializes them as ISO strings in responses.

---

### Migrations

- Use Alembic to manage schema changes.
- Only create a new migration if you change the database schema (add/remove columns, change types, etc.).
- Python-side defaults do not require a migration.

---

### Running the Project (Dockerized)

#### Local Development

1. Copy `.env` from `.env.example` and set your local DB credentials and secrets.
2. Start the stack with live code reload (host bind mount):
   ```sh
   docker compose up --build
   ```
   - Uses `docker-compose.yml` (bind mounts your code, uses `.env` for environment variables)
   - API docs are enabled by default at [http://localhost:8000/docs](http://localhost:8000/docs)

#### Production

1. Copy `.env.production` and set your production DB credentials and secrets.
2. Build and start the stack with production settings:
   ```sh
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
   ```
   - Uses `docker-compose.prod.yml` (no bind mount, only named volumes, uses `.env.production` for environment variables)
   - API docs are disabled by default for security (set `DISABLE_DOCS=1`)

#### Running Tests in Docker

- To run tests in the same environment as production:
  ```sh
  docker compose run --rm test
  ```
- This uses a dedicated test database and ensures your code is portable and CI/CD ready.

---

### Volumes and Environment Files

- **Local development:**
  - App service uses a bind mount (`- ./:/app`) for instant code reload.
  - Uses `.env` for environment variables.
- **Production:**
  - App service does not use a bind mount (code is copied at build time).
  - Uses `.env.production` for environment variables.
  - Only named volumes are used for persistent data (e.g., database).

---

### Testing

- Run tests with: `pytest`
- Tests cover registration, login, JWT protection, and all task operations

---

### Notes

- For most use cases, you do not need server-side defaults or triggers for timestamps.
- If you need database-level timestamp handling (for direct SQL), add server defaults or triggers and create a migration.
- The project follows modern best practices for FastAPI, SQLAlchemy, and Pydantic v2.
