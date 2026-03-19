create articles
🔥 Why this scales well

✅ Controllers = HTTP only

✅ Services = business logic

✅ Routes = clean & readable

✅ Easy to add:

caching
validation
auth middleware
microservices later

# Dua API — Scalable Node.js Backend

A production-grade REST API for the Daily Dua Islamic app. Built for high performance, scalability, and maintainability.

---

## Architecture Overview

```
src/
├── server.js          ← Entry point — cluster mode, graceful shutdown
├── app.js             ← Express setup — middleware, routes, error handling
├── config/
│   ├── database.js    ← MongoDB connection pool
│   └── seed.js        ← Database seeder
├── routes/
│   └── index.js       ← Route definitions (auth + dua)
├── controllers/
│   ├── duaController.js   ← HTTP layer (extract → delegate → respond)
│   └── authController.js
├── services/
│   ├── duaService.js      ← Business logic + cache integration
│   ├── authService.js     ← JWT, bcrypt, refresh tokens
│   └── cache.js           ← Redis cache service (singleton)
├── models/
│   ├── Dua.js             ← MongoDB schema + indexes + statics
│   └── User.js            ← User schema + bookmark management
├── middleware/
│   ├── auth.js            ← JWT authentication + optional auth
│   ├── rateLimiter.js     ← Per-route rate limiting
│   ├── validate.js        ← Input validation (express-validator)
│   └── errorHandler.js    ← Centralized error handling
└── utils/
    └── logger.js          ← Winston structured logging
```

---

## Performance Design Decisions

### 1. Multi-Layer Caching (Redis)
| Data | TTL | Strategy |
|------|-----|----------|
| Daily Dua | 24h | Resets at midnight via date-keyed cache key |
| Category lists | 1h | Invalidated on admin update |
| User bookmarks | 30m | Invalidated on bookmark toggle |
| Search results | 10m | Query-keyed, base64 encoded |
| Categories meta | 12h | Aggregation result cached |

**Cache-aside pattern**: Read from Redis → miss → query MongoDB → populate cache.
All cache operations fail-safe (never block response on Redis error).

### 2. MongoDB Optimization
- **Connection pooling**: `maxPoolSize: 20`, `minPoolSize: 5`
- **Lean queries**: `.lean()` used everywhere (plain JS objects, ~40% faster)
- **Compound indexes**: `(category, isActive)`, `(dailySlot, isActive)`
- **Text index**: Full-text search with field weights
- **Cursor-based pagination**: Scales to millions of records (vs offset which degrades)
- **Atomic updates**: `$inc` for stats, `$addToSet` for bookmarks (race-condition safe)

### 3. Cluster Mode (Production)
Spawns one worker per CPU core. Each worker has its own event loop + connections.
Primary process auto-restarts crashed workers.

```
Primary Process
├── Worker 1 (CPU 0) → Express + MongoDB pool + Redis
├── Worker 2 (CPU 1) → Express + MongoDB pool + Redis
├── Worker 3 (CPU 2) → Express + MongoDB pool + Redis
└── Worker 4 (CPU 3) → Express + MongoDB pool + Redis
```

### 4. Request Security
- **Helmet**: Security headers (XSS, CSRF, clickjacking protection)
- **Rate limiting**: 100 req/15min general, 10 req/15min auth (failed-only)
- **Input validation**: All inputs validated with express-validator before hitting service layer
- **Body size limit**: 10kb max to prevent payload attacks
- **JWT + Refresh tokens**: Short-lived access + revocable refresh stored in DB

---

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login, get tokens |
| POST | `/api/auth/refresh` | — | Refresh access token |
| POST | `/api/auth/logout` | ✓ | Revoke refresh token |
| GET  | `/api/auth/me` | ✓ | Get current user |

### Dua
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/dua/daily` | Optional | Today's dua (cached 24h) |
| GET | `/api/dua/categories` | — | All categories with counts |
| GET | `/api/dua/category/:cat` | — | Duas by category (paginated) |
| GET | `/api/dua/search?q=` | — | Full-text search |
| GET | `/api/dua/bookmarks` | ✓ | User's bookmarks |
| GET | `/api/dua/:id` | — | Single dua by ID |
| POST | `/api/dua/bookmark` | ✓ | Toggle bookmark |
| POST | `/api/dua/:id/share` | — | Track share event |

### System
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check + process info |

---

## Pagination (Cursor-based)

```json
GET /api/dua/category/morning?limit=10&cursor=<lastId>

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "hasNextPage": true,
    "nextCursor": "674abc...",
    "count": 10
  }
}
```

Cursor is the `_id` of the last item. More scalable than `offset/limit` for large datasets.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, Redis URL, JWT secrets

# 3. Start MongoDB and Redis
# (or use Docker: docker-compose up -d)

# 4. Seed sample data
npm run db:seed

# 5. Start development server
npm run dev

# 6. Start production (with clustering)
NODE_ENV=production npm start
```

---

## Environment Variables

See `.env.example` for full documentation of all variables.

Key variables:
- `MONGODB_URI` — MongoDB connection string
- `REDIS_URL` — Redis connection URL
- `JWT_SECRET` — **Must be changed in production**
- `CLUSTER_WORKERS` — `auto` (use all CPUs) or a number

---

## Scaling Further

When outgrowing a single server:

1. **Horizontal scaling**: Deploy multiple instances behind a load balancer (Nginx/ALB)
2. **Redis Cluster**: Shard cache across multiple Redis nodes
3. **MongoDB Atlas**: Multi-region replica sets with read preferences
4. **CDN**: Cache audio files and static assets at the edge
5. **Message queue**: Replace fire-and-forget stat updates with a queue (Bull/BullMQ + Redis)
6. **Read replicas**: Route read-heavy queries (category listing, search) to secondaries