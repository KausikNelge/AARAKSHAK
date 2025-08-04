import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Eye, Calendar, TrendingUp, AlertTriangle, Shield, Activity, Zap, Target, Filter, Search, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Mock reports data
      const mockReports = [
        {
          id: 1,
          title: 'Monthly Security Assessment',
          type: 'Security',
          status: 'Completed',
          date: '2024-01-15',
          size: '2.4 MB',
          format: 'PDF',
          description: 'Comprehensive security assessment report for January 2024',
          metrics: { threats: 45, vulnerabilities: 12, incidents: 8, compliance: 92 }
        },
        {
          id: 2,
          title: 'Vulnerability Scan Report',
          type: 'Vulnerability',
          status: 'Completed',
          date: '2024-01-14',
          size: '1.8 MB',
          format: 'PDF',
          description: 'Detailed vulnerability assessment and remediation recommendations',
          metrics: { critical: 3, high: 8, medium: 15, low: 24 }
        },
        {
          id: 3,
          title: 'Compliance Audit Report',
          type: 'Compliance',
          status: 'In Progress',
          date: '2024-01-13',
          size: '3.2 MB',
          format: 'PDF',
          description: 'ISO 27001 compliance audit findings and recommendations',
          metrics: { compliant: 89, nonCompliant: 11, critical: 2, warnings: 5 }
        },
        {
          id: 4,
          title: 'Incident Response Summary',
          type: 'Incident',
          status: 'Completed',
          date: '2024-01-12',
          size: '1.5 MB',
          format: 'PDF',
          description: 'Summary of security incidents and response actions taken',
          metrics: { resolved: 15, active: 3, escalated: 2, total: 20 }
        },
        {
          id: 5,
          title: 'Threat Intelligence Report',
          type: 'Threat',
          status: 'Completed',
          date: '2024-01-11',
          size: '2.1 MB',
          format: 'PDF',
          description: 'Analysis of emerging threats and security recommendations',
          metrics: { malware: 12, phishing: 8, ddos: 3, insider: 2 }
        }
      ];
      setReports(mockReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-500 bg-green-500/10';
      case 'In Progress': return 'text-yellow-500 bg-yellow-500/10';
      case 'Pending': return 'text-blue-500 bg-blue-500/10';
      case 'Failed': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Security': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'Vulnerability': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'Compliance': return <FileText className="w-5 h-5 text-green-500" />;
      case 'Incident': return <Activity className="w-5 h-5 text-red-500" />;
      case 'Threat': return <Target className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredReports = reports.filter(report => {
    if (reportType !== 'all' && report.type !== reportType) return false;
    return true;
  });

  const generateReport = (type) => {
    toast.loading('Generating report...');
    setTimeout(() => {
      toast.dismiss();
      toast.success(`${type} report generated successfully!`);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Security Reports
        </h1>
        <p className="text-gray-400">Generate, view, and manage comprehensive security reports</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => generateReport('Security Assessment')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Shield className="w-5 h-5 mr-2" />
          Security Assessment
        </button>
        <button 
          onClick={() => generateReport('Vulnerability Scan')}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Vulnerability Scan
        </button>
        <button 
          onClick={() => generateReport('Compliance Audit')}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FileText className="w-5 h-5 mr-2" />
          Compliance Audit
        </button>
        <button 
          onClick={() => generateReport('Threat Intelligence')}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Target className="w-5 h-5 mr-2" />
          Threat Intelligence
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Types</option>
            <option value="Security">Security</option>
            <option value="Vulnerability">Vulnerability</option>
            <option value="Compliance">Compliance</option>
            <option value="Incident">Incident</option>
            <option value="Threat">Threat</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-3xl font-bold text-white">{reports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-500">
                {reports.filter(r => r.status === 'Completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-yellow-500">
                {reports.filter(r => r.status === 'In Progress').length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Size</p>
              <p className="text-3xl font-bold text-purple-500">
                {reports.reduce((acc, r) => acc + parseFloat(r.size), 0).toFixed(1)} MB
              </p>
            </div>
            <Download className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-400" />
          Recent Reports
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Report</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Format</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-gray-400">{report.description}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getTypeIcon(report.type)}
                      <span className="ml-2">{report.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{report.date}</td>
                  <td className="py-3 px-4 text-gray-300">{report.size}</td>
                  <td className="py-3 px-4 text-gray-300">{report.format}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Report Details</h3>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Report Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Title</p>
                    <p className="text-white font-medium">{selectedReport.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Type</p>
                    <div className="flex items-center">
                      {getTypeIcon(selectedReport.type)}
                      <span className="ml-2">{selectedReport.type}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">{selectedReport.date}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Description</h4>
                <p className="text-gray-400">{selectedReport.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-300 mb-4">Key Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedReport.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-700/50 rounded-lg p-3">
                      <p className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-white font-bold text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Report
                </button>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                  Share Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 