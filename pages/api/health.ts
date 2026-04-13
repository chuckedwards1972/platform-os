// API Route: /api/health
// Health check endpoint for Railway - no auth, no database access

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ status: 'ok' });
}
