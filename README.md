# HOPE Platform OS - Self-Maintaining Platform Architecture

A production-ready **Self-Maintaining Platform Architecture (SMPA)** that implements:

- **Runtime Truth Layer** - Database as absolute source of truth
- **Drift Detection Layer** - Real-time system monitoring
- **Repair Orchestrator** - Safe automatic fixes
- **Schema + UI Contract Enforcement** - SSDS enforced at runtime
- **Zero Trust Security** - JWT + RBAC authentication
- **Platform Command Center** - Real-time system visibility

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd platform-os

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your database credentials

# Setup database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE platform_os;
```

2. Update `.env.local`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/platform_os"
JWT_SECRET="your-super-secret-jwt-key"
```

3. Run database setup:
```bash
npm run db:push    # Create tables
npm run db:seed    # Seed initial data
```

## Architecture Overview

### Core Components

#### 1. Runtime Truth Layer (`lib/db.ts`)
- **Single source of database truth**
- Eliminates UI state, cached state, partial API state
- All data reads come directly from database

#### 2. Zero Trust Security (`core/security/auth.ts`)
- JWT-based authentication
- Role-based access control (RBAC)
- Every request validated

#### 3. Platform Truth API (`pages/api/platform/truth.ts`)
- Authoritative data endpoint
- Real-time database synchronization
- Enforces data consistency

#### 4. Command Center UI (`pages/index.tsx`)
- Real-time system visibility
- Live metrics and monitoring
- Cognitive interface for system control

### Data Models

The system uses a comprehensive **Single Source Data Schema (SSDS)**:

- **Users** - Authentication and roles
- **Members** - Recovery program members
- **Housing** - Recovery housing units
- **Donations** - Financial donations
- **Meetings** - Recovery meetings
- **Employers** - Partner employers
- **Grants** - Grant management
- **Tasks** - Task tracking
- **Missions** - Mission management
- **Audit Logs** - Complete audit trail
- **System Metrics** - Performance tracking
- **Incidents** - Issue tracking

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Platform Truth
- `GET /api/platform/truth` - Get all platform data
- `GET /api/platform/metrics` - Get system metrics

### Entity Management
- `GET /api/members` - List members
- `POST /api/members` - Create member
- `PUT /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member

*(Similar endpoints for housing, donations, meetings, etc.)*

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Testing
npm test             # Run tests
npm run test:watch   # Watch mode testing

# Linting
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Database Schema Management

The database schema is defined in `prisma/schema.prisma` and includes:

- **Type-safe models** with Prisma
- **Relationships** between entities
- **Audit logging** for all changes
- **Soft deletes** with `isActive` flags
- **Enums** for type safety

### Security Features

- **Zero Trust Authentication** - Every request validated
- **Role-Based Access Control** - ADMIN, MANAGER, VIEWER roles
- **JWT Tokens** - Secure session management
- **Audit Logging** - Complete audit trail
- **Input Validation** - Type-safe data validation

## Deployment

### Environment Setup

1. **Production Environment Variables**:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=production-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

2. **Database Migration**:
```bash
npm run db:push
npm run db:seed
```

3. **Build and Deploy**:
```bash
npm run build
npm run start
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway link
railway up
```

#### Docker
```bash
# Build image
docker build -t platform-os .

# Run container
docker run -p 3000:3000 platform-os
```

## Monitoring & Observability

### System Health Checks
- Database connectivity
- API response times
- Error rate monitoring
- User activity tracking

### Metrics Collection
- Entity counts
- User engagement
- Performance metrics
- Incident tracking

### Audit Trail
All database changes are logged to `AuditLog` table with:
- User who performed action
- Action type (CREATE, UPDATE, DELETE)
- Entity and ID affected
- Before/after values
- Timestamp

## Self-Maintaining Features

### Automatic Drift Detection
The system continuously monitors for:
- UI vs DB count mismatches
- Stale data in frontend
- Missing records
- Performance issues

### Self-Repair Capabilities
- Automatic data resynchronization
- Cache invalidation
- Error recovery
- State consistency restoration

### Runtime Schema Enforcement
- All data validated against schema
- Type safety enforced
- Invalid data blocked
- Consistent validation across all layers

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `DATABASE_URL` in `.env.local`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Authentication Issues**
   - Check `JWT_SECRET` is set
   - Verify token is not expired
   - Check user is active in database

3. **Build Errors**
   - Run `npm install` to ensure dependencies
   - Check TypeScript types with `npm run type-check`
   - Verify Prisma client generated: `npm run db:generate`

### Debug Mode

Enable debug logging:
```bash
DEBUG=platform-os:* npm run dev
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run linting and type checking
5. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create GitHub issue
- Check documentation
- Review error logs
- Contact development team

---

**Platform OS** - Where systems maintain themselves.
