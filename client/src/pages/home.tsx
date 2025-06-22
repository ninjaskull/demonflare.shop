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
        
        {/* Additional floating artistic elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-purple-200/20 to-blue-200/20 blur-xl animate-float" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200/15 to-violet-200/15 blur-lg animate-float" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-md animate-float" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
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
