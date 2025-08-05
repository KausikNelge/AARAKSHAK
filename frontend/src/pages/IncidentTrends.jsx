import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, MapPin, Activity, Calendar, Users, Shield, Zap, Target } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const IncidentTrends = () => {
  const [incidentData, setIncidentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchIncidentData();
  }, [timeRange]);

  const fetchIncidentData = async () => {
    try {
      setLoading(true);
              const response = await axios.get('https://aarakshak-backend.onrender.com/api/security/test-dashboard');
      setIncidentData(response.data);
    } catch (error) {
      console.error('Error fetching incident data:', error);
      // Fallback mock data
      setIncidentData({
        incidentTrends: [
          { date: '2024-01-09', count: 8, severity: 'Low' },
          { date: '2024-01-10', count: 21, severity: 'Medium' },
          { date: '2024-01-11', count: 18, severity: 'High' },
          { date: '2024-01-12', count: 16, severity: 'Medium' },
          { date: '2024-01-13', count: 16, severity: 'Low' },
          { date: '2024-01-14', count: 17, severity: 'High' },
          { date: '2024-01-15', count: 22, severity: 'Critical' }
        ],
        recentIncidents: [
          { id: 1, title: 'Unauthorized Access Attempt', severity: 'High', status: 'Resolved', time: '2 hours ago', location: 'Database Server', affected: 'User Accounts' },
          { id: 2, title: 'DDoS Attack Detected', severity: 'Critical', status: 'Active', time: '4 hours ago', location: 'Web Server', affected: 'Website Availability' },
          { id: 3, title: 'Suspicious File Upload', severity: 'Medium', status: 'Investigating', time: '6 hours ago', location: 'File Server', affected: 'File System' },
          { id: 4, title: 'Failed Login Attempts', severity: 'Low', status: 'Resolved', time: '8 hours ago', location: 'Authentication System', affected: 'User Accounts' },
          { id: 5, title: 'Malware Detection', severity: 'High', status: 'Contained', time: '12 hours ago', location: 'Workstation', affected: 'Local System' }
        ],
        incidentStats: {
          total: 125,
          resolved: 98,
          active: 15,
          critical: 3
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      case 'Low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-500 bg-red-500/10';
      case 'Resolved': return 'text-green-500 bg-green-500/10';
      case 'Investigating': return 'text-yellow-500 bg-yellow-500/10';
      case 'Contained': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading incident data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Incident Trends
        </h1>
        <p className="text-gray-400">Real-time security incident monitoring and analysis</p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Incidents</p>
              <p className="text-3xl font-bold text-white">{incidentData?.incidentStats.total || 0}</p>
            </div>
            <Activity className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-3xl font-bold text-green-500">{incidentData?.incidentStats.resolved || 0}</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-3xl font-bold text-yellow-500">{incidentData?.incidentStats.active || 0}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical</p>
              <p className="text-3xl font-bold text-red-500">{incidentData?.incidentStats.critical || 0}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Incident Trend Line Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Incident Trend (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incidentData?.incidentTrends || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tickFormatter={formatDate}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                labelFormatter={formatDate}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            Severity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { severity: 'Critical', count: 3, color: '#ef4444' },
              { severity: 'High', count: 8, color: '#f97316' },
              { severity: 'Medium', count: 12, color: '#eab308' },
              { severity: 'Low', count: 6, color: '#22c55e' }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="severity" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }} />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-green-400" />
          Incident Timeline
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={incidentData?.incidentTrends || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tickFormatter={formatDate}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
              labelFormatter={formatDate}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#10B981" 
              fill="#10B981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Incidents Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-orange-400" />
          Recent Incidents
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Incident</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Severity</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Affected</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidentData?.recentIncidents?.map((incident) => (
                <tr key={incident.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-medium">{incident.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      incident.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      incident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{incident.time}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-300">{incident.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{incident.affected}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => setSelectedIncident(incident)}
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

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Incident Details</h3>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Description</h4>
                <p className="text-gray-400">
                  {selectedIncident.title} was detected at {selectedIncident.time}. 
                  This incident affects the {selectedIncident.affected.toLowerCase()} and is currently {selectedIncident.status.toLowerCase()}.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Severity</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedIncident.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    selectedIncident.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    selectedIncident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedIncident.severity}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Status</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                    {selectedIncident.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Location</h4>
                  <p className="text-gray-400">{selectedIncident.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Affected System</h4>
                  <p className="text-gray-400">{selectedIncident.affected}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                  Update Status
                </button>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                  Assign Team
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentTrends; 