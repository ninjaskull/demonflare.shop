#!/bin/bash

echo "🚀 Building and deploying Demonflare hub..."

# Step 1: TypeScript compilation
echo "📝 Compiling TypeScript..."
if ! npx tsc; then
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Step 2: Vite build
echo "📦 Building with Vite..."
if ! npx vite build; then
    echo "❌ Vite build failed"
    exit 1
fi

# Step 3: Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

echo "✅ Build completed successfully!"

# Step 4: Deploy to Cloudflare Pages
if [ -f "wrangler.toml" ]; then
    echo "🌐 Deploying to Cloudflare Pages..."
    if npx wrangler pages deploy dist --project-name demonflare-hub; then
        echo "🎉 Deployment completed! Your site is live on Cloudflare Pages."
    else
        echo "⚠️  Build completed but deployment failed."
        echo "📋 To deploy manually:"
        echo "   1. Run: npx wrangler login"
        echo "   2. Run: npx wrangler pages deploy dist --project-name demonflare-hub"
        echo "   Or upload the dist folder to Cloudflare Pages dashboard"
    fi
else
    echo "✅ Build completed!"
    echo "📋 To deploy to Cloudflare Pages:"
    echo "   1. Run: npx wrangler login"
    echo "   2. Run: npx wrangler pages deploy dist --project-name demonflare-hub"
    echo "   Or upload the dist folder to Cloudflare Pages dashboard"
fi