// next.config.js
// This module is evaluated by Next.js at startup (both build-time and
// server-start-time), so we use it to emit diagnostic information about
// the environment the process is running in.

const os = require('os');

// ── Startup diagnostics ──────────────────────────────────────────────────────
// These run when the Next.js server process first loads this config file,
// giving us early visibility before any request is handled.
console.log('[next.config] ========== SERVER STARTUP DIAGNOSTICS ==========');
console.log('[next.config] NODE_ENV  :', process.env.NODE_ENV);
console.log('[next.config] PORT      :', process.env.PORT);
console.log('[next.config] HOSTNAME  :', process.env.HOSTNAME);
console.log('[next.config] pid       :', process.pid);
console.log('[next.config] node ver  :', process.version);
console.log('[next.config] platform  :', process.platform);
console.log('[next.config] cwd       :', process.cwd());
console.log('[next.config] os host   :', os.hostname());

// Log all network interfaces so we can see what addresses are available
// inside the container at startup time.
const ifaces = os.networkInterfaces();
console.log('[next.config] --- Network interfaces ---');
for (const [name, addrs] of Object.entries(ifaces)) {
  if (!addrs) continue;
  for (const addr of addrs) {
    console.log(`[next.config]   ${name}: ${addr.address} (${addr.family}, internal=${addr.internal})`);
  }
}
console.log('[next.config] =====================================================');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Expose startup-time values to server-side code so _app.tsx can log them.
  serverRuntimeConfig: {
    port: process.env.PORT || '3000',
    hostname: process.env.HOSTNAME || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
