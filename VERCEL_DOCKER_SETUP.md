# Vercel Frontend + Local Docker Backend Setup

This guide will help you connect your Vercel-hosted frontend to your locally running Docker backend using ngrok tunneling.

## 🎯 Goal

- **Frontend**: Hosted on Vercel (cloud)
- **Backend**: Running locally on Docker (your computer)
- **Database**: MongoDB Atlas (cloud)
- **Connection**: Vercel frontend → ngrok tunnel → local Docker backend

## 🚀 Quick Setup

### Step 1: Set up Environment Variables

```bash
# Copy environment template
cp Backend/env.example Backend/.env

# Edit Backend/.env with your MongoDB Atlas URI
```

### Step 2: Start Docker with ngrok

```bash
# Build and start Docker containers (includes ngrok)
docker-compose up --build
```

### Step 3: Get ngrok URL

1. Open http://localhost:4040 in your browser
2. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

### Step 4: Configure Vercel Frontend

**Option A: Using the UI Component (Recommended)**
1. Deploy your frontend to Vercel
2. Open your Vercel app
3. Look for the "Docker Backend Connection" widget in the bottom-right corner
4. Click the settings icon (⚙️)
5. Enter your ngrok URL and click "Set URL"
6. Click "Test" to verify the connection

**Option B: Using Browser Console**
1. Open your Vercel app
2. Open browser console (F12)
3. Run: `localStorage.setItem('ngrok_url', 'https://your-ngrok-url.ngrok.io')`
4. Refresh the page

## 🔧 Detailed Configuration

### Docker Compose Setup

The `docker-compose.yml` includes:
- **Backend service**: Your Node.js API on port 3001
- **Ngrok service**: Tunneling service that exposes your local backend to the internet

### Frontend API Configuration

The frontend automatically detects:
- **Local development**: Uses `localhost:3001`
- **Vercel with ngrok**: Uses the ngrok URL from localStorage
- **Production**: Uses Railway backend

### CORS Configuration

The backend dynamically allows:
- Localhost origins for local development
- Vercel domains for production
- Ngrok URLs for Vercel → local connections

## 🛠️ Development Workflow

### 1. Start Local Development

```bash
# Start Docker with ngrok
docker-compose up --build

# In another terminal, start frontend locally
cd frontend
npm start
```

### 2. Deploy to Vercel

```bash
# Push to main branch (Vercel auto-deploys)
git push origin main
```

### 3. Connect Vercel to Local Backend

1. Get ngrok URL from http://localhost:4040
2. Use the UI component or browser console to set the URL
3. Your Vercel frontend now connects to your local Docker backend!

## 🔍 Troubleshooting

### Common Issues

1. **Ngrok URL not working**:
   ```bash
   # Check if ngrok is running
   docker-compose ps
   
   # Check ngrok logs
   docker-compose logs ngrok
   ```

2. **CORS errors**:
   - Ensure your ngrok URL is added to CORS origins
   - Check browser console for blocked origins

3. **Connection timeout**:
   - Verify your Docker backend is running
   - Check ngrok tunnel status at http://localhost:4040

4. **Vercel not connecting**:
   - Clear browser cache
   - Check if ngrok URL is set in localStorage
   - Verify ngrok URL is accessible

### Debugging Commands

```bash
# Check Docker containers
docker-compose ps

# View backend logs
docker-compose logs backend

# View ngrok logs
docker-compose logs ngrok

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up --build --force-recreate
```

## 📊 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | JWT authentication secret | ✅ |
| `NODE_ENV` | Environment mode | ✅ |
| `NGROK_AUTHTOKEN` | Ngrok authentication token | ❌ |

## 🔄 Switching Between Environments

### Local Development
- Frontend: `http://localhost:3000` → Backend: `http://localhost:3001`
- No ngrok needed

### Vercel + Local Backend
- Frontend: Vercel → Backend: ngrok URL → local Docker
- Use UI component to set ngrok URL

### Production
- Frontend: Vercel → Backend: Railway
- Automatic fallback

## 🎯 Benefits

1. **Real-time Development**: Changes to local backend are immediately reflected in Vercel frontend
2. **No Code Changes**: Automatic environment detection
3. **Easy Switching**: UI component for quick configuration
4. **Secure**: ngrok provides HTTPS tunneling
5. **Cost-effective**: No need for additional cloud backend during development

## 🚨 Important Notes

1. **Ngrok URLs change**: Each time you restart ngrok, you get a new URL
2. **Local Computer**: Your computer must be running for Vercel to connect
3. **Internet Required**: ngrok needs internet to create the tunnel
4. **Rate Limits**: Free ngrok has rate limits; consider paid plan for production use

## 🆘 Support

If you encounter issues:

1. **Check ngrok status**: http://localhost:4040
2. **Verify Docker**: `docker-compose ps`
3. **Test connection**: Use the "Test" button in the UI component
4. **Check logs**: `docker-compose logs`
5. **Clear cache**: Clear browser localStorage and refresh

## 🎉 Success Indicators

- ✅ Ngrok tunnel active at http://localhost:4040
- ✅ Backend health check passes: `https://your-ngrok-url.ngrok.io/api/health`
- ✅ Vercel frontend shows "Connected to local backend" in UI component
- ✅ API calls from Vercel reach your local Docker backend

Your Vercel frontend is now successfully connected to your local Docker backend! 🚀 