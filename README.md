<div align="center">

# 🚀 SmartLeads Dashboard

### A full-stack Lead Management System built with MERN + TypeScript

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-2563eb?style=for-the-badge&logo=render&logoColor=white)](https://smartleads-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-SmartLeads-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tanvi-argade/SmartLeads)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

> Built as part of the **ServiceHive Full Stack Internship Assignment** by **Tanvi Argade**

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Docker Setup](#-docker-setup)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## 🧠 Overview

**SmartLeads** is a production-ready Lead Management Dashboard that allows businesses to track, filter, and manage their sales leads efficiently. Built with clean architecture, strict TypeScript, and a professional UI inspired by the ServiceHive brand.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🖥️ Frontend | [https://smartleads-frontend.onrender.com](https://smartleads-frontend.onrender.com) |

> ⚠️ **Note:** Hosted on Render free tier. Backend may take ~30 seconds to wake up on first request.


## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + TypeScript | UI Framework |
| TailwindCSS | Styling |
| TanStack Query v5 | Server state management |
| Zustand | Client state management |
| React Hook Form + Zod | Form validation |
| Axios | HTTP client |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| JWT + Bcryptjs | Authentication |
| Zod | Request validation |
| Helmet + Morgan | Security & Logging |
| Express Rate Limit | API protection |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker + Docker Compose | Containerization |
| Nginx | Frontend serving + API proxy |
| Render | Cloud deployment |

---

## ✨ Features

### 🔐 Authentication
- JWT-based login & registration
- Password hashing with bcrypt
- Protected routes with auth middleware
- Role-Based Access Control (Admin / Sales User)
- Admin role cannot be self-registered (security enforced)

### 📋 Lead Management (CRUD)
- Create, Read, Update, Delete leads
- Lead fields: Name, Email, Status, Source, Created At
- View single lead details panel

### 🔍 Advanced Filtering & Search
- Filter by **Status** (New / Contacted / Qualified / Lost)
- Filter by **Source** (Website / Instagram / Referral)
- **Search** by name or email (regex-based)
- **Sort** by Latest or Oldest
- All filters work **together simultaneously**

### ⚡ Performance
- **Debounced search** — waits 500ms before querying API
- **Backend pagination** — 10 records per page with metadata
- Proper `skip` and `limit` implementation

### 📤 CSV Export
- Export all filtered leads to CSV
- Admin-only protected feature
- Handles edge cases safely

### 🎨 UI/UX
- ServiceHive-inspired dark navy theme
- Full **Dark / Light mode** toggle
- Fully **responsive** design (mobile + tablet + desktop)
- Loading states, empty states, error states
- Toast notifications
- Smooth animations

### 🐳 Docker
- Multi-stage builds (smaller image size)
- Full stack with one command: `docker-compose up --build`
- Nginx with gzip, caching, SPA routing support
- Health checks for proper startup order

---

## 📁 Project Structure

```
SmartLeads/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── controllers/     # Auth & Lead business logic
│   │   ├── middleware/       # Auth, Role, Error, Validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express API routes
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Helper functions
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instances & API calls
│   │   ├── components/      # UI, Layout, Lead components
│   │   ├── context/         # Theme & Auth context
│   │   ├── hooks/           # useDebounce & custom hooks
│   │   ├── pages/           # Landing, Login, Register,
│   │   │                    # Dashboard, Analytics, Settings
│   │   ├── store/           # Zustand auth store
│   │   └── types/           # TypeScript interfaces
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local) or MongoDB Atlas account
- Docker Desktop (optional)

---

### Option 1 — Run Locally (without Docker)

```bash
# 1. Clone the repository
git clone https://github.com/tanvi-argade/SmartLeads.git
cd SmartLeads

# 2. Setup Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev

# 3. Setup Frontend (new terminal)
cd frontend
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`  
Backend runs at: `http://localhost:5000`

---

### Option 2 — Run with Docker (recommended)

```bash
# 1. Clone the repository
git clone https://github.com/tanvi-argade/SmartLeads.git
cd SmartLeads

# 2. Setup environment
cp backend/.env.example backend/.env
# Edit backend/.env — set MONGODB_URI=mongodb://mongo:27017/smart-leads

# 3. Build and run everything
docker-compose up --build
```

Frontend at: `http://localhost`  
Backend at: `http://localhost:5000`

```bash
# Stop containers
docker-compose down

# Stop and wipe all data
docker-compose down -v

# View backend logs
docker-compose logs -f backend
```

---

## 🔐 Environment Variables

### `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

> For Docker, use `MONGODB_URI=mongodb://mongo:27017/smart-leads`  
> For Atlas, use your full `mongodb+srv://...` connection string

---

## 📡 API Documentation

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user (sales role only) | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

### Lead Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/leads` | List leads (paginated + filterable) | ✅ | Any |
| `GET` | `/api/leads/:id` | Get single lead | ✅ | Any |
| `POST` | `/api/leads` | Create new lead | ✅ | Any |
| `PUT` | `/api/leads/:id` | Update lead | ✅ | Owner / Admin |
| `DELETE` | `/api/leads/:id` | Delete lead | ✅ | Admin only |
| `GET` | `/api/leads/export/csv` | Export leads to CSV | ✅ | Admin only |

### Query Parameters for `GET /api/leads`

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Records per page |
| `status` | string | `qualified` | Filter by status |
| `source` | string | `instagram` | Filter by source |
| `search` | string | `Rahul` | Search name or email |
| `sortOrder` | string | `desc` | `asc` or `desc` |

---

## 🐳 Docker Setup

The project uses multi-stage Docker builds for optimal image size:

```
MongoDB Container  ←→  Backend Container  ←→  Frontend (Nginx) Container
     ↓                       ↓                          ↓
 Persistent Volume       Node.js app              React SPA + API Proxy
  (mongo_data)           port 5000                    port 80
```

All services communicate on a private Docker bridge network (`leads-network`).  
Health checks ensure correct startup order: MongoDB → Backend → Frontend.

---

## ☁️ Deployment

Deployed on **Render** (free tier):

| Service | Type | Status |
|---------|------|--------|
| Frontend | Static Site | ✅ Live |
| Backend | Web Service | ✅ Live |
| Database | MongoDB Atlas | ✅ Live |

### Deploy your own:

**Backend (Render Web Service):**
- Root Directory: `backend`
- Build: `npm install && npm run build`
- Start: `node dist/index.js`
- Add all env vars from `backend/.env.example`

**Frontend (Render Static Site):**
- Root Directory: `frontend`
- Build: `npm install && npm run build`
- Publish: `dist`
- Set `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 👩‍💻 Author

**Tanvi Argade**

[![GitHub](https://img.shields.io/badge/GitHub-tanvi--argade-181717?style=flat-square&logo=github)](https://github.com/tanvi-argade)

---

<div align="center">

Built with ❤️ for the **ServiceHive Full Stack Internship Assignment**

[![Live Demo](https://img.shields.io/badge/View%20Live%20Demo-2563eb?style=for-the-badge&logo=render&logoColor=white)](https://smartleads-frontend.onrender.com)

</div>