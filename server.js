// server.js — Custom Next.js server
//
// `next start` ignores the HOSTNAME environment variable and always binds to
// localhost, which makes the app unreachable from outside the container.
// This file creates a plain Node.js http server and passes it to Next.js so
// we can explicitly bind to the address and port we want.

'use strict';

const http = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    // Parse the URL so Next.js can route it correctly.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, hostname, () => {
    console.log(`[server] Ready on http://${hostname}:${port}`);
    console.log(`[server] NODE_ENV : ${process.env.NODE_ENV}`);
    console.log(`[server] pid      : ${process.pid}`);
  });

  // Surface unhandled errors rather than silently dying.
  server.on('error', (err) => {
    console.error('[server] HTTP server error:', err);
    process.exit(1);
  });
});
