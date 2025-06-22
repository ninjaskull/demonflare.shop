import { ProfileHeader } from "@/components/profile-header";
import { LinksList } from "@/components/links-list";
import { ShopifyProduct } from "@/components/shopify-product";
import linksConfig from "@/config/links.json";
import shopifyConfig from "@/config/shopify.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top artistic patterns */}
        <svg className="absolute top-0 right-0 w-80 h-80 text-purple-200" viewBox="0 0 320 320" fill="none">
          <path d="M250 60C250 60 190 25 120 60C50 95 0 150 0 150" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="280" cy="40" r="15" fill="currentColor" opacity="0.1"/>
          <circle cx="240" cy="80" r="8" fill="currentColor" opacity="0.15"/>
          <path d="M200 20 Q 220 40 200 60 Q 180 40 200 20" fill="currentColor" opacity="0.08"/>
        </svg>
        
        {/* Bottom enhanced curved elements */}
        <svg className="absolute bottom-0 left-0 w-96 h-96 text-purple-100" viewBox="0 0 384 384" fill="none">
          <path d="M0 300C50 280 100 250 150 270C200 290 250 320 300 300C350 280 384 250 384 250" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M0 350C30 330 80 310 130 330C180 350 230 380 280 360C330 340 384 310 384 310" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="60" cy="320" r="12" fill="currentColor" opacity="0.1"/>
          <circle cx="180" cy="340" r="8" fill="currentColor" opacity="0.12"/>
          <circle cx="300" cy="280" r="6" fill="currentColor" opacity="0.08"/>
        </svg>
        
        {/* Right side enhanced elements */}
        <svg className="absolute top-1/2 right-0 w-64 h-64 text-purple-100 transform -translate-y-1/2" viewBox="0 0 256 256" fill="none">
          <path d="M180 0C140 40 120 100 140 160C160 220 200 256 200 256" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="220" cy="80" r="10" fill="currentColor" opacity="0.1"/>
          <circle cx="180" cy="120" r="6" fill="currentColor" opacity="0.12"/>
          <path d="M160 40 Q 180 20 200 40 Q 180 60 160 40" fill="currentColor" opacity="0.06"/>
        </svg>
        
        {/* Enhanced floating artistic elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-purple-200/20 to-blue-200/20 blur-xl animate-float" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200/15 to-violet-200/15 blur-lg animate-float" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-md animate-float" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Additional artistic shapes */}
        <div className="absolute top-1/6 right-1/5 w-24 h-8 bg-gradient-to-r from-pink-200/15 to-purple-200/15 rounded-full blur-lg animate-float transform rotate-45" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/5 left-1/3 w-14 h-14 bg-gradient-to-br from-cyan-200/12 to-blue-200/12 rounded-full blur-md animate-float" style={{animationDuration: '10s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-6 h-18 bg-gradient-to-b from-violet-200/18 to-indigo-200/18 rounded-full blur-sm animate-float" style={{animationDuration: '8s', animationDelay: '5s'}}></div>
        
        {/* Geometric artistic patterns */}
        <svg className="absolute top-1/3 left-1/5 w-32 h-32 text-purple-200/20" viewBox="0 0 128 128" fill="none">
          <polygon points="64,20 84,44 64,68 44,44" fill="currentColor" opacity="0.1" className="animate-pulse"/>
          <circle cx="64" cy="44" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
        </svg>
        
        <svg className="absolute bottom-1/4 right-1/4 w-28 h-28 text-blue-200/20" viewBox="0 0 112 112" fill="none">
          <path d="M20 56 L56 20 L92 56 L56 92 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/>
          <circle cx="56" cy="56" r="8" fill="currentColor" opacity="0.08"/>
        </svg>
        
        {/* Abstract flowing lines */}
        <svg className="absolute top-1/5 left-1/2 w-40 h-20 text-indigo-200/15" viewBox="0 0 160 80" fill="none">
          <path d="M0 40 Q 40 10 80 40 T 160 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
          <path d="M0 50 Q 30 20 60 50 T 120 50" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15"/>
        </svg>
        
        <svg className="absolute bottom-1/6 left-1/4 w-36 h-24 text-violet-200/15" viewBox="0 0 144 96" fill="none">
          <path d="M0 48 Q 36 24 72 48 Q 108 72 144 48" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.18"/>
          <path d="M20 60 Q 50 30 80 60 Q 110 90 140 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.12"/>
        </svg>
        
        {/* Scattered artistic dots */}
        <div className="absolute top-1/8 left-1/8 w-2 h-2 bg-purple-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/8 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/8 right-1/5 w-3 h-3 bg-indigo-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/12 w-1 h-1 bg-violet-300/35 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-2.5 h-2.5 bg-pink-300/25 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 min-h-screen py-12 px-6">
        <div className="max-w-sm mx-auto">
          
          {/* Profile Section */}
          <ProfileHeader profile={linksConfig.profile} />
          
          {/* Links Section */}
          <LinksList links={linksConfig.links} />
          
          {/* Shopify Product Section */}
          <ShopifyProduct config={shopifyConfig} />
          
        </div>
      </div>
    </div>
  );
}
