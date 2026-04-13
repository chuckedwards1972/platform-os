// Simple test page - no dependencies, no complexity
export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>HOPE Platform Test Page</h1>
      <p>If you can see this page, the platform is working!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>Environment: {process.env.NODE_ENV || 'development'}</p>
    </div>
  );
}
