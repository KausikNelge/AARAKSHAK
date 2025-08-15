import React, { useState, useEffect } from 'react';
import createApiInstance from '../config/api';
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
  CheckCircle,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  Lock,
  Globe,
  Server
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import toast from 'react-hot-toast';

const CyberDashboard = () => {
  const api = createApiInstance();
  const [securityData, setSecurityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breachData, setBreachData] = useState(null);
  const [virusTotalData, setVirusTotalData] = useState(null);
  const [cloudSecurityData, setCloudSecurityData] = useState(null);
  const [emailToCheck, setEmailToCheck] = useState('');
  const [urlToScan, setUrlToScan] = useState('');

  useEffect(() => {
    fetchSecurityData();
    fetchMockBreachData();
    fetchMockVirusTotalData();
    fetchMockCloudSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      setLoading(true);
              const response = await api.get('/api/security/test-dashboard');
      setSecurityData(response.data);
    } catch (error) {
      toast.error('Failed to fetch security data');
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMockBreachData = async () => {
    try {
              const response = await api.get('/api/breach-check/test@example.com');
      setBreachData(response.data);
    } catch (error) {
      console.error('Error fetching breach data:', error);
      // Fallback to mock data
      setBreachData({
        email: 'test@example.com',
        breaches: [
          { name: 'Adobe', date: '2013-10-04', count: 153000000, types: ['email addresses', 'password hints', 'passwords'] },
          { name: 'LinkedIn', date: '2012-05-05', count: 165000000, types: ['email addresses', 'passwords'] },
          { name: 'MySpace', date: '2008-06-11', count: 360000000, types: ['email addresses', 'passwords', 'usernames'] }
        ],
        totalBreaches: 3,
        totalRecords: 678000000
      });
    }
  };

  const fetchMockVirusTotalData = async () => {
    try {
              const response = await api.get('/api/virus-total/https://example.com');
      setVirusTotalData(response.data);
    } catch (error) {
      console.error('Error fetching VirusTotal data:', error);
      // Fallback to mock data
      setVirusTotalData({
        url: 'https://example.com',
        scanDate: '2024-01-15',
        malicious: 2,
        suspicious: 1,
        clean: 85,
        total: 88,
        engines: [
          { name: 'Google Safe Browsing', result: 'clean' },
          { name: 'Norton', result: 'clean' },
          { name: 'McAfee', result: 'clean' },
          { name: 'Kaspersky', result: 'malicious' },
          { name: 'Avast', result: 'clean' }
        ]
      });
    }
  };

  const fetchMockCloudSecurityData = async () => {
    try {
              const response = await api.get('/api/cloud-security');
      setCloudSecurityData(response.data);
    } catch (error) {
      console.error('Error fetching cloud security data:', error);
      // Fallback to mock data
      setCloudSecurityData({
        aws: {
          iamUsers: 12,
          exposedSecrets: 3,
          publicBuckets: 2,
          complianceScore: 85
        },
        gcp: {
          serviceAccounts: 8,
          exposedKeys: 1,
          publicDatasets: 0,
          complianceScore: 92
        },
        azure: {
          activeUsers: 15,
          exposedCredentials: 2,
          publicContainers: 1,
          complianceScore: 78
        }
      });
    }
  };

  const checkEmailBreach = async () => {
    if (!emailToCheck) {
      toast.error('Please enter an email address');
      return;
    }
    
    toast.loading('Checking for breaches...');
    try {
              const response = await axios.get(`https://optimistic-smile-production.up.railway.app/api/breach-check/${encodeURIComponent(emailToCheck)}`);
      setBreachData(response.data);
      toast.dismiss();
      toast.success('Breach check completed');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to check breaches');
      console.error('Error checking breaches:', error);
    }
  };

  const scanUrl = async () => {
    if (!urlToScan) {
      toast.error('Please enter a URL to scan');
      return;
    }
    
    toast.loading('Scanning URL...');
    try {
              const response = await axios.get(`https://optimistic-smile-production.up.railway.app/api/virus-total/${encodeURIComponent(urlToScan)}`);
      setVirusTotalData(response.data);
      toast.dismiss();
      toast.success('URL scan completed');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to scan URL');
      console.error('Error scanning URL:', error);
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

  const breachTypeData = breachData?.breaches.reduce((acc, breach) => {
    breach.types.forEach(type => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {}) || {};

  const breachChartData = Object.entries(breachTypeData).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cyber Security Dashboard</h1>
            <p className="text-gray-600">Advanced threat detection & security analytics</p>
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

        {/* Third-Party API Integration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Have I Been Pwned */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Have I Been Pwned
              </h3>
              <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email to check"
                  value={emailToCheck}
                  onChange={(e) => setEmailToCheck(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={checkEmailBreach}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {breachData && (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-red-800">Breaches Found</span>
                      <span className="text-lg font-bold text-red-600">{breachData.totalBreaches}</span>
                    </div>
                    <div className="text-xs text-red-600 mt-1">
                      {breachData.totalRecords.toLocaleString()} records exposed
                    </div>
                  </div>

                  <div className="space-y-2">
                    {breachData.breaches.map((breach, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">{breach.name}</div>
                            <div className="text-sm text-gray-500">{breach.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {breach.count.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">records</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VirusTotal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                VirusTotal Scan
              </h3>
              <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-green-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Enter URL to scan"
                  value={urlToScan}
                  onChange={(e) => setUrlToScan(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={scanUrl}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {virusTotalData && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-green-600">{virusTotalData.clean}</div>
                      <div className="text-xs text-green-600">Clean</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-yellow-600">{virusTotalData.suspicious}</div>
                      <div className="text-xs text-yellow-600">Suspicious</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-red-600">{virusTotalData.malicious}</div>
                      <div className="text-xs text-red-600">Malicious</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {virusTotalData.engines.slice(0, 3).map((engine, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{engine.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          engine.result === 'clean' ? 'bg-green-100 text-green-800' :
                          engine.result === 'malicious' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {engine.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cloud Security */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-600" />
                Cloud Security
              </h3>
              <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-purple-600" />
            </div>
            
            {cloudSecurityData && (
              <div className="space-y-4">
                {Object.entries(cloudSecurityData).map(([provider, data]) => (
                  <div key={provider} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 capitalize">{provider}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        data.complianceScore >= 90 ? 'bg-green-100 text-green-800' :
                        data.complianceScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.complianceScore}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-600">
                        Users: <span className="font-medium">{data.iamUsers || data.serviceAccounts || data.activeUsers}</span>
                      </div>
                      <div className="text-gray-600">
                        Exposed: <span className="font-medium text-red-600">{data.exposedSecrets || data.exposedKeys || data.exposedCredentials}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

          {/* Breach Types */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Breach Data Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={breachChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {breachChartData.map((entry, index) => (
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
          <div className="bg-white rounded-xl shadow-lg p-6">
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
              <Download className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CyberDashboard; 