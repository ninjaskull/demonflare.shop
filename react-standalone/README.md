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

This is a standard React + Vite application that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

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