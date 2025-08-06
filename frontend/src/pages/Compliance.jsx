import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, CheckCircle, AlertTriangle, FileText, Award, Target, TrendingUp, Activity, Zap, Lock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Compliance = () => {
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFramework, setSelectedFramework] = useState('overall');

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = async () => {
    try {
      setLoading(true);
              const response = await axios.get('https://optimistic-smile-production.up.railway.app/api/security/test-dashboard');
      setComplianceData(response.data);
    } catch (error) {
      console.error('Error fetching compliance data:', error);
      // Fallback mock data
      setComplianceData({
        complianceScores: { overall: 92, network: 88, application: 95, data: 89, physical: 94 },
        frameworks: [
          { name: 'ISO 27001', score: 89, status: 'Compliant', lastAudit: '2024-01-10', nextAudit: '2024-07-10' },
          { name: 'SOC 2 Type II', score: 92, status: 'Compliant', lastAudit: '2024-01-05', nextAudit: '2024-07-05' },
          { name: 'GDPR', score: 95, status: 'Compliant', lastAudit: '2024-01-15', nextAudit: '2024-07-15' },
          { name: 'HIPAA', score: 87, status: 'Non-Compliant', lastAudit: '2024-01-08', nextAudit: '2024-07-08' },
          { name: 'PCI DSS', score: 90, status: 'Compliant', lastAudit: '2024-01-12', nextAudit: '2024-07-12' }
        ],
        requirements: [
          { category: 'Access Control', compliant: 95, total: 100, critical: 2 },
          { category: 'Data Protection', compliant: 88, total: 100, critical: 1 },
          { category: 'Network Security', compliant: 92, total: 100, critical: 0 },
          { category: 'Incident Response', compliant: 85, total: 100, critical: 3 },
          { category: 'Business Continuity', compliant: 90, total: 100, critical: 1 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444'];

  const complianceChartData = complianceData ? [
    { name: 'Network', value: complianceData.complianceScores.network, color: '#3B82F6' },
    { name: 'Application', value: complianceData.complianceScores.application, color: '#10B981' },
    { name: 'Data', value: complianceData.complianceScores.data, color: '#F59E0B' },
    { name: 'Physical', value: complianceData.complianceScores.physical, color: '#8B5CF6' }
  ] : [];

  const radarData = complianceData ? [
    { subject: 'Network Security', A: complianceData.complianceScores.network, fullMark: 100 },
    { subject: 'Application Security', A: complianceData.complianceScores.application, fullMark: 100 },
    { subject: 'Data Protection', A: complianceData.complianceScores.data, fullMark: 100 },
    { subject: 'Physical Security', A: complianceData.complianceScores.physical, fullMark: 100 },
    { subject: 'Access Control', A: 95, fullMark: 100 },
    { subject: 'Incident Response', A: 85, fullMark: 100 }
  ] : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'text-green-500 bg-green-500/10';
      case 'Non-Compliant': return 'text-red-500 bg-red-500/10';
      case 'In Progress': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading compliance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Compliance Dashboard
        </h1>
        <p className="text-gray-400">Comprehensive compliance monitoring and audit management</p>
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-4">
            <span className="text-4xl font-bold text-white">{complianceData?.complianceScores.overall || 0}%</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Overall Compliance Score</h2>
          <p className="text-gray-400">Current compliance status across all frameworks</p>
        </div>
      </div>

      {/* Framework Selector */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {['overall', 'network', 'application', 'data', 'physical'].map((framework) => (
            <button
              key={framework}
              onClick={() => setSelectedFramework(framework)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFramework === framework
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {framework.charAt(0).toUpperCase() + framework.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Network Security</p>
              <p className={`text-3xl font-bold ${getScoreColor(complianceData?.complianceScores.network)}`}>
                {complianceData?.complianceScores.network || 0}%
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Application Security</p>
              <p className={`text-3xl font-bold ${getScoreColor(complianceData?.complianceScores.application)}`}>
                {complianceData?.complianceScores.application || 0}%
              </p>
            </div>
            <Zap className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Data Protection</p>
              <p className={`text-3xl font-bold ${getScoreColor(complianceData?.complianceScores.data)}`}>
                {complianceData?.complianceScores.data || 0}%
              </p>
            </div>
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Physical Security</p>
              <p className={`text-3xl font-bold ${getScoreColor(complianceData?.complianceScores.physical)}`}>
                {complianceData?.complianceScores.physical || 0}%
              </p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Compliance Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-blue-400" />
            Compliance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {complianceChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Requirements Compliance */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            Requirements Compliance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complianceData?.requirements || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }} />
              <Bar dataKey="compliant" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-400" />
          Security Posture Radar
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
            <PolarRadiusAxis stroke="#9CA3AF" />
            <Radar
              name="Compliance Score"
              dataKey="A"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Compliance Frameworks Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-orange-400" />
          Compliance Frameworks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Framework</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Audit</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Next Audit</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complianceData?.frameworks?.map((framework) => (
                <tr key={framework.name} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-medium">{framework.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-2xl font-bold ${getScoreColor(framework.score)}`}>
                      {framework.score}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                      {framework.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{framework.lastAudit}</td>
                  <td className="py-3 px-4 text-gray-300">{framework.nextAudit}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center">
          <FileText className="w-5 h-5 mr-2" />
          Generate Compliance Report
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center">
          <Award className="w-5 h-5 mr-2" />
          Schedule Audit
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          View Trends
        </button>
      </div>
    </div>
  );
};

export default Compliance; 