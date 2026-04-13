// API Route: /api/health
// Health check endpoint for Railway - no auth, no database access

import type { NextApiRequest, NextApiResponse } from 'next';

// Disable body parsing — this route needs no request body and should
// respond as fast as possible. Keeping the runtime on Node (default)
// avoids any Edge cold-start overhead while still being synchronous.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('[health] handler called, method:', req.method);

  // Only allow GET (Railway's health probe uses GET).
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Prevent proxies or CDNs from caching the health response so every
  // probe hits the live process.
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  console.log('[health] sending 200 response');
  res.status(200).json({ status: 'ok' });
  console.log('[health] response sent');
}
