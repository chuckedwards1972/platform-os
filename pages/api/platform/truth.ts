// API Route: /api/platform/truth
// Platform Truth API - Single source of database truth

import type { NextApiRequest, NextApiResponse } from 'next';
import { zeroTrust } from '../../../core/security/auth';
import { getPlatformTruth } from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply zero trust security
  zeroTrust(req, res, async () => {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const truth = await getPlatformTruth();

      res.status(200).json({
        success: true,
        data: truth,
        timestamp: new Date().toISOString(),
        source: 'database-truth'
      });

    } catch (error: any) {
      console.error('Platform Truth API error:', error);
      res.status(500).json({ 
        error: 'Platform truth unavailable',
        code: 'TRUTH_UNAVAILABLE',
        timestamp: new Date().toISOString()
      });
    }
  });
}

export default handler;
