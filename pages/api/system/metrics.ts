// API Route: /api/system/metrics
// Mock system metrics for testing

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock system metrics
    const mockMetrics = {
      members: 2,
      housing: 2,
      donations: 2,
      meetings: 2,
      employers: 2,
      grants: 2,
      tasks: 2,
      missions: 2,
      users: 1,
      openIncidents: 0,
      timestamp: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: mockMetrics
    });

  } catch (error) {
    console.error('System metrics API error:', error);
    res.status(500).json({ 
      error: 'Failed to load system metrics',
      code: 'INTERNAL_ERROR'
    });
  }
}
