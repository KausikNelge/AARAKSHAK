# AARAKSHAK Backend

## Setup Instructions

1. Create a `.env` file in the Backend directory with the following content:
```
MONGO_URI=mongodb://localhost:27017/aarakshak
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Security Data
- GET `/api/security/dashboard` - Get security dashboard data
- PUT `/api/security/update` - Update security data
- GET `/api/security/trends` - Get incident trends

All security endpoints require authentication via JWT token in Authorization header. 