import React, { useState, useEffect } from 'react';
import { setNgrokUrl, getNgrokUrl, clearNgrokUrl, getEnvironment } from '../config/api';
import { Settings, Link, Unlink, CheckCircle, AlertCircle } from 'lucide-react';

const NgrokConfig = () => {
  const [ngrokUrl, setNgrokUrlState] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState('');

  useEffect(() => {
    // Load current ngrok URL from localStorage
    const currentUrl = getNgrokUrl();
    if (currentUrl) {
      setNgrokUrlState(currentUrl);
    }
    
    // Get current environment
    setCurrentEnvironment(getEnvironment());
  }, []);

  const handleSetNgrokUrl = () => {
    if (ngrokUrl.trim()) {
      setNgrokUrl(ngrokUrl.trim());
      setIsConfiguring(false);
      setShowConfig(false);
    }
  };

  const handleClearNgrokUrl = () => {
    clearNgrokUrl();
    setNgrokUrlState('');
    setIsConfiguring(false);
    setShowConfig(false);
  };

  const handleTestConnection = async () => {
    if (!ngrokUrl) return;
    
    try {
      const response = await fetch(`${ngrokUrl}/api/health`);
      if (response.ok) {
        alert('✅ Connection successful! Your Vercel frontend can now connect to your local Docker backend.');
      } else {
        alert('❌ Connection failed. Please check your ngrok URL and ensure your Docker backend is running.');
      }
    } catch (error) {
      alert('❌ Connection failed. Please check your ngrok URL and ensure your Docker backend is running.');
    }
  };

  // Only show this component on Vercel
  if (!window.location.hostname.includes('vercel.app')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Docker Backend Connection</h3>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showConfig ? '×' : '⚙️'}
          </button>
        </div>

        {currentEnvironment === 'development' && (
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">Connected to local backend</span>
          </div>
        )}

        {ngrokUrl && (
          <div className="mb-3 p-2 bg-blue-50 rounded border border-blue-200">
            <div className="flex items-center space-x-2">
              <Link className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800 font-mono truncate">{ngrokUrl}</span>
            </div>
          </div>
        )}

        {showConfig && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngrok URL
              </label>
              <input
                type="url"
                value={ngrokUrl}
                onChange={(e) => setNgrokUrlState(e.target.value)}
                placeholder="https://abc123.ngrok.io"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleSetNgrokUrl}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Set URL
              </button>
              <button
                onClick={handleTestConnection}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Test
              </button>
            </div>
            
            {ngrokUrl && (
              <button
                onClick={handleClearNgrokUrl}
                className="w-full bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Clear URL
              </button>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          <p>💡 Get ngrok URL from: http://localhost:4040</p>
          <p>🔧 Run: docker-compose up --build</p>
        </div>
      </div>
    </div>
  );
};

export default NgrokConfig; 