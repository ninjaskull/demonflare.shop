# Deploying Demonflare React App to Cloudflare Pages

## Prerequisites

- Node.js 18+ installed
- A Cloudflare account (free tier works)
- Git repository (optional, for automatic deployments)

## Quick Deployment Guide

### Option 1: Automatic Git Integration (Recommended)

1. **Push to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/demonflare-react.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Go to **Pages** section
   - Click **"Create a project"**
   - Choose **"Connect to Git"**
   - Select your repository

3. **Configure Build Settings:**
   ```
   Framework preset: React
   Build command: npm run build
   Build output directory: dist
   Root directory: / (or react-standalone if in subfolder)
   Node.js version: 18
   ```

4. **Environment Variables** (if needed):
   - No environment variables required for this project

5. **Deploy:**
   - Click **"Save and Deploy"**
   - Your site will be available at `https://your-project-name.pages.dev`

### Option 2: Direct Upload

1. **Build the project:**
   ```bash
   cd react-standalone
   npm install
   npm run build
   ```

2. **Upload to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages**
   - Click **"Upload assets"**
   - Drag and drop the `dist` folder
   - Choose a project name
   - Click **"Deploy site"**

### Option 3: Wrangler CLI

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Build and deploy:**
   ```bash
   cd react-standalone
   npm install
   npm run build
   wrangler pages deploy dist --project-name demonflare-react
   ```

## Custom Domain Setup

1. **Add your domain to Cloudflare:**
   - Go to **Websites** in Cloudflare Dashboard
   - Add your domain and follow DNS setup

2. **Connect domain to Pages:**
   - In Pages project settings
   - Go to **Custom domains**
   - Click **"Set up a custom domain"**
   - Enter your domain (e.g., `links.demonflare.com`)

## Performance Optimizations

Cloudflare Pages automatically provides:
- **Global CDN** with 200+ locations
- **Automatic HTTPS** certificates
- **HTTP/2 and HTTP/3** support
- **Brotli compression**
- **Image optimization** (for Pro accounts)

## Monitoring and Analytics

- **Analytics:** Available in Pages dashboard
- **Real User Monitoring:** Automatic with Cloudflare
- **Core Web Vitals:** Tracked automatically

## Troubleshooting

### Build Fails
- Check Node.js version (use 18 or 20)
- Verify all dependencies in package.json
- Check build logs in Cloudflare dashboard

### Assets Not Loading
- Ensure `base: './'` is set in vite.config.ts
- Check that _redirects file is in public folder

### API Calls Fail
- Verify Shopify API credentials
- Check CORS settings if needed
- Ensure HTTPS is used for API calls

## Advanced Configuration

### Headers and Security
Create `public/_headers` file:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Redirects
The `public/_redirects` file handles SPA routing:
```
/*    /index.html   200
```

## Cost Estimation

Cloudflare Pages Free Tier includes:
- Unlimited static requests
- 500 builds per month
- 1 build at a time
- 20,000 files per site

Perfect for a link-in-bio site like Demonflare!

## Next Steps

After deployment:
1. Test all links and functionality
2. Set up custom domain if desired
3. Configure analytics tracking
4. Add to your social media profiles
5. Monitor performance in Cloudflare dashboard