// Database Client - Production Database Connection
// This is the single source of database truth

import { PrismaClient } from '@prisma/client';

// Global Prisma instance to avoid multiple connections in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
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
      userCount,
      incidentCount
    ] = await Promise.all([
      db.member.count({ where: { isActive: true } }),
      db.housing.count({ where: { isActive: true } }),
      db.donation.count({ where: { isActive: true } }),
      db.meeting.count({ where: { isActive: true } }),
      db.employer.count({ where: { isActive: true } }),
      db.grant.count({ where: { isActive: true } }),
      db.task.count(),
      db.mission.count({ where: { isActive: true } }),
      db.user.count({ where: { isActive: true } }),
      db.incident.count({ where: { status: 'OPEN' } })
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
      openIncidents: incidentCount,
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
        include: { residents: { include: { member: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      db.donation.findMany({ 
        where: { isActive: true },
        include: { member: true },
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

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
});

// In development, save to global to avoid hot-reload issues
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

export default db;
