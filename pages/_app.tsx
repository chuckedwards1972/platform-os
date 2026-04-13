// pages/_app.tsx
// Custom App component. getInitialProps runs server-side on the very first
// request, giving us a second opportunity to log startup / binding info
// after the Next.js HTTP server is fully up and accepting connections.

import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import os from 'os';

let startupLogged = false;

function logServerStartup() {
  if (startupLogged) return;
  startupLogged = true;

  console.log('[_app] ========== FIRST REQUEST — SERVER IS UP ==========');
  console.log('[_app] NODE_ENV  :', process.env.NODE_ENV);
  console.log('[_app] PORT      :', process.env.PORT);
  console.log('[_app] HOSTNAME  :', process.env.HOSTNAME);
  console.log('[_app] pid       :', process.pid);
  console.log('[_app] uptime    :', process.uptime().toFixed(2), 's');
  console.log('[_app] os host   :', os.hostname());

  const ifaces = os.networkInterfaces();
  console.log('[_app] --- Network interfaces ---');
  for (const [name, addrs] of Object.entries(ifaces)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      console.log(`[_app]   ${name}: ${addr.address} (${addr.family}, internal=${addr.internal})`);
    }
  }
  console.log('[_app] =====================================================');
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// getInitialProps opts the entire app into SSR and runs server-side on
// every navigation that isn't a client-side transition. We use it purely
// for the one-time startup log.
MyApp.getInitialProps = async (appContext: AppContext) => {
  // Only log on the server side.
  if (typeof window === 'undefined') {
    logServerStartup();

    const { req } = appContext.ctx;
    if (req) {
      console.log('[_app] request:', req.method, req.url);
      console.log('[_app] headers:', JSON.stringify(req.headers));
    }
  }

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
