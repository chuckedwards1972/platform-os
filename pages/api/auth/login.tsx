// Login page - handles authentication redirect from main page
import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login for testing - in real app this would call API
      if (email === 'admin' && password === 'admin') {
        // Store mock token
        localStorage.setItem('auth_token', 'mock-jwt-token');
        
        // Redirect to main page
        window.location.href = '/';
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            HOPE Platform Login
          </h2>

          <p className="text-center text-sm text-gray-600 mb-8">
            Test Credentials: admin / admin
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018 8 018 0 4-4-4-4-4-4-4-4-4zm2 4a2 2 0 012 2 012 0 1 1 0 1 0 1 1 0 1 0 1 0 0 1 1 0 1 1 0 1 1 0 1zm0 0a1 1 0 011 1 011 0 0 0 0 0 0 1 1 0 1 1 0 1 1z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
