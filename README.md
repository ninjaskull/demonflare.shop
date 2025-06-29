# Demonflare Hub - Linktree-Style Landing Page

A modern, responsive landing page for the Demonflare anime merchandise store, built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Beautiful gradient design with animated elements
- 📱 Mobile-responsive layout
- 🛍️ Integrated Shopify product showcase
- 🔗 Social media links with hover effects
- ⚡ Fast loading with Vite
- 🌐 Ready for Cloudflare Pages deployment

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Build & Deploy
```bash
npm run build
```

This single command will:
1. Compile TypeScript
2. Build the project with Vite
3. Automatically deploy to Cloudflare Pages (if configured)

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── config/         # App configuration
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Utility functions
├── index.html          # Entry HTML file
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
└── wrangler.toml       # Cloudflare Pages config
```

## Deployment Options

### 1. Automatic (Recommended)
```bash
npm run build
```

### 2. Manual Upload
1. Run `npm run build-only`
2. Upload the `dist` folder to Cloudflare Pages dashboard

### 3. Git Integration
1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build-only`
4. Set output directory: `dist`

## Configuration

Edit `src/config/config.ts` to customize:
- Profile information
- Social media links
- Shopify store settings
- Product showcase

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **TypeScript** - Type safety
- **Cloudflare Pages** - Hosting

## License

Private project for Demonflare anime merchandise store.