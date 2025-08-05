import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  TrendingUp,
  Eye,
  Zap,
  Target,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [securityData, setSecurityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      setLoading(true);
      // Use test endpoint for immediate data access
              const response = await axios.get('https://aarakshak-backend.onrender.com/api/security/test-dashboard');
      setSecurityData(response.data);
    } catch (error) {
      toast.error('Failed to fetch security data');
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!securityData) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-500">No data available</div>
      </DashboardLayout>
    );
  }

  // Prepare chart data
  const threatData = Object.entries(securityData.threatCategories).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  const vulnerabilityData = Object.entries(securityData.vulnerabilityCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  const trendData = securityData.incidentTrends.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    incidents: item.count
  }));

  const complianceData = Object.entries(securityData.complianceScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
            <p className="text-gray-600">Real-time security assessment overview</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date(securityData.lastUpdated).toLocaleString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Threats"
            value={Object.values(securityData.threatCategories).reduce((a, b) => a + b, 0)}
            icon={Shield}
            color="red"
            trend={-5}
          />
          <StatCard
            title="Critical Vulnerabilities"
            value={securityData.vulnerabilityCounts.critical}
            icon={AlertTriangle}
            color="yellow"
            trend={2}
          />
          <StatCard
            title="Compliance Score"
            value={`${securityData.complianceScores.overall}%`}
            icon={CheckCircle}
            color="green"
            trend={8}
          />
          <StatCard
            title="Active Incidents"
            value={securityData.incidentTrends[securityData.incidentTrends.length - 1]?.count || 0}
            icon={Activity}
            color="blue"
            trend={-12}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Vulnerability Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vulnerability Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vulnerabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Incident Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Trends (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance Scores */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
              <Eye className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all">
              <Zap className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium">Run Scan</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all">
              <Target className="w-6 h-6 text-yellow-600 mb-2" />
              <span className="text-sm font-medium">Assess Risk</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all">
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 