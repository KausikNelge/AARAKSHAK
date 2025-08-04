import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { AlertTriangle, Shield, Activity, Zap, Target, TrendingUp, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Vulnerabilities = () => {
  const [vulnerabilityData, setVulnerabilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);

  useEffect(() => {
    fetchVulnerabilityData();
  }, []);

  const fetchVulnerabilityData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/security/test-dashboard');
      setVulnerabilityData(response.data);
    } catch (error) {
      console.error('Error fetching vulnerability data:', error);
      // Fallback mock data
      setVulnerabilityData({
        vulnerabilityCounts: { critical: 7, high: 15, medium: 29, low: 38 },
        riskLevels: { critical: 2, high: 11, medium: 18, low: 24 },
        recentVulnerabilities: [
          { id: 1, name: 'SQL Injection', severity: 'Critical', status: 'Open', discovered: '2024-01-15', affected: 'Database Server' },
          { id: 2, name: 'XSS Vulnerability', severity: 'High', status: 'In Progress', discovered: '2024-01-14', affected: 'Web Application' },
          { id: 3, name: 'Weak Password Policy', severity: 'Medium', status: 'Resolved', discovered: '2024-01-13', affected: 'Authentication System' },
          { id: 4, name: 'Outdated SSL Certificate', severity: 'Low', status: 'Open', discovered: '2024-01-12', affected: 'Web Server' },
          { id: 5, name: 'Missing Security Headers', severity: 'Medium', status: 'In Progress', discovered: '2024-01-11', affected: 'Web Application' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

  const severityChartData = vulnerabilityData ? [
    { name: 'Critical', value: vulnerabilityData.vulnerabilityCounts.critical, color: '#ef4444' },
    { name: 'High', value: vulnerabilityData.vulnerabilityCounts.high, color: '#f97316' },
    { name: 'Medium', value: vulnerabilityData.vulnerabilityCounts.medium, color: '#eab308' },
    { name: 'Low', value: vulnerabilityData.vulnerabilityCounts.low, color: '#22c55e' }
  ] : [];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'High': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'Medium': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-red-500 bg-red-500/10';
      case 'In Progress': return 'text-yellow-500 bg-yellow-500/10';
      case 'Resolved': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading vulnerability data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Vulnerability Analysis
        </h1>
        <p className="text-gray-400">Comprehensive security vulnerability assessment and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Vulnerabilities</p>
              <p className="text-3xl font-bold text-red-500">{vulnerabilityData?.vulnerabilityCounts.critical || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">High Risk</p>
              <p className="text-3xl font-bold text-orange-500">{vulnerabilityData?.vulnerabilityCounts.high || 0}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Medium Risk</p>
              <p className="text-3xl font-bold text-yellow-500">{vulnerabilityData?.vulnerabilityCounts.medium || 0}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Low Risk</p>
              <p className="text-3xl font-bold text-green-500">{vulnerabilityData?.vulnerabilityCounts.low || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Severity Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-blue-400" />
            Severity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {severityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Levels Bar Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-purple-400" />
            Risk Level Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Critical', value: vulnerabilityData?.riskLevels.critical || 0 },
              { name: 'High', value: vulnerabilityData?.riskLevels.high || 0 },
              { name: 'Medium', value: vulnerabilityData?.riskLevels.medium || 0 },
              { name: 'Low', value: vulnerabilityData?.riskLevels.low || 0 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }} />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Vulnerabilities Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-400" />
          Recent Vulnerabilities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Vulnerability</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Severity</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Discovered</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Affected System</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilityData?.recentVulnerabilities?.map((vuln) => (
                <tr key={vuln.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getSeverityIcon(vuln.severity)}
                      <span className="ml-2 font-medium">{vuln.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      vuln.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {vuln.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vuln.status)}`}>
                      {vuln.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{vuln.discovered}</td>
                  <td className="py-3 px-4 text-gray-300">{vuln.affected}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => setSelectedVulnerability(vuln)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vulnerability Details Modal */}
      {selectedVulnerability && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Vulnerability Details</h3>
              <button 
                onClick={() => setSelectedVulnerability(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Description</h4>
                <p className="text-gray-400">
                  {selectedVulnerability.name} is a security vulnerability that affects the {selectedVulnerability.affected.toLowerCase()}. 
                  This vulnerability has been classified as {selectedVulnerability.severity.toLowerCase()} severity and is currently {selectedVulnerability.status.toLowerCase()}.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Severity</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedVulnerability.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    selectedVulnerability.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    selectedVulnerability.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedVulnerability.severity}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Status</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedVulnerability.status)}`}>
                    {selectedVulnerability.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                  Update Status
                </button>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                  Assign Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vulnerabilities; 