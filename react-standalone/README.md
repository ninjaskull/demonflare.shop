# Demonflare - React.js Link-in-Bio

A beautiful, responsive link-in-bio website built with React.js for Demonflare anime collectibles business.

## Features

- **Clean, minimalist design** with artistic background elements
- **Responsive layout** optimized for mobile and desktop
- **Social media integration** with proper icons
- **Shopify product showcase** with carousel functionality
- **WhatsApp support integration**
- **Animated elements** using Framer Motion
- **SEO optimized** with proper meta tags

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

Edit `src/config/config.ts` to customize:
- Profile information (name, bio, avatar)
- Social media links
- Shopify store settings
- Product IDs to display

## Deployment

### Cloudflare Pages (Recommended)

#### Method 1: Using Wrangler CLI

1. **Install Wrangler globally:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy directly:**
   ```bash
   npm run deploy
   ```

#### Method 2: Git Integration (Automatic)

1. **Push your code to GitHub/GitLab**

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your Git repository
   
3. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: `18` or `20`

#### Method 3: Direct Upload

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder:**
   - Go to Cloudflare Pages dashboard
   - Click "Upload assets"
   - Drag and drop the `dist` folder

### Other Hosting Options

This application can also be deployed to:
- **Vercel:** Connect GitHub repo, auto-deploys
- **Netlify:** Drag and drop `dist` folder or Git integration
- **GitHub Pages:** Enable in repository settings
- **Any static hosting service**

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** + **React Icons** for icons
- **Shopify Storefront API** for products

## Project Structure

```
src/
├── components/          # React components
│   ├── ProfileHeader.tsx
│   ├── LinksList.tsx
│   └── ShopifyProduct.tsx
├── config/             # Configuration files
│   └── config.ts
├── hooks/              # Custom React hooks
│   └── useIsMobile.ts
├── utils/              # Utility functions
│   └── cn.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Customization

### Adding New Links
Update the `links` array in `src/config/config.ts`:

```typescript
{
  title: "Your Link Title",
  url: "https://your-url.com",
  icon: "store", // Available icons: store, instagram, grid, facebook, twitter, whatsapp, music
  gradient: "gradient-primary" // Available gradients: gradient-primary, gradient-secondary, etc.
}
```

### Changing Colors
Modify the gradient classes in `src/index.css` or add new ones.

### Adding New Products
Update the `productIds` array in the Shopify config with your product IDs.

## License

MIT License - feel free to use this for your own projects!