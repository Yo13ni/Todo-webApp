# Deployment Guide to Vercel

This guide will help you deploy both the NestJS backend and React frontend to Vercel.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: Your MongoDB connection string (already configured)

## 🚀 Step 1: Deploy Backend (NestJS API)

### Option A: Using Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Navigate to backend directory**:
   ```bash
   cd todo-api
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Login to Vercel**:
   ```bash
   vercel login
   ```

5. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No**
   - Project name: **todo-api** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

6. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   ```
   - Paste your MongoDB connection string when prompted
   - Select environments: **Production, Preview, Development**

### Option B: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**

2. **Click "Add New Project"**

3. **Import your GitHub repository** (select the repository containing your code)

4. **Configure the project**:
   - **Project Name**: `todo-api`
   - **Root Directory**: `todo-api` (if your repo root is the parent folder, or `./` if backend is the root)
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `MONGODB_URI` with your MongoDB connection string
   - Select all environments (Production, Preview, Development)

6. **Click "Deploy"**

### After Backend Deployment:

- Note down your backend URL (e.g., `https://todo-api.vercel.app`)
- Your API will be available at: `https://your-backend-url.vercel.app/todos`

---

## 🎨 Step 2: Deploy Frontend (React App)

### Option A: Using Vercel CLI

1. **Navigate to frontend directory**:
   ```bash
   cd todo-frontend
   ```

2. **Create `.env.production` file** (temporary, for build):
   ```env
   REACT_APP_API_URL=https://your-backend-url.vercel.app/todos
   ```
   Replace `your-backend-url` with your actual backend URL from Step 1.

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts similar to backend deployment.

4. **Set Environment Variable in Vercel Dashboard**:
   - Go to your frontend project settings on Vercel
   - Add environment variable: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.vercel.app/todos`
   - Select all environments

### Option B: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**

2. **Click "Add New Project"**

3. **Import the same GitHub repository**

4. **Configure the project**:
   - **Project Name**: `todo-frontend`
   - **Root Directory**: `todo-frontend` (or `./` if frontend is repo root)
   - **Framework Preset**: Create React App (Vercel will auto-detect)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `REACT_APP_API_URL` with value: `https://your-backend-url.vercel.app/todos`
   - Replace `your-backend-url` with your actual backend URL
   - Select all environments

6. **Click "Deploy"**

---

## ✅ Step 3: Update CORS (If Needed)

If you encounter CORS errors, the backend is already configured to allow all origins. The current CORS setup in `main.ts` should work with Vercel.

---

## 🔧 Troubleshooting

### Backend Issues:

1. **Build Fails**:
   - Make sure `npm run build` works locally
   - Check that all dependencies are in `package.json`

2. **MongoDB Connection Error**:
   - Verify `MONGODB_URI` is set correctly in Vercel environment variables
   - Check that your MongoDB Atlas allows connections from anywhere (or add Vercel IPs)

3. **404 Errors**:
   - Ensure `api/index.js` exists in the `todo-api` directory
   - Check that the build output includes `dist` folder

### Frontend Issues:

1. **API Connection Error**:
   - Verify `REACT_APP_API_URL` is set correctly
   - Make sure the backend URL doesn't have a trailing slash
   - Check browser console for CORS errors

2. **Build Fails**:
   - Make sure `npm run build` works locally
   - Check for any linting errors

### General Tips:

- After deployment, check the deployment logs in Vercel dashboard
- Test the backend API directly: `https://your-backend-url.vercel.app/todos`
- Use browser DevTools to check network requests

---

## 📝 Environment Variables Summary

### Backend (todo-api):
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Frontend (todo-frontend):
- `REACT_APP_API_URL`: Your backend API URL (e.g., `https://todo-api.vercel.app/todos`)

---

## 🎉 You're Done!

After deployment:
- Frontend: `https://your-frontend-url.vercel.app`
- Backend API: `https://your-backend-url.vercel.app/todos`

Your Todo app should now be live! 🚀

---

## 💡 Alternative: Deploy Backend to Railway/Render

**Note**: While Vercel works, for NestJS backends, you might have better results with:
- **Railway**: [railway.app](https://railway.app) - Excellent for Node.js/NestJS
- **Render**: [render.com](https://render.com) - Good free tier for backends

These platforms are better suited for long-running Node.js processes compared to Vercel's serverless functions.

