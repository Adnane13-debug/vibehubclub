# 🐉 VibehubClub

> A full-stack web platform for managing a university club — members, events, announcements, and more.

**Live site:** [vibehubclub.com](https://www.vibehubclub.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

---

## Overview

VibehubClub is a private club management platform built for **Vibe Hub Club** at CMC OFPPT Nouaceur, Casablanca. It allows visitors to browse public content, prospective members to apply for membership, and admins to manage the entire club from a dedicated dashboard.

The platform supports two roles:
- **Admin** — full access to dashboard, member management, events, announcements, and notifications
- **Member** — access to personal profile, event registration, MBTI test, and notifications

---

## Features

### Public (no login required)
- Browse upcoming and past events
- View event details
- Read club announcements
- Submit a contact message
- Apply for membership via a form

### Member dashboard
- Personal profile with edit support
- Register and cancel event participation
- MBTI personality test with saved results
- Notification inbox

### Admin dashboard
- Full CRUD for events (create, edit, delete, archive, publish)
- Membership request management (approve / reject)
- Member management (suspend, reactivate)
- Announcement creation and visibility control
- Notification system (individual and bulk to inactive members)
- Contact message inbox
- Export members, events, and contacts to Excel (.xlsx)
- Import past events from Excel template
- Cloudinary image upload for event posters
- Real-time stats (members, events, participations)
- Admin activity feed with notifications bell

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Redux Toolkit | State management |
| i18next | Internationalisation (FR / EN) |
| xlsx | Excel export and import |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MySQL2 | Database driver |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| helmet | Security headers |
| express-rate-limit | Brute-force protection |
| multer | File upload handling |
| cloudinary | Cloud image storage |
| resend | Transactional emails |
| dotenv | Environment variable management |

### Infrastructure
| Service | Purpose |
|---|---|
| Railway | Backend hosting + MySQL database |
| Vercel | Frontend hosting |
| Cloudflare | Domain registrar + DNS |
| Cloudinary | Image storage CDN |

---

## Project Structure

```
vibehubclub/
├── backend/
│   ├── config/
│   │   ├── db.js                  # MySQL connection pool
│   │   └── cloudinary.js          # Cloudinary configuration
│   ├── controllers/
│   │   ├── admin.controller.js    # All admin logic
│   │   ├── auth.controller.js     # Login, logout, /me
│   │   ├── member.controller.js   # Member dashboard logic
│   │   └── public.controller.js   # Public routes logic
│   ├── middleware/
│   │   ├── auth.js                # JWT verification
│   │   ├── roles.js               # Role-based access control
│   │   └── upload.js              # Multer + Cloudinary upload
│   ├── migrations/                # SQL migration files
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── member.routes.js
│   │   └── public.routes.js
│   ├── services/
│   │   └── email.service.js       # Resend email service
│   ├── tests/                     # Jest + Supertest integration tests
│   ├── server.js                  # Express app entry point
│   ├── jest.config.js
│   └── package.json
│
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── app/
    │   │   ├── providers/         # App-level providers
    │   │   └── router/            # AppRouter, ProtectedRoute, ScrollToTop
    │   ├── auth/
    │   │   └── AuthContext.jsx    # Auth state + JWT management
    │   ├── components/
    │   │   ├── admin/             # Admin dashboard components
    │   │   ├── layout/            # Navbar, Footer
    │   │   ├── profile/           # Member profile components
    │   │   └── shared/            # Reusable UI components
    │   ├── features/
    │   │   ├── about/
    │   │   ├── apply/             # Membership application form
    │   │   ├── auth/              # Login page
    │   │   ├── contact/
    │   │   ├── events/
    │   │   └── home/
    │   ├── services/
    │   │   └── api.js             # Axios instance with interceptors
    │   └── utils/
    │       └── excelExport.js     # Excel helpers
    ├── vercel.json                # Vercel SPA routing config
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL 8+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Adnane13-debug/vibehubclub.git
cd vibehubclub
```

### 2. Set up the database

Open MySQL Workbench (or any MySQL client) and run the schema file:

```sql
-- Create and select the database
CREATE DATABASE IF NOT EXISTS vibehub_db;
USE vibehub_db;

-- Then run the full schema from:
-- backend/migrations/ or the schema.sql file provided separately
```

### 3. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see Environment Variables section)
npm run dev
```

Backend runs on `http://localhost:5000`

### 4. Set up the frontend

```bash
cd frontend
npm install
# Create frontend/.env
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

### Backend `.env`

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=vibehub_db

# JWT — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_long_random_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend (for transactional emails)
RESEND_API_KEY=your_resend_api_key
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

### Frontend `.env.production`

```env
VITE_API_URL=https://api.vibehubclub.com
```

> ⚠️ Never commit `.env` or `.env.test` to GitHub. They are already in `.gitignore`.

---

## API Reference

### Auth routes — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | ❌ | Login with email + password |
| POST | `/logout` | ✅ | Logout current user |
| GET | `/me` | ✅ | Get current user data |

### Public routes — `/api/public`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/events` | ❌ | Get all published events |
| GET | `/events/:id` | ❌ | Get single event |
| GET | `/announcements` | ❌ | Get visible announcements |
| POST | `/contact` | ❌ | Submit contact message |
| POST | `/apply` | ❌ | Submit membership application |

### Member routes — `/api/member` (JWT required, role: membre)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Member dashboard data |
| GET | `/profile` | Get profile |
| PUT | `/profile` | Update profile |
| GET | `/events` | Get joined events |
| POST | `/events/:id/join` | Join an event |
| DELETE | `/events/:id/cancel` | Cancel participation |
| GET | `/notifications` | Get notifications |
| PATCH | `/notifications/:id/read` | Mark notification as read |
| POST | `/mbti/results` | Save MBTI result |
| GET | `/mbti/results` | Get MBTI result |

### Admin routes — `/api/admin` (JWT required, role: admin)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard/stats` | Dashboard statistics |
| GET/POST | `/events` | List / create events |
| PUT/DELETE | `/events/:id` | Update / delete event |
| PATCH | `/events/:id/status` | Update event status |
| GET/POST | `/announcements` | List / create announcements |
| GET | `/members` | List all members |
| PATCH | `/members/:id/status` | Update member status |
| GET | `/membership-requests` | List pending applications |
| PATCH | `/membership-requests/:id/accept` | Approve application |
| PATCH | `/membership-requests/:id/reject` | Reject application |
| POST | `/notifications` | Send notification to member |
| POST | `/notifications/inactive-members` | Notify all inactive members |
| GET | `/contacts` | List contact messages |
| POST | `/upload` | Upload image to Cloudinary |
| GET | `/export/members` | Export members to Excel |
| GET | `/export/events` | Export events to Excel |
| GET | `/export/contacts` | Export contacts to Excel |
| POST | `/import/events` | Import events from Excel |

---

## Testing

The backend has a full integration test suite using **Jest + Supertest** covering all route groups.

### Setup

Create `backend/.env.test` with your test database credentials:

```env
NODE_ENV=test
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=vibehub_db
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
TEST_ADMIN_EMAIL=admin@test.com
TEST_ADMIN_PASSWORD=TestPassword123
TEST_MEMBER_EMAIL=member@test.com
TEST_MEMBER_PASSWORD=TestPassword123
```

### Run tests

```bash
cd backend
npm test
```

### Test coverage

| File | What it tests |
|---|---|
| `auth.test.js` | Register, login, /me, logout |
| `public.test.js` | Events, announcements, contact, apply |
| `admin.test.js` | Auth guards, role guards, CRUD, validation |
| `member.test.js` | Dashboard, profile, events, MBTI, notifications |

---

## Deployment

### Services used

| Service | URL | Purpose |
|---|---|---|
| Railway | railway.app | Backend + MySQL |
| Vercel | vercel.com | Frontend |
| Cloudflare | cloudflare.com | Domain DNS |

### Branch strategy

```
main     → production (auto-deploys to Railway + Vercel)
develop  → development (work here, merge to main when ready)
```

### Deploy workflow

```bash
# Work on develop
git checkout develop
# ... make changes ...
git add .
git commit -m "feat: your feature"
git push origin develop

# When ready to deploy
git checkout main
git merge develop
git push origin main
# Railway and Vercel auto-deploy from main
```

### Railway environment variables

Set these in Railway → your backend service → Variables:

```
NODE_ENV=production
PORT=3000
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
JWT_SECRET=your_production_secret
FRONTEND_URL=https://www.vibehubclub.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
```

### Vercel environment variables

```
VITE_API_URL=https://api.vibehubclub.com
```

---

## Security

This project implements the following security measures:

- **CORS** — restricted to `vibehubclub.com` and `www.vibehubclub.com` only
- **Helmet** — 12 HTTP security headers set automatically
- **Rate limiting** — max 10 login attempts per 15 minutes per IP
- **JWT authentication** — tokens expire after 24 hours
- **bcrypt** — passwords hashed with cost factor 10
- **Input validation** — all fields have length limits and type checks
- **SQL injection prevention** — all queries use parameterized statements
- **Role-based access control** — admin and member routes strictly separated
- **Body size limit** — requests capped at 10kb
- **Trust proxy** — configured for Railway's reverse proxy
- **HTTPS** — enforced via Cloudflare + Vercel SSL certificates

---

## Contributing

1. Always work on the `develop` branch — never push directly to `main`
2. Use clear commit messages: `feat:`, `fix:`, `chore:`, `docs:`
3. Test your changes locally before merging to `main`
4. Run `npm test` in the backend before every merge

---

## License

Private project — © 2026 Vibe Hub Club. All rights reserved.

---

<div align="center">
  <strong>Built with ❤️ for Vibe Hub Club — CMC OFPPT Nouaceur, Casablanca</strong><br/>
  <a href="https://www.vibehubclub.com">vibehubclub.com</a>
</div>
