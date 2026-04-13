// API Route: /api/auth/login
// Authentication endpoint with zero trust security

import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../core/security/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const result = await login(email, password);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error: any) {
    console.error('Login API error:', error);
    
    // Don't expose specific error details for security
    res.status(401).json({ 
      error: 'Invalid credentials',
      code: 'INVALID_CREDENTIALS'
    });
  }
}
