// API Route: /api/system/metrics
// Backend service for system metrics

import type { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../../../lib/backend-services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const metrics = await DatabaseService.getSystemMetrics();
    
    res.status(200).json({
      success: true,
      data: metrics
    });

  } catch (error) {
    console.error('System metrics API error:', error);
    res.status(500).json({ 
      error: 'Failed to load system metrics',
      code: 'METRICS_UNAVAILABLE'
    });
  }
}
