import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Palette, Database, Key, Eye, EyeOff, Save, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Security Administrator',
      department: 'IT Security'
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      failedLoginAttempts: 5,
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      notifications: {
        securityAlerts: true,
        loginAttempts: true,
        systemUpdates: false,
        reportGeneration: true
      }
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      logLevel: 'info',
      maintenanceMode: false,
      apiRateLimit: 1000
    }
  });

  const handleSave = async (section) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success(`${section} settings saved successfully!`);
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'system', name: 'System', icon: SettingsIcon }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-400" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              value={settings.profile.firstName}
              onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={settings.profile.lastName}
              onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={settings.profile.username}
              onChange={(e) => handleInputChange('profile', 'username', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
            <input
              type="text"
              value={settings.profile.role}
              onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              value={settings.profile.department}
              onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-green-400" />
          Password Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none pr-10"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-400" />
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Two-Factor Authentication</h4>
              <p className="text-gray-400 text-sm">Enable 2FA for enhanced security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorEnabled}
                onChange={(e) => handleInputChange('security', 'twoFactorEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Failed Login Attempts</label>
            <input
              type="number"
              value={settings.security.failedLoginAttempts}
              onChange={(e) => handleInputChange('security', 'failedLoginAttempts', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-400" />
          Notification Settings
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.security.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                <p className="text-gray-400 text-sm">Receive notifications for {key.toLowerCase()}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNestedChange('security', 'notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-purple-400" />
          Display Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Theme</label>
            <select
              value={settings.preferences.theme}
              onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Language</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Timezone</label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Date Format</label>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-400" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white capitalize">{key} Notifications</h4>
                <p className="text-gray-400 text-sm">Receive {key.toLowerCase()} notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNestedChange('preferences', 'notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-green-400" />
          Backup Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Auto Backup</h4>
              <p className="text-gray-400 text-sm">Automatically backup system data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.system.autoBackup}
                onChange={(e) => handleInputChange('system', 'autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Backup Frequency</label>
            <select
              value={settings.system.backupFrequency}
              onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Retention Period (days)</label>
            <input
              type="number"
              value={settings.system.retentionPeriod}
              onChange={(e) => handleInputChange('system', 'retentionPeriod', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2 text-orange-400" />
          System Configuration
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Log Level</label>
            <select
              value={settings.system.logLevel}
              onChange={(e) => handleInputChange('system', 'logLevel', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">API Rate Limit</label>
            <input
              type="number"
              value={settings.system.apiRateLimit}
              onChange={(e) => handleInputChange('system', 'apiRateLimit', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Maintenance Mode</h4>
              <p className="text-gray-400 text-sm">Enable maintenance mode for system updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.system.maintenanceMode}
                onChange={(e) => handleInputChange('system', 'maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'system':
        return renderSystemTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400">Configure your account, security, and system preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave(activeTab)}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 