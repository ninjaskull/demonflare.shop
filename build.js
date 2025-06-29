#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building and deploying Demonflare hub...');

try {
  // Step 1: TypeScript compilation
  console.log('📝 Compiling TypeScript...');
  execSync('tsc', { stdio: 'inherit' });

  // Step 2: Vite build
  console.log('📦 Building with Vite...');
  execSync('vite build', { stdio: 'inherit' });

  // Step 3: Check if dist folder exists
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed - dist folder not created');
  }

  console.log('✅ Build completed successfully!');
  
  // Step 4: Check if wrangler is configured
  if (fs.existsSync('wrangler.toml')) {
    console.log('🌐 Deploying to Cloudflare Pages...');
    try {
      execSync('wrangler pages deploy dist --project-name demonflare-hub', { stdio: 'inherit' });
      console.log('🎉 Deployment completed! Your site is live on Cloudflare Pages.');
    } catch (deployError) {
      console.log('⚠️  Build completed but deployment failed.');
      console.log('📋 To deploy manually:');
      console.log('   1. Run: wrangler login');
      console.log('   2. Run: wrangler pages deploy dist --project-name demonflare-hub');
      console.log('   Or upload the dist folder to Cloudflare Pages dashboard');
    }
  } else {
    console.log('✅ Build completed!');
    console.log('📋 To deploy to Cloudflare Pages:');
    console.log('   1. Run: wrangler login');
    console.log('   2. Run: wrangler pages deploy dist --project-name demonflare-hub');
    console.log('   Or upload the dist folder to Cloudflare Pages dashboard');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}