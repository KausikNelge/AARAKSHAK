import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Eye, Lock, ArrowRight, ChevronDown } from 'lucide-react';

const Landing = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AARAKSHAK
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Cyber
            </span>
            <br />
            <span className="text-white">Security</span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced threat detection, real-time monitoring, and comprehensive security analytics. 
            Protect your digital assets with cutting-edge cybersecurity technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              to="/register"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={scrollToFeatures}
              className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
            >
              <span>Learn More</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Advanced Security
            </span>
            <br />
            <span className="text-white">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Threat Detection</h3>
              <p className="text-gray-300 leading-relaxed">
                Real-time monitoring and advanced threat detection using machine learning algorithms 
                to identify and neutralize security risks before they become threats.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-time Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive security analytics with interactive dashboards, 
                providing insights into vulnerabilities, breaches, and compliance status.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">24/7 Monitoring</h3>
              <p className="text-gray-300 leading-relaxed">
                Continuous monitoring of your digital infrastructure with instant alerts 
                and automated response systems to ensure maximum protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ready to Secure
            </span>
            <br />
            <span className="text-white">Your Digital World?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of organizations that trust AARAKSHAK for their cybersecurity needs. 
            Start your free trial today and experience the future of security.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AARAKSHAK
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 AARAKSHAK. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 