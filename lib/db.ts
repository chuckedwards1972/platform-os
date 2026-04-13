// Database Client - Production Database Connection
// This is the single source of database truth

import { PrismaClient } from '@prisma/client';

// Global Prisma instance to avoid multiple connections in development.
// The client is stored here once created so it survives hot-reloads in dev.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initializer — creates the PrismaClient only on first access.
// This prevents an eager connection attempt at module load time, which
// would cause the app to time out during startup if the database isn't
// immediately reachable.
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return globalForPrisma.prisma;
}

// Proxy that forwards every property access to the lazily-created client.
// All existing call sites (db.user, db.session, db.$queryRaw, …) continue
// to work without modification.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrismaClient() as any)[prop];
  },
});

// Connection health check
export async function checkDatabaseHealth() {
  try {
    await db.$queryRaw`SELECT 1`;
    return { healthy: true, timestamp: new Date() };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { healthy: false, error: error.message, timestamp: new Date() };
  }
}

// Get database metrics
export async function getDatabaseMetrics() {
  try {
    const [
      memberCount,
      housingCount,
      donationCount,
      meetingCount,
      employerCount,
      grantCount,
      taskCount,
      missionCount,
      userCount
    ] = await Promise.all([
      db.member.count({ where: { isActive: true } }),
      db.housing.count({ where: { isActive: true } }),
      db.donation.count({ where: { isActive: true } }),
      db.meeting.count({ where: { isActive: true } }),
      db.employer.count({ where: { isActive: true } }),
      db.grant.count({ where: { isActive: true } }),
      db.task.count(),
      db.mission.count({ where: { isActive: true } }),
      db.user.count({ where: { isActive: true } })
    ]);

    return {
      members: memberCount,
      housing: housingCount,
      donations: donationCount,
      meetings: meetingCount,
      employers: employerCount,
      grants: grantCount,
      tasks: taskCount,
      missions: missionCount,
      users: userCount,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Failed to get database metrics:', error);
    throw error;
  }
}

// Platform truth API - Get all data from database
export async function getPlatformTruth() {
  try {
    const [
      members,
      housing,
      donations,
      meetings,
      employers,
      grants,
      tasks,
      missions
    ] = await Promise.all([
      db.member.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.housing.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.donation.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.meeting.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.employer.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.grant.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.task.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      db.mission.findMany({ 
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return {
      members,
      housing,
      donations,
      meetings,
      employers,
      grants,
      tasks,
      missions,
      metadata: {
        lastSync: new Date().toISOString(),
        totalRecords: {
          members: members.length,
          housing: housing.length,
          donations: donations.length,
          meetings: meetings.length,
          employers: employers.length,
          grants: grants.length,
          tasks: tasks.length,
          missions: missions.length
        }
      }
    };
  } catch (error) {
    console.error('Failed to get platform truth:', error);
    throw error;
  }
}

// Audit logging function
export async function createAuditLog({
  action,
  entity,
  entityId,
  userId,
  oldValues,
  newValues,
  metadata
}: {
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  oldValues?: any;
  newValues?: any;
  metadata?: any;
}) {
  try {
    return await db.auditLog.create({
      data: {
        action: action as any,
        entity,
        entityId,
        userId,
        oldValues: oldValues ? JSON.stringify(oldValues) : null,
        newValues: newValues ? JSON.stringify(newValues) : null,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error - audit logging shouldn't break the main operation
  }
}

// Graceful shutdown — only disconnect if the client was ever instantiated.
// Calling db.$disconnect() here would trigger the Proxy, which would call
// getPrismaClient(), which would create a PrismaClient just to immediately
// disconnect it. Guard against that so the health check route (and any
// other route that doesn't touch the database) never causes an eager
// Prisma connection attempt.
process.on('beforeExit', async () => {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
});

// Note: globalForPrisma.prisma is populated by getPrismaClient() on first
// access, so no explicit assignment is needed here.

export default db;
