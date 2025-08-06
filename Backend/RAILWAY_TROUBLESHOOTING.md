# Railway 502 Error Troubleshooting Guide

## 🚨 502 Error Diagnosis

A 502 error means Railway can't reach your backend service. Here's how to fix it:

## Step 1: Check Railway Dashboard

1. Go to your Railway project dashboard
2. Click on your backend service
3. Check the **Deployments** tab - look for:
   - ❌ Failed deployments (red)
   - ⚠️ Build errors
   - 🔄 Still deploying

## Step 2: Check Environment Variables

**CRITICAL:** Ensure these environment variables are set in Railway:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aarakshak
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

⚠️ **Common Issues:**
- Missing `MONGO_URI` - service won't start
- Invalid MongoDB connection string
- Missing `JWT_SECRET`

## Step 3: Check Logs

In Railway dashboard:
1. Go to **Deploy** → **View Logs**
2. Look for these success messages:
   ```
   🚀 Server running on port 3000
   ✅ Connected to MongoDB successfully
   🌐 Railway domain: https://optimistic-smile-production.up.railway.app
   ```

3. Look for these error messages:
   ```
   ❌ MongoDB connection error
   ❌ Server error
   MONGO_URI environment variable is not set
   ```

## Step 4: Test Endpoints Manually

Once deployed, test these URLs in your browser:

1. **Root endpoint**: `https://optimistic-smile-production.up.railway.app/`
   - Should return: `{"message": "Aarakshak Backend API is running"}`

2. **Health check**: `https://optimistic-smile-production.up.railway.app/api/health`
   - Should return: `{"status": "OK", "mongodb": "connected"}`

## Step 5: Common Fixes

### Fix 1: Redeploy
- In Railway dashboard, click **Deploy** → **Redeploy**

### Fix 2: Check Build Settings
Ensure your Railway service is configured with:
- **Root Directory**: `Backend` (if your repo has frontend/Backend folders)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Fix 3: MongoDB Connection
- Verify your MongoDB Atlas cluster is running
- Check if your IP is whitelisted (use 0.0.0.0/0 for all IPs)
- Test connection string in MongoDB Compass

### Fix 4: Port Configuration
The updated code now:
- Uses Railway's assigned PORT or defaults to 3000
- Binds to '0.0.0.0' (required for Railway)
- Has proper error handling

## Step 6: Manual Testing

Use curl to test your API:

```bash
# Test root endpoint
curl https://optimistic-smile-production.up.railway.app/

# Test health endpoint
curl https://optimistic-smile-production.up.railway.app/api/health

# Test auth endpoint (should return error for missing credentials)
curl -X POST https://optimistic-smile-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

## Expected Responses

✅ **Root endpoint** should return:
```json
{
  "message": "Aarakshak Backend API is running",
  "health": "/api/health",
  "auth": "/api/auth",
  "security": "/api/security"
}
```

✅ **Health endpoint** should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "service": "Aarakshak Backend",
  "platform": "Railway",
  "port": "3000",
  "mongodb": "connected",
  "environment": "production"
}
```

## Next Steps After Fix

1. ✅ Verify health endpoint works
2. ✅ Test frontend connection
3. ✅ Test authentication flow
4. ✅ Monitor logs for any errors

## Still Having Issues?

1. **Check Railway Status**: [Railway Status Page](https://status.railway.app/)
2. **Review Railway Docs**: [Railway Node.js Guide](https://docs.railway.app/guides/nodejs)
3. **Check MongoDB Atlas**: Ensure cluster is running and accessible

## Emergency Rollback

If nothing works, you can temporarily:
1. Switch back to Render
2. Update frontend URLs back to Render domain
3. Redeploy to Render

But try the fixes above first! 🚀