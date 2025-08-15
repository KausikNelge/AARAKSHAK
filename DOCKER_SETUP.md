# Docker Setup for Aarakshak Backend

This guide will help you run the Aarakshak backend locally using Docker while keeping your frontend on Vercel and database on MongoDB Atlas.

## 🏗️ Architecture Overview

- **Frontend**: Hosted on Vercel (unchanged)
- **Backend**: Running locally on Docker (port 3001)
- **Database**: MongoDB Atlas (unchanged)

## 📋 Prerequisites

1. **Docker Desktop** installed on your computer
2. **MongoDB Atlas** account and cluster
3. **Node.js** (for running scripts)

## 🚀 Quick Setup

### 1. Environment Configuration

Copy the environment template and configure it:

```bash
# Copy the environment template
cp Backend/env.example Backend/.env

# Edit the .env file with your MongoDB Atlas URI
```

Update `Backend/.env` with your MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/aarakshak?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=3000
```

### 2. Update Frontend API Configuration

Run the script to update all frontend files to use the new API configuration:

```bash
node update-frontend-api.js
```

This script will:
- Replace hardcoded Railway URLs with relative paths
- Add API configuration imports
- Create API instances in components

### 3. Start the Backend with Docker

```bash
# Build and start the backend container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Verify the Setup

- **Backend Health Check**: http://localhost:3001/api/health
- **Backend Root**: http://localhost:3001/
- **Frontend**: Your Vercel URL (will automatically connect to local backend when running locally)

## 🔧 Configuration Details

### Docker Compose Configuration

The `docker-compose.yml` file:
- Maps host port 3001 to container port 3000
- Mounts the backend code for live development
- Includes health checks
- Uses environment variables from `.env`

### API Configuration

The frontend now uses `frontend/src/config/api.js` to:
- Automatically detect environment (local vs production)
- Use local backend (localhost:3001) when running locally
- Use Railway backend when deployed on Vercel

### CORS Configuration

The backend dynamically configures CORS based on environment:
- **Development**: Allows localhost:3000 and localhost:3001
- **Production**: Allows Vercel domains and Railway domain

## 🛠️ Development Workflow

### Running Locally

1. **Start Backend**:
   ```bash
   docker-compose up --build
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### Making Changes

- **Backend changes**: The Docker volume mount allows live reloading
- **Frontend changes**: Standard React development server
- **Database changes**: Directly in MongoDB Atlas

### Stopping Services

```bash
# Stop Docker containers
docker-compose down

# Stop frontend (Ctrl+C in terminal)
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Check what's using port 3001
   netstat -ano | findstr :3001
   
   # Kill the process or change port in docker-compose.yml
   ```

2. **MongoDB Connection Issues**:
   - Verify your Atlas connection string
   - Check network access in Atlas
   - Ensure IP whitelist includes your IP

3. **CORS Errors**:
   - Check browser console for blocked origins
   - Verify CORS configuration in backend
   - Ensure frontend is running on localhost:3000

4. **Docker Build Issues**:
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Logs and Debugging

```bash
# View backend logs
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f backend

# Access container shell
docker-compose exec backend sh
```

## 📊 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Backend port | `3000` |
| `CORS_ORIGINS` | Additional CORS origins | `https://your-domain.com` |

## 🔄 Switching Between Environments

### Local Development
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`
- Database: MongoDB Atlas

### Production
- Backend: Railway (automatic)
- Frontend: Vercel (automatic)
- Database: MongoDB Atlas

The frontend automatically detects the environment and uses the appropriate backend URL.

## 🚀 Deployment

### Backend to Railway
```bash
# Push to main branch (Railway auto-deploys)
git push origin main
```

### Frontend to Vercel
```bash
# Push to main branch (Vercel auto-deploys)
git push origin main
```

## 📝 Notes

- The backend will automatically use Railway in production
- The frontend will automatically use the local backend when running locally
- All database operations go through MongoDB Atlas
- CORS is configured to work in both environments
- Health checks ensure the backend is running properly

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker-compose logs backend`
2. Verify environment variables
3. Test the health endpoint: http://localhost:3001/api/health
4. Check MongoDB Atlas connection 