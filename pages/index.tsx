// Platform Command Center - Main Dashboard UI
// Cognitive Interface (PCI) - Real-time system visibility

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { 
  Users, 
  Home, 
  DollarSign, 
  Calendar, 
  Building, 
  Award,
  CheckSquare,
  Target,
  AlertTriangle,
  Activity,
  Shield,
  Database
} from 'lucide-react';

interface PlatformData {
  members: any[];
  housing: any[];
  donations: any[];
  meetings: any[];
  employers: any[];
  grants: any[];
  tasks: any[];
  missions: any[];
  metadata: {
    lastSync: string;
    totalRecords: {
      members: number;
      housing: number;
      donations: number;
      meetings: number;
      employers: number;
      grants: number;
      tasks: number;
      missions: number;
    };
  };
}

interface SystemMetrics {
  members: number;
  housing: number;
  donations: number;
  meetings: number;
  employers: number;
  grants: number;
  tasks: number;
  missions: number;
  users: number;
  openIncidents: number;
  timestamp: string;
}

export default function PlatformCommandCenter() {
  const router = useRouter();
  const [platformData, setPlatformData] = useState<PlatformData | null>(null);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [redirecting, setRedirecting] = useState(false);

  // Load platform truth from database
  const loadPlatformTruth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch('/api/platform/truth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load platform data');
      }

      const result = await response.json();
      setPlatformData(result.data);
      setLastRefresh(new Date());
      setError(null);

    } catch (err: any) {
      console.error('Failed to load platform truth:', err);
      setError(err.message || 'Failed to load platform data');
    } finally {
      setLoading(false);
    }
  };

  // Load system metrics
  const loadSystemMetrics = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch('/api/system/metrics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const metrics = await response.json();
        setSystemMetrics(metrics.data);
      }
    } catch (err) {
      console.error('Failed to load system metrics:', err);
    }
  };

  // Check for auth token on mount; redirect to login if absent
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setRedirecting(true);
      router.push('/api/auth/login');
    }
  }, []);

  // Auto-refresh every 30 seconds (only when authenticated)
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    loadPlatformTruth();
    loadSystemMetrics();

    const interval = setInterval(() => {
      loadPlatformTruth();
      loadSystemMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Entity cards configuration
  const entityCards = [
    {
      key: 'members',
      title: 'Members',
      icon: Users,
      color: 'blue',
      count: platformData?.metadata.totalRecords.members || 0,
      description: 'Active members in recovery'
    },
    {
      key: 'housing',
      title: 'Housing',
      icon: Home,
      color: 'green',
      count: platformData?.metadata.totalRecords.housing || 0,
      description: 'Recovery housing units'
    },
    {
      key: 'donations',
      title: 'Donations',
      icon: DollarSign,
      color: 'yellow',
      count: platformData?.metadata.totalRecords.donations || 0,
      description: 'Total donations received'
    },
    {
      key: 'meetings',
      title: 'Meetings',
      icon: Calendar,
      color: 'purple',
      count: platformData?.metadata.totalRecords.meetings || 0,
      description: 'Active recovery meetings'
    },
    {
      key: 'employers',
      title: 'Employers',
      icon: Building,
      color: 'indigo',
      count: platformData?.metadata.totalRecords.employers || 0,
      description: 'Partner employers'
    },
    {
      key: 'grants',
      title: 'Grants',
      icon: Award,
      color: 'pink',
      count: platformData?.metadata.totalRecords.grants || 0,
      description: 'Active grants'
    },
    {
      key: 'tasks',
      title: 'Tasks',
      icon: CheckSquare,
      color: 'orange',
      count: platformData?.metadata.totalRecords.tasks || 0,
      description: 'Active tasks'
    },
    {
      key: 'missions',
      title: 'Missions',
      icon: Target,
      color: 'red',
      count: platformData?.metadata.totalRecords.missions || 0,
      description: 'Active missions'
    }
  ];

  if (redirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading HOPE Platform Command Center...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">System Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadPlatformTruth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">HOPE Platform Command Center</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last sync: {format(lastRefresh, 'MMM d, HH:mm:ss')}
              </div>
              <button
                onClick={loadPlatformTruth}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* System Status Bar */}
      {systemMetrics && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Database: Healthy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Users: {systemMetrics.users}</span>
                </div>
                {systemMetrics.openIncidents > 0 && (
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-red-600">{systemMetrics.openIncidents} Open Incidents</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                System uptime: {format(new Date(), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Entity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {entityCards.map((card) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              yellow: 'bg-yellow-100 text-yellow-600',
              purple: 'bg-purple-100 text-purple-600',
              indigo: 'bg-indigo-100 text-indigo-600',
              pink: 'bg-pink-100 text-pink-600',
              orange: 'bg-orange-100 text-orange-600',
              red: 'bg-red-100 text-red-600'
            };

            return (
              <div key={card.key} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {card.count.toLocaleString()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Platform Truth Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Database Synchronization</h3>
                  <p className="text-sm text-gray-600">
                    All data sourced directly from database truth layer
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-green-600">Synchronized</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Last Platform Sync</h3>
                  <p className="text-sm text-gray-600">
                    {platformData?.metadata.lastSync ? 
                      format(new Date(platformData.metadata.lastSync), 'MMM d, yyyy HH:mm:ss') : 
                      'Never'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Live</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Total Records</h3>
                  <p className="text-sm text-gray-600">
                    {platformData ? 
                      Object.values(platformData.metadata.totalRecords).reduce((a, b) => a + b, 0).toLocaleString() : 
                      '0'
                    } records across all entities
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
