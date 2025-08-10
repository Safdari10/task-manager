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

### Running the Project

1. Clone the repo and install dependencies (`pip install -r requirements.txt`)
2. Set up your `.env` file with database credentials and a secure `SECRET_KEY`
3. Run PostgreSQL (locally or with Docker)
4. Run Alembic migrations: `alembic upgrade head`
5. Start the app: `uvicorn app.main:app --reload`

---

### Testing

- Run tests with: `pytest`
- Tests cover registration, login, JWT protection, and all task operations

---

### Notes

- For most use cases, you do not need server-side defaults or triggers for timestamps.
- If you need database-level timestamp handling (for direct SQL), add server defaults or triggers and create a migration.
- The project follows modern best practices for FastAPI, SQLAlchemy, and Pydantic v2.
