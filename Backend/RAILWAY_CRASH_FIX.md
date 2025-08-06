# Railway "Application failed to respond" Fix

## 🚨 **IMMEDIATE ACTIONS**

### 1. Check Railway Logs
Go to your Railway dashboard → Deploy → View Logs and look for:

**✅ Good Logs (should see):**
```
🔄 Starting Aarakshak Backend...
📋 Environment: production
🔗 Port: [some number]
🚀 Server running on port [number]
```

**❌ Bad Logs (crash indicators):**
```
❌ MongoDB connection error
❌ Server error
❌ Failed to start server
MONGO_URI environment variable is not set
```

### 2. Environment Variables Check
**CRITICAL:** In Railway dashboard, ensure these are set:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aarakshak
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

**⚠️ DO NOT SET PORT** - Railway handles this automatically

### 3. Test Startup Locally
Before deploying to Railway, test locally:

```bash
cd Backend
npm install
npm run test-startup
```

Should see:
```
🚀 Starting Aarakshak Backend Test...
✅ Express loaded successfully
✅ Test server running on port 3000
🎉 Startup test completed successfully!
```

### 4. Common Crash Causes & Fixes

#### **Cause 1: Missing MONGO_URI**
**Fix:** Set MONGO_URI in Railway environment variables
**Test:** `npm run test-startup` will show if MONGO_URI is set

#### **Cause 2: Invalid MongoDB Connection**
**Fix:** 
- Verify MongoDB Atlas cluster is running
- Check connection string format
- Ensure IP whitelist includes 0.0.0.0/0

#### **Cause 3: Port Binding Issues**
**Fix:** Updated code now uses `'0.0.0.0'` binding (required for Railway)

#### **Cause 4: Missing Dependencies**
**Fix:** Ensure all dependencies are in package.json (they are)

### 5. Railway-Specific Fixes

#### **Fix 1: Force Redeploy**
1. Go to Railway dashboard
2. Click **Deploy** → **Redeploy**
3. Watch logs for startup messages

#### **Fix 2: Check Build Settings**
Ensure Railway service is configured with:
- **Root Directory**: `Backend` (if repo has frontend/Backend folders)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### **Fix 3: Test with Minimal Setup**
If still crashing, temporarily use the test file:

1. Change Railway start command to: `npm run test-startup`
2. Deploy and check if basic server starts
3. If test works, switch back to `npm start`

### 6. Debugging Steps

#### **Step 1: Check Logs**
```bash
# In Railway dashboard, look for these patterns:
✅ Good: "Server running on port"
❌ Bad: "MongoDB connection error"
❌ Bad: "Failed to start server"
```

#### **Step 2: Test Endpoints**
Once deployed, test:
- `https://optimistic-smile-production.up.railway.app/`
- `https://optimistic-smile-production.up.railway.app/api/health`

#### **Step 3: Environment Check**
The updated code will log environment info:
```
📋 Environment: production
🔗 Port: [Railway assigned port]
```

### 7. Emergency Fallback

If nothing works:

1. **Temporary Fix**: Use test-startup.js
   ```bash
   # Change Railway start command to:
   npm run test-startup
   ```

2. **Rollback to Render**: 
   - Update frontend URLs back to Render
   - Deploy to Render temporarily

### 8. Expected Success Logs

After fixing, you should see in Railway logs:
```
🔄 Starting Aarakshak Backend...
📋 Environment: production
🔗 Port: [Railway port]
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully
🚀 Server running on port [Railway port]
📍 Environment: production
🔗 Health check: http://localhost:[port]/api/health
🌐 Railway domain: https://optimistic-smile-production.up.railway.app
```

## 🎯 **Next Steps**

1. ✅ Check Railway logs for specific error messages
2. ✅ Verify environment variables are set
3. ✅ Test locally with `npm run test-startup`
4. ✅ Redeploy to Railway
5. ✅ Test endpoints once deployed

**Share the Railway logs with me if you're still having issues!** 📊 