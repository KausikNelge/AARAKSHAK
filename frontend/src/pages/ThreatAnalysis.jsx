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
import { Shield, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import toast from 'react-hot-toast';

const ThreatAnalysis = () => {
  const [securityData, setSecurityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      setLoading(true);
              const response = await axios.get('https://aarakshak-backend.onrender.com/api/security/dashboard');
      setSecurityData(response.data);
    } catch (error) {
      toast.error('Failed to fetch threat data');
      console.error('Error fetching threat data:', error);
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
        <div className="text-center text-gray-500">No threat data available</div>
      </DashboardLayout>
    );
  }

  const threatData = Object.entries(securityData.threatCategories).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: getThreatColor(key)
  }));

  function getThreatColor(threatType) {
    const colors = {
      malware: '#FF6B6B',
      phishing: '#4ECDC4',
      ddos: '#45B7D1',
      insider: '#96CEB4',
      social: '#FFEAA7'
    };
    return colors[threatType] || '#8884D8';
  }

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Threat Analysis</h1>
            <p className="text-gray-600">Comprehensive threat intelligence and analysis</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date(securityData.lastUpdated).toLocaleString()}
          </div>
        </div>

        {/* Threat Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Threats"
            value={Object.values(securityData.threatCategories).reduce((a, b) => a + b, 0)}
            icon={Shield}
            color="red"
            trend={-5}
          />
          <StatCard
            title="Malware Attacks"
            value={securityData.threatCategories.malware}
            icon={AlertTriangle}
            color="red"
            trend={12}
          />
          <StatCard
            title="Phishing Attempts"
            value={securityData.threatCategories.phishing}
            icon={Eye}
            color="yellow"
            trend={-8}
          />
          <StatCard
            title="DDoS Attacks"
            value={securityData.threatCategories.ddos}
            icon={TrendingUp}
            color="blue"
            trend={3}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Distribution</h3>
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Threat Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatData.map((threat) => (
              <div key={threat.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{threat.name}</h4>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: threat.color }}
                  ></div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{threat.value}</p>
                <p className="text-sm text-gray-600">incidents detected</p>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Mitigation Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-900">High Priority</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Update antivirus signatures</li>
                <li>• Review firewall rules</li>
                <li>• Conduct security awareness training</li>
              </ul>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-900">Medium Priority</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Monitor network traffic</li>
                <li>• Update security policies</li>
                <li>• Review access controls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ThreatAnalysis; 