// Authentication & Authorization - Zero Trust Security Layer
// JWT-based authentication with role-based access control

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// JWT token types
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Generate JWT token
export function generateToken(user: { id: string; email: string; role: string }): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  
  const secret = JWT_SECRET as string;
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] };
  
  return jwt.sign(payload, secret, options);
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!token) return null;
    
    // Remove "Bearer " prefix if present
    const cleanToken = token.replace('Bearer ', '');
    
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(cleanToken, secret) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Zero Trust middleware - validates every request
export function zeroTrust(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'No authorization header',
        code: 'NO_AUTH_HEADER'
      });
    }

    const user = verifyToken(authHeader);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      });
    }

    // Check if user is still active in database
    db.user.findUnique({
      where: { id: user.userId, isActive: true }
    }).then(dbUser => {
      if (!dbUser) {
        return res.status(401).json({ 
          error: 'User not found or inactive',
          code: 'USER_INACTIVE'
        });
      }

      // Attach user to request
      req.user = {
        ...user,
        dbUser
      };
      
      next();
    }).catch(error => {
      console.error('Database check failed:', error);
      return res.status(500).json({ 
        error: 'Authentication service unavailable',
        code: 'SERVICE_ERROR'
      });
    });

  } catch (error) {
    console.error('Zero Trust middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication error',
      code: 'AUTH_ERROR'
    });
  }
}

// Role-based access control (RBAC)
export function can(user: { role: string }, action: string): boolean {
  const permissions = {
    ADMIN: ['read', 'write', 'delete', 'manage_users', 'system_admin'],
    MANAGER: ['read', 'write', 'delete'],
    VIEWER: ['read']
  };

  const userPermissions = permissions[user.role as keyof typeof permissions] || [];
  return userPermissions.includes(action);
}

// RBAC middleware
export function rbac(requiredAction: string) {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    if (!can(req.user, requiredAction)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: requiredAction,
        userRole: req.user.role
      });
    }

    next();
  };
}

// Login function
export async function login(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: { email, isActive: true }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Create session record
    await db.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    // Log the login
    await db.auditLog.create({
      data: {
        action: 'LOGIN',
        entity: 'user',
        entityId: user.id,
        userId: user.id,
        metadata: JSON.stringify({ timestamp: new Date() })
      }
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };

  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Logout function
export async function logout(token: string) {
  try {
    const user = verifyToken(token);
    if (!user) {
      throw new Error('Invalid token');
    }

    // Remove session
    await db.session.deleteMany({
      where: { 
        token: token.replace('Bearer ', ''),
        userId: user.userId
      }
    });

    // Log the logout
    await db.auditLog.create({
      data: {
        action: 'LOGOUT',
        entity: 'user',
        entityId: user.userId,
        userId: user.userId,
        metadata: JSON.stringify({ timestamp: new Date() })
      }
    });

    return { success: true };

  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

// Validate session
export async function validateSession(token: string) {
  try {
    const user = verifyToken(token);
    if (!user) {
      return null;
    }

    const session = await db.session.findFirst({
      where: {
        token: token.replace('Bearer ', ''),
        userId: user.userId,
        expiresAt: { gt: new Date() }
      },
      include: { user: true }
    });

    if (!session || !session.user.isActive) {
      return null;
    }

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      },
      session: {
        expiresAt: session.expiresAt
      }
    };

  } catch (error) {
    console.error('Session validation failed:', error);
    return null;
  }
}

// Refresh token
export async function refreshToken(oldToken: string) {
  try {
    const session = await validateSession(oldToken);
    if (!session) {
      throw new Error('Invalid session');
    }

    // Generate new token
    const newToken = generateToken({
      id: session.user.id,
      email: session.user.email,
      role: session.user.role
    });

    // Update session
    await db.session.update({
      where: { token: oldToken.replace('Bearer ', '') },
      data: {
        token: newToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return { token: newToken };

  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}
