import { ProfileHeader } from "@/components/profile-header";
import { LinksList } from "@/components/links-list";
import { ShopifyProduct } from "@/components/shopify-product";
import linksConfig from "@/config/links.json";
import shopifyConfig from "@/config/shopify.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top curved line */}
        <svg className="absolute top-0 right-0 w-64 h-64 text-purple-200" viewBox="0 0 256 256" fill="none">
          <path d="M200 50C200 50 150 20 100 50C50 80 0 120 0 120" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        
        {/* Bottom curved elements */}
        <svg className="absolute bottom-0 left-0 w-96 h-96 text-purple-100" viewBox="0 0 384 384" fill="none">
          <path d="M0 300C50 280 100 250 150 270C200 290 250 320 300 300C350 280 384 250 384 250" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M0 350C30 330 80 310 130 330C180 350 230 380 280 360C330 340 384 310 384 310" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
        
        {/* Right side curved elements */}
        <svg className="absolute top-1/2 right-0 w-48 h-48 text-purple-100 transform -translate-y-1/2" viewBox="0 0 192 192" fill="none">
          <path d="M150 0C120 30 100 80 120 130C140 180 170 192 170 192" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
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
