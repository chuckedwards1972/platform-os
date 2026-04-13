// Dashboard page - no authentication required for testing
import { useState, useEffect } from 'react';
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

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Mock data - no database calls
  const mockData = {
    members: [
      { id: '1', name: 'John Doe', status: 'ACTIVE', level: 6 },
      { id: '2', name: 'Jane Smith', status: 'ACTIVE', level: 8 }
    ],
    housing: [
      { id: '1', address: '123 Main St', city: 'New Orleans', occupied: true },
      { id: '2', address: '456 Oak Ave', city: 'New Orleans', occupied: false }
    ],
    donations: [
      { id: '1', amount: 100, donor: 'Anonymous', type: 'ONE_TIME' },
      { id: '2', amount: 250, donor: 'Local Business', type: 'MONTHLY' }
    ],
    meetings: [
      { id: '1', name: 'AA Meeting', day: 'Monday', time: '7:00 PM' },
      { id: '2', name: 'NA Meeting', day: 'Wednesday', time: '6:00 PM' }
    ],
    employers: [
      { id: '1', name: 'ABC Company', active: true },
      { id: '2', name: 'XYZ Corporation', active: true }
    ],
    grants: [
      { id: '1', title: 'Recovery Grant', amount: 5000, status: 'ACTIVE' },
      { id: '2', title: 'Housing Support', amount: 2500, status: 'PENDING' }
    ],
    tasks: [
      { id: '1', title: 'Update Database', priority: 'HIGH', status: 'IN_PROGRESS' },
      { id: '2', title: 'Fix UI Bug', priority: 'MEDIUM', status: 'COMPLETED' }
    ],
    missions: [
      { id: '1', title: 'Community Outreach', status: 'ACTIVE' },
      { id: '2', title: 'Fundraising Campaign', status: 'PLANNING' }
    ]
  };

  const entityCards = [
    {
      key: 'members',
      title: 'Members',
      icon: Users,
      color: 'blue',
      count: mockData.members.length,
      description: 'Active members in recovery'
    },
    {
      key: 'housing',
      title: 'Housing',
      icon: Home,
      color: 'green',
      count: mockData.housing.length,
      description: 'Recovery housing units'
    },
    {
      key: 'donations',
      title: 'Donations',
      icon: DollarSign,
      color: 'yellow',
      count: mockData.donations.length,
      description: 'Total donations received'
    },
    {
      key: 'meetings',
      title: 'Meetings',
      icon: Calendar,
      color: 'purple',
      count: mockData.meetings.length,
      description: 'Active recovery meetings'
    },
    {
      key: 'employers',
      title: 'Employers',
      icon: Building,
      color: 'indigo',
      count: mockData.employers.length,
      description: 'Partner employers'
    },
    {
      key: 'grants',
      title: 'Grants',
      icon: Award,
      color: 'pink',
      count: mockData.grants.length,
      description: 'Active grants'
    },
    {
      key: 'tasks',
      title: 'Tasks',
      icon: CheckSquare,
      color: 'orange',
      count: mockData.tasks.length,
      description: 'Active tasks'
    },
    {
      key: 'missions',
      title: 'Missions',
      icon: Target,
      color: 'red',
      count: mockData.missions.length,
      description: 'Active missions'
    }
  ];

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setLastRefresh(new Date());
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading HOPE Platform Dashboard...</p>
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
            onClick={() => window.location.reload()}
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
              <h1 className="text-2xl font-bold text-gray-900">HOPE Platform Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last sync: {format(lastRefresh, 'MMM d, HH:mm:ss')}
              </div>
              <button
                onClick={() => setLastRefresh(new Date())}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* System Status Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Database: Mock Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Users: {mockData.members.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {entityCards.map((card) => (
            <div key={card.key} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <card.icon className={`w-6 h-6 text-${card.color}`} />
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                </div>
                <span className={`text-2xl font-bold text-${card.color}`}>{card.count}</span>
              </div>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
