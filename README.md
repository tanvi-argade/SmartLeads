# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with MERN stack + TypeScript.

## Tech Stack
- Frontend: React, TypeScript, TailwindCSS, React Query, Zustand
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose
- Auth: JWT + bcrypt
- DevOps: Docker, Docker Compose

## Features
- JWT Authentication with RBAC (Admin / Sales)
- Full Lead CRUD
- Advanced Filtering: status, source, search, sort
- Backend Pagination (10 per page)
- Debounced Search
- CSV Export (Admin only)
- Dark Mode
- Responsive UI

## Local Setup


### Prerequisites
- Node.js 20+, Docker Desktop, MongoDB (or use Docker)

### Without Docker
```bash
# Backend
cd backend
cp .env.example .env  # Fill in values
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

### With Docker
```bash
cp backend/.env.example backend/.env  # Fill in values
docker-compose up --build
```

Visit http://localhost (frontend) / http://localhost:5000 (backend)

## API Documentation

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |

### Leads
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | /api/leads | List leads (paginated, filterable) | Yes | Any |
| GET | /api/leads/:id | Single lead | Yes | Any |
| POST | /api/leads | Create lead | Yes | Any |
| PUT | /api/leads/:id | Update lead | Yes | Owner or Admin |
| DELETE | /api/leads/:id | Delete lead | Yes | Admin |
| GET | /api/leads/export/csv | Export CSV | Yes | Admin |

### Query Params for GET /api/leads
| Param | Values | Description |
|-------|--------|-------------|
| page | number | Page number (default 1) |
| limit | number | Per page (default 10) |
| status | new,contacted,qualified,lost | Filter by status |
| source | website,instagram,referral | Filter by source |
| search | string | Search name or email |
| sortOrder | asc,desc | Sort direction |

## Deployment on Render

### Backend (Web Service)
- Build Command: `cd backend && npm install && npm run build`
- Start Command: `cd backend && npm start`
- Env: Set all vars from .env.example

### Frontend (Static Site)
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`
- Env: `VITE_API_URL=https://your-backend.onrender.com/api`

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`
