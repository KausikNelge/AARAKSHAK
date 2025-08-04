import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  BarChart3, 
  Settings, 
  LogOut,
  AlertTriangle,
  Activity,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Cyber Dashboard',
      icon: Shield,
      path: '/cyber-dashboard'
    },
    {
      name: 'Threat Analysis',
      icon: AlertTriangle,
      path: '/threats'
    },
    {
      name: 'Vulnerabilities',
      icon: Activity,
      path: '/vulnerabilities'
    },
    {
      name: 'Incident Trends',
      icon: BarChart3,
      path: '/trends'
    },
    {
      name: 'Compliance',
      icon: FileText,
      path: '/compliance'
    },
    {
      name: 'Reports',
      icon: BarChart3,
      path: '/reports'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          AARAKSHAK
        </h1>
        <p className="text-gray-400 text-sm">Security Assessment Platform</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 