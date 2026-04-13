// API Route: /api/health
// Health check endpoint for Railway - no auth, no database access

import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

// Disable body parsing — this route needs no request body and should
// respond as fast as possible. Keeping the runtime on Node (default)
// avoids any Edge cold-start overhead while still being synchronous.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Log network interfaces once on first call so we can see what the
// process is actually bound to inside the container.
let networkLogged = false;
function logNetworkInterfaces() {
  if (networkLogged) return;
  networkLogged = true;

  const ifaces = os.networkInterfaces();
  console.log('[health] === NETWORK INTERFACES ===');
  for (const [name, addrs] of Object.entries(ifaces)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      console.log(`[health]   ${name}: ${addr.address} (${addr.family}, internal=${addr.internal})`);
    }
  }
  console.log('[health] === ENV ===');
  console.log('[health]   PORT     :', process.env.PORT);
  console.log('[health]   HOSTNAME :', process.env.HOSTNAME);
  console.log('[health]   NODE_ENV :', process.env.NODE_ENV);
  console.log('[health]   pid      :', process.pid);
  console.log('[health]   hostname :', os.hostname());
  console.log('[health] ==================');
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Dump network / env info on the very first probe so we can see
  // what address the process is reachable on.
  logNetworkInterfaces();

  // Log every detail of the incoming request so we can confirm the
  // probe is actually reaching this handler.
  console.log('[health] >>> REQUEST RECEIVED <<<');
  console.log('[health]   method  :', req.method);
  console.log('[health]   url     :', req.url);
  console.log('[health]   headers :', JSON.stringify(req.headers, null, 2));
  console.log('[health]   remoteAddress:', (req.socket as any)?.remoteAddress);
  console.log('[health]   localAddress :', (req.socket as any)?.localAddress);
  console.log('[health]   localPort    :', (req.socket as any)?.localPort);

  // Only allow GET (Railway's health probe uses GET).
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    console.log('[health] 405 - method not allowed:', req.method);
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Prevent proxies or CDNs from caching the health response so every
  // probe hits the live process.
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  const body = {
    status: 'ok',
    pid: process.pid,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  console.log('[health] <<< SENDING 200 RESPONSE >>>', JSON.stringify(body));
  res.status(200).json(body);
  console.log('[health] response flushed');
}
