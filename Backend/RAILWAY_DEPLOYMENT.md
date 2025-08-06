# Railway Deployment Guide for Aarakshak Backend

## Overview
This guide explains how to deploy the Aarakshak backend to Railway using the domain: `https://aarakshak-production.up.railway.app`

## Prerequisites
1. Railway account
2. GitHub repository connected to Railway
3. MongoDB Atlas database (or other MongoDB instance)

## Deployment Steps

### 1. Railway Project Setup
1. Go to [Railway](https://railway.app)
2. Create a new project or use existing project
3. Connect your GitHub repository
4. Select the `Backend` folder as the root directory

### 2. Environment Variables
Set the following environment variables in Railway dashboard:

```bash
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/aarakshak
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
PORT=3000
```

### 3. Domain Configuration
- Railway will automatically assign the domain: `aarakshak-production.up.railway.app`
- The backend is configured to accept requests from this domain
- Health check endpoint: `https://aarakshak-production.up.railway.app/api/health`

### 4. Deployment Process
1. Push your code to the main branch
2. Railway will automatically detect changes and deploy
3. Monitor deployment logs in Railway dashboard
4. Verify deployment by accessing the health endpoint

### 5. Frontend Configuration
The frontend has been updated to use the Railway domain:
- All API calls now point to `https://aarakshak-production.up.railway.app`
- CORS is configured to allow requests from Vercel domains

### 6. Configuration Files
- `railway.toml`: Railway-specific configuration
- `nixpacks.toml`: Build configuration for Railway's Nixpacks builder
- Health check endpoint at `/api/health`

### 7. Testing Deployment
Test the following endpoints:
- Health: `GET /api/health`
- Auth: `POST /api/auth/login`
- Security: `GET /api/security/test-dashboard`

### 8. Monitoring
- Use Railway dashboard for logs and metrics
- Monitor application performance and errors
- Set up alerts for downtime or errors

## Important Notes
- Railway uses Nixpacks for building Node.js applications
- The application runs on port 3000 (configurable via PORT env var)
- Health checks are configured with 300-second timeout
- Auto-restart on failure is enabled

## Migration from Render
- All frontend URLs updated from `aarakshak-backend.onrender.com` to `aarakshak-production.up.railway.app`
- CORS configuration includes Railway domain
- No code changes required beyond URL updates

## Troubleshooting
- Check Railway logs if deployment fails
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid
- Test health endpoint for basic connectivity