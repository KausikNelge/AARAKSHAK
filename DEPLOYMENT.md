# 🚀 AARAKSHAK Deployment Guide

## 📋 Overview
This guide will help you deploy the AARAKSHAK security assessment platform with:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier recommended)

### 1.2 Configure Database Access
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create a username and password (save these!)
4. Set privileges to **Read and write to any database**

### 1.3 Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Add these Render IP addresses:
   - `35.160.120.126`
   - `44.233.151.27`
   - `34.211.200.85`
4. Or click **Allow Access from Anywhere** (0.0.0.0/0) for testing

### 1.4 Get Connection String
1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `aarakshak`

**Example:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/aarakshak?retryWrites=true&w=majority
```

---

## ⚙️ Step 2: Render Backend Deployment

### 2.1 Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `aarakshak-backend`
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### 2.2 Set Environment Variables
In Render dashboard, go to **Environment** tab and add:

| Variable | Value |
|----------|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong secret key (e.g., `aarakshak-super-secret-key-2024`) |
| `PORT` | `10000` (Render will set this automatically) |

### 2.3 Deploy
1. Click **Create Web Service**
2. Wait for deployment to complete
3. Note your service URL (e.g., `https://optimistic-smile-production.up.railway.app`)

---

## 🌐 Step 3: Vercel Frontend Deployment

### 3.1 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.2 Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Note your domain (e.g., `https://aarakshak.vercel.app`)

---

## 🔧 Step 4: Backend Configuration

### 4.1 Update CORS Origins
In your Render backend, update the CORS origins in `Backend/index.js` to include your Vercel domain:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-vercel-domain.vercel.app'  // Add your actual Vercel domain
  ],
  // ... rest of config
};
```

### 4.2 Redeploy Backend
1. Commit and push changes to GitHub
2. Render will automatically redeploy

---

## 🧪 Step 5: Testing

### 5.1 Test Backend
Test your backend API:
```bash
curl -X POST https://optimistic-smile-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"kausik@example.com","password":"password123"}'
```

### 5.2 Test Frontend
1. Visit your Vercel domain
2. Try logging in with:
   - Email: `kausik@example.com`
   - Password: `password123`

---

## 🔐 Step 6: Security Checklist

- [ ] MongoDB Atlas network access configured
- [ ] Strong JWT secret set
- [ ] CORS origins properly configured
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on Vercel/Render)

---

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check CORS origins in backend
   - Ensure frontend domain is included

2. **MongoDB Connection Failed**
   - Verify connection string
   - Check network access settings
   - Ensure username/password are correct

3. **Login Fails**
   - Check backend logs in Render
   - Verify JWT_SECRET is set
   - Test API endpoints directly

4. **Build Errors**
   - Check package.json dependencies
   - Verify Node.js version compatibility

---

## 📞 Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Test API endpoints directly with curl/Postman
4. Verify all environment variables are set correctly 