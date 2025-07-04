# Linktree-Style Hub Application

## Overview

This is a modern, full-stack Linktree-style application built with React/Vite frontend and Node.js/Express backend. The application allows users to create a personalized landing page with social links, profile information, and integrated Shopify products. It features a beautiful gradient design system, smooth animations, and mobile-responsive layout.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth page transitions and hover effects
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with tsx and Vite integration

### Design System
- **Theme**: Light/dark mode support with CSS custom properties
- **Colors**: Gradient-based color scheme with primary, secondary, and accent colors
- **Typography**: Inter font family for modern, readable text
- **Components**: Consistent design tokens through Tailwind CSS configuration

## Key Components

### Frontend Components
1. **ProfileHeader**: Displays user avatar, name, and bio with gradient styling
2. **LinksList**: Animated list of social/professional links with hover effects
3. **ShopifyProduct**: Integration for displaying Shopify products with demo fallback
4. **UI Components**: Comprehensive set of reusable components (buttons, cards, forms, etc.)

### Backend Components
1. **Express Server**: Main application server with middleware for logging and error handling
2. **Storage Interface**: Abstracted storage layer with in-memory implementation
3. **Route Handler**: Centralized route registration system
4. **Vite Integration**: Development-time integration for hot module replacement

### Configuration System
- **Links Configuration**: JSON-based link management in `client/src/config/links.json`
- **Shopify Integration**: Configurable Shopify storefront settings
- **Environment Variables**: Database URL and other sensitive configurations

## Data Flow

1. **Static Configuration**: Application loads user profile and links from JSON configuration files
2. **Component Rendering**: React components render based on configuration data with animations
3. **API Integration**: Shopify Buy Button SDK integration for product display
4. **User Interactions**: Link clicks open in new tabs, maintaining user engagement
5. **Responsive Design**: Components adapt to mobile and desktop viewports

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **UI Framework**: Radix UI components, Framer Motion for animations
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Development**: Vite, TypeScript, ESBuild for production builds

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Server**: Express.js with session management
- **Development**: tsx for TypeScript execution, various development tools

### Third-party Integrations
- **Shopify**: Buy Button SDK for e-commerce integration
- **Fonts**: Google Fonts (Inter) for typography
- **Icons**: Lucide React for consistent iconography

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with Express middleware integration
- **Database**: PostgreSQL 16 module in Replit environment
- **Port Configuration**: Local port 5000 mapped to external port 80

### Production Build
1. **Frontend Build**: Vite builds optimized React application to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Frontend serves through Express static middleware
4. **Database Migrations**: Drizzle Kit handles schema migrations

### Deployment Configuration
- **Platform**: Replit autoscale deployment target
- **Build Command**: `npm run build` (builds both frontend and backend)
- **Start Command**: `npm run start` (runs production server)
- **Environment**: NODE_ENV set to production for optimizations

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

- June 22, 2025: Initial setup of Linktree-style application
- June 22, 2025: Integrated demonflare.com products using public API
- June 22, 2025: Updated branding and links for Demonflare anime merchandise store
- June 22, 2025: Implemented random product selection from real demonflare.com inventory
- June 22, 2025: Added product carousel with 4 products, navigation arrows, thumbnails, and full-size images
- June 22, 2025: Updated to horizontal scrolling carousel with cards side-by-side like modern mobile app interfaces
- June 22, 2025: Redesigned with modern dark theme, neon gradients, glowing effects, and cyberpunk-inspired aesthetic
- June 22, 2025: Updated to soft pastel gradient theme with coral, pink, green, and yellow tones inspired by modern watch design
- June 22, 2025: Added official Demonflare logo to replace text avatar in profile header
- June 22, 2025: Updated color scheme from pink to red tones to better match the Demonflare logo and branding
- June 22, 2025: Added automatic dominant color extraction from product images to create seamless background matching
- June 22, 2025: Simplified to use consistent #E9E9E9 background color matching actual product image backgrounds
- June 22, 2025: Updated Instagram link to correct demonflare.shop account
- June 22, 2025: Updated icons to modern anime-themed emojis (lightning bolt, fire, Japanese map, stars)
- June 29, 2025: Migrated from full-stack Replit Agent to frontend-only Vite structure for Cloudflare Pages deployment
- June 29, 2025: Removed all Shopify API dependencies and Buy Button SDK for public GitHub deployment
- June 29, 2025: Replaced Shopify integration with static product showcase using anime merchandise data
- June 29, 2025: Updated Instagram link to correct @demonflare.shop username