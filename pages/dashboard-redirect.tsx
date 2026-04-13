// Dashboard Redirect - Routes to Unified Dashboard
// This ensures users see the combined POLR + Hope platform

import { useEffect } from 'react';

export default function DashboardRedirect() {
  useEffect(() => {
    window.location.href = '/dashboard-unified';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: '#0c1a2e',
      color: '#c8913a',
      fontFamily: 'Cinzel, serif',
      fontSize: '1.5rem'
    }}>
      Loading POLR Hope Network...
    </div>
  );
}
