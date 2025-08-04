# AARAKSHAK - Advanced Cybersecurity Platform

A modern, high-tech cybersecurity assessment platform with a cyberpunk aesthetic, featuring advanced threat detection, real-time monitoring, and comprehensive security analytics.

## 🚀 Features

### Landing Page
- **Cyberpunk Design**: Dark theme with gradient animations and glassmorphism effects
- **Parallax Scrolling**: Smooth scroll effects and animated background elements
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Interactive Elements**: Hover effects, smooth transitions, and animated components

### Authentication System
- **Secure Registration/Login**: Modern forms with validation
- **Password Encryption**: Bcrypt hashing for security
- **JWT Authentication**: Protected routes and session management
- **User Management**: Profile management and secure logout

### Cybersecurity Dashboard
- **Real-time Security Metrics**: Live threat detection and vulnerability assessment
- **Interactive Visualizations**: Charts and graphs using Recharts
- **Third-party API Integration**:
  - **Have I Been Pwned**: Email breach lookup and analysis
  - **VirusTotal**: URL and file scanning capabilities
  - **Cloud Security**: AWS, GCP, Azure security monitoring

### Advanced Analytics
- **Threat Categories**: Malware, phishing, DDoS, insider threats, social engineering
- **Vulnerability Assessment**: Critical, high, medium, low risk classifications
- **Compliance Monitoring**: Network, application, data, physical security scores
- **Incident Tracking**: Real-time incident trends and historical data

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with hooks and modern patterns
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Interactive data visualizations
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API calls
- **React Hot Toast**: User notifications

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

### Third-party Integrations
- **Have I Been Pwned API**: Data breach monitoring
- **VirusTotal API**: Malware and URL scanning
- **Cloud Provider APIs**: AWS, GCP, Azure security assessment

## 📁 Project Structure

```
AARAKSHAK/
├── Backend/
│   ├── index.js              # Main server file
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   └── SecurityData.js  # Security data model
│   └── routes/
│       ├── auth.js          # Authentication routes
│       ├── security.js      # Security data routes
│       └── api.js           # Third-party API routes
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── StatCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Cyberpunk landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CyberDashboard.jsx   # Enhanced security dashboard
│   │   │   └── ThreatAnalysis.jsx
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AARAKSHAK
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install --legacy-peer-deps
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in root directory
   echo "MONGO_URI=mongodb://localhost:27017/aarakshak" > .env
   echo "JWT_SECRET=your-super-secret-jwt-key-change-this-in-production" >> .env
   echo "PORT=5000" >> .env
   ```

4. **Start the servers**
   ```bash
   # Start backend server
   cd Backend
   npm start
   
   # In a new terminal, start frontend
   cd frontend
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Security Data
- `GET /api/security/dashboard` - Get security dashboard data
- `GET /api/security/test-dashboard` - Get test data (no auth required)
- `POST /api/security/generate-data` - Generate fresh security data

### Third-party Integrations
- `GET /api/breach-check/:email` - Check email for data breaches
- `GET /api/virus-total/:url` - Scan URL for malware
- `GET /api/cloud-security` - Get cloud security metrics
- `POST /api/security-scan` - Perform security scans

## 🎨 Design Features

### Cyberpunk Aesthetic
- **Dark Theme**: Black and dark gray backgrounds
- **Neon Accents**: Blue, purple, and pink gradient effects
- **Glassmorphism**: Translucent cards with backdrop blur
- **Animated Elements**: Floating particles and glow effects
- **Smooth Transitions**: CSS animations and hover effects

### Interactive Components
- **Parallax Scrolling**: Background elements move at different speeds
- **Hover Effects**: Cards and buttons respond to user interaction
- **Loading States**: Spinners and progress indicators
- **Toast Notifications**: User feedback for actions

## 📊 Dashboard Features

### Security Metrics
- **Total Threats**: Real-time threat count
- **Critical Vulnerabilities**: High-risk security issues
- **Compliance Score**: Overall security compliance percentage
- **Active Incidents**: Current security incidents

### Data Visualizations
- **Pie Charts**: Threat category distribution
- **Bar Graphs**: Vulnerability severity levels
- **Line Charts**: Incident trends over time
- **Compliance Scores**: Multi-domain security assessment

### Third-party Integrations
- **Have I Been Pwned**: Email breach detection
- **VirusTotal**: URL and file scanning
- **Cloud Security**: AWS, GCP, Azure monitoring

## 🔒 Security Features

- **Password Hashing**: Bcrypt encryption
- **JWT Tokens**: Secure session management
- **Protected Routes**: Authentication middleware
- **CORS Configuration**: Cross-origin security
- **Input Validation**: Form validation and sanitization

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd Backend
# Set production environment variables
npm start
# Deploy to your server or cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**AARAKSHAK** - Advanced Cybersecurity Platform with Cyberpunk Aesthetic