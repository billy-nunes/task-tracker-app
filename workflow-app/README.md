# Workflow App

A MERN-stack (MongoDB, Express, React, Node) task and workflow tracker. Work in progress.

**Current state:** user registration and login (Passport + bcrypt, session cookies) and a protected dashboard. Task features are next.

## Setup

```bash
cd workflow-app
npm install
cp .env.example .env    # then fill in MONGODB_URI and SESSION_SECRET
```

## Run

Two terminals:

```bash
npm run devStart   # Express API on http://localhost:4000 (auto-restarts with nodemon)
npm start          # React app on http://localhost:3000
```

## Tests

```bash
npm test
```

## API

| Method | Route        | Description                                           |
| ------ | ------------ | ----------------------------------------------------- |
| POST   | `/register`  | Create a user `{ username, password }`                |
| POST   | `/login`     | Log in, sets a session cookie                         |
| POST   | `/logout`    | End the session                                       |
| GET    | `/user`      | Current user, or 401 if not logged in                 |
| GET    | `/tasks`     | List your tasks (newest first)                        |
| POST   | `/tasks`     | Create a task `{ title, description?, dueDate? }`     |
| PATCH  | `/tasks/:id` | Update a task's title, description, status or dueDate |
| DELETE | `/tasks/:id` | Delete a task                                         |

## Roadmap

- [x] Task model: title, description, status, due date, owner, timestamps
- [x] Create / list / update / delete task API routes (logged-in users only)
- [ ] Dashboard: task list with status filter
- [ ] To-do checklist items within a task
- [ ] File uploads attached to a task
